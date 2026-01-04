export const projectsData = [
  {
    title: "Scalable E-Commerce API",
    slug: "scalable-ecommerce",
    isFlagship: true,
    tagline: "High-concurrency systems architecture with Spring Boot & PostgreSQL",
    stats: [
      { label: "Latency Reduction", value: "45%" },
      { label: "Throughput", value: "12k/rps" },
      { label: "Test Coverage", value: "94%" }
    ],
    caseStudy: {
      problem: "High latency in product search during simulated concurrent user spikes.",
      approach: "Vertical slicing architecture with PostgreSQL indexing and DTO projection to reduce payload size.",
      outcome: "Reduced query latency by 45% and secured endpoints with RBAC.",
      architecture: "Implemented a Vertical Slicing architecture to decouple domains. Utilized Spring Data JPA with a write-through caching strategy using Redis to offload 70% of read traffic from PostgreSQL.",
      challenges: [
        { title: "Distributed Locking", desc: "Resolved inventory race conditions during checkout using Redis-based distributed locks and PESSIMISTIC_WRITE locks at the DB level to ensure atomicity." },
        { title: "Query Optimization", desc: "Eliminated N+1 query overhead by implementing Entity Graphs and DTO Projections." }
      ]
    },
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis'],
    link: "https://github.com/mahad2006/scalable-ecommerce"
  },
  {
    title: "Derivify: Calculus Toolkit",
    slug: "derivify-calculus",
    isFlagship: false,
    image: "/derivify.png",
    tagline: "A low-latency Recursive Descent Parser for offline symbolic computation",
    stats: [
      { label: "Execution Time", value: "8ms" },
      { label: "Binary Size", value: "12MB" },
      { label: "User Rating", value: "4.8/5" }
    ],
    caseStudy: {
      problem: "Students couldn't visualize complex calculus steps offline on mobile.",
      approach: "Built a custom Recursive Descent Parser in Kotlin to tokenize and solve expressions without API dependency.",
      outcome: "Enables offline step-by-step differentiation and graphing; zero network latency.",
      architecture: "Engineered a hand-written Recursive Descent Parser in Kotlin. The system tokenizes mathematical strings into an Abstract Syntax Tree (AST) before applying symbolic differentiation rules locally on the JVM thread.",
      challenges: [
        { title: "Operator Precedence", desc: "Implemented a custom Lexer to handle implicit multiplication (e.g., '3x' vs '3*x') and nested transcendental functions." },
        { title: "UI Performance", desc: "Bypassed heavy WebView rendering by building a custom Canvas-based math engine to display LaTeX-style equations smoothy." }
      ]
    },
    tags: ['Kotlin', 'Recursive Parsing', 'Android XML', 'Algorithms'],
    link: "https://github.com/mahad2006/Derivify-Calculus-Toolkit"
  },
  {
    title: "Distributed Caching Layer",
    slug: "distributed-caching",
    isFlagship: false,
    tagline: "Optimizing DB read throughput via intelligent eviction and consistency models",
    stats: [
      { label: "Cache Hit Ratio", value: "89%" },
      { label: "DB Load Relief", value: "65%" },
      { label: "Sync Latency", value: "<2ms" }
    ],
    caseStudy: {
      problem: "Database bottlenecks observed during repetitive read operations.",
      approach: "Designed a write-through caching strategy using Redis with an LRU eviction policy.",
      outcome: "Decreased direct database load by 40% while maintaining data consistency.",
      architecture: "Introduced a Redis sidecar cache utilizing the 'Cache-Aside' pattern. Implemented an asynchronous invalidation layer using Redis Pub/Sub.",
      challenges: [
        { title: "Thundering Herd", desc: "Prevented 'Cache Stampede' by implementing probabilistic early expiration (X-Fetch) to refresh hot keys." },
        { title: "Serialization Overhead", desc: "Migrated from standard JSON to Protobuf for cache storage, resulting in a 40% reduction in network payload size." }
      ]
    },
    tags: ['System Design', 'Redis', 'Java', 'LRU Cache'],
    link: "https://github.com/mahad2006/distributed-cache"
  },
  {
    title: "Quizzler App",
    slug: "quizzler-app",
    isFlagship: false,
    image: "/quizzler.png",
    tagline: "Memory-optimized MVC architecture for native Android environments",
    stats: [
      { label: "Memory Leakage", value: "0%" },
      { label: "State Recovery", value: "100%" },
      { label: "Startup Time", value: "1.2s" }
    ],
    caseStudy: {
      problem: "Needed a lightweight domain testing tool without the overhead of a heavy backend.",
      approach: "Implemented a clean MVC architecture with a Singleton pattern for state management to optimize memory.",
      outcome: "Robust state preservation across lifecycle events and instant feedback loop.",
      architecture: "Strict adherence to the Model-View-Controller (MVC) pattern. State is managed via a persistent Singleton repository.",
      challenges: [
        { title: "Context Leaks", desc: "Audited the application for memory leaks using LeakCanary, resolving issues where anonymous inner classes held references to Activities." },
        { title: "Resource Scaling", desc: "Optimized image handling using the Glide library to ensure bitmapped assets were sampled according to the device density." }
      ]
    },
    tags: ['Kotlin', 'MVC Pattern', 'Singleton', 'Memory Opt.'],
    link: "https://github.com/mahad2006/Quizzler-App"
  },
  {
    title: "Real-Time Chat Android",
    slug: "realtime-chat",
    isFlagship: false,
    tagline: "Offline-first sync engine with RoomDB and WebSockets",
    stats: [
      { label: "Message Delivery", value: "99.9%" },
      { label: "Sync Jitter", value: "<15ms" },
      { label: "Offline Buffer", value: "Unlimited" }
    ],
    caseStudy: {
      problem: "Unreliable message delivery in areas with poor network connectivity.",
      approach: "Engineered an offline-first architecture using RoomDB as the single source of truth, synced via WebSockets.",
      outcome: "Seamless user experience with sub-100ms delivery when online and robust queuing when offline.",
      architecture: "Designed a 'Database-as-Truth' architecture. The UI only observes the local RoomDB. Outgoing messages are queued in SQLite.",
      challenges: [
        { title: "Vector Clocks", desc: "Solved the message ordering problem by implementing logical clocks to ensure causal consistency." },
        { title: "Socket Resilience", desc: "Engineered a heartbeat mechanism to detect 'zombie' connections and automatically re-establish the WSS tunnel." }
      ]
    },
    tags: ['Kotlin', 'WebSockets', 'RoomDB', 'Offline-First'],
    link: "https://github.com/mahad2006/realtime-chat-android"
  },
  {
    title: "DSA Roadmap & Guide",
    slug: "dsa-roadmap",
    isFlagship: false,
    image: "/roadmap.png",
    tagline: "Technical documentation and pedagogical structure for engineers",
    stats: [
      { label: "Monthly Users", value: "300+" },
      { label: "Curated Patterns", value: "50+" },
      { label: "Community PRs", value: "15+" }
    ],
    caseStudy: {
      problem: "Juniors lacked a structured path to navigate Data Structures & Algorithms.",
      approach: "Curated a comprehensive, step-by-step documentation tailored to university curriculum constraints.",
      outcome: "Actively used by batchmates to structure their technical interview preparation.",
      architecture: "Developed a structured, hierarchical knowledge base using GitHub Pages and Jekyll.",
      challenges: [
        { title: "Maintainability", desc: "Established a strict contribution pipeline using GitHub Actions to automatically lint and validate Markdown links." },
        { title: "SEO Optimization", desc: "Structured the metadata to rank for specific University curriculum keywords." }
      ]
    },
    tags: ['Documentation', 'Community', 'Education', 'DSA'],
    link: "https://github.com/mahad2006"
  }
];

export const projectsMap = projectsData.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {});
