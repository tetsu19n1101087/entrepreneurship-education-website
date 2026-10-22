'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { type Comment } from '@/lib/definitions';
import { formatDate, toDateTimeAttribute } from '@/lib/format-date';
import type { User } from '@supabase/supabase-js';
import { Flag, MoreHorizontal, Reply } from 'lucide-react';
import { useActionState, useState } from 'react';
import { CommentLikesButton } from './likes-button';

export default function CommentItem({
  comment,
  isReply = false,
  user,
  action,
}: {
  comment: Comment;
  isReply?: boolean;
  user: User | null;
  action: (
    prevState: { error?: string; data?: Comment },
    formData: FormData,
  ) => Promise<
    | {
        error: string;
        data?: undefined;
      }
    | {
        data: Comment;
        error?: undefined;
      }
  >;
}) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(action, {
    error: '',
  });

  return (
    <div
      className={`${
        isReply
          ? 'ml-space-32 border-l border-muted pl-space-16'
          : 'border-l-2 border-muted pl-space-16'
      }`}
    >
      <div className='flex items-start gap-space-16'>
        <Avatar className='h-8 w-8'>
          <AvatarFallback className='text-body-xs'>
            {comment.profiles?.display_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='mb-space-4 flex items-center gap-space-8'>
            <p className='text-body-sm'>{comment.profiles?.display_name}</p>
            <Badge variant='outline' className='px-space-4 py-0'>
              {comment.profiles?.school_name.includes('小学校')
                ? '小'
                : comment.profiles?.school_name.includes('中学校')
                  ? '中'
                  : '高'}
            </Badge>
            <p className='font-en text-meta-sm text-muted-foreground'>
              •{' '}
              <time dateTime={toDateTimeAttribute(comment.created_at)}>
                {formatDate(comment.created_at)}
              </time>
            </p>
          </div>
          <p className='mb-space-16 text-body-sm'>{comment.content}</p>

          <div className='flex items-center gap-space-16'>
            {/* いいねボタン */}
            <CommentLikesButton commentId={comment.id} userId={user?.id} />

            {!isReply && (
              <Button
                variant='ghost'
                size='sm'
                className='gap-space-4 px-space-8 text-muted-foreground'
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                disabled={!user}
              >
                <Reply className='h-3 w-3' />
                返信
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <MoreHorizontal className='h-3 w-3' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem className='gap-space-8'>
                  <Flag className='h-3 w-3' />
                  報告
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && user && (
            <form action={formAction}>
              <div className='mt-space-16 space-y-space-16'>
                <Textarea
                  placeholder={`${comment.profiles?.display_name}さんに返信...`}
                  rows={2}
                  name='comment'
                  className='text-body-sm'
                  required
                />
                <input type='hidden' name='parent_id' value={comment.id} />
                {state?.error && (
                  <div className='rounded-md bg-destructive-subtle p-space-16 text-body-sm text-destructive'>
                    {state.error}
                  </div>
                )}
                <div className='flex justify-end gap-space-8'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setReplyingTo(null)}
                  >
                    キャンセル
                  </Button>
                  <Button size='sm' type='submit' disabled={isPending}>
                    返信
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className='mt-space-16 space-y-space-16'>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  user={user}
                  action={action}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
