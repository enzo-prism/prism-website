"use client"

import React, { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { filterButtonMorph, magneticFilter } from "@/utils/animation-variants"

interface AnimatedFilterButtonsProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export default function AnimatedFilterButtons({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ""
}: AnimatedFilterButtonsProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <div className={`flex overflow-x-auto gap-2 mb-8 pb-2 ${className}`}>
      {categories.map((category) => (
        <AnimatedFilterButton
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          isHovered={hoveredButton === category}
          onClick={() => onCategoryChange(category)}
          onHover={() => setHoveredButton(category)}
          onLeave={() => setHoveredButton(null)}
        />
      ))}
    </div>
  )
}

interface AnimatedFilterButtonProps {
  category: string
  isSelected: boolean
  isHovered: boolean
  onClick: () => void
  onHover: () => void
  onLeave: () => void
}

function AnimatedFilterButton({
  category,
  isSelected,
  isHovered,
  onClick,
  onHover,
  onLeave
}: AnimatedFilterButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  
  // Magnetic hover effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  // Handle magnetic effect
  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = (event.clientX - centerX) * 0.1
    const mouseY = (event.clientY - centerY) * 0.1
    
    x.set(mouseX)
    y.set(mouseY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onLeave()
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      className="relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap overflow-hidden"
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      variants={filterButtonMorph}
      animate={isSelected ? "active" : "inactive"}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      layout
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neutral-900/10 via-neutral-900/5 to-neutral-900/10 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Ripple effect on click */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 bg-neutral-900/20 rounded-full"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      
      {/* Shimmer effect for active state */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={isSelected ? { x: ["0%", "100%"] } : {}}
        transition={{
          duration: 1.5,
          repeat: isSelected ? Infinity : 0,
          repeatDelay: 2,
          ease: "linear"
        }}
      />
      
      {/* Button text */}
      <motion.span
        className="relative z-10"
        animate={{
          color: isSelected ? "rgb(255, 255, 255)" : "rgb(23, 23, 23)",
        }}
        transition={{ duration: 0.3 }}
      >
        {category}
      </motion.span>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered && !isSelected ? 0.5 : 0,
          scale: isHovered && !isSelected ? 1.1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

// Alternative compact version for mobile
export function CompactAnimatedFilterButtons({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ""
}: AnimatedFilterButtonsProps) {
  return (
    <motion.div 
      className={`flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-neutral-900 text-white shadow-lg'
              : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  )
}
