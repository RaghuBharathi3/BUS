# Installation and Setup Guide — Safar Bus Reservation Platform

---

## 1. System Requirements & Prerequisites

Ensure your development workstation meets the following requirements before installation:

| Component | Minimum Version | Recommended Version | Verification Command |
|---|---|---|---|
| **Operating System** | Windows 10/11, macOS 12+, Ubuntu 20.04+ | Windows 11 / macOS 14+ | `cmd /c ver` or `uname -a` |
| **Node.js** | Node.js v18.0.0+ | Node.js v22.x or v23.x | `node -v` |
| **npm** | npm v9.0.0+ | npm v10.x+ | `npm -v` |
| **Web Browser** | Chrome 90+, Edge 90+, Firefox 88+ | Chrome 120+ / Edge 120+ | `chrome --version` |

---

## 2. Cloning & Directory Setup

1. Open your terminal (PowerShell, Command Prompt, or Bash).
2. Clone or open the repository folder:
```bash
git clone https://github.com/RaghuBharathi3/BUS.git
cd BUS
```

---

## 3. Dependency Installation

Install all project dependencies using npm:
```bash
npm install
```

### Dependency Audit
The project maintains a lightweight dependency profile:
- **Production Dependencies**:
  - `react`: `^19.2.8`
  - `react-dom`: `^19.2.8`
- **Development Dependencies**:
  - `vite`: `^8.2.2`
  - `@vitejs/plugin-react`: `^6.1.0`
  - `oxlint`: `^1.79.0`
  - `@types/react`: `^19.2.18`
  - `@types/react-dom`: `^19.2.4`

---

## 4. Environment Variables

> [!NOTE]
> The Safar application does not require any `.env` configuration or API secret keys to run. The procedural generator and simulated storage operate entirely in-memory and within browser storage.

---

## 5. Running the Development Server

### Option A: Using npm Scripts
Launch the Vite development server on port 5173:
```bash
npm run dev
```
To expose the server across your local network:
```bash
npx vite --host 0.0.0.0 --port 5173
```

### Option B: Using Windows Batch Helpers
The repository provides Windows batch launcher scripts:
- **Start Server**: Double-click [`start.bat`](file:///c:/Users/Windows/Documents/BUS/start.bat) or execute:
```cmd
start.bat
```
- **Stop Server**: Double-click [`stop.bat`](file:///c:/Users/Windows/Documents/BUS/stop.bat) to terminate active node processes listening on port 5173.

Once started, navigate to:
```text
http://localhost:5173/
```

---

## 6. Static Analysis & Code Linting

Run Oxlint to verify syntax, React rules, and code quality:
```bash
npm run lint
```
*Expected Output:*
```text
Found 0 warnings and 0 errors.
Finished in ~130ms on 30 files with 104 rules.
```

---

## 7. Production Build & Local Preview

Generate the minified production distribution bundle:
```bash
npm run build
```
*Build Artifacts in `dist/`:*
```text
dist/index.html                   ~0.66 kB (gzip: ~0.41 kB)
dist/assets/index-*.css          ~44.04 kB (gzip: ~8.60 kB)
dist/assets/index-*.js          ~292.88 kB (gzip: ~84.32 kB)
```

To test the production build locally:
```bash
npm run preview
```
The preview server typically listens on `http://localhost:4173/`.

---

## 8. Headless Start/Stop Verification

Run the built-in automated verifier script:
```bash
node verify-start-stop.cjs
```
This script validates that the Vite dev server boots, serves static assets with proper HTTP 200 responses, asserts DOM mount points, and validates `stop.bat` process termination logic.
