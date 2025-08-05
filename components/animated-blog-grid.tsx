"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  staggeredGridContainer, 
  staggeredGridEntrance, 
  scrollRevealBlog,
  mobileStaggerContainer,
  mobileCardEntrance,
  mobileScrollReveal,
  getAnimationVariant
} from "@/utils/animation-variants"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"
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
  const { getViewportConfig, animationConfig } = useMobileAnimations()
  const viewportConfig = getViewportConfig()
  const isInView = useInView(ref, viewportConfig)
  
  // Select appropriate animation variants based on device
  const containerVariant = getAnimationVariant(staggeredGridContainer, mobileStaggerContainer)
  const entranceVariant = getAnimationVariant(staggeredGridEntrance, mobileCardEntrance)

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={containerVariant}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      style={{
        // GPU acceleration - simplified for mobile
        transform: "translateZ(0)",
        willChange: animationConfig.useGPU ? "transform" : "auto",
        contain: "layout style paint",
      }}
      data-scroll-animate
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={entranceVariant}
          custom={index}
          className="mobile-gpu-accelerated"
          style={{
            // Hardware acceleration - only when needed
            transform: "translateZ(0)",
            willChange: animationConfig.useGPU && isInView ? "transform, opacity" : "auto",
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
  const { getViewportConfig, animationConfig } = useMobileAnimations()
  const viewportConfig = getViewportConfig()
  const isInView = useInView(ref, viewportConfig)
  
  // Select appropriate animation variants
  const revealVariant = getAnimationVariant(scrollRevealBlog, mobileScrollReveal)
  const containerVariant = getAnimationVariant(staggeredGridContainer, mobileStaggerContainer)
  const entranceVariant = getAnimationVariant(staggeredGridEntrance, mobileCardEntrance)

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={revealVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        // Performance optimizations - simplified for mobile
        transform: "translateZ(0)",
        willChange: animationConfig.useGPU && isInView ? "transform, opacity" : "auto",
        contain: "layout style paint",
        isolation: "isolate",
      }}
      data-scroll-animate
    >
      <motion.div
        variants={containerVariant}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="contents"
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={entranceVariant}
            custom={index}
            className="mobile-gpu-accelerated"
            style={{
              // Hardware layer promotion - only when needed
              transform: "translateZ(0)",
              willChange: animationConfig.useGPU && isInView ? "transform, opacity" : "auto",
              backfaceVisibility: "hidden",
              perspective: animationConfig.complexity === "full" ? "1000px" : "none",
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}