import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { Skeleton, BlogPostContentSkeleton } from "@/components/blog-skeleton"

export default function BlogPostLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <div className="pt-1">
        <Navbar />
        <Breadcrumbs items={[{ name: "blog", url: "/blog" }, { name: "loading...", url: "#" }]} />
        <main className="flex-1">
          <div className="w-full bg-gradient-to-b from-neutral-50 to-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                {/* Back button skeleton */}
                <div className="mb-6">
                  <Skeleton className="h-5 w-32" />
                </div>
                
                <article>
                  {/* Hero image skeleton */}
                  <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-12 rounded-lg overflow-hidden">
                    <Skeleton className="aspect-[16/9] w-full" />
                  </div>
                  
                  {/* Metadata skeleton */}
                  <div className="mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-10 w-full mb-4" />
                  </div>
                  
                  {/* Content skeleton */}
                  <BlogPostContentSkeleton />
                </article>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}