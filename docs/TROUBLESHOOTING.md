# Troubleshooting Guide — Safar Bus Reservation Platform

---

## 1. Common Issues & Solutions

### 1.1 Port 5173 Already in Use / EADDRINUSE Error
- **Symptom**: Running `npm run dev` displays `Port 5173 is in use, trying another one...` or crashes with `EADDRINUSE`.
- **Cause**: A previous Vite development server instance was not terminated cleanly.
- **Resolution**:
  - On Windows: Double-click [`stop.bat`](file:///c:/Users/Windows/Documents/BUS/stop.bat) or execute:
    ```cmd
    stop.bat
    ```
  - Or manually kill the process in PowerShell:
    ```powershell
    Get-Process -Name "node" | Stop-Process -Force
    ```
  - Re-run `npm run dev`.

---

### 1.2 Checkout Screen Redirects Back to Search
- **Symptom**: Navigating to `http://localhost:5173/#/checkout` immediately redirects to `#/search`.
- **Cause**: Active route guard protection. `Checkout.jsx` requires a selected bus entity (`checkoutBus` in `App.jsx` or `sessionStorage.getItem('safar_checkout_bus')`).
- **Resolution**: Search for a route on the homepage, expand a bus card, select seats, and click **Continue Booking** to populate the checkout bus buffer properly.

---

### 1.3 Dashboard Redirects to Sign In
- **Symptom**: Navigating to `http://localhost:5173/#/dashboard` immediately redirects to `#/auth`.
- **Cause**: Active route guard protection. `Dashboard.jsx` requires an authenticated user session (`currentUser` in `App.jsx` or `localStorage.getItem('safar_current_user')`).
- **Resolution**: Log in using your registered credentials or click **Quick Login (Arun Kumar)** on the authentication page.

---

### 1.4 Stale Seat Selections or Outdated Data
- **Symptom**: The browser displays previous seat selections or unexpected booking states.
- **Cause**: Old session data cached in browser storage.
- **Resolution**:
  - Open Developer Tools in your browser (F12 or Ctrl+Shift+I).
  - Go to the **Application** tab.
  - Under **Storage**, select **Clear site data**, or execute in the Console:
    ```javascript
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
    ```
  - Upon reload, Safar will re-seed default demo users and clean booking states.

---

### 1.5 Boarding Pass Not Printing Correctly
- **Symptom**: Browser print preview includes headers, footers, or cut-off margins.
- **Cause**: Browser print margins not configured for clean ticket printing.
- **Resolution**:
  - In the browser print dialog, ensure **Background graphics** is checked.
  - Set **Margins** to **Default** or **None**.
  - Safar includes `@media print` CSS rules that automatically hide all navigation buttons, footers, and page backgrounds, isolating only the boarding pass card.

---

### 1.6 Favicon or Asset 400 Intermittent Warning
- **Symptom**: Console outputs an intermittent 400 or warning on `favicon.svg`.
- **Cause**: Local host environment timing during rapid dev server restarts.
- **Resolution**: Harmless in local development; does not affect application behavior. The production build serves static SVG assets statically from root.
