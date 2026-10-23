'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchFilter } from '@/hooks/use-search-filter';
import {
  EMPTY_CASE_COUNTS,
  fetchCaseCounts,
  SUBJECTS,
  type CaseCounts,
} from '@/lib/supabase/case-counts';
import { useEffect, useState } from 'react';

// `name` must match `cases.school_type` values in the database.
// Use `label` for the displayed Japanese text.
const SCHOOL_TYPES = [
  {
    name: 'elementary',
    label: '小学校',
    color: 'bg-elementary-subtle text-elementary border-elementary-border',
  },
  {
    name: 'junior_high',
    label: '中学校',
    color: 'bg-junior-high-subtle text-junior-high border-junior-high-border',
  },
  {
    name: 'high_school',
    label: '高等学校',
    color: 'bg-high-school-subtle text-high-school border-high-school-border',
  },
] as const;

export function CategoryFilter() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubject,
    setSelectedSubject,
  } = useSearchFilter();

  // start with zero counts until fetched from Supabase
  const [counts, setCounts] = useState<CaseCounts>(EMPTY_CASE_COUNTS);

  useEffect(() => {
    let isMounted = true;

    fetchCaseCounts().then((result) => {
      if (isMounted) {
        setCounts(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='space-y-space-24'>
      <Card>
        <CardHeader>
          <CardTitle className='text-heading-lg-wide'>学校種別</CardTitle>
        </CardHeader>
        <CardContent className='space-y-space-16'>
          {SCHOOL_TYPES.map((category, index) => (
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
              <span>{category.label}</span>
              {counts.types[category.name] > 0 && (
                <Badge variant='secondary'>{counts.types[category.name]}</Badge>
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
          {SUBJECTS.map((subject, index) => (
            <Button
              key={index}
              variant={selectedSubject === subject ? 'default' : 'ghost'}
              className='h-auto w-full justify-between p-space-8'
              onClick={() =>
                setSelectedSubject(selectedSubject === subject ? null : subject)
              }
            >
              <span>{subject}</span>
              {counts.subjects[subject] > 0 && (
                <Badge variant='outline'>{counts.subjects[subject]}</Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
