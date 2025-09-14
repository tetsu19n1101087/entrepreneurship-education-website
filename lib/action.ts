'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInWithPassword, signUp } from './auth';
import { createClient } from './supabase/server';

export interface AuthState {
  error?: string;
  success?: boolean;
}

export interface Comment {
  id: string;
  case_id: string;
  author_id: string;
  parent_id?: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  // Joined data
  profiles?: {
    display_name: string;
    school_name: string;
  };
  replies?: Comment[];
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

export async function createComment(
  commentData: Omit<
    Comment,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'likes_count'
    | 'profiles'
    | 'replies'
    | 'content'
  >,
  prevState: { error?: string; data?: Comment },
  formData: FormData
) {
  const supabase = await createClient();

  const content = formData.get('comment') as string;
  const parent_id = formData.get('parent_id') as string;

  if (!content || content.trim() === '') {
    return { error: 'コメント内容を入力してください' };
  }

  const comment = {
    ...commentData,
    content,
    parent_id,
  };

  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select()
    .single();

  if (error) {
    return { error: error.message || 'コメントの投稿に失敗しました' };
  }

  // return { data: data as Comment };
  revalidatePath(`/case/${commentData.case_id}`);
  redirect(`/case/${commentData.case_id}`);
}
