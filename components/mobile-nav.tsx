'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, PlusCircle } from 'lucide-react';
import Link from 'next/link';

type NavItem = { href: string; label: string };

// lg 未満でナビと投稿ボタンをまとめるメニュー。リンクを押したら閉じる
export function MobileNav({
  navItems,
  isLoggedIn,
}: {
  navItems: NavItem[];
  isLoggedIn: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='lg:hidden'>
          <Menu />
          <span className='sr-only'>メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>メニュー</SheetTitle>
          <SheetDescription className='sr-only'>
            サイト内のページへ移動します
          </SheetDescription>
        </SheetHeader>
        <nav aria-label='メイン' className='px-space-16'>
          <ul className='flex flex-col'>
            {navItems.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className='flex min-h-10 items-center py-space-8 text-label-md text-foreground outline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring'
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        {isLoggedIn && (
          <div className='px-space-16'>
            <SheetClose asChild>
              <Button asChild>
                <Link href='/post'>
                  <PlusCircle />
                  事例を投稿
                </Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
