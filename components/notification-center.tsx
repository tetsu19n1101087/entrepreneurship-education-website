"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Heart, MessageSquare, UserPlus, BookOpen } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "post"
  user: string
  content: string
  time: string
  isRead: boolean
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      user: "佐藤 太郎",
      content: "あなたの事例「地域課題解決プロジェクト」にいいねしました",
      time: "5分前",
      isRead: false,
    },
    {
      id: "2",
      type: "comment",
      user: "山田 次郎",
      content: "あなたの事例にコメントしました",
      time: "1時間前",
      isRead: false,
    },
    {
      id: "3",
      type: "follow",
      user: "鈴木 花子",
      content: "あなたをフォローしました",
      time: "2時間前",
      isRead: true,
    },
    {
      id: "4",
      type: "post",
      user: "田中 一郎",
      content: "新しい事例「SDGs×起業教育」を投稿しました",
      time: "3時間前",
      isRead: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-destructive" />
      case "comment":
        return <MessageSquare className="w-4 h-4 text-primary" />
      case "follow":
        return <UserPlus className="w-4 h-4 text-primary" />
      case "post":
        return <BookOpen className="w-4 h-4 text-primary" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center font-en">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-space-16">
            <CardTitle className="flex items-center justify-between">
              通知
              {unreadCount > 0 && <Badge variant="secondary">{unreadCount}件の未読</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-space-16 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-space-16 p-space-16 rounded-md cursor-pointer transition-colors ${
                  !notification.isRead ? "bg-primary-subtle hover:bg-accent" : "hover:bg-accent"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-space-4">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-space-8 mb-space-4">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-body-xs">{notification.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-body-sm">{notification.user}</span>
                    {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                  <p className="text-body-sm text-muted-foreground">{notification.content}</p>
                  <p className="text-body-xs text-muted-foreground mt-space-4">{notification.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
