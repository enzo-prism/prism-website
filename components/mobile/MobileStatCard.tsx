"use client"

import React from "react"
import { motion } from "framer-motion"
import { LucideIcon, TrendingDown, TrendingUp, AlertTriangle, Info } from "lucide-react"

interface MobileStatCardProps {
  title: string
  value: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  description?: string
  icon?: LucideIcon
  variant?: "primary" | "warning" | "success" | "danger"
  className?: string
}

const iconMap = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Info
}

const variantStyles = {
  primary: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-900 dark:text-blue-100",
    accent: "text-blue-600 dark:text-blue-400"
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-900 dark:text-amber-100",
    accent: "text-amber-600 dark:text-amber-400"
  },
  success: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-900 dark:text-green-100",
    accent: "text-green-600 dark:text-green-400"
  },
  danger: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-900 dark:text-red-100",
    accent: "text-red-600 dark:text-red-400"
  }
}

export function MobileStatCard({
  title,
  value,
  trend,
  trendValue,
  description,
  icon: Icon,
  variant = "primary",
  className = ""
}: MobileStatCardProps) {
  const TrendIcon = trend ? iconMap[trend] : null
  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl border-2 p-6 backdrop-blur-sm
        ${styles.bg} ${styles.border} ${styles.text}
        shadow-lg transition-all duration-300 hover:shadow-xl
        touch-manipulation cursor-pointer
        ${className}
      `}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-2 rounded-lg ${styles.bg} ${styles.border}`}
            >
              <Icon className={`h-5 w-5 ${styles.accent}`} />
            </motion.div>
          )}
          
          {trend && TrendIcon && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend === "up" ? "bg-green-100 text-green-700" :
                trend === "down" ? "bg-red-100 text-red-700" :
                "bg-gray-100 text-gray-700"
              }`}
            >
              <TrendIcon className="h-3 w-3" />
              {trendValue && <span>{trendValue}</span>}
            </motion.div>
          )}
        </div>
        
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm font-medium mb-2 leading-snug"
        >
          {title}
        </motion.h3>
        
        {/* Value */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold mb-3 leading-none"
        >
          {value}
        </motion.div>
        
        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xs opacity-80 leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
      
      {/* Subtle interaction indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-current opacity-20"
      />
      
      {/* Touch ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-xl opacity-0"
        whileTap={{ opacity: 0.3 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  )
}