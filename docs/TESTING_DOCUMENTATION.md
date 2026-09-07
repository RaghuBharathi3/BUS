# Testing Documentation — Safar Bus Reservation Platform

---

## 1. Testing Strategy Overview

The testing methodology for **Safar** combines automated static analysis, production compilation validation, automated headless HTTP verification, and rigorous manual end-to-end test scenarios.

```text
Safar Verification Hierarchy
├── Static Analysis Level: Oxlint (104 rules, 30 files)
├── Compilation Level: Vite Production Build (Asset generation & chunking)
├── Headless HTTP Integration: verify-start-stop.cjs (Node HTTP & Process tests)
└── End-to-End User Journey Verification (Interactive browser execution)
```

---

## 2. Automated Static Analysis (`oxlint`)

The project uses Oxlint v1.79.0 to enforce syntax correctness and React component standards.

- **Command**: `npm run lint`
- **Execution Log**:
```text
> bus@0.0.0 lint
> oxlint

Found 0 warnings and 0 errors.
Finished in 137ms on 30 files with 104 rules using 20 threads.
```
- **Results**: **Passed** (0 errors, 0 warnings).

---

## 3. Production Build Validation (`vite build`)

Every release is verified against Vite's production bundler to assert that all JSX modules transform cleanly and assets compile without circular dependencies.

- **Command**: `npm run build`
- **Execution Log**:
```text
vite v8.2.2 building client environment for production...
transforming...
✓ 42 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.66 kB │ gzip:  0.41 kB
dist/assets/index-Bsok7Xx4.css   44.04 kB │ gzip:  8.60 kB
dist/assets/index-Flvxl62f.js   292.88 kB │ gzip: 84.32 kB

✓ built in 530ms
```
- **Results**: **Passed** (Build completed with zero errors).

---

## 4. Headless Server & Process Verification (`verify-start-stop.cjs`)

The codebase includes an automated verification script (`verify-start-stop.cjs`) that tests server lifecycle and HTTP responses:

- **Command**: `node verify-start-stop.cjs`
- **Scope of Assertions**:
  1. **HTTP Endpoint Verification**: Connects to `http://localhost:5173/`, asserting HTTP 200 status code.
  2. **App Shell Integrity**: Asserts that the response HTML contains the `<div id="root">` mount container and `<title>Safar — Premium Bus Tickets</title>`.
  3. **Script Presence**: Asserts that `start.bat` and `stop.bat` exist and contain correct process-kill logic (`taskkill /F /PID`).
- **Results**: **Passed**.

---

## 5. End-to-End User Journey Verification Matrix

An exhaustive browser walkthrough was conducted across all application pages (recorded as WebP artifact in IDE brain). The results of each functional scenario are detailed below:

| Test ID | Scenario Description | Input Steps | Expected Outcome | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-01** | Homepage Discovery & Search | Select From: Chennai, To: Bengaluru, Date: Next day; click Search | Navigates to `#/search`, displays 8 bus options with correct route header. | Search parameters persisted, 8 buses loaded. | **PASS** |
| **TC-02** | Bus Filtering (AC & Price) | Toggle AC filter, set price slider to ₹1,500 | Non-AC buses and buses above ₹1,500 are filtered out in real time. | Inventory updated instantaneously without page reload. | **PASS** |
| **TC-03** | Multi-Deck Seat Selection | Click "Select Seats" on Safar Luxe Class; switch decks; click 1A, 2A | Selected seats highlight in blue; live fare recalculates dynamically. | Seat map rendered Lower/Upper decks; 2 seats selected (Total ₹1,762). | **PASS** |
| **TC-04** | Maximum Seat Selection Guard | Attempt to click more than 6 seats in a single bus | Selection blocked; error toast "You can select a maximum of 6 seats per booking." | Warning toast triggered; 7th seat rejected. | **PASS** |
| **TC-05** | Auth Guard on Checkout | Click "Continue Booking" while unauthenticated | System triggers toast notification and redirects to `#/auth`. | Redirected to `#/auth` with session buffer intact. | **PASS** |
| **TC-06** | Demo Quick-Login | Click "Quick Login (Arun Kumar)" | Authenticates as Arun Kumar, restores bus booking state, redirects to checkout. | Authenticated successfully; redirected to `#/checkout`. | **PASS** |
| **TC-07** | Promo Code Application | Enter coupon code `ROUTE10` on Checkout | Flat ₹100 discount deducted from base fare; message "Coupon applied successfully!" | Total payable updated from ₹1,890 to ₹1,790. | **PASS** |
| **TC-08** | Ineligible Coupon Rejection | Attempt to apply `FIRSTTRIP` with existing user bookings | Coupon rejected with message "This coupon is only valid for your first booking." | Ineligibility predicate triggered; discount set to ₹0. | **PASS** |
| **TC-09** | Multi-Passenger Form Validation | Leave Passenger 2 name empty and click Proceed to Payment | Form highlights empty field with error "Name must be at least 3 characters." | Submission blocked until valid inputs provided. | **PASS** |
| **TC-10** | Payment Simulation (UPI) | Enter VPA `arun@upi`, click "Pay ₹1,790 & Book" | System executes 2-phase payment simulation and issues Booking ID `BK-xxxxxx`. | Payment validated; Booking ID `BK-662345` created. | **PASS** |
| **TC-11** | Boarding Pass Rendering | Review confirmation screen | Displays ticket with Booking ID, passenger list, QR code simulation, and print button. | Boarding pass rendered with print-ready CSS. | **PASS** |
| **TC-12** | Dashboard Trip Statuses | Navigate to Dashboard tabs: Upcoming, Completed, Cancelled | Displays active booking in Upcoming; displays seeded records in Completed & Cancelled. | All tabs categorized accurately by booking status. | **PASS** |
| **TC-13** | Ticket Cancellation & Refund | Click "Cancel Booking" on upcoming trip | Modal calculates 90% refund; confirmation moves booking to Cancelled Tickets. | Status updated to `'Cancelled'` in `localStorage`; refund logged. | **PASS** |
| **TC-14** | Session Resilience on Refresh | Reload browser while on Checkout screen | Form inputs and selected seats persist from `sessionStorage`. | All passenger details and selected bus preserved. | **PASS** |

---

## 6. Edge Cases & Error Handling Verification

1. **Direct URL Route Access Without State**:
   - Accessing `http://localhost:5173/#/checkout` without a selected bus redirects automatically to `#/search`.
   - Accessing `http://localhost:5173/#/dashboard` while logged out redirects automatically to `#/auth`.
   - Accessing `http://localhost:5173/#/confirmation` without a completed booking redirects to `#/home`.
2. **Invalid Date Handling**:
   - Past travel dates are constrained by browser native `<input type="date" min={today}>`.
3. **Card Expiry Validation**:
   - The card payment module rejects past expiry years and months (`MM/YY`), notifying the user that the card has expired.
