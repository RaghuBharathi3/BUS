import { useState } from 'react';
import Icon from '../components/Icon';

const FAQS = [
  {
    q: 'Do I need a printed physical copy of my boarding pass?',
    a: 'No. A digital boarding pass — showing your Booking ID in the Dashboard — is fully sufficient to board any Safar fleet bus.'
  },
  {
    q: 'How long do cancellation refunds take to credit?',
    a: 'Refunds are disbursed to the payment gateway immediately after cancellation. They typically reach your bank account or UPI wallet within 2–3 business days.'
  },
  {
    q: 'Can I change my boarding location after booking?',
    a: 'Boarding points cannot be changed after payment. If your coordinates must change, cancel and rebook a new ticket.'
  }
];

export default function Help() {
  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackSuccess(true);
    setInquiry({ name: '', email: '', message: '' });
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  return (
    <div className="page page--tight animate-fade">
      <div className="container" style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="eyebrow">Support Center</span>
        <h1 className="display" style={{ fontSize: '2rem', marginTop: '8px' }}>
          Help, policies & FAQs
        </h1>
        <p className="subhead" style={{ margin: '12px auto 0' }}>
          Questions about reservations, cancellations, or refunds? We're here to help.
        </p>
      </div>

      <div className="container">
        <div className="help-layout">
          {/* Left: policies + FAQs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
            <section>
              <h2 className="h-section" style={{ marginBottom: '14px' }}>Cancellation & Refund Guidelines</h2>
              <p className="subhead" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
                Refunds are calculated from the window between your request and the bus departure time.
              </p>
              <div className="policy-table-wrap">
                <table className="policy-table">
                  <thead>
                    <tr><th>Cancellation Timeline</th><th>Refund Value</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>More than 24 hours prior to departure</td><td className="ok">90% Refund</td></tr>
                    <tr><td>Between 12 to 24 hours prior to departure</td><td className="warn">50% Refund</td></tr>
                    <tr><td>Within 12 hours of departure</td><td className="bad">10% Refund</td></tr>
                    <tr><td>After scheduled departure time</td><td className="none">0% Refund</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="h-section" style={{ marginBottom: '8px' }}>Frequently Asked Questions</h2>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {FAQS.map((faq, idx) => (
                  <div className="faq-item" key={idx}>
                    <button
                      className="faq-item__q"
                      aria-expanded={openFaq === idx}
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    >
                      {faq.q}
                      <span className="chev"><Icon name="chevronDown" size={16} /></span>
                    </button>
                    <div className={`faq-item__a ${openFaq === idx ? 'is-open' : ''}`}>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-card contact-card">
              <h3 className="card-title" style={{ marginBottom: '10px' }}>
                <span className="icon-tile"><Icon name="headset" size={16} /></span>
                Direct Hotline
              </h3>
              <div className="contact-line">
                <span className="icon-tile"><Icon name="phone" size={16} /></span>
                <div>
                  <small>Toll-free helpline</small>
                  <strong>1800-419-8989</strong>
                </div>
              </div>
              <div className="contact-line">
                <span className="icon-tile"><Icon name="mail" size={16} /></span>
                <div>
                  <small>Email support desk</small>
                  <strong>support@safar.com</strong>
                </div>
              </div>
            </div>

            <div className="form-card">
              <h3 className="card-title" style={{ marginBottom: '14px' }}>
                <span className="icon-tile"><Icon name="edit" size={16} /></span>
                Send us an inquiry
              </h3>

              {feedbackSuccess && (
                <div className="coupon-applied" style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                    <Icon name="checkCircle" size={16} /> Thank you! We've received your query.
                  </div>
                </div>
              )}

              <form className="form-stack" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="field__label" htmlFor="inq-name">Name</label>
                  <input
                    id="inq-name"
                    type="text"
                    className="input"
                    placeholder="e.g. Arun"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="inq-email">Email</label>
                  <input
                    id="inq-email"
                    type="email"
                    className="input"
                    placeholder="e.g. arun@email.com"
                    value={inquiry.email}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="inq-message">Message</label>
                  <textarea
                    id="inq-message"
                    className="textarea"
                    rows="4"
                    placeholder="Tell us how we can help…"
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--lg btn--block">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}