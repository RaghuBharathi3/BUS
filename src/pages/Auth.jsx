import { useState } from 'react';
import { mockDb } from '../data/mockDb';
import Icon from '../components/Icon';

export default function Auth({ onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const clearFeedback = () => {
    setAuthError('');
    setErrors({});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    clearFeedback();

    if (!loginEmail || !loginPassword) {
      setAuthError('Please enter both email and password.');
      return;
    }

    const result = mockDb.loginUser(loginEmail, loginPassword);
    if (result.success) onAuthSuccess(result.user);
    else setAuthError(result.message);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setAuthError('');
    const errs = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regName.trim() || regName.trim().length < 3) errs.name = 'Name must be at least 3 characters.';
    if (!regEmail || !emailRegex.test(regEmail)) errs.email = 'Enter a valid email address.';
    if (!regPhone || regPhone.length !== 10) errs.phone = 'Enter a valid 10-digit phone number.';
    if (!regPassword || regPassword.length < 6) errs.password = 'Password must be at least 6 characters.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const result = mockDb.registerUser(regName.trim(), regEmail, regPassword, regPhone);
    if (result.success) {
      const loginResult = mockDb.loginUser(regEmail, regPassword);
      if (loginResult.success) onAuthSuccess(loginResult.user);
    } else {
      setAuthError(result.message);
    }
  };

  const handleQuickLogin = (email, password) => {
    const result = mockDb.loginUser(email, password);
    if (result.success) onAuthSuccess(result.user);
  };

  return (
    <div className="page animate-fade">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-card__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'login'}
              className={`auth-card__tab ${activeTab === 'login' ? 'is-active' : ''}`}
              onClick={() => { setActiveTab('login'); clearFeedback(); }}
            >
              Sign In
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'register'}
              className={`auth-card__tab ${activeTab === 'register' ? 'is-active' : ''}`}
              onClick={() => { setActiveTab('register'); clearFeedback(); }}
            >
              Create Account
            </button>
          </div>

          <div className="auth-card__body">
            <div className="auth-card__head">
              <h2>{activeTab === 'login' ? 'Welcome back' : 'Begin your journey'}</h2>
              <p>
                {activeTab === 'login'
                  ? 'Sign in to access your bookings and saved travel history.'
                  : 'Create an account to unlock promos and manage bookings.'}
              </p>
            </div>

            {authError && (
              <div className="auth-error" role="alert" style={{ marginBottom: '18px' }}>
                <Icon name="alert" size={16} /> {authError}
              </div>
            )}

            {activeTab === 'login' ? (
              <form className="form-stack" onSubmit={handleLogin} noValidate>
                <div className="field">
                  <label className="field__label" htmlFor="login-email">Email Address</label>
                  <input
                    id="login-email"
                    type="email"
                    className="input"
                    placeholder="e.g. arun@safar.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    className="input"
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--lg" style={{ marginTop: '6px' }}>
                  Sign In
                </button>
              </form>
            ) : (
              <form className="form-stack" onSubmit={handleRegister} noValidate>
                <div className="field">
                  <label className="field__label" htmlFor="reg-name">Full Name</label>
                  <input
                    id="reg-name"
                    type="text"
                    className={`input ${errors.name ? 'input--invalid' : ''}`}
                    placeholder="e.g. Arun Kumar"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                  {errors.name && <span className="field__error"><Icon name="alert" size={13} />{errors.name}</span>}
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="reg-email">Email Address</label>
                  <input
                    id="reg-email"
                    type="email"
                    className={`input ${errors.email ? 'input--invalid' : ''}`}
                    placeholder="e.g. arun@safar.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                  {errors.email && <span className="field__error"><Icon name="alert" size={13} />{errors.email}</span>}
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="reg-phone">Mobile Number</label>
                  <input
                    id="reg-phone"
                    type="tel"
                    inputMode="numeric"
                    className={`input ${errors.phone ? 'input--invalid' : ''}`}
                    placeholder="10-digit number"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                  {errors.phone && <span className="field__error"><Icon name="alert" size={13} />{errors.phone}</span>}
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="reg-password">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    className={`input ${errors.password ? 'input--invalid' : ''}`}
                    placeholder="Minimum 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  {errors.password && <span className="field__error"><Icon name="alert" size={13} />{errors.password}</span>}
                </div>
                <button type="submit" className="btn btn--primary btn--lg" style={{ marginTop: '6px' }}>
                  Register & Sign In
                </button>
              </form>
            )}

            {activeTab === 'login' && (
              <div className="demo-accounts">
                <span className="strong-label">Demo accounts for testing</span>
                <button className="demo-row" onClick={() => handleQuickLogin('arun@safar.com', 'password')}>
                  Arun Kumar <span>Sign in <Icon name="arrowRight" size={13} /></span>
                </button>
                <button className="demo-row" onClick={() => handleQuickLogin('priya@safar.com', 'password')}>
                  Priya Sharma <span>Sign in <Icon name="arrowRight" size={13} /></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}