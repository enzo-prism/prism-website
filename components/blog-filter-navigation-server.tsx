import Link from "next/link"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type BlogCategory = {
  label: string
  slug: string
}

interface BlogFilterNavigationServerProps {
  categories: BlogCategory[]
  selectedCategory: string
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
  categories,
  selectedCategory,
  query,
  className,
}: BlogFilterNavigationServerProps) {
  const normalizedSelected = selectedCategory.trim().toLowerCase() || "all"
  const normalizedQuery = query.trim()

  const buttonCategories = [
    { slug: "all", label: "all" },
    ...categories.map((c) => ({ slug: c.slug, label: c.label })),
  ]

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
              className="h-auto w-full rounded-md border border-border/60 bg-card/30 py-2.5 pl-10 pr-10 text-sm transition-colors duration-200 focus:bg-card focus-visible:ring-ring"
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
              {buttonCategories.map((category) => {
                const slug = category.slug.toLowerCase()
                const isActive = slug === normalizedSelected

                return (
                  <Link
                    key={category.slug}
                    href={buildBlogUrl({ category: slug, query: normalizedQuery })}
                    prefetch={false}
                    className={cn(
                      "shrink-0 rounded-md border border-border/60 bg-muted/40 px-4 py-2 text-[10px] font-semibold uppercase font-pixel tracking-[0.16em] text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground",
                      isActive && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
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
