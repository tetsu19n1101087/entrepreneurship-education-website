import { Card, CardContent } from '@/components/ui/card';

// 本文ができるまでフッターのリンク先に置く仮ページ
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className='container mx-auto px-space-16 py-space-32'>
      <h1 className='mb-space-24 text-heading-xl text-foreground'>{title}</h1>
      <Card className='py-space-48 text-center'>
        <CardContent>
          <p className='text-body-md text-muted-foreground'>
            このページは準備中です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
