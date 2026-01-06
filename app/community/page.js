import CommunityView from './CommunityView';
import { generatePageMetadata } from '@/components/layout/pageMetadata';

export const metadata = generatePageMetadata('community');

export default function CommunityPage() {
  return <CommunityView />;
}