import { createClient } from '@/lib/supabase/server';
import type { Profile } from '@/lib/definitions';

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

// Fetch a list of profiles and map to the UI-friendly shape
export async function getProfiles(): Promise<Profile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('display_name', { ascending: true })
    .limit(100);

  if (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }

  return (data ?? []) as Profile[];
}
