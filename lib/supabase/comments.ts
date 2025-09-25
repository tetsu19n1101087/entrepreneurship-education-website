import { createClient } from '@/lib/supabase/server';
import type { Comment } from '../definitions';

export async function getCommentsByCase(caseId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('comments')
    .select(
      `*,
      profiles (
        display_name,
        school_name
      )`
    )
    .eq('case_id', caseId)
    .is('parent_id', null)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  // Get replies for each comment
  const commentsWithReplies = await Promise.all(
    data.map(async (comment: Comment) => {
      const { data: replies } = await supabase
        .from('comments')
        .select(
          `
          *,
          profiles (
            display_name,
            school_name
          )
        `
        )
        .eq('parent_id', comment.id)
        .order('created_at', { ascending: true });

      return {
        ...comment,
        replies: replies || [],
      };
    })
  );

  return commentsWithReplies as Comment[];
}

export async function getCommentsCount(): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching comments count:', error);
    return 0;
  }

  return typeof count === 'number' ? count : 0;
}
