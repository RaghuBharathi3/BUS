# Figure Index — Safar Bus Reservation Platform

This index catalogs all architectural diagrams, flow charts, sequence diagrams, and authentic application screenshots generated for the Safar project.

---

## 📐 Section 1: Architectural & Engineering Diagrams

| Figure Number | Diagram Title | Source File | Rendered Image | Description | Referenced In |
|---|---|---|---|---|---|
| **Figure D.1** | System Architecture | [`system-architecture.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/system-architecture.mmd) | [`system-architecture.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/system-architecture.png) | High-level 4-tier architecture illustrating the Client Presentation Tier, State Coordination Tier, Logic Engine, and MockDb Persistence Tier. | `SYSTEM_ARCHITECTURE.md`, `TECHNICAL_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 6), `RESEARCH_PAPER.md` (Sec. V) |
| **Figure D.2** | Module Interaction Network | [`module-interaction.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/module-interaction.mmd) | [`module-interaction.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/module-interaction.png) | Dependency and data-passing graph between `App.jsx`, page views, reusable components, and underlying data stores. | `MODULE_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 7) |
| **Figure D.3** | Level-1 Data Flow Diagram | [`data-flow.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/data-flow.mmd) | [`data-flow.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/data-flow.png) | End-to-end data transformation pipeline from initial user search criteria to digital boarding pass generation. | `SYSTEM_ARCHITECTURE.md`, `PROJECT_REPORT.md` (Ch. 6), `JOURNAL_MANUSCRIPT.md` |
| **Figure D.4** | System Use-Case Model | [`use-case.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/use-case.mmd) | [`use-case.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/use-case.png) | Unified use-case diagram illustrating capabilities available to Guest Visitors vs. Authenticated Passengers. | `PROJECT_OVERVIEW.md`, `PROJECT_REPORT.md` (Ch. 5), `USER_GUIDE.md` |
| **Figure D.5** | Entity-Relationship (ER) Model | [`database-er.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/database-er.mmd) | [`database-er.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/database-er.png) | Complete relational data model defining entities: User, Booking, Passenger, FareBreakdown, Bus, Seat, and Boarding/Dropping Points. | `DATABASE_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 8) |
| **Figure D.6** | Booking Flow Sequence | [`booking-flow.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/sequence-diagrams/booking-flow.mmd) | [`booking-flow.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/sequence-diagrams/booking-flow.png) | Step-by-step asynchronous message sequence between Passenger, UI, procedural generator, checkout buffer, and persistence layer. | `TECHNICAL_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 8), `RESEARCH_PAPER.md` |
| **Figure D.7** | Authentication Lifecycle Sequence | [`auth-flow.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/sequence-diagrams/auth-flow.mmd) | [`auth-flow.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/sequence-diagrams/auth-flow.png) | Sequence flow covering registration validation, email deduplication, password verification, and session state initialization. | `SECURITY_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 8) |
| **Figure D.8** | Cancellation & Refund Sequence | [`cancellation-flow.mmd`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/sequence-diagrams/cancellation-flow.mmd) | [`cancellation-flow.png`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/sequence-diagrams/cancellation-flow.png) | User interaction with the Dashboard cancellation modal, tiered refund calculation, and atomic status update in localStorage. | `MODULE_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 8) |

---

## 📸 Section 2: Authentic Application Screenshots

All screenshots below were captured from the verified, running application on port 5173:

| Figure Number | Caption / Figure Name | File Location | Resolution / Dimensions | Viewport State & Highlighted Elements | Referenced In |
|---|---|---|---|---|---|
| **Figure S.1** | Homepage & Search Engine Interface | [`01-home-hero-search.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/01-home-hero-search.png) | 1280 × 920 px | Hero display with typography, 3-field search bar (From, To, Date), Recent Search chips, and popular connection routes. | `USER_GUIDE.md` (Sec. 1), `PROJECT_REPORT.md` (Ch. 10), `PROJECT_OVERVIEW.md` |
| **Figure S.2** | Bus Search Results & Dynamic Filtering | [`02-search-results-listing.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/02-search-results-listing.png) | 1280 × 920 px | Route header with summary chip, left filter panel (AC, Sleeper, Departure time slots, Price range), and sorted bus cards. | `USER_GUIDE.md` (Sec. 2), `PROJECT_REPORT.md` (Ch. 10), `RESEARCH_PAPER.md` |
| **Figure S.3** | Interactive Multi-Deck Seat Matrix | [`03-seat-selection-modal.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/03-seat-selection-modal.png) | 1280 × 920 px | Expanded bus card showing Lower/Upper deck switcher, 2D visual seat grid with booked, available, ladies-priority, and selected berths (1A, 2A). | `USER_GUIDE.md` (Sec. 3), `PROJECT_REPORT.md` (Ch. 10), `RESEARCH_PAPER.md` |
| **Figure S.4** | Passenger Details & Boarding Selection | [`04-passenger-checkout.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/04-passenger-checkout.png) | 1280 × 920 px | Checkout view with Passenger details inputs, contact information, boarding point picker, and fare breakdown summary. | `USER_GUIDE.md` (Sec. 4), `PROJECT_REPORT.md` (Ch. 10) |
| **Figure S.5** | Multi-Method Payment Simulation | [`05-payment-simulation.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/05-payment-simulation.png) | 1280 × 920 px | Active payment module with UPI, Credit/Debit Card, and NetBanking tabs, validation indicators, and Pay & Book button. | `USER_GUIDE.md` (Sec. 5), `SECURITY_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 10) |
| **Figure S.6** | Booking Confirmation & Digital Boarding Pass | [`06-booking-confirmation-ticket.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/06-booking-confirmation-ticket.png) | 1280 × 920 px | Success hero badge, booking reference `BK-662345`, print button, and detailed boarding pass with QR code and passenger manifest. | `USER_GUIDE.md` (Sec. 6), `PROJECT_REPORT.md` (Ch. 10), `JOURNAL_MANUSCRIPT.md` |
| **Figure S.7** | Passenger Dashboard & Trip Management | [`07-user-dashboard-trips.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/07-user-dashboard-trips.png) | 1280 × 920 px | Dashboard navigation showing Upcoming Bookings, Completed Trips, Cancelled Tickets, and Profile Settings. | `USER_GUIDE.md` (Sec. 7), `PROJECT_REPORT.md` (Ch. 10) |
| **Figure S.8** | User Authentication & Quick-Login Interface | [`08-authentication-modal.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/08-authentication-modal.png) | 1280 × 920 px | Centered card modal with Login and Register tabs, email/password validation, and 1-click Quick Login demo shortcuts. | `USER_GUIDE.md` (Sec. 8), `SECURITY_DOCUMENTATION.md`, `PROJECT_REPORT.md` (Ch. 10) |
| **Figure S.9** | Customer Support Center & FAQ Guidelines | [`09-help-and-faqs.png`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/09-help-and-faqs.png) | 1280 × 920 px | Tiered refund guideline table (90% >24h, 50% 12-24h, 10% <12h), interactive FAQ accordions, and inquiry feedback form. | `USER_GUIDE.md` (Sec. 9), `PROJECT_REPORT.md` (Ch. 10) |

---

## 📂 Physical Storage Verification

All 17 image files are stored in the project workspace:
1. Master visual assets: [`docs/diagrams/`](file:///c:/Users/Windows/Documents/BUS/docs/diagrams/) and [`docs/screenshots/`](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/)
2. Academic conference paper copy: [`docs/research-paper/figures/`](file:///c:/Users/Windows/Documents/BUS/docs/research-paper/figures/)
3. Academic journal manuscript copy: [`docs/journal-paper/figures/`](file:///c:/Users/Windows/Documents/BUS/docs/journal-paper/figures/)
