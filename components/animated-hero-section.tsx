"use client"

import React, { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { parallaxHero, textReveal, staggerContainer } from "@/utils/animation-variants"

interface AnimatedHeroSectionProps {
  title: string
  subtitle: string
  className?: string
}

export default function AnimatedHeroSection({
  title,
  subtitle,
  className = ""
}: AnimatedHeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Parallax scrolling effect
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300])
  const textY = useTransform(scrollY, [0, 1000], [0, 150])
  
  // Smooth spring animations
  const backgroundYSpring = useSpring(backgroundY, { stiffness: 300, damping: 30 })
  const textYSpring = useSpring(textY, { stiffness: 400, damping: 40 })

  return (
    <motion.section
      ref={ref}
      className={`relative px-4 py-12 md:py-16 overflow-hidden ${className}`}
      style={{
        willChange: "transform",
        contain: "layout style paint",
      }}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          y: backgroundYSpring,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl"
          animate={{
            y: [15, -15, 15],
            x: [10, -10, 10],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-xl"
          animate={{
            y: [-25, 25, -25],
            x: [15, -15, 15],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Main content */}
      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10"
        style={{
          y: textYSpring,
        }}
        variants={staggerContainer}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <div className="space-y-4 text-center md:text-left">
          {/* Animated title */}
          <motion.div className="overflow-hidden">
            <motion.h1
              className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl"
              variants={textReveal}
              style={{
                willChange: "transform",
              }}
            >
              {title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2"
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
          
          {/* Animated subtitle */}
          <motion.div className="overflow-hidden">
            <motion.p
              className="text-neutral-600 lowercase md:text-lg max-w-2xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
          
          {/* Animated decorative line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto md:mx-0"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: "easeOut",
            }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// Alternative minimal version
export function MinimalAnimatedHeroSection({
  title,
  subtitle,
  className = ""
}: AnimatedHeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.section
      ref={ref}
      className={`px-4 py-12 md:py-16 ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4 text-center md:text-left">
          <motion.h1
            className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          <motion.p
            className="text-neutral-600 lowercase md:text-lg max-w-2xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}
