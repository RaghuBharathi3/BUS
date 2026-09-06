import Icon from './Icon';
import { calculateFare } from '../utils/fare';

export default function FareSummary({ basePrice, seatsCount = 0, activeCoupon = null }) {
  const { baseFare, convenienceFee, taxes, discount, totalFare } = calculateFare(basePrice, seatsCount, activeCoupon);

  return (
    <div className="form-card animate-fade">
      <h3 className="card-title" style={{ marginBottom: '16px' }}>
        <span className="icon-tile"><Icon name="clock" size={16} /></span>
        Fare Details
      </h3>

      <div className="fare-rows">
        <div className="fare-row">
          <span>Base fare ({seatsCount} {seatsCount === 1 ? 'seat' : 'seats'})</span>
          <b>₹{baseFare.toLocaleString('en-IN')}</b>
        </div>
        <div className="fare-row">
          <span>Convenience fee</span>
          <b>₹{convenienceFee}</b>
        </div>
        <div className="fare-row">
          <span>Service tax (GST 5%)</span>
          <b>₹{taxes}</b>
        </div>
        {discount > 0 && (
          <div className="fare-row fare-row--discount">
            <span>Coupon discount</span>
            <span>− ₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="fare-row fare-row--total">
          <span style={{ fontWeight: 700 }}>Total payable</span>
          <span className="price">₹{totalFare.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}