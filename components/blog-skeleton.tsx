import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  )
}

export function BlogPostCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
      <Skeleton className="aspect-[1.91/1] w-full rounded-none bg-popover" />
      <div className="space-y-4 border-t border-white/[0.06] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3.5 w-16" />
        </div>
        <Skeleton className="h-5 w-11/12" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export function BlogPostContentSkeleton() {
  return (
    <div className="space-y-7">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
      <Skeleton className="mt-12 h-7 w-3/5" />
      {[1, 2].map((i) => (
        <div key={`p2-${i}`} className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
      <Skeleton className="my-8 h-56 w-full rounded-2xl" />
    </div>
  )
}

// Loading state for inline MDX content rendering
export function MDXContentLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground/60" />
        <span className="text-muted-foreground">loading content…</span>
      </div>
    </div>
  )
}
