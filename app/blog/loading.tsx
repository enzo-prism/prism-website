import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { BlogPostCardSkeleton, Skeleton } from "@/components/blog-skeleton"

export default function BlogLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" aria-busy="true">
        <section className="pb-10 pt-14 sm:pb-14 sm:pt-20">
          <div className="prism-container">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="mt-6 h-16 w-full max-w-md sm:h-24" />
            <Skeleton className="mt-6 h-5 w-full max-w-xl" />
            <div className="mt-10 flex gap-2 border-t border-white/[0.08] pt-6 sm:mt-14">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-28 shrink-0 rounded-full" />
              ))}
            </div>
          </div>
        </section>
        <section className="pb-20">
          <div className="prism-container">
            <Skeleton className="mb-6 h-72 w-full rounded-3xl sm:mb-8 sm:h-[400px]" />
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BlogPostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
