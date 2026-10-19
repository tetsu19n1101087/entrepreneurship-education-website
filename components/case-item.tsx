'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { CaseLikesButton } from './case/likes-button';
import Link from 'next/link';
import { useSearchFilter } from '@/hooks/use-search-filter';
import type { Case } from '@/lib/definitions';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

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
        <Card className='text-center py-space-48'>
          <CardContent>
            <p className='text-body-md text-muted-foreground'>
              検索条件に一致する事例が見つかりませんでした。
            </p>
            <p className='text-body-sm text-muted-foreground mt-space-8'>
              検索条件を変更してお試しください。
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredCases.map((caseItem) => {
          const imageUrl = caseItem.header_image_url
            ? caseItem.header_image_url.startsWith('/') ||
              caseItem.header_image_url.startsWith('http://') ||
              caseItem.header_image_url.startsWith('https://')
              ? caseItem.header_image_url
              : supabase.storage
                  .from('images')
                  .getPublicUrl(caseItem.header_image_url).data.publicUrl
            : null;

          return (
            <Card
              key={caseItem.id}
              className='relative hover:shadow-lg transition-shadow overflow-hidden pt-0'
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
                    <h3 className='text-heading-lg text-foreground mb-space-8 line-clamp-2'>
                      {caseItem.title}
                    </h3>
                    <p className='text-muted-foreground text-body-sm line-clamp-3 mb-space-16'>
                      {caseItem.description}
                    </p>
                    <div className='flex flex-wrap gap-space-8 mb-space-16'>
                      {caseItem.tags?.map((tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant='secondary'
                        >
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
                          ? 'bg-elementary-subtle text-elementary border-elementary-border'
                          : caseItem.school_type === 'junior_high'
                            ? 'bg-junior-high-subtle text-junior-high border-junior-high-border'
                            : caseItem.school_type === 'high_school'
                              ? 'bg-high-school-subtle text-high-school border-high-school-border'
                              : 'bg-other-school-subtle text-other-school border-other-school-border'
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
                    <Badge variant='outline'>
                      {caseItem.subject}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-space-16'>
                    <div className='flex items-center gap-space-8'>
                      <Avatar className='w-8 h-8'>
                        <AvatarFallback className='text-body-xs'>
                          {caseItem.profiles?.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-body-sm text-foreground'>
                          {caseItem.profiles?.display_name}
                        </p>
                        <p className='text-body-xs text-muted-foreground'>
                          {caseItem.profiles?.school_name}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-space-4 text-meta-sm font-en text-muted-foreground'>
                      <Calendar className='w-3 h-3' />
                      {new Date(caseItem.created_at).toLocaleDateString(
                        'ja-JP',
                      )}
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
