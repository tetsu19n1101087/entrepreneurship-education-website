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

  useEffect(() => {
    const supabase = createClient();

    const types = ['elementary', 'junior_high', 'high_school'];

    // Fetch counts concurrently per school_type using head=true to get exact counts
    (async () => {
      try {
        const results = await Promise.all(
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
        );

        const [elementary, junior_high, high_school] = results;
        setCounts({ elementary, junior_high, high_school });
      } catch (e) {
        console.error('Error fetching school type counts', e);
      }
    })();
  }, []);

  const subjects = [
    { name: '総合的な学習', count: 38 },
    { name: '社会科', count: 25 },
    { name: '技術・家庭科', count: 22 },
    { name: '商業科', count: 18 },
    { name: 'その他', count: 24 },
  ];

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
          {subjects.map((subject, index) => (
            <Button
              key={index}
              variant={selectedSubject === subject.name ? 'default' : 'ghost'}
              className='w-full justify-between p-2 h-auto text-sm'
              onClick={() =>
                setSelectedSubject(
                  selectedSubject === subject.name ? null : subject.name
                )
              }
            >
              <span>{subject.name}</span>
              <Badge variant='outline' className='text-xs'>
                {subject.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
