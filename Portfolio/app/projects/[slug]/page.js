import React from 'react';

/**
 * TECHNICAL DATA REGISTRY
 * All projects are fully detailed with architectural insights, performance metrics,
 * and specific engineering challenges.
 */
const projectsData = {
  "scalable-ecommerce": {
    title: "Scalable E-Commerce API",
    tagline: "High-concurrency systems architecture with Spring Boot & PostgreSQL",
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis', 'JUnit 5'],
    stats: [
      { label: "Latency Reduction", value: "45%" },
      { label: "Throughput", value: "12k/rps" },
      { label: "Test Coverage", value: "94%" }
    ],
    content: {
      problem: "Traditional monolithic architectures struggle with 'Flash Sale' scenarios where sudden spikes in concurrent requests cause row-level locking contentions in the database, leading to cascading failures and high Latency.",
      architecture: "Implemented a Vertical Slicing architecture to decouple domains. Utilized Spring Data JPA with a write-through caching strategy using Redis to offload 70% of read traffic from PostgreSQL. Deployment is orchestrated via Docker Compose for environment parity.",
      challenges: [
        { title: "Distributed Locking", desc: "Resolved inventory race conditions during checkout using Redis-based distributed locks and PESSIMISTIC_WRITE locks at the DB level to ensure atomicity." },
        { title: "Query Optimization", desc: "Eliminated N+1 query overhead by implementing Entity Graphs and DTO Projections, reducing the memory footprint of JPA's persistence context." }
      ]
    }
  },
  "derivify-calculus": {
    title: "Derivify: Calculus Toolkit",
    tagline: "A low-latency Recursive Descent Parser for offline symbolic computation",
    tags: ['Kotlin', 'Algorithms', 'Android', 'SymPy', 'Parsers'],
    stats: [
      { label: "Execution Time", value: "8ms" },
      { label: "Binary Size", value: "12MB" },
      { label: "User Rating", value: "4.8/5" }
    ],
    content: {
      problem: "Mobile math tools often rely on heavy cloud-based APIs (WolframAlpha/SymPy), rendering them useless in low-connectivity areas or on low-end hardware common in developing regions.",
      architecture: "Engineered a hand-written Recursive Descent Parser in Kotlin. The system tokenizes mathematical strings into an Abstract Syntax Tree (AST) before applying symbolic differentiation rules locally on the JVM thread.",
      challenges: [
        { title: "Operator Precedence", desc: "Implemented a custom Lexer to handle implicit multiplication (e.g., '3x' vs '3*x') and nested transcendental functions while maintaining O(n) parse time." },
        { title: "UI Performance", desc: "Bypassed heavy WebView rendering by building a custom Canvas-based math engine to display LaTeX-style equations smoothly at 60fps." }
      ]
    }
  },
  "distributed-caching": {
    title: "Distributed Caching Layer",
    tagline: "Optimizing DB read throughput via intelligent eviction and consistency models",
    tags: ['Redis', 'Java', 'System Design', 'Event-Driven', 'Pub/Sub'],
    stats: [
      { label: "Cache Hit Ratio", value: "89%" },
      { label: "DB Load Relief", value: "65%" },
      { label: "Sync Latency", value: "<2ms" }
    ],
    content: {
      problem: "A high-traffic legacy system suffered from CPU saturation because it fetched identical reference data from the primary database thousands of times per second.",
      architecture: "Introduced a Redis sidecar cache utilizing the 'Cache-Aside' pattern. Implemented an asynchronous invalidation layer using Redis Pub/Sub to maintain eventual consistency across microservices.",
      challenges: [
        { title: "Thundering Herd", desc: "Prevented 'Cache Stampede' by implementing probabilistic early expiration (X-Fetch) to refresh hot keys before they expired globally." },
        { title: "Serialization Overhead", desc: "Migrated from standard JSON to Protobuf for cache storage, resulting in a 40% reduction in network payload size and faster deserialization." }
      ]
    }
  },
  "quizzler-app": {
    title: "Quizzler App",
    tagline: "Memory-optimized MVC architecture for native Android environments",
    tags: ['Kotlin', 'Android SDK', 'Lifecycle', 'Memory Management'],
    stats: [
      { label: "Memory Leakage", value: "0%" },
      { label: "State Recovery", value: "100%" },
      { label: "Startup Time", value: "1.2s" }
    ],
    content: {
      problem: "User progress was frequently lost on lower-end Android devices during backgrounding or configuration changes (screen rotations) due to poor activity lifecycle management.",
      architecture: "Strict adherence to the Model-View-Controller (MVC) pattern. State is managed via a persistent Singleton repository that hooks into the Android SavedStateHandle for robust process-death recovery.",
      challenges: [
        { title: "Context Leaks", desc: "Audited the application for memory leaks using LeakCanary, resolving long-standing issues where anonymous inner classes held implicit references to destroyed Activities." },
        { title: "Resource Scaling", desc: "Optimized image handling using the Glide library to ensure bitmapped assets were sampled according to the device's specific display density." }
      ]
    }
  },
  "realtime-chat": {
    title: "Real-Time Chat Android",
    tagline: "Offline-first sync engine with RoomDB and WebSockets",
    tags: ['Kotlin', 'WebSockets', 'SQLite', 'Room', 'WorkManager'],
    stats: [
      { label: "Message Delivery", value: "99.9%" },
      { label: "Sync Jitter", value: "<15ms" },
      { label: "Offline Buffer", value: "Unlimited" }
    ],
    content: {
      problem: "Mobile chat applications often feel unresponsive or 'stuck' in areas with high packet loss or intermittent 3G/4G connectivity.",
      architecture: "Designed a 'Database-as-Truth' architecture. The UI only observes the local RoomDB. Outgoing messages are queued in SQLite and synchronized via a background service using exponential backoff.",
      challenges: [
        { title: "Vector Clocks", desc: "Solved the message ordering problem in distributed environments by implementing logical clocks to ensure causal consistency regardless of network arrival order." },
        { title: "Socket Resilience", desc: "Engineered a heartbeat mechanism to detect 'zombie' connections and automatically re-establish the WSS tunnel before the user noticed a disconnect." }
      ]
    }
  },
  "dsa-roadmap": {
    title: "DSA Roadmap & Guide",
    tagline: "Technical documentation and pedagogical structure for engineers",
    tags: ['Technical Writing', 'Markdown', 'Git', 'SEO', 'Community'],
    stats: [
      { label: "Monthly Users", value: "300+" },
      { label: "Curated Patterns", value: "50+" },
      { label: "Community PRs", value: "15+" }
    ],
    content: {
      problem: "Junior developers often struggle with 'LeetCode Blindness'—the inability to map theoretical data structures taught in academia to practical algorithmic problems.",
      architecture: "Developed a structured, hierarchical knowledge base using GitHub Pages and Jekyll. Content is categorized by pattern (e.g., Two Pointers, Sliding Window) rather than raw topic name.",
      challenges: [
        { title: "Maintainability", desc: "Established a strict contribution pipeline using GitHub Actions to automatically lint and validate Markdown links and code snippets submitted by the community." },
        { title: "SEO Optimization", desc: "Structured the metadata to rank for specific University curriculum keywords, making the resource discoverable for Karachi-based engineering students." }
      ]
    }
  }
};

export default function App({ params }) {
  /**
   * DYNAMIC ROUTING LOGIC
   * We normalize the slug to ensure the correct project is loaded.
   * If viewed in a preview environment where params might be empty, 
   * it defaults to the flagship project.
   */
  const slug = params?.slug || 'scalable-ecommerce';
  const project = projectsData[slug];

  // Return system error view if registry hit fails
  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-mono p-4 text-center">
        <div className="w-16 h-16 border-2 border-red-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tighter">
          system_error: registry_miss
        </h1>
        <p className="text-gray-500 mb-8 max-w-md font-sans">
          The requested project identity <span className="text-[#6DB33F] font-mono">"{slug}"</span> could not be resolved in the technical database.
        </p>
        <a href="/" className="px-6 py-3 border border-[#6DB33F]/30 text-[#6DB33F] rounded hover:bg-[#6DB33F]/10 transition-all uppercase text-[10px] tracking-[0.2em] font-mono">
          Return to root_directory
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#6DB33F] selection:text-black pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <a href="/#projects" className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2 group tracking-widest">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK_TO_SYS
        </a>
        <div className="font-mono text-[9px] text-[#6DB33F] border border-[#6DB33F]/30 px-2 py-1 rounded tracking-[0.3em] bg-[#6DB33F]/5 uppercase">
          Case_Study_v2.0.1
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 animate-fade-up">
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-[9px] font-mono border border-white/10 rounded-full text-[#6DB33F] bg-[#6DB33F]/5 uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-none font-mono tracking-tighter uppercase italic">
            {project.title.split(':').join('\n')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-[#6DB33F] pl-8 font-light leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Technical Stats Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-20 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01]">
          {project.stats.map((stat, i) => (
            <div key={i} className={`p-8 text-center ${i !== 2 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''}`}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono tracking-tighter">{stat.value}</div>
              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Content Blocks */}
        <div className="space-y-28">
          
          {/* Section 01 */}
          <section className="relative">
            <div className="absolute -left-12 top-0 text-[#6DB33F]/10 text-6xl font-mono font-bold hidden lg:block">01</div>
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
              <span className="w-8 h-px bg-[#6DB33F]"></span>
              the_problem_statement
            </h2>
            <p className="text-lg leading-relaxed text-gray-400 font-light">
              {project.content.problem}
            </p>
          </section>

          {/* Section 02 */}
          <section className="relative">
            <div className="absolute -left-12 top-0 text-[#6DB33F]/10 text-6xl font-mono font-bold hidden lg:block">02</div>
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
              <span className="w-8 h-px bg-[#6DB33F]"></span>
              architectural_implementation
            </h2>
            
            {/* Visual Blueprint Placeholder */}
            <div className="p-16 rounded-3xl bg-white/[0.02] border border-white/10 mb-10 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#6DB33F10_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] [background-size:40px_40px]"></div>
              
              <div className="relative z-10 text-center">
                <svg className="w-12 h-12 text-[#6DB33F] mb-6 mx-auto opacity-40 group-hover:opacity-100 transition-opacity duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <p className="font-mono text-[10px] text-gray-500 group-hover:text-[#6DB33F] transition-colors tracking-[0.5em] uppercase">
                  [ logical_architecture_diagram_v1 ]
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-400 font-light">
              {project.content.architecture}
            </p>
          </section>

          {/* Section 03 */}
          <section className="relative pb-10">
            <div className="absolute -left-12 top-0 text-[#6DB33F]/10 text-6xl font-mono font-bold hidden lg:block">03</div>
            <h2 className="text-sm font-bold text-white mb-10 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
              <span className="w-8 h-px bg-[#6DB33F]"></span>
              engineering_challenges
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.content.challenges.map((challenge, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#6DB33F]/20 transition-all group">
                  <h3 className="text-xs font-bold text-[#6DB33F] mb-4 font-mono uppercase tracking-[0.2em] flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#6DB33F] rounded-full shadow-[0_0_8px_#6DB33F]"></span>
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans font-light group-hover:text-gray-300 transition-colors">
                    {challenge.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="mt-40 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 font-mono">
            <a href="/#projects" className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-[0.5em] flex items-center gap-3 group">
              <span className="group-hover:-translate-x-2 transition-transform">←</span> return_to_sys_archive
            </a>
            <a 
              href="https://github.com/mahad2006" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group px-10 py-5 bg-[#6DB33F] text-black font-bold rounded-xl hover:bg-white transition-all flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase shadow-[0_20px_40px_-15px_rgba(109,179,63,0.3)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              access_repository
            </a>
        </div>
      </main>
    </div>
  );
}