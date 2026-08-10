import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  BLOG_FILTER_ITEMS,
  type BlogFilterBucket,
  normalizeBlogFilter,
} from "@/lib/blog-topic-filters"
import { cn } from "@/lib/utils"

interface BlogFilterNavigationServerProps {
  selectedCategory: BlogFilterBucket | string
  query: string
  className?: string
}

function buildBlogUrl({ category, query }: { category: string; query: string }) {
  const params = new URLSearchParams()
  const normalizedCategory = category.trim().toLowerCase()
  const normalizedQuery = query.trim()

  if (normalizedCategory && normalizedCategory !== "all") {
    params.set("category", normalizedCategory)
  }

  if (normalizedQuery) {
    params.set("q", normalizedQuery)
  }

  const search = params.toString()
  return search ? `/blog?${search}` : "/blog"
}

export default function BlogFilterNavigationServer({
  selectedCategory,
  query,
  className,
}: BlogFilterNavigationServerProps) {
  const normalizedSelected = normalizeBlogFilter(selectedCategory).toLowerCase()
  const normalizedQuery = query.trim()

  return (
    <div
      className={cn(
        "px-5 pb-8 sm:px-8 sm:pb-10",
        className,
      )}
    >
      <div className="border-t border-border/70 pt-6">
        <div className="space-y-5">
          <form action="/blog" method="get" className="flex max-w-xl items-center gap-3">
            {normalizedSelected !== "all" ? (
              <input type="hidden" name="category" value={normalizedSelected} />
            ) : null}
            <Input
              type="search"
              name="q"
              defaultValue={normalizedQuery}
              placeholder="Search writing"
              aria-label="Search posts"
              autoComplete="off"
              className="h-11 w-full rounded-none border-x-0 border-t-0 border-border/70 bg-transparent px-0 text-base shadow-none focus-visible:border-foreground focus-visible:ring-0"
            />
            <button type="submit" className="sr-only">
              Search
            </button>
            {normalizedQuery ? (
              <Link
                href={buildBlogUrl({ category: normalizedSelected, query: "" })}
                prefetch={false}
                className="inline-flex min-h-11 shrink-0 items-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
              >
                Clear
              </Link>
            ) : null}
          </form>

          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex w-max min-w-full flex-nowrap items-center justify-start gap-5">
              {BLOG_FILTER_ITEMS.map((category) => {
                const slug = category.slug.toLowerCase()
                const isActive = slug === normalizedSelected

                return (
                  <Link
                    key={category.slug}
                    href={buildBlogUrl({ category: slug, query: normalizedQuery })}
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
    </div>
  )
}
