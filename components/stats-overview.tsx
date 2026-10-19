import { Card, CardContent } from '@/components/ui/card';
import { getCasesCount } from '@/lib/supabase/cases';
import { getCommentsCount } from '@/lib/supabase/comments';
import { getProfilesCount } from '@/lib/supabase/profiles';
import { BookOpen, MessageSquare, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default async function StatsOverview() {
  const [casesCount, profilesCount, commentsCount, monthlyCasesCount] =
    await Promise.all([
      getCasesCount(),
      getProfilesCount(),
      getCommentsCount(),
      getCasesCount(new Date()),
    ]);

  const stats = [
    {
      icon: BookOpen,
      label: '投稿事例数',
      value: casesCount,
      description: '実践事例',
      href: '/',
    },
    {
      icon: Users,
      label: '参加教員数',
      value: profilesCount,
      description: '県内教員',
      href: '/teachers',
    },
    {
      icon: MessageSquare,
      label: 'コメント数',
      value: commentsCount,
      description: '意見交換',
      href: '/',
    },
    {
      icon: TrendingUp,
      label: '今月の投稿',
      value: monthlyCasesCount,
      description: '新規事例',
      href: '/',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-space-16 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => (
        <Link key={index} href={stat.href}>
          <Card className='cursor-pointer border bg-card transition-shadow hover:shadow-md'>
            <CardContent className='p-space-24'>
              <div className='flex items-center gap-space-16'>
                <div className='rounded-md bg-primary-subtle p-space-16'>
                  <stat.icon className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <p className='font-en text-heading-xl text-foreground'>
                    {stat.value}
                  </p>
                  <p className='text-body-sm text-foreground'>{stat.label}</p>
                  <p className='text-body-xs text-muted-foreground'>
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
