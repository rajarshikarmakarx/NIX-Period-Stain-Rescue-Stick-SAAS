import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  textColor?: string;
  style?: React.CSSProperties;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  textColor,
  style,
}) => {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? '700px' : '100%',
        margin: align === 'center' ? '0 auto 3rem auto' : '0 0 2.5rem 0',
        ...style,
      }}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 style={{ color: textColor || 'var(--color-soft-cocoa)', marginBottom: subtitle ? '0.75rem' : 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: textColor || 'var(--color-soft-cocoa)', opacity: 0.85, fontSize: '1.1rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
