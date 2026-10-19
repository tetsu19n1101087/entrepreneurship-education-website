import { Header } from '@/components/header';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import type React from 'react';
import './globals.css';

// 太さは 400 と 700 だけ（DESIGN.md の Typography）。CSS 変数は app/globals.css と app/tokens.css で使う
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
});

// 日本語は文字数が多く、unicode-range で必要な分だけ読み込まれるので preload しない
const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  preload: false,
});

export const metadata: Metadata = {
  title: '千葉県アントレプレナーシップ教育事例共有プラットフォーム',
  description:
    '千葉県の小中高教員がアントレプレナーシップ教育の実践事例を共有するためのプラットフォーム',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 flex flex-col'>{children}</main>
      </body>
    </html>
  );
}
