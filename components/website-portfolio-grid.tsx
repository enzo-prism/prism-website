"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

interface WebsiteProject {
  id: string
  title: string
  image: string
  url: string
  category: string
  description: string
}

interface WebsitePortfolioGridProps {
  projects: WebsiteProject[]
}

// Beautiful soft modern gradients
const gradients = [
  "from-violet-400 via-purple-400 to-indigo-400", // Purple dream
  "from-cyan-400 via-sky-400 to-blue-400", // Ocean breeze
  "from-rose-400 via-pink-400 to-fuchsia-400", // Sunset blush
  "from-amber-400 via-orange-400 to-yellow-400", // Golden hour
  "from-emerald-400 via-teal-400 to-cyan-400", // Tropical lagoon
  "from-blue-400 via-indigo-400 to-purple-400", // Mystic night
]

export default function WebsitePortfolioGrid({ projects }: WebsitePortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick("portfolio-click", project.title)}
          className="group relative overflow-hidden rounded-xl aspect-[9/16] sm:aspect-[3/4] hover:shadow-lg transition-all duration-300"
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-80`} />
          
          {/* Subtle pattern overlay for depth */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, transparent 50%, rgba(255, 255, 255, 0.1) 51%)`,
            backgroundSize: '100px 100px'
          }} />
          
          {/* Content overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content - Always visible with better contrast */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs uppercase tracking-wider opacity-90 mb-1">
                {project.category}
              </p>
              <h3 className="text-lg font-medium mb-1 drop-shadow-lg">
                {project.title}
              </h3>
              <p className="text-sm opacity-0 group-hover:opacity-90 transition-opacity duration-300 drop-shadow">
                {project.description}
              </p>
            </div>
          </div>

          {/* Subtle icon */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </Link>
      ))}
    </div>
  )
} 