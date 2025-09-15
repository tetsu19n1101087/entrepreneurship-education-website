'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInWithPassword, signUp } from './auth';
import { createClient } from './supabase/server';

export interface State {
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

export interface Case {
  id: string;
  title: string;
  description: string;
  content: string;
  school_type: 'elementary' | 'junior_high' | 'high_school' | 'others';
  subject: string;
  grade_level?: string;
  duration?: string;
  materials?: string;
  tags: string[];
  author_id: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string;
    school_name: string;
  };
}

export async function login(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    await signInWithPassword(formData);
  } catch (error: any) {
    return { error: error.message || 'ログインに失敗しました' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    await signUp(formData);
  } catch (error: any) {
    return { error: error.message || '登録に失敗しました' };
  }

  revalidatePath('/', 'layout');
  redirect('/auth/check-email');
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

// 記事に関する処理
export async function createCase(
  author_id: string,
  prevState: State,
  formData: FormData
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
