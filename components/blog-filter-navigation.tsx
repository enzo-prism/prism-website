"use client"

import { Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface BlogFilterNavigationProps {
  categories: string[]
  posts: any[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onFilteredPostsChange: (posts: any[]) => void
  className?: string
}

// Simplified categories for better UX
const SIMPLIFIED_CATEGORIES = {
  'All': 'All',
  'AI & Tech': [
    'AI & Marketing',
    'AI & Development',
    'Web Development & AI',
    'AI & Dentistry',
    'ai & business',
    'ai & design',
    'AI Search Optimization',
    'SEO & AI',
    'AI & Automation',
    'AI & Business Productivity',
    'Business & AI',
    'appear in ai search',
    'ai powered web development'
  ],
  'Business': ['Business & Leadership', 'Motivation & Entrepreneurship', 'Business & AI'],
  'Marketing': ['Content Marketing & SEO', 'ai & marketing', 'AI & Marketing', 'SEO & AI', 'seo', 'appear in ai search'],
  'Design': ['Design & Product', 'ai & design']
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
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // no-op: no dropdowns in minimal UI
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter posts based on all criteria
  useEffect(() => {
    let filtered = [...posts]

    // Category filter
    if (selectedCategory !== 'All') {
      const categoryMap = Object.entries(SIMPLIFIED_CATEGORIES).find(([key]) => key === selectedCategory)
      if (categoryMap && Array.isArray(categoryMap[1])) {
        filtered = filtered.filter(post => categoryMap[1].includes(post.category))
      } else if (selectedCategory !== 'All') {
        filtered = filtered.filter(post => post.category === selectedCategory)
      }
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      )
    }

    // Default: latest first
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    onFilteredPostsChange(filtered)
  }, [selectedCategory, searchQuery, posts, onFilteredPostsChange])

  const simplifiedCategories = Object.keys(SIMPLIFIED_CATEGORIES)

  return (
    <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 ${className}`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="space-y-3">
          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
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

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {Object.keys(SIMPLIFIED_CATEGORIES).map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 active:bg-neutral-200'
                }`}
              >
                {category.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
