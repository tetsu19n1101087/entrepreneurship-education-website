import { Card, CardContent } from '@/components/ui/card';
import CaseItem from './case-item';
import { getCases, type Case } from '@/lib/supabase/cases';
import { createClient } from '@/lib/supabase/server';

export default async function CaseList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cases: Case[] = await getCases();

  if (!cases || cases.length === 0) {
    return (
      <Card className='text-center py-12'>
        <CardContent>
          <p className='text-muted-foreground'>
            事例がまだ投稿されていません。
          </p>
          <p className='text-sm text-muted-foreground mt-2'>
            事例を投稿して、コミュニティに貢献しましょう！
          </p>
        </CardContent>
      </Card>
    );
  }

  return <CaseItem user={user} cases={cases} />;
}
