import Link from 'next/link';
import { Logo } from './logo';

const footerLinks = [
  { href: '/terms', label: 'ご利用規約' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/contact', label: 'お問い合わせ' },
];

export function Footer() {
  return (
    <footer className='flex flex-col items-center gap-space-32 bg-inverse px-space-16 py-space-48'>
      <Link
        href='/'
        className='outline-offset-4 focus-visible:outline-2 focus-visible:outline-on-inverse'
      >
        <Logo surface='dark' />
      </Link>
      <nav aria-label='フッター'>
        <ul className='flex flex-wrap items-center justify-center gap-space-24'>
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='text-label-sm text-on-inverse underline underline-offset-4 outline-offset-4 focus-visible:outline-2 focus-visible:outline-on-inverse'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
