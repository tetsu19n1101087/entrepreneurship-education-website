'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { UserAvatar } from '@/components/user-avatar';
import { createComment } from '@/lib/action';
import type { Profile } from '@/lib/definitions';
import { type Comment } from '@/lib/definitions';
import type { User } from '@supabase/supabase-js';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useActionState } from 'react';
import CommentItem from './comment-item';

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
          <MessageSquare className='h-5 w-5' />
          コメント・質問 ({totalComments})
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-space-24'>
        {/* Comment Form */}
        {!user && (
          <div className='flex flex-col items-start gap-space-16 rounded-md bg-muted p-space-16 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-body-sm text-muted-foreground'>
              コメント・返信・いいねをするには、ログインが必要です。
            </p>
            <Button asChild size='sm'>
              <Link href={`/auth/login?next=/case/${caseId}`}>ログイン</Link>
            </Button>
          </div>
        )}

        {user && (
          <form action={formAction}>
            <div className='space-y-space-16'>
              <div className='flex items-start gap-space-16'>
                <UserAvatar
                  src={profile?.avatar_url}
                  name={
                    profile?.display_name ||
                    user.user_metadata?.display_name ||
                    user.email
                  }
                  size={32}
                  fallbackClassName='text-body-xs'
                />
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
                <div className='rounded-md bg-destructive-subtle p-space-16 text-body-sm text-destructive'>
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
