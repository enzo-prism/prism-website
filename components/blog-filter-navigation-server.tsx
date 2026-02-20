import Link from "next/link"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
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
        "sticky top-[var(--prism-header-height,0px)] z-40 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="space-y-3">
          <form action="/blog" method="get" className="relative max-w-2xl">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
              focusable="false"
            />
            {normalizedSelected !== "all" ? (
              <input type="hidden" name="category" value={normalizedSelected} />
            ) : null}
            <Input
              type="search"
              name="q"
              defaultValue={normalizedQuery}
              placeholder="Search posts…"
              aria-label="Search posts"
              autoComplete="off"
              className="h-auto w-full rounded-md border border-border/60 bg-card/30 py-3 pl-10 pr-10 text-base leading-6 transition-colors duration-200 focus:bg-card focus-visible:ring-ring"
            />
            <button type="submit" className="sr-only">
              Search
            </button>
            {normalizedQuery ? (
              <Button
                asChild
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-md hover:bg-muted/60"
                aria-label="Clear search"
              >
                <Link href={buildBlogUrl({ category: normalizedSelected, query: "" })} prefetch={false}>
                  <X className="h-3 w-3 text-muted-foreground" aria-hidden="true" focusable="false" />
                </Link>
              </Button>
            ) : null}
          </form>

          <div className="w-full overflow-x-auto scrollbar-hide pb-1">
            <div className="flex w-max min-w-full flex-nowrap items-center justify-start gap-2">
              {BLOG_FILTER_ITEMS.map((category) => {
                const slug = category.slug.toLowerCase()
                const isActive = slug === normalizedSelected

                return (
                  <Link
                    key={category.slug}
                    href={buildBlogUrl({ category: slug, query: normalizedQuery })}
                    prefetch={false}
                    className={cn(
                      "shrink-0 inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground",
                      isActive && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {category.icon ? (
                      <category.icon
                        className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")}
                        aria-hidden="true"
                        focusable="false"
                      />
                    ) : null}
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
