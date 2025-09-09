'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { login, loginWithGoogle } from '@/lib/action';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, {});

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-3'>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          onClick={handleGoogleLogin}
          disabled={isPending}
        >
          Googleでログイン
        </Button>
        <div className='text-xs text-center text-muted-foreground'>または</div>
      </div>

      <form action={formAction} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>メールアドレス</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='teacher@example.com'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>パスワード</Label>
          <Input id='password' name='password' type='password' required />
        </div>

        {state?.error && (
          <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
            {state.error}
          </div>
        )}

        <Button
          type='submit'
          className='w-full'
          disabled={isPending}
          variant='secondary'
        >
          {isPending ? 'ログイン中...' : 'メール/パスワードでログイン'}
        </Button>
      </form>

      <div className='text-center text-sm'>
        <span className='text-muted-foreground'>
          アカウントをお持ちでない方は{' '}
        </span>
        <Link href='/auth/register' className='text-primary hover:underline'>
          新規登録
        </Link>
      </div>
    </div>
  );
}
