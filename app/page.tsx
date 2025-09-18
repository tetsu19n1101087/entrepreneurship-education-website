import { CategoryFilter } from '@/components/category-filter';
import { SearchBar } from '@/components/search-bar';
import { StatsOverview } from '@/components/stats-overview';
import { SearchFilterProvider } from '@/hooks/use-search-filter';
import CaseList from '@/components/case-list';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <SearchFilterProvider>
      <div className='min-h-screen bg-background'>
        <main className='container mx-auto px-4 py-8'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-foreground mb-2'>
              千葉県アントレプレナーシップ教育事例共有プラットフォーム
            </h1>
            <p className='text-muted-foreground text-lg'>
              小中高教員の皆様が実践事例を共有し、学び合うためのコミュニティです
            </p>
          </div>
          <StatsOverview />
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8'>
            <aside className='lg:col-span-1'>
              <CategoryFilter />
            </aside>
            <div className='lg:col-span-3'>
              <SearchBar />
              <Suspense
                fallback={
                  <div className='space-y-6 mt-6'>
                    <div className='flex items-center justify-center py-12'>
                      <div className='flex flex-col items-center space-y-4'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                        <p className='text-muted-foreground font-medium'>
                          事例を読み込み中...
                        </p>
                      </div>
                    </div>
                    {/* Loading skeleton cards */}
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-1'>
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className='border rounded-lg p-6 space-y-4 animate-pulse'
                        >
                          <div className='h-4 bg-muted rounded w-3/4'></div>
                          <div className='h-3 bg-muted rounded w-1/2'></div>
                          <div className='space-y-2'>
                            <div className='h-3 bg-muted rounded'></div>
                            <div className='h-3 bg-muted rounded w-5/6'></div>
                          </div>
                          <div className='flex space-x-2'>
                            <div className='h-6 bg-muted rounded-full w-16'></div>
                            <div className='h-6 bg-muted rounded-full w-20'></div>
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
