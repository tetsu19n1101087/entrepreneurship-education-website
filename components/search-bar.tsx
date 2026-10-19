'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchFilter } from '@/hooks/use-search-filter';
import { Filter, Search, X } from 'lucide-react';
import { AdvancedSearchDialog } from './advanced-search-dialog';

export function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubject,
    setSelectedSubject,
    selectedTags,
    setSelectedTags,
    setIsAdvancedSearchOpen,
    clearAllFilters,
  } = useSearchFilter();

  const hasActiveFilters =
    selectedCategory || selectedSubject || selectedTags.length > 0;

  // Map internal school_type values to their Japanese labels for display
  const categoryLabelMap: Record<string, string> = {
    elementary: '小学校',
    junior_high: '中学校',
    high_school: '高等学校',
  };

  return (
    <div className='mb-space-24 space-y-space-16'>
      <div className='flex gap-space-16'>
        <div className='relative flex-1'>
          <Search className='absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
          <Input
            placeholder='事例を検索（キーワード、学校名、教科名など）'
            className='pl-space-48'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant='outline'
          className='gap-space-8 bg-transparent'
          onClick={() => setIsAdvancedSearchOpen(true)}
        >
          <Filter className='h-4 w-4' />
          詳細検索
        </Button>
      </div>

      {hasActiveFilters && (
        <div className='flex flex-wrap items-center gap-space-8'>
          <span className='text-body-sm text-muted-foreground'>
            フィルター:
          </span>
          {selectedCategory && (
            <div className='flex items-center gap-space-4 rounded-md bg-primary-subtle px-space-8 py-space-4 text-body-sm text-on-primary-subtle'>
              {categoryLabelMap[selectedCategory] ?? selectedCategory}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => setSelectedCategory(null)}
              />
            </div>
          )}
          {selectedSubject && (
            <div className='flex items-center gap-space-4 rounded-md bg-accent px-space-8 py-space-4 text-body-sm text-accent-foreground'>
              {selectedSubject}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => setSelectedSubject(null)}
              />
            </div>
          )}
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className='flex items-center gap-space-4 rounded-md bg-primary-subtle px-space-8 py-space-4 text-body-sm text-on-primary-subtle'
            >
              {tag}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() =>
                  setSelectedTags(selectedTags.filter((t) => t !== tag))
                }
              />
            </div>
          ))}
          <Button variant='ghost' size='sm' onClick={clearAllFilters}>
            すべてクリア
          </Button>
        </div>
      )}

      <AdvancedSearchDialog />
    </div>
  );
}
