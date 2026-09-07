# Literature Review — Intelligent Transit & Web Reservation Architectures

---

## 1. Domain Overview

The digitization of regional and intercity transit ticketing has evolved across three distinct technological eras:
1. **First Generation (1990s–2005)**: Terminal-bound mainframe and client-server architectures with centralized reservation locks.
2. **Second Generation (2005–2018)**: Web 2.0 multi-page server-rendered web portals (PHP, Java Servlets, ASP.NET) with relational SQL databases.
3. **Third Generation (2018–Present)**: Distributed Single Page Applications, Progressive Web Apps, and mobile native clients interfacing with microservices.

---

## 2. Synthesis of Contemporary Research

### 2.1 Object-Oriented Modeling in Transit
Mohammed and Kassem [1] conducted extensive UML modeling on urban bus reservation systems, arguing that modern public transit requires separate abstractions for:
- Route and stage definitions
- Seat category constraints (berth vs. chair)
- Real-time inventory reservation locks

Their findings directly justify Safar's module separation where procedural bus synthesis (`buses.js`) is isolated from reservation persistence (`mockDb.js`).

### 2.2 Formal State Stereotypes
Abu-Dalbouh and Alateyah [2] demonstrated that conventional sequence diagrams fail to capture interactive client-side behaviors, such as live seat toggling or modal overlays. They advocated for state-aware UI stereotypes, which Safar adopts in its sequence diagrams (`docs/diagrams/sequence-diagrams/`).

### 2.3 Single Page Architecture Performance
Empirical research by Naeem [3] revealed that once an initial SPA shell is loaded, internal route changes exhibit zero network round trips for structural HTML, saving bandwidth and lowering response latency to under 100ms. In high-latency regional corridors, this architectural choice delivers superior customer conversion compared to traditional server-side rendered portals.

### 2.4 Transactional Optimism
Pedone [4] demonstrated that pessimistic locking strategies in centralized ticketing systems lead to severe thread starvation during peak booking periods. By decoupling client-side staging from atomic backend commits, optimistic reservation frameworks maximize throughput and avoid premature inventory exhaustion.

---

## 3. Standards & Engineering Guidelines

- **IEEE Std 830-1998**: Provides the foundational requirements specification framework applied across Safar's documentation.
- **W3C Web Storage Level 2**: Defines the transactional boundaries and quota limitations of `localStorage` and `sessionStorage` utilized in Safar's simulated persistence engine.
- **WCAG 2.1 AA**: Establishes contrast and accessibility thresholds enforced in `src/index.css`.
