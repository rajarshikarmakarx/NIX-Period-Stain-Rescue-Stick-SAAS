import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ArticleCard } from '../components/content/ArticleCard';
import { api } from '../api/client';
import type { Article } from '../api/types';

export const NotesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    api
      .getNotes()
      .then(setArticles)
      .catch(() => {
        // Local fallback articles
        setArticles([
          {
            id: 'note-1',
            title: 'What to Do When You Get a Period Stain in Public',
            excerpt: 'It happens to almost everyone. Here’s how to handle it calmly and effectively.',
            image: '',
            category: 'Tips',
            read_time: '3 min',
            featured: true,
          },
          {
            id: 'note-2',
            title: 'Why Fresh Stains Are Easier to Treat',
            excerpt: 'The science behind why acting quickly makes all the difference for fabric fibers.',
            image: '',
            category: 'Science',
            read_time: '4 min',
          },
          {
            id: 'note-3',
            title: 'What to Keep in Your Period Emergency Pouch',
            excerpt: 'A simple checklist for being prepared wherever your day takes you.',
            image: '',
            category: 'Essentials',
            read_time: '2 min',
          },
          {
            id: 'note-4',
            title: 'Period Essentials for Your College Bag',
            excerpt: 'Campus life doesn’t stop for periods. Here’s what smart students carry.',
            image: '',
            category: 'College',
            read_time: '3 min',
          },
        ]);
      });
  }, []);

  const featured = articles.find((a) => a.featured) || articles[0];
  const regular = articles.filter((a) => a.id !== featured?.id);

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        <SectionHeading
          eyebrow="EDITORIAL MAGAZINE"
          title="NIX Notes"
          subtitle="Small things worth knowing about periods, stains, and life on the go."
        />

        {/* Featured Article */}
        {featured && (
          <div style={{ marginBottom: '4rem' }}>
            <ArticleCard article={featured} featured />
          </div>
        )}

        {/* Regular Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {regular.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};
