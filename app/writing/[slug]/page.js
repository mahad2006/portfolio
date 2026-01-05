import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPosts } from '@/app/data/writing';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Article Not Found'
    }
  }
  return {
    title: post.title,
    description: post.description,
  };
}

const PostPage = ({ params }) => {
  const post = allPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-primary selection:text-black">
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/writing" className="group text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-2 tracking-widest uppercase">
            <span className="text-green-400">root@mahad:~/writing</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
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
          className="prose prose-invert prose-lg max-w-none prose-p:text-gray-400 prose-headings:text-white prose-strong:text-white prose-a:text-primary hover:prose-a:underline prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
};

export default PostPage;