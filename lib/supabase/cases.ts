import { createClient } from '@/lib/supabase/server';

export interface Case {
  id: string;
  title: string;
  description: string;
  content: string;
  school_type: string;
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

export async function getCases() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('cases')
    .select(
      `
      *,
      profiles (
        display_name,
        school_name
      )
    `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cases:', error);
    return [];
  }

  return data as Case[];
}

export async function getCaseById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('cases')
    .select(
      `
      *,
      profiles (
        display_name,
        school_name
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching case:', error);
    return null;
  }

  return data as Case;
}

// export async function createCase(
//   caseData: Omit<
//     Case,
//     | 'id'
//     | 'created_at'
//     | 'updated_at'
//     | 'likes_count'
//     | 'comments_count'
//     | 'profiles'
//   >
// ) {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from('cases')
//     .insert([caseData])
//     .select()
//     .single();

//   if (error) {
//     console.error('Error creating case:', error);
//     throw error;
//   }

//   return data as Case;
// }

export async function updateCase(id: string, updates: Partial<Case>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('cases')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating case:', error);
    throw error;
  }

  return data as Case;
}

export async function deleteCase(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('cases').delete().eq('id', id);

  if (error) {
    console.error('Error deleting case:', error);
    throw error;
  }
}
