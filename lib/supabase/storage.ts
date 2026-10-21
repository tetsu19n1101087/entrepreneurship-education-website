import type { SupabaseClient } from '@supabase/supabase-js';

// header_image_url には images バケット内のパスか、そのまま使える URL が入る
export function resolveCaseImageUrl(
  supabase: SupabaseClient,
  path: string | null | undefined,
): string | null {
  if (!path) return null;
  if (
    path.startsWith('/') ||
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }
  return supabase.storage.from('images').getPublicUrl(path).data.publicUrl;
}
