import { CaseDetail } from '@/components/case/case-detail';
import { CommentSection } from '@/components/case/comment-section';
import { createClient } from '@/lib/supabase/server';
import { getCommentsByCase } from '@/lib/supabase/comments';

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const comments = await getCommentsByCase(id);

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <CaseDetail caseId={id} />
          <div className='mt-8'>
            <CommentSection caseId={id} user={user!} comments={comments}/>
          </div>
        </div>
      </div>
    </div>
  );
}
