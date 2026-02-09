import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface SimpleBlogPostCardProps {
  title: string
  category: string
  date: string
  author: string
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
  author,
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
      <article className="h-full overflow-hidden rounded-md border border-border/60 bg-card/30 backdrop-blur-sm flex flex-col transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-card/45">
        <div className={cn("relative w-full aspect-[4/3] overflow-hidden", gradientClass)} />
        <div className="flex flex-1 flex-col space-y-3 border-t border-border/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-[10px] font-semibold uppercase font-pixel tracking-[0.16em] text-muted-foreground">
              {category}
            </span>
            <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 text-xs text-muted-foreground">
              <time dateTime={new Date(date).toISOString()}>
                {new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))}
              </time>
              <span className="text-border" aria-hidden>
                &middot;
              </span>
              <span className="font-medium text-foreground/80 normal-case">By {author}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold leading-snug text-balance text-foreground">
            {title}
          </h3>
          {!compact && (
            <p className="text-sm/6 text-muted-foreground line-clamp-3">
              {description}
            </p>
          )}
          <div className="flex items-center pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground font-pixel">
            read post
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" focusable="false" />
          </div>
        </div>
      </article>
    </Link>
  )
}
