import { notFound } from 'next/navigation';
import { allPosts } from '@/data/writing';
import { WritingDetailClient } from './WritingDetailClient';
import { generateWritingMetadata } from '@/components/layout/pageMetadata';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = allPosts.find(p => p.slug === slug);
  return generateWritingMetadata(post);
}

const PostPage = async ({ params }) => {
  const { slug } = await params;
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg text-gray-300 font-mono selection:bg-primary selection:text-black">
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-24">
        <WritingDetailClient>
          <header className="mb-12">
          <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
            <span className="text-primary">{post.category}</span>
            <span>{post.date} &middot; {post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tighter">
            {post.title}
          </h1>
        </header>

        <article
          className="prose prose-invert prose-lg max-w-none prose-p:text-gray-400 prose-headings:text-white prose-strong:text-white prose-a:text-primary hover:prose-a:underline prose-pre:bg-surface prose-pre:border prose-pre:border-white/10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        </WritingDetailClient>
      </main>
    </div>
  );
};

export default PostPage;