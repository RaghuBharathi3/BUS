// Shared formatting helpers

export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${String(m).padStart(2, '0')} ${ampm}`;
};

export const formatDate = (dateStr, opts = {}) => {
  if (!dateStr) return '';
  const { weekday = false, year = false } = opts;
  return new Date(dateStr).toLocaleDateString('en-US', {
    ...(weekday ? { weekday: 'short' } : {}),
    day: 'numeric',
    month: 'short',
    ...(year ? { year: 'numeric' } : {})
  });
};

export const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

export const getTodayDateStr = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getTomorrowDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// Deterministic initial from a seed string (keeps route data stable per search)
export const hashSeed = (str) =>
  String(str).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);