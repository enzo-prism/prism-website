"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import type { BlogFrontmatter } from "@/lib/mdx"

interface BlogPost extends BlogFrontmatter {
  slug: string
  featured?: boolean
  compact?: boolean
}

interface MobileBlogGridProps {
  children: React.ReactNode
  posts: BlogPost[]
  className?: string
}

// Mobile-optimized animation variants
const mobileGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const mobileCardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
}

// Desktop animation variants (more complex)
const desktopGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const desktopCardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
    rotateX: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function MobileBlogGrid({ children, posts, className = "" }: MobileBlogGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.2
  })
  const isMobile = useMobile()
  const [reducedMotion, setReducedMotion] = useState(false)

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

  // Choose animation variants based on device and preferences
  const gridVariants = reducedMotion ? 
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    isMobile ? mobileGridVariants : desktopGridVariants

  const cardVariants = reducedMotion ?
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    isMobile ? mobileCardVariants : desktopCardVariants

  return (
    <motion.div
      ref={ref}
      className={`
        grid gap-6 w-full
        ${isMobile 
          ? 'grid-cols-1 px-4' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }
        ${className}
      `}
      variants={gridVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        // Optimized for mobile performance
        transform: "translateZ(0)",
        willChange: isInView ? "transform, opacity" : "auto",
        contain: "layout style paint",
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          custom={index}
          style={{
            // Mobile-optimized GPU acceleration
            transform: "translateZ(0)",
            willChange: isInView ? "transform, opacity" : "auto",
            backfaceVisibility: "hidden",
            // Add proper touch targets for mobile
            minHeight: isMobile ? "200px" : "auto",
          }}
          className={`
            ${isMobile ? 'mobile-touch-target' : ''}
            transition-transform duration-200 ease-out
          `}
          whileHover={!isMobile && !reducedMotion ? { 
            scale: 1.02,
            y: -4,
            transition: { duration: 0.2 }
          } : {}}
          whileTap={isMobile ? {
            scale: 0.98,
            transition: { duration: 0.1 }
          } : {}}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Specialized mobile-first list view for narrow screens
export function MobileBlogList({ children, posts, className = "" }: MobileBlogGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-20px",
    amount: 0.1
  })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const listVariants = reducedMotion ? 
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    }

  const itemVariants = reducedMotion ?
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    {
      hidden: { 
        opacity: 0, 
        x: -20,
        scale: 0.98,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.3,
        },
      },
    }

  return (
    <motion.div
      ref={ref}
      className={`
        flex flex-col gap-4 w-full px-4
        ${className}
      `}
      variants={listVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        transform: "translateZ(0)",
        willChange: isInView ? "transform, opacity" : "auto",
        contain: "layout style paint",
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          custom={index}
          style={{
            transform: "translateZ(0)",
            willChange: isInView ? "transform, opacity" : "auto",
            backfaceVisibility: "hidden",
            minHeight: "120px", // Compact mobile cards
          }}
          className="mobile-touch-target"
          whileTap={!reducedMotion ? {
            scale: 0.98,
            transition: { duration: 0.1 }
          } : {}}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Performance-optimized grid with intersection observer
export function PerformantMobileBlogGrid({ children, posts, className = "" }: MobileBlogGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.1
  })
  const isMobile = useMobile()
  const [visibleItems, setVisibleItems] = useState(isMobile ? 6 : 12)
  
  // Lazy load more items on mobile
  const handleLoadMore = () => {
    setVisibleItems(prev => prev + (isMobile ? 3 : 6))
  }

  const childrenArray = React.Children.toArray(children)
  const visibleChildren = childrenArray.slice(0, visibleItems)
  const hasMore = childrenArray.length > visibleItems

  return (
    <div className="w-full">
      <motion.div
        ref={ref}
        className={`
          grid gap-4 w-full
          ${isMobile 
            ? 'grid-cols-1 px-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }
          ${className}
        `}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          transform: "translateZ(0)",
          willChange: isInView ? "transform, opacity" : "auto",
          contain: "layout style paint",
        }}
      >
        {visibleChildren.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              ease: "easeOut"
            }}
            style={{
              transform: "translateZ(0)",
              willChange: isInView ? "transform, opacity" : "auto",
              backfaceVisibility: "hidden",
              minHeight: isMobile ? "180px" : "auto",
            }}
            className="mobile-touch-target"
            whileTap={isMobile ? {
              scale: 0.98,
              transition: { duration: 0.1 }
            } : {}}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
      
      {hasMore && (
        <motion.div
          className="flex justify-center mt-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleLoadMore}
            className="
              px-6 py-3 bg-neutral-900 text-white rounded-full
              font-medium text-sm lowercase
              hover:bg-neutral-800 transition-colors
              focus:outline-none focus:ring-2 focus:ring-neutral-500
              active:scale-95 transition-transform
              min-h-[44px] min-w-[44px]
            "
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            load more posts
          </button>
        </motion.div>
      )}
    </div>
  )
}