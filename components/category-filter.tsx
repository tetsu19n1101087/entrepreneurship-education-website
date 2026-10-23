'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchFilter } from '@/hooks/use-search-filter';
import { SUBJECTS } from '@/lib/subjects';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

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
      color: 'bg-elementary-subtle text-elementary border-elementary-border',
    },
    {
      name: 'junior_high',
      label: '中学校',
      count: counts.junior_high,
      color: 'bg-junior-high-subtle text-junior-high border-junior-high-border',
    },
    {
      name: 'high_school',
      label: '高等学校',
      count: counts.high_school,
      color: 'bg-high-school-subtle text-high-school border-high-school-border',
    },
  ];

  const [subjectCounts, setSubjectCounts] = useState<Record<string, number>>(
    SUBJECTS.reduce((acc, s) => ({ ...acc, [s]: 0 }), {}) as Record<
      string,
      number
    >,
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
            }),
          ),
          Promise.all(
            SUBJECTS.map(async (subject) => {
              try {
                const { count, error } = await supabase
                  .from('cases')
                  .select('*', { count: 'exact', head: true })
                  .eq('subject', subject);

                if (error) {
                  console.error(
                    'Error fetching subject count for',
                    subject,
                    error,
                  );
                  return 0;
                }

                return typeof count === 'number' ? count : 0;
              } catch (e) {
                console.error(
                  'Unexpected error fetching subject count for',
                  subject,
                  e,
                );
                return 0;
              }
            }),
          ),
        ]);

        const [elementary, junior_high, high_school] = typeResults;
        setCounts({ elementary, junior_high, high_school });

        const countsObj: Record<string, number> = {};
        SUBJECTS.forEach((s, i) => {
          countsObj[s] = subjectResults[i] ?? 0;
        });

        setSubjectCounts(countsObj);
      } catch (e) {
        console.error('Error fetching counts', e);
      }
    })();
  }, []);

  return (
    <div className='space-y-space-24'>
      <Card>
        <CardHeader>
          <CardTitle className='text-heading-lg-wide'>学校種別</CardTitle>
        </CardHeader>
        <CardContent className='space-y-space-16'>
          {schoolType.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category.name ? 'default' : 'ghost'}
              className='h-auto w-full justify-between p-space-16'
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name,
                )
              }
            >
              <span>{category.label ?? category.name}</span>
              {category.count > 0 && (
                <Badge variant='secondary'>{category.count}</Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-heading-lg-wide'>教科・領域</CardTitle>
        </CardHeader>
        <CardContent className='space-y-space-8'>
          {SUBJECTS.map((subject: string, index: number) => (
            <Button
              key={index}
              variant={selectedSubject === subject ? 'default' : 'ghost'}
              className='h-auto w-full justify-between p-space-8'
              onClick={() =>
                setSelectedSubject(selectedSubject === subject ? null : subject)
              }
            >
              <span>{subject}</span>
              {subjectCounts[subject] > 0 && (
                <Badge variant='outline'>{subjectCounts[subject]}</Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
