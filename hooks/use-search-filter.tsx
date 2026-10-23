'use client';

import { usePathname, useSearchParams } from 'next/navigation';

const CATEGORIES = ['elementary', 'junior_high', 'high_school'];

const FILTER_KEYS = ['q', 'category', 'subject', 'tag'];

export interface SearchFilterValues {
  searchQuery: string;
  selectedCategory: string | null;
  selectedSubject: string | null;
  selectedTags: string[];
}

// 絞り込み条件は URL の searchParams に保持する。
// 履歴を積む操作は pushState、キーワード入力は replaceState で反映する。
export function useSearchFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category = searchParams.get('category');

  const searchQuery = searchParams.get('q') ?? '';
  const selectedCategory =
    category && CATEGORIES.includes(category) ? category : null;
  const selectedSubject = searchParams.get('subject');
  const selectedTags = searchParams.getAll('tag');

  // 呼び出し時点の URL を元に更新する（デバウンス後の呼び出しでも古い値を使わない）
  const updateUrl = (
    update: (params: URLSearchParams) => void,
    mode: 'push' | 'replace' = 'push',
  ) => {
    const params = new URLSearchParams(window.location.search);
    update(params);
    const query = params.toString();
    const url = query ? `?${query}` : pathname;

    if (mode === 'replace') {
      window.history.replaceState(null, '', url);
    } else {
      window.history.pushState(null, '', url);
    }
  };

  const setSingle = (key: string, value: string | null) => {
    if (value) {
      return (params: URLSearchParams) => params.set(key, value);
    }
    return (params: URLSearchParams) => params.delete(key);
  };

  const setSearchQuery = (query: string) => {
    updateUrl(setSingle('q', query), 'replace');
  };

  const setSelectedCategory = (value: string | null) => {
    updateUrl(setSingle('category', value));
  };

  const setSelectedSubject = (value: string | null) => {
    updateUrl(setSingle('subject', value));
  };

  const setSelectedTags = (tags: string[]) => {
    updateUrl((params) => {
      params.delete('tag');
      tags.forEach((tag) => params.append('tag', tag));
    });
  };

  // 複数の条件をまとめて変更し、履歴を1件だけ積む
  const applyFilters = (filters: SearchFilterValues) => {
    updateUrl((params) => {
      setSingle('q', filters.searchQuery)(params);
      setSingle('category', filters.selectedCategory)(params);
      setSingle('subject', filters.selectedSubject)(params);
      params.delete('tag');
      filters.selectedTags.forEach((tag) => params.append('tag', tag));
    });
  };

  const clearAllFilters = () => {
    updateUrl((params) => {
      FILTER_KEYS.forEach((key) => params.delete(key));
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubject,
    setSelectedSubject,
    selectedTags,
    setSelectedTags,
    applyFilters,
    clearAllFilters,
  };
}
