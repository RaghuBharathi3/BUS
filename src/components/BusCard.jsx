import { useState } from 'react';
import SeatMap from './SeatMap';
import Icon from './Icon';
import { formatTime } from '../utils/format';

export default function BusCard({ bus, onSeatSelect, selectedSeats = [], onContinueCheckout }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('seats');

  const seatCount = selectedSeats.length;
  const isLowStock = bus.availableSeats <= 5;

  return (
    <article className={`bus-card ${open ? 'is-open' : ''}`}>
      {/* Header */}
      <div className="bus-card__head">
        <div className="bus-card__operator">
          <h3>{bus.operatorName}</h3>
          <div className="bus-card__type">{bus.busType}</div>
          <div className="rating">
            <span className="rating__pill"><Icon name="star" size={11} strokeWidth={2.2} /> {bus.operatorRating.toFixed(1)}</span>
            <span className="rating__count">{bus.reviewsCount} reviews</span>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline__end">
            <div className="timeline__time">{formatTime(bus.departureTime)}</div>
            <div className="timeline__city">{bus.fromCity}</div>
          </div>
          <div className="timeline__mid">
            <span className="timeline__dur">{bus.duration}</span>
            <span className="timeline__track" />
            <span className="timeline__direct">Direct</span>
          </div>
          <div>
            <div className="timeline__time">{formatTime(bus.arrivalTime)}</div>
            <div className="timeline__city">{bus.toCity}</div>
          </div>
        </div>

        <div className="bus-card__avail">
          <span className={`seats-left ${isLowStock ? 'is-low' : ''}`}>
            {isLowStock ? `Only ${bus.availableSeats} seats left` : `${bus.availableSeats} seats available`}
          </span>
          <div className="amenity-chips">
            {bus.amenities.slice(0, 3).map((a, i) => <span className="amenity-chip" key={i}>{a}</span>)}
            {bus.amenities.length > 3 && <span className="amenity-chip">+{bus.amenities.length - 3}</span>}
          </div>
        </div>

        <div className="bus-card__fare">
          <div>
            <span className="meta" style={{ display: 'block' }}>Fare starts from</span>
            <span className="price">₹{bus.price.toLocaleString('en-IN')}</span>
          </div>
          <button
            className={`btn ${open ? 'btn--secondary' : 'btn--primary'}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open ? 'Close Booking' : 'Select Seats'}
          </button>
        </div>
      </div>

      {/* Tray */}
      {open && (
        <div className="bus-tray animate-pop">
          <div className="tabs" role="tablist">
            {[
              { key: 'seats', label: 'Choose Seats' },
              { key: 'points', label: 'Boarding & Dropping' },
              { key: 'amenities', label: 'Amenities' },
              { key: 'policies', label: 'Cancellation Policy' }
            ].map(t => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`tab ${tab === t.key ? 'is-active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'seats' && (
            <div className="tray-grid">
              <SeatMap
                seats={bus.seats}
                isSleeper={bus.isSleeper}
                selectedSeats={selectedSeats}
                onSeatClick={(seat) => onSeatSelect(bus.id, seat)}
              />

              <div className="seat-summary">
                <div className="seat-summary__head">
                  <strong className="card-title" style={{ fontSize: '0.95rem' }}>Your Selection</strong>
                  {seatCount > 0 && (
                    <button className="btn btn--ghost btn--sm" onClick={() => setTab('seats')}>
                      Edit Seats
                    </button>
                  )}
                </div>

                {seatCount > 0 ? (
                  <>
                    <div className="seat-summary__list">
                      <div className="seat-summary__row">
                        <span>Seats selected</span>
                        <b style={{ color: 'var(--brand)' }}>{selectedSeats.join(', ')}</b>
                      </div>
                      <div className="seat-summary__row">
                        <span>Base fare ({seatCount} {seatCount === 1 ? 'seat' : 'seats'})</span>
                        <b>₹{(seatCount * bus.price).toLocaleString('en-IN')}</b>
                      </div>
                    </div>
                    <div className="seat-summary__total">
                      <span style={{ fontWeight: 600 }}>Total base fare</span>
                      <span className="price">₹{(seatCount * bus.price).toLocaleString('en-IN')}</span>
                    </div>
                    <button className="btn btn--primary btn--block" onClick={() => onContinueCheckout(bus)}>
                      Continue Booking
                      <Icon name="arrowRight" size={16} />
                    </button>
                  </>
                ) : (
                  <div className="seat-summary__empty">
                    Select one or more seats on the map to continue.
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'points' && (
            <div className="points-grid">
              <div className="points-col">
                <h4>Boarding Points</h4>
                {bus.boardingPoints.map(bp => (
                  <div className="point" key={bp.id}>
                    <span className="point__time">{bp.time}</span>
                    <div>
                      <div className="point__name">{bp.name}</div>
                      <div className="point__detail">{bp.details}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="points-col">
                <h4>Dropping Points</h4>
                {bus.droppingPoints.map(dp => (
                  <div className="point point--drop" key={dp.id}>
                    <span className="point__time">{dp.time}</span>
                    <div>
                      <div className="point__name">{dp.name}</div>
                      <div className="point__detail">{dp.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'amenities' && (
            <div className="amenities-tab">
              <h4>Amenities Provided in this Trip</h4>
              <div className="amenities-grid">
                {bus.amenities.map((a, i) => (
                  <div className="amenity-item" key={i}>
                    <Icon name="check" size={15} strokeWidth={2.4} className="check-icon" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'policies' && (
            <div className="policies-tab">
              <h4>Cancellation & Refund Terms</h4>
              <table className="policy-table">
                <thead>
                  <tr><th>Cancellation Window</th><th>Refund Amount</th></tr>
                </thead>
                <tbody>
                  <tr><td>More than 24 hours before departure</td><td className="ok">90% Refund</td></tr>
                  <tr><td>Between 12 to 24 hours before departure</td><td className="warn">50% Refund</td></tr>
                  <tr><td>Between 0 to 12 hours before departure</td><td className="bad">10% Refund</td></tr>
                  <tr><td>After scheduled departure time</td><td className="none">No Refund</td></tr>
                </tbody>
              </table>
              <p className="meta" style={{ marginTop: '12px', fontStyle: 'italic' }}>
                * Convenience fee and booking charges are non-refundable. Terms apply.
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}