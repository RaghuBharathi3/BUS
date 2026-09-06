const TIME_SLOTS = [
  { key: 'morning', label: 'Morning', range: '6 AM – 12 PM' },
  { key: 'afternoon', label: 'Afternoon', range: '12 PM – 6 PM' },
  { key: 'evening', label: 'Evening', range: '6 PM – 12 AM' },
  { key: 'night', label: 'Night', range: '12 AM – 6 AM' }
];

export default function FilterPanel({ filters, onFilterChange, sortOption, onSortChange, operators = [] }) {
  const toggleList = (category, value) => {
    const activeList = filters[category].includes(value)
      ? filters[category].filter(v => v !== value)
      : [...filters[category], value];
    onFilterChange({ ...filters, [category]: activeList });
  };

  const toggleBool = (key) => {
    onFilterChange({ ...filters, [key]: !filters[key] });
  };

  const resetFilters = () => {
    onFilterChange({
      isAC: false, isNonAC: false, isSleeper: false, isSeater: false,
      departureTime: [], operators: [], maxPrice: 3000
    });
  };

  return (
    <aside aria-label="Filters and sorting">
      {/* Sort */}
      <div className="filters__head">
        <h3 className="filters__title">Sort Results</h3>
      </div>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="select"
        style={{ marginTop: '12px' }}
        aria-label="Sort results"
      >
        <option value="recommended">Recommended</option>
        <option value="cheapest">Cheapest First</option>
        <option value="earliest">Earliest Departure</option>
        <option value="duration">Shortest Duration</option>
        <option value="rating">Highest Rated</option>
      </select>

      <hr className="filters__divider" />

      {/* Filter header */}
      <div className="filters__head">
        <h3 className="filters__title">Filter Results</h3>
        <button type="button" className="btn btn--ghost btn--sm" onClick={resetFilters}>
          Clear All
        </button>
      </div>

      {/* Bus class */}
      <div className="filters__group">
        <span className="filters__label">Bus Class</span>
        <label className="check">
          <input type="checkbox" checked={filters.isAC} onChange={() => toggleBool('isAC')} />
          <span className="check__box" />
          <span>A/C</span>
        </label>
        <label className="check">
          <input type="checkbox" checked={filters.isNonAC} onChange={() => toggleBool('isNonAC')} />
          <span className="check__box" />
          <span>Non A/C</span>
        </label>
        <label className="check">
          <input type="checkbox" checked={filters.isSleeper} onChange={() => toggleBool('isSleeper')} />
          <span className="check__box" />
          <span>Sleeper Berths</span>
        </label>
        <label className="check">
          <input type="checkbox" checked={filters.isSeater} onChange={() => toggleBool('isSeater')} />
          <span className="check__box" />
          <span>Seater Chairs</span>
        </label>
      </div>

      <hr className="filters__divider" />

      {/* Price */}
      <div className="filters__group">
        <div className="range-head">
          <span className="filters__label">Max Price</span>
          <b>₹{filters.maxPrice.toLocaleString('en-IN')}</b>
        </div>
        <input
          type="range"
          min="300"
          max="3000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          aria-label="Maximum price"
        />
        <div className="range-labels">
          <span>₹300</span>
          <span>₹3,000</span>
        </div>
      </div>

      <hr className="filters__divider" />

      {/* Departure time */}
      <div className="filters__group">
        <span className="filters__label">Departure Time</span>
        <div className="time-grid">
          {TIME_SLOTS.map(slot => (
            <button
              key={slot.key}
              type="button"
              className={`time-option ${filters.departureTime.includes(slot.key) ? 'is-active' : ''}`}
              onClick={() => toggleList('departureTime', slot.key)}
            >
              {slot.label}
              <small>{slot.range}</small>
            </button>
          ))}
        </div>
      </div>

      {/* Operators */}
      {operators.length > 0 && (
        <>
          <hr className="filters__divider" />
          <div className="filters__group">
            <span className="filters__label">Travel Operators</span>
            <div className="operators-list">
              {operators.map(op => (
                <label className="check" key={op}>
                  <input type="checkbox" checked={filters.operators.includes(op)} onChange={() => toggleList('operators', op)} />
                  <span className="check__box" />
                  <span>{op}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}