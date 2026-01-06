import StatusView from './StatusView';
import { generatePageMetadata } from '@/components/layout/pageMetadata';

export const metadata = generatePageMetadata('status');

export default function StatusPage() {
  return <StatusView />;
}