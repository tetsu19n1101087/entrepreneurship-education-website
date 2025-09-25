'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSearchFilter } from '@/hooks/use-search-filter';
import { createClient } from '@/lib/supabase/client';

export function CategoryFilter() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubject,
    setSelectedSubject,
  } = useSearchFilter();

  // `name` must match `cases.school_type` values in the database.
  // Use `label` for the displayed Japanese text.
  // start with zero counts until fetched from Supabase
  const [counts, setCounts] = useState<Record<string, number>>({
    elementary: 0,
    junior_high: 0,
    high_school: 0,
  });

  const schoolType = [
    {
      name: 'elementary',
      label: '小学校',
      count: counts.elementary,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'junior_high',
      label: '中学校',
      count: counts.junior_high,
      color: 'bg-green-100 text-green-800',
    },
    {
      name: 'high_school',
      label: '高等学校',
      count: counts.high_school,
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  // Subjects and their display labels; counts managed in state and fetched
  const subjectList = [
    '総合的な学習',
    '社会科',
    '技術・家庭科',
    '商業科',
    'その他',
  ];

  const [subjectCounts, setSubjectCounts] = useState<Record<string, number>>(
    subjectList.reduce((acc, s) => ({ ...acc, [s]: 0 }), {}) as Record<
      string,
      number
    >
  );

  useEffect(() => {
    const supabase = createClient();

    (async () => {
      try {
        const types = ['elementary', 'junior_high', 'high_school'];

        // Fetch school_type counts and subject counts concurrently
        const [typeResults, subjectResults] = await Promise.all([
          Promise.all(
            types.map(async (t) => {
              try {
                const { count, error } = await supabase
                  .from('cases')
                  .select('*', { count: 'exact', head: true })
                  .eq('school_type', t);

                if (error) {
                  console.error('Error fetching count for', t, error);
                  return 0;
                }

                return typeof count === 'number' ? count : 0;
              } catch (e) {
                console.error('Unexpected error fetching count for', t, e);
                return 0;
              }
            })
          ),
          Promise.all(
            subjectList.map(async (subject) => {
              try {
                const { count, error } = await supabase
                  .from('cases')
                  .select('*', { count: 'exact', head: true })
                  .eq('subject', subject);

                if (error) {
                  console.error(
                    'Error fetching subject count for',
                    subject,
                    error
                  );
                  return 0;
                }

                return typeof count === 'number' ? count : 0;
              } catch (e) {
                console.error(
                  'Unexpected error fetching subject count for',
                  subject,
                  e
                );
                return 0;
              }
            })
          ),
        ]);

        const [elementary, junior_high, high_school] = typeResults;
        setCounts({ elementary, junior_high, high_school });

        const countsObj: Record<string, number> = {};
        subjectList.forEach((s, i) => {
          countsObj[s] = subjectResults[i] ?? 0;
        });

        setSubjectCounts(countsObj);
      } catch (e) {
        console.error('Error fetching counts', e);
      }
    })();
  }, []);

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>学校種別</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {schoolType.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category.name ? 'default' : 'ghost'}
              className='w-full justify-between p-3 h-auto'
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )
              }
            >
              <span className='font-medium'>
                {category.label ?? category.name}
              </span>
              {category.count > 0 && (
                <Badge variant='secondary'>{category.count}</Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>教科・領域</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          {subjectList.map((subject: string, index: number) => (
            <Button
              key={index}
              variant={selectedSubject === subject ? 'default' : 'ghost'}
              className='w-full justify-between p-2 h-auto text-sm'
              onClick={() =>
                setSelectedSubject(selectedSubject === subject ? null : subject)
              }
            >
              <span>{subject}</span>
              {subjectCounts[subject] > 0 && (
                <Badge variant='outline' className='text-xs'>
                  {subjectCounts[subject]}
                </Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
