import { ArticleCard } from '@/components/home/article-card';
import { FeaturedCarousel } from '@/components/home/featured-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getLatestCases, getPopularCases } from '@/lib/supabase/cases';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const [popularCases, latestCases] = await Promise.all([
    getPopularCases(5),
    getLatestCases(6),
  ]);

  return (
    <div className='flex flex-col'>
      <h1 className='sr-only'>
        千葉県アントレプレナーシップ教育事例共有プラットフォーム
      </h1>

      {popularCases.length > 0 && (
        // ランドマークはカルーセル側の region（「注目の事例」）だけにする
        <div>
          <h2 className='sr-only'>注目の事例</h2>
          <FeaturedCarousel cases={popularCases} />
        </div>
      )}

      <section
        aria-labelledby='latest-heading'
        className='flex flex-col items-center px-space-16 py-space-80 lg:px-space-32'
      >
        <h2
          id='latest-heading'
          className='text-heading-lg-wide text-foreground'
        >
          最新記事
        </h2>
        {latestCases.length > 0 ? (
          <ul className='grid w-full grid-cols-1 gap-space-24 py-space-48 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,340px))] lg:justify-center'>
            {latestCases.map((caseItem) => (
              <li key={caseItem.id} className='flex'>
                <ArticleCard caseItem={caseItem} />
              </li>
            ))}
          </ul>
        ) : (
          <Card className='my-space-48 w-full max-w-xl py-space-48 text-center'>
            <CardContent>
              <p className='text-body-md text-muted-foreground'>
                まだ記事がありません。
              </p>
            </CardContent>
          </Card>
        )}
        <Button size='lg' className='relative w-60' asChild>
          <Link href='/cases'>
            記事一覧
            <ChevronRight className='absolute right-space-16 size-6' />
          </Link>
        </Button>
      </section>
    </div>
  );
}
