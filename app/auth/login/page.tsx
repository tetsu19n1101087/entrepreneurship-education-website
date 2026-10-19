import { LoginForm } from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className='flex h-full flex-1 items-center justify-center bg-background p-space-16'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-heading-xl text-foreground'>
            ログイン
          </CardTitle>
          <CardDescription>
            千葉県アントレプレナーシップ教育事例共有プラットフォーム
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
