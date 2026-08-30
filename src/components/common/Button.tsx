import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-deep-cherry)',
          border: '1px solid var(--color-deep-cherry)',
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-soft-cocoa)',
          padding: 0,
          border: 'none',
        };
      case 'primary':
      default:
        return {
          backgroundColor: 'var(--color-deep-cherry)',
          color: 'var(--color-warm-cream)',
          border: 'none',
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    if (variant === 'text') return {};
    switch (size) {
      case 'sm':
        return { padding: '0.5rem 1rem', fontSize: '0.85rem' };
      case 'lg':
        return { padding: '1rem 2rem', fontSize: '1.1rem' };
      case 'md':
      default:
        return { padding: '0.75rem 1.5rem', fontSize: '0.95rem' };
    }
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    letterSpacing: '0.03em',
    transition: 'all 0.2s ease',
    width: fullWidth ? '100%' : 'auto',
    cursor: 'pointer',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button
      style={baseStyle}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = 'var(--color-cherry-red)';
        } else if (variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'var(--color-blush-soft)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = 'var(--color-deep-cherry)';
        } else if (variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
