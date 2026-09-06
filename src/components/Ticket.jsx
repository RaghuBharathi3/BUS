import Icon from './Icon';
import { formatTime, formatDate } from '../utils/format';

const BRAND_MARK = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12c0-3.3 1.6-6.2 4-8" />
    <path d="M9 16c2-4 4-4 6-8" />
  </svg>
);

export default function Ticket({ booking }) {
  if (!booking) return null;

  const isCancelled = booking.status === 'Cancelled';
  const boardingName = booking.boardingPoint?.name || booking.boardingPoints?.[0]?.name;

  return (
    <div className="ticket animate-fade">
      <div className="ticket__actions no-print">
        <button className="btn btn--secondary btn--sm" onClick={() => window.print()}>
          <Icon name="print" size={15} /> Print Boarding Pass
        </button>
      </div>

      <div className="ticket__card">
        {/* Header */}
        <div className="ticket__head">
          <div className="ticket__brand">
            <span className="brand__mark">{BRAND_MARK}</span>
            <span className="ticket__brand-name">safar</span>
            <span className="ticket__label">Boarding Pass</span>
          </div>
          <div className="ticket__id">
            <span className="meta">Booking ID</span>
            <strong>{booking.id}</strong>
          </div>
        </div>

        {/* Route */}
        <div className="ticket__route">
          <div className="ticket__city">
            {booking.fromCity}
            <small>{boardingName || 'City Center'}</small>
          </div>
          <div className="ticket__route-mid">
            <span className="time">{formatTime(booking.departureTime)}</span>
            <span className="track" />
            <span className="date">{formatDate(booking.travelDate, { year: true })}</span>
          </div>
          <div className="ticket__city" style={{ textAlign: 'right' }}>
            {booking.toCity}
            <small>Arrives {formatTime(booking.arrivalTime)}</small>
          </div>
        </div>

        {/* Body */}
        <div className="ticket__body">
          <div className="ticket__grid">
            <div className="ticket__cell">
              <span className="meta">Operator</span>
              <strong>{booking.operatorName}</strong>
            </div>
            <div className="ticket__cell">
              <span className="meta">Bus Type</span>
              <strong>{booking.busType}</strong>
            </div>
            <div className="ticket__cell">
              <span className="meta">Seats</span>
              <strong className="brand">{booking.seatsSelected.join(', ')}</strong>
            </div>
            <div className="ticket__cell">
              <span className="meta">Paid</span>
              <strong className="green">₹{booking.fareDetails.totalFare.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div className="ticket__section">
            <span className="meta">Travelers</span>
            {booking.passengers.map((p, i) => (
              <div className="traveler-row" key={i}>
                <span>{p.name} · {p.gender}, {p.age} yrs</span>
                <span>Seat {p.seatNo}</span>
              </div>
            ))}
          </div>

          <div className="ticket__foot">
            <span className={`stamp ${isCancelled ? 'stamp--cancelled' : ''}`}>{booking.status}</span>
            <div className="barcode">
              <svg width="200" height="34" aria-hidden="true">
                <rect x="0" y="0" width="4" height="34" fill="var(--ink)" />
                <rect x="7" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="12" y="0" width="5" height="34" fill="var(--ink)" />
                <rect x="20" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="25" y="0" width="7" height="34" fill="var(--ink)" />
                <rect x="35" y="0" width="3" height="34" fill="var(--ink)" />
                <rect x="41" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="46" y="0" width="6" height="34" fill="var(--ink)" />
                <rect x="55" y="0" width="3" height="34" fill="var(--ink)" />
                <rect x="61" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="66" y="0" width="8" height="34" fill="var(--ink)" />
                <rect x="77" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="82" y="0" width="5" height="34" fill="var(--ink)" />
                <rect x="90" y="0" width="3" height="34" fill="var(--ink)" />
                <rect x="96" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="101" y="0" width="7" height="34" fill="var(--ink)" />
                <rect x="111" y="0" width="4" height="34" fill="var(--ink)" />
                <rect x="118" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="123" y="0" width="5" height="34" fill="var(--ink)" />
                <rect x="131" y="0" width="3" height="34" fill="var(--ink)" />
                <rect x="137" y="0" width="8" height="34" fill="var(--ink)" />
                <rect x="148" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="153" y="0" width="6" height="34" fill="var(--ink)" />
                <rect x="162" y="0" width="3" height="34" fill="var(--ink)" />
                <rect x="168" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="173" y="0" width="7" height="34" fill="var(--ink)" />
                <rect x="183" y="0" width="4" height="34" fill="var(--ink)" />
                <rect x="190" y="0" width="2" height="34" fill="var(--ink)" />
                <rect x="195" y="0" width="5" height="34" fill="var(--ink)" />
              </svg>
              <span className="barcode__num">* {booking.id} *</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}