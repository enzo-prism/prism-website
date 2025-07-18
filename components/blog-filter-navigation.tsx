"use client"

import { useMobile } from "@/hooks/use-mobile"
import { AnimatePresence, motion } from "framer-motion"
import { Calendar, ChevronDown, Filter, Search, TrendingUp, X } from "lucide-react"
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
  'AI & Tech': ['AI & Marketing', 'AI & Development', 'Web Development & AI', 'AI & Dentistry', 'ai & business', 'ai & design', 'AI Search Optimization', 'SEO & AI'],
  'Business': ['Business & Leadership', 'Motivation & Entrepreneurship'],
  'Marketing': ['Content Marketing & SEO', 'ai & marketing', 'AI & Marketing']
}

const TIME_FILTERS = [
  { label: 'All Time', value: 'all' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'This Year', value: 'year' }
]

const SORT_OPTIONS = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Popular', value: 'popular' }
]

export default function BlogFilterNavigation({
  categories,
  posts,
  selectedCategory,
  onCategoryChange,
  onFilteredPostsChange,
  className = ""
}: BlogFilterNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all")
  const [selectedSort, setSelectedSort] = useState("latest")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const isMobile = useMobile()
  const searchRef = useRef<HTMLInputElement>(null)
  const timeDropdownRef = useRef<HTMLDivElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
        setShowTimeDropdown(false)
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
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

    // Time filter
    if (selectedTimeFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      switch (selectedTimeFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      filtered = filtered.filter(post => new Date(post.date) >= filterDate)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'popular':
          // Assuming we have a views or likes property, otherwise fall back to date
          return (b.views || 0) - (a.views || 0)
        default:
          return 0
      }
    })

    onFilteredPostsChange(filtered)
  }, [selectedCategory, searchQuery, selectedTimeFilter, selectedSort, posts, onFilteredPostsChange])

  const simplifiedCategories = Object.keys(SIMPLIFIED_CATEGORIES)

  return (
    <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 ${className}`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="space-y-3">
            {/* Search Bar Row */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    <X className="h-3 w-3 text-neutral-500" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  showMobileFilters 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {simplifiedCategories.map((category) => (
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

            {/* Expanded Mobile Filters */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-2 space-y-4 border-t border-neutral-200">
                    {/* Time Filter */}
                    <div>
                      <label className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-2 block">
                        Time Period
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {TIME_FILTERS.map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() => setSelectedTimeFilter(filter.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                              selectedTimeFilter === filter.value
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-2 block">
                        Sort By
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {SORT_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setSelectedSort(option.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                              selectedSort === option.value
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-200 rounded-full transition-colors"
                >
                  <X className="h-3 w-3 text-neutral-500" />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-neutral-100 rounded-full p-1">
              {simplifiedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-white shadow-sm text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {category.toLowerCase()}
                </button>
              ))}
            </div>

            {/* Time Filter Dropdown */}
            <div className="relative" ref={timeDropdownRef}>
              <button 
                onClick={() => {
                  setShowTimeDropdown(!showTimeDropdown)
                  setShowSortDropdown(false)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-sm font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                {TIME_FILTERS.find(f => f.value === selectedTimeFilter)?.label}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showTimeDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showTimeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 min-w-[150px] z-50"
                  >
                    {TIME_FILTERS.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => {
                          setSelectedTimeFilter(filter.value)
                          setShowTimeDropdown(false)
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 transition-colors ${
                          selectedTimeFilter === filter.value ? 'font-medium text-neutral-900' : 'text-neutral-700'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button 
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown)
                  setShowTimeDropdown(false)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-sm font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                {SORT_OPTIONS.find(o => o.value === selectedSort)?.label}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 min-w-[150px] z-50"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedSort(option.value)
                          setShowSortDropdown(false)
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 transition-colors ${
                          selectedSort === option.value ? 'font-medium text-neutral-900' : 'text-neutral-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 