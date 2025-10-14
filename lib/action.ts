'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInWithPassword, signUp } from './auth';
import { createClient } from './supabase/server';
import type { Case } from '@/lib/definitions';
import type { Comment } from '@/lib/definitions';
import { AuthError } from '@supabase/supabase-js';

export interface State {
  error?: string;
  success?: boolean;
}

export async function login(
  prevState: State,
  formData: FormData,
): Promise<State> {
  try {
    await signInWithPassword(formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.message };
    } else {
      return { error: 'ログインに失敗しました' };
    }
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(
  prevState: State,
  formData: FormData,
): Promise<State> {
  try {
    await signUp(formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.message };
    } else {
      return { error: '登録に失敗しました' };
    }
  }

  revalidatePath('/', 'layout');
  redirect('/auth/check-email');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

// コメントに関する処理(別ファイルにまとめて、importする形にする予定)
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
  formData: FormData,
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

  const { error } = await supabase
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

// 記事に関する処理
export async function createCase(
  author_id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const supabase = await createClient();

  const caseData: Omit<Case, 'id' | 'created_at' | 'updated_at'> = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    school_type: formData.get('school_type') as
      | 'elementary'
      | 'junior_high'
      | 'high_school'
      | 'others',
    subject: formData.get('subject') as string,
    grade_level: formData.get('grade_level') as string,
    duration: formData.get('duration') as string,
    materials: formData.get('materials') as string,
    tags: formData.getAll('tags') as string[],
    author_id,
  };

  const { data, error } = await supabase
    .from('cases')
    .insert([caseData])
    .select()
    .single();

  if (error) {
    return { error: error.message || '記事の投稿に失敗しました' };
  }

  redirect(`/case/${data.id}`);
}
