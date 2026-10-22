'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchFilter } from '@/hooks/use-search-filter';
import { X } from 'lucide-react';
import { useState } from 'react';

function AdvancedSearchForm({
  onApply,
  onOpenChange,
}: {
  onApply?: (searchQuery: string) => void;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    searchQuery,
    selectedCategory,
    selectedSubject,
    selectedTags,
    applyFilters,
  } = useSearchFilter();

  const [localFilters, setLocalFilters] = useState(() => ({
    keyword: searchQuery,
    category: selectedCategory ?? 'all',
    subject: selectedSubject ?? 'all',
    tags: selectedTags,
  }));
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !localFilters.tags.includes(newTag.trim())) {
      setLocalFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleApplyFilters = () => {
    applyFilters({
      searchQuery: localFilters.keyword,
      selectedCategory:
        localFilters.category === 'all' ? null : localFilters.category,
      selectedSubject:
        localFilters.subject === 'all' ? null : localFilters.subject,
      selectedTags: localFilters.tags,
    });
    onApply?.(localFilters.keyword);
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      keyword: '',
      category: 'all',
      subject: 'all',
      tags: [],
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className='space-y-space-24'>
      <div className='grid grid-cols-1 gap-space-16 md:grid-cols-2'>
        <div className='space-y-space-8'>
          <Label htmlFor='keyword'>キーワード</Label>
          <Input
            id='keyword'
            placeholder='タイトル・内容・投稿者名・学校名から検索'
            value={localFilters.keyword}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                keyword: e.target.value,
              }))
            }
          />
        </div>

        <div className='space-y-space-8'>
          <Label htmlFor='category'>学校種別</Label>
          <Select
            value={localFilters.category}
            onValueChange={(value) =>
              setLocalFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='学校種別を選択' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>すべて</SelectItem>
              <SelectItem value='elementary'>小学校</SelectItem>
              <SelectItem value='junior_high'>中学校</SelectItem>
              <SelectItem value='high_school'>高等学校</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='space-y-space-8'>
        <Label htmlFor='subject'>教科・領域</Label>
        <Select
          value={localFilters.subject}
          onValueChange={(value) =>
            setLocalFilters((prev) => ({ ...prev, subject: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='教科・領域を選択' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>すべて</SelectItem>
            <SelectItem value='総合的な学習'>総合的な学習</SelectItem>
            <SelectItem value='社会科'>社会科</SelectItem>
            <SelectItem value='技術・家庭科'>技術・家庭科</SelectItem>
            <SelectItem value='商業科'>商業科</SelectItem>
            <SelectItem value='その他'>その他</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-space-8'>
        <Label>タグ</Label>
        <div className='mb-space-8 flex gap-space-8'>
          <Input
            placeholder='タグを入力してEnterキーで追加'
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button type='button' onClick={addTag} variant='outline'>
            追加
          </Button>
        </div>
        <div className='flex flex-wrap gap-space-8'>
          {localFilters.tags.map((tag, index) => (
            <Badge key={index} variant='secondary' className='gap-space-4'>
              {tag}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className='flex justify-end gap-space-16'>
        <Button variant='outline' onClick={handleClearFilters}>
          クリア
        </Button>
        <Button onClick={handleApplyFilters}>検索実行</Button>
      </div>
    </div>
  );
}

export function AdvancedSearchDialog({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply?: (searchQuery: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>詳細検索</DialogTitle>
          <DialogDescription>
            複数の条件を組み合わせて事例を検索できます
          </DialogDescription>
        </DialogHeader>

        <AdvancedSearchForm onApply={onApply} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
