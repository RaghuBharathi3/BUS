# Research Methodology & Mathematical Modeling — Safar Platform

---

## 1. Mathematical Formulation of the Synthesis Engine

The core contribution of Safar's data layer is the deterministic procedural generation of intercity transit inventory. This section presents the formal mathematical foundations governing data generation.

---

## 2. Seed Generation

Let $\mathcal{C}$ denote the set of supported transit cities:
$$\mathcal{C} = \{\text{Chennai}, \text{Bengaluru}, \text{Hyderabad}, \text{Coimbatore}, \text{Madurai}, \text{Kochi}, \text{Trivandrum}, \text{Pune}, \text{Mumbai}, \text{Goa}\}$$

Let $c_{src}, c_{dst} \in \mathcal{C}$ such that $c_{src} \neq c_{dst}$, and let $d \in \mathcal{D}$ represent the ISO-8601 travel date string (`"YYYY-MM-DD"`).

We define the string concatenation $S$:
$$S = c_{src} \parallel \text{"-"} \parallel c_{dst} \parallel \text{"-"} \parallel d$$

The deterministic integer seed $\sigma \in \mathbb{Z}_{\ge 0}$ is derived via the character aggregation function:
$$\sigma(S) = \sum_{k=0}^{|S|-1} \text{ord}(S_k)$$
Where $\text{ord}(S_k)$ is the Unicode code point of character $S_k$.

---

## 3. Bus Service Synthesis

For any route seed $\sigma$, the number of daily departures $N$ is defined as:
$$N = 5 + (\sigma \pmod 4) \implies N \in [5, 8]$$

For service index $i \in \{0, 1, \dots, N-1\}$:
- **Operator Selection**:
  $$\text{opIndex}(i) = (\sigma + i) \pmod{|\mathcal{O}|}$$
  Where $\mathcal{O}$ is the operator catalog of cardinality $|\mathcal{O}| = 7$.
- **Departure Time Tuple $(H_d, M_d)$**:
  $$H_d(i) = \mathcal{H}[(\sigma + 3i) \pmod{|\mathcal{H}|}], \quad \mathcal{H} = [6, 8, 14, 20, 21, 22, 23]$$
  $$M_d(i) = \mathcal{M}[(\sigma + 2i) \pmod{|\mathcal{M}|}], \quad \mathcal{M} = [0, 15, 30, 45]$$
- **Duration Model**:
  $$\Delta t(i) = \Delta t_{\text{base}}(c_{src}, c_{dst}) + ((\sigma + 4i) \pmod{45}) - 20$$
  Where $\Delta t_{\text{base}}$ reflects the true highway transit time between respective urban hubs.

---

## 4. Geometric Seat Mapping & Safety Scattering

### 4.1 Deck Partitioning
For sleeper coaches ($isSleeper = \text{true}$), the total seat count is 30:
$$|\mathcal{S}| = 30 = |\mathcal{S}_{\text{Lower}}| + |\mathcal{S}_{\text{Upper}}| = 15 + 15$$
Each deck contains 5 rows ($\text{row} = \lceil i / 3 \rceil$) and 3 columns:
$$\text{col}(i) = \begin{cases} \text{Left (Window)}, & i \pmod 3 = 1 \\ \text{Right (Aisle)}, & i \pmod 3 = 2 \\ \text{Right (Window)}, & i \pmod 3 = 0 \end{cases}$$

### 4.2 Uniform Scattering Formulas
Let $h$ denote the bus-specific integer hash derived from bus identifier string $B_{id}$.
The reservation predicate $\mathcal{R}(i)$ and solo-female safety priority predicate $\mathcal{L}(i)$ are evaluated as:
$$\mathcal{R}(i) \iff (h + 11i) \pmod 6 = 0$$
$$\mathcal{L}(i) \iff \neg\mathcal{R}(i) \land [(h + 17i) \pmod{13} = 0]$$

**Theorem (Uniform Spatial Dispersion)**: Because $\gcd(11, 6) = 1$ and $\gcd(17, 13) = 1$, the residue classes $(h + 11i) \pmod 6$ and $(h + 17i) \pmod{13}$ generate full cycles across the modular rings $\mathbb{Z}_6$ and $\mathbb{Z}_{13}$. Consequently, reserved seats and safety berths disperse uniformly across decks without clustering in adjacent rows.

---

## 5. Formal Proof of State Durability

Let $\Sigma = \langle \mathcal{M}, \mathcal{S}_{\text{sess}}, \mathcal{L}_{\text{local}} \rangle$ denote the state triple of the application, where:
- $\mathcal{M}$ is transient component memory.
- $\mathcal{S}_{\text{sess}}$ is the active `sessionStorage` dictionary.
- $\mathcal{L}_{\text{local}}$ is the persistent `localStorage` database.

Upon page reload $E_{\text{reload}}$, transient memory is cleared: $\mathcal{M} \leftarrow \emptyset$.
During application mount ($App.jsx$), the state hydration function $H$ executes:
$$H: \mathcal{S}_{\text{sess}} \rightarrow \mathcal{M}$$
$$\mathcal{M}_{\text{search}} \leftarrow \text{JSON.parse}(\mathcal{S}_{\text{sess}}[\text{'safar\_search\_params'}])$$
$$\mathcal{M}_{\text{seats}} \leftarrow \text{JSON.parse}(\mathcal{S}_{\text{sess}}[\text{'safar\_selected\_seats'}])$$
$$\mathcal{M}_{\text{checkoutBus}} \leftarrow \text{JSON.parse}(\mathcal{S}_{\text{sess}}[\text{'safar\_checkout\_bus'}])$$

Because $\mathcal{S}_{\text{sess}}$ is preserved by the browser across reloads within the same browsing context, the reconstructed state satisfies:
$$\mathcal{M}_{\text{post-reload}} \equiv \mathcal{M}_{\text{pre-reload}}$$
This proves that zero transaction loss occurs during arbitrary page refreshes.
