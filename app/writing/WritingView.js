'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

const allPosts = [
  {
    slug: 'recursive-descent-parser',
    title: 'Why I chose Recursive Descent for my Math Parser',
    description: 'Exploring the trade-offs between Shunting-Yard algorithm and hand-written recursive descent parsers for mobile-constrained environments.',
    category: 'Performance',
    date: 'Jan 2026',
    readTime: '6 min read',
    isFeatured: true,
  },
  {
    slug: 'optimistic-vs-pessimistic-locking',
    title: 'Optimistic vs Pessimistic Locking in Spring Boot',
    description: 'A deep dive into handling concurrency in inventory management systems and when to use `@Version` annotations.',
    category: 'Databases',
    date: 'Jan 2026',
    readTime: '4 min read',
    isFeatured: true,
  },
  // Add more posts here
];

const PostCard = ({ post }) => (
  <Link
    href={`/writing/${post.slug}`}
    className="block p-8 rounded-2xl card-base hover:border-(--border-highlight) transition-all group relative overflow-hidden animate-fade-up"
  >
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-mono text-primary">{post.category}</span>
      <div className="flex gap-4 text-xs text-gray-500">
        <span>{post.readTime}</span>
        <span>{post.date}</span>
      </div>
    </div>
    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
    <p className="text-gray-400 leading-relaxed mb-6">{post.description}</p>
    <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">Read Article <span className="ml-2">→</span></div>
  </Link>
);

const WritingView = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Featured', ...new Set(allPosts.map(p => p.category))];

  const filteredPosts = allPosts.filter(post => {
    if (filter === 'All') return true;
    if (filter === 'Featured') return post.isFeatured;
    return post.category === filter;
  });

  return (
    <PageShell
      title={<>Technical<span className="text-primary">_</span>Writing</>}
      description="A collection of articles on backend engineering, system design, and performance."
      headerTag="TECHNICAL_DOCS"
    >

        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-mono border transition-all duration-300 ${
                filter === category
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-primary/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <div key={post.slug} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-up opacity-0" >
              <PostCard post={post} />
            </div>
          ))}
        </div>
    </PageShell>
  );
};

export default WritingView;
