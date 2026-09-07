# Fact-Check Matrix — Safar Bus Reservation Platform

---

## 1. Traceability Matrix

Every factual claim in the documentation suite is mapped directly to source files, line ranges, or empirical test logs below:

| Claim in Documentation | Source in Workspace | Verified? | Verification Notes & Location |
|---|---|---|---|
| **Framework**: React 19.2.8 is used | `package.json:L13-14` | **Yes** | `"react": "^19.2.8"`, `"react-dom": "^19.2.8"` |
| **Bundler**: Vite 8.2.2 is used | `package.json:L21` | **Yes** | `"vite": "^8.2.2"` |
| **Linter**: Oxlint 1.79.0 is configured | `package.json:L20`, `.oxlintrc.json` | **Yes** | Passed with 0 errors/warnings on 30 files |
| **Styling**: Vanilla CSS design tokens | `src/index.css:L1-40` | **Yes** | Custom `--brand-*` CSS variables defined in `:root` |
| **Routing**: Hash-based client routing | `src/App.jsx:L16-31` | **Yes** | `ROUTES = { home, search, checkout, confirmation, auth, dashboard, help }` |
| **Route Guards**: Dashboard requires login | `src/App.jsx:L95-100` | **Yes** | `if (page === 'dashboard' && !currentUser) return 'auth';` |
| **Route Guards**: Checkout requires selected bus | `src/App.jsx:L97` | **Yes** | `if (page === 'checkout' && !checkoutBus) return 'search';` |
| **City Network**: 10 primary Indian hubs | `src/data/cities.js:L1-12` | **Yes** | Chennai, Bengaluru, Hyderabad, Coimbatore, Madurai, Kochi, Trivandrum, Pune, Mumbai, Goa |
| **Deterministic Generator**: Seeded calculation | `src/data/buses.js:L183-189` | **Yes** | `seedString = \`${fromCity}-${toCity}-${dateString}\`` |
| **Operator Brands**: 7 specific operators | `src/data/buses.js:L2-10` | **Yes** | Safar Luxe Class, Parveen, VRL, Orange, SRS, National, Paulo |
| **Sleeper Layout**: 30 berths (Lower + Upper) | `src/data/buses.js:L107-154` | **Yes** | 15 Lower (L1–L15) and 15 Upper (U1–U15) |
| **Seater Layout**: 40 seats in 2+2 format | `src/data/buses.js:L156-178` | **Yes** | 10 rows (1A–10D) |
| **Safety Seats**: Ladies-priority allocation | `src/data/buses.js:L124,141,164` | **Yes** | Evaluated via coprime prime modulo `(hash + i * 17) % 13 === 0` |
| **Seat Limit**: Maximum 6 seats per booking | `src/App.jsx:L142-146` | **Yes** | `if (current.length >= 6) triggerToast('You can select a maximum of 6 seats...')` |
| **Coupons**: `FIRSTTRIP`, `ROUTE10`, `WEEKEND` | `src/data/coupons.js:L1-40` | **Yes** | Rules enforce first-time booking, ₹600 spend, and Sat/Sun travel |
| **Fare Formula**: Base + ₹40 fee + 5% GST | `src/utils/fare.js:L1-8` | **Yes** | `taxes = Math.round(baseFare * 0.05)`, `convenienceFee = 40` |
| **Payment Methods**: UPI, Card, NetBanking | `src/components/PaymentForm.jsx:L7-54` | **Yes** | UPI VPA check, Luhn 16-digit card check, bank list selector |
| **Boarding Pass**: Printable ticket view | `src/components/Ticket.jsx:L11-23` | **Yes** | Features `window.print()` and `@media print` CSS |
| **Cancellation Refund**: 4 policy tiers | `src/pages/Help.jsx:L54-63` | **Yes** | >24h: 90%, 12–24h: 50%, <12h: 10%, Post-departure: 0% |
| **Session Buffers**: Dual-tier storage | `src/App.jsx:L33-45,77-93` | **Yes** | `sessionStorage` for checkout buffers; `localStorage` for `safar_bookings` |
| **Static Analysis Score**: 0 errors, 0 warnings | Terminal `npm run lint` log | **Yes** | 0 warnings and 0 errors across 30 files in 137ms |
| **Bundle Size**: 292.88 kB JS, 44.04 kB CSS | Terminal `npm run build` log | **Yes** | Verified via Vite production build output |
