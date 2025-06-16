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
      className={`relative overflow-hidden rounded-lg ${config.gradient} w-full h-full ${className}`}
      style={{
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
      
      {/* Icon with safe area and responsive sizing */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="relative flex items-center justify-center max-w-[60%] max-h-[60%]">
          <IconComponent 
            className={`${config.iconColor} opacity-20 drop-shadow-sm w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20`}
            strokeWidth={1.5}
          />
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5" />
    </div>
  )
}