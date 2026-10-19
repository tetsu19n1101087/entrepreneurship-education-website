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

export function AdvancedSearchDialog() {
  const {
    isAdvancedSearchOpen,
    setIsAdvancedSearchOpen,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSubject,
    setSelectedTags,
  } = useSearchFilter();

  const [localFilters, setLocalFilters] = useState({
    keyword: '',
    author: '',
    school: '',
    category: 'all',
    subject: 'all',
    tags: [] as string[],
  });
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
    setSearchQuery(localFilters.keyword);
    setSelectedCategory(
      localFilters.category === 'all' ? null : localFilters.category,
    );
    setSelectedSubject(
      localFilters.subject === 'all' ? null : localFilters.subject,
    );
    setSelectedTags(localFilters.tags);
    setIsAdvancedSearchOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      keyword: '',
      author: '',
      school: '',
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
    <Dialog open={isAdvancedSearchOpen} onOpenChange={setIsAdvancedSearchOpen}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>詳細検索</DialogTitle>
          <DialogDescription>
            複数の条件を組み合わせて事例を検索できます
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-space-24'>
          <div className='grid grid-cols-1 gap-space-16 md:grid-cols-2'>
            <div className='space-y-space-8'>
              <Label htmlFor='keyword'>キーワード</Label>
              <Input
                id='keyword'
                placeholder='タイトルや内容から検索'
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
              <Label htmlFor='author'>投稿者名</Label>
              <Input
                id='author'
                placeholder='教員名で検索'
                value={localFilters.author}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-space-16 md:grid-cols-2'>
            <div className='space-y-space-8'>
              <Label htmlFor='school'>学校名</Label>
              <Input
                id='school'
                placeholder='学校名で検索'
                value={localFilters.school}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    school: e.target.value,
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
                  <SelectItem value='小学校'>小学校</SelectItem>
                  <SelectItem value='中学校'>中学校</SelectItem>
                  <SelectItem value='高等学校'>高等学校</SelectItem>
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
      </DialogContent>
    </Dialog>
  );
}
