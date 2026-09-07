# Technical Documentation — Safar Bus Reservation Platform

---

## 1. Technical Stack Specifications

- **Runtime Environment**: Modern Evergreen Web Browsers (Chromium 90+, Firefox 88+, Safari 14+, Edge 90+).
- **Core Library**: React v19.2.8 (`react`, `react-dom`).
- **Module Bundler**: Vite v8.2.2 (using `@vitejs/plugin-react` v6.1.0 with Oxc AST transformer).
- **Static Code Analysis**: Oxlint v1.79.0 (104 active rules targeting syntax correctness and React performance).
- **Styling Architecture**: Vanilla CSS with custom properties (CSS variables design tokens), CSS Grid, and Flexbox layouts.
- **Language Level**: JavaScript ECMAScript 2022+ (ES modules, optional chaining, nullish coalescing, arrow functions).

---

## 2. Core Application Orchestration (`src/App.jsx`)

`App.jsx` functions as the application orchestrator and state coordinator. It manages session persistence, global navigation, authentication state, and route guards.

### Route Guard Implementation
```javascript
// Route guards — derive the page we may actually render so the URL stays honest
const effectivePage = (() => {
  if (page === 'dashboard' && !currentUser) return 'auth';
  if (page === 'checkout' && !checkoutBus) return 'search';
  if (page === 'confirmation' && !confirmedBooking) return 'home';
  return page;
})();

// Keep the URL in sync with the effective page without pushing duplicate history entries
useEffect(() => {
  const expected = `#${ROUTES[effectivePage]}`;
  if (window.location.hash !== expected) {
    history.replaceState(null, '', expected);
  }
}, [effectivePage]);
```

### Key Technical Characteristics of `App.jsx`
1. **Hash Synchronization**: Listens to `window.addEventListener('hashchange')` to support native browser history traversal (Back/Forward).
2. **Session Storage Hooks**: Automatically serializes `searchParams`, `selectedSeatsState`, `checkoutBus`, and `confirmedBooking` to `sessionStorage` whenever changed.
3. **Optimistic State Cleanup**: Purges `safar_checkout_form` and seat reservation buffers immediately upon booking completion.

---

## 3. Deterministic Procedural Data Engine (`src/data/buses.js`)

Instead of mocking a static JSON file, Safar uses a deterministic algorithmic synthesizer that constructs realistic transit data on the fly.

### Hash Seed Derivation
```javascript
export const hashSeed = (str) =>
  String(str).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
```
Given a city pair and date string (e.g., `"Chennai-Bengaluru-2026-09-15"`), `hashSeed` produces a consistent integer. All subsequent properties (pricing, departure time, bus count, operator assignments) are derived via modulo arithmetic on this seed, guaranteeing that identical searches produce identical results across page refreshes.

### Dynamic Pricing & Duration Model
Base duration and price are calibrated according to known geographic transit corridors in southern and western India:
```javascript
const key = `${fromCity}-${toCity}`;
if (key.includes('Mumbai') && key.includes('Pune')) {
  baseDurationMinutes = 200; // ~3.3 hours
  basePrice = 450;
} else if (key.includes('Chennai') && key.includes('Bengaluru')) {
  baseDurationMinutes = 390; // ~6.5 hours
  basePrice = 750;
} else if (key.includes('Hyderabad') && key.includes('Bengaluru')) {
  baseDurationMinutes = 540; // ~9.0 hours
  basePrice = 1100;
} else if (key.includes('Goa')) {
  baseDurationMinutes = 660; // ~11 hours
  basePrice = 1300;
}
```
Bus categories apply deterministic multipliers:
- **A/C Sleeper (2+1)**: 1.40× multiplier
- **A/C Seater (2+2)**: 1.15× multiplier
- **Non-A/C Sleeper (2+1)**: 1.05× multiplier
- **Non-A/C Seater (2+2)**: 0.85× multiplier

### Procedural Seat Matrix Algorithm (`generateSeatMatrix`)
The generator allocates seats into physical deck layouts:
1. **Sleeper Berths**: 15 Lower deck berths (`L1`–`L15`) and 15 Upper deck berths (`U1`–`U15`). Each deck uses a 1+2 transverse berth arrangement (Single Left Window, Double Right Aisle/Window).
2. **Seater Chairs**: 40 Lower deck seats (`1A`–`10D`) structured in a 2+2 layout (Window-Aisle-Aisle-Window).
3. **Deterministic Booking & Safety Scattering**:
```javascript
// Use primes coprime to the modulus so bookings scatter across columns
const isLReserved = (hash + i * 11) % 6 === 0;
const isLadies = isLReserved ? false : (hash + i * 17) % 13 === 0;
```
This formula ensures realistic occupancy ratios (~15–30% booked) and assigns solo female safety reservations without hardcoded arrays.

---

## 4. Promotion & Discount Engine (`src/data/coupons.js`)

The coupon engine enforces functional validation predicates against passenger booking history and travel dates:

| Coupon Code | Discount Type | Discount Rule | Validation Predicate |
|---|---|---|---|
| `FIRSTTRIP` | Percentage (15%) | Max discount ₹150; Min fare ₹400 | Valid only if `userBookings.filter(b => b.status !== 'Cancelled').length === 0`. |
| `ROUTE10` | Flat (₹100) | Flat ₹100 discount; Min fare ₹600 | Universally eligible for all users meeting minimum fare. |
| `WEEKEND` | Percentage (10%) | Max discount ₹250; Min fare ₹800 | Valid only when `travelDate` falls on Saturday (day 6) or Sunday (day 0). |

---

## 5. Fare Breakdown Engine (`src/utils/fare.js`)

A centralized calculation utility ensures identical mathematical calculations across `BusCard`, `SeatMap`, `Checkout`, and `BookingConfirmation`:
```javascript
export const calculateFare = (basePrice, seatsCount, activeCoupon = null) => {
  const baseFare = basePrice * seatsCount;
  const convenienceFee = seatsCount > 0 ? 40 : 0;
  const taxes = Math.round(baseFare * 0.05); // 5% GST
  const discount = activeCoupon ? activeCoupon.discountAmount : 0;
  const totalFare = Math.max(0, baseFare + convenienceFee + taxes - discount);
  return { baseFare, convenienceFee, taxes, discount, totalFare };
};
```

---

## 6. Simulated Persistence Layer (`src/data/mockDb.js`)

`mockDb` provides an asynchronous-compatible repository API wrapping `window.localStorage`:
- **Default Seeding**: Automatically initializes `DEFAULT_USERS` (including demo account `arun@safar.com`) and `DEFAULT_BOOKINGS` (`BK-100234` completed trip, `BK-100109` cancelled trip) if `safar_users` or `safar_bookings` are absent.
- **Atomic Operations**:
  - `registerUser(name, email, password, phone)`: Validates email uniqueness before appending to `safar_users`.
  - `loginUser(email, password)`: Verifies credentials and serializes active user to `safar_current_user`.
  - `addBooking(bookingData)`: Generates a unique booking identifier (`BK-${Math.floor(100000 + Math.random() * 900000)}`), records UTC creation timestamp, and prepends to `safar_bookings`.
  - `cancelBooking(bookingId)`: Updates booking status to `'Cancelled'`, sets `cancelledAt` timestamp, and persists the update.

---

## 7. CSS Design System Architecture (`src/index.css`)

The application's visual presentation is defined in a single, well-structured CSS system (55 kB unminified, 44 kB built, 8.6 kB gzipped) structured around custom design tokens:

### Color System & Design Tokens
```css
:root {
  --brand-primary: #1e3a8a;       /* Deep Navy */
  --brand-primary-hover: #172554;
  --brand-accent: #0284c7;        /* Cerulean Blue */
  --brand-accent-light: #e0f2fe;
  --brand-surface: #ffffff;
  --brand-bg: #f8fafc;            /* Crisp Off-White */
  --brand-text: #0f172a;          /* Slate 900 */
  --brand-text-muted: #64748b;    /* Slate 500 */
  --brand-border: #e2e8f0;        /* Slate 200 */
  --status-success: #16a34a;      /* Emerald Green */
  --status-warning: #ea580c;      /* Amber Orange */
  --status-danger: #dc2626;       /* Crimson Red */
}
```

### Key UI Subsystems
1. **Interactive Deck Layout** (`.seat-grid`, `.seat-row`, `.aisle`): Renders realistic bus deck floorplans with CSS Grid, handling dynamic seat coloring (available, booked, selected, ladies-priority).
2. **Boarding Pass Ticket Styling** (`.ticket__card`, `.ticket__head`, `.ticket__body`, `.ticket__barcode`): Mimics an authentic airline/bus boarding pass with perforated dividers, route diagrams, and printable layouts.
3. **Print Media Styles** (`@media print`): Hides non-printable chrome (`.no-print`, navbar, footer, buttons) and reformats the ticket to standard A4/letter page boundaries.

---

## 8. Verification & Performance Benchmarks

- **Static Linter**: 0 errors, 0 warnings with `oxlint` across all 30 source files.
- **Build Compression**:
  - `dist/index.html`: 0.66 kB (0.41 kB gzip)
  - `dist/assets/index-*.css`: 44.04 kB (8.60 kB gzip)
  - `dist/assets/index-*.js`: 292.88 kB (84.32 kB gzip)
- **Time to Interactive (TTI)**: Under 250ms on standard desktop browsers.
