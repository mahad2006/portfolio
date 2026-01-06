'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useSystem } from '@/hooks/useSystem';
import { ROUTES } from '@/config/routes';

// Dynamic imports for non-critical overlays to reduce initial bundle
const MatrixRain = dynamic(() => import('@/components/ui/MatrixRain').then(mod => mod.MatrixRain), { ssr: false });
const BootScreen = dynamic(() => import('@/components/system/BootScreen').then(mod => mod.BootScreen), { ssr: false });
const RequestLogger = dynamic(() => import('@/components/system/RequestLogger').then(mod => mod.RequestLogger), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'), { ssr: false });

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
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-black focus:rounded-md focus:font-bold focus:outline-none"
      >
        Skip to main content
      </a>
      
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
        id="main-content"
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

