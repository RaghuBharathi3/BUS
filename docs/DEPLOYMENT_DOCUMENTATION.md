# Deployment Documentation — Safar Bus Reservation Platform

---

## 1. Current Deployment Status

> [!NOTE]
> The project currently operates in a **development/local environment** on port `5173`. It is not currently deployed to a live production public domain.

The application has been verified for production readiness using Vite's production bundler (`npm run build`), generating fully compiled, optimized static assets in the `dist/` directory.

---

## 2. Production Build Verification

To verify that the application compiles into a standalone production artifact:

```bash
npm run build
```

### Production Artifact Structure (`dist/`):
```text
dist/
├── assets/
│   ├── index-Bsok7Xx4.css    [44.04 kB │ gzip: 8.60 kB]
│   └── index-Flvxl62f.js    [292.88 kB │ gzip: 84.32 kB]
├── favicon.svg               [289 bytes]
├── icons.svg                 [5,031 bytes]
└── index.html                [0.66 kB │ gzip: 0.41 kB]
```
The entire application bundle totals under **340 kB uncompressed** and **under 95 kB gzipped**, ensuring rapid sub-second load times on any Edge CDN.

---

## 3. Recommended Production Deployment Architectures

Because Safar is architected as a pure client-side Single Page Application utilizing hash-based routing (`#/`, `#/search`, `#/checkout`), it can be hosted on any static site delivery platform without requiring specialized server-side rewrite rules.

### Option A: Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy from the project root:
```bash
vercel --prod
```
3. Configuration (`vercel.json` optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Option B: Cloudflare Pages / Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- Cloudflare’s global edge network will cache all static CSS, JS, and SVG assets, delivering single-digit millisecond latency worldwide.

### Option C: AWS S3 + CloudFront CDN
1. Create an Amazon S3 bucket configured for static web hosting.
2. Upload the contents of `dist/` to the S3 bucket root:
```bash
aws s3 sync dist/ s3://safar-bus-production --delete
```
3. Attach an Amazon CloudFront distribution with HTTPS certificate (via AWS Certificate Manager).
4. Configure cache-control headers:
   - `index.html`: `Cache-Control: no-cache`
   - `assets/*`: `Cache-Control: public, max-age=31536000, immutable` (hashed assets).

---

## 4. Environment Checklist for Production

When transitioning from the local development server to production hosting:
- [x] Run static linting analysis (`npm run lint`) to confirm 0 errors.
- [x] Run production build (`npm run build`) and assert that bundle chunk sizes remain within budget.
- [x] Test production bundle locally via `npm run preview`.
- [ ] Configure custom domain with DNS A/CNAME records (e.g., `safarbus.in`).
- [ ] Enable TLS 1.3 certificate via Let's Encrypt or Cloudflare.
- [ ] Set up continuous integration (CI) via GitHub Actions for automated build and deployment on push to `main`.
