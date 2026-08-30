import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Article } from '../../api/types';
import { trackEvent } from '../../hooks/useAnalytics';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const handleClick = () => {
    trackEvent('view_note', { article_id: article.id, title: article.title });
  };

  return (
    <article
      onClick={handleClick}
      style={{
        backgroundColor: 'var(--color-cream-card)',
        borderRadius: 'var(--radius-xl)',
        padding: featured ? '2.5rem' : '1.5rem',
        border: '1px solid var(--color-cocoa-light)',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="badge badge-blush">{article.category}</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={13} /> {article.read_time} read
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: featured ? '2rem' : '1.35rem',
            lineHeight: 1.3,
            marginBottom: '0.75rem',
          }}
        >
          {article.title}
        </h3>

        <p style={{ fontSize: featured ? '1.05rem' : '0.9rem', opacity: 0.85, marginBottom: '1.5rem' }}>
          {article.excerpt}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: 'var(--color-deep-cherry)', fontSize: '0.9rem' }}>
        <span>Read Editorial</span>
        <ArrowUpRight size={16} />
      </div>
    </article>
  );
};
