'use client';
import React from 'react';
import Link from 'next/link';

const featuredArticles = [
  {
    slug: 'recursive-descent-parser',
    title: 'Why I chose Recursive Descent for my Math Parser',
    description: 'Exploring the trade-offs between Shunting-Yard algorithm and hand-written recursive descent parsers for mobile-constrained environments.',
    category: 'Performance Engineering',
    date: 'Jan 2026',
    readTime: '6 min read',
    isPopular: true,
    color: 'var(--color-primary)',
  },
  {
    slug: 'optimistic-vs-pessimistic-locking',
    title: 'Optimistic vs Pessimistic Locking in Spring Boot',
    description: 'A deep dive into handling concurrency in inventory management systems and when to use `@Version` annotations.',
    category: 'Databases',
    date: 'Jan 2026',
    readTime: '4 min read',
    isPopular: false,
    color: '#E76F00',
  }
];

export const Writing = () => {
  return (
    <section id="writing" className="py-24 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-primary mono text-2xl">05.</span> Technical Writing
          </h2>
          <Link href="/writing" className="group text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            View All Articles
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredArticles.map((post) => (
            <Link
              href={`/writing/${post.slug}`}
              key={post.slug}
              className="block p-8 rounded-2xl glass-panel border border-transparent transition-all group relative overflow-hidden"
              style={{'--hover-color': post.color}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--hover-color)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border border-transparent group-hover:border-[var(--hover-color)] rounded-2xl transition-colors duration-300"></div>

              {post.isPopular && (
                <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              )}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono" style={{color: post.color}}>{post.category}</span>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--hover-color)] transition-colors">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.description}</p>
              <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">Read Article <span className="ml-2">→</span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

