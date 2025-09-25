import { createClient } from '@/lib/supabase/server';

export async function getProfilesCount(): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching profiles count:', error);
    return 0;
  }

  return typeof count === 'number' ? count : 0;
}
