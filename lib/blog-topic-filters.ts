import type { LucideIcon } from "lucide-react"
import { Cpu, List, Megaphone, Paintbrush, Users2 } from "lucide-react"

const BLOG_FILTER_BUCKETS = {
  ALL: "all",
  ENGINEERING: "engineering",
  DESIGN: "design",
  MARKETING: "marketing",
  CULTURE: "culture",
} as const

export type BlogFilterBucket = (typeof BLOG_FILTER_BUCKETS)[keyof typeof BLOG_FILTER_BUCKETS]

export type BlogFilterConfig = {
  slug: BlogFilterBucket
  label: string
  icon?: LucideIcon
}

export const BLOG_TOPIC_FILTERS: Array<Omit<BlogFilterConfig, "icon"> & { icon: LucideIcon }> = [
  {
    slug: BLOG_FILTER_BUCKETS.ENGINEERING,
    label: "engineering",
    icon: Cpu,
  },
  {
    slug: BLOG_FILTER_BUCKETS.DESIGN,
    label: "design",
    icon: Paintbrush,
  },
  {
    slug: BLOG_FILTER_BUCKETS.MARKETING,
    label: "marketing",
    icon: Megaphone,
  },
  {
    slug: BLOG_FILTER_BUCKETS.CULTURE,
    label: "culture",
    icon: Users2,
  },
]

export const BLOG_FILTER_ITEMS: BlogFilterConfig[] = [
  {
    slug: BLOG_FILTER_BUCKETS.ALL,
    label: "all",
    icon: List,
  },
  ...BLOG_TOPIC_FILTERS,
]

const normalizeCategoryToSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const CATEGORY_FILTER_OVERRIDES: Record<string, BlogFilterBucket> = {
  "ai-and-development": BLOG_FILTER_BUCKETS.ENGINEERING,
  "ai-powered-web-development": BLOG_FILTER_BUCKETS.ENGINEERING,
  "ai-and-technology": BLOG_FILTER_BUCKETS.ENGINEERING,
  "ai-and-automation": BLOG_FILTER_BUCKETS.ENGINEERING,
  "web-ops-and-tooling": BLOG_FILTER_BUCKETS.ENGINEERING,
  "ai-and-dentistry": BLOG_FILTER_BUCKETS.ENGINEERING,
  website: BLOG_FILTER_BUCKETS.ENGINEERING,
  "ai-and-business-productivity": BLOG_FILTER_BUCKETS.ENGINEERING,
  "design-and-product": BLOG_FILTER_BUCKETS.DESIGN,
  "ai-and-design": BLOG_FILTER_BUCKETS.DESIGN,
  seo: BLOG_FILTER_BUCKETS.MARKETING,
  "appear-in-ai-search": BLOG_FILTER_BUCKETS.MARKETING,
  "local-seo": BLOG_FILTER_BUCKETS.MARKETING,
  "google-ads-troubleshooting": BLOG_FILTER_BUCKETS.MARKETING,
  ads: BLOG_FILTER_BUCKETS.MARKETING,
  "marketing-and-growth": BLOG_FILTER_BUCKETS.MARKETING,
  "content-strategy": BLOG_FILTER_BUCKETS.MARKETING,
  "content-marketing-and-seo": BLOG_FILTER_BUCKETS.MARKETING,
  "local-growth-strategy": BLOG_FILTER_BUCKETS.MARKETING,
  "local-growth-and-reputation": BLOG_FILTER_BUCKETS.MARKETING,
  "ai-and-growth": BLOG_FILTER_BUCKETS.MARKETING,
  "ai-and-marketing": BLOG_FILTER_BUCKETS.MARKETING,
  "ai-and-business": BLOG_FILTER_BUCKETS.MARKETING,
  "business-and-leadership": BLOG_FILTER_BUCKETS.CULTURE,
  "motivation-and-entrepreneurship": BLOG_FILTER_BUCKETS.CULTURE,
  entrepreneurship: BLOG_FILTER_BUCKETS.CULTURE,
  "business-and-ai": BLOG_FILTER_BUCKETS.CULTURE,
  "ai-and-strategy": BLOG_FILTER_BUCKETS.CULTURE,
}

const MARKETING_HINTS = ["seo", "search", "ad", "growth", "local", "content", "marketing", "reputation"]
const ENGINEERING_HINTS = ["web", "dev", "development", "technology", "code", "tool", "productivity", "automation", "ops", "software", "engineering", "website", "dentistry"]
const DESIGN_HINTS = ["design", "product", "brand", "ui", "ux"]
const CULTURE_HINTS = ["leadership", "entrepreneurship", "entrepreneur", "culture", "mindset", "team", "people"]

export const isValidBlogFilter = (value: string): value is BlogFilterBucket =>
  Object.values(BLOG_FILTER_BUCKETS).includes(value as BlogFilterBucket)

export const normalizeBlogFilter = (value?: string | null): BlogFilterBucket => {
  if (!value) return BLOG_FILTER_BUCKETS.ALL

  const normalizedValue = value.toLowerCase().trim()
  if (isValidBlogFilter(normalizedValue)) return normalizedValue
  return BLOG_FILTER_BUCKETS.ALL
}

export const getBlogFilterFromCategory = (category: string): Exclude<BlogFilterBucket, "all"> => {
  const normalizedCategory = normalizeCategoryToSlug(category)
  const mappedBucket = CATEGORY_FILTER_OVERRIDES[normalizedCategory]
  if (mappedBucket && mappedBucket !== BLOG_FILTER_BUCKETS.ALL) return mappedBucket

  const hasMatch = (haystack: string, needles: string[]) => needles.some((needle) => haystack.includes(needle))

  if (hasMatch(normalizedCategory, DESIGN_HINTS)) return BLOG_FILTER_BUCKETS.DESIGN
  if (hasMatch(normalizedCategory, ENGINEERING_HINTS)) return BLOG_FILTER_BUCKETS.ENGINEERING
  if (hasMatch(normalizedCategory, MARKETING_HINTS)) return BLOG_FILTER_BUCKETS.MARKETING
  if (hasMatch(normalizedCategory, CULTURE_HINTS)) return BLOG_FILTER_BUCKETS.CULTURE

  return BLOG_FILTER_BUCKETS.MARKETING
}
