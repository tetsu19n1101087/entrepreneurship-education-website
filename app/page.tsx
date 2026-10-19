import { CategoryFilter } from '@/components/category-filter';
import { SearchBar } from '@/components/search-bar';
import StatsOverview from '@/components/stats-overview';
import { SearchFilterProvider } from '@/hooks/use-search-filter';
import CaseList from '@/components/case-list';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <SearchFilterProvider>
      <div className='h-full flex-1 bg-background'>
        <main className='container mx-auto px-space-16 py-space-32'>
          <div className='mb-space-32'>
            <h1 className='text-heading-xl text-foreground mb-space-8'>
              千葉県アントレプレナーシップ教育事例共有プラットフォーム
            </h1>
            <p className='text-muted-foreground text-body-md'>
              小中高教員の皆様が実践事例を共有し、学び合うためのコミュニティです
            </p>
          </div>
          <StatsOverview />
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-space-24 mt-space-32'>
            <aside className='lg:col-span-1'>
              <CategoryFilter />
            </aside>
            <div className='lg:col-span-3'>
              <SearchBar />
              <Suspense
                fallback={
                  <div className='space-y-space-24 mt-space-24'>
                    <div className='flex items-center justify-center py-space-48'>
                      <div className='flex flex-col items-center space-y-space-16'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                        <p className='text-muted-foreground text-body-md'>
                          事例を読み込み中...
                        </p>
                      </div>
                    </div>
                    {/* Loading skeleton cards */}
                    <div className='grid gap-space-24 md:grid-cols-2 lg:grid-cols-1'>
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className='border rounded-md p-space-24 space-y-space-16 animate-pulse'
                        >
                          <div className='h-4 bg-skeleton rounded-md w-3/4'></div>
                          <div className='h-3 bg-skeleton rounded-md w-1/2'></div>
                          <div className='space-y-space-8'>
                            <div className='h-3 bg-skeleton rounded-md'></div>
                            <div className='h-3 bg-skeleton rounded-md w-5/6'></div>
                          </div>
                          <div className='flex space-x-space-8'>
                            <div className='h-6 bg-skeleton rounded-full w-16'></div>
                            <div className='h-6 bg-skeleton rounded-full w-20'></div>
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
