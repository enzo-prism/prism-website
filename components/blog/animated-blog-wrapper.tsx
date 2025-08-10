"use client"

import { fadeInUp, staggerContainer } from "@/utils/animation-variants"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface AnimatedBlogWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedBlogWrapper({ children, className = "" }: AnimatedBlogWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  // Keep content visible throughout scroll - remove fade out effect
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  useEffect(() => {
    // Enable animations only when JS is available and animations are supported
    const supportsAnimations = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!isMounted || !supportsAnimations || !containerRef.current) {
      return
    }
    if (containerRef.current) {
      // Add animation support class to enable hidden initial state
      containerRef.current.classList.add("supports-animations")
      
      // Add scroll-triggered animations to headings and paragraphs
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-reveal")
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      )

      // Observe all headings and paragraphs
      const elements = containerRef.current.querySelectorAll("h1, h2, h3, p, ul, ol, blockquote")
      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }
    // If animations aren't supported or are disabled, content remains visible by default
  }, [isMounted])

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ y, opacity }}
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {!isMounted ? (
        <div className="relative z-10">{children}</div>
      ) : (
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-20"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content with enhanced typography */}
      <motion.div
        className="relative z-10"
        variants={fadeInUp}
      >
        {children}
      </motion.div>
      )}
    </motion.div>
  )
}