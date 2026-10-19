'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createCase } from '@/lib/action';
import type { User } from '@supabase/supabase-js';
import { Trash2, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useRef, useState } from 'react';

export function PostForm({ user }: { user: User | null }) {
  const MAX_HEADER_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
  const router = useRouter();

  const createCaseWithId = createCase.bind(null, user?.id || '');

  const [state, formAction, isPending] = useActionState(createCaseWithId, {});
  const [isComposing, setIsComposing] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [headerImageError, setHeaderImageError] = useState('');
  const [headerImageName, setHeaderImageName] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
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

  const validateHeaderImage = (file?: File) => {
    if (!file) {
      setHeaderImageError('');
      setHeaderImageName('');
      return true;
    }

    if (file.size > MAX_HEADER_IMAGE_SIZE_BYTES) {
      setHeaderImageError('画像サイズは10MB以下にしてください');
      setHeaderImageName('');
      return false;
    }

    setHeaderImageError('');
    setHeaderImageName(file.name);
    return true;
  };

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!validateHeaderImage(file) && e.target) {
      e.target.value = '';
    }
  };

  const handleDropHeaderImage = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) {
      return;
    }

    const isValid = validateHeaderImage(file);

    if (!isValid) {
      if (headerImageInputRef.current) {
        headerImageInputRef.current.value = '';
      }
      return;
    }

    if (headerImageInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      headerImageInputRef.current.files = dataTransfer.files;
    }
  };

  const handleResetHeaderImage = () => {
    if (headerImageInputRef.current) {
      headerImageInputRef.current.value = '';
    }
    setHeaderImageError('');
    setHeaderImageName('');
  };

  return (
    <form action={formAction} className='space-y-space-24'>
      <div className='grid grid-cols-1 gap-space-24 md:grid-cols-2'>
        <div className='space-y-space-8'>
          <Label htmlFor='title'>事例タイトル *</Label>
          <Input
            id='title'
            name='title'
            placeholder='例：地域課題解決プロジェクト：商店街活性化アイデアコンテスト'
            required
          />
        </div>

        <div className='space-y-space-8'>
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

      <div className='grid grid-cols-1 gap-space-16 md:grid-cols-3'>
        <div className='space-y-space-8'>
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

        <div className='space-y-space-8'>
          <Label htmlFor='grade_level'>対象学年</Label>
          <Input
            id='grade_level'
            name='grade_level'
            placeholder='例：中学3年生'
          />
        </div>

        <div className='space-y-space-8'>
          <Label htmlFor='duration'>実施期間</Label>
          <Input
            id='duration'
            name='duration'
            placeholder='例：3ヶ月間（週2時間）'
          />
        </div>
      </div>

      <div className='space-y-space-8'>
        <Label htmlFor='description'>事例概要 *</Label>
        <Input
          id='description'
          name='description'
          placeholder='この事例の概要を簡潔に説明してください'
          required
        />
      </div>

      <div className='space-y-space-8'>
        <Label htmlFor='content'>事例詳細 *</Label>
        <Textarea
          id='content'
          name='content'
          placeholder='この事例の詳細を具体的に説明してください'
          rows={3}
          required
        />
      </div>

      <div className='space-y-space-8'>
        <Label htmlFor='materials'>使用教材・リソース</Label>
        <Textarea
          name='materials'
          id='materials'
          placeholder='使用した教材、参考資料、外部リソースなどを記述してください'
          rows={3}
        />
      </div>

      <div className='space-y-space-8'>
        <Label htmlFor='header_image'>ヘッダー画像</Label>
        <Input
          ref={headerImageInputRef}
          id='header_image'
          name='header_image'
          type='file'
          accept='image/*'
          onChange={handleHeaderImageChange}
          className='hidden'
        />
        <Button
          type='button'
          variant='outline'
          className={`group h-auto w-full rounded-md bg-transparent p-0 hover:bg-accent hover:text-foreground ${
            isDragActive ? 'border-primary' : 'border-border'
          }`}
          onClick={() => headerImageInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={handleDropHeaderImage}
        >
          <div className='w-full rounded-md border border-dashed border-input bg-muted px-space-16 py-space-48 text-center'>
            <div className='mx-auto mb-space-16 flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
              <Upload className='h-6 w-6 text-muted-foreground' />
            </div>
            <p className='text-heading-md transition-opacity group-hover:opacity-50'>
              画像をアップロード
            </p>
            <p className='mt-space-4 text-body-sm text-muted-foreground'>
              ドラッグ&ドロップ または クリックして選択
            </p>
          </div>
        </Button>

        {headerImageName && (
          <div className='flex items-center justify-between rounded-full border bg-muted px-space-16 py-space-8'>
            <p className='truncate text-body-sm'>{headerImageName}</p>
            <Button
              type='button'
              variant='default'
              size='icon'
              onClick={handleResetHeaderImage}
              aria-label='選択した画像をリセット'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        )}

        {headerImageError && (
          <p className='text-body-sm text-destructive'>{headerImageError}</p>
        )}
      </div>

      <div className='space-y-space-8'>
        <Label>タグ</Label>
        <div className='mb-space-8 flex gap-space-8'>
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
        <div className='flex flex-wrap gap-space-8'>
          {tags.map((tag) => (
            <span key={tag}>
              <Badge variant='secondary' className='gap-space-4'>
                {tag}
                <X
                  className='h-3 w-3 cursor-pointer'
                  onClick={() => removeTag(tag)}
                />
              </Badge>
              <input type='hidden' name='tags' value={tag} />
            </span>
          ))}
        </div>
      </div>

      {state?.error && (
        <div className='rounded-md bg-destructive-subtle p-space-16 text-body-sm text-destructive'>
          {state.error}
        </div>
      )}

      <div className='flex justify-end gap-space-16'>
        <Button type='button' variant='outline' onClick={() => router.back()}>
          キャンセル
        </Button>
        <Button type='submit' disabled={isPending || !!headerImageError}>
          {isPending ? '投稿中...' : '事例を投稿'}
        </Button>
      </div>
    </form>
  );
}
