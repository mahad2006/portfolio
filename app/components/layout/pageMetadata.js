/**
 * Page Metadata Utilities
 * 
 * Server-side utilities for generating consistent page metadata.
 * Uses centralized SEO config for defaults and consistency.
 * 
 * Import from '@/components/layout/pageMetadata' in page.js files.
 */

import { 
  AUTHOR_NAME, 
  SITE_DESCRIPTION, 
  SITE_URL,
  SOCIAL_LINKS,
} from '@/config/site';
import { 
  DEFAULT_OG_IMAGE, 
  PAGE_SEO, 
  getCanonicalUrl,
} from '@/config/seo';

/**
 * Generate standard metadata for a page
 * 
 * Usage in page.js:
 * ```
 * import { generatePageMetadata } from '@/components/layout/pageMetadata';
 * 
 * // Option 1: Use page key from SEO config
 * export const metadata = generatePageMetadata('stats');
 * 
 * // Option 2: Custom override
 * export const metadata = generatePageMetadata({
 *   title: 'Settings',
 *   description: 'Configure your preferences',
 *   path: '/settings',
 * });
 * ```
 * 
 * @param {string|Object} configOrKey - Page key from PAGE_SEO or custom config object
 * @param {string} configOrKey.title - Page title (templated as "Title | Author Name")
 * @param {string} configOrKey.description - Page description for SEO
 * @param {string} configOrKey.path - Path for canonical URL
 * @param {boolean} configOrKey.noIndex - Whether to exclude from search engines
 * @param {Object} configOrKey.openGraph - Open Graph overrides
 * @returns {Object} Next.js metadata object
 */
export const generatePageMetadata = (configOrKey) => {
  // If string, look up from PAGE_SEO config
  const config = typeof configOrKey === 'string' 
    ? PAGE_SEO[configOrKey] 
    : configOrKey;
  
  if (!config) {
    console.warn(`[SEO] No config found for key: ${configOrKey}`);
    return {
      title: `${AUTHOR_NAME} | Backend Systems Engineer`,
      description: SITE_DESCRIPTION,
    };
  }

  const { 
    title, 
    description, 
    path = '',
    noIndex = false,
    openGraph: ogOverrides,
  } = config;
  
  const canonicalUrl = path ? getCanonicalUrl(path) : undefined;
  
  return {
    title,
    description: description || SITE_DESCRIPTION,
    
    // Canonical URL
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    
    // Open Graph
    openGraph: {
      title,
      description: description || SITE_DESCRIPTION,
      url: canonicalUrl || SITE_URL,
      type: ogOverrides?.type || 'website',
      images: ogOverrides?.images || [DEFAULT_OG_IMAGE],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || SITE_DESCRIPTION,
      creator: SOCIAL_LINKS.twitter.display,
    },
    
    // Robots
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};

/**
 * Generate metadata for a project page
 * 
 * @param {Object} project - Project data
 * @param {string} project.title - Project title
 * @param {string} project.tagline - Project description
 * @param {string} project.slug - Project slug
 * @param {string} project.image - Project image URL
 * @returns {Object} Next.js metadata object
 */
export const generateProjectMetadata = (project) => {
  if (!project) return { title: 'Project Not Found' };
  
  const title = `Case Study: ${project.title}`;
  const description = project.tagline;
  const canonicalUrl = getCanonicalUrl(`/projects/${project.slug}`);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: project.image ? [{
        url: project.image,
        width: 1200,
        height: 630,
        alt: project.title,
      }] : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SOCIAL_LINKS.twitter.display,
    },
  };
};

/**
 * Generate metadata for a writing/blog post
 * 
 * @param {Object} post - Blog post data
 * @param {string} post.title - Post title
 * @param {string} post.description - Post description
 * @param {string} post.slug - Post slug
 * @param {string} post.image - Post image URL
 * @returns {Object} Next.js metadata object
 */
export const generateWritingMetadata = (post) => {
  if (!post) return { title: 'Post Not Found' };
  
  const canonicalUrl = getCanonicalUrl(`/writing/${post.slug}`);
  
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: 'article',
      images: post.image ? [{
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: SOCIAL_LINKS.twitter.display,
    },
  };
};

export default generatePageMetadata;
