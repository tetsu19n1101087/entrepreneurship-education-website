'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchFilter } from '@/hooks/use-search-filter';
import { Filter, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AdvancedSearchDialog } from './advanced-search-dialog';

// Map internal school_type values to their Japanese labels for display
const categoryLabelMap: Record<string, string> = {
  elementary: '小学校',
  junior_high: '中学校',
  high_school: '高等学校',
};

// キーワード入力を URL に反映するまでの待ち時間（ms）
const SEARCH_DEBOUNCE_MS = 300;

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
    clearAllFilters,
  } = useSearchFilter();

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // 入力欄の値はローカル state で持ち、デバウンスして URL に反映する
  const [inputValue, setInputValue] = useState(searchQuery);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 自分が書き込んだが、まだ searchQuery に反映されていない q（古い順）。
  // Next は replaceState の反映を transition で行うため、キー入力より遅れて届くことがある。
  // 届いた q がこの一覧にあれば自分の書き込み、無ければ外部要因（Link 遷移・戻る/進む等）とみなす。
  const [pendingWrites, setPendingWrites] = useState<string[]>([]);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  // 外部要因を検出した回数。変化したら effect で保留中のタイマーを取り消す
  const [externalChangeCount, setExternalChangeCount] = useState(0);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    const index = pendingWrites.indexOf(searchQuery);
    if (index >= 0) {
      // 自分の書き込みが反映された。入力欄は上書きしない
      setPendingWrites(pendingWrites.slice(index + 1));
    } else {
      setPendingWrites([]);
      setInputValue(searchQuery);
      setExternalChangeCount((count) => count + 1);
    }
  }

  const cancelPendingSearch = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
  };

  // 外部要因で q が変わったら、古い入力内容の書き込みを取り消す
  useEffect(() => {
    cancelPendingSearch();
  }, [externalChangeCount]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // 詳細検索の適用で q が書き換わったときは入力欄を合わせる
  const handleAdvancedApply = (query: string) => {
    cancelPendingSearch();
    setPendingWrites([]);
    setInputValue(query);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    cancelPendingSearch();
    debounceTimer.current = setTimeout(() => {
      debounceTimer.current = null;
      const currentQuery =
        new URLSearchParams(window.location.search).get('q') ?? '';
      // URL が既に同じ値なら反映イベントは来ないので、一覧に積まない
      if (value !== currentQuery) {
        setPendingWrites((writes) => [...writes, value]);
      }
      setSearchQuery(value);
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleClearAll = () => {
    cancelPendingSearch();
    setPendingWrites([]);
    setInputValue('');
    clearAllFilters();
  };

  const hasActiveFilters =
    selectedCategory || selectedSubject || selectedTags.length > 0;

  return (
    <div className='mb-space-24 space-y-space-16'>
      <div className='flex gap-space-16'>
        <div className='relative flex-1'>
          <Search className='absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
          <Input
            placeholder='事例を検索（キーワード、学校名、教科名など）'
            className='pl-space-48'
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        <Button
          variant='outline'
          className='gap-space-8 bg-transparent'
          onClick={() => setIsAdvancedOpen(true)}
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
          <Button variant='ghost' size='sm' onClick={handleClearAll}>
            すべてクリア
          </Button>
        </div>
      )}

      <AdvancedSearchDialog
        open={isAdvancedOpen}
        onOpenChange={setIsAdvancedOpen}
        onApply={handleAdvancedApply}
      />
    </div>
  );
}
