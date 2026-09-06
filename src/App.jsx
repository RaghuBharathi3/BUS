import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Checkout from './pages/Checkout';
import BookingConfirmation from './pages/BookingConfirmation';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';

import { mockDb } from './data/mockDb';

const ROUTES = {
  home: '/',
  search: '/search',
  checkout: '/checkout',
  confirmation: '/confirmation',
  auth: '/auth',
  dashboard: '/dashboard',
  help: '/help'
};

const VALID_PAGES = Object.keys(ROUTES);

const pageFromHash = () => {
  const path = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return VALID_PAGES.includes(path) ? path : 'home';
};

const readSession = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeSession = (key, value) => {
  if (value === null || value === undefined) sessionStorage.removeItem(key);
  else sessionStorage.setItem(key, JSON.stringify(value));
};

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const [currentUser, setCurrentUser] = useState(() => mockDb.getCurrentUser());
  const [userBookings, setUserBookings] = useState(() => {
    const user = mockDb.getCurrentUser();
    return user ? mockDb.getBookings(user.email) : [];
  });

  const [searchParams, setSearchParams] = useState(() => readSession('safar_search_params') || { from: '', to: '', date: '' });
  const [selectedSeatsState, setSelectedSeatsState] = useState(() => readSession('safar_selected_seats') || {});
  const [checkoutBus, setCheckoutBus] = useState(() => readSession('safar_checkout_bus'));
  const [confirmedBooking, setConfirmedBooking] = useState(() => readSession('safar_confirmed_booking'));
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Keep hash and state in sync (supports back/forward + refresh)
  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((target) => {
    if (!VALID_PAGES.includes(target)) target = 'home';
    if (window.location.hash !== `#${ROUTES[target]}`) {
      window.location.hash = ROUTES[target];
    }
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Persist session-scoped booking state
  useEffect(() => {
    writeSession('safar_search_params', searchParams);
  }, [searchParams]);

  useEffect(() => {
    writeSession('safar_selected_seats', selectedSeatsState);
  }, [selectedSeatsState]);

  useEffect(() => {
    writeSession('safar_checkout_bus', checkoutBus);
  }, [checkoutBus]);

  useEffect(() => {
    writeSession('safar_confirmed_booking', confirmedBooking);
  }, [confirmedBooking]);

  // Route guards — derive the page we may actually render so the URL stays honest
  const effectivePage = (() => {
    if (page === 'dashboard' && !currentUser) return 'auth';
    if (page === 'checkout' && !checkoutBus) return 'search';
    if (page === 'confirmation' && !confirmedBooking) return 'home';
    return page;
  })();

  // Keep the URL in sync with the effective page without pushing history entries
  useEffect(() => {
    const expected = `#${ROUTES[effectivePage]}`;
    if (window.location.hash !== expected) {
      history.replaceState(null, '', expected);
    }
  }, [effectivePage]);

  const triggerToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleLogout = () => {
    mockDb.logoutUser();
    setCurrentUser(null);
    setUserBookings([]);
    setCheckoutBus(null);
    sessionStorage.removeItem('safar_checkout_form');
    triggerToast('Signed out successfully.');
    navigate('home');
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setUserBookings(mockDb.getBookings(user.email));
    triggerToast(`Welcome back, ${user.name.split(' ')[0]}!`);
    navigate(checkoutBus ? 'checkout' : 'dashboard');
  };

  const handleSearchBus = useCallback((from, to, date) => {
    setSearchParams({ from, to, date });
    navigate('search');
  }, [navigate]);

  const handleSelectSeats = useCallback((busId, seat) => {
    setSelectedSeatsState(prev => {
      const current = prev[busId] || [];
      if (current.includes(seat.seatNo)) {
        return { ...prev, [busId]: current.filter(s => s !== seat.seatNo) };
      }
      if (current.length >= 6) {
        triggerToast('You can select a maximum of 6 seats per booking.', 'error');
        return prev;
      }
      return { ...prev, [busId]: [...current, seat.seatNo] };
    });
  }, [triggerToast]);

  const handleContinueCheckout = useCallback((bus) => {
    setCheckoutBus(bus);
    if (!currentUser) {
      triggerToast('Please sign in or register to complete your booking.', 'info');
      navigate('auth');
    } else {
      navigate('checkout');
    }
  }, [currentUser, navigate, triggerToast]);

  const handleBookingComplete = useCallback((payload) => {
    const newBooking = mockDb.addBooking(payload);
    setConfirmedBooking(newBooking);

    setSelectedSeatsState(prev => {
      const copy = { ...prev };
      delete copy[payload.busId];
      return copy;
    });

    if (currentUser) {
      setUserBookings(mockDb.getBookings(currentUser.email));
    }

    setCheckoutBus(null);
    sessionStorage.removeItem('safar_checkout_form');
    triggerToast('Ticket booked successfully!');
    navigate('confirmation');
  }, [currentUser, navigate, triggerToast]);

  const handleProfileUpdate = useCallback((updatedUser) => {
    setCurrentUser(updatedUser);
    triggerToast('Profile settings saved.');
  }, [triggerToast]);

  const renderPage = () => {
    switch (effectivePage) {
      case 'home': return <Home onSearchBus={handleSearchBus} />;
      case 'search':
        return (
          <SearchResults
            key={`${searchParams.from}-${searchParams.to}-${searchParams.date}`}
            searchParams={searchParams}
            onSearch={handleSearchBus}
            onSelectBusSeats={handleSelectSeats}
            selectedSeatsState={selectedSeatsState}
            onContinueCheckout={handleContinueCheckout}
          />
        );
      case 'checkout':
        return (
          <Checkout
            bus={checkoutBus}
            selectedSeats={selectedSeatsState[checkoutBus?.id] || []}
            currentUser={currentUser}
            userBookings={userBookings}
            onBookingComplete={handleBookingComplete}
            onNavigateHome={() => navigate('search')}
          />
        );
      case 'confirmation':
        return <BookingConfirmation booking={confirmedBooking} onNavigate={navigate} />;
      case 'auth':
        return <Auth onAuthSuccess={handleAuthSuccess} />;
      case 'dashboard':
        return (
          <Dashboard
            currentUser={currentUser}
            onProfileUpdate={handleProfileUpdate}
            onNavigateHome={() => navigate('home')}
            onNavigate={navigate}
          />
        );
      case 'help': return <Help />;
      default: return <Home onSearchBus={handleSearchBus} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} page={effectivePage} onNavigate={navigate} onLogout={handleLogout} />

      <main className="main-content">
        {renderPage()}
      </main>

      <Footer onNavigate={navigate} />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}