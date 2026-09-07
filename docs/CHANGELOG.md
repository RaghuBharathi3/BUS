# Changelog — Safar Bus Reservation Platform

All notable changes, milestones, and releases of the **Safar** bus reservation platform are documented in this file.

---

## [1.0.0] — Initial Release

### Added
- **Core Architecture**:
  - React 19 Single Page Application architecture with zero external UI dependencies.
  - Hash-based client routing (`#/`, `#/search`, `#/checkout`, `#/confirmation`, `#/auth`, `#/dashboard`, `#/help`) with route guards.
  - Dual-tier state persistence using `sessionStorage` for transaction buffers and `localStorage` for relational simulation.
- **Discovery & Search**:
  - Search engine supporting 10 major Indian transit hubs with date pickers.
  - Recent search chip history and 1-click popular routes.
- **Inventory & Procedural Synthesis**:
  - Deterministic bus generator (`getBusesForRoute`) deriving realistic schedules, durations, and pricing from route seeds.
  - Multi-criteria filtering (AC/Non-AC, Sleeper/Seater, departure time slots, price slider, operators).
  - Sorting by recommended, cheapest, earliest, duration, and rating.
- **Interactive Seat Matrix**:
  - 2D layout for Sleeper (Lower/Upper decks) and Seater buses.
  - Real-time seat statuses: Available, Booked, Selected, and Ladies-Priority.
  - Maximum 6-seat selection guard with live fare calculation.
- **Checkout & Transaction Flow**:
  - Multi-passenger detail entry form with age/gender inputs and validation.
  - Boarding point selector with localized station times.
  - Rules-based promotional coupon engine (`FIRSTTRIP`, `ROUTE10`, `WEEKEND`).
  - Multi-method payment simulator supporting UPI (VPA validation), Credit/Debit Card (Luhn check, expiry validation), and NetBanking.
- **Ticketing & Dashboard**:
  - Digital print-ready boarding pass with barcode simulation and ticket reference (`BK-xxxxxx`).
  - User Dashboard with Upcoming, Completed, and Cancelled trip tabs.
  - Self-service cancellation with automated tiered refund calculations (90%, 50%, 10%, 0%).
  - Profile settings editor with phone and name validation.
- **Customer Support**:
  - Help Center with official cancellation policy matrix and interactive FAQ accordions.
- **Quality & Documentation**:
  - Complete Oxlint static analysis setup with zero warnings across 30 files.
  - Automated headless start/stop verification script (`verify-start-stop.cjs`).
  - Comprehensive documentation suite and academic publication package in `docs/`.
