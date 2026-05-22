import { getAllPosts } from "@/lib/mdx-data"
import type { MetadataRoute } from "next"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { INDEXABLE_STATIC_ROUTES } from "@/lib/seo/search-visibility"

// Always normalize to the canonical host for sitemap links
const CANONICAL_HOST = "www.design-prism.com"
function normalizedOrigin(envUrl?: string): string {
  try {
    const u = new URL(envUrl || `https://${CANONICAL_HOST}`)
    u.hostname = CANONICAL_HOST
    u.protocol = "https:"
    u.port = ""
    return u.origin
  } catch {
    return `https://${CANONICAL_HOST}`
  }
}
const baseOrigin = normalizedOrigin(process.env.NEXT_PUBLIC_BASE_URL)

type StaticRouteInput = {
  url: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
  lastModified?: Date
}

function buildSitemapEntry(route: StaticRouteInput): MetadataRoute.Sitemap[number] {
  const entry: MetadataRoute.Sitemap[number] = {
    url: route.url,
  }

  // Only set lastModified when we actually know it (blog/case studies/library).
  // Google ignores changefreq/priority, so we avoid emitting unsupported hints.
  if (route.lastModified) entry.lastModified = route.lastModified

  return entry
}

function segmentRoutes(base: string): StaticRouteInput[] {
  return INDEXABLE_STATIC_ROUTES.map((route) => ({
    url: route === "/" ? base : `${base}${route}`,
    changeFrequency: route === "/pricing" ? "weekly" : "monthly",
    priority: 0.75,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: StaticRouteInput[] = segmentRoutes(baseOrigin)

  // Case study detail pages
  for (const study of CASE_STUDIES) {
    const lastMod =
      study.structured?.dateModified || study.structured?.datePublished
    routes.push({
      url: `${baseOrigin}/case-studies/${study.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: lastMod ? new Date(lastMod) : undefined,
    })
  }

  // Blog posts
  try {
    const posts = await getAllPosts()
    if (posts && posts.length > 0) {
      for (const post of posts) {
        routes.push({
          url: `${baseOrigin}/blog/${post.slug}`,
          changeFrequency: "monthly",
          priority: 0.7,
          lastModified: new Date(post.date),
        })
      }
    }
  } catch {
    // Fail silently; static routes will still be returned
  }

  return routes.map((route) => buildSitemapEntry(route))
}
