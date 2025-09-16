import { createClient } from '@/lib/supabase/client';

export async function toggleCaseLike(caseId: string, userId: string) {
  const supabase = createClient();

  // Check if like exists
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('case_id', caseId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    // Remove like
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('case_id', caseId)
      .eq('user_id', userId);

    if (error) throw error;

    return false;
  } else {
    // Add like
    const { error } = await supabase
      .from('likes')
      .insert([{ case_id: caseId, user_id: userId }]);

    if (error) throw error;

    return true;
  }
}

export async function toggleCommentLike(commentId: string, userId: string) {
  const supabase = createClient();

  // Check if like exists
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('comment_id', commentId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    // Remove like
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('comment_id', commentId)
      .eq('user_id', userId);

    if (error) throw error;

    return false;
  } else {
    // Add like
    const { error } = await supabase
      .from('likes')
      .insert([{ comment_id: commentId, user_id: userId }]);

    if (error) throw error;

    return true;
  }
}

export async function getCaseLikes(caseId: string): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('user_id')
    .eq('case_id', caseId);

  if (error) {
    console.error('Error fetching user likes:', error);

    return [];
  }

  const users = data.map((like) => like.user_id);

  return users;
}

export async function getCommentLikes(commentId: string): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('user_id')
    .eq('comment_id', commentId);

  if (error) {
    console.error('Error fetching user likes:', error);

    return [];
  }

  const users = data.map((like) => like.user_id);

  return users;
}
