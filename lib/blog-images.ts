export const DEFAULT_BLOG_FEATURED_IMAGE =
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png'

const BLOG_OG_FEATURED_IMAGE_CUTOFF_YEAR = 2026

function extractYearFromDate(dateValue: string): number | null {
  if (!dateValue) return null

  const isoYearMatch = dateValue.match(/^(\d{4})/)
  if (isoYearMatch) {
    return Number(isoYearMatch[1])
  }

  const parsedDate = new Date(dateValue)
  const parsedYear = parsedDate.getUTCFullYear()
  return Number.isNaN(parsedYear) ? null : parsedYear
}

function toAbsoluteImageUrl(imageUrl: string, baseUrl: string): string {
  if (!imageUrl.startsWith('/')) return imageUrl

  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  return `${base}${imageUrl}`
}

export function getBlogOpenGraphImage(
  postDate: string,
  featuredImage: string | undefined,
  baseUrl: string,
): string {
  const year = extractYearFromDate(postDate)

  if (year === null || year < BLOG_OG_FEATURED_IMAGE_CUTOFF_YEAR) {
    return DEFAULT_BLOG_FEATURED_IMAGE
  }

  const resolvedFeaturedImage = featuredImage || DEFAULT_BLOG_FEATURED_IMAGE
  return toAbsoluteImageUrl(resolvedFeaturedImage, baseUrl)
}
