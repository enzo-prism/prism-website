import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { BlogPostContentSkeleton, Skeleton } from "@/components/blog-skeleton"

export default function BlogPostLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" aria-busy="true">
        <div className="prism-container pb-24 pt-10 sm:pt-16">
          <div className="mx-auto w-full max-w-[46rem]">
            <Skeleton className="h-4 w-24" />
            <div className="mt-10 flex items-center gap-3">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-3.5 w-16" />
            </div>
            <Skeleton className="mt-6 h-12 w-full sm:h-14" />
            <Skeleton className="mt-3 h-12 w-3/4 sm:h-14" />
            <Skeleton className="mt-7 h-5 w-full" />
            <Skeleton className="mt-3 h-5 w-2/3" />
            <div className="mt-9 flex items-center gap-3 border-t border-white/[0.08] pt-6">
              <Skeleton className="size-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="mt-14">
              <BlogPostContentSkeleton />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
