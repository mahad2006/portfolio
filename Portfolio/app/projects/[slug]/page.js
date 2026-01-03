import Link from 'next/link';

// --- DATA: Technical Case Studies ---
const projectsData = {
  "scalable-ecommerce": {
    title: "Scalable E-Commerce API",
    tagline: "Handling high-concurrency traffic with Spring Boot & PostgreSQL",
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis'],
    stats: [
      { label: "Latency Reduced", value: "45%" },
      { label: "Request Throughput", value: "10k/sec" },
      { label: "Test Coverage", value: "92%" },
    ],
    content: {
      problem: "During flash sales, traditional monolithic e-commerce architectures suffer from database bottlenecks and slow response times due to locking contentions.",
      architecture: "I implemented a vertical slicing architecture. The application is containerized using Docker. Redis is placed in front of PostgreSQL as a write-through cache for product details, while inventory updates use optimistic locking to prevent race conditions.",
      challenges: [
        { title: "The N+1 Query Problem", desc: "Initially, fetching orders with items caused massive DB thrashing. I solved this using JPQL fetch joins and Entity Graphs." },
        { title: "Inventory Race Conditions", desc: "Concurrent purchases allowed negative inventory. Implemented PESSIMISTIC_WRITE locks for checkout transactions." }
      ]
    }
  },
  "derivify-calculus": {
    title: "Derivify: Calculus Toolkit",
    tagline: "A custom Recursive Descent Parser for offline math solving",
    tags: ['Kotlin', 'Algorithms', 'Android', 'Parsers'],
    stats: [
      { label: "App Size", value: "<15MB" },
      { label: "Parse Time", value: "12ms" },
      { label: "Downloads", value: "500+" },
    ],
    content: {
      problem: "Existing math solvers required internet access or were too heavy for older Android devices used by students in developing regions.",
      architecture: "The core is a custom-built mathematical expression tokenizer and parser based on the Shunting-yard algorithm, written in pure Kotlin with zero external dependencies.",
      challenges: [
        { title: "Operator Precedence", desc: "Handling complex nested brackets and implicit multiplication (e.g., '2x') required a robust state machine in the lexer." },
        { title: "Rendering LaTeX", desc: "Built a custom view component to render the mathematical output natively without a heavy WebView." }
      ]
    }
  },
  "distributed-caching": {
    title: "Distributed Caching Layer",
    tagline: "Optimizing database read throughput with Redis eviction policies",
    tags: ['System Design', 'Redis', 'Java', 'Distributed Systems'],
    stats: [
      { label: "Cache Hit Ratio", value: "85%" },
      { label: "DB Load", value: "-40%" },
      { label: "Consistency", value: "Eventual" },
    ],
    content: {
      problem: "A legacy application was hitting the primary database for static reference data (like country codes and categories), causing unnecessary CPU spikes.",
      architecture: "I introduced Redis as a sidecar cache. Implemented the 'Cache-Aside' pattern where the application looks in Redis first, and only hits the DB on a miss, subsequently populating the cache.",
      challenges: [
        { title: "Stale Data", desc: "The cache would serve old data after updates. I implemented a Publisher/Subscriber model to invalidate cache keys immediately upon DB writes." },
        { title: "Thundering Herd", desc: "When a cache key expired, thousands of requests hit the DB simultaneously. Solved using probabilistic early expiration." }
      ]
    }
  },
  "quizzler-app": {
    title: "Quizzler App",
    tagline: "Memory-optimized MVC architecture for mobile",
    tags: ['Kotlin', 'MVC Pattern', 'Singleton', 'Memory Optimization'],
    stats: [
      { label: "Crash Rate", value: "0.1%" },
      { label: "Memory Usage", value: "~45MB" },
      { label: "State", value: "Preserved" },
    ],
    content: {
      problem: "Many quiz apps lose user progress during screen rotations or background interruptions due to improper Android Lifecycle handling.",
      architecture: "Strict Model-View-Controller (MVC) separation. The 'QuestionBank' logic acts as a Singleton to maintain state consistency across configuration changes without heavy serialization.",
      challenges: [
        { title: "Activity Lifecycle", desc: "Preventing memory leaks when passing context to the controller. Used WeakReferences to ensure the Activity could be garbage collected." },
        { title: "UI Thread Blocking", desc: "Offloaded score calculation and feedback logic to background threads to keep the UI running at 60fps." }
      ]
    }
  },
  "realtime-chat": {
    title: "Real-Time Chat Android",
    tagline: "Offline-first architecture with RoomDB and WebSockets",
    tags: ['Kotlin', 'WebSockets', 'RoomDB', 'Offline-First'],
    stats: [
      { label: "Sync Speed", value: "<100ms" },
      { label: "Offline Queue", value: "Reliable" },
      { label: "Protocol", value: "WSS" },
    ],
    content: {
      problem: "Users in areas with spotty internet connections would lose messages if the network dropped right as they hit send.",
      architecture: "Adopted a 'Database First' approach. Messages are written to the local RoomDB (SQLite) immediately. A background WorkManager job observes the network and syncs the local queue with the WebSocket server when connectivity returns.",
      challenges: [
        { title: "Message Ordering", desc: "Ensuring messages appear in the correct order across devices. Implemented vector clocks (logical timestamps) instead of relying on server time." },
        { title: "Socket Reconnection", desc: "Handled exponential backoff strategies for reconnecting to the WebSocket to avoid battery drain." }
      ]
    }
  },
  "dsa-roadmap": {
    title: "DSA Roadmap & Guide",
    tagline: "Curated technical documentation for University Curriculum",
    tags: ['Documentation', 'Education', 'Community', 'Technical Writing'],
    stats: [
      { label: "Users", value: "200+" },
      { label: "Topics", value: "40+" },
      { label: "Feedback", value: "Positive" },
    ],
    content: {
      problem: "Computer Science juniors often struggle to map theoretical algorithms taught in class to practical coding interview questions.",
      architecture: "A structured, markdown-based knowledge base hosted on GitHub Pages. It maps standard curriculum topics (Linked Lists, Trees, Graphs) to LeetCode patterns.",
      challenges: [
        { title: "Simplifying Complexity", desc: "Breaking down dynamic programming concepts into visual step-by-step guides without oversimplifying the underlying math." },
        { title: "Maintainability", desc: "Designed a contribution guideline to allow other students to submit pull requests with their own solutions." }
      ]
    }
  }
};

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }));
}

export default function ProjectPage({ params }) {
  const project = projectsData[params.slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-500 mb-8">This case study is currently being written.</p>
        <Link href="/" className="text-[#6DB33F] hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#6DB33F] selection:text-black pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#050505]/80">
        <Link href="/#projects" className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <span>←</span> Back to Projects
        </Link>
        <div className="font-mono text-xs text-[#6DB33F] border border-[#6DB33F]/30 px-2 py-1 rounded">CASE STUDY</div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 animate-fade-up">
        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-[#6DB33F] bg-[#6DB33F]/5">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-[#6DB33F] pl-6 italic">
            {project.tagline}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-16 border-y border-white/10 py-8">
          {project.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Body */}
        <div className="space-y-16">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-[#6DB33F] font-mono">01.</span> The Problem
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              {project.content.problem}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-[#6DB33F] font-mono">02.</span> System Architecture
            </h2>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 mb-6 flex items-center justify-center min-h-[200px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
              <p className="font-mono text-sm text-gray-500 relative z-10 group-hover:text-[#6DB33F] transition-colors">
                [ Architecture Diagram / Schema ]
              </p>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              {project.content.architecture}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-[#6DB33F] font-mono">03.</span> Key Engineering Challenges
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.content.challenges.map((challenge, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#6DB33F]/30 transition-colors hover:-translate-y-1 duration-300">
                  <h3 className="text-lg font-bold text-white mb-3">{challenge.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{challenge.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer CTA */}
        <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
           <Link href="/#projects" className="text-gray-500 hover:text-white transition-colors">
             ← All Projects
           </Link>
           <a href="https://github.com/mahad2006" target="_blank" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
             View Source
           </a>
        </div>
      </main>
    </div>
  );
}