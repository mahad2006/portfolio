'use client';

import { usePathname } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BootScreen, MatrixRain, RequestLogger, CommandPalette, useSystem } from '@/components';
import { ROUTES } from '@/config/routes';

/**
 * ClientLayout - Global client-side layout wrapper
 * 
 * Responsibilities:
 * - Global overlays (BootScreen, MatrixRain, RequestLogger)
 * - Command Palette (Ctrl+K)
 * - Page transition animations
 * - Base page styling (min-h-screen, selection colors, font)
 * 
 * Navigation Strategy:
 * - Homepage (/) : Uses Navbar (included in page.js) + Footer
 * - Sub-pages    : Use PageTemplate with back button header
 */
export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { isCommandPaletteOpen, toggleCommandPalette } = useSystem();
  const isHome = pathname === ROUTES.HOME;

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Global Overlays - Always present, outside any transforms */}
      <MatrixRain />
      <BootScreen />
      <RequestLogger />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={toggleCommandPalette}
        onNavigate={handleNavigate}
      />
      
      {/* Page Container - no transform to preserve fixed positioning */}
      <div 
        className="min-h-screen text-gray-300 font-mono selection:bg-primary selection:text-black bg-page antialiased"
        key={pathname}
      >
        {children}
      </div>
      
      {/* Analytics - Always present */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

