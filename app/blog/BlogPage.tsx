'use client'

import { BlogListErrorBoundary } from "@/components/blog-error-boundary"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import type { BlogFrontmatter } from "@/lib/mdx"
import BlogCTAButton from "./BlogCTAButton"
import BlogPostsList from "./BlogPostsList"
import { useEffect } from "react"
import BlogEmailSignup from "@/components/blog-email-signup"
import Breadcrumbs from "@/components/breadcrumbs"

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
    if (hero) {
      hero.setAttribute("data-hydrated-hidden", "true")
      hero.setAttribute("aria-hidden", "true")
      hero.style.display = "none"
    }
    const preview = document.getElementById("static-blog-preview")
    if (preview) {
      preview.setAttribute("data-hydrated-hidden", "true")
      preview.setAttribute("aria-hidden", "true")
      preview.style.display = "none"
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 relative">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />
        </div>
        {/* Minimal hero */}
        <section className="py-6 md:py-10 border-b border-neutral-100">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Insights & ideas</h1>
            <p className="text-neutral-600 mt-2">Thoughts on design, development, and digital strategy from the Prism team</p>
          </div>
        </section>

        {/* Blog Posts List with Filter Navigation */}
        <BlogListErrorBoundary>
          <BlogPostsList posts={blogPosts} />
        </BlogListErrorBoundary>

        <BlogEmailSignup />

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Want to work with us?</h2>
              <p className="text-neutral-600">Let's discuss how we can help your business grow</p>
              <div className="pt-4">
                <BlogCTAButton />
              </div>
            </div>
          </div>
        </section>

        {/* SEO supporting copy */}
        <SeoTextSection title="Prism blog: design, development, and growth">
          <p>
            We publish practical notes on product design, engineering, and modern SEO—how to ship faster,
            write clearer interfaces, and measure what matters. Each post is written from real client work
            and experiments, not theory.
          </p>
        </SeoTextSection>
      </main>
      <Footer />
    </div>
  )
}
