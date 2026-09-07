# Literature Survey — Safar Bus Reservation Platform

---

## 1. Introduction

The engineering of modern intelligent transportation systems (ITS) and electronic reservation portals requires syntheses across distributed transaction protocols, client-side rendering optimization, and user interaction design. This survey analyzes key peer-reviewed publications and international engineering standards that informed the design and architecture of the **Safar** platform.

---

## 2. Review of Primary Academic Literature

### Paper 1: UML Modeling of Online Public Bus Reservation System in Egypt
- **Authors**: Ayman R. Mohammed and Sally S. Kassem
- **Venue**: *2020 International Conference on Data Analytics for Business and Industry: Way Towards a Sustainable Economy (ICDABI)*
- **Year**: 2020
- **DOI**: [10.1109/ICDABI51230.2020.9325604](https://doi.org/10.1109/ICDABI51230.2020.9325604)
- **Problem Investigated**: Structural decomposition and object-oriented modeling of public transit booking workflows in dense urban environments.
- **Key Findings**: Demonstrates that transit reservation requires distinct functional isolation between route scheduling, seat reservation locks, and boarding point coordination to prevent transaction deadlocks.
- **Relevance to Safar**: Informed the multi-tier entity decomposition of Safar (`buses.js`, `mockDb.js`, `SeatMap.jsx`) and the separation between inventory discovery and payment validation.
- **Identified Gap**: Addressed server-centric relational models but omitted discussion of client-side state resilience when passenger connectivity is intermittent.

---

### Paper 2: An Extension to UML for the Modeling of Web Based Bus Reservation System
- **Authors**: Hussain Abu-Dalbouh and Sulaiman Abdullah Alateyah
- **Venue**: *Journal of Computer Science*, vol. 16, no. 6, pp. 825–837
- **Year**: 2020
- **DOI**: [10.3844/jcssp.2020.825.837](https://doi.org/10.3844/jcssp.2020.825.837)
- **Problem Investigated**: Inadequacy of standard UML notation for capturing dynamic web application states, modal transitions, and partial seat selections.
- **Key Findings**: Proposes extended web-specific stereotypes for modeling checkout staging, seat status lifecycles, and asynchronous feedback loops.
- **Relevance to Safar**: Direct architectural foundation for Safar’s sequence diagrams (`docs/diagrams/sequence-diagrams/booking-flow.mmd`) and seat status transitions.

---

### Paper 3: Performance Evaluation of Progressive Web Apps and Single Page Applications
- **Authors**: M. Naeem
- **Venue**: *2019 22nd International Multitopic Conference (INMIC)*, Islamabad, Pakistan
- **Year**: 2019
- **DOI**: [10.1109/INMIC48123.2019.9022759](https://doi.org/10.1109/INMIC48123.2019.9022759)
- **Problem Investigated**: Comparative latency, memory footprint, and network consumption of Single Page Applications (SPAs) versus multi-page server architectures.
- **Key Findings**: Confirms that SPAs reduce client-server network payload by over 60% after initial asset delivery and provide sub-100ms internal view transitions.
- **Relevance to Safar**: Justified the selection of a pure React SPA architecture bundled with Vite, optimizing Time-to-Interactive (TTI) for intercity commuters.

---

### Paper 4: Optimistic Validation of Electronic Tickets
- **Author**: Fernando Pedone
- **Venue**: *Proceedings of the 20th IEEE Symposium on Reliable Distributed Systems (SRDS)*, New Orleans, LA, USA
- **Year**: 2001
- **DOI**: [10.1109/RELDIS.2001.970764](https://doi.org/10.1109/RELDIS.2001.970764)
- **Problem Investigated**: High contention and lock wait times in centralized electronic ticket reservation servers during peak booking demand.
- **Key Findings**: Formulates optimistic reservation validation where clients stage reservations locally and validate conflicts optimistically, significantly boosting system throughput.
- **Relevance to Safar**: Directly inspired Safar’s dual-tier caching strategy (`sessionStorage` staging buffer and atomic `mockDb` commit upon payment completion).

---

### Paper 5: IEEE Recommended Practice for Software Requirements Specifications
- **Author**: IEEE Computer Society
- **Venue**: *IEEE Std 830-1998*
- **Year**: 1998 (Reaffirmed)
- **DOI**: [10.1109/IEEESTD.1998.88286](https://doi.org/10.1109/IEEESTD.1998.88286)
- **Relevance to Safar**: Guided the formal specification of functional requirements, non-functional constraints, and interface contracts throughout the project documentation suite.

---

## 3. Summary of Academic Insights

The literature confirms that while server-centric ticketing models were standard in previous decades, modern client hardware and JavaScript runtime engines allow significant architectural benefits by relocating data synthesis, state staging, and validation directly to the client browser. Safar synthesizes these principles into an actionable, fully verified software implementation.
