# User Guide — Safar Bus Reservation Platform

Welcome to the **Safar** bus booking user manual. This guide walks you through every feature of the application, from searching for buses to managing bookings and downloading your boarding pass.

---

## 1. Getting Started & Homepage Navigation

Upon opening Safar at `http://localhost:5173/`, you are greeted by the homepage:

![Homepage & Search Engine Interface](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/01-home-hero-search.png)
*Figure 1.1: Safar Homepage featuring the Search Engine, Recent Searches, and Popular Route Connections.*

### Key Actions:
1. **Search Bar**:
   - **Leaving From**: Select or type your departure city (e.g., Chennai, Mumbai, Bengaluru, Hyderabad).
   - **Going To**: Select your destination city.
   - **Travel Date**: Pick your desired departure date.
   - Click **Search Buses**.
2. **Recent Searches**: Quickly re-launch previous searches by clicking on the recent search chips below the search bar. Click the **Clear** button to purge search history.
3. **Popular Connections**: Click on any of the curated route cards (e.g., Chennai → Bengaluru for ₹750) to instantly launch a search for tomorrow's date.

---

## 2. Browsing & Filtering Bus Services

After submitting your route, the **Search Results** screen lists all matching services:

![Bus Search Results & Dynamic Filtering](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/02-search-results-listing.png)
*Figure 1.2: Search Results screen displaying operator cards, departure timelines, and the filter panel.*

### How to Filter & Sort:
- **Bus Types**: Check **AC** or **Non-AC**, and select **Sleeper** or **Seater**.
- **Departure Time Slots**: Filter buses by **Morning (06:00–12:00)**, **Afternoon (12:00–18:00)**, **Evening (18:00–24:00)**, or **Night (00:00–06:00)**.
- **Max Fare Slider**: Drag the slider to set your budget threshold (up to ₹3,000).
- **Operators**: Filter by specific brands like *Safar Luxe Class*, *Parveen Travels*, or *VRL Travels*.
- **Sort Dropdown**: Sort by **Recommended**, **Cheapest Fare**, **Earliest Departure**, **Fastest Duration**, or **Highest Rating**.

---

## 3. Selecting Seats on the Interactive Deck Map

Click **Select Seats** on any bus card to expand the 2D seat map:

![Interactive Multi-Deck Seat Matrix](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/03-seat-selection-modal.png)
*Figure 1.3: Expanded bus card displaying Lower and Upper deck sleeper berths, ladies-priority seats, and selected seats.*

### Understanding Seat Colors:
- **White / Light Border**: Available seat. Click to select.
- **Dark Blue**: Currently selected seat.
- **Greyed Out (Disabled)**: Booked by another passenger.
- **Pink Outline / Dot**: Ladies-Priority seat (reserved for solo female travelers).
- **Deck Switcher**: For sleeper buses, click **Lower** or **Upper** tabs to navigate between decks.
- **Selection Limit**: A maximum of **6 seats** can be booked in a single transaction.
- Once selected, review the dynamic fare subtotal and click **Continue Booking**.

---

## 4. Passenger Details & Boarding Point Selection

If you are not yet signed in, you will be prompted to log in or register. Once authenticated, the **Checkout** page loads:

![Passenger Details & Boarding Selection](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/04-passenger-checkout.png)
*Figure 1.4: Checkout screen where traveler details, boarding points, and promo codes are configured.*

### Steps on Checkout:
1. **Boarding Location**: Choose your pickup location from the dropdown (e.g., *Koyambedu Omni Terminus* or *Guindy*).
2. **Passenger Details**: Enter the **Full Name**, **Age**, and **Gender** for each seat selected.
3. **Contact Information**: Verify your email and mobile phone number to receive digital ticket alerts.
4. **Promo Codes**: Enter a promo code (e.g., `ROUTE10`, `FIRSTTRIP`, `WEEKEND`) and click **Apply** to deduct discounts from your total.
5. Click **Proceed to Payment**.

---

## 5. Simulating Payment

![Multi-Method Payment Simulation](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/05-payment-simulation.png)
*Figure 1.5: Payment form displaying UPI, Card, and NetBanking options with validation feedback.*

### Payment Methods Supported:
1. **UPI / QR**: Enter a valid Virtual Payment Address (e.g., `username@upi` or `arun@okaxis`).
2. **Credit / Debit Card**: Enter a 16-digit card number, cardholder name, valid expiry (`MM/YY`), and 3-digit CVV.
3. **NetBanking**: Select your bank (SBI, HDFC, ICICI, Axis, Kotak) from the dropdown.

Click **Pay & Book**. A short payment authorization phase validates the details and finalizes your reservation.

---

## 6. Booking Confirmation & Printing Your Ticket

Upon successful payment, your digital boarding pass is issued immediately:

![Booking Confirmation & Digital Boarding Pass](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/06-booking-confirmation-ticket.png)
*Figure 1.6: Confirmation screen with Booking ID BK-662345 and the printable boarding pass ticket.*

### Features of the Boarding Pass:
- **Booking Reference**: Unique alphanumeric code (e.g., `BK-662345`).
- **Route & Timing**: Scheduled departure time, reporting instructions, and arrival estimate.
- **Passenger Manifest**: All passengers and their assigned seat numbers.
- **Print Feature**: Click the **Print Boarding Pass** button to invoke browser printing.

---

## 7. Managing Bookings & Cancelling Tickets

Access your **Dashboard** at any time from the top navigation bar:

![Passenger Dashboard & Trip Management](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/07-user-dashboard-trips.png)
*Figure 1.7: Passenger Dashboard displaying Upcoming Bookings, Completed Trips, and Profile Settings.*

### Dashboard Tabs:
- **Upcoming Bookings**: View active trips with options to review the ticket or cancel.
- **Completed Trips**: Access records of past journeys.
- **Cancelled Tickets**: Review cancelled bookings and refund statuses.
- **Profile Settings**: Edit your display name, registered phone number, and age.

### How to Cancel a Ticket:
1. Under **Upcoming Bookings**, click **Cancel Booking**.
2. A cancellation modal displays the calculated refund amount based on our refund policy.
3. Confirm cancellation. The booking moves to **Cancelled Tickets**, and your refund is recorded.

---

## 8. Authentication & Demo Quick-Login

![User Authentication & Quick-Login Interface](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/08-authentication-modal.png)
*Figure 1.8: Login and Registration modal with 1-click Quick-Login demo buttons.*

- **Login**: Enter registered email and password.
- **Register**: Provide your full name, email, 10-digit mobile number, and password.
- **Demo Quick-Login**: Click **Quick Login (Arun Kumar)** or **Quick Login (Priya Sharma)** to instantly test the platform with pre-seeded booking histories.

---

## 9. Help Center, FAQs & Cancellation Policy

![Customer Support Center & FAQ Guidelines](file:///c:/Users/Windows/Documents/BUS/docs/screenshots/09-help-and-faqs.png)
*Figure 1.9: Help Center displaying tiered refund guidelines and FAQ accordions.*

### Official Cancellation Refund Tiers:
- **More than 24 hours before departure**: **90% Refund**
- **12 to 24 hours before departure**: **50% Refund**
- **Within 12 hours of departure**: **10% Refund**
- **Post-departure**: **0% Refund**
