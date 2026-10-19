import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function CheckEmailPage() {
  return (
    <div className='flex h-full flex-1 items-center justify-center bg-background p-space-16'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='mx-auto mb-space-16 flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle'>
            <Mail className='h-6 w-6 text-primary' />
          </div>
          <CardTitle className='text-heading-xl text-foreground'>
            メールを確認してください
          </CardTitle>
          <CardDescription>
            登録確認のメールを送信しました。メール内のリンクをクリックしてアカウントを有効化してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-space-16'>
            <p className='text-body-sm text-muted-foreground'>
              メールが届かない場合は、迷惑メールフォルダもご確認ください。
            </p>
            <Button asChild className='w-full'>
              <Link href='/auth/login'>ログインページに戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
