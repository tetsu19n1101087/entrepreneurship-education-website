import { ComingSoon } from '@/components/coming-soon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
};

export default function Page() {
  return <ComingSoon title='プライバシーポリシー' />;
}
