'use client';

import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { CaseSummary } from '@/lib/supabase/cases';
import Image from 'next/image';
import Link from 'next/link';
import { PostDate } from './post-date';

// スライドの幅。lg 以上は最大 1180px（テキスト 380px＋画像 800px）で、前後のスライドが左右にのぞく。
// スライド間の余白は CarouselItem の左右に半分ずつ持たせる（左だけだと中央揃えが余白の分ずれる）。
// basis はその余白を含むので、矢印の枠と式をそろえておく。
// Figma のスライド間隔は 40px だが、余白のスケールにないので space-32 にしている
const SLIDE_WIDTH =
  'w-[calc(88%-var(--spacing-space-16))] lg:w-[calc(min(1212px,90%)-var(--spacing-space-32))]';

export function FeaturedCarousel({ cases }: { cases: CaseSummary[] }) {
  return (
    <Carousel
      opts={{ loop: true, align: 'center' }}
      aria-label='注目の事例'
      className='w-full'
    >
      {cases.length > 1 && (
        // 矢印はスライドの左右の縁に中心を合わせる。Tab で先に届くよう、スライドより前に置く
        <div
          className={`pointer-events-none absolute inset-y-0 left-1/2 z-10 -translate-x-1/2 ${SLIDE_WIDTH}`}
        >
          <CarouselPrevious
            variant='default'
            className='pointer-events-auto -left-5'
          />
          <CarouselNext
            variant='default'
            className='pointer-events-auto -right-5'
          />
        </div>
      )}
      {/* embla が動き出すまでの初期位置。先頭のスライドを中央に置いておき、読み込み時の横ずれを防ぐ
          （embla は style.transform を上書きするので、初期化後はこの値は効かない） */}
      <CarouselContent className='ml-0 [transform:translate3d(6%,0,0)] lg:[transform:translate3d(calc((100%-min(1212px,90%))/2),0,0)]'>
        {cases.map((caseItem, index) => (
          <CarouselItem
            key={caseItem.id}
            aria-label={`${index + 1} / ${cases.length}`}
            className='basis-[88%] px-space-8 lg:basis-[min(1212px,90%)] lg:px-space-16'
          >
            {/* lg 未満は画像を上に出す。flex-col-reverse だと、背の高いスライドに揃えたときの余りが画像の上に出てずれるので、order で並べ替える */}
            <article className='relative flex h-full flex-col overflow-hidden rounded-md bg-card lg:h-[420px] lg:flex-row'>
              <div className='flex flex-col gap-space-16 p-space-24 lg:w-[380px] lg:shrink-0 lg:px-space-32 lg:py-space-48'>
                <div>
                  <PostDate date={caseItem.created_at} />
                </div>
                <h3 className='line-clamp-4 text-heading-lg text-foreground'>
                  {/* after でスライド全体をリンクの範囲にする */}
                  <Link
                    href={`/case/${caseItem.id}`}
                    className='after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-md focus-visible:after:ring-[3px] focus-visible:after:ring-ring focus-visible:after:ring-inset'
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
                  <ul className='flex flex-wrap gap-space-8 py-space-8'>
                    {caseItem.tags.map((tag) => (
                      <li key={tag} className='flex'>
                        <Badge variant='secondary'>{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className='relative order-first aspect-[800/420] w-full lg:order-none lg:aspect-auto lg:flex-1'>
                <Image
                  src={caseItem.imageUrl ?? '/placeholder.svg'}
                  alt={
                    caseItem.imageUrl ? `${caseItem.title}のヘッダー画像` : ''
                  }
                  fill
                  className='object-cover'
                  sizes='(min-width: 1024px) 800px, 88vw'
                  // 先頭のスライドはファーストビューの最大の画像になる
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
