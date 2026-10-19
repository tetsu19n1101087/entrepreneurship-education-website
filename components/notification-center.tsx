'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, BookOpen, Heart, MessageSquare, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'post';
  user: string;
  content: string;
  time: string;
  isRead: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: '佐藤 太郎',
      content: 'あなたの事例「地域課題解決プロジェクト」にいいねしました',
      time: '5分前',
      isRead: false,
    },
    {
      id: '2',
      type: 'comment',
      user: '山田 次郎',
      content: 'あなたの事例にコメントしました',
      time: '1時間前',
      isRead: false,
    },
    {
      id: '3',
      type: 'follow',
      user: '鈴木 花子',
      content: 'あなたをフォローしました',
      time: '2時間前',
      isRead: true,
    },
    {
      id: '4',
      type: 'post',
      user: '田中 一郎',
      content: '新しい事例「SDGs×起業教育」を投稿しました',
      time: '3時間前',
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className='h-4 w-4 text-destructive' />;
      case 'comment':
        return <MessageSquare className='h-4 w-4 text-primary' />;
      case 'follow':
        return <UserPlus className='h-4 w-4 text-primary' />;
      case 'post':
        return <BookOpen className='h-4 w-4 text-primary' />;
      default:
        return <Bell className='h-4 w-4' />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='relative bg-transparent'
        >
          <Bell className='h-4 w-4' />
          {unreadCount > 0 && (
            <Badge className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0 font-en'>
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-80'>
        <Card className='border-0 shadow-none'>
          <CardHeader className='pb-space-16'>
            <CardTitle className='flex items-center justify-between'>
              通知
              {unreadCount > 0 && (
                <Badge variant='secondary'>{unreadCount}件の未読</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className='max-h-96 space-y-space-16 overflow-y-auto'>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex cursor-pointer items-start gap-space-16 rounded-md p-space-16 transition-colors ${
                  !notification.isRead
                    ? 'bg-primary-subtle hover:bg-accent'
                    : 'hover:bg-accent'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className='mt-space-4 flex-shrink-0'>
                  {getIcon(notification.type)}
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='mb-space-4 flex items-center gap-space-8'>
                    <Avatar className='h-6 w-6'>
                      <AvatarFallback className='text-body-xs'>
                        {notification.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-body-sm'>{notification.user}</span>
                    {!notification.isRead && (
                      <div className='h-2 w-2 rounded-full bg-primary'></div>
                    )}
                  </div>
                  <p className='text-body-sm text-muted-foreground'>
                    {notification.content}
                  </p>
                  <p className='mt-space-4 text-body-xs text-muted-foreground'>
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
