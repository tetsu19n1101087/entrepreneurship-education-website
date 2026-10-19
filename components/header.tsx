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
import { NotificationCenter } from './notification-center';

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
    <header className='border-b bg-card'>
      <div className='container mx-auto px-space-16 py-space-16'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-space-16'>
            <div className='flex h-10 w-10 items-center justify-center rounded-md bg-primary'>
              <span className='text-heading-md text-primary-foreground'>
                千
              </span>
            </div>
            <div>
              <h1 className='text-heading-lg text-foreground'>
                千葉県教育事例共有
              </h1>
              <p className='text-body-sm text-muted-foreground'>
                アントレプレナーシップ教育
              </p>
            </div>
          </Link>

          <div className='flex items-center gap-space-16'>
            {user ? (
              <>
                <Button variant='default' className='gap-space-8' asChild>
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
              <div className='flex items-center gap-space-8'>
                <Button variant='outline' asChild>
                  <Link href='/auth/login'>ログイン</Link>
                </Button>
                <Button asChild>
                  <Link href='/auth/register'>新規登録</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
