import { getAllPosts } from "@/lib/mdx"
import type { MetadataRoute } from "next"

// Always normalize to the canonical host for sitemap links
const CANONICAL_HOST = "www.design-prism.com"
function normalizedOrigin(envUrl?: string): string {
  try {
    const u = new URL(envUrl || `https://${CANONICAL_HOST}`)
    u.hostname = CANONICAL_HOST
    u.protocol = "https:"
    return u.origin
  } catch {
    return `https://${CANONICAL_HOST}`
  }
}
const baseOrigin = normalizedOrigin(process.env.NEXT_PUBLIC_BASE_URL)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static core routes
  const routes: Array<{
    url: string
    lastModified: Date
    changeFrequency: "yearly" | "monthly" | "weekly" | "daily" | "hourly" | "always" | "never"
    priority: number
  }> = [
    {
      url: baseOrigin,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseOrigin}/smb`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseOrigin}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/offers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/proof`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/offers/summer-website-makeover`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/offers/ai-seo-boost`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseOrigin}/get-started`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseOrigin}/podcast`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseOrigin}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseOrigin}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Dynamic blog post routes
  try {
    const posts = await getAllPosts()
    if (posts && posts.length > 0) {
      for (const post of posts) {
        routes.push({
          url: `${baseOrigin}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: "monthly",
          priority: 0.7,
        })
      }
    }
  } catch {
    // Fail silently; static routes will still be returned
  }

  return routes.map((route) => ({
    url: route.url,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
