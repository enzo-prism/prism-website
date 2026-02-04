import { getAllPosts } from "@/lib/mdx-data"
import type { MetadataRoute } from "next"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { getLibraryPosts } from "@/lib/library/getLibraryPosts"
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

const NOINDEX_ROUTES = new Set([
  "/analysis-thank-you",
  "/book-a-shoot/thank-you",
  "/pricing/thank-you",
  "/thank-you",
  "/thanks",
  "/thanks-call",
])

const NOINDEX_PREFIXES = ["/checkout"]

function isNoindexUrl(url: string) {
  try {
    const pathname = new URL(url).pathname
    if (NOINDEX_ROUTES.has(pathname)) return true
    return NOINDEX_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  } catch {
    return false
  }
}

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

async function getNestedRouteSlugs(routeDir: string): Promise<string[]> {
  const targetDir = path.resolve(process.cwd(), "app", routeDir)
  try {
    const entries = await fs.readdir(targetDir, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isDirectory())
      .map((dir) => dir.name)
      .filter((name) => !name.startsWith("_"))
  } catch {
    return []
  }
}

function segmentRoutes(base: string): StaticRouteInput[] {
  const segmentSlugs = [
    "ai",
    "ai-website-launch",
    "apps",
    "book-a-shoot",
    "careers",
    "careers/front-end-developer",
    "careers/replit-builder",
    "custom-email-for-dental-practices",
    "dental-photography",
    "dental-photography/before-after",
    "dental-photography/office-team",
    "faq",
    "free-analysis",
    "get-started",
    "google",
    "google/dental-ads",
    "google/dental-patient-forms",
    "growth",
    "hottest-content",
    "ig",
    "models",
    "one-time-fee",
    "openai",
    "openai/site-rebuild",
    "replit",
    "scholarship",
    "story",
    "tiktok",
    "youtube",
    "why-consulting-companies-love-prism",
    "why-dental-practices-love-prism",
    "why-local-shop-owners-love-prism",
    "why-nonprofits-love-prism",
    "why-online-community-founders-love-prism",
    "pricing-dental",
    "dental-website",
    "dental-practice-seo-expert",
    "facebook-ads-for-dentists",
    "tiktok-ads-for-dentists",
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
    "seo/audit",
    "ai-seo-services",
    "local-seo-services",
    "local-seo-agency",
    "services",
    "software",
    "websites",
    "ads",
    "local-listings",
    "case-studies",
    "blog",
    "library",
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

  // Library detail pages
  try {
    const libraryPosts = await getLibraryPosts()
    for (const post of libraryPosts) {
      routes.push({
        url: `${baseOrigin}/library/${post.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
      })
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

    const podcastSlugs = await getNestedRouteSlugs("podcast")
    podcastSlugs.forEach((slug) => {
      routes.push({
        url: `${baseOrigin}/podcast/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      })
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

  return routes.filter((route) => !isNoindexUrl(route.url)).map((route) => buildSitemapEntry(route))
}
