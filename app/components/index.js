// Layout Components
export { Navbar } from './layout/Navbar';
export { Footer } from './layout/Footer';
export { default as ClientLayout } from './layout/ClientLayout';
export { PageShell } from './layout/PageShell';

// Section Components
export { Hero } from './sections/Hero';
export { About } from './sections/About';
export { Philosophy } from './sections/Philosophy';
export { Projects } from './sections/Projects';
export { Stack } from './sections/Stack';
export { Writing } from './sections/Writing';
export { Impact } from './sections/Impact';
export { Experience } from './sections/Experience';
export { Connect } from './sections/Connect';

// UI Components
export { ScrollToTop } from './ui/ScrollToTop';
export { default as SpotlightCard } from './ui/SpotlightCard';
export { default as ScrollProgressBar } from './ui/ScrollProgressBar';
export { CodeBlock } from './ui/CodeBlock';
export { MatrixRain } from './ui/MatrixRain';
export { default as CommandPalette } from './ui/CommandPalette';
export { Switch } from './ui/Switch';
export { ColorSwatch } from './ui/ColorSwatch';
export { ConfirmModal } from './ui/ConfirmModal';
export { PillButton } from './ui/PillButton';
export { ProjectRow } from './ui/ProjectRow';
export { ProjectStack } from './ui/ProjectStack';
export { TerminalBackButton } from './ui/TerminalBackButton';

// Provider Components
export { SystemProvider } from './providers/SystemProvider';
export { SoundProvider } from './providers/SoundProvider';

// Hooks (re-exported for convenience)
export { useSystem } from '@/hooks/useSystem';
export { useSound } from '@/hooks/useSound';

// System/Utility Components
export { JsonLd } from './system/JsonLd';
export { PrintStyles } from './system/PrintStyles';
export { BootScreen } from './system/BootScreen';
export { SystemDashboard } from './system/SystemDashboard';
export { SystemLogs } from './system/SystemLogs';
export { RequestLogger } from './system/RequestLogger';
export { ArchitectureDiagram } from './system/ArchitectureDiagram';
// Note: NetworkTopology is not exported here as it requires dynamic import with ssr: false
