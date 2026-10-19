import { CaseDetail } from '@/components/case/case-detail';
import { CommentSection } from '@/components/case/comment-section';
import type { Profile } from '@/lib/definitions';
import { getCommentsByCase } from '@/lib/supabase/comments';
import { getProfileById } from '@/lib/supabase/profiles';
import { createClient } from '@/lib/supabase/server';

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

  const profile: Profile | null = user ? await getProfileById(user.id) : null;

  return (
    <div className='bg-background'>
      <div className='container mx-auto px-space-16 py-space-32'>
        <div className='mx-auto max-w-4xl'>
          <CaseDetail caseId={id} />
          <div className='mt-space-32'>
            <CommentSection
              caseId={id}
              user={user}
              comments={comments}
              profile={profile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
