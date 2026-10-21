import { ComingSoon } from '@/components/coming-soon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
};

export default function Page() {
  return <ComingSoon title='お問い合わせ' />;
}
