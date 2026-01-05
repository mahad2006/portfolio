import { MetadataRoute } from 'next';
import { projectsData } from './data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://shaikhmahad.vercel.app';

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/stats`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/uses`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/status`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.5 },
    ];

    const projectPages: MetadataRoute.Sitemap = projectsData.map(project => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.9,
    }));

    return [
        ...staticPages,
        ...projectPages,
    ];
}