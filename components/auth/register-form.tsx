'use client';

import type React from 'react';
import { createClient } from '@/lib/supabase/client';
import { useActionState } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { register } from '@/lib/action';
import Link from 'next/link';

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, {});
  const [error, setError] = useState<string | null>(null);

  async function loginWithGoogle(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const redirectTo =
      process.env.NEXT_PUBLIC_SITE_URL || // Set this to your site URL in production env.
      process.env.NEXT_PUBLIC_VERCEL_URL || // Automatically set by Vercel.
      'http://localhost:3000';

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      setError(error.message || 'Googleでの登録に失敗しました');
    }
  }

  return (
    <>
      <form className='space-y-3 mb-4' onSubmit={loginWithGoogle}>
        <Button type='submit' variant='outline' className='w-full'>
          Googleで登録
        </Button>
        <div className='text-xs text-center text-muted-foreground'>
          または（メール登録）
        </div>
        {error && (
          <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
            {error}
          </div>
        )}
      </form>
      <form action={formAction} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>氏名</Label>
          <Input id='name' name='name' placeholder='山田 太郎' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email'>メールアドレス</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='teacher@example.com'
            autoComplete='on'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='school'>学校名</Label>
          <Input id='school' name='school' placeholder='千葉市立○○小学校' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='schoolType'>学校種別</Label>
          <Select name='schoolType' required>
            <SelectTrigger>
              <SelectValue placeholder='学校種別を選択' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='elementary'>小学校</SelectItem>
              <SelectItem value='junior_high'>中学校</SelectItem>
              <SelectItem value='high_school'>高等学校</SelectItem>
              <SelectItem value='others'>その他</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='subject'>担当教科</Label>
          <Input id='subject' name='subject' placeholder='数学、国語など' />
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
        <Button type='submit' className='w-full' disabled={isPending}>
          {isPending ? '登録中...' : '登録'}
        </Button>
        <div className='text-center text-sm'>
          <span className='text-muted-foreground'>
            既にアカウントをお持ちの方は{' '}
          </span>
          <Link href='/auth/login' className='text-primary hover:underline'>
            ログイン
          </Link>
        </div>
      </form>
    </>
  );
}
