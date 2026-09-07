# API Documentation — Safar Bus Reservation Platform

---

## 1. Architectural Context & Service Model

> [!NOTE]
> The **Safar** bus reservation platform operates as a client-centric Single Page Application (SPA). The application does not expose an external HTTP REST or GraphQL server. Instead, it defines an **Internal Programmatic Service API Layer** via `src/data/mockDb.js`, `src/data/buses.js`, and `src/data/coupons.js`.

This document specifies the internal service contracts, parameter signatures, payloads, return types, and error handling semantics used across the application tiers.

---

## 2. Authentication Service API (`mockDb`)

### 2.1 Register User
- **Method Signature**: `mockDb.registerUser(name, email, password, phone)`
- **Purpose**: Creates a new user account if the email address is not already registered.
- **Authentication**: None required.
- **Parameters**:
  - `name` (*string*, required): Full name of the user (minimum 3 characters).
  - `email` (*string*, required): Unique email address conforming to standard email regex.
  - `password` (*string*, required): Account password (minimum 6 characters).
  - `phone` (*string*, required): 10-digit Indian mobile number.
- **Return Contract**:
```json
{
  "success": true,
  "user": {
    "name": "Arun Kumar",
    "email": "arun@safar.com",
    "password": "password",
    "phone": "9876543210",
    "gender": "",
    "age": ""
  }
}
```
- **Error Response**:
```json
{
  "success": false,
  "message": "Email already registered."
}
```

---

### 2.2 Login User
- **Method Signature**: `mockDb.loginUser(email, password)`
- **Purpose**: Authenticates a user against existing records in `safar_users` and establishes the active session.
- **Authentication**: None required.
- **Parameters**:
  - `email` (*string*, required): User email address.
  - `password` (*string*, required): Plaintext password.
- **Return Contract**:
```json
{
  "success": true,
  "user": {
    "name": "Arun Kumar",
    "email": "arun@safar.com",
    "phone": "9876543210",
    "gender": "Male",
    "age": 28
  }
}
```
- **Error Response**:
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

### 2.3 Get Current User Session
- **Method Signature**: `mockDb.getCurrentUser()`
- **Purpose**: Retrieves the active user session stored in `localStorage.getItem('safar_current_user')`.
- **Return Contract**: Returns the user object if authenticated, or `null` if unauthenticated.

---

### 2.4 Update Profile
- **Method Signature**: `mockDb.updateProfile(updatedData)`
- **Purpose**: Updates profile demographic details for the authenticated user.
- **Authentication**: Active session required (`safar_current_user`).
- **Parameters**:
  - `updatedData` (*object*, required): `{ name, phone, age, gender }`.
- **Return Contract**: `{ "success": true, "user": { ... } }` or `{ "success": false, "message": "Not logged in." }`.

---

## 3. Booking & Reservation Service API (`mockDb`)

### 3.1 Get User Bookings
- **Method Signature**: `mockDb.getBookings(email)`
- **Purpose**: Retrieves all bookings associated with an email, sorted in descending order of `travelDate`.
- **Parameters**:
  - `email` (*string*, required): User email address.
- **Return Contract**:
```json
[
  {
    "id": "BK-100234",
    "userEmail": "arun@safar.com",
    "busId": "bus-hist-1",
    "operatorName": "SRS Travels",
    "busType": "A/C Seater (2+2)",
    "fromCity": "Chennai",
    "toCity": "Bengaluru",
    "travelDate": "2026-08-15",
    "departureTime": "06:00",
    "arrivalTime": "12:30",
    "seatsSelected": ["12A", "12B"],
    "passengers": [
      { "name": "Arun Kumar", "age": 28, "gender": "Male", "seatNo": "12A" },
      { "name": "Ramesh Kumar", "age": 54, "gender": "Male", "seatNo": "12B" }
    ],
    "fareDetails": {
      "baseFare": 1300,
      "convenienceFee": 60,
      "taxes": 91,
      "discount": 100,
      "totalFare": 1351
    },
    "paymentMethod": "UPI",
    "status": "Completed",
    "createdAt": "2026-08-10T14:22:00.000Z"
  }
]
```

---

### 3.2 Add Booking (Checkout Commit)
- **Method Signature**: `mockDb.addBooking(bookingData)`
- **Purpose**: Generates a new booking entity with an auto-assigned identifier (`BK-xxxxxx`) and persists it to `safar_bookings`.
- **Parameters**: `bookingData` object containing bus details, passenger list, fare breakdown, and payment method.
- **Return Contract**: Returns the persisted booking object including `id` and `createdAt` timestamp.

---

### 3.3 Cancel Booking
- **Method Signature**: `mockDb.cancelBooking(bookingId)`
- **Purpose**: Updates the target booking's status to `'Cancelled'` and records the `cancelledAt` timestamp.
- **Parameters**:
  - `bookingId` (*string*, required): Unique booking reference (e.g., `"BK-662345"`).
- **Return Contract**:
```json
{
  "success": true,
  "booking": {
    "id": "BK-662345",
    "status": "Cancelled",
    "cancelledAt": "2026-09-08T01:45:00.000Z"
  }
}
```

---

## 4. Procedural Inventory Synthesis API (`buses.js`)

### 4.1 Get Buses For Route
- **Method Signature**: `getBusesForRoute(fromCity, toCity, dateString)`
- **Purpose**: Procedurally derives a list of 5 to 8 deterministic bus services for a given route and date.
- **Parameters**:
  - `fromCity` (*string*, required): Departure city name.
  - `toCity` (*string*, required): Arrival destination city name.
  - `dateString` (*string*, required): ISO travel date string (`"YYYY-MM-DD"`).
- **Return Contract**:
```json
[
  {
    "id": "bus-1428-0",
    "operatorName": "Safar Luxe Class",
    "operatorRating": 4.8,
    "reviewsCount": 342,
    "logoColor": "var(--brand-primary)",
    "busType": "A/C Sleeper (2+1)",
    "isAC": true,
    "isSleeper": true,
    "departureTime": "21:00",
    "arrivalTime": "05:30",
    "duration": "8h 30m",
    "durationMinutes": 510,
    "price": 950,
    "availableSeats": 18,
    "totalSeats": 30,
    "amenities": ["Wi-Fi", "USB Charging Port", "Water Bottle", "Blanket"],
    "boardingPoints": [
      { "id": "bp1", "name": "Koyambedu Omni Terminus", "time": "09:00 PM", "details": "Near Metro Station" }
    ],
    "droppingPoints": [
      { "id": "dp1", "name": "Majestic (KSRTC Terminal)", "time": "05:30 AM", "details": "Platform 1" }
    ],
    "seats": [
      {
        "seatNo": "L1",
        "deck": "Lower",
        "type": "Sleeper",
        "row": 1,
        "column": "Left",
        "isWindow": true,
        "isBooked": false,
        "isLadies": false,
        "priceMultiplier": 1.1
      }
    ],
    "fromCity": "Chennai",
    "toCity": "Bengaluru",
    "travelDate": "2026-09-15"
  }
]
```

---

## 5. Discount Validation API (`coupons.js`)

### 5.1 Calculate Discount
- **Method Signature**: `calculateDiscount(couponCode, baseFare, userBookings, travelDate)`
- **Purpose**: Validates coupon eligibility and computes discount deduction.
- **Parameters**:
  - `couponCode` (*string*): Code entered by user (e.g., `"FIRSTTRIP"`, `"ROUTE10"`, `"WEEKEND"`).
  - `baseFare` (*number*): Gross base fare before taxes and fees.
  - `userBookings` (*array*): Active user's past booking records.
  - `travelDate` (*string*): Date of travel (`"YYYY-MM-DD"`).
- **Return Contract**:
```json
{
  "valid": true,
  "discount": 100,
  "message": "Coupon applied successfully!"
}
```
- **Rejection Contract**:
```json
{
  "valid": false,
  "discount": 0,
  "message": "Minimum fare of ₹600 required for this coupon."
}
```
