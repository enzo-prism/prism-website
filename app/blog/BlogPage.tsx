'use client'

import { BlogListErrorBoundary } from "@/components/blog-error-boundary"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import type { BlogFrontmatter } from "@/lib/mdx"
import BlogCTAButton from "./BlogCTAButton"
import BlogPageTracker from "./BlogPageTracker"
import BlogPostsList from "./BlogPostsList"
import { useEffect } from "react"

// Define the blog post type
interface BlogPost extends BlogFrontmatter {
  slug: string
  featured?: boolean
  compact?: boolean
}

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  const blogPosts = posts
  useEffect(() => {
    const hero = document.getElementById("static-blog-hero")
    hero?.parentElement?.removeChild(hero)
    const preview = document.getElementById("static-blog-preview")
    preview?.parentElement?.removeChild(preview)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <BlogPageTracker />
      <Navbar />
      <main className="flex-1 relative">
        {/* Minimal hero */}
        <section className="py-6 md:py-10 border-b border-neutral-100">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight lowercase">insights & ideas</h1>
            <p className="text-neutral-600 mt-2 lowercase">thoughts on design, development, and digital strategy from the prism team</p>
          </div>
        </section>

        {/* Blog Posts List with Filter Navigation */}
        <BlogListErrorBoundary>
          <BlogPostsList posts={blogPosts} />
        </BlogListErrorBoundary>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-neutral-50">
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

        {/* SEO supporting copy */}
        <SeoTextSection title="prism blog: design, development, and growth">
          <p>
            we publish practical notes on product design, engineering, and modern seo—how to ship faster,
            write clearer interfaces, and measure what matters. each post is written from real client work
            and experiments, not theory.
          </p>
        </SeoTextSection>
      </main>
      <Footer />
    </div>
  )
}
