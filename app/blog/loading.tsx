import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Skeleton, BlogPostCardSkeleton } from "@/components/blog-skeleton"

export default function BlogLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 text-center md:text-left">
              <Skeleton className="h-12 max-w-md mx-auto md:mx-0" />
              <Skeleton className="h-6 max-w-2xl mx-auto md:mx-0" />
            </div>
          </div>
        </section>

        {/* Blog Posts List Skeleton */}
        <section className="px-4 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            {/* Filter buttons skeleton */}
            <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-10 w-20 rounded-full shrink-0" />
              ))}
            </div>

            {/* Blog posts grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <BlogPostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <Skeleton className="h-8 max-w-md mx-auto" />
              <Skeleton className="h-5 max-w-sm mx-auto" />
              <div className="pt-4">
                <Skeleton className="h-12 w-36 mx-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}