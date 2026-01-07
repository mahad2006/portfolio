import type { Metadata } from 'next';
import MoreView from './MoreView';

export const metadata: Metadata = {
  title: 'More | Shaikh Mahad',
  description: 'Explore my tech stack, philosophy, writing, and more about my journey as a backend engineer.',
};

export default function MorePage() {
  return <MoreView />;
}
