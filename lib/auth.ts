import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function signInWithPassword(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    throw new Error('メールアドレスとパスワードを入力してください');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || 'ログインに失敗しました');
  }
}

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const school = formData.get('school') as string;
  const schoolType = formData.get('schoolType') as string;
  const subject = formData.get('subject') as string;
  const yearsExperience = formData.get('yearsExperience') as string;

  if (!name || !email || !password || !schoolType) {
    throw new Error('必須項目を入力してください');
  }

  // 確認メールのリンクは、登録したときのオリジン（本番・Preview・ローカル）に戻す
  const origin = (await headers()).get('origin');
  if (!origin) {
    throw new Error('登録に失敗しました');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: origin,
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
    throw new Error(error.message || '登録に失敗しました');
  }
}
