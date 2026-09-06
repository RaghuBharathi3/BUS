import { useState } from 'react';
import { mockDb } from '../data/mockDb';
import Ticket from '../components/Ticket';
import Icon from '../components/Icon';
import { formatDate } from '../utils/format';

const NAV_ITEMS = [
  { key: 'upcoming', label: 'Upcoming Bookings', icon: 'calendar' },
  { key: 'completed', label: 'Completed Trips', icon: 'checkCircle' },
  { key: 'cancelled', label: 'Cancelled Tickets', icon: 'close' },
  { key: 'profile', label: 'Profile Settings', icon: 'settings' }
];

export default function Dashboard({ currentUser, onProfileUpdate, onNavigateHome, onNavigate }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState(() =>
    currentUser ? mockDb.getBookings(currentUser.email) : []
  );

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [age, setAge] = useState(currentUser?.age || '');
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErrors, setProfileErrors] = useState({});

  const [cancelling, setCancelling] = useState(null); // booking object
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  if (!currentUser) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty">
            <span className="empty__icon"><Icon name="user" size={44} strokeWidth={1.4} /></span>
            <h4>Sign in to view your bookings</h4>
            <p>Your tickets and trip history are tied to your account.</p>
            <button className="btn btn--primary" onClick={() => onNavigate('auth')}>Sign In</button>
          </div>
        </div>
      </div>
    );
  }

  const filteredBookings = () => {
    if (activeTab === 'upcoming') return bookings.filter(b => b.status === 'Upcoming');
    if (activeTab === 'completed') return bookings.filter(b => b.status === 'Completed');
    if (activeTab === 'cancelled') return bookings.filter(b => b.status === 'Cancelled');
    return [];
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim() || name.trim().length < 3) errs.name = 'Name must be at least 3 characters.';
    if (!/^\d{10}$/.test(phone)) errs.phone = 'Enter a valid 10-digit phone number.';
    if (age && (Number(age) < 1 || Number(age) > 120)) errs.age = 'Enter a valid age (1–120).';
    setProfileErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setProfileMsg('');
    const result = mockDb.updateProfile({ name: name.trim(), phone, age: age ? Number(age) : '', gender });
    if (result.success) {
      setProfileMsg('Profile updated successfully.');
      onProfileUpdate(result.user);
      setTimeout(() => setProfileMsg(''), 3500);
    }
  };

  const openCancelModal = (booking) => {
    const refund = Math.round(booking.fareDetails.totalFare * 0.9);
    setCancelling({ booking, refund });
  };

  const confirmCancel = () => {
    const result = mockDb.cancelBooking(cancelling.booking.id);
    if (result.success) {
      setBookings(mockDb.getBookings(currentUser.email));
      setCancelling(null);
    }
  };

  const list = filteredBookings();
  const selectedBooking = bookings.find(b => b.id === selectedTicketId);

  return (
    <div className="page page--tight animate-fade">
      <div className="container">
        {/* Greeting band */}
        <div className="dash-hero">
          <div>
            <span className="eyebrow">Welcome back</span>
            <h1>{currentUser.name}</h1>
          </div>
          <div className="dash-stats">
            <div className="dash-stat">
              <span className="strong-label">Upcoming</span>
              <strong>{bookings.filter(b => b.status === 'Upcoming').length}</strong>
            </div>
            <div className="dash-stat">
              <span className="strong-label">Completed</span>
              <strong className="green">{bookings.filter(b => b.status === 'Completed').length}</strong>
            </div>
            <div className="dash-stat">
              <span className="strong-label">Total</span>
              <strong>{bookings.length}</strong>
            </div>
          </div>
        </div>

        <div className="dash-layout">
          {/* Nav */}
          <nav className="dash-nav" aria-label="Dashboard sections">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                className={`dash-nav__btn ${activeTab === item.key ? 'is-active' : ''}`}
                onClick={() => { setActiveTab(item.key); setSelectedTicketId(null); }}
              >
                <Icon name={item.icon} size={17} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div>
            {selectedBooking ? (
              <div className="animate-fade">
                <button className="btn btn--ghost btn--sm" onClick={() => setSelectedTicketId(null)} style={{ marginBottom: '16px' }}>
                  <Icon name="arrowLeft" size={15} /> Back to list
                </button>
                <Ticket booking={selectedBooking} />
              </div>
            ) : activeTab === 'profile' ? (
              <div className="form-card animate-fade">
                <h3 className="card-title" style={{ marginBottom: '20px' }}>
                  <span className="icon-tile"><Icon name="user" size={16} /></span>
                  Personal Profile
                </h3>

                {profileMsg && (
                  <div className="coupon-applied" style={{ marginBottom: '18px' }}>
                    <div>
                      <Icon name="checkCircle" size={16} /> {profileMsg}
                    </div>
                  </div>
                )}

                <form className="form-stack" onSubmit={handleUpdateProfile} noValidate>
                  <div className="field">
                    <label className="field__label" htmlFor="profile-name">Full Name</label>
                    <input
                      id="profile-name"
                      type="text"
                      className={`input ${profileErrors.name ? 'input--invalid' : ''}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {profileErrors.name && <span className="field__error"><Icon name="alert" size={13} />{profileErrors.name}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '14px' }}>
                    <div className="field">
                      <label className="field__label" htmlFor="profile-age">Age</label>
                      <input
                        id="profile-age"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        max="120"
                        className={`input ${profileErrors.age ? 'input--invalid' : ''}`}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      {profileErrors.age && <span className="field__error"><Icon name="alert" size={13} />{profileErrors.age}</span>}
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="profile-gender">Gender</label>
                      <select
                        id="profile-gender"
                        className="select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="profile-phone">Mobile Number</label>
                    <input
                      id="profile-phone"
                      type="tel"
                      inputMode="numeric"
                      className={`input ${profileErrors.phone ? 'input--invalid' : ''}`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                    {profileErrors.phone && <span className="field__error"><Icon name="alert" size={13} />{profileErrors.phone}</span>}
                  </div>

                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                    <button type="submit" className="btn btn--primary" style={{ minWidth: '160px' }}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade">
                {list.length > 0 ? (
                  list.map(booking => (
                    <div className="booking-row" key={booking.id}>
                      <div style={{ minWidth: 0 }}>
                        <span className="booking-row__id">Booking {booking.id}</span>
                        <h4 className="booking-row__route">{booking.fromCity} → {booking.toCity}</h4>
                        <div className="booking-row__meta">
                          <span>{formatDate(booking.travelDate, { year: true })}</span>
                          <span className="sep">·</span>
                          <span>{booking.departureTime}</span>
                          <span className="sep">·</span>
                          <span>Seats {booking.seatsSelected.join(', ')}</span>
                        </div>
                      </div>
                      <div className="booking-row__actions">
                        <button className="btn btn--secondary btn--sm" onClick={() => setSelectedTicketId(booking.id)}>
                          View Ticket
                        </button>
                        {booking.status === 'Upcoming' && (
                          <button className="btn btn--ghost btn--sm" onClick={() => openCancelModal(booking)}>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty">
                    <span className="empty__icon"><Icon name={activeTab === 'upcoming' ? 'calendar' : 'close'} size={44} strokeWidth={1.4} /></span>
                    <h4>No {activeTab} trips found</h4>
                    <p>
                      {activeTab === 'upcoming'
                        ? 'Plan your next journey and it will show up here.'
                        : 'There are no records in this section yet.'}
                    </p>
                    {activeTab === 'upcoming' && (
                      <button className="btn btn--primary" onClick={onNavigateHome}>
                        Book a Ticket
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel modal */}
      {cancelling && (
        <>
          <div className="modal-backdrop" onClick={() => setCancelling(null)} />
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
            <h3 id="cancel-title">Confirm cancellation?</h3>
            <p>
              Cancel booking <strong>{cancelling.booking.id}</strong> ({cancelling.booking.fromCity} → {cancelling.booking.toCity})?
              A refund of <strong>₹{cancelling.refund.toLocaleString('en-IN')}</strong> (90% of the fare) will be credited
              to your original payment method.
            </p>
            <div className="modal__actions">
              <button className="btn btn--secondary" onClick={() => setCancelling(null)}>
                No, Keep Ticket
              </button>
              <button className="btn btn--danger" onClick={confirmCancel}>
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}