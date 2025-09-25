import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getCasesCount } from '@/lib/supabase/cases';

export default async function StatsOverview() {
  const casesCount = await getCasesCount();

  const stats = [
    {
      icon: BookOpen,
      label: '投稿事例数',
      value: String(casesCount),
      description: '実践事例',
      href: '/',
    },
    {
      icon: Users,
      label: '参加教員数',
      value: '89',
      description: '県内教員',
      href: '/teachers',
    },
    {
      icon: MessageSquare,
      label: 'コメント数',
      value: '342',
      description: '意見交換',
      href: '/',
    },
    {
      icon: TrendingUp,
      label: '今月の投稿',
      value: '23',
      description: '新規事例',
      href: '/',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map((stat, index) => (
        <Link key={index} href={stat.href}>
          <Card className='bg-card border hover:shadow-md transition-shadow cursor-pointer'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-primary/10 rounded-lg'>
                  <stat.icon className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <p className='text-2xl font-bold text-foreground'>
                    {stat.value}
                  </p>
                  <p className='text-sm font-medium text-foreground'>
                    {stat.label}
                  </p>
                  <p className='text-xs text-muted-foreground'>
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
