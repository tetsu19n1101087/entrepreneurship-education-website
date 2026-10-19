'use client';

import { useActionState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import CommentItem from './comment-item';
import type { User } from '@supabase/supabase-js';
import { type Comment } from '@/lib/definitions';
import { createComment } from '@/lib/action';
import type { Profile } from '@/lib/definitions';

export function CommentSection({
  caseId,
  user,
  comments,
  profile,
}: {
  caseId: string;
  user: User | null;
  comments: Comment[];
  profile?: Profile | null;
}) {
  const createCommentWithId = createComment.bind(null, {
    case_id: caseId,
    author_id: user?.id || '',
  });

  const [state, formAction, isPending] = useActionState(createCommentWithId, {
    error: '',
  });

  const totalComments = comments.reduce(
    (total, comment) => total + 1 + (comment.replies?.length || 0),
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-space-8'>
          <MessageSquare className='w-5 h-5' />
          コメント・質問 ({totalComments})
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-space-24'>
        {/* Comment Form */}
        {user && (
          <form action={formAction}>
            <div className='space-y-space-16'>
              <div className='flex items-start gap-space-16'>
                <Avatar className='w-8 h-8'>
                  <AvatarFallback className='text-body-xs'>
                    {profile?.display_name?.charAt(0) ||
                      user.user_metadata?.display_name?.charAt(0) ||
                      user.email?.charAt(0) ||
                      'U'}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <Textarea
                    id='comment'
                    name='comment'
                    placeholder='この事例について質問やコメントを投稿してください...'
                    rows={3}
                    required
                  />
                </div>
              </div>
              {state?.error && (
                <div className='text-destructive text-body-sm bg-destructive-subtle p-space-16 rounded-md'>
                  {state.error}
                </div>
              )}
              <div className='flex justify-end'>
                <Button type='submit' disabled={isPending}>
                  コメントを投稿
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Comments List */}
        <div className='space-y-space-24'>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              user={user}
              action={createCommentWithId}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
