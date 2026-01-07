// Layout Components
export { Navbar } from './layout/Navbar';
export { Footer } from './layout/Footer';
export { default as ClientLayout } from './layout/ClientLayout';
export { PageShell } from './layout/PageShell';
export { PageTemplate } from './layout/PageTemplate';
export { generatePageMetadata, generateProjectMetadata, generateWritingMetadata } from './layout/pageMetadata';

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
export { MatrixRain } from './ui/MatrixRain';
export { default as CommandPalette } from './ui/CommandPalette';
export { Switch } from './ui/Switch';
export { ColorSwatch } from './ui/ColorSwatch';
export { ConfirmModal } from './ui/ConfirmModal';
export { PillButton } from './ui/PillButton';
export { ProjectRow } from './ui/ProjectRow';
export { ProjectStack } from './ui/ProjectStack';
export { TerminalBackButton } from './ui/TerminalBackButton';
export { AnimatedCounter } from './ui/AnimatedCounter';

// Provider Components
export { SystemProvider } from './providers/SystemProvider';

// Hooks (re-exported for convenience)
export { useSystem } from '@/hooks/useSystem';

// System/Utility Components
export { JsonLd } from './system/JsonLd';
export { PrintStyles } from './system/PrintStyles';
export { BootScreen } from './system/BootScreen';
export { RequestLogger } from './system/RequestLogger';
// Note: NetworkTopology requires dynamic import with ssr: false
