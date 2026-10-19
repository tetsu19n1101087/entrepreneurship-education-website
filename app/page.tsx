import CaseList from '@/components/case-list';
import { CategoryFilter } from '@/components/category-filter';
import { SearchBar } from '@/components/search-bar';
import StatsOverview from '@/components/stats-overview';
import { SearchFilterProvider } from '@/hooks/use-search-filter';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <SearchFilterProvider>
      <div className='h-full flex-1 bg-background'>
        <main className='container mx-auto px-space-16 py-space-32'>
          <div className='mb-space-32'>
            <h1 className='mb-space-8 text-heading-xl text-foreground'>
              千葉県アントレプレナーシップ教育事例共有プラットフォーム
            </h1>
            <p className='text-body-md text-muted-foreground'>
              小中高教員の皆様が実践事例を共有し、学び合うためのコミュニティです
            </p>
          </div>
          <StatsOverview />
          <div className='mt-space-32 grid grid-cols-1 gap-space-24 lg:grid-cols-4'>
            <aside className='lg:col-span-1'>
              <CategoryFilter />
            </aside>
            <div className='lg:col-span-3'>
              <SearchBar />
              <Suspense
                fallback={
                  <div className='mt-space-24 space-y-space-24'>
                    <div className='flex items-center justify-center py-space-48'>
                      <div className='flex flex-col items-center space-y-space-16'>
                        <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-primary'></div>
                        <p className='text-body-md text-muted-foreground'>
                          事例を読み込み中...
                        </p>
                      </div>
                    </div>
                    {/* Loading skeleton cards */}
                    <div className='grid gap-space-24 md:grid-cols-2 lg:grid-cols-1'>
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className='animate-pulse space-y-space-16 rounded-md border p-space-24'
                        >
                          <div className='h-4 w-3/4 rounded-md bg-skeleton'></div>
                          <div className='h-3 w-1/2 rounded-md bg-skeleton'></div>
                          <div className='space-y-space-8'>
                            <div className='h-3 rounded-md bg-skeleton'></div>
                            <div className='h-3 w-5/6 rounded-md bg-skeleton'></div>
                          </div>
                          <div className='flex space-x-space-8'>
                            <div className='h-6 w-16 rounded-full bg-skeleton'></div>
                            <div className='h-6 w-20 rounded-full bg-skeleton'></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              >
                <CaseList />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </SearchFilterProvider>
  );
}
