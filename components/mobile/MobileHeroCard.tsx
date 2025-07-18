"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User } from "lucide-react"

interface MobileHeroCardProps {
  title: string
  description: string
  category: string
  date: string
  readTime?: string
  author?: string
  gradientClass?: string
  imageUrl?: string
}

export function MobileHeroCard({
  title,
  description,
  category,
  date,
  readTime = "8 min read",
  author = "Prism Team",
  gradientClass = "bg-gradient-to-br from-purple-300/30 via-blue-300/30 to-cyan-300/30",
  imageUrl
}: MobileHeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow-lg mx-4 my-6"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${gradientClass}`} />
      
      {/* Image overlay if provided */}
      {imageUrl && (
        <div className="absolute inset-0 bg-black/20" />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-4"
        >
          <Badge variant="secondary" className="bg-white/90 text-neutral-900 font-medium">
            {category}
          </Badge>
        </motion.div>
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight"
        >
          {title}
        </motion.h1>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed text-lg"
        >
          {description}
        </motion.p>
        
        {/* Meta information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
        </motion.div>
        
        {/* Touch-friendly reading progress indicator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"
        >
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-0 transition-all duration-300" />
        </motion.div>
        
        {/* Engagement hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span>Tap to interact with charts and tools</span>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle shadow for depth */}
      <div className="absolute inset-0 shadow-inner rounded-xl pointer-events-none" />
    </motion.div>
  )
}