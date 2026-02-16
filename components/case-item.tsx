'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BookOpen, Calendar } from 'lucide-react';
import { CaseLikesButton } from './case/likes-button';
import Link from 'next/link';
import { useSearchFilter } from '@/hooks/use-search-filter';
import type { Case } from '@/lib/definitions';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';

export default function CaseItem({
  user,
  cases,
}: {
  user: User | null;
  cases: Case[] | null;
}) {
  const { searchQuery, selectedCategory, selectedSubject, selectedTags } =
    useSearchFilter();

  const filteredCases = (cases ?? []).filter((caseItem) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = caseItem.title.toLowerCase().includes(query);
      const matchesDescription = caseItem.description
        .toLowerCase()
        .includes(query);
      const matchesAuthor = caseItem.profiles?.display_name
        .toLowerCase()
        .includes(query);
      const matchesSchool = caseItem.profiles?.school_name
        .toLowerCase()
        .includes(query);
      const matchesTags = caseItem.tags?.some((tag: string) =>
        tag.toLowerCase().includes(query),
      );

      if (
        !matchesTitle &&
        !matchesDescription &&
        !matchesAuthor &&
        !matchesSchool &&
        !matchesTags
      ) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory && caseItem.school_type !== selectedCategory) {
      return false;
    }

    // Subject filter
    if (selectedSubject && caseItem.subject !== selectedSubject) {
      return false;
    }

    // Tags filter
    if (selectedTags.length > 0) {
      const hasMatchingTag = selectedTags.some((selectedTag) =>
        caseItem.tags?.includes(selectedTag),
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className='space-y-6'>
      <div className='text-sm text-muted-foreground'>
        {filteredCases.length}件の事例が見つかりました
      </div>

      {filteredCases.length === 0 ? (
        <Card className='text-center py-12'>
          <CardContent>
            <p className='text-muted-foreground'>
              検索条件に一致する事例が見つかりませんでした。
            </p>
            <p className='text-sm text-muted-foreground mt-2'>
              検索条件を変更してお試しください。
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredCases.map((caseItem) => (
          <Card
            key={caseItem.id}
            className='hover:shadow-md transition-shadow overflow-hidden pt-0'
          >
            {caseItem.header_image_url && (
              <div className='relative h-48 w-full'>
                <Image
                  src={caseItem.header_image_url || '/placeholder.svg'}
                  alt={`${caseItem.title}のヘッダー画像`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
            )}

            <CardHeader className='pb-4'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-foreground mb-2 line-clamp-2'>
                    {caseItem.title}
                  </h3>
                  <p className='text-muted-foreground text-sm line-clamp-3 mb-3'>
                    {caseItem.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {caseItem.tags?.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='text-xs'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className='flex flex-col items-end gap-2'>
                  <Badge
                    variant='outline'
                    className={
                      caseItem.school_type === 'elementary'
                        ? 'border-blue-200 text-blue-700'
                        : caseItem.school_type === 'junior_high'
                          ? 'border-green-200 text-green-700'
                          : caseItem.school_type === 'high_school'
                            ? 'border-purple-200 text-purple-700'
                            : 'border-red-200 text-red-700'
                    }
                  >
                    {caseItem.school_type === 'elementary'
                      ? '小学校'
                      : caseItem.school_type === 'junior_high'
                        ? '中学校'
                        : caseItem.school_type === 'high_school'
                          ? '高校'
                          : 'その他'}
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    {caseItem.subject}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8'>
                      <AvatarFallback className='text-xs'>
                        {caseItem.profiles?.display_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium text-foreground'>
                        {caseItem.profiles?.display_name}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {caseItem.profiles?.school_name}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                    <Calendar className='w-3 h-3' />
                    {new Date(caseItem.created_at).toLocaleDateString('ja-JP')}
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <CaseLikesButton caseId={caseItem.id} userId={user?.id} />
                  <Button
                    variant='outline'
                    size='sm'
                    className='gap-1 bg-transparent'
                    asChild
                  >
                    <Link href={`/case/${caseItem.id}`}>
                      <BookOpen className='w-4 h-4' />
                      詳細を見る
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
