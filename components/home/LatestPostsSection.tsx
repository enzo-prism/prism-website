"use client"

import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type LatestPost = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  image: string | null
  gradientClass?: string | null
}

const FALLBACK_GRADIENT = "bg-gradient-to-br from-neutral-200 via-neutral-100 to-white"
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1500

export default function LatestPostsSection() {
  const [posts, setPosts] = useState<LatestPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const retryTimeout = useRef<NodeJS.Timeout | null>(null)
  const currentController = useRef<AbortController | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchPosts = async (attempt: number = 1) => {
      if (cancelled) return

      currentController.current?.abort()
      const controller = new AbortController()
      currentController.current = controller

      try {
        const response = await fetch("/api/latest-posts", {
          signal: controller.signal,
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (!Array.isArray(payload.posts)) {
          throw new Error("Invalid response payload")
        }

        if (!cancelled) {
          setPosts(payload.posts.slice(0, 3))
          setHasError(false)
        }
      } catch (error) {
        if (controller.signal.aborted || cancelled) {
          return
        }

        console.error("[LatestPostsSection] failed to fetch posts", error)

        if (attempt < MAX_RETRIES) {
          retryTimeout.current = setTimeout(() => fetchPosts(attempt + 1), RETRY_DELAY_MS * attempt)
          return
        }

        if (!cancelled) {
          setHasError(true)
          setPosts([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchPosts()

    return () => {
      cancelled = true
      currentController.current?.abort()
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current)
      }
    }
  }, [])

  const shouldShowFallback = hasError || (!isLoading && posts.length === 0)

  return (
    <section className="border-t border-neutral-100 dark:border-neutral-800 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
              free business content we just published
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium lowercase text-neutral-900 transition-colors hover:text-neutral-600"
          >
            view all posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-72 rounded-xl border border-neutral-200 bg-neutral-50/70 p-6 animate-pulse"
              >
                <div className="mb-4 h-36 w-full rounded-lg bg-neutral-200/80" />
                <div className="mb-3 h-4 w-1/4 rounded-full bg-neutral-200/80" />
                <div className="mb-2 h-5 w-3/4 rounded-full bg-neutral-200/80" />
                <div className="h-5 w-2/3 rounded-full bg-neutral-200/60" />
              </div>
            ))}
          </div>
        ) : shouldShowFallback ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 p-10 text-center">
            <h3 className="mb-3 text-lg font-medium lowercase text-neutral-700">
              no posts available right now
            </h3>
            <p className="mb-5 text-sm lowercase text-neutral-500">
              check the blog to dig into our full library of marketing and product experiments.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium lowercase text-neutral-900 transition-colors hover:text-neutral-600"
            >
              browse the blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <SimpleBlogPostCard
                key={post.slug}
                title={post.title}
                category={post.category}
                date={post.date}
                author={post.author}
                description={post.description}
                slug={post.slug}
                image={post.image}
                gradientClass={post.gradientClass ?? FALLBACK_GRADIENT}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
