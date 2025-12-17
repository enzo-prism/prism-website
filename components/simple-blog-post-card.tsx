import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface SimpleBlogPostCardProps {
  title: string
  category: string
  date: string
  description: string
  slug: string
  image: string
  featured?: boolean
  compact?: boolean
  gradientClass: string
  prefetch?: boolean
}

export default function SimpleBlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  featured = false,
  compact = false,
  gradientClass,
  prefetch,
}: SimpleBlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      prefetch={prefetch}
      data-cta-text="view blog post"
      data-cta-location={title}
      className="block h-full"
    >
      <article className="border border-neutral-200 rounded-xl overflow-hidden h-full flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
        <div className={cn("relative w-full aspect-[4/3] overflow-hidden", gradientClass)} />
        <div className="p-5 space-y-3 border-t border-neutral-100 flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase">
              {category}
            </span>
            <time className="text-sm text-neutral-500 lowercase" dateTime={new Date(date).toISOString()}>
              {new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))}
            </time>
          </div>
          <h3 className="text-lg font-semibold leading-snug lowercase text-balance">
            {title}
          </h3>
          {!compact && (
            <p className="text-neutral-600 text-sm/6 lowercase line-clamp-3">
              {description}
            </p>
          )}
          <div className="flex items-center text-sm font-medium text-neutral-900 lowercase pt-1">
            read post
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  )
}
