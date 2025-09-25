import { createClient } from '@/lib/supabase/server';
import { type Case } from '@/lib/definitions';

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

export async function getCasesCount(targetMonth?: Date): Promise<number> {
  const supabase = await createClient();

  // If no targetMonth provided, return total count
  if (!targetMonth) {
    const { count, error } = await supabase
      .from('cases')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching cases count:', error);
      return 0;
    }

    return typeof count === 'number' ? count : 0;
  }

  // Compute start and end of month (UTC-safe using ISO strings)
  const year = targetMonth.getFullYear();
  const month = targetMonth.getMonth();
  const monthStart = new Date(Date.UTC(year, month, 1, 0, 0, 0));
  const monthEnd = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));

  // Use created_at >= monthStart AND created_at < monthEnd
  const { count, error } = await supabase
    .from('cases')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', monthStart.toISOString())
    .lt('created_at', monthEnd.toISOString());

  if (error) {
    console.error('Error fetching monthly cases count:', error);
    return 0;
  }

  return typeof count === 'number' ? count : 0;
}
