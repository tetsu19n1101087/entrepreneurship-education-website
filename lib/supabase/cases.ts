import { type Case } from '@/lib/definitions';
import { createClient } from '@/lib/supabase/server';
import { resolveCaseImageUrl } from '@/lib/supabase/storage';

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
    `,
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cases:', error);
    return [];
  }

  return data as Case[];
}

// トップページのカルーセルとカードで使う形。本文は渡さず、画像はそのまま表示できる URL にしておく
export type CaseSummary = Pick<Case, 'id' | 'title' | 'tags' | 'created_at'> & {
  authorName: string | null;
  imageUrl: string | null;
};

const SUMMARY_COLUMNS =
  'id, title, tags, created_at, header_image_url, profiles (display_name)';

type SummaryRow = Pick<
  Case,
  'id' | 'title' | 'tags' | 'created_at' | 'header_image_url'
> & {
  profiles: { display_name: string } | null;
};

function toSummary(
  supabase: Awaited<ReturnType<typeof createClient>>,
  { header_image_url, profiles, ...row }: SummaryRow,
): CaseSummary {
  return {
    ...row,
    authorName: profiles?.display_name ?? null,
    imageUrl: resolveCaseImageUrl(supabase, header_image_url),
  };
}

export async function getLatestCases(limit: number): Promise<CaseSummary[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('cases')
    .select(SUMMARY_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest cases:', error);
    return [];
  }

  return (data as unknown as SummaryRow[]).map((row) =>
    toSummary(supabase, row),
  );
}

// いいね数の多い順。同数なら新しい順（sort は安定なので取得順が残る）。
// 事例ごとの件数は PostgREST の集計で取り、並べ替えはここで行う。
// 全件を取らないよう新着 POPULAR_CANDIDATES 件の中から選ぶ。事例がこれより増えたら、
// いいね数で並べる view か RPC を作って DB 側で並べ替える
const POPULAR_CANDIDATES = 200;

export async function getPopularCases(limit: number): Promise<CaseSummary[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('cases')
    .select(`${SUMMARY_COLUMNS}, likes (count)`)
    .order('created_at', { ascending: false })
    .limit(POPULAR_CANDIDATES);

  if (error) {
    console.error('Error fetching popular cases:', error);
    return [];
  }

  return (data as unknown as (SummaryRow & { likes: { count: number }[] })[])
    .map(({ likes, ...row }) => ({ row, likesCount: likes[0]?.count ?? 0 }))
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, limit)
    .map(({ row }) => toSummary(supabase, row));
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
    `,
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
