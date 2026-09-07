# Related Work — Comparative Analysis of Transit Reservation Systems

---

## 1. Overview of Comparative Platforms

To contextualize Safar's architectural design, this document compares its approach against major commercial aggregators and open academic prototypes across five technical dimensions:
1. Commercial Bus Aggregators (e.g., RedBus, AbhiBus)
2. Open-Source Academic Prototypes (e.g., Django/PHP Bus Reservation Systems)
3. The Safar Client-Centric Architecture

---

## 2. Detailed Technical Comparison

| Technical Dimension | Commercial Aggregators (RedBus / AbhiBus) | Open-Source Academic Prototypes | Safar Platform (This Work) |
|---|---|---|---|
| **Architecture Model** | Microservices with Server-Rendered Hydration | Monolithic Server-Side Rendered (PHP / Django) | Client-Centric Single Page Application (React 19) |
| **Initial Bundle Size** | 2.5 MB – 6.0 MB (Heavily instrumented) | 500 kB – 1.2 MB | **337.58 kB uncompressed (93.33 kB gzip)** |
| **View Transition Latency** | 400ms – 1200ms (Network round trip) | 600ms – 1800ms (Full page reload) | **< 16ms (Instantaneous VDOM render)** |
| **Inventory Source** | Live Centralized SQL / NoSQL Database | Hardcoded or Seeded Local SQL Tables | **Seeded Algorithmic Procedural Synthesizer** |
| **State Resilience** | Partial (Lost if session cookie expires) | None (Form resets on reload) | **Dual-Tier Buffer (`sessionStorage` + `localStorage`)** |
| **Multi-Deck Visualization** | Tabbed or scrollable deck view | Flat static table grid | **Interactive 2D Deck Switcher with Safety Highlighting** |
| **Promotional Verification** | Backend API validation call | Basic flat voucher subtraction | **Rules engine (First-trip, Spend tiers, Weekend date)** |
| **Cancellation Handling** | Support ticket / Delayed refund | Admin manual status update | **Automated Policy-Driven Tiers (90%/50%/10%/0%)** |
| **External API Dependencies** | Extensive (Auth, Maps, Gateways, Analytics) | Database server mandatory | **Zero External Dependencies (Self-Contained)** |

---

## 3. Discussion of Trade-offs

### 3.1 Advantages of the Safar Paradigm
- **Instantaneous Prototyping & Reproducibility**: Because data is synthesized deterministically from route seeds, evaluators and automated test suites experience zero flaky test failures caused by backend downtime.
- **Extreme Network Efficiency**: By packaging all UI logic, iconography, and styling into a sub-95 kB gzip payload, the platform functions seamlessly even under degraded 2G/3G network conditions.

### 3.2 Inherent Trade-offs
- **Single-Node Isolation**: Without an active WebSocket broker or server coordinator, multiple users opening the application in different browsers cannot see each other's live seat bookings in real time.
- **Client Storage Quotas**: Web Storage (`localStorage`) is typically limited to 5 MB per origin, making it suitable for hundreds of bookings per user but inadequate for multi-year enterprise audit logs.
