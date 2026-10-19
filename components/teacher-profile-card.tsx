import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import TeacherProfileActions from "@/components/teacher-profile-actions"

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
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-space-24">
        <div className="flex items-start gap-space-16">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="text-body-md">{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-space-8 mb-space-4">
              <h3 className="text-heading-md">{teacher.name}</h3>
              <Badge variant="outline">
                {teacher.schoolType}
              </Badge>
            </div>
            <p className="text-body-sm text-muted-foreground mb-space-4">{teacher.school}</p>
            <p className="text-body-xs text-muted-foreground mb-space-16">{teacher.position}</p>

            <div className="flex items-center gap-space-16 text-body-xs text-muted-foreground mb-space-16">
              <div className="flex items-center gap-space-4">
                <BookOpen className="w-3 h-3" />
                {teacher.postsCount}件の投稿
              </div>
              <div className="flex items-center gap-space-4">
                {/* followers count is provided from server data */}
                <span className="sr-only">フォロワー数</span>
                {teacher.followersCount}人がフォロー
              </div>
            </div>

            {/* Interactive parts live in a client component so this file can be a Server Component */}
            <TeacherProfileActions
              teacherId={teacher.id}
              initialIsFollowing={teacher.isFollowing}
              initialFollowersCount={teacher.followersCount}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
