import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from './AuthModal';
import { Button } from '../common/Button';
import { Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, profile, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ opacity: 0.7 }}>Restoring secure session...</p>
      </div>
    );
  }

  // If user or local profile exists, grant access
  if (user || profile) {
    return <>{children}</>;
  }

  return (
    <div style={{ padding: '6rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-cream-card)',
            color: 'var(--color-deep-cherry)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            border: '1px solid var(--color-cocoa-light)',
          }}
        >
          <Lock size={28} />
        </div>
        <h2 style={{ marginBottom: '0.75rem' }}>Sign In Required</h2>
        <p style={{ opacity: 0.85, marginBottom: '2rem' }}>
          Please sign in or create a NIX account to access your customer dashboard and orders.
        </p>

        <Button variant="primary" size="lg" onClick={() => setAuthOpen(true)}>
          SIGN IN / CREATE ACCOUNT
        </Button>

        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </div>
  );
};
