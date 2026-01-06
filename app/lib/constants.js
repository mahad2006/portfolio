// Navigation Links
export const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Stack', id: 'stack' },
  { label: 'Writing', id: 'writing' },
];

// Social Links
export const SOCIAL_LINKS = {
  linkedin: {
    url: 'https://www.linkedin.com/in/codewithmahad',
    label: 'LinkedIn',
    display: '/in/codewithmahad',
  },
  github: {
    url: 'https://github.com/mahad2006',
    label: 'GitHub',
    display: '@mahad2006',
  },
  leetcode: {
    url: 'https://leetcode.com/u/mahad2006/',
    label: 'LeetCode',
    display: '/u/mahad2006',
  },
  codolio: {
    url: 'https://codolio.com/profile/codewithmahad',
    label: 'Codolio',
    display: '/profile/codewithmahad',
  },
};

// Contact Information
export const CONTACT_INFO = {
  email: 'codewithmahad@gmail.com',
  formspreeId: 'meeonyao',
};

// Hero Terminal Commands
export const HERO_COMMANDS = {
  help: {
    text: "Available commands:\n  about     - Brief bio\n  projects  - View work\n  stack     - Tech stack\n  stats     - Performance metrics\n  uses      - My dev setup\n  status    - System health\n  clear     - Clear terminal\n  contact   - Get email\n  matrix    - Toggle system reality\n  sudo      - Admin privileges",
  },
  whoami: {
    text: "Shaikh Mahad. Backend Systems Engineer. I fix things you didn't know were broken.",
  },
  about: {
    text: "Navigating to About section...",
    action: () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }),
  },
  projects: {
    text: "Navigating to Projects section...",
    action: () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }),
  },
  stack: {
    text: "Navigating to Tech Stack...",
    action: () => document.getElementById('stack').scrollIntoView({ behavior: 'smooth' }),
  },
  contact: {
    text: "Opening comms channel...",
    action: () => document.getElementById('connect').scrollIntoView({ behavior: 'smooth' }),
  },
  stats: {
    text: "Loading telemetry dashboard...",
    action: () => window.location.href = '/stats',
  },
  uses: {
    text: "Loading system configuration...",
    action: () => window.location.href = '/uses',
  },
  status: {
    text: "Checking system health...",
    action: () => window.location.href = '/status',
  },
  matrix: {
    text: "Rerouting neural pathways...",
    action: (toggleMatrix) => toggleMatrix(),
  },
  clear: {
    text: "",
    isClear: true,
  },
  sudo: {
    text: "Permission denied: You are not in the sudoers file. This incident will be reported.",
    color: "text-red-500",
  },
  fetch: {
    text: "System: Portfolio v2.0\nKernel: React 19.0.0\nUptime: 100%\nShell: next-sh\nResolution: Production Ready\nUI: Tailwind 4.0",
  },
  neofetch: {
    text: "System: Portfolio v2.0\nKernel: React 19.0.0\nUptime: 100%\nShell: next-sh\nResolution: Production Ready\nUI: Tailwind 4.0",
  },
  ls: {
    text: "total 42\ndrwxr-xr-x  about/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  experience/\n-rw-r--r--  resume.pdf\n-rw-r--r--  secret_key.gpg",
  },
  'sudo rm -rf /': {
    text: "Nice try. I have backups.",
    color: "text-red-500",
  },
};

// Command Palette Commands
export const COMMAND_PALETTE_GROUPS = [
  {
    title: 'Navigate',
    commands: [
      { id: 'home', label: 'Home', sectionId: 'hero' },
      { id: 'about', label: 'About', sectionId: 'about' },
      { id: 'projects', label: 'Projects', sectionId: 'projects' },
      { id: 'stack', label: 'Tech Stack', sectionId: 'stack' },
      { id: 'writing', label: 'Writing', sectionId: 'writing' },
      { id: 'connect', label: 'Contact', sectionId: 'connect' },
    ],
  },
];

// Site Metadata
export const SITE_METADATA = {
  name: 'Shaikh Mahad',
  url: 'https://shaikhmahad.vercel.app',
  jobTitle: 'Backend Systems Engineer',
  email: 'codewithmahad@gmail.com',
};

