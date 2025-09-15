import { Header } from '@/components/header';
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
        <Header />
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
              <Suspense fallback={<div>Loading cases...</div>}>
                <CaseList />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </SearchFilterProvider>
  );
}
