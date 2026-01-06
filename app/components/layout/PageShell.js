'use client';
import React from 'react';
import { TerminalBackButton } from '@/components/ui/TerminalBackButton';

/**
 * PageShell - Standardized page layout wrapper
 * 
 * Provides consistent spacing, typography, and back button placement
 * across all sub-pages in the portfolio.
 * 
 * @param {string} title - Main page heading
 * @param {string} description - Optional description text below title
 * @param {ReactNode} children - Page content
 * @param {boolean} backButton - Show TerminalBackButton (default: true)
 */
export const PageShell = ({ 
  title, 
  description, 
  children, 
  backButton = true 
}) => {
  return (
    <div className="min-h-screen text-gray-300 font-mono selection:bg-primary selection:text-black" style={{ backgroundColor: 'var(--bg-page)' }}>
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Back Button */}
        {backButton && (
          <div className="mb-8">
            <TerminalBackButton />
          </div>
        )}

        {/* Header Zone */}
        {(title || description) && (
          <header className="mb-12">
            {title && (
              <h1 className="text-heading-1 mb-4">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </header>
        )}

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

