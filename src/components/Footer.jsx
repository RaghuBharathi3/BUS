const BRAND_MARK = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12c0-3.3 1.6-6.2 4-8" />
    <path d="M9 16c2-4 4-4 6-8" />
  </svg>
);

export default function Footer({ onNavigate }) {
  const go = (e, target) => {
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a href="#/" onClick={(e) => go(e, 'home')} className="brand" style={{ color: '#fff' }}>
              <span className="brand__mark">{BRAND_MARK}</span>
              <span className="brand__name">safar</span>
            </a>
            <p className="footer__blurb">
              A premium, thoughtful mobility experience simplified for travelers. Proudly connecting cities across India.
            </p>
          </div>

          <div>
            <h4 className="footer__heading">Book Travel</h4>
            <ul className="footer__links">
              <li><a href="#/search" onClick={(e) => go(e, 'home')}>Search Bus Routes</a></li>
              <li><a href="#/dashboard" onClick={(e) => go(e, 'dashboard')}>My Reservation History</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer__heading">Help Desk</h4>
            <ul className="footer__links">
              <li><a href="#/help" onClick={(e) => go(e, 'help')}>FAQs & Support</a></li>
              <li><a href="#/help" onClick={(e) => go(e, 'help')}>Cancellation Policies</a></li>
              <li><a href="#/help" onClick={(e) => go(e, 'help')}>Contact Representative</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Safar Mobility Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#/help" onClick={(e) => go(e, 'help')}>Terms of Service</a>
            <a href="#/help" onClick={(e) => go(e, 'help')}>Privacy Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}