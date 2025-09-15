import { createClient } from '@/lib/supabase/client';
import type { Comment } from '../definitions';

export async function getCommentsByCase(caseId: string) {
  const supabase = createClient();

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
