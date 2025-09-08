'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithGoogle();
    } catch (error: any) {
      setError(error.message || 'Googleログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold text-blue-900'>
            ログイン
          </CardTitle>
          <CardDescription>
            千葉県アントレプレナーシップ教育事例共有プラットフォーム
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={handleGoogle}
              disabled={isLoading}
            >
              Googleでログイン
            </Button>
            <div className='text-xs text-center text-muted-foreground'>
              または
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4 mt-3'>
            <div className='space-y-2'>
              <Label htmlFor='email'>メールアドレス</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='teacher@example.com'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>パスワード</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
                {error}
              </div>
            )}
            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}
              variant='secondary'
            >
              {isLoading ? 'ログイン中...' : 'メール/パスワードでログイン'}
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            アカウントをお持ちでない方は{' '}
            <Link
              href='/auth/register'
              className='text-blue-600 hover:underline'
            >
              新規登録
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
