"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface MobileFilterButtonsProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export default function MobileFilterButtons({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ""
}: MobileFilterButtonsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Check scroll state
  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // Handle scroll events
  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      checkScrollState()
      scrollElement.addEventListener('scroll', checkScrollState)
      return () => scrollElement.removeEventListener('scroll', checkScrollState)
    }
  }, [categories])

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 150 : 200
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 150 : 200
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Handle category selection with haptic feedback
  const handleCategorySelect = (category: string) => {
    onCategoryChange(category)
    
    // Haptic feedback for mobile
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Scroll indicator shadows */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"
          />
        )}
        {canScrollRight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Scroll buttons for desktop */}
      {!isMobile && (
        <>
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-4 w-4 text-neutral-600" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-4 w-4 text-neutral-600" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Filter buttons container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        {categories.map((category, index) => (
          <MobileFilterButton
            key={category}
            category={category}
            isSelected={selectedCategory === category}
            onClick={() => handleCategorySelect(category)}
            index={index}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Mobile scroll indicator dots */}
      {isMobile && categories.length > 3 && (
        <div className="flex justify-center mt-3 gap-1">
          {Array.from({ length: Math.ceil(categories.length / 3) }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-6 rounded-full transition-colors duration-200 ${
                index === 0 ? 'bg-neutral-400' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface MobileFilterButtonProps {
  category: string
  isSelected: boolean
  onClick: () => void
  index: number
  isMobile: boolean
  reducedMotion: boolean
}

function MobileFilterButton({
  category,
  isSelected,
  onClick,
  index,
  isMobile,
  reducedMotion
}: MobileFilterButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  // Mobile-optimized button styles
  const buttonVariants = reducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: {},
    tap: {}
  } : {
    initial: { 
      opacity: 0, 
      scale: 0.9,
      y: 10,
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.05,
      }
    },
    hover: isMobile ? {} : {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  return (
    <motion.button
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        relative px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap
        transition-all duration-200 overflow-hidden
        ${isMobile ? 'min-h-[44px] min-w-[44px]' : 'min-h-[36px]'}
        ${isSelected 
          ? 'bg-neutral-900 text-white shadow-lg' 
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300'
        }
        ${isPressed ? 'shadow-inner' : ''}
        focus:outline-hidden focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2
        active:shadow-inner
      `}
      style={{
        scrollSnapAlign: 'start',
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Background gradient for selected state */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-full"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Ripple effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 rounded-full ${
              isSelected ? 'bg-white/20' : 'bg-neutral-900/10'
            }`}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Button text */}
      <motion.span
        className="relative z-10 lowercase"
        animate={{
          color: isSelected ? "rgb(255, 255, 255)" : "rgb(64, 64, 64)",
        }}
        transition={{ duration: 0.2 }}
      >
        {category}
      </motion.span>

      {/* Selected indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Compact version for very small screens
export function CompactMobileFilterButtons({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ""
}: MobileFilterButtonsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const visibleCategories = isExpanded ? categories : categories.slice(0, 3)
  const hasMore = categories.length > 3

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap gap-2 justify-center">
        {visibleCategories.map((category, index) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-3 py-2 rounded-full text-xs font-medium transition-all duration-200
              min-h-[40px] min-w-[40px]
              ${selectedCategory === category
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300'
              }
              focus:outline-hidden focus:ring-2 focus:ring-neutral-500
            `}
            style={{
              willChange: "transform",
            }}
          >
            {category}
          </button>
        ))}
        
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 rounded-full text-xs font-medium bg-neutral-200 text-neutral-600 hover:bg-neutral-300 transition-colors min-h-[40px] min-w-[40px]"
          >
            {isExpanded ? '- less' : '+ more'}
          </button>
        )}
      </div>
    </div>
  )
}
