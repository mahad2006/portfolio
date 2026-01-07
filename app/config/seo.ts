/**
 * SEO Configuration
 * 
 * Centralized SEO metadata, Open Graph defaults, and page-specific overrides.
 * This module provides the single source of truth for all SEO-related configuration.
 * 
 * Usage:
 *   import { DEFAULT_SEO, PAGE_SEO, getPageSEO } from '@/config/seo';
 */

import { 
  SITE_NAME, 
  SITE_URL, 
  SITE_DESCRIPTION, 
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  SOCIAL_LINKS,
  PROFILE_IMAGE_URL,
} from './site';

// ============================================================================
// Type Definitions
// ============================================================================

export interface PageSEOConfig {
  title: string;
  description: string;
  path: string;
  priority?: number;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  noIndex?: boolean;
  openGraph?: {
    type?: 'website' | 'article' | 'profile';
    images?: Array<{ url: string; width: number; height: number; alt: string }>;
  };
}

export interface SEOMetadata {
  title: string;
  description: string;
  openGraph?: Record<string, unknown>;
  twitter?: Record<string, unknown>;
  robots?: Record<string, unknown>;
  alternates?: Record<string, unknown>;
}

// ============================================================================
// Default SEO Configuration
// ============================================================================

/** Default Open Graph image configuration */
export const DEFAULT_OG_IMAGE = {
  url: PROFILE_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: `${AUTHOR_NAME} - Backend Engineer`,
};

/** Default SEO metadata applied to all pages via layout.js */
export const DEFAULT_SEO = {
  metadataBase: SITE_URL,
  
  title: {
    default: `${AUTHOR_NAME} | Backend Engineer`,
    template: `%s | ${AUTHOR_NAME}`,
  },
  
  description: SITE_DESCRIPTION,
  
  keywords: [
    AUTHOR_NAME,
    'Backend Engineer',
    'Systems Engineer', 
    'Java Developer',
    'Spring Boot',
    'Next.js Portfolio',
    'Distributed Systems',
    'Performance Engineering',
    'Karachi Software Engineer',
    'UBIT',
  ],
  
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${AUTHOR_NAME} | Backend Engineer`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: SOCIAL_LINKS.twitter.display,
    creator: SOCIAL_LINKS.twitter.display,
    title: `${AUTHOR_NAME} | Backend Systems Engineer`,
    description: SITE_DESCRIPTION,
    images: [PROFILE_IMAGE_URL],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/rss.xml`,
    },
  },
} as const;

// ============================================================================
// Page-Specific SEO Configuration
// ============================================================================

/**
 * SEO configuration for each page in the site.
 * Used by both generatePageMetadata() and sitemap.ts
 */
export const PAGE_SEO: Record<string, PageSEOConfig> = {
  // Homepage
  home: {
    title: `${AUTHOR_NAME} | Backend Systems Engineer`,
    description: 'Backend Systems Engineer specializing in high-performance Java/Spring Boot architectures, distributed systems, and low-latency engineering.',
    path: '/',
    priority: 1.0,
    changeFrequency: 'daily',
  },
  
  // Community page
  community: {
    title: 'UBIT Community',
    description: 'A structured peer-learning ecosystem for UBIT students to learn, collaborate, and grow together.',
    path: '/community',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  
  // Stats page
  stats: {
    title: 'Career Analytics',
    description: 'Real-time performance diagnostics, competitive programming stats, and development activity.',
    path: '/stats',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  
  // Uses page
  uses: {
    title: 'Uses',
    description: 'A list of the hardware, software, and tools that power my development workflow.',
    path: '/uses',
    priority: 0.6,
    changeFrequency: 'yearly',
  },
  
  // Writing archive
  writing: {
    title: 'Writing & Articles',
    description: 'A collection of articles on backend engineering, system design, and performance.',
    path: '/writing',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  
  // Projects archive
  projects: {
    title: 'Projects',
    description: 'A showcase of backend systems, distributed architectures, and engineering projects.',
    path: '/projects',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  
  // Settings page (noIndex - user preference page)
  settings: {
    title: 'Settings',
    description: 'Configure your preferences for the portfolio experience.',
    path: '/settings',
    priority: 0.3,
    changeFrequency: 'yearly',
    noIndex: true,
  },
} as const;

// ============================================================================
// SEO Utility Functions
// ============================================================================

/**
 * Get SEO configuration for a specific page
 * @param pageKey - Key from PAGE_SEO
 * @returns PageSEOConfig or undefined
 */
export const getPageSEO = (pageKey: string): PageSEOConfig | undefined => {
  return PAGE_SEO[pageKey];
};

/**
 * Generate canonical URL for a path
 * @param path - Page path (e.g., '/stats')
 * @returns Full canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

/**
 * Generate project page SEO config
 * @param project - Project data object
 * @returns PageSEOConfig for the project
 */
export const getProjectSEO = (project: { 
  slug: string; 
  title: string; 
  tagline: string;
  image?: string;
}): PageSEOConfig => ({
  title: `Case Study: ${project.title}`,
  description: project.tagline,
  path: `/projects/${project.slug}`,
  priority: 0.9,
  changeFrequency: 'yearly',
  openGraph: project.image ? {
    type: 'article',
    images: [{
      url: project.image,
      width: 1200,
      height: 630,
      alt: project.title,
    }],
  } : undefined,
});

/**
 * Generate writing post SEO config
 * @param post - Blog post data object
 * @returns PageSEOConfig for the post
 */
export const getWritingSEO = (post: {
  slug: string;
  title: string;
  description: string;
  image?: string;
}): PageSEOConfig => ({
  title: post.title,
  description: post.description,
  path: `/writing/${post.slug}`,
  priority: 0.8,
  changeFrequency: 'weekly',
  openGraph: {
    type: 'article',
    ...(post.image && {
      images: [{
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
    }),
  },
});

// ============================================================================
// Sitemap Helpers
// ============================================================================

/**
 * Get all static pages for sitemap generation
 * Filters out noIndex pages
 */
export const getSitemapPages = (): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: PageSEOConfig['changeFrequency'];
  priority: number;
}> => {
  return Object.values(PAGE_SEO)
    .filter(page => !page.noIndex)
    .map(page => ({
      url: getCanonicalUrl(page.path),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency || 'monthly',
      priority: page.priority || 0.5,
    }));
};

// ============================================================================
// Validation
// ============================================================================

/**
 * Validate that all routes have SEO configuration
 * Run during build/development to catch missing SEO
 */
export const validateSEOCompleteness = (routes: string[]): string[] => {
  const configuredPaths = Object.values(PAGE_SEO).map(p => p.path);
  return routes.filter(route => !configuredPaths.includes(route));
};
