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
  gradientClass,
  imageUrl
}: MobileHeroCardProps) {
  return (
    <div className="minimal-card">
      {/* Category */}
      <div className="mb-3">
        <span className="text-xs text-neutral-500 uppercase tracking-wide">{category}</span>
      </div>
      
      {/* Title */}
      <h1 className="text-xl font-bold text-neutral-900 mb-3 leading-tight">
        {title}
      </h1>
      
      {/* Description */}
      <p className="text-neutral-600 mb-4 leading-relaxed">
        {description}
      </p>
      
      {/* Meta information */}
      <div className="flex items-center gap-4 text-neutral-500 text-sm">
        <span>{new Date(date).toLocaleDateString()}</span>
        <span>•</span>
        <span>{readTime}</span>
        <span>•</span>
        <span>{author}</span>
      </div>
    </div>
  )
}