# Developer Guide — Safar Bus Reservation Platform

---

## 1. Development Prerequisites & Architecture Principles

To contribute to Safar, developers should understand three core architectural principles:
1. **Zero External UI Frameworks**: Styling is authored strictly in Vanilla CSS via design tokens (`src/index.css`). Do not install Tailwind, Bootstrap, or component libraries.
2. **Deterministic Data Synthesis**: All transit data must be generated algorithmically using seed hashes (`src/data/buses.js`) to guarantee reproducible testing without an external backend.
3. **Dual-Tier State Durability**: In-progress transactional data must be buffered in `sessionStorage`, while permanent entity records must be committed through `src/data/mockDb.js` into `localStorage`.

---

## 2. Setting Up the Development Workspace

```bash
# 1. Clone repository
git clone https://github.com/RaghuBharathi3/BUS.git
cd BUS

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev
```
The server starts at `http://localhost:5173/` with Hot Module Replacement (HMR).

---

## 3. Project Directory Structure

```text
BUS/
├── public/                 # Static assets (favicon.svg, icons.svg)
├── src/
│   ├── assets/             # Project media assets
│   ├── components/         # Reusable presentation components
│   │   ├── BusCard.jsx     # Individual bus listing card
│   │   ├── CouponSection.jsx # Promo code input and available coupons
│   │   ├── FareSummary.jsx # Price, fees, tax, and discount breakdown
│   │   ├── FilterPanel.jsx # Sidebar filters (type, time, operator, price)
│   │   ├── Footer.jsx      # Global footer
│   │   ├── Icon.jsx        # SVG sprite & inline vector icon helper
│   │   ├── Navbar.jsx      # Navigation bar with user session indicator
│   │   ├── PassengerForm.jsx # Passenger name/age/gender fields
│   │   ├── PaymentForm.jsx # Simulated payment options (UPI, Card, NetBanking)
│   │   ├── SearchBox.jsx   # City origin/destination & date selector
│   │   ├── SeatMap.jsx     # 2D Lower & Upper deck seat visualizer
│   │   ├── Ticket.jsx      # Printable boarding pass card
│   │   └── Toast.jsx       # Floating feedback toast notifications
│   ├── data/               # Procedural engines and simulated storage
│   │   ├── buses.js        # Deterministic bus & seat generator
│   │   ├── cities.js       # Curated metropolitan transit hubs
│   │   ├── coupons.js      # Promo rule definitions & validation
│   │   └── mockDb.js       # LocalStorage relational database API
│   ├── pages/              # Primary route views
│   │   ├── Auth.jsx        # Login & user registration
│   │   ├── BookingConfirmation.jsx # Success screen with boarding pass
│   │   ├── Checkout.jsx    # Booking form and payment coordinator
│   │   ├── Dashboard.jsx   # Upcoming/completed trips and profile
│   │   ├── Help.jsx        # FAQs and refund policies
│   │   ├── Home.jsx        # Landing hero and discovery
│   │   └── SearchResults.jsx # Inventory list and filter controls
│   ├── utils/              # Pure utility functions
│   │   ├── fare.js         # Fare calculation formulas
│   │   └── format.js       # Currency, date, time formatters & hashSeed
│   ├── App.jsx             # Application root, routing, and state manager
│   ├── index.css           # Global design tokens and component styles
│   └── main.jsx            # React 19 DOM entry mount point
├── .oxlintrc.json          # Oxlint static code analyzer rules
├── package.json            # Scripts and dependencies
├── verify-start-stop.cjs   # Headless automated verification script
└── vite.config.js          # Vite React plugin configuration
```

---

## 4. How to Extend the Application

### 4.1 Adding a New City Transit Hub
To register a new city, edit `src/data/cities.js`:
```javascript
export const cities = [
  // ... existing cities
  { id: '11', name: 'Ahmedabad', state: 'Gujarat', code: 'AMD' }
];
```
Then, update `getBoardingPoints` and `getDroppingPoints` in `src/data/buses.js` to define localized pickup and drop-off stations for that city.

### 4.2 Adding a New Promotional Coupon
To introduce a new promotional voucher, edit `src/data/coupons.js`:
```javascript
{
  code: 'FESTIVE20',
  description: 'Special 20% festive discount on fares above ₹1,000',
  discountType: 'percentage',
  discountValue: 20,
  minFare: 1000,
  maxDiscount: 300,
  validate: (userBookings, travelDate) => {
    // Custom eligibility logic
    return true;
  },
  invalidMessage: 'Coupon valid only during the festive season.'
}
```

### 4.3 Customizing UI Design Tokens
All styling parameters are defined in `:root` inside `src/index.css`:
- To adjust the brand primary color: modify `--brand-primary: #1e3a8a;`.
- To alter border radius standards: adjust `--radius-sm: 4px;`, `--radius-md: 8px;`, `--radius-lg: 12px;`.

---

## 5. Development Commands & Workflow

| Command | Action | Output / Description |
|---|---|---|
| `npm run dev` | Starts Vite dev server | Runs on `http://localhost:5173/` with live HMR. |
| `npm run lint` | Executes Oxlint analysis | Scans all `.js` and `.jsx` files in ~130ms. |
| `npm run build` | Compiles production assets | Outputs optimized files to `dist/`. |
| `npm run preview`| Previews production build | Tests production bundle locally on port `4173`. |
| `node verify-start-stop.cjs` | Runs automated verification | Headless HTTP and process assertion suite. |

---

## 6. Code Style & Quality Invariants

1. **React 19 Hooks**:
   - Always wrap event callbacks passed to children in `useCallback` when memoization is critical (`onSearchBus`, `handleSelectSeats`, `triggerToast`).
   - Use `useMemo` for derived filter lists and distinct operator arrays in `SearchResults.jsx`.
2. **Session Storage Sanitation**:
   - Never write sensitive unmasked passwords into `sessionStorage`.
   - Clear session keys (`safar_checkout_form`, `safar_selected_seats`) upon successful booking completion.
3. **Accessibility**:
   - Ensure all interactive elements feature descriptive `aria-label` or `aria-expanded` attributes.
   - Maintain a minimum WCAG 2.1 AA color contrast ratio across all text and icon tokens.
