'use client';

import { useState, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Reply, MoreHorizontal, Flag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@supabase/supabase-js';
import { type Comment } from '@/lib/supabase/comments';
import { CommentLikesButton } from './likes';

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
    formData: FormData
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
    data: undefined,
  });

  return (
    <div
      className={`${
        isReply
          ? 'ml-8 border-l border-muted pl-4'
          : 'border-l-2 border-muted pl-4'
      }`}
    >
      <div className='flex items-start gap-3'>
        <Avatar className='w-8 h-8'>
          <AvatarFallback className='text-xs'>
            {comment.profiles?.display_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-1'>
            <p className='font-medium text-sm'>
              {comment.profiles?.display_name}
            </p>
            <Badge variant='outline' className='text-xs px-1 py-0'>
              {comment.profiles?.school_name.includes('小学校')
                ? '小'
                : comment.profiles?.school_name.includes('中学校')
                ? '中'
                : '高'}
            </Badge>
            <p className='text-xs text-muted-foreground'>
              • {new Date(comment.created_at).toLocaleDateString('ja-JP')}
            </p>
          </div>
          <p className='text-sm mb-3'>{comment.content}</p>

          <div className='flex items-center gap-4'>
            {/* いいねボタン */}
            <CommentLikesButton
              // count={comment.likes_count}
              commentId={comment.id}
              userId={user?.id}
            />

            {!isReply && (
              <Button
                variant='ghost'
                size='sm'
                className='gap-1 h-7 px-2 text-muted-foreground'
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                disabled={!user}
              >
                <Reply className='w-3 h-3' />
                返信
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='sm' className='h-7 w-7 p-0'>
                  <MoreHorizontal className='w-3 h-3' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem className='gap-2'>
                  <Flag className='w-3 h-3' />
                  報告
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && user && (
            <form action={formAction}>
              <div className='mt-4 space-y-3'>
                <Textarea
                  placeholder={`${comment.profiles?.display_name}さんに返信...`}
                  rows={2}
                  name='comment'
                  className='text-sm'
                  required
                />
                <input type='hidden' name='parent_id' value={comment.id} />
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setReplyingTo(null)}
                  >
                    キャンセル
                  </Button>
                  <Button size='sm' type='submit'>
                    返信
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className='mt-4 space-y-4'>
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
