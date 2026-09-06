import { useState, useEffect, useMemo } from 'react';
import { getBusesForRoute } from '../data/buses';
import FilterPanel from '../components/FilterPanel';
import BusCard from '../components/BusCard';
import SearchBox from '../components/SearchBox';
import Icon from '../components/Icon';
import { formatDate } from '../utils/format';

const DEFAULT_FILTERS = {
  isAC: false,
  isNonAC: false,
  isSleeper: false,
  isSeater: false,
  departureTime: [],
  operators: [],
  maxPrice: 3000
};

export default function SearchResults({
  searchParams,
  onSearch,
  onSelectBusSeats,
  selectedSeatsState = {},
  onContinueCheckout
}) {
  const { from, to, date } = searchParams;
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('recommended');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filterDirty, setFilterDirty] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Simulate API fetch. The component is remounted per search (keyed in App),
  // so `loading` starts true and only async state updates happen here.
  useEffect(() => {
    const timer = setTimeout(() => {
      setBuses(getBusesForRoute(from, to, date));
      setLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [from, to, date]);

  const handleFilterChange = (next) => {
    setFilters(next);
    setFilterDirty(JSON.stringify(next) !== JSON.stringify(DEFAULT_FILTERS));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setFilterDirty(false);
    setMobileFiltersOpen(false);
  };

  const filteredBuses = useMemo(() => {
    let result = [...buses];

    if (filters.isAC && !filters.isNonAC) result = result.filter(b => b.isAC);
    else if (filters.isNonAC && !filters.isAC) result = result.filter(b => !b.isAC);

    if (filters.isSleeper && !filters.isSeater) result = result.filter(b => b.isSleeper);
    else if (filters.isSeater && !filters.isSleeper) result = result.filter(b => !b.isSleeper);

    result = result.filter(b => b.price <= filters.maxPrice);

    if (filters.departureTime.length > 0) {
      result = result.filter(b => {
        const [h] = b.departureTime.split(':').map(Number);
        return filters.departureTime.some(slot => {
          if (slot === 'morning') return h >= 6 && h < 12;
          if (slot === 'afternoon') return h >= 12 && h < 18;
          if (slot === 'evening') return h >= 18 && h < 24;
          if (slot === 'night') return h >= 0 && h < 6;
          return false;
        });
      });
    }

    if (filters.operators.length > 0) {
      result = result.filter(b => filters.operators.includes(b.operatorName));
    }

    switch (sortOption) {
      case 'cheapest': result.sort((a, b) => a.price - b.price); break;
      case 'earliest': result.sort((a, b) => a.departureTime.localeCompare(b.departureTime)); break;
      case 'duration': result.sort((a, b) => a.durationMinutes - b.durationMinutes); break;
      case 'rating': result.sort((a, b) => b.operatorRating - a.operatorRating); break;
      default:
        result.sort((a, b) => (b.operatorRating - a.operatorRating) || (a.price - b.price));
    }

    return result;
  }, [buses, filters, sortOption]);

  const uniqueOperators = useMemo(
    () => Array.from(new Set(buses.map(b => b.operatorName))),
    [buses]
  );

  const isFiltered = filterDirty;

  const handleNewSearch = (f, t, d) => {
    setModifying(false);
    setMobileFiltersOpen(false);
    onSearch(f, t, d);
  };

  return (
    <div className="animate-fade">
      {/* Route banner */}
      <div className="results-hero">
        <div className="container results-hero__inner">
          <div>
            <h1 className="results-hero__route">
              {from} <span className="to">to</span> {to}
            </h1>
            <p className="results-hero__meta">
              {formatDate(date, { weekday: true })} &nbsp;·&nbsp;
              <b>{loading ? 'Finding buses…' : `${filteredBuses.length} ${filteredBuses.length === 1 ? 'bus' : 'buses'} found`}</b>
              {!loading && isFiltered && ` (from ${buses.length})`}
            </p>
          </div>
          <button className="btn btn--secondary btn--sm" onClick={() => setModifying(!modifying)} style={{ color: '#fff', background: 'transparent', borderColor: 'rgba(255,255,255,0.25)' }}>
            <Icon name="edit" size={15} />
            {modifying ? 'Hide Search' : 'Modify Search'}
          </button>
        </div>
      </div>

      <div className="container">
        {modifying && (
          <div style={{ marginBottom: '28px' }}>
            <SearchBox
              key={from + to + date}
              initialFrom={from}
              initialTo={to}
              initialDate={date}
              onSearch={handleNewSearch}
            />
          </div>
        )}

        {/* Mobile toolbar */}
        <div className="results-toolbar">
          <button className="btn btn--secondary" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
            <Icon name="settings" size={15} />
            {mobileFiltersOpen ? 'Hide Filters' : 'Filters & Sort'}
          </button>
        </div>

        {loading ? (
          <div className="results-layout">
            <div className="skeleton" style={{ height: '420px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[0, 1, 2].map(i => <div key={i} className="skeleton" style={{ height: '150px' }} />)}
            </div>
          </div>
        ) : (
          <div className="results-layout">
            <div className={mobileFiltersOpen ? 'filters is-open' : 'filters'}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                sortOption={sortOption}
                onSortChange={setSortOption}
                operators={uniqueOperators}
              />
            </div>

            <div>
              {filteredBuses.length > 0 ? (
                filteredBuses.map(bus => (
                  <BusCard
                    key={bus.id}
                    bus={bus}
                    onSeatSelect={onSelectBusSeats}
                    selectedSeats={selectedSeatsState[bus.id] || []}
                    onContinueCheckout={onContinueCheckout}
                  />
                ))
              ) : (
                <div className="empty">
                  <span className="empty__icon"><Icon name="bus" size={44} strokeWidth={1.4} /></span>
                  <h4>No buses match your filters</h4>
                  <p>
                    {buses.length > 0
                      ? `We found ${buses.length} buses on this route, but none match your current filters.`
                      : `We couldn't find any buses on ${from} → ${to} for this date. Try another date or route.`}
                  </p>
                  <button
                    className="btn btn--secondary"
                    onClick={buses.length > 0 ? resetFilters : () => onSearch(from, to, date)}
                  >
                    {buses.length > 0 ? 'Reset Filters' : 'Try Again'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}