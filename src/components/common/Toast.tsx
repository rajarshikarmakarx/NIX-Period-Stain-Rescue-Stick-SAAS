import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  if (!toast.visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: 'var(--color-soft-cocoa)',
        color: 'var(--color-warm-cream)',
        padding: '0.85rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        zIndex: 2000,
        fontSize: '0.95rem',
        fontWeight: 500,
        animation: 'slideUp 0.3s ease-out forwards',
        border: '1px solid rgba(248, 240, 227, 0.15)',
      }}
    >
      <CheckCircle2 size={18} color="var(--color-dusty-blush)" />
      <span>{toast.message}</span>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
