import StatsView from './StatsView';
import { generatePageMetadata } from '@/components/layout/pageMetadata';

export const metadata = generatePageMetadata('stats');

export default function StatsPage() {
  return <StatsView />;
}
