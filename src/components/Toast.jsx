import { useEffect } from 'react';
import Icon from './Icon';

export default function Toast({ message, type = 'success', onClose, duration = 3200 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icon = type === 'success' ? 'checkCircle' : type === 'error' ? 'alert' : 'info';

  return (
    <div className={`toast toast--${type}`} role="status">
      <span className="toast__icon">
        <Icon name={icon} size={19} strokeWidth={2.2} />
      </span>
      <p>{message}</p>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss notification">
        <Icon name="close" size={15} />
      </button>
    </div>
  );
}