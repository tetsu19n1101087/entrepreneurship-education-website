import { CaseDetail } from "@/components/case/case-detail"
import { CommentSection } from "@/components/case/comment-section"

interface CasePageProps {
  params: {
    id: string
  }
}

export default function CasePage({ params }: CasePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <CaseDetail caseId={params.id} />
          <div className="mt-8">
            <CommentSection caseId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
