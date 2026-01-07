import { SITE_URL, AUTHOR_NAME } from '@/config/site';

interface ProjectSchemaProps {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  image?: string;
}

export const ProjectSchema = ({ title, description, tags, slug, image }: ProjectSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description: description,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    programmingLanguage: tags,
    codeRepository: `https://github.com/mahad2006/${slug}`,
    url: `${SITE_URL}/projects/${slug}`,
    ...(image && { image: `${SITE_URL}${image}` }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
