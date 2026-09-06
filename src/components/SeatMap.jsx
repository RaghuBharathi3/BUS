import { useState } from 'react';
import Icon from './Icon';

export default function SeatMap({ seats = [], isSleeper, selectedSeats = [], onSeatClick }) {
  const [activeDeck, setActiveDeck] = useState('Lower');

  const deckSeats = seats.filter(s => s.deck === activeDeck);
  const maxRow = Math.max(...deckSeats.map(s => s.row), 1);
  const rows = Array.from({ length: maxRow }, (_, i) => i + 1);

  const seatClass = (seat) => {
    const isSelected = selectedSeats.includes(seat.seatNo);
    return [
      'seat',
      isSleeper ? 'seat--sleeper' : 'seat--seater',
      isSelected ? 'is-selected' : '',
      seat.isLadies ? 'is-ladies' : ''
    ].join(' ');
  };

  const SeatButton = ({ seat }) => (
    <button
      type="button"
      disabled={seat.isBooked}
      onClick={() => onSeatClick(seat)}
      className={seatClass(seat)}
      title={`${seat.seatNo}${seat.isLadies ? ' · Ladies / Priority' : ''}${seat.isBooked ? ' · Booked' : ''}`}
      aria-label={`Seat ${seat.seatNo}${seat.isBooked ? ', unavailable' : ''}`}
    >
      {seat.seatNo}
    </button>
  );

  const sleeperLayout = () => (
    <div className="seat-grid">
      {/* Left single berths */}
      <div className="seat-row">
        {rows.map(rowNum => {
          const seat = deckSeats.find(s => s.row === rowNum && s.column === 'Left');
          return seat ? <SeatButton key={seat.seatNo} seat={seat} /> : null;
        })}
      </div>

      <div className="aisle" />

      {/* Right double berths */}
      <div className="seat-row">
        {rows.map(rowNum => {
          const seat = deckSeats.filter(s => s.row === rowNum && s.column === 'Right')[0];
          return seat ? <SeatButton key={seat.seatNo} seat={seat} /> : null;
        })}
      </div>
      <div className="seat-row">
        {rows.map(rowNum => {
          const seat = deckSeats.filter(s => s.row === rowNum && s.column === 'Right')[1];
          return seat ? <SeatButton key={seat.seatNo} seat={seat} /> : null;
        })}
      </div>
    </div>
  );

  const seaterLayout = () => {
    const col = (letter) => rows.map(rowNum => {
      const seat = deckSeats.find(s => s.row === rowNum && s.seatNo.endsWith(letter));
      return seat ? <SeatButton key={seat.seatNo} seat={seat} /> : null;
    });

    return (
      <div className="seat-grid">
        <div className="seat-row">{col('A')}</div>
        <div className="seat-row">{col('B')}</div>
        <div className="aisle" />
        <div className="seat-row">{col('C')}</div>
        <div className="seat-row">{col('D')}</div>
      </div>
    );
  };

  return (
    <div className="seat-map">
      {isSleeper && (
        <div className="deck-tabs">
          {['Lower', 'Upper'].map(deck => (
            <button
              key={deck}
              type="button"
              className={`deck-tab ${activeDeck === deck ? 'is-active' : ''}`}
              onClick={() => setActiveDeck(deck)}
            >
              {deck} Deck
            </button>
          ))}
        </div>
      )}

      <div className="bus-frame">
        <div className="bus-frame__front">
          <span>Driver</span>
          <span className="steering"><Icon name="steering" size={15} /></span>
        </div>
        {isSleeper ? sleeperLayout() : seaterLayout()}
      </div>

      <div className="legend">
        <span className="legend__item"><span className="legend__swatch" /> Available</span>
        <span className="legend__item"><span className="legend__swatch legend__swatch--selected" /> Selected</span>
        <span className="legend__item"><span className="legend__swatch legend__swatch--booked" /> Booked</span>
        <span className="legend__item"><span className="legend__swatch legend__swatch--ladies" /> Ladies / Priority</span>
      </div>
    </div>
  );
}