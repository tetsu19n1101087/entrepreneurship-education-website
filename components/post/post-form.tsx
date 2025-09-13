'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
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
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { createCase } from '@/lib/supabase/cases';

export function PostForm() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subject: '',
    target_grade: '',
    duration: '',
    objectives: '',
    methods: '',
    materials: '',
    evaluation: '',
    reflection: '',
    advice: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      await createCase({
        ...formData,
        tags,
        author_id: user.id,
      });

      router.push('/');
    } catch (error) {
      console.error('Post submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='title'>事例タイトル *</Label>
          <Input
            id='title'
            placeholder='例：地域課題解決プロジェクト：商店街活性化アイデアコンテスト'
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='category'>学校種別 *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='学校種別を選択' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='小学校'>小学校</SelectItem>
              <SelectItem value='中学校'>中学校</SelectItem>
              <SelectItem value='高等学校'>高等学校</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='subject'>教科・領域 *</Label>
          <Select
            value={formData.subject}
            onValueChange={(value) => updateFormData('subject', value)}
          >
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
          <Label htmlFor='target_grade'>対象学年</Label>
          <Input
            id='target_grade'
            placeholder='例：中学3年生'
            value={formData.target_grade}
            onChange={(e) => updateFormData('target_grade', e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='duration'>実施期間</Label>
          <Input
            id='duration'
            placeholder='例：3ヶ月間（週2時間）'
            value={formData.duration}
            onChange={(e) => updateFormData('duration', e.target.value)}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>事例概要 *</Label>
        <Textarea
          id='description'
          placeholder='この事例の概要を簡潔に説明してください'
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='objectives'>学習目標・ねらい</Label>
        <Textarea
          id='objectives'
          placeholder='この事例で達成したい学習目標やねらいを記述してください'
          value={formData.objectives}
          onChange={(e) => updateFormData('objectives', e.target.value)}
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='methods'>実施方法・活動内容</Label>
        <Textarea
          id='methods'
          placeholder='具体的な実施方法や活動内容を詳しく記述してください'
          value={formData.methods}
          onChange={(e) => updateFormData('methods', e.target.value)}
          rows={4}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='materials'>使用教材・リソース</Label>
        <Textarea
          id='materials'
          placeholder='使用した教材、参考資料、外部リソースなどを記述してください'
          value={formData.materials}
          onChange={(e) => updateFormData('materials', e.target.value)}
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='evaluation'>評価方法・成果</Label>
        <Textarea
          id='evaluation'
          placeholder='評価方法や得られた成果、生徒の反応などを記述してください'
          value={formData.evaluation}
          onChange={(e) => updateFormData('evaluation', e.target.value)}
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='reflection'>振り返り・改善点</Label>
        <Textarea
          id='reflection'
          placeholder='実施後の振り返りや今後の改善点があれば記述してください'
          value={formData.reflection}
          onChange={(e) => updateFormData('reflection', e.target.value)}
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='advice'>他の教員へのアドバイス</Label>
        <Textarea
          id='advice'
          placeholder='この事例を実施する他の教員へのアドバイスがあれば記述してください'
          value={formData.advice}
          onChange={(e) => updateFormData('advice', e.target.value)}
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label>タグ</Label>
        <div className='flex gap-2 mb-2'>
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
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag, index) => (
            <Badge key={index} variant='secondary' className='gap-1'>
              {tag}
              <X
                className='w-3 h-3 cursor-pointer'
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className='flex justify-end gap-4'>
        <Button type='button' variant='outline' onClick={() => router.back()}>
          キャンセル
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? '投稿中...' : '事例を投稿'}
        </Button>
      </div>
    </form>
  );
}
