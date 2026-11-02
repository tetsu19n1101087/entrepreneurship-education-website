'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserAvatar } from '@/components/user-avatar';
import { useSearchFilter } from '@/hooks/use-search-filter';
import type { Case } from '@/lib/definitions';
import { formatDate, toDateTimeAttribute } from '@/lib/format-date';
import { createClient } from '@/lib/supabase/client';
import { resolveCaseImageUrl } from '@/lib/supabase/storage';
import type { User } from '@supabase/supabase-js';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CaseLikesButton } from './case/likes-button';

export default function CaseItem({
  user,
  cases,
}: {
  user: User | null;
  cases: Case[] | null;
}) {
  const { searchQuery, selectedCategory, selectedSubject, selectedTags } =
    useSearchFilter();
  const supabase = createClient();

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
    <div className='space-y-space-24'>
      <div className='text-body-sm text-muted-foreground'>
        {filteredCases.length}件の事例が見つかりました
      </div>

      {filteredCases.length === 0 ? (
        <Card className='py-space-48 text-center'>
          <CardContent>
            <p className='text-body-md text-muted-foreground'>
              検索条件に一致する事例が見つかりませんでした。
            </p>
            <p className='mt-space-8 text-body-sm text-muted-foreground'>
              検索条件を変更してお試しください。
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredCases.map((caseItem) => {
          const imageUrl = resolveCaseImageUrl(
            supabase,
            caseItem.header_image_url,
          );

          return (
            <Card
              key={caseItem.id}
              className='relative overflow-hidden pt-0 transition-shadow hover:shadow-lg'
            >
              <Link
                href={`/case/${caseItem.id}`}
                aria-label={`${caseItem.title}の詳細を表示`}
                className='absolute inset-0 z-10'
              />

              {imageUrl && (
                <div className='relative h-48 w-full'>
                  <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={`${caseItem.title}のヘッダー画像`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
              )}

              <CardHeader className='pb-space-16'>
                <div className='flex items-start justify-between gap-space-16'>
                  <div className='flex-1'>
                    <h3 className='mb-space-8 line-clamp-2 text-heading-lg text-foreground'>
                      {caseItem.title}
                    </h3>
                    <p className='mb-space-16 line-clamp-3 text-body-sm text-muted-foreground'>
                      {caseItem.description}
                    </p>
                    <div className='mb-space-16 flex flex-wrap gap-space-8'>
                      {caseItem.tags?.map((tag: string, index: number) => (
                        <Badge key={index} variant='secondary'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col items-end gap-space-8'>
                    <Badge
                      variant='outline'
                      className={
                        caseItem.school_type === 'elementary'
                          ? 'border-elementary-border bg-elementary-subtle text-elementary'
                          : caseItem.school_type === 'junior_high'
                            ? 'border-junior-high-border bg-junior-high-subtle text-junior-high'
                            : caseItem.school_type === 'high_school'
                              ? 'border-high-school-border bg-high-school-subtle text-high-school'
                              : 'border-other-school-border bg-other-school-subtle text-other-school'
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
                    <Badge variant='outline'>{caseItem.subject}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-space-16'>
                    <div className='flex items-center gap-space-8'>
                      <UserAvatar
                        src={caseItem.profiles?.avatar_url}
                        name={caseItem.profiles?.display_name}
                        size={32}
                        fallbackClassName='text-body-xs'
                      />
                      <div>
                        <p className='text-body-sm text-foreground'>
                          {caseItem.profiles?.display_name}
                        </p>
                        <p className='text-body-xs text-muted-foreground'>
                          {caseItem.profiles?.school_name}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-space-4 font-en text-meta-sm text-muted-foreground'>
                      <Calendar className='h-3 w-3' />
                      <time dateTime={toDateTimeAttribute(caseItem.created_at)}>
                        {formatDate(caseItem.created_at)}
                      </time>
                    </div>
                  </div>

                  <div className='flex items-center gap-space-16'>
                    <div className='relative z-20'>
                      <CaseLikesButton caseId={caseItem.id} userId={user?.id} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
