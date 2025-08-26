"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, MessageCircle, BookOpen } from "lucide-react"
import { useState } from "react"

interface TeacherProfileCardProps {
  teacher: {
    id: string
    name: string
    school: string
    schoolType: string
    position: string
    postsCount: number
    followersCount: number
    isFollowing?: boolean
  }
}

export function TeacherProfileCard({ teacher }: TeacherProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(teacher.isFollowing || false)
  const [followersCount, setFollowersCount] = useState(teacher.followersCount)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1))
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="text-lg">{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{teacher.name}</h3>
              <Badge variant="outline" className="text-xs">
                {teacher.schoolType}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{teacher.school}</p>
            <p className="text-xs text-muted-foreground mb-3">{teacher.position}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {teacher.postsCount}件の投稿
              </div>
              <div className="flex items-center gap-1">
                <UserPlus className="w-3 h-3" />
                {followersCount}人がフォロー
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={handleFollow} className="gap-1">
                <UserPlus className="w-3 h-3" />
                {isFollowing ? "フォロー中" : "フォロー"}
              </Button>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <MessageCircle className="w-3 h-3" />
                メッセージ
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
