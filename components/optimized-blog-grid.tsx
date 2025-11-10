"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { BlogFrontmatter } from "@/lib/mdx"

interface BlogPost extends BlogFrontmatter {
  slug: string
  featured?: boolean
  compact?: boolean
}

interface OptimizedBlogGridProps {
  children: React.ReactNode
  posts: BlogPost[]
  className?: string
}

export default function OptimizedBlogGrid({ children, posts, className = "" }: OptimizedBlogGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleChildren, setVisibleChildren] = useState<Set<number>>(new Set())
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            setVisibleChildren(prev => new Set(prev).add(index))
          }
        })
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
      }
    )
    
    // Observe all child elements
    const childElements = containerRef.current.querySelectorAll('[data-index]')
    childElements.forEach(child => observer.observe(child))
    
    return () => observer.disconnect()
  }, [children])
  
  return (
    <div
      ref={containerRef}
      className={`
        grid gap-6 w-full
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3
        optimized-grid
        ${className}
      `}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        perspective: "1000px",
        WebkitPerspective: "1000px",
        willChange: "transform",
        contain: "layout style paint"
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          data-index={index}
          className={`
            hardware-accelerated
            ${visibleChildren.has(index) ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-500
          `}
          style={{
            backfaceVisibility: "hidden",
            willChange: visibleChildren.has(index) ? "transform, opacity" : "auto"
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Virtual scrolling grid for large lists
export function VirtualizedBlogGrid({ children, posts, className = "" }: OptimizedBlogGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 9 })
  const itemHeight = 400 // Approximate height of each blog card
  const buffer = 3 // Number of items to render outside viewport
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const scrollTop = window.scrollY
      const viewportHeight = window.innerHeight
      const containerTop = containerRef.current.offsetTop
      
      const start = Math.max(0, Math.floor((scrollTop - containerTop) / itemHeight) - buffer)
      const end = Math.min(
        posts.length,
        Math.ceil((scrollTop - containerTop + viewportHeight) / itemHeight) + buffer
      )
      
      setVisibleRange({ start, end })
    }
    
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [posts.length, itemHeight])
  
  const childrenArray = React.Children.toArray(children)
  const visibleChildren = childrenArray.slice(visibleRange.start, visibleRange.end)
  const totalHeight = posts.length * itemHeight
  
  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
    >
      <div
        className={`
          grid gap-6 w-full
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3
          ${className}
        `}
        style={{
          position: 'absolute',
          top: visibleRange.start * itemHeight,
          left: 0,
          right: 0,
          backfaceVisibility: "hidden",
          willChange: "transform"
        }}
      >
        {visibleChildren}
      </div>
    </div>
  )
} 
