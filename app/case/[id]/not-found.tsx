import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <div className='mx-auto max-w-md space-y-space-24 px-space-16 text-center'>
        <div className='space-y-space-8'>
          <div className='font-en text-heading-xl text-disabled-foreground'>
            404
          </div>
          <h1 className='text-heading-xl text-foreground'>
            事例が見つかりません
          </h1>
          <p className='text-body-md text-muted-foreground'>
            お探しの教育事例は削除されたか、URLが間違っている可能性があります。
          </p>
        </div>

        <div className='flex flex-col justify-center gap-space-16 sm:flex-row'>
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
