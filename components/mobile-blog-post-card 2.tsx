"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { trackCTAClick } from "@/utils/analytics"
import { cn } from "@/lib/utils"
import CoreImage from "@/components/core-image"
import { useMobile } from "@/hooks/use-mobile"

interface MobileBlogPostCardProps {
  title: string
  category: string
  date: string
  description: string
  slug: string
  image: string
  featured?: boolean
  compact?: boolean
  gradientClass: string
}

export default function MobileBlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  featured = false,
  compact = false,
  gradientClass,
}: MobileBlogPostCardProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
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

  // Calculate reading time
  const readingTime = Math.ceil(description.length / 200) || 1

  return (
    <Link 
      href={`/blog/${slug}`} 
      onClick={() => trackCTAClick(`view blog post`, title)}
      className={`
        block focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 rounded-lg
        mobile-blog-card animate-in
        relative border border-neutral-200 rounded-xl overflow-hidden h-full
        bg-white shadow-sm hover:shadow-md transition-all duration-200
        ${isMobile ? 'min-h-[280px] active:scale-[0.98]' : 'hover:scale-[1.02] hover:-translate-y-1'}
      `}
    >
      <div className="h-full w-full">
        {/* Featured badge */}
        {featured && (
          <motion.div 
            className="absolute top-3 left-3 text-xs text-white bg-black/80 px-3 py-1 rounded-full lowercase z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            featured
          </motion.div>
        )}
        
        {/* Image/Gradient section */}
        <div className={cn("relative w-full h-48 overflow-hidden", gradientClass)}>
          {/* Subtle animation overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={!reducedMotion ? { x: ["0%", "100%"] } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "linear"
            }}
          />
          
          {/* Content overlay for better text readability */}
          <div className="absolute inset-0 bg-black/5" />
        </div>
        
        {/* Content section */}
        <div className="p-5 space-y-4">
          {/* Category and metadata */}
          <div className="flex items-center justify-between gap-2">
            <motion.div 
              className="inline-flex items-center px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium lowercase"
              whileHover={!isMobile && !reducedMotion ? { scale: 1.05 } : {}}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.div>
            
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h3 className={`
            font-bold lowercase leading-tight
            ${isMobile ? 'text-lg' : 'text-xl'}
            ${compact ? 'line-clamp-2' : 'line-clamp-3'}
          `}>
            {title}
          </h3>
          
          {/* Description */}
          {!compact && (
            <p className={`
              text-neutral-600 lowercase leading-relaxed
              ${isMobile ? 'text-sm line-clamp-2' : 'text-base line-clamp-3'}
            `}>
              {description}
            </p>
          )}
          
          {/* Read more link */}
          <div className="flex items-center justify-between pt-2">
            <motion.div 
              className="flex items-center text-sm font-medium text-neutral-900 lowercase"
              whileHover={!isMobile && !reducedMotion ? { x: 4 } : {}}
              transition={{ duration: 0.2 }}
            >
              <span>read post</span>
              <motion.div
                className="ml-1"
                animate={!reducedMotion ? { x: [0, 4, 0] } : {}}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.div>
            
            {/* Progress dots for mobile */}
            {isMobile && (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-neutral-300 rounded-full" />
                <div className="w-2 h-2 bg-neutral-200 rounded-full" />
                <div className="w-2 h-2 bg-neutral-200 rounded-full" />
              </div>
            )}
          </div>
        </div>
        
      </div>
    </Link>
  )
}

// Compact horizontal layout for mobile lists
export function CompactMobileBlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  featured = false,
  gradientClass,
}: MobileBlogPostCardProps) {
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

  return (
    <Link 
      href={`/blog/${slug}`} 
      onClick={() => trackCTAClick(`view blog post`, title)}
      className="block focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 rounded-lg"
    >
      <motion.div
        className="relative border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200 min-h-[120px] active:scale-[0.98]"
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileTap={reducedMotion ? {} : { scale: 0.98 }}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="flex h-full">
          {/* Thumbnail */}
          <div className={cn("w-24 h-full flex-shrink-0", gradientClass)}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              animate={!reducedMotion ? { x: ["0%", "100%"] } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear"
              }}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between min-h-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full lowercase">
                  {category}
                </span>
                {featured && (
                  <span className="text-xs px-2 py-1 bg-black text-white rounded-full lowercase">
                    featured
                  </span>
                )}
              </div>
              
              <h3 className="text-sm font-bold lowercase leading-tight line-clamp-2">
                {title}
              </h3>
              
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>{new Date(date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{Math.ceil(description.length / 200)} min read</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-neutral-600 lowercase">read post</span>
              <ArrowRight className="h-3 w-3 text-neutral-400" />
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  )
}