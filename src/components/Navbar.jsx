import { useState } from 'react';
import Icon from './Icon';

const BRAND_MARK = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12c0-3.3 1.6-6.2 4-8" />
    <path d="M9 16c2-4 4-4 6-8" />
  </svg>
);

export default function Navbar({ currentUser, page, onNavigate, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (target) => {
    setDropdownOpen(false);
    setMobileOpen(false);
    onNavigate(target);
  };

  const goHome = (e) => {
    e.preventDefault();
    go('home');
  };

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#/" onClick={goHome} className="brand" aria-label="Safar home">
          <span className="brand__mark">{BRAND_MARK}</span>
          <span className="brand__name">safar</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a
            href="#/search"
            onClick={(e) => { e.preventDefault(); go('search'); }}
            className={`nav__link ${page === 'search' || page === 'checkout' || page === 'confirmation' ? 'is-active' : ''}`}
          >
            Search Buses
          </a>
          <a
            href="#/help"
            onClick={(e) => { e.preventDefault(); go('help'); }}
            className={`nav__link ${page === 'help' ? 'is-active' : ''}`}
          >
            Help & FAQs
          </a>
        </nav>

        <div className="nav__actions">
          {currentUser ? (
            <div className="nav__user">
              <button
                className="nav__user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
              >
                <span className="avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
                <span className="nav__user-name">{currentUser.name.split(' ')[0]}</span>
                <Icon name="chevronDown" size={14} />
              </button>

              {dropdownOpen && (
                <div className="dropdown" role="menu">
                  <button className="dropdown__item" role="menuitem" onClick={() => go('dashboard')}>
                    <Icon name="ticket" size={16} /> My Bookings
                  </button>
                  <div className="dropdown__divider" />
                  <button className="dropdown__item dropdown__item--danger" role="menuitem" onClick={() => { setDropdownOpen(false); onLogout(); }}>
                    <Icon name="logout" size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn--secondary btn--sm" onClick={() => go('auth')}>
              Sign In
            </button>
          )}

          <button
            className="nav__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu is-open">
          <a href="#/search" onClick={(e) => { e.preventDefault(); go('search'); }}>Search Buses</a>
          <a href="#/help" onClick={(e) => { e.preventDefault(); go('help'); }}>Help & FAQs</a>
          {currentUser ? (
            <>
              <a href="#/dashboard" onClick={(e) => { e.preventDefault(); go('dashboard'); }}>My Bookings</a>
              <button className="btn btn--secondary" onClick={() => { setMobileOpen(false); onLogout(); }}>
                <Icon name="logout" size={16} /> Sign Out
              </button>
            </>
          ) : (
            <button className="btn btn--primary" onClick={() => go('auth')}>Sign In / Register</button>
          )}
        </div>
      )}
    </header>
  );
}