import { CaseDetail } from '@/components/case/case-detail';
import { CommentSection } from '@/components/case/comment-section';

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <CaseDetail caseId={id} />
          <div className='mt-8'>
            <CommentSection caseId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
