import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='text-center space-y-6 max-w-md mx-auto px-4'>
        <div className='space-y-2'>
          <div className='text-6xl font-bold text-muted-foreground/30'>404</div>
          <h1 className='text-2xl font-bold text-foreground'>
            事例が見つかりません
          </h1>
          <p className='text-muted-foreground leading-relaxed'>
            お探しの教育事例は削除されたか、URLが間違っている可能性があります。
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button asChild>
            <Link href='/'>ホーム画面に戻る</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/post'>新しい事例を投稿</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
