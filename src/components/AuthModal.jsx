import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Mail, Phone, Lock, User, MapPin, Eye, EyeOff, ShieldCheck, Smartphone, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { INDIAN_STATES } from '../data/mockSchemes';

// ── OTP Input: 6 individual boxes ────────────────────────────────────────────
const OTPInput = ({ value, onChange }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    const newValue = value.split('');
    newValue[index] = digit;
    onChange(newValue.join(''));
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, ''));
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="otp-container">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="otp-box"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
};

// ── Countdown Timer for OTP Resend ───────────────────────────────────────────
const OTPTimer = ({ initialSeconds = 30, onResend }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleResend = () => {
    setSeconds(initialSeconds);
    setCanResend(false);
    onResend();
  };

  return (
    <div className="otp-timer">
      {canResend ? (
        <button type="button" onClick={handleResend} className="otp-resend-btn">
          Resend OTP via SMS
        </button>
      ) : (
        <span className="otp-timer-text">Resend OTP in <strong>{seconds}s</strong></span>
      )}
    </div>
  );
};

// ── Social Auth Buttons ──────────────────────────────────────────────────────
const SocialAuthSection = ({ onGoogleClick, onOTPClick }) => (
  <div className="social-auth-section">
    <div className="social-auth-divider">
      <span>or continue with</span>
    </div>
    <div className="social-auth-buttons">
      <button className="social-btn" onClick={onGoogleClick} type="button">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        Google SSO
      </button>
      <button className="social-btn" onClick={onOTPClick} type="button">
        <Smartphone size={18} />
        Jan Parichay OTP
      </button>
    </div>
    <div className="auth-gov-seal">
      <ShieldCheck size={13} style={{ color: 'var(--accent-600)' }} />
      <span>Direct Benefit Transfer (DBT) Single Sign-On Portal</span>
    </div>
  </div>
);

// ── Main AuthModal Component ─────────────────────────────────────────────────
export const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { login, register } = useAuth();
  const [tab, setTab] = useState(initialTab); // 'login' | 'register' | 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Register Form State
  const [regData, setRegData] = useState({
    name: '',
    age: '',
    state: 'Delhi',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    usePhone: false
  });

  // OTP State
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  const closeButtonRef = useRef(null);

  // Sync tab with initialTab prop
  useEffect(() => {
    setTab(initialTab);
    setError('');
    setSuccess('');
  }, [initialTab, isOpen]);

  // ESC key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── Login Handler ────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const { email, password } = loginData;
    if (!email.trim() || (!email.includes('@') && !/^\d{10}$/.test(email))) {
      setError('Enter a valid email address or 10-digit mobile number.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    login(email, password);
    setSuccess('Login successful! Redirecting...');
    setTimeout(onClose, 800);
  };

  // ── Register Handler (Step 1: show OTP) ─────────────────────────────────
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    const { name, age, state, email, phone, password, confirmPassword, usePhone } = regData;

    if (!name.trim()) { setError('Full name is required.'); return; }
    const parsedAge = parseInt(age, 10);
    if (!age || isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      setError('Please enter a valid age between 0 and 120.'); return;
    }
    if (!state) { setError('Please select your state.'); return; }
    const contact = usePhone ? phone : email;
    if (usePhone && !/^\d{10}$/.test(phone)) {
      setError('Enter a valid 10-digit mobile number.'); return;
    }
    if (!usePhone && (!email.trim() || !email.includes('@'))) {
      setError('Enter a valid email address.'); return;
    }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setPendingUser({ name, age: parsedAge, state, contact, password });
    setTab('otp');
    setOtpValue('');
    setOtpError('');
  };

  // ── OTP Verify Handler ───────────────────────────────────────────────────
  const MOCK_OTP = '123456';
  const handleVerifyOTP = () => {
    setOtpError('');
    if (otpValue.length < 6) {
      setOtpError('Please enter all 6 digits of the OTP.'); return;
    }
    if (otpValue !== MOCK_OTP) {
      setOtpError('Incorrect OTP. (Demo code: 123456)'); return;
    }
    register(pendingUser.name, pendingUser.contact, pendingUser.password);
    setSuccess('Account created successfully! Welcome to Welfora!');
    setTimeout(onClose, 1200);
  };

  const handleResendOTP = () => {
    console.log('[Demo] OTP resent to:', pendingUser?.contact);
  };

  const handleGoogleMock = () => {
    setError('');
    alert('Google SSO is configured in demo mode. Signing in as demo citizen...');
    login('citizen.demo@gmail.com', 'demopass123');
    setTimeout(onClose, 600);
  };

  const handleMobileOTPMock = () => {
    setError('');
    setTab('otp');
    setPendingUser({ name: 'Citizen User', contact: '+91 9876543210', password: '' });
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
    >
      <div className="modal-panel-elevated">
        {/* Top Gradient Stripe */}
        <div className="modal-top-accent" />

        {/* Header */}
        <div className="modal-header-clean">
          <div className="modal-title-group">
            <div className="brand-group-mini">
              <div className="brand-icon-sm">W</div>
              <span className="brand-label-sm">WELFORA CIVIC ID</span>
            </div>
            <h2 className="modal-main-heading">
              {tab === 'login' ? 'Citizen Sign In' : tab === 'register' ? 'Create Citizen Account' : 'Verify Your Identity'}
            </h2>
            <p className="modal-sub-text">
              {tab === 'login'
                ? 'Access your eligible government schemes and saved benefits'
                : tab === 'register'
                  ? 'Join Welfora to discover personalized benefits across India'
                  : `Enter the 6-digit OTP sent to ${pendingUser?.contact || 'your device'}`}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="modal-close-icon-btn"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modern Segmented Tab Slider */}
        {tab !== 'otp' && (
          <div className="segmented-tabs-wrapper">
            <div className="segmented-tabs-track">
              <button
                type="button"
                className={`segmented-tab-btn ${tab === 'login' ? 'active' : ''}`}
                onClick={() => { setTab('login'); setError(''); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`segmented-tab-btn ${tab === 'register' ? 'active' : ''}`}
                onClick={() => { setTab('register'); setError(''); }}
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* Feedback Banners */}
        {error && (
          <div className="auth-status-banner banner-error">
            <span>⚠️ {error}</span>
          </div>
        )}
        {success && (
          <div className="auth-status-banner banner-success">
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        {/* ── SIGN IN FORM ────────────────────────────────────────────── */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form-body">
            <div className="clean-input-group">
              <label className="clean-label" htmlFor="modal-email">Email or 10-Digit Mobile</label>
              <div className="input-icon-wrapper">
                <Mail size={16} className="input-leading-icon" />
                <input
                  id="modal-email"
                  type="text"
                  className="clean-text-input"
                  placeholder="name@example.com or 9876543210"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="clean-input-group">
              <div className="label-row-split">
                <label className="clean-label" htmlFor="modal-password">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('For demo, use any password >= 4 characters or mobile OTP.'); }} className="forgot-pass-link">
                  Forgot Password?
                </a>
              </div>
              <div className="input-icon-wrapper">
                <Lock size={16} className="input-leading-icon" />
                <input
                  id="modal-password"
                  type={showPassword ? 'text' : 'password'}
                  className="clean-text-input"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg auth-submit-btn">
              <span>Sign In to Welfora</span>
            </button>

            <SocialAuthSection onGoogleClick={handleGoogleMock} onOTPClick={handleMobileOTPMock} />
          </form>
        )}

        {/* ── REGISTER FORM ─────────────────────────────────────────── */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="auth-form-body">
            {/* Full Name */}
            <div className="clean-input-group">
              <label className="clean-label" htmlFor="reg-modal-name">Full Name (as per Aadhaar)</label>
              <div className="input-icon-wrapper">
                <User size={16} className="input-leading-icon" />
                <input
                  id="reg-modal-name"
                  type="text"
                  className="clean-text-input"
                  placeholder="e.g. Rahul Sharma"
                  value={regData.name}
                  onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Age & State 2-Column */}
            <div className="two-col-inputs">
              <div className="clean-input-group">
                <label className="clean-label" htmlFor="reg-modal-age">Age (Years)</label>
                <input
                  id="reg-modal-age"
                  type="number"
                  className="clean-text-input"
                  placeholder="25"
                  min="0"
                  max="120"
                  value={regData.age}
                  onChange={(e) => setRegData({ ...regData, age: e.target.value })}
                  required
                />
              </div>

              <div className="clean-input-group">
                <label className="clean-label" htmlFor="reg-modal-state">State of Residence</label>
                <div className="input-icon-wrapper">
                  <MapPin size={16} className="input-leading-icon" />
                  <select
                    id="reg-modal-state"
                    className="clean-select-input"
                    value={regData.state}
                    onChange={(e) => setRegData({ ...regData, state: e.target.value })}
                  >
                    {INDIAN_STATES.filter((s) => s !== 'All States').map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Email / Mobile Switcher */}
            <div className="clean-input-group">
              <div className="contact-method-header">
                <label className="clean-label">Contact Verification</label>
                <div className="contact-pill-switch">
                  <button
                    type="button"
                    className={`contact-switch-btn ${!regData.usePhone ? 'active' : ''}`}
                    onClick={() => setRegData({ ...regData, usePhone: false })}
                  >
                    <Mail size={12} /> Email
                  </button>
                  <button
                    type="button"
                    className={`contact-switch-btn ${regData.usePhone ? 'active' : ''}`}
                    onClick={() => setRegData({ ...regData, usePhone: true })}
                  >
                    <Phone size={12} /> Mobile Phone
                  </button>
                </div>
              </div>

              <div className="input-icon-wrapper">
                {regData.usePhone ? (
                  <>
                    <Phone size={16} className="input-leading-icon" />
                    <input
                      id="reg-modal-phone"
                      type="tel"
                      className="clean-text-input"
                      placeholder="9876543210 (10 digits)"
                      maxLength={10}
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value.replace(/\D/g, '') })}
                    />
                  </>
                ) : (
                  <>
                    <Mail size={16} className="input-leading-icon" />
                    <input
                      id="reg-modal-email"
                      type="email"
                      className="clean-text-input"
                      placeholder="rahul.sharma@example.com"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Password & Confirm Password 2-Column */}
            <div className="two-col-inputs">
              <div className="clean-input-group">
                <label className="clean-label" htmlFor="reg-modal-password">Password</label>
                <div className="input-icon-wrapper">
                  <Lock size={15} className="input-leading-icon" />
                  <input
                    id="reg-modal-password"
                    type={showPassword ? 'text' : 'password'}
                    className="clean-text-input"
                    placeholder="Min. 6 chars"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="password-toggle-btn"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="clean-input-group">
                <label className="clean-label" htmlFor="reg-modal-confirm">Confirm Password</label>
                <div className="input-icon-wrapper">
                  <Lock size={15} className="input-leading-icon" />
                  <input
                    id="reg-modal-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    className="clean-text-input"
                    placeholder="Re-enter"
                    value={regData.confirmPassword}
                    onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="password-toggle-btn"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg auth-submit-btn" style={{ marginTop: '0.75rem' }}>
              <span>Create Account & Verify OTP →</span>
            </button>

            <SocialAuthSection onGoogleClick={handleGoogleMock} onOTPClick={handleMobileOTPMock} />
          </form>
        )}

        {/* ── OTP VERIFICATION STEP ───────────────────────────────────── */}
        {tab === 'otp' && (
          <div className="otp-verification-panel">
            <div className="otp-icon-circle">
              <ShieldCheck size={28} style={{ color: 'var(--accent-600)' }} />
            </div>

            <h3 className="otp-title">Enter Verification Code</h3>
            <p className="otp-instruction">
              We sent a 6-digit security OTP to <strong>{pendingUser?.contact || 'your number/email'}</strong>.
              <br />
              <span className="demo-hint-badge">💡 Demo Mock OTP: <strong>123456</strong></span>
            </p>

            {otpError && (
              <div className="auth-status-banner banner-error">
                <span>⚠️ {otpError}</span>
              </div>
            )}

            <OTPInput value={otpValue} onChange={setOtpValue} />

            <OTPTimer initialSeconds={30} onResend={handleResendOTP} />

            <div className="otp-actions-row">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setTab('register')}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleVerifyOTP}
                style={{ flex: 1 }}
              >
                Verify & Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
