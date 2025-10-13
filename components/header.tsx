import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { NotificationCenter } from './notification-center';
import Link from 'next/link';
import { logout } from '@/lib/action';
import type { Profile } from '@/lib/definitions';

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
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-4'>
            <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
              <span className='text-primary-foreground font-bold text-lg'>
                千
              </span>
            </div>
            <div>
              <h1 className='font-bold text-xl text-foreground'>
                千葉県教育事例共有
              </h1>
              <p className='text-sm text-muted-foreground'>
                アントレプレナーシップ教育
              </p>
            </div>
          </Link>

          <div className='flex items-center gap-3'>
            {user ? (
              <>
                <Button variant='default' className='gap-2' asChild>
                  <Link href='/post'>
                    <PlusCircle className='w-4 h-4' />
                    事例を投稿
                  </Link>
                </Button>

                <NotificationCenter />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                      <Avatar className='w-6 h-6'>
                        <AvatarFallback className='text-xs'>
                          {profile?.display_name?.charAt(0) ||
                            user?.email?.charAt(0) ||
                            'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-56'>
                    <div className='px-2 py-1.5'>
                      <p className='text-sm font-medium'>
                        {profile?.display_name || user?.email}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {profile?.school_name}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className='w-4 h-4 mr-2' />
                      プロフィール
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className='w-4 h-4 mr-2' />
                      設定
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <form action={logout}>
                        <button type="submit" className="w-full text-left flex items-center gap-2">
                          <LogOut className='w-4 h-4 mr-2' />
                          ログアウト
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className='flex items-center gap-2'>
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
