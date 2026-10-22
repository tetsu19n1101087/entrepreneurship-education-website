import { createClient } from '@/lib/supabase/client';

// `name` must match `cases.school_type` values in the database.
export const SCHOOL_TYPE_NAMES = [
  'elementary',
  'junior_high',
  'high_school',
] as const;

export const SUBJECTS = [
  '総合的な学習',
  '社会科',
  '技術・家庭科',
  '商業科',
  'その他',
] as const;

type SchoolTypeName = (typeof SCHOOL_TYPE_NAMES)[number];

export type CaseCounts = {
  types: Record<SchoolTypeName, number>;
  subjects: Record<string, number>;
};

export const EMPTY_CASE_COUNTS: CaseCounts = {
  types: { elementary: 0, junior_high: 0, high_school: 0 },
  subjects: Object.fromEntries(SUBJECTS.map((s) => [s, 0])),
};

// Client-side only: uses the browser Supabase client.
async function fetchCount(column: 'school_type' | 'subject', value: string) {
  const supabase = createClient();

  try {
    const { count, error } = await supabase
      .from('cases')
      .select('*', { count: 'exact', head: true })
      .eq(column, value);

    if (error) {
      console.error('Error fetching count for', value, error);
      return 0;
    }

    return typeof count === 'number' ? count : 0;
  } catch (e) {
    console.error('Unexpected error fetching count for', value, e);
    return 0;
  }
}

// Fetch school_type counts and subject counts concurrently
export async function fetchCaseCounts(): Promise<CaseCounts> {
  const [typeResults, subjectResults] = await Promise.all([
    Promise.all(SCHOOL_TYPE_NAMES.map((t) => fetchCount('school_type', t))),
    Promise.all(SUBJECTS.map((s) => fetchCount('subject', s))),
  ]);

  const [elementary, junior_high, high_school] = typeResults;

  return {
    types: { elementary, junior_high, high_school },
    subjects: Object.fromEntries(
      SUBJECTS.map((s, i) => [s, subjectResults[i]]),
    ),
  };
}
