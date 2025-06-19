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
          className="group relative overflow-hidden bg-neutral-50 rounded-xl aspect-[9/16] sm:aspect-[3/4] hover:shadow-lg transition-all duration-300"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            trackingId={`portfolio-${project.id}`}
          />
          
          {/* Minimal overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
              {project.category}
            </p>
            <h3 className="text-lg font-medium mb-1">
              {project.title}
            </h3>
            <p className="text-sm opacity-90">
              {project.description}
            </p>
          </div>

          {/* Subtle icon */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </Link>
      ))}
    </div>
  )
} 