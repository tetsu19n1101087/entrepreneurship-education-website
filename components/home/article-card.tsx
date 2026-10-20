import { Badge } from '@/components/ui/badge';
import type { CaseSummary } from '@/lib/supabase/cases';
import Image from 'next/image';
import Link from 'next/link';
import { PostDate } from './post-date';

export function ArticleCard({ caseItem }: { caseItem: CaseSummary }) {
  return (
    <article className='relative flex w-full flex-col overflow-hidden rounded-md bg-card transition-shadow hover:shadow-lg'>
      <div className='relative aspect-[340/180] w-full'>
        <Image
          src={caseItem.imageUrl ?? '/placeholder.svg'}
          alt={caseItem.imageUrl ? `${caseItem.title}のヘッダー画像` : ''}
          fill
          className='object-cover'
          sizes='(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw'
        />
      </div>
      <div className='flex gap-space-24 p-space-32'>
        <PostDate date={caseItem.created_at} />
        <div className='flex min-w-0 flex-1 flex-col gap-space-8'>
          <h3 className='line-clamp-3 text-heading-md text-foreground'>
            {/* after でカード全体をリンクの範囲にする */}
            <Link
              href={`/case/${caseItem.id}`}
              className='after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-md focus-visible:after:ring-[3px] focus-visible:after:ring-ring'
            >
              {caseItem.title}
            </Link>
          </h3>
          {caseItem.authorName && (
            <p className='text-label-md text-muted-foreground'>
              {caseItem.authorName}
            </p>
          )}
          {(caseItem.tags?.length ?? 0) > 0 && (
            <ul className='flex flex-wrap gap-space-8 py-space-4'>
              {caseItem.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant='secondary'>{tag}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
