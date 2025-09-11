'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'メールアドレスとパスワードを入力してください' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message || 'ログインに失敗しました' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function loginWithGoogle(): Promise<never> {
  const supabase = await createClient();
  const redirectTo =
    process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
    `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`;

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
    throw new Error(error.message || 'Googleログインに失敗しました');
  }

  // This should not be reached as OAuth redirects
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout(): Promise<never> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message || 'ログアウトに失敗しました');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export interface RegisterState {
  error?: string;
  success?: boolean;
}

export async function register(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const school = formData.get('school') as string;
  const schoolType = formData.get('schoolType') as string;
  const subject = formData.get('subject') as string;
  const yearsExperience = formData.get('yearsExperience') as string;

  if (!name || !email || !password || !schoolType) {
    return { error: '必須項目を入力してください' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`,
      data: {
        display_name: name,
        school_name: school,
        school_type: schoolType,
        subject: subject,
        years_experience: yearsExperience ? parseInt(yearsExperience) : null,
      },
    },
  });

  if (error) {
    console.error(error);
    return { error: error.message || '登録に失敗しました' };
  }

  revalidatePath('/', 'layout');
  redirect('/auth/check-email');
}
