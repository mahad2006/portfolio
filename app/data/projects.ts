// Type definitions for projects
export type ProjectType = 'backend' | 'mobile-app' | 'documentation' | 'system-design' | 'console';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface CaseStudyChallenge {
  title: string;
  desc: string;
}

export interface CaseStudy {
  problem: string;
  approach: string;
  outcome: string;
  architecture: string;
  challenges: CaseStudyChallenge[];
}

export interface DiagramConfig {
  title: string;
  components: string[];
}

export interface ProjectDiagrams {
  architecture: DiagramConfig;
}

export interface AppScreen {
  name: string;
  desc: string;
}

export interface DocSection {
  title: string;
  count: number;
}

export interface Project {
  title: string;
  slug: string;
  type: ProjectType;
  isFlagship: boolean;
  image?: string;
  tagline: string;
  stats: ProjectStat[];
  caseStudy: CaseStudy;
  diagrams?: ProjectDiagrams;
  screens?: AppScreen[];
  appFeatures?: string[];
  sections?: DocSection[];
  tags: string[];
  link: string;
}

export const projectsData: Project[] = [
  {
    title: "Scalable E-Commerce API",
    slug: "scalable-ecommerce",
    type: "backend",
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
    diagrams: {
      architecture: {
        title: "System Architecture",
        components: ["Client", "API Gateway", "Auth Service", "Product Service", "Order Service", "Redis Cache", "PostgreSQL"]
      }
    },
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis'],
    link: "https://github.com/mahad2006/scalable-ecommerce"
  },
  {
    title: "Derivify: Calculus Toolkit",
    slug: "derivify-calculus",
    type: "mobile-app",
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
    screens: [
      { name: "Home", desc: "Enter mathematical expressions" },
      { name: "Solution", desc: "Step-by-step differentiation" },
      { name: "Graph", desc: "Interactive function plotting" }
    ],
    appFeatures: ["Offline Mode", "Step-by-Step Solutions", "Graph Visualization", "History"],
    tags: ['Kotlin', 'Recursive Parsing', 'Android XML', 'Algorithms'],
    link: "https://github.com/mahad2006/Derivify-Calculus-Toolkit"
  },
  {
    title: "Distributed Caching Layer",
    slug: "distributed-caching",
    type: "system-design",
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
    diagrams: {
      architecture: {
        title: "Cache-Aside Pattern",
        components: ["Application", "Redis Cache", "PostgreSQL", "Pub/Sub"]
      }
    },
    tags: ['System Design', 'Redis', 'Java', 'LRU Cache'],
    link: "https://github.com/mahad2006/distributed-cache"
  },
  {
    title: "Quizzler App",
    slug: "quizzler-app",
    type: "mobile-app",
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
    screens: [
      { name: "Quiz", desc: "Answer true/false questions" },
      { name: "Score", desc: "View results and stats" },
      { name: "Progress", desc: "Track your performance" }
    ],
    appFeatures: ["Quiz Mode", "Score Tracking", "State Recovery", "Offline Support"],
    tags: ['Kotlin', 'MVC Pattern', 'Singleton', 'Memory Opt.'],
    link: "https://github.com/mahad2006/Quizzler-App"
  },
  {
    title: "Real-Time Chat Android",
    slug: "realtime-chat",
    type: "mobile-app",
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
    screens: [
      { name: "Chat List", desc: "All conversations" },
      { name: "Messages", desc: "Real-time chat view" },
      { name: "Profile", desc: "User settings" }
    ],
    appFeatures: ["Real-Time Sync", "Offline Mode", "Push Notifications", "Message Queue"],
    tags: ['Kotlin', 'WebSockets', 'RoomDB', 'Offline-First'],
    link: "https://github.com/mahad2006/realtime-chat-android"
  },
  {
    title: "DSA Roadmap & Guide",
    slug: "dsa-roadmap",
    type: "documentation",
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
    sections: [
      { title: "Arrays & Strings", count: 12 },
      { title: "Linked Lists", count: 8 },
      { title: "Trees & Graphs", count: 15 },
      { title: "Dynamic Programming", count: 10 },
      { title: "System Design", count: 5 }
    ],
    tags: ['Documentation', 'Community', 'Education', 'DSA'],
    link: "https://github.com/mahad2006"
  },
  {
    title: "Snake Game",
    slug: "snake-game-cpp",
    type: "console",
    isFlagship: false,
    tagline: "Classic snake game implemented in C++ with real-time keyboard input handling",
    stats: [
      { label: "Language", value: "C++" },
      { label: "Lines of Code", value: "400+" },
      { label: "Semester", value: "1st" }
    ],
    caseStudy: {
      problem: "Needed to understand game loops, real-time input, and 2D array manipulation.",
      approach: "Built using Windows console APIs for cursor positioning and non-blocking keyboard input. Implemented collision detection and dynamic snake growth.",
      outcome: "Fully playable console game with score tracking and increasing difficulty.",
      architecture: "Game loop pattern with separate update and render phases. Used linked list for snake body segments.",
      challenges: [
        { title: "Real-time Input", desc: "Implemented non-blocking keyboard input using _kbhit() and _getch() for smooth gameplay without pausing." },
        { title: "Screen Flickering", desc: "Solved flickering by using SetConsoleCursorPosition() for selective rendering instead of full screen clears." }
      ]
    },
    tags: ['C++', 'Console', 'Game Dev', 'Data Structures'],
    link: "https://github.com/mahad2006"
  },
  {
    title: "Word Guess Game",
    slug: "word-guess-cpp",
    type: "console",
    isFlagship: false,
    tagline: "Interactive hangman-style word guessing game with category selection",
    stats: [
      { label: "Language", value: "C++" },
      { label: "Word Bank", value: "100+" },
      { label: "Semester", value: "1st" }
    ],
    caseStudy: {
      problem: "Create an engaging CLI game while learning string manipulation and file I/O.",
      approach: "Designed modular code with separate functions for game logic, display, and word management. Used file streams for persistent word banks.",
      outcome: "Fun educational game demonstrating string algorithms and user input validation.",
      architecture: "Modular design with clear separation between game state, rendering, and input handling.",
      challenges: [
        { title: "Input Validation", desc: "Implemented robust input sanitization to handle edge cases like repeated guesses and invalid characters." },
        { title: "ASCII Art", desc: "Created dynamic ASCII hangman rendering based on remaining attempts." }
      ]
    },
    tags: ['C++', 'Console', 'Strings', 'File I/O'],
    link: "https://github.com/mahad2006"
  },
  {
    title: "Book Management System",
    slug: "book-management-cpp",
    type: "console",
    isFlagship: false,
    tagline: "CRUD-based library management system with file persistence",
    stats: [
      { label: "Language", value: "C++" },
      { label: "Features", value: "8+" },
      { label: "Semester", value: "2nd" }
    ],
    caseStudy: {
      problem: "Build a practical system demonstrating OOP concepts and data persistence.",
      approach: "Implemented full CRUD operations with classes for Book and Library. Used binary file I/O for data persistence.",
      outcome: "Functional library system with search, borrow/return tracking, and data persistence.",
      architecture: "Object-oriented design with Book and Member classes. File-based database using binary serialization.",
      challenges: [
        { title: "Data Persistence", desc: "Implemented binary file read/write for efficient storage and retrieval of book records." },
        { title: "Search Algorithm", desc: "Built efficient search by title, author, and ISBN using linear and binary search." }
      ]
    },
    tags: ['C++', 'Console', 'OOP', 'File I/O', 'CRUD'],
    link: "https://github.com/mahad2006"
  },
  {
    title: "Sorting Visualizer CLI",
    slug: "sorting-visualizer-cpp",
    type: "console",
    isFlagship: false,
    tagline: "Terminal-based visualization of sorting algorithms with step-by-step animation",
    stats: [
      { label: "Algorithms", value: "6" },
      { label: "Language", value: "C++" },
      { label: "Semester", value: "2nd" }
    ],
    caseStudy: {
      problem: "Understanding sorting algorithms is difficult without visual representation.",
      approach: "Created ASCII bar charts that animate in real-time as algorithms sort arrays. Implemented Bubble, Selection, Insertion, Merge, Quick, and Heap sort.",
      outcome: "Educational tool that clearly shows how different sorting algorithms work and their time complexity differences.",
      architecture: "Strategy pattern for interchangeable sorting algorithms with common visualization interface.",
      challenges: [
        { title: "Animation Timing", desc: "Used Sleep() with configurable delays to create smooth, watchable animations without being too slow." },
        { title: "Console Rendering", desc: "Optimized rendering to only update changed bars rather than redrawing the entire visualization." }
      ]
    },
    tags: ['C++', 'Console', 'Algorithms', 'DSA', 'Visualization'],
    link: "https://github.com/mahad2006"
  },
  {
    title: "Student Grade Manager",
    slug: "grade-manager-cpp",
    type: "console",
    isFlagship: false,
    tagline: "Academic grade tracking system with GPA calculation and statistics",
    stats: [
      { label: "Language", value: "C++" },
      { label: "Metrics", value: "5+" },
      { label: "Semester", value: "1st" }
    ],
    caseStudy: {
      problem: "Manual grade calculation is tedious and error-prone.",
      approach: "Built a menu-driven system to add courses, record grades, and automatically calculate GPA using weighted averages.",
      outcome: "Practical utility that demonstrates arrays, structs, and basic statistics.",
      architecture: "Struct-based design with arrays for course storage and modular functions for calculations.",
      challenges: [
        { title: "GPA Algorithms", desc: "Implemented both simple and weighted GPA calculations with credit hour considerations." },
        { title: "Data Validation", desc: "Added comprehensive input validation for grade ranges and credit hours." }
      ]
    },
    tags: ['C++', 'Console', 'Arrays', 'Structs'],
    link: "https://github.com/mahad2006"
  }
];

export const projectsMap: Record<string, Project> = projectsData.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {} as Record<string, Project>);
