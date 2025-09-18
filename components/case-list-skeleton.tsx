export function CaseListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4">
            {/* Avatar skeleton */}
            <div className="w-12 h-12 bg-muted rounded-full shimmer" />

            <div className="flex-1 space-y-3">
              {/* Title skeleton */}
              <div className="h-6 bg-muted rounded shimmer w-3/4" />

              {/* Author and date skeleton */}
              <div className="flex items-center gap-4">
                <div className="h-4 bg-muted rounded shimmer w-24" />
                <div className="h-4 bg-muted rounded shimmer w-20" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded shimmer w-full" />
                <div className="h-4 bg-muted rounded shimmer w-5/6" />
                <div className="h-4 bg-muted rounded shimmer w-4/6" />
              </div>

              {/* Tags skeleton */}
              <div className="flex gap-2 pt-2">
                <div className="h-6 bg-muted rounded-full shimmer w-16" />
                <div className="h-6 bg-muted rounded-full shimmer w-20" />
                <div className="h-6 bg-muted rounded-full shimmer w-14" />
              </div>

              {/* Stats skeleton */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-muted rounded shimmer" />
                  <div className="h-4 bg-muted rounded shimmer w-8" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-muted rounded shimmer" />
                  <div className="h-4 bg-muted rounded shimmer w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
