import { SITE_URL, AUTHOR_NAME } from '@/config/site';

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
  category: string;
}

export const ArticleSchema = ({ title, description, datePublished, slug, category }: ArticleSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    datePublished: new Date(datePublished).toISOString(),
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/writing/${slug}`,
    },
    articleSection: category,
    url: `${SITE_URL}/writing/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
