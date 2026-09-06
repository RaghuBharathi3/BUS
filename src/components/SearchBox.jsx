import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import { cities } from '../data/cities';
import { getTodayDateStr, getTomorrowDateStr } from '../utils/format';

export default function SearchBox({ onSearch, initialFrom = '', initialTo = '', initialDate = '' }) {
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [fromInput, setFromInput] = useState(initialFrom);
  const [toInput, setToInput] = useState(initialTo);
  const [travelDate, setTravelDate] = useState(initialDate || getTomorrowDateStr());

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [swapped, setSwapped] = useState(false);
  const [errors, setErrors] = useState({});

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const matchCities = (val) => {
    const q = val.toLowerCase().trim();
    if (!q) return cities;
    return cities.filter(
      c => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
    );
  };

  const handleFromChange = (val) => {
    setFromInput(val);
    setFromCity('');
    setErrors((e) => ({ ...e, from: undefined }));
    setFromSuggestions(matchCities(val));
  };

  const handleToChange = (val) => {
    setToInput(val);
    setToCity('');
    setErrors((e) => ({ ...e, to: undefined }));
    setToSuggestions(matchCities(val));
  };

  const selectFrom = (city) => {
    setFromCity(city.name);
    setFromInput(city.name);
    setOpenFrom(false);
    setErrors((e) => ({ ...e, from: undefined }));
  };

  const selectTo = (city) => {
    setToCity(city.name);
    setToInput(city.name);
    setOpenTo(false);
    setErrors((e) => ({ ...e, to: undefined }));
  };

  const handleSwap = () => {
    setSwapped(!swapped);
    setFromCity(toCity);
    setFromInput(toInput);
    setToCity(fromCity);
    setToInput(fromInput);
    setErrors({});
  };

  // Close suggestions on outside click and validate on blur
  useEffect(() => {
    const handleOutside = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setOpenFrom(false);
        if (fromCity) setFromInput(fromCity);
        else if (fromInput && !cities.some(c => c.name.toLowerCase() === fromInput.toLowerCase())) {
          setErrors((prev) => ({ ...prev, from: 'Select a valid city from the list.' }));
        }
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setOpenTo(false);
        if (toCity) setToInput(toCity);
        else if (toInput && !cities.some(c => c.name.toLowerCase() === toInput.toLowerCase())) {
          setErrors((prev) => ({ ...prev, to: 'Select a valid city from the list.' }));
        }
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [fromCity, toCity, fromInput, toInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    const validFrom = cities.some(c => c.name.toLowerCase() === fromInput.toLowerCase());
    const validTo = cities.some(c => c.name.toLowerCase() === toInput.toLowerCase());

    if (!fromInput.trim() || !validFrom) errs.from = 'Select a valid origin city.';
    if (!toInput.trim() || !validTo) errs.to = 'Select a valid destination city.';
    if (validFrom && validTo && fromInput.toLowerCase() === toInput.toLowerCase()) {
      errs.to = 'Origin and destination cannot be the same city.';
    }
    if (!travelDate) errs.date = 'Please select a travel date.';
    else {
      const today = new Date(getTodayDateStr());
      const selected = new Date(travelDate);
      if (selected < today) errs.date = 'Travel date cannot be in the past.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onSearch(fromInput, toInput, travelDate);
  };

  const renderSuggestions = (list, onPick) =>
    list.length > 0 && (
      <div className="suggestions" role="listbox">
        {list.map(c => (
          <button key={c.id} type="button" role="option" onClick={() => onPick(c)}>
            <span className="city">{c.name} <span>· {c.state}</span></span>
            <span className="code">{c.code}</span>
          </button>
        ))}
      </div>
    );

  return (
    <div className="search-shell">
      <div className="search-box animate-pop">
        <form onSubmit={handleSubmit} noValidate>
          <div className="search-box__row">
            <div className="search-box__field" ref={fromRef}>
              <label className="field__label" htmlFor="search-from">Leaving From</label>
              <Icon name="target" size={17} className="search-box__icon" />
              <input
                id="search-from"
                type="text"
                className={`input search-box__input ${errors.from ? 'input--invalid' : ''}`}
                placeholder="e.g. Chennai"
                autoComplete="off"
                value={fromInput}
                onChange={(e) => handleFromChange(e.target.value)}
                onFocus={() => { setOpenFrom(true); setFromSuggestions(matchCities(fromInput)); }}
              />
              {errors.from && <span className="field__error"><Icon name="alert" size={13} />{errors.from}</span>}
              {openFrom && renderSuggestions(fromSuggestions, selectFrom)}
            </div>

            <button
              type="button"
              className={`search-box__swap ${swapped ? 'is-rotated' : ''}`}
              onClick={handleSwap}
              title="Swap locations"
              aria-label="Swap origin and destination"
            >
              <Icon name="swap" size={18} />
            </button>

            <div className="search-box__field" ref={toRef}>
              <label className="field__label" htmlFor="search-to">Going To</label>
              <Icon name="pin" size={17} className="search-box__icon" />
              <input
                id="search-to"
                type="text"
                className={`input search-box__input ${errors.to ? 'input--invalid' : ''}`}
                placeholder="e.g. Bengaluru"
                autoComplete="off"
                value={toInput}
                onChange={(e) => handleToChange(e.target.value)}
                onFocus={() => { setOpenTo(true); setToSuggestions(matchCities(toInput)); }}
              />
              {errors.to && <span className="field__error"><Icon name="alert" size={13} />{errors.to}</span>}
              {openTo && renderSuggestions(toSuggestions, selectTo)}
            </div>
          </div>

          <div className="search-box__actions">
            <div className="field search-box__field">
              <label className="field__label" htmlFor="search-date">Journey Date</label>
              <Icon name="calendar" size={17} className="search-box__icon" />
              <input
                id="search-date"
                type="date"
                className={`input search-box__input ${errors.date ? 'input--invalid' : ''}`}
                value={travelDate}
                min={getTodayDateStr()}
                onChange={(e) => { setTravelDate(e.target.value); setErrors((prev) => ({ ...prev, date: undefined })); }}
              />
              {errors.date && <span className="field__error"><Icon name="alert" size={13} />{errors.date}</span>}
            </div>

            <button type="submit" className="btn btn--primary btn--lg">
              Search Buses
              <Icon name="arrowRight" size={17} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}