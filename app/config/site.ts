/**
 * Site Configuration
 * 
 * Centralized site metadata, author information, and service IDs.
 * Import from '@/config/site' throughout the app.
 */

// ============================================================================
// Site Metadata
// ============================================================================

/** Primary site name displayed in headers, metadata, etc. */
export const SITE_NAME = 'Shaikh Mahad';

/** Short name for PWA manifest and compact displays */
export const SITE_NAME_SHORT = "Mahad's Portfolio";

/** Full site title with descriptor */
export const SITE_TITLE = "Shaikh Mahad's Portfolio";

/** Production site URL (no trailing slash) */
export const SITE_URL = 'https://shaikhmahad.vercel.app';

/** Site description for SEO and metadata */
export const SITE_DESCRIPTION = '2nd-year UBIT student building backend systems with Java, Spring Boot, PostgreSQL. 1521 LeetCode rating, 231 problems solved.';

// ============================================================================
// Author Information
// ============================================================================

/** Author's full name */
export const AUTHOR_NAME = 'Shaikh Mahad';

/** Author's job title */
export const AUTHOR_TITLE = 'Backend Engineer';

/** Author's primary email */
export const AUTHOR_EMAIL = 'codewithmahad@gmail.com';

/** Terminal prompt username (for terminal-style UI elements) */
export const TERMINAL_USER = 'root@mahad';

// ============================================================================
// Service IDs
// ============================================================================

/** Formspree form ID for contact form */
export const FORMSPREE_ID = 'meeonyao';

// ============================================================================
// Legal & Display Text
// ============================================================================

/** Copyright year (or range) */
export const COPYRIGHT_YEAR = '2024';

/** Full copyright text */
export const COPYRIGHT_TEXT = `© ${COPYRIGHT_YEAR} ${AUTHOR_NAME}. All Rights Reserved.`;

/** Fake uptime percentage for display */
export const UPTIME_DISPLAY = '99.9%';

// ============================================================================
// Export as grouped object (alternative import style)
// ============================================================================

export const SITE_CONFIG = {
  name: SITE_NAME,
  nameShort: SITE_NAME_SHORT,
  title: SITE_TITLE,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
} as const;

export const AUTHOR_CONFIG = {
  name: AUTHOR_NAME,
  title: AUTHOR_TITLE,
  email: AUTHOR_EMAIL,
  terminalUser: TERMINAL_USER,
} as const;

export const LEGAL_CONFIG = {
  copyrightYear: COPYRIGHT_YEAR,
  copyrightText: COPYRIGHT_TEXT,
  uptimeDisplay: UPTIME_DISPLAY,
} as const;

// ============================================================================
// Social Links
// ============================================================================

export const SOCIAL_LINKS = {
  linkedin: {
    url: 'https://www.linkedin.com/in/codewithmahad',
    label: 'LinkedIn',
    display: '/in/codewithmahad',
  },
  github: {
    url: 'https://github.com/mahad2006',
    label: 'GitHub',
    display: '@mahad2006',
  },
  twitter: {
    url: 'https://twitter.com/mahad2006',
    label: 'Twitter',
    display: '@mahad2006',
  },
  leetcode: {
    url: 'https://leetcode.com/u/mahad2006/',
    label: 'LeetCode',
    display: '/u/mahad2006',
  },
  codolio: {
    url: 'https://codolio.com/profile/codewithmahad',
    label: 'Codolio',
    display: '/profile/codewithmahad',
  },
  monkeytype: {
    url: 'https://monkeytype.com/profile/CodeWithMahad1',
    label: 'MonkeyType',
    display: 'CodeWithMahad1',
  },
} as const;

// ============================================================================
// Contact Information
// ============================================================================

export const CONTACT_INFO = {
  email: AUTHOR_EMAIL,
  formspreeId: FORMSPREE_ID,
} as const;

// ============================================================================
// Organization/Education Info
// ============================================================================

export const ORGANIZATION = {
  name: 'UBIT',
  fullName: 'University of Karachi',
  url: 'https://uok.edu.pk/',
} as const;

// ============================================================================
// Profile URLs (for JSON-LD and SEO)
// ============================================================================

export const PROFILE_IMAGE_URL = `${SITE_URL}/profile.png`;

export const SAME_AS_URLS = [
  SOCIAL_LINKS.github.url,
  SOCIAL_LINKS.linkedin.url,
  SOCIAL_LINKS.twitter.url,
] as const;
