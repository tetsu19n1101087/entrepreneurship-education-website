'use client';

import { useState, useEffect } from 'react';
import { toggleCaseLike, getUserLikes } from '@/lib/supabase/likes';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export function LikesButton({
  count,
  caseId,
  userId,
}: {
  count: number;
  caseId: string;
  userId: string | null;
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadUserLikes();
  }, [caseId, userId]);

  const loadUserLikes = async () => {
    if (!userId) return;
    
    const { caseLikes } = await getUserLikes(userId);
    setIsLiked(caseLikes.includes(caseId));
  };

  const handleLike = async () => {
    if (!userId) return;

    try {
      const isLiked = await toggleCaseLike(caseId, userId);
      setIsLiked(isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Button
      variant={isLiked ? 'default' : 'outline'}
      size='sm'
      onClick={handleLike}
      className='gap-1'
      disabled={!userId}
    >
      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
      {count + (isLiked ? 1 : 0)}
    </Button>
  );
}
