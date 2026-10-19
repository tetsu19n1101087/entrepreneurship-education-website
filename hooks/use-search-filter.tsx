'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface SearchFilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  isAdvancedSearchOpen: boolean;
  setIsAdvancedSearchOpen: (open: boolean) => void;
  clearAllFilters: () => void;
}

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(
  undefined,
);

export function SearchFilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSubject(null);
    setSelectedTags([]);
  };

  return (
    <SearchFilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSubject,
        setSelectedSubject,
        selectedTags,
        setSelectedTags,
        isAdvancedSearchOpen,
        setIsAdvancedSearchOpen,
        clearAllFilters,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  const context = useContext(SearchFilterContext);
  if (context === undefined) {
    throw new Error(
      'useSearchFilter must be used within a SearchFilterProvider',
    );
  }
  return context;
}
