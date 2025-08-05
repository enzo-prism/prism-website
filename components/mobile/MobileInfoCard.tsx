"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Star,
  Zap,
  Award
} from "lucide-react"
import { mobileFadeIn, mobileTap } from "@/utils/animation-variants"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"

interface MobileInfoCardProps {
  title?: string
  content: string
  variant?: "info" | "tip" | "warning" | "success" | "highlight"
  icon?: "info" | "tip" | "warning" | "success" | "highlight" | "lightbulb" | "target" | "trending" | "star" | "zap" | "award"
  className?: string
}

const iconMap = {
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  success: CheckCircle,
  highlight: Star,
  lightbulb: Lightbulb,
  target: Target,
  trending: TrendingUp,
  star: Star,
  zap: Zap,
  award: Award
}

const variantStyles = {
  info: {
    container: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/30",
    title: "text-blue-900 dark:text-blue-100",
    content: "text-blue-800 dark:text-blue-200",
    accent: "bg-blue-500"
  },
  tip: {
    container: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-800/30",
    title: "text-yellow-900 dark:text-yellow-100",
    content: "text-yellow-800 dark:text-yellow-200",
    accent: "bg-yellow-500"
  },
  warning: {
    container: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    icon: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-800/30",
    title: "text-amber-900 dark:text-amber-100",
    content: "text-amber-800 dark:text-amber-200",
    accent: "bg-amber-500"
  },
  success: {
    container: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/30",
    title: "text-green-900 dark:text-green-100",
    content: "text-green-800 dark:text-green-200",
    accent: "bg-green-500"
  },
  highlight: {
    container: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-800/30",
    title: "text-purple-900 dark:text-purple-100",
    content: "text-purple-800 dark:text-purple-200",
    accent: "bg-purple-500"
  }
}

export function MobileInfoCard({
  title,
  content,
  variant = "info",
  icon,
  className = ""
}: MobileInfoCardProps) {
  // Auto-select icon based on variant if not specified
  const selectedIcon = icon || variant === "tip" ? "lightbulb" : variant
  const IconComponent = iconMap[selectedIcon] || Info
  const styles = variantStyles[variant]
  const { getViewportConfig } = useMobileAnimations()
  const viewportConfig = getViewportConfig()

  return (
    <motion.div
      variants={mobileFadeIn}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      whileTap="tap"
      className={`
        relative overflow-hidden rounded-xl border-2 p-5 backdrop-blur-sm
        ${styles.container}
        shadow-lg mobile-gpu-accelerated
        touch-manipulation
        ${className}
      `}
      data-scroll-animate
    >
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${styles.accent}`} />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div
            className={`
              flex-shrink-0 p-2 rounded-lg ${styles.icon}
              shadow-sm
            `}
          >
            <IconComponent className="h-5 w-5" />
          </div>
          
          {/* Title */}
          {title && (
            <div className="flex-1">
              <h4 className={`text-base font-semibold ${styles.title} leading-tight`}>
                {title}
              </h4>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className={`${title ? "ml-13" : ""}`}>
          <p className={`${styles.content} leading-relaxed text-sm`}>
            {content}
          </p>
        </div>
      </div>
      
      {/* Subtle glow effect - static on mobile for performance */}
      <div
        className={`
          absolute -top-4 -right-4 w-16 h-16 rounded-full 
          ${styles.accent} blur-xl opacity-20
        `}
      />
      
      {/* Touch interaction indicator */}
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-current opacity-30" />
    </motion.div>
  )
}