"use client"

import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface BlogFilterNavigationProps {
  categories: Array<{ label: string; slug: string }>
  posts: Array<{
    category: string
    categorySlug: string
    title: string
    description: string
    date: string
  }>
  selectedCategory: string
  onCategoryChange: (categorySlug: string) => void
  onFilteredPostsChange: (posts: any[]) => void
  className?: string
}

export default function BlogFilterNavigation({
  categories,
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
      filtered = filtered.filter((post) => post.categorySlug === selectedCategory)
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

  const buttonCategories = [
    { slug: "all", label: "all" },
    ...categories.map((c) => ({ slug: c.slug, label: c.label })),
  ]

  return (
    <div
      className={`sticky top-[var(--prism-header-height,0px)] z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 ${className}`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="space-y-3">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="h-auto w-full rounded-full border-0 bg-neutral-100 py-2.5 pl-10 pr-10 text-sm transition-all duration-200 focus-visible:ring-neutral-900 focus:bg-white"
            />
            {searchQuery && (
              <Button
                type="button"
                onClick={() => setSearchQuery("")}
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full hover:bg-neutral-200"
                aria-label="Clear search"
              >
                <X className="h-3 w-3 text-neutral-500" />
              </Button>
            )}
          </div>

          <ToggleGroup
            type="single"
            value={selectedCategory}
            onValueChange={(value) => {
              if (value) onCategoryChange(value)
            }}
            wrap={false}
            className="w-full flex-nowrap justify-start gap-2 overflow-x-auto scrollbar-hide pb-1"
          >
            {buttonCategories.map((category) => (
              <ToggleGroupItem
                key={category.slug}
                value={category.slug}
                className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium lowercase text-neutral-700 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-900 data-[state=on]:bg-neutral-900 data-[state=on]:text-white"
              >
                {category.label.toLowerCase()}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}
