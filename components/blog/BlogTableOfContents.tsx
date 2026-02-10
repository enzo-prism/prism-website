"use client"

import { type MouseEvent, useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export type BlogTocItem = {
  id: string
  label: string
  level: 2 | 3
}

interface BlogTableOfContentsProps {
  items: BlogTocItem[]
  className?: string
}

export default function BlogTableOfContents({ items, className }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "")
  const ids = useMemo(() => items.map((item) => item.id), [items])

  useEffect(() => {
    if (!ids.length || typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.5] },
    )

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [ids])

  const scrollTo = (id: string) => {
    if (typeof window === "undefined") return
    const element = document.getElementById(id)
    if (!element) return
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
    if (window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`)
    }
  }

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    scrollTo(id)
  }

  if (!items.length) return null

  return (
    <div className={cn("space-y-6", className)}>
      <div className="lg:hidden">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4 shadow-sm shadow-black/40 backdrop-blur supports-[backdrop-filter]:bg-card/30">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
              on this page
            </p>
            <span className="text-xs text-muted-foreground/80">{items.length} sections</span>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleAnchorClick(event, item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "shrink-0 inline-flex min-h-[48px] items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-border/60 bg-foreground text-background shadow-sm"
                      : "border-border/60 bg-background/40 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <nav className="hidden lg:block" aria-label="Table of contents">
        <div className="sticky top-28 rounded-3xl border border-border/60 bg-card/40 p-5 shadow-sm shadow-black/40 backdrop-blur supports-[backdrop-filter]:bg-card/30">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">on this page</p>
            <p className="mt-1 text-sm text-muted-foreground">jump to the section you need.</p>
          </div>
          <ul className="mt-4 space-y-1.5">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleAnchorClick(event, item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                      item.level === 3 && "pl-6 text-muted-foreground/80",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold transition",
                        isActive
                          ? "border-background/40 bg-background/10 text-background"
                          : "border-border/60 bg-background/60 text-muted-foreground",
                      )}
                      aria-hidden
                    >
                      {item.level === 3 ? "–" : "•"}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )
}
