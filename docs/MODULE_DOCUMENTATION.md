# Module Documentation — Safar Bus Reservation Platform

---

## 1. Overview of Modules

This document provides a comprehensive breakdown of every production component, page view, procedural engine, and utility in the Safar codebase.

```text
src/
├── App.jsx                     [Root Application Orchestrator]
├── pages/
│   ├── Home.jsx                [Homepage & Discovery View]
│   ├── SearchResults.jsx       [Bus Inventory & Filter View]
│   ├── Checkout.jsx            [Passenger & Payment Orchestrator]
│   ├── BookingConfirmation.jsx [Boarding Pass View]
│   ├── Dashboard.jsx           [User Trip Management View]
│   ├── Auth.jsx                [Login & Registration View]
│   └── Help.jsx                [Policy & Support Center]
├── components/
│   ├── Navbar.jsx              [Top Navigation Header]
│   ├── Footer.jsx              [Global Site Footer]
│   ├── Toast.jsx               [Notification Dispatcher]
│   ├── Icon.jsx                [SVG Vector Icon Provider]
│   ├── SearchBox.jsx           [Route & Date Search Form]
│   ├── FilterPanel.jsx         [Multi-Facet Inventory Filter]
│   ├── BusCard.jsx             [Bus Inventory Item Card]
│   ├── SeatMap.jsx             [Interactive 2D Deck Grid]
│   ├── PassengerForm.jsx       [Passenger Data Entry Form]
│   ├── PaymentForm.jsx         [Multi-Method Payment Simulator]
│   ├── FareSummary.jsx         [Real-Time Pricing Breakdown]
│   ├── CouponSection.jsx       [Promo Code Input & List]
│   └── Ticket.jsx              [Print-Ready Boarding Pass]
├── data/
│   ├── buses.js                [Procedural Bus & Seat Synthesizer]
│   ├── cities.js               [Curated Metropolitan City List]
│   ├── coupons.js              [Promotion Rules & Discount Calculator]
│   └── mockDb.js               [LocalStorage Relational Database API]
└── utils/
    ├── fare.js                 [Mathematical Fare & Tax Formulas]
    └── format.js               [Currency, Date, and Time Formatters]
```

---

## 2. Page View Modules

### Module: `App.jsx`
- **Purpose**: Root application component and global state coordinator.
- **Responsibilities**: Manages global user state, active page routing, session storage caching, route guards, and toast notifications.
- **Inputs**: Window `hashchange` events, session storage entries (`safar_search_params`, `safar_selected_seats`, `safar_checkout_bus`).
- **Processing**: Normalizes hash routes via `pageFromHash()`, executes route guards (`effectivePage`), syncs browser URL via `history.replaceState()`, handles logout and login transitions.
- **Outputs**: Renders `Navbar`, active page component, `Footer`, and `Toast`.
- **Dependencies**: React 19 hooks (`useState`, `useEffect`, `useCallback`), all 7 page views, `Navbar`, `Footer`, `Toast`, `mockDb`.
- **Database Interaction**: Reads and updates `mockDb.getCurrentUser()` and `mockDb.getBookings()`.
- **Security**: Guard verification blocks unauthenticated access to the Dashboard and prevents direct checkout access without an active bus selection.

---

### Module: `Home.jsx`
- **Purpose**: Landing page providing instant discovery, recent search history, popular connections, and value propositions.
- **Responsibilities**: Collects search parameters, stores recent search queries in `localStorage` (`safar_recent_searches`), offers 1-click popular routes.
- **Inputs**: `onSearchBus(from, to, date)` callback.
- **Processing**: Deduplicates recent searches, computes tomorrow's date for quick routes, triggers page navigation.
- **Outputs**: Renders hero banner, `SearchBox`, recent search chip list, popular route connection cards, and value proposition cards.
- **Dependencies**: `SearchBox`, `Icon`, `getTomorrowDateStr`.

---

### Module: `SearchResults.jsx`
- **Purpose**: Bus inventory presentation, faceted filtering, and sorting control.
- **Responsibilities**: Retrieves procedurally synthesized bus inventory, executes multi-criteria filtering, applies sorting orders, controls mobile filter drawer.
- **Inputs**: `searchParams` ({ from, to, date }), `onSearch`, `onSelectBusSeats`, `selectedSeatsState`, `onContinueCheckout`.
- **Processing**: Simulates a 650ms asynchronous network latency, evaluates memoized filters (AC, Sleeper, price slider, departure time slots, operators), sorts results by price, duration, rating, or departure.
- **Outputs**: Rendered list of `BusCard` elements, active filter summary, and empty state handler.
- **Dependencies**: `getBusesForRoute`, `FilterPanel`, `BusCard`, `SearchBox`, `Icon`, `formatDate`.

---

### Module: `Checkout.jsx`
- **Purpose**: Transaction orchestration, passenger information entry, promo application, and payment gateway activation.
- **Responsibilities**: Collects passenger manifests, handles boarding point selection, computes real-time fares, unlocks payment upon validation.
- **Inputs**: `bus` entity, `selectedSeats` array, `currentUser` object, `userBookings` array, `onBookingComplete`, `onNavigateHome`.
- **Processing**: Restores form inputs from `sessionStorage` (`safar_checkout_form`), validates non-empty names and ages (1–120), calculates fare with `calculateFare()`, unlocks payment module.
- **Outputs**: Multi-passenger input fields, boarding point dropdown, promo discount section, payment simulation form.
- **Dependencies**: `PassengerForm`, `CouponSection`, `FareSummary`, `PaymentForm`, `calculateFare`, `formatDate`, `formatTime`.

---

### Module: `BookingConfirmation.jsx`
- **Purpose**: Post-booking confirmation screen and boarding pass delivery.
- **Responsibilities**: Displays celebratory booking status, exposes ticket management and navigation buttons, renders digital boarding pass.
- **Inputs**: `booking` object ({ id, userEmail, operatorName, fromCity, toCity, travelDate, seatsSelected, fareDetails, ... }), `onNavigate`.
- **Processing**: Checks booking validity, redirects to home if empty, renders `Ticket`.
- **Outputs**: Confirmation hero banner and embedded printable `Ticket`.
- **Dependencies**: `Ticket`, `Icon`.

---

### Module: `Dashboard.jsx`
- **Purpose**: Passenger self-service portal for managing bookings and profile data.
- **Responsibilities**: Displays user booking history categorized by status, enables profile editing, processes ticket cancellations with automated refund calculation.
- **Inputs**: `currentUser`, `onProfileUpdate`, `onNavigateHome`, `onNavigate`.
- **Processing**: Filters bookings into Upcoming, Completed, and Cancelled tabs; computes cancellation refund using tiered policy; triggers `mockDb.cancelBooking()`.
- **Outputs**: Booking summary cards, cancellation confirmation modal, profile update form with phone and name validation.
- **Dependencies**: `mockDb`, `Ticket`, `Icon`, `formatDate`.

---

### Module: `Auth.jsx`
- **Purpose**: User registration and authentication modal.
- **Responsibilities**: Handles credential login and account creation, performs client-side field validation, provides 1-click Quick-Login demo buttons.
- **Inputs**: `onAuthSuccess(user)` callback.
- **Processing**: Validates email format, 10-digit phone number, and minimum 6-character password; interfaces with `mockDb.registerUser()` and `mockDb.loginUser()`.
- **Outputs**: Tabbed card interface for Login and Register.
- **Dependencies**: `mockDb`, `Icon`.

---

### Module: `Help.jsx`
- **Purpose**: Customer support information, policy transparency, and inquiry intake.
- **Responsibilities**: Explains the 4-tier refund policy, provides expandable FAQ accordions, collects feedback inquiries.
- **Inputs**: User interaction events.
- **Outputs**: Policy table (90% > 24h, 50% 12–24h, 10% < 12h, 0% after departure), FAQ accordion cards, feedback submission form.
- **Dependencies**: `Icon`.

---

## 3. Presentation Component Modules

### Module: `BusCard.jsx`
- **Purpose**: Interactive card representing an individual bus service.
- **Responsibilities**: Displays departure/arrival timeline, duration, operator rating, amenities, and toggleable seat map.
- **Inputs**: `bus` object, `onSeatSelect`, `selectedSeats`, `onContinueCheckout`.
- **Outputs**: Header with operator branding, timeline bar, amenity badges, price, and expandable `SeatMap` panel.

### Module: `SeatMap.jsx`
- **Purpose**: Visual 2D multi-deck bus seat selection grid.
- **Responsibilities**: Renders Lower and Upper deck layouts for sleepers and 2+2 rows for seaters, handles seat click events, enforces availability and ladies-priority styling.
- **Inputs**: `seats` array, `isSleeper` boolean, `selectedSeats` array, `onSeatClick` handler.
- **Outputs**: Deck switcher tabs, seat buttons with status classes (`is-selected`, `is-ladies`, `disabled`).

### Module: `PassengerForm.jsx`
- **Purpose**: Input form for individual traveler names, ages, and genders.
- **Responsibilities**: Binds input state per selected seat number, renders error notices.
- **Inputs**: `passengers` array, `onChange(index, field, value)`, `errors` object.

### Module: `PaymentForm.jsx`
- **Purpose**: Simulated multi-method payment processor.
- **Responsibilities**: Renders UPI, Credit/Debit Card, and NetBanking tabs; executes Luhn card validation and UPI regex check; simulates 2-phase payment processing.
- **Inputs**: `totalAmount`, `onPaymentSuccess(method)`.

### Module: `FareSummary.jsx`
- **Purpose**: Itemized financial receipt preview.
- **Responsibilities**: Displays Base Fare, Taxes (5% GST), Convenience Fee, Coupon Discount, and Final Amount Payable.

### Module: `CouponSection.jsx`
- **Purpose**: Promo voucher activation module.
- **Responsibilities**: Validates user coupon code, provides 1-click apply buttons for public promo codes (`FIRSTTRIP`, `ROUTE10`, `WEEKEND`).

### Module: `Ticket.jsx`
- **Purpose**: High-fidelity digital boarding pass.
- **Responsibilities**: Displays route details, departure dates, seat numbers, passenger manifest, payment receipt, and simulated QR barcode. Supports browser printing via `window.print()`.

---

## 4. Data & Utility Modules

### Module: `buses.js`
- **Purpose**: Deterministic procedural inventory generator.
- **Exports**: `getBusesForRoute(fromCity, toCity, dateString)`.

### Module: `cities.js`
- **Purpose**: Curated list of 10 primary transit hubs in India.
- **Exports**: `cities` array with city name, state, and airport/station code.

### Module: `coupons.js`
- **Purpose**: Discount evaluation and rule verification engine.
- **Exports**: `coupons` array, `calculateDiscount()`.

### Module: `mockDb.js`
- **Purpose**: Client-side relational database simulator backed by `localStorage`.
- **Exports**: `mockDb` object with `registerUser`, `loginUser`, `logoutUser`, `getCurrentUser`, `updateProfile`, `getBookings`, `addBooking`, and `cancelBooking`.

### Module: `fare.js`
- **Purpose**: Mathematical calculation of fare components.
- **Exports**: `calculateFare(basePrice, seatsCount, activeCoupon)`.

### Module: `format.js`
- **Purpose**: Formatting utilities for dates, times, currency, and deterministic string hashing.
- **Exports**: `formatTime`, `formatDate`, `formatINR`, `getTodayDateStr`, `getTomorrowDateStr`, `hashSeed`.
