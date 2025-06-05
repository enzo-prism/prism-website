"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { BlogPostSchema } from "@/components/schema-markup"
import { trackEvent } from "@/utils/analytics"
import { cn } from "@/lib/utils" // Import cn

export default function BusinessVisibilityChatGPTClientPage() {
  const gradientForThisPost = "bg-gradient-to-br from-sky-300/30 via-cyan-300/30 to-teal-300/30" // Gradient 2

  // Dummy content for illustration
  const postTitle = "How I'm Getting My Business to Show Up in ChatGPT (And How You Can Too)"
  const postCategory = "Digital Marketing"
  const postDate = "May 27, 2025"
  const postContent = `
    <p class="text-lg leading-relaxed">
      ChatGPT is changing how people find and trust businesses. Learn the six steps to make your business visible to AI without tricks—just smart strategy.
    </p>
    <p>Content about ChatGPT visibility...</p>
    <h3 class="text-xl font-bold mt-8 mb-4">Step 1: Understand How AI Uses Information</h3>
    <p>Details about step 1...</p>
    <hr class="my-8" />
    <h3 class="text-xl font-bold mt-8 mb-4">Step 2: Optimize Your Online Presence</h3>
    <p>Details about step 2...</p>
    <p class="font-medium mt-8">• enzo</p>
  `

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <div className="pt-1">
        <Navbar />
        <Breadcrumbs
          items={[
            { name: "blog", url: "/blog" },
            { name: "chatgpt business visibility", url: "/blog/business-visibility-chatgpt" },
          ]}
        />
        <main className="flex-1">
          <div className="w-full bg-gradient-to-b from-neutral-50 to-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                {/* Gradient hero section */}
                <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-12 rounded-lg overflow-hidden">
                  <div className={cn("aspect-[16/9] relative", gradientForThisPost)}>
                    {/* Optional: Add a subtle icon or text overlay here if desired */}
                  </div>
                </div>

                <div className="mb-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    back to all posts
                  </Link>
                </div>

                <div className="mb-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase">
                      {postCategory}
                    </span>
                    <span className="text-sm text-neutral-500 lowercase">{postDate}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight lowercase mb-4">{postTitle}</h1>
                </div>

                <div
                  className="prose prose-neutral max-w-none space-y-6 lowercase-prose"
                  dangerouslySetInnerHTML={{ __html: postContent }}
                />

                <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-2 lowercase">want to improve your ai visibility?</h3>
                  <p className="text-neutral-600 mb-4 lowercase">
                    let prism help your business get noticed by ai search.
                  </p>
                  <Link
                    href="/get-started"
                    onClick={() =>
                      trackEvent({ action: "click", category: "cta", label: "blog_post_get_started_chatgpt_vis" })
                    }
                  >
                    <button className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 lowercase">
                      get started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <BlogPostSchema
        title={postTitle}
        description="Learn the six steps to make your business visible to AI like ChatGPT without tricks—just smart strategy."
        url="https://prism.agency/blog/business-visibility-chatgpt"
        imageUrl="https://prism.agency/blog/chatgpt-business-visibility.png"
        datePublished="2025-05-27T00:00:00.000Z"
        dateModified="2025-05-27T00:00:00.000Z"
        authorName="enzo"
      />
    </div>
  )
}
