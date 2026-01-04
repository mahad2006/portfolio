import Link from 'next/link';
import { notFound } from 'next/navigation';

// In the future, you can fetch your articles from a CMS or local markdown files.
const allPosts = [
  {
    slug: 'recursive-descent-parser',
    title: 'Why I chose Recursive Descent for my Math Parser',
    description: 'Exploring the trade-offs between Shunting-Yard algorithm and hand-written recursive descent parsers for mobile-constrained environments.',
    category: 'Performance Engineering',
    date: 'Jan 2026',
    readTime: '6 min read',
    isPopular: true,
    content: `
      <p>This is where the full content of your article will go. You can use HTML or render Markdown.</p>
      <p>For now, this is just a placeholder to demonstrate the structure.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">A Deeper Dive</h3>
      <p>You can structure your articles with headings, lists, code blocks, and more.</p>
      <pre class="bg-neutral-900 p-4 rounded-lg border border-neutral-800 text-sm text-gray-300 overflow-x-auto"><code>// Example code block
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>
    `
  },
  {
    slug: 'optimistic-vs-pessimistic-locking',
    title: 'Optimistic vs Pessimistic Locking in Spring Boot',
    description: 'A deep dive into handling concurrency in inventory management systems and when to use `@Version` annotations.',
    category: 'Databases',
    date: 'Jan 2026',
    readTime: '4 min read',
    isPopular: false,
    content: `
      <p>This is the content for the locking article.</p>
    `
  }
];

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
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-[#6DB33F] selection:text-black">
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/writing" className="group text-xs text-gray-400 hover:text-[#6DB33F] transition-colors flex items-center gap-2 tracking-widest uppercase">
            <span className="text-green-400">root@mahad:~/writing</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
            <span className="text-[#6DB33F]">{post.category}</span>
            <span>{post.date} &middot; {post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tighter">
            {post.title}
          </h1>
        </header>

        <article
          className="prose prose-invert prose-lg max-w-none prose-p:text-gray-400 prose-headings:text-white prose-strong:text-white prose-a:text-[#6DB33F] hover:prose-a:underline prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
};

export default PostPage;