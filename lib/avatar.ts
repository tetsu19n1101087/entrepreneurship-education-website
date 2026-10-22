const GOOGLE_AVATAR_HOSTNAME = 'lh3.googleusercontent.com';
const GOOGLE_AVATAR_PATH_PREFIXES = ['/a/', '/a-/'];
const SUPABASE_STORAGE_PATH_PREFIX = '/storage/v1/object/public/';

function getSupabaseHostname(): string | undefined {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return undefined;
  try {
    return new URL(supabaseUrl).hostname;
  } catch {
    return undefined;
  }
}

/**
 * next/image に渡してよいアバター URL かを判定する。
 * next.config.ts の images.remotePatterns と同じ条件にそろえること。
 * 許可外のホストを next/image に渡すと dev では描画中に例外が出て画面が落ちる。
 */
export function isAllowedAvatarUrl(
  url: string | null | undefined,
): url is string {
  if (!url) return false;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  if (parsed.protocol !== 'https:') return false;

  if (parsed.hostname === GOOGLE_AVATAR_HOSTNAME) {
    // next.config.ts は search: '' のため、クエリ付きは許可しない
    if (parsed.search !== '') return false;
    return GOOGLE_AVATAR_PATH_PREFIXES.some((prefix) =>
      parsed.pathname.startsWith(prefix),
    );
  }

  const supabaseHostname = getSupabaseHostname();
  return (
    supabaseHostname !== undefined &&
    parsed.hostname === supabaseHostname &&
    parsed.pathname.startsWith(SUPABASE_STORAGE_PATH_PREFIX)
  );
}
