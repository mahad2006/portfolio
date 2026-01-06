'use client';

/**
 * Project Visuals - Type-specific visual components for project detail pages
 * 
 * Includes:
 * - Phone mockups for mobile apps
 * - Architecture diagrams for backend/system projects
 * - Documentation visualization for docs projects
 * - Placeholder graphics when no image available
 */

// ============================================================================
// Phone Mockup Component - For Mobile App Projects
// ============================================================================

export const PhoneMockup = ({ screenName, description, accentColor = 'var(--color-primary)', children }) => (
  <div className="relative mx-auto" style={{ width: '180px' }}>
    {/* Phone Frame */}
    <div className="relative bg-neutral-900 rounded-[2rem] p-2 shadow-2xl shadow-black/50 border border-white/10">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-neutral-900 rounded-b-2xl z-10 flex items-center justify-center">
        <div className="w-12 h-3 bg-black rounded-full" />
      </div>
      
      {/* Screen */}
      <div className="relative bg-black rounded-[1.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-between px-6 pt-2">
          <span className="text-[8px] text-white/60">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </div>
        </div>
        
        {/* Screen Content */}
        <div className="absolute inset-0 pt-8 flex flex-col">
          {children || (
            <DefaultScreenContent screenName={screenName} accentColor={accentColor} />
          )}
        </div>
      </div>
    </div>
    
    {/* Screen Label */}
    {screenName && (
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-white">{screenName}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
    )}
  </div>
);

// Default screen content generator
const DefaultScreenContent = ({ screenName, accentColor }) => {
  const screens = {
    'Home': (
      <div className="flex-1 p-4 flex flex-col">
        <div className="h-4 w-20 rounded" style={{ backgroundColor: accentColor }} />
        <div className="mt-4 space-y-2">
          <div className="h-8 bg-white/5 rounded-lg" />
          <div className="h-8 bg-white/5 rounded-lg" />
        </div>
        <div className="mt-auto">
          <div className="h-10 rounded-lg" style={{ backgroundColor: `${accentColor}30` }} />
        </div>
      </div>
    ),
    'Solution': (
      <div className="flex-1 p-4 flex flex-col">
        <div className="h-3 w-16 bg-white/20 rounded mb-4" />
        <div className="flex-1 space-y-3">
          <div className="p-2 bg-white/5 rounded-lg">
            <div className="h-2 w-full bg-white/10 rounded mb-1" />
            <div className="h-2 w-3/4 bg-white/10 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
            <div className="h-2 flex-1 bg-white/10 rounded" />
          </div>
          <div className="p-2 bg-white/5 rounded-lg">
            <div className="h-2 w-full bg-white/10 rounded mb-1" />
            <div className="h-2 w-2/3 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    ),
    'Graph': (
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1 relative border border-white/10 rounded-lg overflow-hidden">
          {/* Axes */}
          <div className="absolute bottom-4 left-4 right-4 h-px bg-white/20" />
          <div className="absolute bottom-4 left-4 top-4 w-px bg-white/20" />
          {/* Curve */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M 10 80 Q 30 20 50 50 T 90 30" 
              fill="none" 
              stroke={accentColor} 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-[8px]">+</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-[8px]">−</span>
          </div>
        </div>
      </div>
    ),
    'Quiz': (
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <div className="w-full p-4 bg-white/5 rounded-xl mb-4">
          <div className="h-2 w-full bg-white/10 rounded mb-2" />
          <div className="h-2 w-3/4 bg-white/10 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center">
            <span className="text-green-400 text-lg">✓</span>
          </div>
          <div className="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center">
            <span className="text-red-400 text-lg">✗</span>
          </div>
        </div>
      </div>
    ),
    'Score': (
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center mb-4" style={{ borderColor: accentColor }}>
          <span className="text-2xl font-bold text-white">85%</span>
        </div>
        <div className="text-center">
          <div className="h-2 w-20 bg-white/20 rounded mx-auto mb-2" />
          <div className="h-2 w-16 bg-white/10 rounded mx-auto" />
        </div>
      </div>
    ),
    'Chat List': (
      <div className="flex-1 p-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 mb-1">
            <div className="w-10 h-10 rounded-full bg-white/10" />
            <div className="flex-1">
              <div className="h-2 w-20 bg-white/20 rounded mb-1" />
              <div className="h-1.5 w-28 bg-white/10 rounded" />
            </div>
            <div className="text-[8px] text-white/40">2m</div>
          </div>
        ))}
      </div>
    ),
    'Messages': (
      <div className="flex-1 p-3 flex flex-col">
        <div className="flex-1 space-y-2">
          <div className="flex justify-start">
            <div className="max-w-[70%] p-2 bg-white/10 rounded-xl rounded-tl-sm">
              <div className="h-1.5 w-24 bg-white/30 rounded" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[70%] p-2 rounded-xl rounded-tr-sm" style={{ backgroundColor: `${accentColor}40` }}>
              <div className="h-1.5 w-20 bg-white/30 rounded" />
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[70%] p-2 bg-white/10 rounded-xl rounded-tl-sm">
              <div className="h-1.5 w-32 bg-white/30 rounded" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-8 bg-white/5 rounded-full" />
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
      </div>
    ),
    'Progress': (
      <div className="flex-1 p-4">
        <div className="h-3 w-24 bg-white/20 rounded mb-4" />
        <div className="space-y-3">
          {[80, 65, 90, 45].map((val, i) => (
            <div key={i}>
              <div className="flex justify-between text-[8px] text-white/40 mb-1">
                <span>Topic {i + 1}</span>
                <span>{val}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${val}%`, backgroundColor: accentColor }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    'Profile': (
      <div className="flex-1 p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white/10 mb-3" />
        <div className="h-3 w-20 bg-white/20 rounded mb-1" />
        <div className="h-2 w-16 bg-white/10 rounded mb-4" />
        <div className="w-full space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
              <div className="w-5 h-5 rounded bg-white/10" />
              <div className="h-2 flex-1 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    ),
  };
  
  return screens[screenName] || screens['Home'];
};

// Phone Mockups Gallery for Mobile Apps
export const PhoneMockupGallery = ({ screens = [], accentColor }) => (
  <div className="py-8">
    <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-8 flex items-center gap-2">
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      App Screens
    </h3>
    <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
      {screens.map((screen, i) => (
        <PhoneMockup 
          key={i}
          screenName={screen.name}
          description={screen.desc}
          accentColor={accentColor}
        />
      ))}
    </div>
  </div>
);

// ============================================================================
// Architecture Diagram Component - For Backend/System Projects
// ============================================================================

export const ArchitectureDiagram = ({ title, components = [], projectType = 'backend' }) => {
  const layouts = {
    'backend': {
      positions: [
        { x: 50, y: 10 },   // Client
        { x: 50, y: 30 },   // API Gateway
        { x: 25, y: 50 },   // Service 1
        { x: 50, y: 50 },   // Service 2
        { x: 75, y: 50 },   // Service 3
        { x: 35, y: 75 },   // Cache
        { x: 65, y: 75 },   // Database
      ],
      connections: [
        [0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 6], [4, 6], [5, 6]
      ]
    },
    'system-design': {
      positions: [
        { x: 20, y: 30 },   // App
        { x: 50, y: 30 },   // Cache
        { x: 80, y: 30 },   // DB
        { x: 50, y: 70 },   // Pub/Sub
      ],
      connections: [
        [0, 1], [1, 2], [0, 2], [1, 3], [2, 3]
      ]
    }
  };
  
  const layout = layouts[projectType] || layouts['backend'];
  const displayComponents = components.slice(0, layout.positions.length);
  
  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        {title || 'System Architecture'}
      </h3>
      
      <div className="relative h-64 bg-black/30 rounded-xl overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Connection Lines */}
          {layout.connections.map(([from, to], i) => {
            const fromPos = layout.positions[from];
            const toPos = layout.positions[to];
            if (!fromPos || !toPos) return null;
            return (
              <line
                key={i}
                x1={fromPos.x}
                y1={fromPos.y + 4}
                x2={toPos.x}
                y2={toPos.y - 4}
                stroke="var(--color-primary)"
                strokeWidth="0.3"
                strokeOpacity="0.4"
                strokeDasharray="2,1"
              />
            );
          })}
          
          {/* Component Boxes */}
          {displayComponents.map((comp, i) => {
            const pos = layout.positions[i];
            if (!pos) return null;
            return (
              <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                <rect
                  x="-12"
                  y="-4"
                  width="24"
                  height="8"
                  rx="1"
                  fill="var(--color-primary)"
                  fillOpacity="0.15"
                  stroke="var(--color-primary)"
                  strokeWidth="0.3"
                  strokeOpacity="0.5"
                />
                <text
                  x="0"
                  y="0.5"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="2.5"
                  fontFamily="monospace"
                >
                  {comp.length > 12 ? comp.slice(0, 10) + '..' : comp}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] text-gray-500">
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <span>Component</span>
          <div className="w-4 h-px bg-primary/50 ml-2" />
          <span>Data Flow</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Documentation Visual - For Documentation Projects
// ============================================================================

export const DocumentationVisual = ({ sections = [], title }) => (
  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
    <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {title || 'Content Overview'}
    </h3>
    
    <div className="relative h-48 bg-black/30 rounded-xl overflow-hidden p-4">
      {/* Tree Structure */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-white/10 pr-4 space-y-2">
          {sections.slice(0, 5).map((section, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-gray-400 truncate">{section.title}</span>
              <span className="text-primary/60 ml-auto">{section.count}</span>
            </div>
          ))}
        </div>
        
        {/* Content Preview */}
        <div className="flex-1 pl-4 space-y-3">
          <div className="h-3 w-3/4 bg-white/10 rounded" />
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-white/5 rounded" />
            <div className="h-2 w-5/6 bg-white/5 rounded" />
            <div className="h-2 w-4/6 bg-white/5 rounded" />
          </div>
          <div className="mt-4 p-2 bg-primary/10 border border-primary/20 rounded">
            <div className="h-2 w-1/2 bg-primary/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// Placeholder Visual - Generic placeholder when no specific visual
// ============================================================================

export const PlaceholderVisual = ({ title, type = 'backend' }) => {
  const icons = {
    'backend': (
      <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    'mobile-app': (
      <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    'system-design': (
      <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    'documentation': (
      <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'console': (
      <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };
  
  return (
    <div className="h-48 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] flex flex-col items-center justify-center">
      {icons[type] || icons['backend']}
      <p className="mt-4 text-xs text-gray-500 font-mono">{title || 'Project Visualization'}</p>
    </div>
  );
};

// ============================================================================
// App Features Grid - For Mobile Apps
// ============================================================================

export const AppFeaturesGrid = ({ features = [] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {features.map((feature, i) => (
      <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center hover:border-primary/30 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xs text-gray-400">{feature}</p>
      </div>
    ))}
  </div>
);

// ============================================================================
// Terminal Mockup - For Console/CLI Projects
// ============================================================================

// Terminal data for each console project
const TERMINAL_DATA = {
  'snake-game-cpp': {
    title: 'Snake Game - C++',
    lines: [
      { type: 'command', text: '$ g++ snake.cpp -o snake && ./snake' },
      { type: 'output', text: '' },
      { type: 'output', text: '╔════════════════════════════════════╗' },
      { type: 'output', text: '║         🐍 SNAKE GAME 🐍           ║' },
      { type: 'output', text: '╠════════════════════════════════════╣' },
      { type: 'output', text: '║                                    ║' },
      { type: 'output', text: '║       ████████                     ║' },
      { type: 'output', text: '║              ██                    ║' },
      { type: 'output', text: '║              ██████  ●             ║' },
      { type: 'output', text: '║                                    ║' },
      { type: 'output', text: '╚════════════════════════════════════╝' },
      { type: 'success', text: 'Score: 45  |  High Score: 120' },
    ]
  },
  'word-guess-cpp': {
    title: 'Word Guess Game - C++',
    lines: [
      { type: 'command', text: '$ ./word_guess' },
      { type: 'output', text: '' },
      { type: 'output', text: '  ╭─────────────────────────╮' },
      { type: 'output', text: '  │   WORD GUESS GAME 🎯   │' },
      { type: 'output', text: '  ╰─────────────────────────╯' },
      { type: 'output', text: '' },
      { type: 'output', text: '     ┌───┐' },
      { type: 'output', text: '     │   O' },
      { type: 'output', text: '     │  /|\\' },
      { type: 'output', text: '     │' },
      { type: 'output', text: '    ═╧═' },
      { type: 'output', text: '' },
      { type: 'success', text: 'Word: P R O G R _ M M _ N G' },
      { type: 'output', text: 'Guessed: A, E, I, O' },
    ]
  },
  'book-management-cpp': {
    title: 'Library Management System - C++',
    lines: [
      { type: 'command', text: '$ ./library_system' },
      { type: 'output', text: '' },
      { type: 'output', text: '╔══════════════════════════════════════╗' },
      { type: 'output', text: '║    📚 LIBRARY MANAGEMENT SYSTEM 📚   ║' },
      { type: 'output', text: '╠══════════════════════════════════════╣' },
      { type: 'output', text: '║  1. Add New Book                     ║' },
      { type: 'output', text: '║  2. Search Books                     ║' },
      { type: 'output', text: '║  3. Issue Book                       ║' },
      { type: 'output', text: '║  4. Return Book                      ║' },
      { type: 'output', text: '║  5. View All Books                   ║' },
      { type: 'output', text: '║  6. Exit                             ║' },
      { type: 'output', text: '╚══════════════════════════════════════╝' },
      { type: 'success', text: 'Enter choice: _' },
    ]
  },
  'sorting-visualizer-cpp': {
    title: 'Sorting Visualizer - C++',
    lines: [
      { type: 'command', text: '$ ./sort_viz --algo=quicksort' },
      { type: 'output', text: '' },
      { type: 'output', text: '  Sorting: Quick Sort  |  n=15' },
      { type: 'output', text: '' },
      { type: 'output', text: '  █' },
      { type: 'output', text: '  ██' },
      { type: 'output', text: '  ███    █' },
      { type: 'output', text: '  ████   ██' },
      { type: 'output', text: '  █████  ███   █' },
      { type: 'output', text: '  ██████ ████  ██   █' },
      { type: 'output', text: '  ███████████████████████' },
      { type: 'output', text: '' },
      { type: 'success', text: 'Comparisons: 34  |  Swaps: 12  |  O(n log n)' },
    ]
  },
  'grade-manager-cpp': {
    title: 'Grade Manager - C++',
    lines: [
      { type: 'command', text: '$ ./grade_manager' },
      { type: 'output', text: '' },
      { type: 'output', text: '┌────────────────────────────────────┐' },
      { type: 'output', text: '│    📊 STUDENT GRADE MANAGER 📊    │' },
      { type: 'output', text: '├────────────────────────────────────┤' },
      { type: 'output', text: '│ Course          Credits   Grade   │' },
      { type: 'output', text: '├────────────────────────────────────┤' },
      { type: 'output', text: '│ Programming       3        A      │' },
      { type: 'output', text: '│ Data Structures   3        A-     │' },
      { type: 'output', text: '│ Calculus          4        B+     │' },
      { type: 'output', text: '├────────────────────────────────────┤' },
      { type: 'success', text: '│ CGPA: 3.67  |  Total Credits: 10  │' },
      { type: 'output', text: '└────────────────────────────────────┘' },
    ]
  },
};

export const TerminalMockup = ({ slug, title, lines = [] }) => {
  // Get terminal data from slug or use provided props
  const terminalConfig = slug ? TERMINAL_DATA[slug] : null;
  const displayTitle = terminalConfig?.title || title || 'Terminal';
  const displayLines = terminalConfig?.lines || (lines.length > 0 ? lines : [
    { type: 'command', text: '$ ./program' },
    { type: 'output', text: 'Initializing...' },
    { type: 'output', text: 'Ready!' },
  ]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Terminal Window */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
        {/* Title Bar */}
        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-3">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {/* Title */}
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400 font-mono">{displayTitle}</span>
          </div>
          <div className="w-14" /> {/* Spacer for centering */}
        </div>
        
        {/* Terminal Body */}
        <div className="bg-neutral-950 p-6 font-mono text-sm min-h-[200px]">
          {displayLines.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === 'command' ? (
                <span className="text-green-400">{line.text}</span>
              ) : line.type === 'error' ? (
                <span className="text-red-400">{line.text}</span>
              ) : line.type === 'success' ? (
                <span className="text-primary">{line.text}</span>
              ) : (
                <span className="text-gray-400">{line.text}</span>
              )}
            </div>
          ))}
          {/* Blinking Cursor */}
          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Export All
// ============================================================================

export default {
  PhoneMockup,
  PhoneMockupGallery,
  ArchitectureDiagram,
  DocumentationVisual,
  PlaceholderVisual,
  AppFeaturesGrid,
  TerminalMockup,
};
