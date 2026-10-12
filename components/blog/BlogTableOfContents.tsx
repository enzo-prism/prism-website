"use client"

import { type MouseEvent, useEffect, useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type BlogTocItem = {
  id: string
  label: string
  level: 2 | 3
}

interface BlogTableOfContentsProps {
  items: BlogTocItem[]
  /** "rail" is the sticky desktop list; "disclosure" is the inline mobile toggle. */
  variant?: "rail" | "disclosure"
  className?: string
}

function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "")

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.target.id)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] },
    )

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [ids])

  return activeId
}

function scrollToHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const element = document.getElementById(id)
  if (!element) return
  event.preventDefault()
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
  window.history?.replaceState?.(null, "", `#${id}`)
}

/** "On this page" navigation for long posts, fed by lib/mdx-toc. */
export default function BlogTableOfContents({
  items,
  variant = "rail",
  className,
}: BlogTableOfContentsProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const activeId = useActiveHeading(ids)

  if (!items.length) return null

  const list = (
    <ul className="space-y-0.5 border-l border-white/[0.08]">
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => scrollToHeading(event, item.id)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 pr-2 text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                item.level === 3 ? "pl-7" : "pl-4",
                isActive
                  ? "border-foreground text-foreground"
                  : "border-transparent text-subtle hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )

  if (variant === "disclosure") {
    return (
      <details
        className={cn(
          "group/toc rounded-2xl border border-white/[0.08] bg-card [&_summary::-webkit-details-marker]:hidden",
          className,
        )}
      >
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
          <span className="flex items-center gap-3">
            On this page
            <span className="font-mono text-[11px] text-subtle">{items.length} sections</span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 text-subtle transition-transform duration-200 group-open/toc:rotate-180"
          />
        </summary>
        <nav aria-label="Table of contents" className="px-5 pb-5">
          {list}
        </nav>
      </details>
    )
  }

  return (
    <nav aria-label="Table of contents" className={className}>
      <p className="text-eyebrow mb-4 text-subtle">On this page</p>
      {list}
    </nav>
  )
}
