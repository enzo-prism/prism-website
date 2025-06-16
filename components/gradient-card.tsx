"use client"

import { Brain, Palette } from "lucide-react"

interface GradientCardProps {
  gradientType: "ai-seo" | "website-makeover"
  width?: number
  height?: number
  className?: string
  trackingId?: string
}

const gradientConfigs = {
  "ai-seo": {
    gradient: "bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100",
    icon: Brain,
    iconColor: "text-indigo-600",
    title: "AI SEO Boost",
  },
  "website-makeover": {
    gradient: "bg-gradient-to-br from-orange-100 via-amber-50 to-pink-100",
    icon: Palette,
    iconColor: "text-orange-600",
    title: "Website Makeover",
  },
}

export default function GradientCard({
  gradientType,
  width = 600,
  height = 338,
  className = "",
  trackingId,
}: GradientCardProps) {
  const config = gradientConfigs[gradientType]
  const IconComponent = config.icon

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${config.gradient} ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        aspectRatio: "16/9",
      }}
      data-tracking-id={trackingId}
      role="img"
      aria-label={`${config.title} gradient background`}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12" />
      </div>
      
      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <IconComponent 
            size={80} 
            className={`${config.iconColor} opacity-20 drop-shadow-sm`}
            strokeWidth={1.5}
          />
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5" />
    </div>
  )
}