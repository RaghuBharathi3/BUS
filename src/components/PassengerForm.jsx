import Icon from './Icon';

export default function PassengerForm({
  selectedSeats = [],
  passengers = [],
  onChangePassengers,
  contactDetails = { email: '', phone: '' },
  onChangeContact,
  validationErrors = {}
}) {
  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    onChangePassengers(updated);
  };

  const err = (key) => validationErrors[key];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Contact details */}
      <section className="form-card animate-fade">
        <h3 className="card-title" style={{ marginBottom: '18px' }}>
          <span className="icon-tile"><Icon name="mail" size={16} /></span>
          Contact Information
        </h3>
        <div className="contact-grid">
          <div className="field">
            <label className="field__label" htmlFor="contact-email">Email Address</label>
            <input
              id="contact-email"
              type="email"
              className={`input ${err('email') ? 'input--invalid' : ''}`}
              placeholder="e.g. customer@email.com"
              value={contactDetails.email}
              onChange={(e) => onChangeContact({ ...contactDetails, email: e.target.value })}
            />
            {err('email') && (
              <span className="field__error"><Icon name="alert" size={13} />{err('email')}</span>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="contact-phone">Mobile Number</label>
            <div style={{ display: 'flex' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '0 13px', border: '1px solid var(--line-strong)', borderRight: 'none',
                borderRadius: 'var(--r-md) 0 0 var(--r-md)', background: 'var(--paper)',
                fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-soft)'
              }}>+91</span>
              <input
                id="contact-phone"
                type="tel"
                inputMode="numeric"
                className={`input ${err('phone') ? 'input--invalid' : ''}`}
                placeholder="10-digit number"
                style={{ borderRadius: '0 var(--r-md) var(--r-md) 0' }}
                value={contactDetails.phone}
                onChange={(e) => onChangeContact({ ...contactDetails, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              />
            </div>
            {err('phone') && (
              <span className="field__error"><Icon name="alert" size={13} />{err('phone')}</span>
            )}
          </div>
        </div>
      </section>

      {/* Passenger cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 className="card-title">
          <span className="icon-tile"><Icon name="user" size={16} /></span>
          Passenger Details
          <span className="meta" style={{ fontWeight: 500, marginLeft: 'auto' }}>
            {selectedSeats.length} {selectedSeats.length === 1 ? 'passenger' : 'passengers'}
          </span>
        </h3>

        {selectedSeats.map((seatNo, idx) => {
          const pass = passengers[idx] || { name: '', age: '', gender: '', seatNo };
          const nameError = err(`${idx}-name`);
          const ageError = err(`${idx}-age`);
          const genderError = err(`${idx}-gender`);

          return (
            <div className="passenger-card animate-fade" key={seatNo}>
              <div className="passenger-card__head">
                <strong style={{ fontSize: '0.95rem' }}>Passenger {idx + 1}</strong>
                <span className="passenger-card__seat">Seat {seatNo}</span>
              </div>

              <div className="passenger-grid">
                <div className="field">
                  <label className="field__label" htmlFor={`pass-${idx}-name`}>Full Name</label>
                  <input
                    id={`pass-${idx}-name`}
                    type="text"
                    className={`input ${nameError ? 'input--invalid' : ''}`}
                    placeholder="As shown in ID card"
                    value={pass.name || ''}
                    onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                  />
                  {nameError && <span className="field__error"><Icon name="alert" size={13} />{nameError}</span>}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor={`pass-${idx}-age`}>Age</label>
                  <input
                    id={`pass-${idx}-age`}
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="120"
                    className={`input ${ageError ? 'input--invalid' : ''}`}
                    placeholder="Yrs"
                    value={pass.age || ''}
                    onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                  />
                  {ageError && <span className="field__error"><Icon name="alert" size={13} />{ageError}</span>}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor={`pass-${idx}-gender`}>Gender</label>
                  <select
                    id={`pass-${idx}-gender`}
                    className={`select ${genderError ? 'select--invalid' : ''}`}
                    value={pass.gender || ''}
                    onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {genderError && <span className="field__error"><Icon name="alert" size={13} />{genderError}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}