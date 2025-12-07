import { getAllPosts } from "@/lib/mdx"
import type { MetadataRoute } from "next"
import { CASE_STUDIES } from "@/lib/case-study-data"
import fs from "node:fs/promises"
import path from "node:path"

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

type StaticRouteInput = {
  url: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
  lastModified?: Date
}

function buildSitemapEntry(route: StaticRouteInput): MetadataRoute.Sitemap[number] {
  return {
    url: route.url,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: route.lastModified ?? new Date(),
  }
}

async function getAppRoutes(): Promise<string[]> {
  const appDir = path.resolve(process.cwd(), "app")
  const entries = await fs.readdir(appDir, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory())
    .map((dir) => dir.name)
    .filter((name) => !name.startsWith("_"))
}

function segmentRoutes(base: string): StaticRouteInput[] {
  const segmentSlugs = [
    "why-consulting-companies-love-prism",
    "why-dental-practices-love-prism",
    "why-local-shop-owners-love-prism",
    "why-nonprofits-love-prism",
    "why-online-community-founders-love-prism",
    "pricing-dental",
    "prism-flywheel",
    "offers",
    "offers/summer-website-makeover",
    "offers/ai-seo-boost",
    "designs",
    "designs/wine-country-root-canal",
    "proof",
    "wall-of-love",
    "refer",
    "seo",
    "seo/on-page",
    "seo/off-page",
    "services",
    "case-studies",
    "blog",
    "about",
    "contact",
    "pricing",
  ]

  return segmentSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    changeFrequency: slug.startsWith("pricing") || slug.startsWith("offers") ? "weekly" : "monthly",
    priority: 0.75,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: StaticRouteInput[] = [
    {
      url: baseOrigin,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseOrigin}/smb`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ]

  routes.push(...segmentRoutes(baseOrigin))

  // Case study detail pages
  for (const study of CASE_STUDIES) {
    routes.push({
      url: `${baseOrigin}/case-studies/${study.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
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

  // Podcast detail pages (if statically generated under /podcast)
  const appRoutes = await getAppRoutes()
  if (appRoutes.includes("podcast")) {
    routes.push({
      url: `${baseOrigin}/podcast`,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  }

  // Privacy & legal
  routes.push(
    {
      url: `${baseOrigin}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseOrigin}/terms-of-service`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  )

  return routes.map((route) => buildSitemapEntry(route))
}
