"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { staggeredGridContainer, staggeredGridEntrance, scrollRevealBlog } from "@/utils/animation-variants"
import type { BlogFrontmatter } from "@/lib/mdx"

interface BlogPost extends BlogFrontmatter {
  slug: string
  featured?: boolean
  compact?: boolean
}

interface AnimatedBlogGridProps {
  children: React.ReactNode
  posts: BlogPost[]
  className?: string
}

export default function AnimatedBlogGrid({ children, posts, className = "" }: AnimatedBlogGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={staggeredGridContainer}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      style={{
        // GPU acceleration
        transform: "translateZ(0)",
        willChange: "transform",
        contain: "layout style paint",
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={staggeredGridEntrance}
          custom={index}
          className="gpu-accelerated"
          style={{
            // Hardware acceleration
            transform: "translateZ(0)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Enhanced grid with intersection observer for performance
export function AnimatedBlogGridWithObserver({ children, posts, className = "" }: AnimatedBlogGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.2
  })

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={scrollRevealBlog}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        // Performance optimizations
        transform: "translateZ(0)",
        willChange: isInView ? "transform, opacity, filter" : "auto",
        contain: "layout style paint",
        isolation: "isolate",
      }}
    >
      <motion.div
        variants={staggeredGridContainer}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="contents"
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={staggeredGridEntrance}
            custom={index}
            className="gpu-accelerated"
            style={{
              // Hardware layer promotion
              transform: "translateZ(0)",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              perspective: "1000px",
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}