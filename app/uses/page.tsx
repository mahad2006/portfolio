import UsesView from './UsesView';
import { generatePageMetadata } from '@/components/layout/pageMetadata';

export const metadata = generatePageMetadata('uses');

export default function UsesPage() {
  return <UsesView />;
}
