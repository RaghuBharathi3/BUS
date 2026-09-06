import { useState } from 'react';
import Icon from './Icon';

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank'];

export default function PaymentForm({ totalAmount, onPaymentSuccess }) {
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState('');

  const handleCardNumber = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' ') : '');
  };

  const handleExpiry = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2)}`;
    setCardExpiry(val);
  };

  const validate = () => {
    const errs = {};
    if (method === 'upi') {
      if (!upiId.trim()) errs.upiId = 'UPI ID is required.';
      else if (!upiId.includes('@')) errs.upiId = 'Enter a valid UPI ID, e.g. name@okaxis.';
    } else if (method === 'card') {
      if (!cardName.trim()) errs.cardName = 'Cardholder name is required.';
      if (cardNumber.replace(/\s/g, '').length !== 16) errs.cardNumber = 'Enter a valid 16-digit card number.';
      const [m, y] = cardExpiry.split('/');
      if (!m || !y || m.length !== 2 || y.length !== 2 || Number(m) < 1 || Number(m) > 12) {
        errs.cardExpiry = 'Enter expiry in MM/YY format.';
      } else {
        const expYear = 2000 + Number(y);
        const now = new Date();
        const isExpired = expYear < now.getFullYear() ||
          (expYear === now.getFullYear() && Number(m) < now.getMonth() + 1);
        if (isExpired) errs.cardExpiry = 'This card has expired.';
      }
      if (cardCvv.length !== 3) errs.cardCvv = 'CVV must be 3 digits.';
    } else if (method === 'netbanking') {
      if (!selectedBank) errs.bank = 'Please select your bank.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setPhase('Securing connection with the payment gateway…');
    setTimeout(() => setPhase('Verifying payment details with your bank…'), 1100);
    setTimeout(() => setPhase('Confirming seats with the operator…'), 2200);
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess(method);
    }, 3600);
  };

  const switchMethod = (m) => {
    setMethod(m);
    setErrors({});
  };

  return (
    <div className="form-card" style={{ position: 'relative', minHeight: '300px' }}>
      {loading && (
        <div className="pay-overlay" role="status" aria-live="polite">
          <span className="spinner" />
          <strong>Processing Payment</strong>
          <p>{phase}</p>
        </div>
      )}

      <h3 className="card-title" style={{ marginBottom: '18px' }}>
        <span className="icon-tile"><Icon name="lock" size={16} /></span>
        Choose Payment Method
        <span className="secure-tag" style={{ marginLeft: 'auto' }}>
          <Icon name="shield" size={14} /> 256-bit secured
        </span>
      </h3>

      <div className="pay-methods" role="tablist" aria-label="Payment method">
        <button type="button" role="tab" aria-selected={method === 'upi'}
          className={`pay-method ${method === 'upi' ? 'is-active' : ''}`} onClick={() => switchMethod('upi')}>
          <Icon name="smartphone" size={17} /> UPI / QR
        </button>
        <button type="button" role="tab" aria-selected={method === 'card'}
          className={`pay-method ${method === 'card' ? 'is-active' : ''}`} onClick={() => switchMethod('card')}>
          <Icon name="card" size={17} /> Card
        </button>
        <button type="button" role="tab" aria-selected={method === 'netbanking'}
          className={`pay-method ${method === 'netbanking' ? 'is-active' : ''}`} onClick={() => switchMethod('netbanking')}>
          <Icon name="bank" size={17} /> Net Banking
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {method === 'upi' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="field">
              <label className="field__label" htmlFor="upi-id">Virtual Payment Address (VPA)</label>
              <input
                id="upi-id"
                type="text"
                className={`input ${errors.upiId ? 'input--invalid' : ''}`}
                placeholder="e.g. mobile@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              {errors.upiId && <span className="field__error"><Icon name="alert" size={13} />{errors.upiId}</span>}
            </div>

            <div className="qr-box">
              <div className="qr-box__code">
                <svg width="100%" height="100%" viewBox="0 0 100 100" aria-hidden="true">
                  <rect x="0" y="0" width="25" height="25" fill="var(--ink)" />
                  <rect x="5" y="5" width="15" height="15" fill="#fff" />
                  <rect x="75" y="0" width="25" height="25" fill="var(--ink)" />
                  <rect x="80" y="5" width="15" height="15" fill="#fff" />
                  <rect x="0" y="75" width="25" height="25" fill="var(--ink)" />
                  <rect x="5" y="80" width="15" height="15" fill="#fff" />
                  <rect x="32" y="32" width="26" height="26" fill="var(--brand)" />
                  <rect x="40" y="40" width="10" height="10" fill="#fff" />
                  <rect x="66" y="66" width="10" height="10" fill="var(--ink)" />
                  <rect x="60" y="80" width="14" height="6" fill="var(--ink)" />
                  <rect x="80" y="58" width="6" height="14" fill="var(--ink)" />
                </svg>
              </div>
              <div>
                <strong style={{ fontSize: '0.88rem' }}>Scan to pay</strong>
                <p>Scan this QR with any UPI app — GPay, PhonePe or Paytm — to pay instantly.</p>
              </div>
            </div>
          </div>
        )}

        {method === 'card' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="field">
              <label className="field__label" htmlFor="card-name">Cardholder Name</label>
              <input
                id="card-name"
                type="text"
                className={`input ${errors.cardName ? 'input--invalid' : ''}`}
                placeholder="As printed on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              {errors.cardName && <span className="field__error"><Icon name="alert" size={13} />{errors.cardName}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="card-number">Card Number</label>
              <input
                id="card-number"
                type="text"
                inputMode="numeric"
                className={`input ${errors.cardNumber ? 'input--invalid' : ''}`}
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={handleCardNumber}
              />
              {errors.cardNumber && <span className="field__error"><Icon name="alert" size={13} />{errors.cardNumber}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="field">
                <label className="field__label" htmlFor="card-expiry">Expiry Date</label>
                <input
                  id="card-expiry"
                  type="text"
                  inputMode="numeric"
                  className={`input ${errors.cardExpiry ? 'input--invalid' : ''}`}
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={handleExpiry}
                />
                {errors.cardExpiry && <span className="field__error"><Icon name="alert" size={13} />{errors.cardExpiry}</span>}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="card-cvv">CVV</label>
                <input
                  id="card-cvv"
                  type="password"
                  inputMode="numeric"
                  className={`input ${errors.cardCvv ? 'input--invalid' : ''}`}
                  placeholder="•••"
                  maxLength={3}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                />
                {errors.cardCvv && <span className="field__error"><Icon name="alert" size={13} />{errors.cardCvv}</span>}
              </div>
            </div>
          </div>
        )}

        {method === 'netbanking' && (
          <div className="animate-fade">
            <div className="field">
              <label className="field__label" htmlFor="bank">Select Bank</label>
              <select
                id="bank"
                className={`select ${errors.bank ? 'select--invalid' : ''}`}
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">Choose Bank</option>
                {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.bank && <span className="field__error"><Icon name="alert" size={13} />{errors.bank}</span>}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn--primary btn--lg btn--block" style={{ marginTop: '4px' }}>
          <Icon name="lock" size={16} />
          Pay ₹{totalAmount.toLocaleString('en-IN')} & Book
        </button>
      </form>
    </div>
  );
}