'use client';
import React from 'react';
import Link from 'next/link';
import { ROUTES, writingRoute } from '@/config/routes';
import { allPosts } from '@/data/writing';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

// Get featured articles (first 2 with isPopular or just first 2)
const featuredArticles = allPosts.slice(0, 2).map((post, idx) => ({
  ...post,
  color: idx === 0 ? 'var(--color-primary)' : '#E76F00',
}));

export const Writing = () => {
  return (
    <section id="writing" className="py-24 relative border-t border-(--border-subtle)">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-primary mono text-2xl">06.</span> Technical Writing
            </h2>
            <Link href={ROUTES.WRITING} className="group text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              View All Articles
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
          {featuredArticles.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={writingRoute(post.slug)}
                className="block p-8 rounded-2xl card-base border border-transparent transition-all group relative overflow-hidden h-full"
                style={{'--hover-color': post.color} as React.CSSProperties}
              >
                <div className="absolute inset-0 bg-linear-to-br from-(--hover-color)/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-transparent group-hover:border-(--hover-color) rounded-2xl transition-colors duration-300"></div>

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
                <h3 className="text-xl font-bold mb-3 group-hover:text-(--hover-color) transition-colors" style={{ color: 'var(--text-main)' }}>{post.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.description}</p>
                <div className="flex items-center text-sm font-bold group-hover:translate-x-2 transition-transform" style={{ color: 'var(--text-main)' }}>Read Article <span className="ml-2">→</span></div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

