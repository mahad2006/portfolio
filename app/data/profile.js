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
// Stats Page Data (Career Analytics) - Real verifiable data
// ============================================================================

// MonkeyType Stats (verified: monkeytype.com/profile/CodeWithMahad1)
export const TYPING_STATS = {
  testsStarted: 60252,
  testsCompleted: 25955,
  timeTypingHours: 75,
  currentStreak: 7,
  personalBests: {
    15: { wpm: 138, accuracy: 100 },
    30: { wpm: 124, accuracy: 94 },
    60: { wpm: 116, accuracy: 95 },
    120: { wpm: 108, accuracy: 93 },
  },
  leaderboard: {
    '15sec': { rank: 55991, topPercent: 11.89 },
    '60sec': { rank: 44879, topPercent: 9.7 },
  },
  profileUrl: 'https://monkeytype.com/profile/CodeWithMahad1',
};

// Competitive Programming Stats (verified via Codolio)
export const CP_STATS = {
  totalProblems: 231,
  activeDays: 59,
  rating: {
    leetcode: 1521,
    codeforces: 1516,
  },
  breakdown: {
    easy: 103,
    medium: 78,
    hard: 6,
  },
  competitiveProgramming: 34,
  fundamentals: 10,
  totalContests: 6,
  rank: 'Specialist', // Codeforces rank
  profileUrls: {
    leetcode: 'https://leetcode.com/u/mahad2006/',
    codeforces: 'https://codeforces.com/profile/codewithmahad',
    geeksforgeeks: 'https://www.geeksforgeeks.org/profile/codewithmahad',
    codolio: 'https://codolio.com/profile/codewithmahad',
  },
};

// GitHub Stats (verified: github.com/mahad2006)
export const GITHUB_STATS = {
  contributions: 1526,
  activeDays: 187,
  profileUrl: 'https://github.com/mahad2006',
  username: 'mahad2006',
};

// Combined career stats for backward compatibility
export const CAREER_STATS = {
  problemsSolved: CP_STATS.totalProblems,
  contributions: GITHUB_STATS.contributions,
  cpStreak: CP_STATS.activeDays,
  devActiveDays: GITHUB_STATS.activeDays,
  cpStatus: CP_STATS.rank.toUpperCase(),
};

export const PERFORMANCE_METRICS = {
  contributions: { 
    value: GITHUB_STATS.contributions, 
    label: 'GitHub Commits', 
    color: 'green', 
    desc: 'Total contributions',
    verified: true,
  },
  problems: { 
    value: CP_STATS.totalProblems, 
    label: 'Problems Solved', 
    color: 'orange', 
    desc: 'DSA + Competitive',
    verified: true,
  },
  devDays: { 
    value: GITHUB_STATS.activeDays, 
    label: 'Active Days', 
    color: 'blue', 
    desc: 'Days building',
    verified: true,
  },
  typingTests: { 
    value: TYPING_STATS.testsCompleted, 
    label: 'Typing Tests', 
    color: 'cyan', 
    desc: 'Tests completed',
    verified: true,
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
