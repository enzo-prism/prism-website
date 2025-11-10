"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface MobileHeroSectionProps {
  title: string
  subtitle: string
  className?: string
}

export default function MobileHeroSection({
  title,
  subtitle,
  className = ""
}: MobileHeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
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

  // Mobile-optimized animations (simpler and more performant)
  const mobileHeroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const mobileTextVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  // Desktop animations (more complex)
  const desktopHeroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  }

  const desktopTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  // Word-by-word animation for desktop
  const wordVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  // Choose variants based on device and preferences
  const heroVariants = reducedMotion ? 
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    isMobile ? mobileHeroVariants : desktopHeroVariants

  const textVariants = reducedMotion ?
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    isMobile ? mobileTextVariants : desktopTextVariants

  return (
    <motion.section
      ref={ref}
      className={`
        relative px-4 py-8 md:py-12 lg:py-16 overflow-hidden
        ${className}
      `}
      variants={heroVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        willChange: isInView ? "transform, opacity" : "auto",
        contain: "layout style paint",
      }}
    >
      {/* Simplified background for mobile */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        
        {/* Single floating element for mobile, multiple for desktop */}
        {isMobile ? (
          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
            animate={!reducedMotion ? {
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
              animate={!reducedMotion ? {
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.1, 1],
              } : {}}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl"
              animate={!reducedMotion ? {
                y: [15, -15, 15],
                x: [10, -10, 10],
                scale: [1.1, 1, 1.1],
              } : {}}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </motion.div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="space-y-4 md:space-y-6 text-center md:text-left">
          {/* Title */}
          <motion.div className="overflow-hidden">
            {isMobile || reducedMotion ? (
              // Simple mobile animation
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter lowercase leading-tight"
                variants={textVariants}
                style={{
                  willChange: isInView ? "transform, opacity" : "auto",
                }}
              >
                {title}
              </motion.h1>
            ) : (
              // Word-by-word animation for desktop
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter lowercase leading-tight"
                style={{
                  willChange: isInView ? "transform, opacity" : "auto",
                }}
              >
                {title.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2"
                    variants={wordVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            )}
          </motion.div>
          
          {/* Subtitle */}
          <motion.div className="overflow-hidden">
            <motion.p
              className="text-neutral-600 lowercase text-base md:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed"
              variants={textVariants}
              style={{
                willChange: isInView ? "transform, opacity" : "auto",
              }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
          
          {/* Decorative line */}
          <motion.div
            className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto md:mx-0"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.3 : 0.8,
              delay: reducedMotion ? 0.2 : 0.6,
                  }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
      
      {/* Scroll indicator - only on desktop */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
              animate={!reducedMotion ? { y: [0, 12, 0] } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

// Minimal version for maximum performance
export function MinimalMobileHeroSection({
  title,
  subtitle,
  className = ""
}: MobileHeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  
  return (
    <motion.section
      ref={ref}
      className={`px-4 py-8 md:py-12 ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        willChange: isInView ? "opacity" : "auto",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4 text-center md:text-left">
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter lowercase leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          <motion.p
            className="text-neutral-600 lowercase text-base md:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto md:mx-0"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </motion.section>
  )
}
