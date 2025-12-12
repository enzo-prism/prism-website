"use client"

import Link from "next/link"
import { ArrowUpRight, Smartphone } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

interface AppProject {
  id: string
  title: string
  icon?: string
  url: string
  description: string
  category: string
  isEmoji?: boolean
}

interface AppsPortfolioGridProps {
  projects: AppProject[]
}

// Beautiful soft modern gradients - different set for apps
const gradients = [
  "from-blue-500 via-cyan-400 to-teal-400", // Tech wave
  "from-purple-500 via-violet-400 to-pink-400", // Digital dream
  "from-orange-500 via-red-400 to-rose-400", // Sunset app
  "from-green-500 via-emerald-400 to-teal-400", // Nature tech
  "from-indigo-500 via-blue-400 to-purple-400", // Deep space
  "from-pink-500 via-rose-400 to-red-400", // Warm interface
]

export default function AppsPortfolioGrid({ projects }: AppsPortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick("app-portfolio-click", project.title)}
          className="group relative overflow-hidden rounded-2xl aspect-[4/5] hover:shadow-xl transition-all duration-300"
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
          
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          
          {/* Floating icon */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {project.isEmoji ? (
              <span className="text-3xl">{project.icon}</span>
            ) : project.icon ? (
              <img src={project.icon} alt="" width={40} height={40} className="w-10 h-10 object-contain" />
            ) : (
              <Smartphone className="w-8 h-8 text-white/80" />
            )}
          </div>
          
          {/* Content overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content - Always visible with better contrast */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs uppercase tracking-wider opacity-90 mb-2">
                {project.category}
              </p>
              <h3 className="text-xl font-medium mb-2 drop-shadow-lg">
                {project.title}
              </h3>
              <p className="text-sm opacity-0 group-hover:opacity-90 transition-opacity duration-300 drop-shadow line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>

          {/* Corner icon */}
          <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          </div>
        </Link>
      ))}
    </div>
  )
} 
