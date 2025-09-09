'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Heart,
  Reply,
  MoreHorizontal,
  Flag,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import {
  getCommentsByCase,
  createComment,
  type Comment,
} from '@/lib/supabase/comments';
import { toggleCommentLike, getUserLikes } from '@/lib/supabase/likes';

interface CommentSectionProps {
  caseId: string;
}

export function CommentSection({ caseId }: CommentSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [userCommentLikes, setUserCommentLikes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
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
    loadComments();
    if (user) {
      loadUserLikes();
    }
  }, [caseId, user]);

  const loadComments = async () => {
    try {
      const data = await getCommentsByCase(caseId);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserLikes = async () => {
    if (!user) return;
    try {
      const { commentLikes } = await getUserLikes(user.id);
      setUserCommentLikes(commentLikes);
    } catch (error) {
      console.error('Error loading user likes:', error);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    try {
      await createComment({
        case_id: caseId,
        author_id: user.id,
        content: newComment,
      });

      setNewComment('');
      loadComments(); // Reload comments
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !user) return;

    try {
      await createComment({
        case_id: caseId,
        author_id: user.id,
        parent_id: parentId,
        content: replyContent,
      });

      setReplyContent('');
      setReplyingTo(null);
      loadComments(); // Reload comments
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) return;

    try {
      const isLiked = await toggleCommentLike(commentId, user.id);

      // Update local state
      const updateCommentLikes = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes_count: comment.likes_count + (isLiked ? 1 : -1),
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateCommentLikes(comment.replies),
            };
          }
          return comment;
        });
      };

      setComments(updateCommentLikes(comments));
      setUserCommentLikes((prev) =>
        isLiked ? [...prev, commentId] : prev.filter((id) => id !== commentId)
      );
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => (
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
            {comment.profiles?.full_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-1'>
            <p className='font-medium text-sm'>{comment.profiles?.full_name}</p>
            <Badge variant='outline' className='text-xs px-1 py-0'>
              {comment.profiles?.school.includes('小学校')
                ? '小'
                : comment.profiles?.school.includes('中学校')
                ? '中'
                : '高'}
            </Badge>
            <p className='text-xs text-muted-foreground'>
              • {new Date(comment.created_at).toLocaleDateString('ja-JP')}
            </p>
          </div>
          <p className='text-sm mb-3'>{comment.content}</p>

          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='sm'
              className={`gap-1 h-7 px-2 ${
                userCommentLikes.includes(comment.id)
                  ? 'text-red-500'
                  : 'text-muted-foreground'
              }`}
              onClick={() => handleLikeComment(comment.id)}
              disabled={!user}
            >
              <Heart
                className={`w-3 h-3 ${
                  userCommentLikes.includes(comment.id) ? 'fill-current' : ''
                }`}
              />
              {comment.likes_count}
            </Button>

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
            <div className='mt-4 space-y-3'>
              <Textarea
                placeholder={`${comment.profiles?.full_name}さんに返信...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={2}
                className='text-sm'
              />
              <div className='flex justify-end gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setReplyingTo(null)}
                >
                  キャンセル
                </Button>
                <Button
                  size='sm'
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyContent.trim()}
                >
                  返信
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className='mt-4 space-y-4'>
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const totalComments = comments.reduce(
    (total, comment) => total + 1 + (comment.replies?.length || 0),
    0
  );

  if (loading) {
    return <div className='text-center py-4'>コメントを読み込み中...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MessageSquare className='w-5 h-5' />
          コメント・質問 ({totalComments})
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Comment Form */}
        {user && (
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <Avatar className='w-8 h-8'>
                <AvatarFallback className='text-xs'>
                  {user.user_metadata?.display_name?.charAt(0) ||
                    user.email?.charAt(0) ||
                    'U'}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <Textarea
                  placeholder='この事例について質問やコメントを投稿してください...'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                コメントを投稿
              </Button>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className='space-y-6'>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>

        {!user && (
          <div className='text-center py-4 text-muted-foreground'>
            <p>
              コメントを投稿するには
              <a href='/auth/login' className='text-primary hover:underline'>
                ログイン
              </a>
              が必要です
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
