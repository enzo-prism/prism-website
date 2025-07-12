import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200",
        className
      )}
    />
  )
}

export function BlogPostCardSkeleton() {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden h-full">
      {/* Image skeleton */}
      <Skeleton className="relative w-full aspect-[4/3]" />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3 border-t border-neutral-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  )
}

export function BlogPostContentSkeleton() {
  return (
    <div className="prose-blog space-y-6">
      {/* Paragraph skeletons */}
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
      
      {/* Heading skeleton */}
      <Skeleton className="h-8 w-3/4 mt-12" />
      
      {/* More paragraph skeletons */}
      {[1, 2, 3].map(i => (
        <div key={`p2-${i}`} className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
      
      {/* Image skeleton */}
      <Skeleton className="h-64 w-full my-8" />
      
      {/* Final paragraphs */}
      {[1, 2].map(i => (
        <div key={`p3-${i}`} className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  )
}

// Loading state for inline MDX content rendering
export function MDXContentLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600" />
        <span className="text-neutral-600 lowercase">loading content...</span>
      </div>
    </div>
  )
}