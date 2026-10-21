'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface Props {
  teacherId: string;
  initialIsFollowing?: boolean;
  initialFollowersCount?: number;
}

export default function TeacherProfileActions({
  teacherId,
  initialIsFollowing = false,
  initialFollowersCount = 0,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    // TODO: call server action / API to actually follow/unfollow
  };

  return (
    <div className='flex gap-space-8'>
      <Button
        data-teacher-id={teacherId}
        variant={isFollowing ? 'outline' : 'default'}
        size='sm'
        onClick={handleFollow}
        className='gap-space-4'
      >
        <UserPlus className='h-3 w-3' />
        {isFollowing ? 'フォロー中' : 'フォロー'}
      </Button>
      <span className='self-center text-body-xs text-muted-foreground'>
        {followersCount}人
      </span>
      <Button
        variant='outline'
        size='sm'
        className='gap-space-4 bg-transparent'
      >
        <MessageCircle className='h-3 w-3' />
        メッセージ
      </Button>
    </div>
  );
}
