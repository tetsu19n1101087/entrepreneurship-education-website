import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className='h-full flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold text-blue-900'>
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
