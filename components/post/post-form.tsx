'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { createCase } from '@/lib/action';
import { useActionState } from 'react';

export function PostForm({ user }: { user: User | null }) {
  const MAX_HEADER_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
  const router = useRouter();

  const createCaseWithId = createCase.bind(null, user?.id || '');

  const [state, formAction, isPending] = useActionState(createCaseWithId, {});
  const [isComposing, setIsComposing] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [headerImageError, setHeaderImageError] = useState('');
  const headerImageInputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      addTag();
    }
  };

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setHeaderImageError('');
      return;
    }

    if (file.size > MAX_HEADER_IMAGE_SIZE_BYTES) {
      setHeaderImageError('画像サイズは10MB以下にしてください');
      e.target.value = '';
      return;
    }

    setHeaderImageError('');
  };

  const handleResetHeaderImage = () => {
    if (headerImageInputRef.current) {
      headerImageInputRef.current.value = '';
    }
    setHeaderImageError('');
  };

  return (
    <form action={formAction} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='title'>事例タイトル *</Label>
          <Input
            id='title'
            name='title'
            placeholder='例：地域課題解決プロジェクト：商店街活性化アイデアコンテスト'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='category'>学校種別 *</Label>
          <Select name='school_type'>
            <SelectTrigger>
              <SelectValue placeholder='学校種別を選択' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='elementary'>小学校</SelectItem>
              <SelectItem value='junior_high'>中学校</SelectItem>
              <SelectItem value='high_school'>高等学校</SelectItem>
              <SelectItem value='others'>その他</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='subject'>教科・領域 *</Label>
          <Select name='subject'>
            <SelectTrigger>
              <SelectValue placeholder='教科を選択' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='総合的な学習'>総合的な学習</SelectItem>
              <SelectItem value='社会科'>社会科</SelectItem>
              <SelectItem value='技術・家庭科'>技術・家庭科</SelectItem>
              <SelectItem value='商業科'>商業科</SelectItem>
              <SelectItem value='その他'>その他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='grade_level'>対象学年</Label>
          <Input
            id='grade_level'
            name='grade_level'
            placeholder='例：中学3年生'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='duration'>実施期間</Label>
          <Input
            id='duration'
            name='duration'
            placeholder='例：3ヶ月間（週2時間）'
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>事例概要 *</Label>
        <Input
          id='description'
          name='description'
          placeholder='この事例の概要を簡潔に説明してください'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>事例詳細 *</Label>
        <Textarea
          id='content'
          name='content'
          placeholder='この事例の詳細を具体的に説明してください'
          rows={3}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='materials'>使用教材・リソース</Label>
        <Textarea
          name='materials'
          id='materials'
          placeholder='使用した教材、参考資料、外部リソースなどを記述してください'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='header_image'>ヘッダー画像</Label>
        <div className='flex items-center gap-2'>
          <Input
            ref={headerImageInputRef}
            id='header_image'
            name='header_image'
            type='file'
            accept='image/*'
            onChange={handleHeaderImageChange}
          />
          <Button
            type='button'
            variant='outline'
            onClick={handleResetHeaderImage}
          >
            選択をリセット
          </Button>
        </div>
        {headerImageError && (
          <p className='text-red-600 text-sm'>{headerImageError}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label>タグ</Label>
        <div className='flex gap-2 mb-2'>
          <Input
            placeholder='タグを入力してEnterキーで追加'
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyPress}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Button type='button' onClick={addTag} variant='outline'>
            追加
          </Button>
        </div>
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <span key={tag}>
              <Badge variant='secondary' className='gap-1'>
                {tag}
                <X
                  className='w-3 h-3 cursor-pointer'
                  onClick={() => removeTag(tag)}
                />
              </Badge>
              <input type='hidden' name='tags' value={tag} />
            </span>
          ))}
        </div>
      </div>

      {state?.error && (
        <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
          {state.error}
        </div>
      )}

      <div className='flex justify-end gap-4'>
        <Button type='button' variant='outline' onClick={() => router.back()}>
          キャンセル
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending ? '投稿中...' : '事例を投稿'}
        </Button>
      </div>
    </form>
  );
}
