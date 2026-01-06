'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TerminalBackButton } from '@/components/ui/TerminalBackButton';
import CommandPalette from '@/components/ui/CommandPalette';
import { useSystem } from '@/hooks/useSystem';
import { ROUTES } from '@/config/routes';
import { 
  Z_INDEX_CLASSES, 
  HEADER_HEIGHT_CLASSES, 
  MAX_WIDTH_CLASSES,
  CONTAINER_PADDING_CLASSES,
  SECTION_PADDING_CLASSES,
  MARGIN_BOTTOM_CLASSES,
  LAYOUT 
} from '@/styles/tokens';

/**
 * PageShell - Standardized page layout wrapper for sub-pages
 * 
 * Provides a fixed header with:
 * - Left: TerminalBackButton for navigation
 * - Center: Page tag/label (e.g., "SYSTEM_CONFIGURATION")
 * - Right: Search, Mute, Settings icons (optional)
 * 
 * Uses design tokens from @/styles/tokens for consistent spacing
 * 
 * @param {string} title - Main page heading
 * @param {string} description - Optional description text below title
 * @param {string} headerTag - Tag displayed in the fixed header (e.g., "UBIT_HUB")
 * @param {boolean} hideActions - Hide the action icons (search, mute, settings)
 * @param {ReactNode} children - Page content
 */
export const PageShell = ({ 
  title, 
  description, 
  headerTag = 'SYSTEM',
  hideActions = false,
  children 
}) => {
  const { playClick, isMuted, setIsMuted, soundEnabled } = useSystem();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(open => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen text-gray-300 font-mono selection:bg-primary selection:text-black bg-page">
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      
      {/* Fixed Sub-page Header */}
      <nav className={`fixed top-0 left-0 w-full ${Z_INDEX_CLASSES.sticky} bg-(--bg-page)/80 backdrop-blur-md border-b border-(--border-subtle)`}>
        <div className={`flex items-center justify-between ${CONTAINER_PADDING_CLASSES.x} ${HEADER_HEIGHT_CLASSES.subpage} ${MAX_WIDTH_CLASSES.page} mx-auto`}>
          {/* Left: Back Button */}
          <div className="shrink-0">
            <TerminalBackButton />
          </div>
          
          {/* Center: Page Tag */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[9px] text-primary tracking-[0.3em] uppercase font-bold">{headerTag}</span>
          </div>

          {/* Right: Action Icons (hidden on settings page) */}
          {!hideActions && (
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setPaletteOpen(true)}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Search (Cmd+K)"
                aria-label="Open Command Palette"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
                aria-label={soundEnabled ? "Mute Sound" : "Unmute Sound"}
              >
                {soundEnabled ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM16 14l4-4m0 4l-4-4" />
                  </svg>
                )}
              </button>
              <Link
                href={ROUTES.SETTINGS}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors group"
                title="Settings"
                aria-label="Open Settings"
              >
                <svg className="group-hover:rotate-90 transition-transform duration-500" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content - with padding for fixed header */}
      <main className={`relative z-10 ${MAX_WIDTH_CLASSES.page} mx-auto ${CONTAINER_PADDING_CLASSES.x} ${SECTION_PADDING_CLASSES.top} ${SECTION_PADDING_CLASSES.bottom}`}>
        {/* Title/Description Zone */}
        {(title || description) && (
          <header className={MARGIN_BOTTOM_CLASSES.xl}>
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

