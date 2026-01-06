/**
 * Profile Data
 * 
 * Centralized profile information, bio, and personal stats.
 * Import from '@/data/profile' throughout the app.
 */

// ============================================================================
// About Section Content
// ============================================================================

export const ABOUT_CONTENT = {
  title: 'About Me',
  sectionNumber: '01',
  
  sections: [
    {
      title: 'The Journey to Backend',
      content: `I started in native Android development, obsessing over user experience. But as I built more complex apps, I realized the real magic happens on the server. I shifted my focus to backend engineering to build the robust systems that power great products.`,
      highlights: ['backend engineering'],
    },
    {
      title: 'How I Think',
      content: `I don't just write code; I design systems. I care deeply about data structures, memory efficiency, and the "why" behind every architectural decision. Algorithms aren't just interview questions to me—they are the toolkit for scalability.`,
      highlights: ['data structures, memory efficiency, and the "why"'],
    },
  ],
  
  quote: 'My goal is to bridge the gap between academic theory and production reality.',
};

// ============================================================================
// Stats Page Data (Career Analytics)
// ============================================================================

export const TYPING_STATS = {
  bestWpm: '192',
  accuracy: '98.2',
  timeTyping: '120',
  rank: 'Top 0.1%',
};

export const CAREER_STATS = {
  problemsSolved: 231,
  contributions: 1526,
  cpStreak: 59,
  devActiveDays: 187,
  cpStatus: 'SPECIALIST',
};

export const PERFORMANCE_METRICS = {
  contributions: { 
    value: 1526, 
    label: 'Code Commits', 
    color: 'green', 
    desc: 'Total contributions' 
  },
  problems: { 
    value: 231, 
    label: 'Problems Solved', 
    color: 'orange', 
    desc: 'Algorithmic challenges' 
  },
  devDays: { 
    value: 187, 
    label: 'Dev Active', 
    color: 'blue', 
    desc: 'Days building' 
  },
  cpStreak: { 
    value: 59, 
    label: 'CP Streak', 
    color: 'red', 
    desc: 'Days solving' 
  },
};

export const LOADED_MODULES = [
  '#JAVA', '#KOTLIN', '#DSA', '#SYSTEM_DESIGN',
  '#SPRING_BOOT', '#ANDROID', '#C++', '#POSTGRESQL',
  '#REACT', '#NEXTJS', '#DOCKER'
];

// ============================================================================
// Community Stats
// ============================================================================

export const COMMUNITY_STATS = {
  peers: 450,
  resources: 100,
};

// ============================================================================
// Community Groups
// ============================================================================

export const COMMUNITY_GROUPS = [
  { name: 'Beginner Programming', icon: 'book' },
  { name: 'DSA & Problem Solving', icon: 'layers' },
  { name: 'Mathematics & Core Subjects', icon: 'heart' },
  { name: 'Web Development', icon: 'code' },
  { name: 'App Development', icon: 'smartphone' },
  { name: 'Data Science & AI', icon: 'chart' },
  { name: 'Cybersecurity & Ethical Hacking', icon: 'shield' },
  { name: 'Game Development', icon: 'gamepad' },
  { name: 'Career Guidance & Internships', icon: 'dollar' },
  { name: 'Tech Projects & Collaboration', icon: 'users' },
];

// ============================================================================
// Community Features
// ============================================================================

export const COMMUNITY_FEATURES = [
  { 
    title: 'Peer-to-Peer Protocol', 
    description: 'A decentralized support system where students form study groups and resolve queries collaboratively, reducing dependency on single points of failure.',
    icon: 'users'
  },
  { 
    title: 'Legacy Documentation', 
    description: 'The community maintains a fork of the DSA Roadmap, a comprehensive guide I created, ensuring knowledge is preserved and improved upon.',
    icon: 'book'
  },
];
