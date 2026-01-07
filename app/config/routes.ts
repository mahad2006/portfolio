/**
 * Route Configuration
 * 
 * Centralized route definitions for internal navigation.
 * Import from '@/config/routes' throughout the app.
 * 
 * Usage:
 *   import { ROUTES } from '@/config/routes';
 *   <Link href={ROUTES.SETTINGS}>Settings</Link>
 */

// ============================================================================
// Internal Routes
// ============================================================================

export const ROUTES = {
  /** Homepage */
  HOME: '/',
  
  /** Community/Discord page */
  COMMUNITY: '/community',
  
  /** Projects archive */
  PROJECTS: '/projects',
  
  /** User settings/preferences */
  SETTINGS: '/settings',
  
  /** Analytics/stats dashboard */
  STATS: '/stats',
  
  /** Uses/setup page */
  USES: '/uses',
  
  /** Blog/writing archive */
  WRITING: '/writing',

  /** More page - Stack, Philosophy, Writing, etc. */
  MORE: '/more',
} as const;

// ============================================================================
// Dynamic Route Builders
// ============================================================================

/**
 * Generate project detail route
 * @param slug - Project slug
 * @returns Full route path
 */
export const projectRoute = (slug: string): string => `/projects/${slug}`;

/**
 * Generate writing/blog post route
 * @param slug - Post slug
 * @returns Full route path
 */
export const writingRoute = (slug: string): string => `/writing/${slug}`;

// ============================================================================
// Homepage Section IDs (for scroll navigation)
// ============================================================================

export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  PROJECTS: 'projects',
  STACK: 'stack',
  EXPERIENCE: 'experience',
  WRITING: 'writing',
  CONNECT: 'connect',
} as const;

// ============================================================================
// External/Static Routes
// ============================================================================

export const STATIC_ROUTES = {
  /** Resume PDF */
  RESUME: '/resume.pdf',
  
  /** Robots.txt (used for latency check) */
  ROBOTS: '/robots.txt',
  
  /** RSS feed */
  RSS: '/rss.xml',
  
  /** Sitemap */
  SITEMAP: '/sitemap.xml',
} as const;

// ============================================================================
// Navigation Links (for Navbar)
// ============================================================================

export const NAV_LINKS = [
  { label: 'About', id: SECTIONS.ABOUT },
  { label: 'Projects', id: SECTIONS.PROJECTS },
  { label: 'Stack', id: SECTIONS.STACK },
  { label: 'Writing', id: SECTIONS.WRITING },
] as const;

// ============================================================================
// Footer Links
// ============================================================================

export const FOOTER_LINKS = [
  { label: 'Stats', href: ROUTES.STATS },
  { label: 'Uses', href: ROUTES.USES },
] as const;

// ============================================================================
// Type Exports
// ============================================================================

export type RouteKey = keyof typeof ROUTES;
export type SectionKey = keyof typeof SECTIONS;
export type Route = (typeof ROUTES)[RouteKey];
export type Section = (typeof SECTIONS)[SectionKey];
