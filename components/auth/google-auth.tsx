'use client';

import type React from 'react';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function LoginWithGoogle() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const redirectTo =
      process.env.NEXT_PUBLIC_SITE_URL || // Set this to your site URL in production env.
      process.env.NEXT_PUBLIC_VERCEL_URL || // Automatically set by Vercel.
      'http://localhost:3000';

    setIsPending(true);

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
      setError(error || 'Googleでの登録に失敗しました');
      setIsPending(false);
    }
  }

  return (
    <form className='space-y-3 mb-4' onSubmit={handleSubmit}>
      <Button type='submit' variant='outline' className='w-full'>
        {isPending ? 'ログイン中' : 'Googleでログイン'}
      </Button>
      {error && (
        <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
          {error}
        </div>
      )}
    </form>
  );
}
