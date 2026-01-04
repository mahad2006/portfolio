import { projectsData } from './data/projects'; // Assuming you have this

export default function sitemap() {
    const baseUrl = 'https://shaikhmahad.vercel.app';

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/stats`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/uses`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/status`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.5 },
    ];

    // In the future, when you have dynamic project pages, you can generate them like this:
    const projectPages = projectsData.map(project => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(), // Or a date from your project data
        changeFrequency: 'yearly',
        priority: 0.9,
    }));

    // In the future, when you have dynamic writing pages, you can generate them similarly.
    // const writingPages = allPosts.map(post => ({
    //     url: `${baseUrl}/writing/${post.slug}`,
    //     lastModified: post.date,
    //     changeFrequency: 'weekly',
    //     priority: 0.8,
    // }));

    return [
        ...staticPages,
        // ...projectPages, // Uncomment when project pages are ready
        // ...writingPages, // Uncomment when writing pages are ready
    ];
}