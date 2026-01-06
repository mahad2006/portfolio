/**
 * Terminal Commands Configuration
 * 
 * Commands used by the Hero terminal and Command Palette.
 * 
 * Usage:
 *   import { HERO_COMMANDS } from '@/config/commands';
 */

import { ROUTES, SECTIONS } from './routes';
import { AUTHOR_NAME, AUTHOR_TITLE } from './site';

/**
 * Hero Terminal Commands
 * 
 * Each command has:
 * - text: Display text after command execution
 * - action: Optional callback function to execute
 * - isClear: Whether this is a clear command
 * - color: Optional text color class
 */
export const HERO_COMMANDS = {
  help: {
    text: `Available commands:
  about     - Brief bio
  projects  - View work
  stack     - Tech stack
  stats     - Performance metrics
  uses      - My dev setup
  status    - System health
  clear     - Clear terminal
  contact   - Get email
  matrix    - Toggle system reality
  sudo      - Admin privileges`,
  },
  whoami: {
    text: `${AUTHOR_NAME}. ${AUTHOR_TITLE}. I fix things you didn't know were broken.`,
  },
  about: {
    text: "Navigating to About section...",
    action: () => document.getElementById(SECTIONS.ABOUT)?.scrollIntoView({ behavior: 'smooth' }),
  },
  projects: {
    text: "Navigating to Projects section...",
    action: () => document.getElementById(SECTIONS.PROJECTS)?.scrollIntoView({ behavior: 'smooth' }),
  },
  stack: {
    text: "Navigating to Tech Stack...",
    action: () => document.getElementById(SECTIONS.STACK)?.scrollIntoView({ behavior: 'smooth' }),
  },
  contact: {
    text: "Opening comms channel...",
    action: () => document.getElementById(SECTIONS.CONNECT)?.scrollIntoView({ behavior: 'smooth' }),
  },
  stats: {
    text: "Loading telemetry dashboard...",
    action: () => { window.location.href = ROUTES.STATS; },
  },
  uses: {
    text: "Loading system configuration...",
    action: () => { window.location.href = ROUTES.USES; },
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

export default HERO_COMMANDS;
