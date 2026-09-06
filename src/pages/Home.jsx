import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import Icon from '../components/Icon';
import { getTomorrowDateStr } from '../utils/format';

const POPULAR_ROUTES = [
  { from: 'Chennai', to: 'Bengaluru', price: 750, duration: '6h 30m' },
  { from: 'Mumbai', to: 'Pune', price: 450, duration: '3h 20m' },
  { from: 'Hyderabad', to: 'Bengaluru', price: 1100, duration: '9h 00m' },
  { from: 'Mumbai', to: 'Goa', price: 1300, duration: '11h 00m' }
];

const VALUE_PROPS = [
  {
    icon: 'clock',
    title: 'On-Time Guarantee',
    body: 'We partner only with verified travel operators with a consistent track record of punctuality.'
  },
  {
    icon: 'shield',
    title: 'Instant Safe Cancellations',
    body: 'Plans changed? Cancel your ticket instantly from your dashboard and receive automatic refunds.'
  },
  {
    icon: 'headset',
    title: 'Direct Customer Support',
    body: 'Our human representative support desk is available 24/7 to resolve queries during your trip.'
  }
];

export default function Home({ onSearchBus }) {
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('safar_recent_searches')) || [];
    } catch {
      return [];
    }
  });

  const handleSearchSubmit = (from, to, date) => {
    const list = [ { from, to, date }, ...recentSearches.filter(i => !(i.from === from && i.to === to)) ].slice(0, 3);
    setRecentSearches(list);
    localStorage.setItem('safar_recent_searches', JSON.stringify(list));
    onSearchBus(from, to, date);
  };

  const handleQuickRoute = (from, to) => {
    handleSearchSubmit(from, to, getTomorrowDateStr());
  };

  const clearRecent = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('safar_recent_searches');
  };

  return (
    <div className="animate-fade">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <span className="eyebrow">India&rsquo;s premium bus travel</span>
          <h1 className="display hero__title">
            Search buses. <em>Book Safar.</em>
          </h1>
          <p className="subhead hero__sub" style={{ margin: '16px auto 0' }}>
            Reserve comfortable, verified berths across India with zero booking fees and instant confirmations.
          </p>
          <SearchBox onSearch={handleSearchSubmit} />
        </div>
      </section>

      <div className="container">
        {/* Recent searches */}
        {recentSearches.length > 0 && (
          <section className="home-section" aria-label="Recent searches">
            <div className="section-head">
              <span className="strong-label">Recent Searches</span>
              <button className="btn btn--ghost btn--sm" onClick={clearRecent}>
                <Icon name="trash" size={14} /> Clear
              </button>
            </div>
            <div className="recent-list">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  className="recent-chip"
                  onClick={() => onSearchBus(item.from, item.to, item.date)}
                >
                  <Icon name="arrowRight" size={13} />
                  {item.from} → {item.to}
                  <span className="meta">
                    {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Popular routes */}
        <section className="home-section" aria-label="Popular routes">
          <div className="section-head">
            <span className="strong-label">Popular Connections</span>
            <span className="meta">Fares from, per seat</span>
          </div>
          <div className="route-list">
            {POPULAR_ROUTES.map((route, idx) => (
              <div key={idx} className="route-row" onClick={() => handleQuickRoute(route.from, route.to)} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleQuickRoute(route.from, route.to); } }}>
                <div className="route-row__cities">
                  <span className="route-row__city">{route.from}</span>
                  <span className="route-row__arrow"><Icon name="arrowRight" size={15} /></span>
                  <span className="route-row__city">{route.to}</span>
                </div>
                <div className="route-row__center">
                  <span>{route.duration}</span>
                  <span className="route-row__line" />
                  <span>Direct</span>
                </div>
                <div className="route-row__fare">
                  <span className="meta" style={{ display: 'block' }}>Fares from</span>
                  <span className="price">₹{route.price}</span>
                </div>
                <span className="route-row__cta"><Icon name="arrowRight" size={18} /></span>
              </div>
            ))}
          </div>
        </section>

        {/* Value props */}
        <section className="home-section" style={{ paddingBottom: '20px' }}>
          <div className="value-grid">
            {VALUE_PROPS.map((v) => (
              <div className="value-item" key={v.title}>
                <span className="value-item__icon"><Icon name={v.icon} size={19} /></span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}