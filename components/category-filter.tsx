'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSearchFilter } from '@/hooks/use-search-filter';

export function CategoryFilter() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubject,
    setSelectedSubject,
  } = useSearchFilter();

  // `name` must match `cases.school_type` values in the database.
  // Use `label` for the displayed Japanese text.
  const categories = [
    {
      name: 'elementary',
      label: '小学校',
      count: 45,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'junior_high',
      label: '中学校',
      count: 52,
      color: 'bg-green-100 text-green-800',
    },
    {
      name: 'high_school',
      label: '高等学校',
      count: 30,
      color: 'bg-purple-100 text-purple-800',
    },
  ];

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
          {categories.map((category, index) => (
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
              <Badge variant='secondary'>{category.count}</Badge>
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
