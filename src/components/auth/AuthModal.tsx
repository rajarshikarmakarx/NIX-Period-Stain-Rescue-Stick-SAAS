import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, Lock, User as UserIcon, AlertCircle, MailCheck, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'signin' }) => {
  const { signUp, signInWithEmail, signInWithPhone } = useAuth();
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [signedUpSuccess, setSignedUpSuccess] = useState<boolean>(false);
  const [signedUpEmail, setSignedUpEmail] = useState<string>('');

  const resetForm = () => {
    setErrorMsg(null);
    setPassword('');
    setConfirmPassword('');
    setSignedUpSuccess(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    let res;
    if (loginMethod === 'email') {
      if (!email) {
        setErrorMsg('Please enter your email ID');
        setLoading(false);
        return;
      }
      res = await signInWithEmail(email, password);
    } else {
      if (!phone) {
        setErrorMsg('Please enter your phone number');
        setLoading(false);
        return;
      }
      res = await signInWithPhone(phone, password);
    }

    setLoading(false);

    if (res.success) {
      showToast('Welcome back to NIX & CO.');
      onClose();
      resetForm();
    } else {
      setErrorMsg(res.error || 'Failed to sign in. Please check your credentials or confirm your email.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName || !email || !phone || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await signUp(fullName, email, phone, password);
    setLoading(false);

    if (res.success) {
      setSignedUpEmail(email);
      setSignedUpSuccess(true);
      showToast('Confirmation email sent!');
    } else {
      setErrorMsg(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ padding: '0.5rem 0' }}>
        {/* Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src="/images/logo.png"
            alt="NIX & CO."
            style={{ height: '30px', width: 'auto', margin: '0 auto', display: 'block' }}
          />
        </div>

        {/* Tab Selector: Sign In vs Sign Up */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.25rem',
            border: '1px solid var(--color-cocoa-light)',
            marginBottom: '1.75rem',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              resetForm();
            }}
            style={{
              flex: 1,
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 600,
              fontSize: '0.9rem',
              backgroundColor: activeTab === 'signin' ? 'var(--color-deep-cherry)' : 'transparent',
              color: activeTab === 'signin' ? 'var(--color-warm-cream)' : 'var(--color-soft-cocoa)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              resetForm();
            }}
            style={{
              flex: 1,
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 600,
              fontSize: '0.9rem',
              backgroundColor: activeTab === 'signup' ? 'var(--color-deep-cherry)' : 'transparent',
              color: activeTab === 'signup' ? 'var(--color-warm-cream)' : 'var(--color-soft-cocoa)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#FDF2F2',
              border: '1px solid #F8B4B4',
              color: '#9B1C1C',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ------------------------------------------------------------------
            SIGN IN FORM
            ------------------------------------------------------------------ */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Identifier Method Toggle: Email vs Phone */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>
                LOG IN USING
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: loginMethod === 'email' ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                    backgroundColor: loginMethod === 'email' ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                    fontWeight: loginMethod === 'email' ? 600 : 400,
                    color: 'var(--color-soft-cocoa)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  <Mail size={15} /> Email ID
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: loginMethod === 'phone' ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                    backgroundColor: loginMethod === 'phone' ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                    fontWeight: loginMethod === 'phone' ? 600 : 400,
                    color: 'var(--color-soft-cocoa)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  <Phone size={15} /> Phone Number
                </button>
              </div>
            </div>

            {loginMethod === 'email' ? (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem 0.7rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-warm-cream)',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                </div>
              </div>
            ) : (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem 0.7rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-warm-cream)',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                  <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem 0.7rem 2.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-cocoa-light)',
                    backgroundColor: 'var(--color-warm-cream)',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN TO NIX'}
            </Button>
          </form>
        )}

        {/* ------------------------------------------------------------------
            SIGN UP FORM & MAILBOX CONFIRMATION VIEW
            ------------------------------------------------------------------ */}
        {activeTab === 'signup' && (
          signedUpSuccess ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blush-soft)',
                  color: 'var(--color-deep-cherry)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  border: '1px solid var(--color-blush-border)',
                }}
              >
                <MailCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Check Your Mailbox</h3>
              <p style={{ opacity: 0.85, fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                We sent a confirmation email to <strong>{signedUpEmail}</strong>. Please click the link in the email to activate your account.
              </p>
              <p style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '1.75rem' }}>
                Once verified, return here to log in with your credentials.
              </p>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  setActiveTab('signin');
                  setSignedUpSuccess(false);
                }}
              >
                GO TO SIGN IN <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Full Name <span style={{ color: 'var(--color-cherry-red)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Ananya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-warm-cream)',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                  <UserIcon size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Email Address <span style={{ color: 'var(--color-cherry-red)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-warm-cream)',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Phone Number <span style={{ color: 'var(--color-cherry-red)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-warm-cream)',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                  <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Password <span style={{ color: 'var(--color-cherry-red)' }}>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-warm-cream)',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Confirm Password <span style={{ color: 'var(--color-cherry-red)' }}>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-warm-cream)',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                {loading ? 'CREATING ACCOUNT...' : 'CREATE NIX ACCOUNT'}
              </Button>
            </form>
          )
        )}
      </div>
    </Modal>
  );
};
