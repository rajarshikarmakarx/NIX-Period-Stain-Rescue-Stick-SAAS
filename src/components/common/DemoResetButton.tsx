import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoResetButton: React.FC = () => {
  const { resetDemoState } = useApp();
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (confirm('Reset prototype demo state back to default values?')) {
      setLoading(true);
      await resetDemoState();
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        backgroundColor: 'var(--color-deep-cherry)',
        color: 'var(--color-warm-cream)',
        padding: '0.6rem 1rem',
        borderRadius: 'var(--radius-pill)',
        fontSize: '0.8rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        boxShadow: 'var(--shadow-subtle)',
        zIndex: 1500,
        opacity: 0.9,
        border: '1px solid var(--color-dusty-blush)',
        cursor: 'pointer',
      }}
      title="Reset presentation demo state"
    >
      <RotateCcw size={14} className={loading ? 'spin' : ''} />
      <span>{loading ? 'Resetting...' : 'Reset Demo'}</span>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
};
