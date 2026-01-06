import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { allPosts } from '@/data/writing';
import { SITE_URL } from '@/config/site';
import { getSitemapPages } from '@/config/seo';

/**
 * Sitemap Generator
 * 
 * Uses centralized SEO config for static pages and dynamically 
 * generates entries for projects and writing posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages from SEO config (excludes noIndex pages)
    const staticPages = getSitemapPages();

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = projectsData.map(project => ({
        url: `${SITE_URL}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.9,
    }));

    // Dynamic writing/blog pages
    const writingPages: MetadataRoute.Sitemap = allPosts.map(post => ({
        url: `${SITE_URL}/writing/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        ...staticPages,
        ...projectPages,
        ...writingPages,
    ];
}