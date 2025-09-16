'use client';

import { useState, useEffect } from 'react';
import {
  toggleCaseLike,
  toggleCommentLike,
  getUserLikes,
  getCaseLikes,
  getCommentLikes,
} from '@/lib/supabase/likes';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

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
      if (!userId) return;

      const caseLikes = await getCaseLikes(caseId);
      setCountLikes(caseLikes.length);
      setIsLiked(caseLikes.includes(userId));
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
      className='gap-1'
      disabled={!userId}
    >
      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
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
      if (!userId) return;

      const commentLikes = await getCommentLikes(commentId);
      setCountLikes(commentLikes.length);
      setIsLiked(commentLikes.includes(userId));
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
      className={`gap-1 h-7 px-2 ${
        isLiked ? 'text-red-500' : 'text-muted-foreground'
      }`}
      onClick={() => handleLike()}
      disabled={!userId}
    >
      <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
      {countLikes}
    </Button>
  );
}
