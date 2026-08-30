import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-cocoa-light)',
        padding: '1.25rem 0',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--color-soft-cocoa)',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span>{title}</span>
        <ChevronDown
          size={20}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            color: 'var(--color-deep-cherry)',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: '0.75rem',
            color: 'var(--color-soft-cocoa)',
            opacity: 0.9,
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export const Accordion: React.FC<{ items: Array<{ title: string; content: string }> }> = ({ items }) => {
  return (
    <div>
      {items.map((item, idx) => (
        <AccordionItem key={idx} title={item.title} content={item.content} defaultOpen={idx === 0} />
      ))}
    </div>
  );
};
