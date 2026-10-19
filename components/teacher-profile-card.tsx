import TeacherProfileActions from '@/components/teacher-profile-actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface TeacherProfileCardProps {
  teacher: {
    id: string;
    name: string;
    school: string;
    schoolType: string;
    position: string;
    postsCount: number;
    followersCount: number;
    isFollowing?: boolean;
  };
}

export function TeacherProfileCard({ teacher }: TeacherProfileCardProps) {
  return (
    <Card className='transition-shadow hover:shadow-md'>
      <CardContent className='p-space-24'>
        <div className='flex items-start gap-space-16'>
          <Avatar className='h-12 w-12'>
            <AvatarFallback className='text-body-md'>
              {teacher.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className='flex-1'>
            <div className='mb-space-4 flex items-center gap-space-8'>
              <h3 className='text-heading-md'>{teacher.name}</h3>
              <Badge variant='outline'>{teacher.schoolType}</Badge>
            </div>
            <p className='mb-space-4 text-body-sm text-muted-foreground'>
              {teacher.school}
            </p>
            <p className='mb-space-16 text-body-xs text-muted-foreground'>
              {teacher.position}
            </p>

            <div className='mb-space-16 flex items-center gap-space-16 text-body-xs text-muted-foreground'>
              <div className='flex items-center gap-space-4'>
                <BookOpen className='h-3 w-3' />
                {teacher.postsCount}件の投稿
              </div>
              <div className='flex items-center gap-space-4'>
                {/* followers count is provided from server data */}
                <span className='sr-only'>フォロワー数</span>
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
  );
}
