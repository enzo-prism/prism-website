import { BlogGridCard } from '@/components/blog/blog-post-cards'
import { getBlogFilterFromCategory } from '@/lib/blog-topic-filters'

interface SimpleBlogPostCardProps {
  title: string
  category: string
  date: string
  /** Kept for API compatibility with older call sites. */
  author?: string
  description: string
  slug: string
  image?: string | null
  featured?: boolean
  compact?: boolean
  gradientClass?: string
  prefetch?: boolean
  /** Eager-load the cover for the first card in view. */
  priority?: boolean
}

/**
 * Post card for blog rails embedded on landing pages (/seo, /local-listings).
 * Renders the same card as /blog so the journal looks identical everywhere.
 */
export default function SimpleBlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  prefetch,
  priority = false,
}: SimpleBlogPostCardProps) {
  return (
    <BlogGridCard
      headingLevel="h3"
      priority={priority}
      prefetch={prefetch}
      trackCta
      post={{
        slug,
        title,
        description,
        date,
        category,
        image: typeof image === 'string' ? image : undefined,
        topic: getBlogFilterFromCategory(category),
      }}
    />
  )
}
