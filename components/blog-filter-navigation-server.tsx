import Link from "next/link"

import {
  BLOG_FILTER_ITEMS,
  type BlogFilterBucket,
  normalizeBlogFilter,
} from "@/lib/blog-topic-filters"
import { cn } from "@/lib/utils"

interface BlogFilterNavigationServerProps {
  selectedCategory: BlogFilterBucket | string
  /** Optional post counts per filter slug (e.g. { all: 92, design: 8 }). */
  counts?: Partial<Record<BlogFilterBucket, number>>
  className?: string
}

function buildBlogUrl({ category }: { category: string }) {
  const params = new URLSearchParams()
  const normalizedCategory = category.trim().toLowerCase()

  if (normalizedCategory && normalizedCategory !== "all") {
    params.set("category", normalizedCategory)
  }

  const search = params.toString()
  return search ? `/blog?${search}` : "/blog"
}

/** Topic filter pills for /blog. Plain links, so it works without JS. */
export default function BlogFilterNavigationServer({
  selectedCategory,
  counts,
  className,
}: BlogFilterNavigationServerProps) {
  const normalizedSelected = normalizeBlogFilter(selectedCategory).toLowerCase()

  return (
    <nav aria-label="Blog topics" className={cn("w-full", className)}>
      <ul className="-mx-1 flex w-full gap-2 overflow-x-auto px-1 py-1 scrollbar-hide">
        {BLOG_FILTER_ITEMS.map((category) => {
          const slug = category.slug.toLowerCase()
          const isActive = slug === normalizedSelected
          const count = counts?.[category.slug]
          const Icon = category.icon

          return (
            <li key={category.slug} className="shrink-0">
              <Link
                href={buildBlogUrl({ category: slug })}
                prefetch={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium capitalize tracking-[-0.01em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  isActive
                    ? "border-transparent bg-foreground text-background"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground",
                )}
              >
                {Icon ? <Icon aria-hidden="true" className="size-3.5 opacity-80" strokeWidth={1.75} /> : null}
                {category.label}
                {typeof count === "number" ? (
                  <span
                    className={cn(
                      "font-mono text-[11px] tabular-nums",
                      isActive ? "text-background/60" : "text-subtle",
                    )}
                  >
                    {count}
                  </span>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
