import { Card, CardContent } from '@/components/ui/card';
import { type Case } from '@/lib/definitions';
import { getCases } from '@/lib/supabase/cases';
import { createClient } from '@/lib/supabase/server';
import CaseItem from './case-item';

export default async function CaseList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cases: Case[] = await getCases();

  if (!cases || cases.length === 0) {
    return (
      <Card className='py-space-48 text-center'>
        <CardContent>
          <p className='text-body-md text-muted-foreground'>
            事例がまだ投稿されていません。
          </p>
          <p className='mt-space-8 text-body-sm text-muted-foreground'>
            事例を投稿して、コミュニティに貢献しましょう！
          </p>
        </CardContent>
      </Card>
    );
  }

  return <CaseItem user={user} cases={cases} />;
}
