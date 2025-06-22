"use client"

import Link from "next/link"
import Image from "@/components/image"
import { ArrowUpRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

interface WebsiteProject {
  id: string
  title: string
  image: string
  url: string
  category: string
  description: string
  width: number
  height: number
}

interface WebsitePortfolioGridProps {
  projects: WebsiteProject[]
}

export default function WebsitePortfolioGrid({ projects }: WebsitePortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick("portfolio-click", project.title)}
          className="group relative overflow-hidden rounded-xl aspect-[9/16] sm:aspect-[3/4] hover:shadow-lg transition-all duration-300"
        >
          {/* Actual image */}
          <Image
            src={project.image}
            alt={project.title}
            width={project.width}
            height={project.height}
            className="object-cover object-center w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            showLoadingIndicator
          />
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
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
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </Link>
      ))}
    </div>
  )
} 