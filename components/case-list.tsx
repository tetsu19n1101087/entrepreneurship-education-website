'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Heart, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useSearchFilter } from '@/hooks/use-search-filter';
import { getCases, type Case } from '@/lib/supabase/cases';
import { toggleCaseLike, getUserLikes } from '@/lib/supabase/likes';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function CaseList() {
  const [cases, setCases] = useState<Case[]>([]);
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, selectedCategory, selectedSubject, selectedTags } =
    useSearchFilter();
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    loadCases();
    if (user) {
      loadUserLikes();
    }
  }, [user]);

  const loadCases = async () => {
    try {
      const data = await getCases();
      setCases(data);
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserLikes = async () => {
    if (!user) return;
    try {
      const { caseLikes } = await getUserLikes(user.id);
      setUserLikes(caseLikes);
    } catch (error) {
      console.error('Error loading user likes:', error);
    }
  };

  const handleLike = async (caseId: string) => {
    if (!user) return;

    try {
      const isLiked = await toggleCaseLike(caseId, user.id);

      // Update local state
      setCases((prevCases) =>
        prevCases.map((c) =>
          c.id === caseId
            ? { ...c, likes_count: c.likes_count + (isLiked ? 1 : -1) }
            : c
        )
      );

      setUserLikes((prev) =>
        isLiked ? [...prev, caseId] : prev.filter((id) => id !== caseId)
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = caseItem.title.toLowerCase().includes(query);
        const matchesDescription = caseItem.description
          .toLowerCase()
          .includes(query);
        const matchesAuthor = caseItem.profiles?.display_name
          .toLowerCase()
          .includes(query);
        const matchesSchool = caseItem.profiles?.school_name
          .toLowerCase()
          .includes(query);
        const matchesTags = caseItem.tags?.some((tag: string) =>
          tag.toLowerCase().includes(query)
        );

        if (
          !matchesTitle &&
          !matchesDescription &&
          !matchesAuthor &&
          !matchesSchool &&
          !matchesTags
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && caseItem.category !== selectedCategory) {
        return false;
      }

      // Subject filter
      if (selectedSubject && caseItem.subject !== selectedSubject) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some((selectedTag) =>
          caseItem.tags?.includes(selectedTag)
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  }, [cases, searchQuery, selectedCategory, selectedSubject, selectedTags]);

  if (loading) {
    return <div className='text-center py-8'>読み込み中...</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='text-sm text-muted-foreground'>
        {filteredCases.length}件の事例が見つかりました
      </div>

      {filteredCases.length === 0 ? (
        <Card className='text-center py-12'>
          <CardContent>
            <p className='text-muted-foreground'>
              検索条件に一致する事例が見つかりませんでした。
            </p>
            <p className='text-sm text-muted-foreground mt-2'>
              検索条件を変更してお試しください。
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredCases.map((caseItem) => (
          <Card key={caseItem.id} className='hover:shadow-md transition-shadow'>
            <CardHeader className='pb-4'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-foreground mb-2 line-clamp-2'>
                    {caseItem.title}
                  </h3>
                  <p className='text-muted-foreground text-sm line-clamp-3 mb-3'>
                    {caseItem.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {caseItem.tags?.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='text-xs'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className='flex flex-col items-end gap-2'>
                  <Badge
                    variant='outline'
                    className={
                      caseItem.category === '小学校'
                        ? 'border-blue-200 text-blue-700'
                        : caseItem.category === '中学校'
                        ? 'border-green-200 text-green-700'
                        : 'border-purple-200 text-purple-700'
                    }
                  >
                    {caseItem.category}
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    {caseItem.subject}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8'>
                      <AvatarFallback className='text-xs'>
                        {caseItem.profiles?.display_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium text-foreground'>
                        {caseItem.profiles?.display_name}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {caseItem.profiles?.school_name}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                    <Calendar className='w-3 h-3' />
                    {new Date(caseItem.created_at).toLocaleDateString('ja-JP')}
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`gap-1 ${
                      userLikes.includes(caseItem.id)
                        ? 'text-red-500'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => handleLike(caseItem.id)}
                    disabled={!user}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        userLikes.includes(caseItem.id) ? 'fill-current' : ''
                      }`}
                    />
                    {caseItem.likes_count}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='gap-1 text-muted-foreground'
                  >
                    <MessageSquare className='w-4 h-4' />
                    {caseItem.comments_count}
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='gap-1 bg-transparent'
                    asChild
                  >
                    <Link href={`/case/${caseItem.id}`}>
                      <BookOpen className='w-4 h-4' />
                      詳細を見る
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
