"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

interface WebsiteProject {
  id: string
  title: string
  url: string
  category: string
  description: string
}

interface MinimalWebsiteListProps {
  projects: WebsiteProject[]
}

export default function MinimalWebsiteList({ projects }: MinimalWebsiteListProps) {
  return (
    <div className="space-y-1">
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick("portfolio-click", project.title)}
          className="group block"
        >
          <div className="py-8 px-4 sm:px-6 border-t border-neutral-100 hover:bg-neutral-50 transition-colors duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-neutral-400 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-neutral-500">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-light text-neutral-900 mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-600 font-light">
                  {project.description}
                </p>
              </div>
              <div className="shrink-0 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-colors duration-200">
                <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors duration-200" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 