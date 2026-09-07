# Academic Abstract — Safar Bus Reservation Platform

---

## Abstract

Intercity bus transit in emerging markets, notably across India's regional transit corridors, faces persistent digital barriers including high initial page latencies, heavy client framework overheads, and fragile transactional states during multi-stage checkout flows. This project presents **Safar**, an enterprise-grade, client-centric Single Page Application (SPA) designed to deliver a zero-latency, session-resilient bus reservation and ticketing experience. 

Built using **React 19**, **Vite**, and custom **Vanilla CSS design tokens**, the platform replaces traditional high-latency server round trips with a deterministic procedural generation engine and a dual-tier client storage model (`localStorage` and `sessionStorage`). The system features interactive 2D deck seat selection supporting both sleeper (Lower/Upper decks) and seater (2+2) configurations, automated safety-aware ladies-priority seat allocation, functional promotional voucher verification, simulated multi-method payment authorization, and an automated refund engine based on departure proximity.

Evaluated through comprehensive static code analysis (Oxlint: 0 errors and 0 warnings across 30 source files) and production compilation verification, the platform achieves an optimized production bundle size of 292.88 kB JS (84.32 kB gzip) and 44.04 kB CSS (8.60 kB gzip). Automated headless tests and interactive browser user journeys confirm sub-250ms interactive transitions, complete session recovery across accidental browser refreshes, and consistent mathematical determinism across all route queries.

**Keywords**: Bus Reservation System, Single Page Application (SPA), React 19, Deterministic Procedural Generation, Client-Side State Durability, Multi-Deck Seat Allocation, Transit Ticketing.
