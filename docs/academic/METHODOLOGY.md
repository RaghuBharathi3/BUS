# Academic Methodology — Safar Bus Reservation Platform

---

## 1. Research Formulation & Scientific Approach

The primary research question addressed by this project is:
> *Can an intercity transit ticketing platform achieve complete deterministic availability, realistic multi-deck berth allocation, and session-resilient checkout purely within a client-side Single Page Architecture without relying on live backend server round trips?*

To answer this question, Safar formulates an algorithmic and architectural methodology grounded in **pseudorandom seed hashing**, **mathematical geometric mapping**, and **hierarchical client-side state caching**.

---

## 2. Seed Generation & Deterministic Synthesis Formulation

### 2.1 The Hashing Function
To prevent reliance on external database state while ensuring consistent search outputs, the system derives an integer seed from the tuple $(\text{fromCity}, \text{toCity}, \text{dateString})$:

$$\text{Seed} = \sum_{k=0}^{|S|-1} \text{charCodeAt}(S[k])$$

Where $S$ is the hyphen-delimited concatenation:
$$S = \text{fromCity} \parallel \text{"-"} \parallel \text{toCity} \parallel \text{"-"} \parallel \text{dateString}$$

### 2.2 Schedule & Fleet Synthesis
Let $N$ be the number of active bus services for route $S$:
$$N = 5 + (\text{Seed} \pmod 4)$$
Ensuring a deterministic range of $N \in [5, 8]$ services per route.

For each bus service $i \in [0, N-1]$:
1. **Operator Assignment**:
   $$\text{OperatorIndex} = (\text{Seed} + i) \pmod{|\text{Operators}|}$$
2. **Departure Schedule**:
   $$\text{DepartureHour} = \mathcal{H}[(\text{Seed} + 3i) \pmod{|\mathcal{H}|}], \quad \mathcal{H} = \{6, 8, 14, 20, 21, 22, 23\}$$
   $$\text{DepartureMinute} = \mathcal{M}[(\text{Seed} + 2i) \pmod{|\mathcal{M}|}], \quad \mathcal{M} = \{0, 15, 30, 45\}$$
3. **Transit Duration & Pricing**:
   $$\text{Duration} = \text{BaseDuration} + ((\text{Seed} + 4i) \pmod{45}) - 20$$
   $$\text{BasePrice} = \text{RouteBasePrice} \times \text{TypeModifier} + ((\text{Seed} + 9i) \pmod{300}) - 100$$

---

## 3. Geometric Seat Layout & Safety-Aware Allocation

### 3.1 Sleeper Deck Geometry
Sleeper coaches represent a 3-dimensional berth geometry mapped into a 2D matrix:
- **Decks**: Lower ($\mathcal{D}_L$) and Upper ($\mathcal{D}_U$), each containing 15 berths ($|\mathcal{D}| = 15$).
- **Transverse Column Layout**: 1 Left Berth (Single Window) and 2 Right Berths (Middle/Window).
- **Row Mapping**: $\text{Row} = \lceil i / 3 \rceil$ for $i \in [1, 15]$.

### 3.2 Seater Deck Geometry
Seater coaches map 40 passenger seats into a 2+2 layout:
- **Rows**: 10 rows ($\text{Row} = \lceil i / 4 \rceil$ for $i \in [1, 40]$).
- **Columns**: Window (A), Aisle (B), Aisle (C), Window (D).

### 3.3 Pseudo-Random Reservation Scattering
To eliminate static pre-baked JSON while generating realistic patterns:
$$\text{isBooked}(i) = (\text{Seed} + 11i) \pmod 6 == 0$$
$$\text{isLadies}(i) = (\text{Seed} + 17i) \pmod{13} == 0 \quad (\text{if } \neg\text{isBooked}(i))$$

Because $11$ and $17$ are prime numbers coprime to modular bases $6$ and $13$, pre-booked seats and solo-female safety allocations scatter naturally across columns without clustering.

---

## 4. Dual-Tier Transaction State Durability Model

```text
       Browser Memory Space                     Web Storage API
┌────────────────────────────────┐       ┌────────────────────────────┐
│      React 19 Component        │       │       sessionStorage       │
│  State (useState, useMemo)     │◄─────►│ (Active Checkout Buffer)   │
└────────────────────────────────┘       └─────────────┬──────────────┘
                │                                      │
                ▼ (Payment Confirmation)               ▼
┌────────────────────────────────┐       ┌────────────────────────────┐
│         mockDb Engine          │──────►│        localStorage        │
│   (Atomic CRUD Transactions)   │       │ (Permanent Relational Store)│
└────────────────────────────────┘       └────────────────────────────┘
```

1. **Staging**: Active selections (`selectedSeats`, passenger manifest) write continuously to `sessionStorage`. If the user refreshes the page or navigates to sign in, the state is rehydrated automatically.
2. **Commit**: Upon payment authorization, `mockDb.addBooking` commits the transaction to `localStorage`, generates an unforgeable booking ID (`BK-xxxxxx`), and clears the ephemeral `sessionStorage` staging keys.
