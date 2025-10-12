"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { trackCTAClick } from "@/utils/analytics"
import { ctaButtonFloat, ctaButtonGlow } from "@/utils/animation-variants"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

export default function BlogCTAButton() {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse tracking for magnetic effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  // Handle magnetic hover effect
  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = (event.clientX - centerX) * 0.15
    const mouseY = (event.clientY - centerY) * 0.15
    
    x.set(mouseX)
    y.set(mouseY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <Link href="/get-started">
      <motion.button
        ref={ref}
        className="relative inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white lowercase overflow-hidden group"
        onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "blog page")}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        variants={ctaButtonFloat}
        initial="initial"
        animate="animate"
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgb(23, 23, 23)",
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          // GPU acceleration
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{ x: ["0%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
        />
        
        {/* Sparkle particles */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isHovered ? "hover" : "initial"}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={isHovered ? {
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i - 1) * 20],
                y: [0, (i - 1) * 10],
              } : {}}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Button content */}
        <motion.span
          className="relative z-10 flex items-center gap-2"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            animate={isHovered ? { x: [0, 2, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {FREE_AUDIT_CTA_TEXT}
          </motion.span>
          
          <motion.div
            animate={isHovered ? { x: [0, 4, 0], rotate: [0, 360, 0] } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </motion.span>
        
        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </Link>
  )
}
