'use client';

import { Button } from '@/components/ui/button';
import {
  getCaseLikes,
  getCommentLikes,
  toggleCaseLike,
  toggleCommentLike,
} from '@/lib/supabase/likes';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CaseLikesButton({
  caseId,
  userId,
}: {
  caseId: string;
  userId: string | undefined | null;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(0);

  useEffect(() => {
    const loadUserLikes = async () => {
      const caseLikes = await getCaseLikes(caseId);
      setCountLikes(caseLikes.length);

      setIsLiked(userId ? caseLikes.includes(userId) : false);
    };

    loadUserLikes();
  });

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
      className='gap-space-4 font-en text-meta-sm'
      disabled={!userId}
    >
      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
      {/* {count + (isLiked ? 1 : 0)} */}
      {countLikes}
    </Button>
  );
}

export function CommentLikesButton({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string | undefined | null;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(0);

  useEffect(() => {
    const loadUserLikes = async () => {
      const commentLikes = await getCommentLikes(commentId);
      setCountLikes(commentLikes.length);

      setIsLiked(userId ? commentLikes.includes(userId) : false);
    };

    loadUserLikes();
  });

  const handleLike = async () => {
    if (!userId) return;

    try {
      const isLiked = await toggleCommentLike(commentId, userId);
      setIsLiked(isLiked);
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      className={`gap-space-4 px-space-8 font-en text-meta-sm ${
        isLiked ? 'text-destructive' : 'text-muted-foreground'
      }`}
      onClick={() => handleLike()}
      disabled={!userId}
    >
      <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
      {countLikes}
    </Button>
  );
}
