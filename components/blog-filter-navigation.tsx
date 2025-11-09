"use client"

import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"

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

  const buttonCategories = [{ slug: "all", label: "all" }, ...categories.map((c) => ({ slug: c.slug, label: c.label })) ]

  return (
    <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 ${className}`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="space-y-3">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                aria-label="Clear search"
              >
                <X className="h-3 w-3 text-neutral-500" />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {buttonCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => onCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.slug
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 active:bg-neutral-200"
                }`}
              >
                {category.label.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
