import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from './AuthModal';
import { Button } from '../common/Button';
import { Lock, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  buttonText?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  title = 'Sign In Required',
  subtitle = 'Please sign in or create a NIX account to access your customer dashboard and orders.',
  badge = 'AUTHENTICATION REQUIRED',
  buttonText = 'SIGN IN / CREATE ACCOUNT',
}) => {
  const { user, profile, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '400px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid var(--color-cocoa-light)',
              borderTopColor: 'var(--color-deep-cherry)',
              margin: '0 auto 1.5rem auto',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>Restoring secure session...</p>
        </div>
      </div>
    );
  }

  // If user or local profile exists, grant access
  if (user || profile) {
    return <>{children}</>;
  }

  return (
    <div style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: 'center',
            border: '1px solid var(--color-cocoa-light)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-blush-soft)',
              color: 'var(--color-deep-cherry)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '1px solid var(--color-blush-border)',
            }}
          >
            <Lock size={30} />
          </div>

          <span className="eyebrow">{badge}</span>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--color-soft-cocoa)' }}>
            {title}
          </h2>
          <p style={{ opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            {subtitle}
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              border: '1px solid var(--color-cocoa-light)',
              marginBottom: '2rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={18} color="var(--color-deep-cherry)" style={{ flexShrink: 0 }} />
              <span><strong>100% Discreet Packaging</strong> delivered directly to your doorstep</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag size={18} color="var(--color-deep-cherry)" style={{ flexShrink: 0 }} />
              <span><strong>Live Order Tracking</strong> & SMS / Email delivery updates</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Button variant="primary" size="lg" fullWidth onClick={() => setAuthOpen(true)}>
              {buttonText} <ArrowRight size={16} style={{ marginLeft: '0.4rem' }} />
            </Button>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <Button variant="text" size="sm" fullWidth>
                ← Return to Bag
              </Button>
            </Link>
          </div>

          <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </div>
      </div>
    </div>
  );
};
