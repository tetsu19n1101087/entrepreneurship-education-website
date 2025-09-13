'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInWithPassword, signUp } from './auth';

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    await signInWithPassword(formData);
  } catch (error: any) {
    return { error: error.message || 'ログインに失敗しました' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    await signUp(formData);
  } catch (error: any) {
    return { error: error.message || '登録に失敗しました' };
  }

  revalidatePath('/', 'layout');
  redirect('/auth/check-email');
}
