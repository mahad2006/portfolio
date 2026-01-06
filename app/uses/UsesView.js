'use client';
import React from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { TYPING_STATS } from '@/data/profile';
import {
  ComputerDesktopIcon,
  CommandLineIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  ServerStackIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid';
import { 
  SiIntellijidea, 
  SiAndroidstudio, 
  SiGnometerminal,
  SiJetbrains,
  SiGithub,
  SiPostman,
  SiDocker,
  SiNotion,
  SiFigma,
  SiMonkeytype,
  SiObsidian,
  SiDbeaver
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { FaHeadphones, FaKeyboard } from 'react-icons/fa6';
import { BsMouse2Fill } from 'react-icons/bs';

// Hardware item component - MAIN CARD with spotlight (only for featured items)
const HardwareItem = ({ item, featured = false }) => {
  const content = (
    <div className="p-6">
      <div className="flex items-start gap-5">
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
          featured ? 'bg-primary/10' : 'bg-white/5'
        }`}>
          <item.icon className={`w-6 h-6 ${featured ? 'text-primary' : 'text-gray-400'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</span>
            {featured && (
              <span className="px-2 py-0.5 text-[10px] font-semibold text-primary bg-primary/10 rounded-full">
                Primary
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-white mb-2">{item.name}</h3>
          
          {item.note && (
            <p className="text-sm text-gray-500 mb-3">{item.note}</p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {item.specs.map((spec, i) => (
              <span key={i} className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-400">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Only featured hardware items get spotlight effect
  if (featured) {
    return (
      <SpotlightCard className="rounded-xl bg-surface border border-primary/30 transition-colors">
        {content}
      </SpotlightCard>
    );
  }

  return (
    <div className="rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-colors">
      {content}
    </div>
  );
};

// Tool card component - basic card, NO spotlight, arrow gray -> accent on hover
const ToolCard = ({ name, category, desc, link, icon: Icon }) => (
  <div className="p-5 h-full rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block">{category}</span>
          <h3 className="text-sm font-semibold text-white">{name}</h3>
        </div>
      </div>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group p-1.5 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors"
        >
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary transition-colors" />
        </a>
      )}
    </div>
    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// Tech stack category - basic card, NO spotlight
const StackCategory = ({ icon: Icon, title, techs }) => (
  <div className="p-5 rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-colors">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-primary" />
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {techs.map((tech, i) => (
        <span key={i} className="px-3 py-1.5 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

export default function UsesPage() {
  const hardware = [
    {
      name: 'Dell Latitude 7420',
      category: 'Workstation',
      icon: ComputerDesktopIcon,
      specs: ['i7-1185G7', '32GB RAM', '512GB NVMe', '14" FHD'],
      note: 'Handles Docker, IntelliJ, and Android Studio simultaneously without breaking a sweat.',
      featured: true
    },
    {
      name: 'Mechanical Keyboard',
      category: 'Input',
      icon: FaKeyboard,
      specs: ['Tactile Switches', 'N-Key Rollover', `${TYPING_STATS.personalBests[60].wpm} WPM tested`],
      note: 'The tactile feedback helps maintain typing rhythm during long coding sessions.',
      featured: true
    },
    {
      name: 'HP 435 Wireless Mouse',
      category: 'Input',
      icon: BsMouse2Fill,
      specs: ['2.4 GHz + Bluetooth', 'Multi-Device', 'Ergonomic']
    },
    {
      name: 'HyperX Cloud Alpha',
      category: 'Audio',
      icon: FaHeadphones,
      specs: ['Dual Chamber', 'Memory Foam', 'Noise Isolating'],
      note: 'Essential for deep focus. The noise isolation helps get into flow state faster.'
    }
  ];

  const development = [
    { name: 'IntelliJ IDEA Ultimate', category: 'IDE', desc: 'Primary IDE for Java/Spring Boot. The refactoring tools are unmatched.', link: 'https://www.jetbrains.com/idea/', icon: SiIntellijidea },
    { name: 'Android Studio', category: 'IDE', desc: 'Kotlin and native Android development with Jetpack Compose.', link: 'https://developer.android.com/studio', icon: SiAndroidstudio },
    { name: 'VS Code', category: 'Editor', desc: 'Frontend work, quick edits, and this portfolio. Lightning fast.', link: 'https://code.visualstudio.com/', icon: VscCode },
    { name: 'Windows Terminal', category: 'Terminal', desc: 'Git Bash with oh-my-posh for a clean command line experience.', icon: SiGnometerminal },
    { name: 'JetBrains Mono', category: 'Font', desc: 'Clean ligatures that make code more readable.', link: 'https://www.jetbrains.com/lp/mono/', icon: SiJetbrains },
    { name: 'Catppuccin', category: 'Theme', desc: 'Consistent color scheme across all editors. Easy on the eyes.', link: 'https://catppuccin.com/', icon: CodeBracketIcon }
  ];

  const tools = [
    { name: 'Git + GitHub', category: 'VCS', desc: 'Version control for everything.', link: 'https://github.com/mahad2006', icon: SiGithub },
    { name: 'Postman', category: 'API', desc: 'REST API testing and documentation.', link: 'https://postman.com', icon: SiPostman },
    { name: 'DBeaver', category: 'Database', desc: 'PostgreSQL management and queries.', link: 'https://dbeaver.io', icon: SiDbeaver },
    { name: 'Docker Desktop', category: 'DevOps', desc: 'Containerized development environments.', link: 'https://docker.com', icon: SiDocker },
    { name: 'Notion', category: 'Docs', desc: 'Project planning and technical notes.', link: 'https://notion.so', icon: SiNotion },
    { name: 'Figma', category: 'Design', desc: 'UI prototyping before implementation.', link: 'https://figma.com', icon: SiFigma },
    { name: 'Obsidian', category: 'Notes', desc: 'DSA notes and system design patterns.', link: 'https://obsidian.md', icon: SiObsidian },
    { name: 'MonkeyType', category: 'Practice', desc: 'Daily typing speed maintenance.', link: 'https://monkeytype.com', icon: SiMonkeytype }
  ];

  const stack = [
    { icon: ServerStackIcon, title: 'Backend', techs: ['Java 17+', 'Spring Boot 3.x', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'] },
    { icon: CodeBracketIcon, title: 'Frontend', techs: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS'] },
    { icon: DevicePhoneMobileIcon, title: 'Mobile', techs: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Retrofit'] },
    { icon: AcademicCapIcon, title: 'Fundamentals', techs: ['C++', 'DSA', 'System Design', 'OOP'] }
  ];

  return (
    <PageTemplate
      title={<>My<span className="text-primary">_</span>Setup</>}
      description="Hardware, software, and tools I use daily"
      headerTag="USES"
      maxWidth="content"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          HARDWARE - Featured items get spotlight
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <ComputerDesktopIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-white">Hardware</h2>
        </div>
        
        <div className="space-y-4">
          {hardware.map((item, idx) => (
            <HardwareItem key={idx} item={item} featured={item.featured} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DEVELOPMENT ENVIRONMENT - Basic cards, no spotlight
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <CommandLineIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-white">Development Environment</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {development.map((tool, idx) => (
            <ToolCard key={idx} {...tool} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TOOLS - Basic cards, no spotlight
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <WrenchScrewdriverIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-white">Tools & Utilities</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, idx) => (
            <ToolCard key={idx} {...tool} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TECH STACK - Basic cards, no spotlight
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <CodeBracketIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-white">Tech Stack</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stack.map((category, idx) => (
            <StackCategory key={idx} {...category} />
          ))}
        </div>
      </section>

      {/* Note */}
      <div className="p-5 rounded-xl bg-surface border border-white/10">
        <p className="text-xs text-gray-500">
          This setup evolves as I optimize for productivity. I don&apos;t chase trends — I invest in tools that reduce friction and increase focus.
        </p>
      </div>
    </PageTemplate>
  );
}
