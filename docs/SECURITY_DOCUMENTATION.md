# Security Documentation — Safar Bus Reservation Platform

---

## 1. Security Architecture Overview

The **Safar** platform is designed as an architectural client-side simulation. This document analyzes the security controls implemented within the current codebase and provides an explicit differentiation between **currently implemented controls** and **recommended production enhancements** required before connecting to live banking or enterprise APIs.

---

## 2. Currently Implemented Security Controls

### 2.1 Route & State Authorization Guards (`App.jsx`)
The application implements client-side route guards that prevent unauthorized or uninitialized access to critical transactional flows:
- **Dashboard Guard**: Users cannot view `#/dashboard` without an active session in `currentUser`. Unauthenticated attempts are redirected to `#/auth`.
- **Checkout Guard**: Users cannot access `#/checkout` without an actively selected bus entity (`checkoutBus`). Uninitialized requests are redirected to `#/search`.
- **Confirmation Guard**: Access to `#/confirmation` requires a confirmed booking object (`confirmedBooking`), preventing spurious receipt generation.

### 2.2 Client-Side Input Sanitization & Validation
- **Authentication**:
  - Email addresses are strictly validated against RFC 5322 regex patterns (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - Mobile numbers are constrained to exactly 10 digits (`/^\d{10}$/`).
  - Passwords require a minimum length of 6 characters.
- **Passenger Manifest**:
  - Passenger names must contain at least 3 non-whitespace characters.
  - Passenger ages are restricted to numeric values between 1 and 120.
- **Payment Validation**:
  - Card numbers are stripped of non-digits, formatted into 4-digit groups, and asserted to be exactly 16 digits.
  - Card expiry dates (`MM/YY`) are validated against the current year and month to reject expired cards.
  - CVV codes must match exactly 3 digits.
  - UPI IDs require a valid `@` domain separator.

### 2.3 Session Isolation & Lifecycle Management
- Transient booking details (`safar_checkout_form`, `safar_selected_seats`, `safar_checkout_bus`) are isolated within `sessionStorage`. They are accessible only to the active browser tab and are automatically destroyed when the tab is closed.
- Upon successful checkout completion, `safar_checkout_form` and in-flight seat buffers are purged immediately.
- Upon explicit user logout (`handleLogout`), `safar_current_user` and `safar_checkout_form` are cleared, and active booking state in memory is reset.

### 2.4 Separation of Concerns
- Component styling uses scoped CSS classes with CSS variables rather than dynamic `eval` or inline HTML injection, preventing Cross-Site Scripting (XSS) injection vectors through styling.
- All user-supplied strings are rendered through React JSX interpolation (`{user.name}`), which automatically escapes HTML entities and prevents DOM-based XSS.

---

## 3. Current Limitations (Simulated Environment)

Because Safar is architected as an offline-capable client-side demonstration platform:
1. **Plaintext Password Storage**: Passwords stored in `localStorage.getItem('safar_users')` are stored in plaintext for demonstration simplicity.
2. **Local Storage Accessibility**: Sensitive profile data in `localStorage` can be inspected via browser Developer Tools.
3. **Simulated Payment Gateway**: The payment module validates syntax and simulates processing latency, but does not communicate with real banking gateways (Razorpay, Stripe, or PayU).

---

## 4. Recommended Production Hardening Roadmap

For transitioning this frontend platform into a production enterprise deployment, the following security architecture should be implemented:

```text
Recommended Enterprise Architecture
├── 1. HTTPS / TLS 1.3: Mandatory Transport Layer Security
├── 2. JWT / HttpOnly Cookies: Secure session tokens with SameSite=Strict
├── 3. Argon2id / bcrypt: Server-side salted password hashing
├── 4. Content Security Policy (CSP): Strict script-src and connect-src headers
├── 5. Payment Gateway Tokenization: PCI-DSS compliant SDKs (Stripe Elements / Razorpay Checkout)
└── 6. Rate Limiting: Reverse proxy rate limiting (Nginx / Cloudflare) to prevent brute-force attacks
```

| Vulnerability Category | Risk in Current Simulation | Production Mitigation |
|---|---|---|
| **Credential Theft** | High if device is shared (plaintext in `localStorage`) | Implement OAuth 2.0 / OpenID Connect with HttpOnly cookies. |
| **Tampering with Pricing** | Low in UI, High if calling backend directly | Enforce server-side authoritative fare recalculation before payment capture. |
| **Double Booking Race Condition** | None (single-user simulated engine) | Implement distributed Redis locks or PostgreSQL row-level locks on `seats` table. |
| **XSS / Content Injection** | Mitigated by React JSX escaping | Add Content-Security-Policy (CSP) headers and audit third-party dependencies with `npm audit`. |
