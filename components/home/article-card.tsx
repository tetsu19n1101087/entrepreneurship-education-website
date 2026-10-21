import { Badge } from '@/components/ui/badge';
import type { CaseSummary } from '@/lib/supabase/cases';
import Image from 'next/image';
import Link from 'next/link';
import { PostDate } from './post-date';

export function ArticleCard({ caseItem }: { caseItem: CaseSummary }) {
  return (
    // 行は page.tsx の li から subgrid で受け取る。同じ並びのカードと著者・タグの位置が揃う
    <article className='relative row-span-4 grid grid-rows-subgrid gap-y-0 overflow-hidden rounded-md bg-card transition-shadow hover:shadow-lg'>
      <div className='relative aspect-[340/180] w-full'>
        <Image
          src={caseItem.imageUrl ?? '/placeholder.svg'}
          alt={caseItem.imageUrl ? `${caseItem.title}のヘッダー画像` : ''}
          fill
          className='object-cover'
          sizes='(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw'
        />
      </div>
      {/* 著者やタグがなくても下の行が詰まらないよう、置く行を明示する */}
      <div className='row-span-3 grid grid-cols-[auto_minmax(0,1fr)] grid-rows-subgrid gap-x-space-24 gap-y-space-8 p-space-32'>
        <div className='row-span-3'>
          <PostDate date={caseItem.created_at} />
        </div>
        <h3 className='col-start-2 row-start-1 line-clamp-3 text-heading-md text-foreground'>
          {/* after でカード全体をリンクの範囲にする */}
          <Link
            href={`/case/${caseItem.id}`}
            className='after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-md focus-visible:after:ring-[3px] focus-visible:after:ring-ring'
          >
            {caseItem.title}
          </Link>
        </h3>
        {caseItem.authorName && (
          <p className='col-start-2 row-start-2 text-label-md text-muted-foreground'>
            {caseItem.authorName}
          </p>
        )}
        {(caseItem.tags?.length ?? 0) > 0 && (
          <ul className='col-start-2 row-start-3 flex flex-wrap content-start gap-space-8 py-space-4'>
            {caseItem.tags.map((tag) => (
              <li key={tag} className='flex'>
                <Badge variant='secondary'>{tag}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
