# Safar — Premium Intercity Bus Reservation Platform

[![React](https://img.shields.io/badge/React-19.2.8-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.2-purple.svg)](https://vite.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-1.79.0_0_Errors-green.svg)](https://oxc.rs/)
[![Bundle Size](https://img.shields.io/badge/Bundle-337kB_(93kB_gzip)-success.svg)](https://github.com/RaghuBharathi3/BUS)

**Safar** is an enterprise-grade, responsive Single Page Application (SPA) for intercity bus discovery, seat allocation, and booking management across India. Built with **React 19** and **Vite**, Safar eliminates traditional server latency through a deterministic procedural generation engine and a dual-tier client storage model (`localStorage` + `sessionStorage`).

---

## 🚀 Key Features

- **Procedural Transit Synthesis**: Deterministically derives schedules, pricing, ratings, and amenity profiles for any Indian city pair without live database latency.
- **Interactive Multi-Deck Seat Matrix**: Visualizes 2D layouts for Sleeper (Lower/Upper decks) and Seater coaches with live availability, booked states, and designated Ladies-Priority safety berths.
- **Session-Resilient Checkout**: Transparently preserves passenger manifests and active seat buffers in `sessionStorage`, guaranteeing zero data loss across page refreshes or authentication handoffs.
- **Rules-Based Promo Engine**: Automated coupon validation for first-time commuters (`FIRSTTRIP`), high-spend bookings (`ROUTE10`), and weekend travel (`WEEKEND`).
- **Payment Gateway Simulation**: Multi-method checkout supporting UPI (VPA pattern check), Credit/Debit Cards (Luhn 16-digit verification and expiry checks), and NetBanking.
- **Print-Ready Boarding Pass**: High-fidelity digital ticket with simulated QR code and dedicated `@media print` styling for paperless or printed boarding.
- **Passenger Self-Service Dashboard**: Manage active trips and process instant cancellations with tiered policy-driven refunds (90%, 50%, 10%, 0%).

---

## 🛠 Quick Start

### Prerequisites
- Node.js v18.0.0+ (Node.js v22.x or v23.x recommended)
- npm v9.0.0+

### Installation & Launch
```bash
# 1. Clone the repository
git clone https://github.com/RaghuBharathi3/BUS.git
cd BUS

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open `http://localhost:5173/` in your browser.

On Windows, you can also launch the server directly using [`start.bat`](file:///c:/Users/Windows/Documents/BUS/start.bat) and terminate it cleanly using [`stop.bat`](file:///c:/Users/Windows/Documents/BUS/stop.bat).

---

## 🧪 Code Quality & Verification

```bash
# Run Oxlint static analysis (0 warnings, 0 errors)
npm run lint

# Build production bundle
npm run build

# Run automated headless verification
node verify-start-stop.cjs
```

---

## 📚 Comprehensive Documentation & Research Package

All technical guides, academic project reports, research papers, diagrams, and authentic screenshots are organized in the [`docs/`](file:///c:/Users/Windows/Documents/BUS/docs/) directory:

### Core Documentation
- [Project Overview](file:///c:/Users/Windows/Documents/BUS/docs/PROJECT_OVERVIEW.md)
- [System Architecture](file:///c:/Users/Windows/Documents/BUS/docs/SYSTEM_ARCHITECTURE.md)
- [Technical Documentation](file:///c:/Users/Windows/Documents/BUS/docs/TECHNICAL_DOCUMENTATION.md)
- [Module Specifications](file:///c:/Users/Windows/Documents/BUS/docs/MODULE_DOCUMENTATION.md)
- [Internal API Contracts](file:///c:/Users/Windows/Documents/BUS/docs/API_DOCUMENTATION.md)
- [Database & Storage Models](file:///c:/Users/Windows/Documents/BUS/docs/DATABASE_DOCUMENTATION.md)
- [Installation & Setup](file:///c:/Users/Windows/Documents/BUS/docs/INSTALLATION_AND_SETUP.md)
- [Configuration Guide](file:///c:/Users/Windows/Documents/BUS/docs/CONFIGURATION.md)
- [Illustrated User Guide](file:///c:/Users/Windows/Documents/BUS/docs/USER_GUIDE.md)
- [Developer Guide](file:///c:/Users/Windows/Documents/BUS/docs/DEVELOPER_GUIDE.md)
- [Testing Documentation](file:///c:/Users/Windows/Documents/BUS/docs/TESTING_DOCUMENTATION.md)
- [Security & Risk Analysis](file:///c:/Users/Windows/Documents/BUS/docs/SECURITY_DOCUMENTATION.md)
- [Deployment Guide](file:///c:/Users/Windows/Documents/BUS/docs/DEPLOYMENT_DOCUMENTATION.md)
- [Troubleshooting & FAQs](file:///c:/Users/Windows/Documents/BUS/docs/TROUBLESHOOTING.md)
- [Figure & Diagram Index](file:///c:/Users/Windows/Documents/BUS/docs/FIGURE_INDEX.md)

### Academic & Research Publications
- [Full Academic Project Report](file:///c:/Users/Windows/Documents/BUS/docs/academic/PROJECT_REPORT.md) (20 Chapters)
- [IEEE Conference Research Paper](file:///c:/Users/Windows/Documents/BUS/docs/research-paper/RESEARCH_PAPER.md) (LaTeX + BibTeX)
- [Journal Manuscript](file:///c:/Users/Windows/Documents/BUS/docs/journal-paper/JOURNAL_MANUSCRIPT.md) (LaTeX + BibTeX)
- [Research Foundations](file:///c:/Users/Windows/Documents/BUS/docs/research/LITERATURE_REVIEW.md) (Literature Review, Research Gap, Methodology)

---

## 📄 License
This project is developed for academic evaluation, software architecture research, and educational demonstration.
