"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { trackCTAClick } from "@/utils/analytics"
import BlogPostCard from "@/components/blog-post-card" // Corrected import path

// Define the blog post type
interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  description: string
  slug: string
  image: string
  featured?: boolean
  gradientClass: string
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: "3", // New post
      title: "Create a Website That Gets You More Business: A Simple Guide Using Replit",
      category: "Web Development & AI",
      date: "June 1, 2025",
      description:
        "Learn how to create a website that generates more business leads using Replit, even if you're not a tech whiz. A simple guide for 2025.",
      slug: "create-website-more-business-replit",
      image: "/placeholder.svg?height=600&width=1200",
      featured: false,
      gradientClass: "bg-gradient-to-br from-green-300/30 via-teal-300/30 to-cyan-300/30", // Distinct gradient
    },
    {
      id: "2",
      title: "still relying on word-of-mouth? how ai can effortlessly welcome more patients to your dental practice",
      category: "ai & marketing",
      date: "june 1, 2025",
      description:
        "discover how ai tools like chatbots, smart advertising, and seo can help your dental practice attract more new patients without technical expertise.",
      slug: "ai-effortlessly-welcome-more-patients-dental-practice",
      image: "/blog/ai-dental-patient-growth.png",
      featured: true,
      gradientClass: "bg-gradient-to-br from-pink-300/30 via-purple-300/30 to-indigo-300/30",
    },
    {
      id: "1",
      title: "How I'm Getting My Business to Show Up in ChatGPT (And How You Can Too)",
      category: "Digital Marketing",
      date: "May 27, 2025",
      description:
        "ChatGPT is changing how people find and trust businesses. Learn the six steps to make your business visible to AI without tricks—just smart strategy.",
      slug: "business-visibility-chatgpt",
      image: "/blog/chatgpt-business-visibility.png",
      featured: true, // Assuming this was also featured, adjust if not
      gradientClass: "bg-gradient-to-br from-sky-300/30 via-cyan-300/30 to-teal-300/30",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Blog" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl">
                insights & ideas
              </h1>
              <p className="text-neutral-600 lowercase md:text-lg max-w-2xl mx-auto md:mx-0">
                thoughts on design, development, and digital strategy from the prism team
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts List or Empty State */}
        <section className="px-4 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    title={post.title}
                    category={post.category}
                    date={post.date}
                    description={post.description}
                    slug={post.slug}
                    image={post.image}
                    featured={post.featured}
                    gradientClass={post.gradientClass}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-neutral-200 rounded-lg">
                <h3 className="text-xl font-medium text-neutral-600 lowercase mb-2">coming soon</h3>
                <p className="text-neutral-500 lowercase">
                  we're working on some great content for you. check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter lowercase sm:text-3xl">want to work with us?</h2>
              <p className="text-neutral-600 lowercase">let's discuss how we can help your business grow</p>
              <div className="pt-4">
                <Link href="/get-started">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 lowercase"
                    onClick={() => trackCTAClick("get started", "blog page")}
                  >
                    get started <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
