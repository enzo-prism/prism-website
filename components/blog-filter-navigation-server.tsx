import Link from "next/link"
import {
  BLOG_FILTER_ITEMS,
  type BlogFilterBucket,
  normalizeBlogFilter,
} from "@/lib/blog-topic-filters"
import { cn } from "@/lib/utils"

interface BlogFilterNavigationServerProps {
  selectedCategory: BlogFilterBucket | string
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

export default function BlogFilterNavigationServer({
  selectedCategory,
  className,
}: BlogFilterNavigationServerProps) {
  const normalizedSelected = normalizeBlogFilter(selectedCategory).toLowerCase()

  return (
    <div
      className={cn(
        "px-5 pb-8 sm:px-8 sm:pb-10",
        className,
      )}
    >
      <div className="border-t border-border/70 pt-6">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex w-max min-w-full flex-nowrap items-center justify-start gap-5">
            {BLOG_FILTER_ITEMS.map((category) => {
              const slug = category.slug.toLowerCase()
              const isActive = slug === normalizedSelected

              return (
                <Link
                  key={category.slug}
                  href={buildBlogUrl({ category: slug })}
                  prefetch={false}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center border-b border-transparent font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "border-foreground text-foreground",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {category.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
