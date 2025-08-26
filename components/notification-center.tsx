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
        return <Heart className="w-4 h-4 text-red-500" />
      case "comment":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case "follow":
        return <UserPlus className="w-4 h-4 text-green-500" />
      case "post":
        return <BookOpen className="w-4 h-4 text-purple-500" />
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
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              通知
              {unreadCount > 0 && <Badge variant="secondary">{unreadCount}件の未読</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  !notification.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{notification.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{notification.user}</span>
                    {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
