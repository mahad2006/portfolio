import WritingView from './WritingView';
import { generatePageMetadata } from '@/components/layout/pageMetadata';

export const metadata = generatePageMetadata('writing');

export default function WritingPage() {
  return <WritingView />;
}
