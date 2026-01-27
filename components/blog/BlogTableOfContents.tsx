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
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
              on this page
            </p>
            <span className="text-xs text-neutral-400">{items.length} sections</span>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleAnchorClick(event, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                    isActive
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900",
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
        <div className="sticky top-28 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">on this page</p>
            <p className="mt-1 text-sm text-neutral-500">Jump to the section you need.</p>
          </div>
          <ul className="mt-4 space-y-1.5">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleAnchorClick(event, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-neutral-900 text-white shadow-sm"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                      item.level === 3 && "pl-6 text-neutral-500",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold transition",
                        isActive
                          ? "border-white/40 bg-white/10 text-white"
                          : "border-neutral-300 bg-white text-neutral-500",
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
