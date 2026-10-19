'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/action';
import Link from 'next/link';
import { useActionState } from 'react';
import { LoginWithGoogle } from './google-auth';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, {});

  return (
    <div className='space-y-space-16'>
      <LoginWithGoogle />
      <div className='text-center text-body-xs text-muted-foreground'>
        または
      </div>
      <form action={formAction} className='space-y-space-16'>
        <div className='space-y-space-8'>
          <Label htmlFor='email'>メールアドレス</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='teacher@example.com'
            required
          />
        </div>

        <div className='space-y-space-8'>
          <Label htmlFor='password'>パスワード</Label>
          <Input id='password' name='password' type='password' required />
        </div>

        {state?.error && (
          <div className='rounded-md bg-destructive-subtle p-space-16 text-body-sm text-destructive'>
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

      <div className='text-center text-body-sm'>
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
