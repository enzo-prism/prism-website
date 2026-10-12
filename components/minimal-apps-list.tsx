'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { trackCTAClick } from '@/utils/analytics'

interface AppProject {
  id: string
  title: string
  url?: string
  category: string
  description: string
  status?: string
}

interface MinimalAppsListProps {
  projects: AppProject[]
}

export default function MinimalAppsList({ projects }: MinimalAppsListProps) {
  return (
    <ul className="border-t border-white/[0.08]">
      {projects.map((project, index) => {
        const card = (
          <div
            id={`app-project-${project.id}`}
            className="flex items-start justify-between gap-4 px-1 py-6 transition-colors duration-200 sm:px-3 sm:py-7"
          >
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="font-mono text-[11px] tabular-nums text-subtle">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                  {project.category}
                </span>
              </div>
              <h3 className="truncate text-[1.25rem] font-medium tracking-[-0.025em] text-foreground sm:text-[1.4rem]">
                {project.title}
              </h3>
              <p className="mt-1.5 text-pretty text-[0.95rem] leading-6 text-muted-foreground">
                {project.description}
              </p>
            </div>
            {project.url ? (
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-colors duration-200 group-hover:border-white/25 group-hover:text-foreground">
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            ) : (
              <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                {project.status ?? 'private'}
              </span>
            )}
          </div>
        )

        return (
          <li key={project.id} className="border-b border-white/[0.08]">
            {project.url ? (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick('app-portfolio-click', project.title)}
                className="group block rounded-xl transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {card}
              </Link>
            ) : (
              <div aria-label={`${project.title}: ${project.status ?? 'private'}`}>
                {card}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
