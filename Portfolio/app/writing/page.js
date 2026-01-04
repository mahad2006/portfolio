import Link from 'next/link';

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
  },
  {
    slug: 'optimistic-vs-pessimistic-locking',
    title: 'Optimistic vs Pessimistic Locking in Spring Boot',
    description: 'A deep dive into handling concurrency in inventory management systems and when to use `@Version` annotations.',
    category: 'Databases',
    date: 'Jan 2026',
    readTime: '4 min read',
    isPopular: false,
  }
];

export const metadata = {
  title: 'Technical Writing',
  description: 'A collection of articles on backend engineering, system design, and performance.',
};

const WritingPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-[#6DB33F] selection:text-black">
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group text-xs text-gray-400 hover:text-[#6DB33F] transition-colors flex items-center gap-2 tracking-widest uppercase">
            <span className="text-green-400">root@mahad:~/writing</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-none tracking-tighter">
            Technical Writing
          </h1>
          <p className="text-xl text-gray-400 border-l-2 border-[#6DB33F] pl-6">
            A collection of articles on backend engineering, system design, and performance.
          </p>
        </header>

        <div className="space-y-8">
          {allPosts.map((post) => (
            <Link href={`/writing/${post.slug}`} key={post.slug} className="block p-8 rounded-2xl glass-panel border border-transparent hover:border-[#6DB33F] hover:bg-white/[0.05] transition-all group relative overflow-hidden">
              {post.isPopular && (
                <div className="absolute top-0 right-0 bg-[#6DB33F]/20 text-[#6DB33F] text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              )}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-[#6DB33F]">{post.category}</span>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#6DB33F] transition-colors">{post.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{post.description}</p>
              <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">Read Article <span className="ml-2">→</span></div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WritingPage;