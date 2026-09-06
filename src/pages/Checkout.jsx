import { useState, useEffect } from 'react';
import PassengerForm from '../components/PassengerForm';
import CouponSection from '../components/CouponSection';
import FareSummary from '../components/FareSummary';
import { calculateFare } from '../utils/fare';
import PaymentForm from '../components/PaymentForm';
import Icon from '../components/Icon';
import { formatDate, formatTime } from '../utils/format';

const STORAGE_KEY = 'safar_checkout_form';

const loadSavedForm = (busId) => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data.busId === busId ? data : null;
  } catch {
    return null;
  }
};

export default function Checkout({
  bus,
  selectedSeats = [],
  currentUser,
  userBookings = [],
  onBookingComplete,
  onNavigateHome
}) {
  const saved = loadSavedForm(bus?.id);

  const [passengers, setPassengers] = useState(() => {
    if (saved?.passengers) return saved.passengers;
    return selectedSeats.map((seatNo, idx) => ({
      name: idx === 0 && currentUser?.name ? currentUser.name : '',
      age: idx === 0 && currentUser?.age ? String(currentUser.age) : '',
      gender: idx === 0 && currentUser?.gender ? currentUser.gender : '',
      seatNo
    }));
  });

  const [contactDetails, setContactDetails] = useState(
    saved?.contact || {
      email: currentUser ? currentUser.email : '',
      phone: currentUser ? currentUser.phone : ''
    }
  );

  const [activeCoupon, setActiveCoupon] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [paymentUnlocked, setPaymentUnlocked] = useState(false);
  const [boardingPoint, setBoardingPoint] = useState(bus?.boardingPoints?.[0]?.id || '');

  // Persist the in-progress form across refreshes
  useEffect(() => {
    if (!bus) return;
    const data = { busId: bus.id, passengers, contact: contactDetails };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [bus, passengers, contactDetails]);

  if (!bus) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty">
            <span className="empty__icon"><Icon name="bus" size={44} strokeWidth={1.4} /></span>
            <h4>Nothing to review yet</h4>
            <p>Select a bus and choose your seats first, then come back here to complete the booking.</p>
            <button className="btn btn--primary" onClick={onNavigateHome}>
              <Icon name="arrowLeft" size={16} /> Back to Search Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { baseFare, convenienceFee, taxes, discount, totalFare } = calculateFare(
    bus.price, selectedSeats.length, activeCoupon
  );

  const step = paymentUnlocked ? 2 : 1;

  const validateCheckout = () => {
    const errs = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactDetails.email) errs.email = 'Email address is required.';
    else if (!emailRegex.test(contactDetails.email)) errs.email = 'Enter a valid email address.';

    if (!contactDetails.phone) errs.phone = 'Mobile number is required.';
    else if (contactDetails.phone.length !== 10) errs.phone = 'Mobile number must be exactly 10 digits.';

    passengers.forEach((p, idx) => {
      if (!p.name || p.name.trim().length < 3) errs[`${idx}-name`] = 'Full name must be at least 3 characters.';
      if (!p.age) errs[`${idx}-age`] = 'Age is required.';
      else {
        const ageNum = Number(p.age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) errs[`${idx}-age`] = 'Enter a valid age (1–120).';
      }
      if (!p.gender) errs[`${idx}-gender`] = 'Please select a gender.';
    });

    setValidationErrors(errs);

    const keys = Object.keys(errs);
    if (keys.length === 0) {
      setPaymentUnlocked(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }

    setPaymentUnlocked(false);
    // Scroll to the first invalid field
    const idMap = {
      email: 'contact-email',
      phone: 'contact-phone'
    };
    const id = idMap[keys[0]] || `pass-${keys[0].split('-')[0]}-${keys[0].split('-')[1]}`;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById(id)?.focus({ preventScroll: true });
    return false;
  };

  const handlePaymentSuccess = (method) => {
    const boarding = bus.boardingPoints.find(p => p.id === boardingPoint) || bus.boardingPoints[0];
    const bookingPayload = {
      userEmail: currentUser ? currentUser.email : contactDetails.email,
      busId: bus.id,
      operatorName: bus.operatorName,
      busType: bus.busType,
      fromCity: bus.fromCity,
      toCity: bus.toCity,
      travelDate: bus.travelDate,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      seatsSelected: selectedSeats,
      passengers,
      boardingPoint: boarding ? { id: boarding.id, name: boarding.name, time: boarding.time } : null,
      fareDetails: { baseFare, convenienceFee, taxes, discount, totalFare },
      paymentMethod: method === 'upi' ? 'UPI' : method === 'card' ? 'Card' : 'Net Banking',
      status: 'Upcoming'
    };

    sessionStorage.removeItem(STORAGE_KEY);
    onBookingComplete(bookingPayload);
  };

  return (
    <div className="page page--tight animate-fade">
      <div className="container">
        {/* Back + title */}
        <button className="btn btn--ghost btn--sm" onClick={onNavigateHome} style={{ marginBottom: '18px' }}>
          <Icon name="arrowLeft" size={15} /> Back to Search Results
        </button>

        <h1 className="h-section" style={{ fontSize: '1.7rem' }}>Review & Complete Booking</h1>
        <p className="subhead" style={{ marginTop: '6px', marginBottom: '24px' }}>
          {bus.operatorName} · {bus.busType} · {selectedSeats.join(', ')}
        </p>

        {/* Stepper */}
        <div className="steps" aria-label="Booking progress">
          <div className={`step ${step === 1 ? 'is-active' : 'is-done'}`}>
            <span className="step__num">{step > 1 ? <Icon name="check" size={13} strokeWidth={3} /> : 1}</span>
            Passenger Details
          </div>
          <span className="step__line" />
          <div className={`step ${step === 2 ? 'is-active' : ''}`}>
            <span className="step__num">2</span>
            Payment
          </div>
          <span className="step__line" />
          <div className="step">
            <span className="step__num">3</span>
            Confirmation
          </div>
        </div>

        <div className="checkout-layout">
          {/* Left column */}
          <div className="checkout-main">
            <PassengerForm
              selectedSeats={selectedSeats}
              passengers={passengers}
              onChangePassengers={setPassengers}
              contactDetails={contactDetails}
              onChangeContact={setContactDetails}
              validationErrors={validationErrors}
            />

            {!paymentUnlocked ? (
              <div className="unlock">
                <div className="unlock__text">
                  <span className="unlock__icon"><Icon name="shield" size={26} strokeWidth={1.6} /></span>
                  <div>
                    <strong>Ready to pay?</strong>
                    <p>We'll verify the details above before showing the secure payment gateway.</p>
                  </div>
                </div>
                <button type="button" className="btn btn--primary btn--lg" onClick={validateCheckout}>
                  Proceed to Payment
                  <Icon name="arrowRight" size={17} />
                </button>
              </div>
            ) : (
              <div className="animate-pop" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="pay-head">
                  <h3 className="card-title">
                    <span className="icon-tile"><Icon name="lock" size={16} /></span>
                    Secure Payment
                  </h3>
                  <button className="btn btn--ghost btn--sm" onClick={() => setPaymentUnlocked(false)}>
                    <Icon name="edit" size={14} /> Edit passenger details
                  </button>
                </div>
                <PaymentForm totalAmount={totalFare} onPaymentSuccess={handlePaymentSuccess} />
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="checkout-side">
            {/* Trip summary */}
            <div className="form-card">
              <h3 className="card-title" style={{ marginBottom: '16px' }}>
                <span className="icon-tile"><Icon name="bus" size={16} /></span>
                Trip Details
              </h3>

              <div className="trip-card__route">
                <div className="trip-card__city">
                  {bus.fromCity}
                  <small>{formatTime(bus.departureTime)} · {formatDate(bus.travelDate)}</small>
                </div>
                <span className="trip-card__arrow"><Icon name="arrowRight" size={18} /></span>
                <div className="trip-card__city" style={{ textAlign: 'right' }}>
                  {bus.toCity}
                  <small>{formatTime(bus.arrivalTime)} · {bus.duration}</small>
                </div>
              </div>

              <div className="detail-list" style={{ borderTop: '1px solid var(--line)', paddingTop: '14px' }}>
                <div className="detail-row">
                  <span>Operator</span>
                  <b>{bus.operatorName}</b>
                </div>
                <div className="detail-row">
                  <span>Bus type</span>
                  <b>{bus.busType}</b>
                </div>
                <div className="detail-row">
                  <span>Seats</span>
                  <b style={{ color: 'var(--brand)' }}>{selectedSeats.join(', ')}</b>
                </div>
              </div>

              {bus.boardingPoints.length > 0 && (
                <div className="field" style={{ marginTop: '16px' }}>
                  <label className="field__label" htmlFor="boarding-point">Boarding Point</label>
                  <select
                    id="boarding-point"
                    className="select"
                    value={boardingPoint}
                    onChange={(e) => setBoardingPoint(e.target.value)}
                  >
                    {bus.boardingPoints.map(bp => (
                      <option key={bp.id} value={bp.id}>
                        {bp.time} — {bp.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <CouponSection
              baseFare={baseFare}
              userBookings={userBookings}
              travelDate={bus.travelDate}
              onApplyCoupon={setActiveCoupon}
              activeCoupon={activeCoupon}
            />

            <FareSummary basePrice={bus.price} seatsCount={selectedSeats.length} activeCoupon={activeCoupon} />
          </div>
        </div>
      </div>
    </div>
  );
}