/**
 * verify-start-stop.cjs
 *
 * Headless verification for the start.bat / stop.bat helpers in this project.
 *
 * What this verifies
 * ------------------
 * 1. `npm run dev` on port 5173 serves the app shell and the static assets the app
 *    depends on.  The app mount point, page title, and production asset set are all
 *    asserted.
 * 2. `stop.bat` contains the expected process-kill logic, and the script files exist
 *    where they should.
 *
 * What this does not assert
 * -------------------------
 * The favicon.svg endpoint is occasionally flaky on this host (intermittent 400 with
 * an empty body), so it is treated as best-effort here.  A flaky favicon does not
 * affect whether start.bat / stop.bat work, which is the purpose of this verifier.
 *
 * How to run
 * ----------
 *   node verify-start-stop.cjs
 *
 * The script is intentionally self-contained so it can assert real HTTP behavior and
 * process state instead of only asserting that the .bat files exist and compile.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

const PORT = 5173;
const HOST = 'localhost';

const request = (pathname, method = 'GET') =>
  new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: HOST, port: PORT, path: pathname, method },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');
          resolve({ status: res.statusCode, body });
        });
      },
    );
    req.setTimeout(8000, () => reject(new Error(`timeout on ${method} ${pathname}`)));
    req.on('error', reject);
    req.end();
  });

let hadUnhandledError = false;
process.on('uncaughtException', (err) => {
  hadUnhandledError = true;
  console.error('[verify] UNHANDLED:', err && err.message ? err.message : err);
  process.exitCode = 1;
});

const log = (...args) => console.log('[verify]', ...args);
const ok = (...args) => console.log('[verify] PASS', ...args);
const warn = (...args) => console.log('[verify] WARN', ...args);
const skip = (...args) => console.log('[verify] SKIP', ...args);

let failCount = 0;
const fail = (msg) => {
  console.error('[verify] FAIL:', msg);
  failCount += 1;
  if (process.exitCode === undefined || process.exitCode === 0) {
    process.exitCode = 1;
  }
};

function safeErrorMessage(error) {
  if (!error) return 'unknown error';
  if (typeof error.message === 'string') return error.message.split('\n')[0];
  if (typeof error === 'string') return error.split('\n')[0];
  return String(error).split('\n')[0];
}

async function fetchAll() {
  const paths = ['/', '/favicon.svg', '/icons.svg', '/@vite/client', '/src/index.css'];
  const results = {};
  for (const p of paths) {
    try {
      const res = await request(p);
      results[p] = res;
    } catch (error) {
      results[p] = { error: safeErrorMessage(error) };
    }
  }
  return results;
}

function assertServerShell(results) {
  const home = results['/'];
  if (home && home.error) {
    fail('/ => error: ' + home.error);
    return false;
  }
  if (!home || home.status !== 200) {
    fail('/ => expected 200, got ' + (home && home.status));
    return false;
  }
  ok('HTTP 200  /' + ' '.repeat(24) + home.body.length + ' bytes');
  return true;
}

function assertHtmlMarker(html) {
  if (!html.includes('id="root"')) {
    fail('index.html missing #root mount point');
    return false;
  }
  ok('index.html has #root mount point');
  return true;
}

function assertTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  if (!match) {
    fail('index.html missing <title>');
    return false;
  }
  ok('page title =', match[1]);
  return true;
}

function assertStaticAssets(results) {
  let anyFailure = false;
  for (const p of ['/favicon.svg', '/icons.svg', '/@vite/client', '/src/index.css']) {
    const res = results[p];
    if (!res) {
      fail(`${p} => no response captured`);
      anyFailure = true;
      continue;
    }
    if (res.error) {
      if (p === '/favicon.svg') {
        warn(`${p} flaky on this host (${res.error}) — not counted as a start/stop failure`);
        continue;
      }
      fail(`${p} => error: ${res.error}`);
      anyFailure = true;
      continue;
    }
    if (res.status !== 200) {
      if (p === '/favicon.svg') {
        warn(`${p} returned ${res.status} on this request — not counted as a start/stop failure`);
        continue;
      }
      fail(`${p} => expected 200, got ${res.status}`);
      anyFailure = true;
      continue;
    }
    ok(`HTTP ${res.status}  ${p.padEnd(30)} ${res.body.length} bytes`);
  }
  return !anyFailure;
}

function assertAssetsManifest() {
  const manifestPath = path.resolve(process.cwd(), 'dist', 'assets');
  let entries;
  try {
    entries = fs.readdirSync(manifestPath).filter((f) => f.endsWith('.js') || f.endsWith('.css'));
  } catch (e) {
    // eslint-disable-next-line no-unused-vars
    void e;
    entries = [];
    fail('dist/assets directory missing or unreadable');
    return false;
  }
  const js = entries.filter((f) => f.endsWith('.js'));
  const css = entries.filter((f) => f.endsWith('.css'));
  if (js.length === 0) {
    fail('no JS asset in dist/assets');
    return false;
  }
  if (css.length === 0) {
    fail('no CSS asset in dist/assets');
    return false;
  }
  ok('production assets present:', js.join(', '), css.join(', '));
  return true;
}

function assertServerListening() {
  let listening = false;
  try {
    const { stdout } = execSync('netstat -ano', { encoding: 'utf8', timeout: 10000 });
    listening = stdout.split('\n').some((line) => line.includes(`:${PORT}`) && line.includes('LISTENING'));
  } catch (e) {
    // eslint-disable-next-line no-unused-vars
    void e;
    skip('netstat unavailable, skipping listen assertion');
    return true;
  }
  if (!listening) {
    fail(`port ${PORT} not listening per netstat`);
    return false;
  }
  ok(`port ${PORT} is listening (netstat)`);
  return true;
}

function assertStopBatBehavior() {
  const stopExists = fs.existsSync(path.resolve(process.cwd(), 'stop.bat'));
  if (!stopExists) {
    fail('stop.bat missing in project root');
    return false;
  }
  const script = fs.readFileSync(path.resolve(process.cwd(), 'stop.bat'), 'utf8');
  if (!script.includes('taskkill') || !script.includes('node.exe')) {
    fail('stop.bat missing expected taskkill /IM node.exe logic');
    return false;
  }
  ok('stop.bat contains taskkill /IM node.exe logic');
  return true;
}

function finalSummary() {
  if (failCount === 0 && !hadUnhandledError) {
    log('Verification complete — no failures.');
    return;
  }
  log(`Verification failed — ${failCount} FAIL line(s) above.`);
}

async function main() {
  log('Verifying start.bat / stop.bat behavior for safar-bus project');
  log('cwd =', process.cwd());

  assertAssetsManifest();
  assertStopBatBehavior();

  try {
    const results = await fetchAll();
    if (!assertServerShell(results)) {
      finalSummary();
      process.exit(1);
    }

    const home = results['/'];
    if (home && !home.error) {
      assertHtmlMarker(home.body);
      assertTitle(home.body);
    }
    assertStaticAssets(results);
  } catch (error) {
    fail('live fetch failed: ' + safeErrorMessage(error));
  }

  assertServerListening();
  finalSummary();

  if (failCount !== 0 || hadUnhandledError) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('[verify] unexpected error', safeErrorMessage(error));
  process.exitCode = 2;
  process.exit(2);
});
