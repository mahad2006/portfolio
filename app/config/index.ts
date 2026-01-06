/**
 * Config Barrel Export
 * 
 * Re-exports all configuration modules for convenient importing.
 * 
 * Usage:
 *   import { SITE_NAME, ROUTES, ACCENT_COLORS } from '@/config';
 */

// Site configuration
export {
  SITE_NAME,
  SITE_NAME_SHORT,
  SITE_TITLE,
  SITE_URL,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_TITLE,
  AUTHOR_EMAIL,
  TERMINAL_USER,
  FORMSPREE_ID,
  COPYRIGHT_YEAR,
  COPYRIGHT_TEXT,
  UPTIME_DISPLAY,
  SITE_CONFIG,
  AUTHOR_CONFIG,
  LEGAL_CONFIG,
  SOCIAL_LINKS,
  CONTACT_INFO,
  ORGANIZATION,
  PROFILE_IMAGE_URL,
  SAME_AS_URLS,
} from './site';

// Route configuration
export {
  ROUTES,
  SECTIONS,
  STATIC_ROUTES,
  NAV_LINKS,
  FOOTER_LINKS,
  projectRoute,
  writingRoute,
} from './routes';
export type { RouteKey, SectionKey, Route, Section } from './routes';

// Theme configuration
export {
  BASE_COLORS,
  BRAND_COLORS,
  ACCENT_COLORS,
  DEFAULT_ACCENT,
  SOCIAL_BRAND_COLORS,
  Z_INDEX,
  DURATIONS,
} from './theme';
export type {
  AccentColor,
  AccentColorId,
  AccentColorValue,
  SocialPlatform,
} from './theme';

// SEO configuration
export {
  DEFAULT_SEO,
  DEFAULT_OG_IMAGE,
  PAGE_SEO,
  getPageSEO,
  getCanonicalUrl,
  getProjectSEO,
  getWritingSEO,
  getSitemapPages,
  validateSEOCompleteness,
} from './seo';
export type { PageSEOConfig, SEOMetadata } from './seo';

// Terminal commands
export { HERO_COMMANDS } from './commands';
