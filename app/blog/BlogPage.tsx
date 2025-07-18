import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogPageTracker from "./BlogPageTracker"
import BlogCTAButton from "./BlogCTAButton"
import BlogPostCard from "@/components/blog-post-card"
import type { BlogFrontmatter } from "@/lib/mdx"
import BlogPostsList from "./BlogPostsList"
import { BlogListErrorBoundary } from "@/components/blog-error-boundary"
import AnimatedHeroSection from "@/components/animated-hero-section"

// Define the blog post type
interface BlogPost extends BlogFrontmatter {
  slug: string
  featured?: boolean
  compact?: boolean
}

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  const blogPosts = posts

  return (
    <div className="flex min-h-screen flex-col">
      <BlogPageTracker />
      <Navbar />
      <main className="flex-1">
        {/* Enhanced Animated Hero Section */}
        <AnimatedHeroSection
          title="insights & ideas"
          subtitle="thoughts on design, development, and digital strategy from the prism team"
        />

        {/* Blog Posts List or Empty State */}
        <BlogListErrorBoundary>
          <BlogPostsList posts={blogPosts} />
        </BlogListErrorBoundary>

        {/* CTA Section */}
        <section className="px-4 py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter lowercase sm:text-3xl">want to work with us?</h2>
              <p className="text-neutral-600 lowercase">let's discuss how we can help your business grow</p>
              <div className="pt-4">
                <BlogCTAButton />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
