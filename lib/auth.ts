import { createClient } from '@/lib/supabase/server';

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
