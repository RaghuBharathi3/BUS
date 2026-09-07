# Configuration Guide — Safar Bus Reservation Platform

---

## 1. Overview of Configuration Files

Safar utilizes standard configuration files to govern the build process, linting rules, package dependencies, and server runtime:

```text
BUS/
├── vite.config.js       [Vite Bundler & Plugin Configuration]
├── .oxlintrc.json       [Oxlint Static Code Analysis Configuration]
├── package.json         [Node Dependencies & Script Commands]
├── index.html           [HTML Shell & Metadata Directives]
├── start.bat            [Windows Dev Server Launcher Script]
└── stop.bat             [Windows Process Termination Script]
```

---

## 2. Bundler Configuration (`vite.config.js`)

The Vite configuration configures React JSX transformation via `@vitejs/plugin-react`:

```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### Key Vite Behaviors
- **Plugin Integration**: Uses `@vitejs/plugin-react` which invokes the ultra-fast Rust-based Oxc parser for JSX transformation.
- **Port Assignment**: By default listens on port `5173`. When configured via CLI (`--port 5173`), Vite will strictly attempt that port.
- **Hot Module Replacement (HMR)**: Preserves state in memory during development edits without a full page refresh.

---

## 3. Linter Configuration (`.oxlintrc.json`)

Safar uses **Oxlint**, a fast linter designed to enforce idiomatic React patterns:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

### Enforced Rules
- `react/rules-of-hooks: "error"`: Prevents conditional or nested hook calls, ensuring all React 19 hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) adhere strictly to React hook invariants.
- `react/only-export-components: ["warn", { "allowConstantExport": true }]`: Ensures component files only export React components or constants, enabling reliable Fast Refresh during development.

---

## 4. Windows Process Control Scripts

### `start.bat`
```cmd
@echo off
echo [1/2] Starting Vite dev server on http://localhost:5173 ...
call npm run dev -- --host 0.0.0.0 --port 5173
pause
```
- Sets host binding to `0.0.0.0`, allowing mobile devices on the same local area network (LAN) to test the application.

### `stop.bat`
```cmd
@echo off
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do (
  taskkill /F /PID %%a
)
```
- Queries `netstat` for any active process listening on TCP port 5173 and issues a forced `taskkill`, preventing lingering background node processes from causing port collision errors on restart.

---

## 5. Browser Compatibility Matrix

Safar targets modern browsers supporting ES2022 JavaScript syntax, CSS custom properties, and Web Storage:

| Browser | Minimum Version | Verified Version | Notes |
|---|---|---|---|
| **Google Chrome** | 90+ | 120+ | Recommended for maximum performance |
| **Microsoft Edge** | 90+ | 120+ | Fully verified |
| **Mozilla Firefox**| 88+ | 125+ | Supports CSS variables & Web Storage |
| **Apple Safari** | 14+ | 17+ | macOS and iOS tested |
| **Opera** | 76+ | Latest | Blink engine compatible |
