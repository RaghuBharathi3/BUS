import Ticket from '../components/Ticket';
import Icon from '../components/Icon';

export default function BookingConfirmation({ booking, onNavigate }) {
  if (!booking) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty">
            <span className="empty__icon"><Icon name="ticket" size={44} strokeWidth={1.4} /></span>
            <h4>No booking to show</h4>
            <p>Complete a booking to see your confirmation and boarding pass here.</p>
            <button className="btn btn--primary" onClick={() => onNavigate('home')}>
              Book a Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--tight animate-fade">
      <div className="container">
        <div className="confirm-hero no-print">
          <span className="confirm-hero__icon">
            <Icon name="check" size={28} strokeWidth={2.6} />
          </span>
          <h1 className="display" style={{ fontSize: '2rem' }}>Booking Confirmed!</h1>
          <p>
            Booking <strong>{booking.id}</strong> is reserved. A confirmation with boarding details
            has been sent to your email and SMS.
          </p>
          <div className="confirm-hero__actions">
            <button className="btn btn--secondary" onClick={() => onNavigate('dashboard')}>
              Manage Booking
            </button>
            <button className="btn btn--primary" onClick={() => onNavigate('home')}>
              Book Another Trip
            </button>
          </div>
        </div>

        <Ticket booking={booking} />
      </div>
    </div>
  );
}