import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/action';
import type { Profile } from '@/lib/definitions';
import { createClient } from '@/lib/supabase/server';
import { LogOut, PlusCircle, Settings, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { NotificationCenter } from './notification-center';

const navItems = [
  { href: '/cases', label: '事例を探す' },
  { href: '/teachers', label: '教員を探す' },
];

export async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  };

  const profile: Profile | null = user ? await fetchProfile(user.id) : null;

  return (
    <header className='px-space-16 py-space-16 lg:p-space-32'>
      <div className='flex items-center justify-between gap-space-16'>
        <div className='flex items-center gap-space-32'>
          <Link
            href='/'
            className='shrink-0 outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring'
          >
            <Logo />
          </Link>
          <nav aria-label='メイン' className='hidden lg:block'>
            <ul className='flex items-center gap-space-32'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='text-label-md text-foreground outline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='flex items-center gap-space-16'>
          {user ? (
            <>
              <Button className='hidden lg:inline-flex' asChild>
                <Link href='/post'>
                  <PlusCircle className='h-4 w-4' />
                  事例を投稿
                </Link>
              </Button>

              <NotificationCenter />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='icon'>
                    <Avatar className='h-6 w-6'>
                      <AvatarFallback className='text-body-xs'>
                        {profile?.display_name?.charAt(0) ||
                          user?.email?.charAt(0) ||
                          'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <div className='px-space-8 py-space-8'>
                    <p className='text-label-md'>
                      {profile?.display_name || user?.email}
                    </p>
                    <p className='text-body-xs text-muted-foreground'>
                      {profile?.school_name}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className='mr-space-8 h-4 w-4' />
                    プロフィール
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='mr-space-8 h-4 w-4' />
                    設定
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={logout}>
                      <button
                        type='submit'
                        className='flex w-full items-center gap-space-8 text-left'
                      >
                        <LogOut className='mr-space-8 h-4 w-4' />
                        ログアウト
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link href='/auth/login'>ログイン</Link>
            </Button>
          )}

          <MobileNav navItems={navItems} isLoggedIn={!!user} />
        </div>
      </div>
    </header>
  );
}
