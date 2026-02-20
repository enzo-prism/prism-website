"use client"

import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  BLOG_FILTER_ITEMS,
  type BlogFilterBucket,
  isValidBlogFilter,
} from "@/lib/blog-topic-filters"

interface BlogFilterNavigationProps {
  posts: Array<{
    topic: Exclude<BlogFilterBucket, "all">
    category: string
    categorySlug: string
    title: string
    description: string
    date: string
  }>
  selectedCategory: BlogFilterBucket
  onCategoryChange: (categorySlug: BlogFilterBucket) => void
  onFilteredPostsChange: (posts: Array<{
    topic: Exclude<BlogFilterBucket, "all">
    category: string
    categorySlug: string
    title: string
    description: string
    date: string
  }>) => void
  className?: string
}

export default function BlogFilterNavigation({
  posts,
  selectedCategory,
  onCategoryChange,
  onFilteredPostsChange,
  className = ""
}: BlogFilterNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let filtered = [...posts]

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.topic === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query),
      )
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    onFilteredPostsChange(filtered)
  }, [posts, searchQuery, selectedCategory, onFilteredPostsChange])

  const buttonCategories = BLOG_FILTER_ITEMS

  return (
    <div
      className={`sticky top-[var(--prism-header-height,0px)] z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm ${className}`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="space-y-3">
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
              focusable="false"
            />
            <Input
              type="text"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts…"
              aria-label="Search posts"
              autoComplete="off"
              className="h-auto w-full rounded-md border border-border/60 bg-card/30 py-2.5 pl-10 pr-10 text-xs font-semibold text-foreground font-pixel tracking-[0.1em] transition-colors duration-200 placeholder:text-muted-foreground focus-visible:ring-ring focus:bg-card/40"
            />
            {searchQuery && (
              <Button
                type="button"
                onClick={() => setSearchQuery("")}
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-md hover:bg-muted/40"
                aria-label="Clear search"
              >
                <X className="h-3 w-3 text-muted-foreground" aria-hidden="true" focusable="false" />
              </Button>
            )}
          </div>

          <ToggleGroup
            type="single"
            value={selectedCategory}
            onValueChange={(value) => {
              if (!value) return

              const normalizedValue = value.toLowerCase()
              if (isValidBlogFilter(normalizedValue)) {
                onCategoryChange(normalizedValue)
              }
            }}
            wrap={false}
            className="w-full flex-nowrap justify-start gap-2 overflow-x-auto scrollbar-hide pb-1"
          >
            {buttonCategories.map((category) => (
              <ToggleGroupItem
                key={category.slug}
                value={category.slug}
                className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:bg-muted/40 hover:text-foreground data-[state=on]:border-white/30 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {category.icon ? (
                  <category.icon
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                    focusable="false"
                  />
                ) : null}
                {category.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}
