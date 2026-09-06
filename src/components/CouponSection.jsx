import { useState } from 'react';
import { coupons, calculateDiscount } from '../data/coupons';
import Icon from './Icon';

export default function CouponSection({ baseFare, userBookings, travelDate, onApplyCoupon, activeCoupon }) {
  const [couponCode, setCouponCode] = useState('');
  const [feedback, setFeedback] = useState(null); // { ok, message }

  const tryApply = (code) => {
    if (!code.trim()) return;
    const result = calculateDiscount(code.trim().toUpperCase(), baseFare, userBookings, travelDate);
    if (result.valid) {
      setFeedback({ ok: true, message: result.message });
      setCouponCode(code.trim().toUpperCase());
      onApplyCoupon({ code: code.trim().toUpperCase(), discountAmount: result.discount });
    } else {
      setFeedback({ ok: false, message: result.message });
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    tryApply(couponCode);
  };

  const handleRemove = () => {
    onApplyCoupon(null);
    setCouponCode('');
    setFeedback(null);
  };

  const isEligible = (c) => {
    if (c.code === 'FIRSTTRIP') return userBookings.filter(b => b.status !== 'Cancelled').length === 0;
    if (c.code === 'WEEKEND' && travelDate) {
      const day = new Date(travelDate).getDay();
      return day === 0 || day === 6;
    }
    return true;
  };

  return (
    <div className="form-card animate-fade">
      <h3 className="card-title" style={{ marginBottom: '14px' }}>
        <span className="icon-tile"><Icon name="ticket" size={16} /></span>
        Promos & Coupons
      </h3>

      {activeCoupon ? (
        <div className="coupon-applied">
          <div>
            <span className="strong-label">Promo Applied</span>
            <div className="coupon-applied__code">{activeCoupon.code}</div>
            <small>You saved ₹{activeCoupon.discountAmount} on this booking</small>
          </div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={handleRemove}>
            <Icon name="close" size={14} /> Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="coupon-input">
            <input
              type="text"
              className="input"
              placeholder="Enter promo code"
              value={couponCode}
              onChange={(e) => { setCouponCode(e.target.value); setFeedback(null); }}
              aria-label="Promo code"
            />
            <button type="submit" className="btn btn--primary" disabled={!couponCode.trim()}>
              Apply
            </button>
          </div>
          {feedback && (
            <div className={`coupon-feedback ${feedback.ok ? 'coupon-feedback--ok' : 'coupon-feedback--bad'}`}>
              {feedback.ok ? <Icon name="checkCircle" size={14} /> : <Icon name="alert" size={14} />} {feedback.message}
            </div>
          )}
        </form>
      )}

      {!activeCoupon && (
        <div style={{ marginTop: '16px' }}>
          <span className="strong-label" style={{ display: 'block', marginBottom: '9px' }}>Available Offers</span>
          <div className="offer-list">
            {coupons.map(c => {
              const eligible = isEligible(c);
              return (
                <div className={`offer ${eligible ? '' : 'is-unavailable'}`} key={c.code}>
                  <div className="offer__head">
                    <span className="offer__code">{c.code}</span>
                    {eligible ? (
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => tryApply(c.code)}>
                        APPLY
                      </button>
                    ) : (
                      <span className="meta" style={{ fontWeight: 600 }}>Not eligible</span>
                    )}
                  </div>
                  <p className="offer__desc">{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}