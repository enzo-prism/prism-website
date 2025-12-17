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
        "sticky top-[var(--prism-header-height,0px)] z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="space-y-3">
          <form action="/blog" method="get" className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            {normalizedSelected !== "all" ? (
              <input type="hidden" name="category" value={normalizedSelected} />
            ) : null}
            <Input
              type="search"
              name="q"
              defaultValue={normalizedQuery}
              placeholder="Search posts..."
              className="h-auto w-full rounded-full border-0 bg-neutral-100 py-2.5 pl-10 pr-10 text-sm transition-all duration-200 focus:bg-white focus-visible:ring-neutral-900"
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
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full hover:bg-neutral-200"
                aria-label="Clear search"
              >
                <Link href={buildBlogUrl({ category: normalizedSelected, query: "" })} prefetch={false}>
                  <X className="h-3 w-3 text-neutral-500" />
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
                      "shrink-0 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium lowercase text-neutral-700 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-900",
                      isActive && "bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {category.label.toLowerCase()}
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

