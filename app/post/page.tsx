import { PostForm } from '@/components/post/post-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';

export default async function PostPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='h-full flex-1 bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-foreground mb-2'>
              アントレプレナーシップ教育事例を投稿
            </h1>
            <p className='text-muted-foreground text-lg'>
              あなたの実践事例を共有して、他の教員の皆様と学び合いましょう
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>事例投稿フォーム</CardTitle>
              <CardDescription>
                実践された事例の詳細をご記入ください。他の教員の方々にとって参考になる情報をお願いします。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PostForm user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
