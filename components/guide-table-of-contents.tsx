"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

type GuideSection = {
  id: string
  label: string
  /** Legacy decoration fields; accepted for compatibility, not rendered. */
  emoji?: string
  iconSrc?: string
  iconAlt?: string
}

interface GuideTableOfContentsProps {
  sections: GuideSection[]
}

/**
 * "On this page" navigation for long guides: scrollable pills on mobile and a
 * sticky hairline rail on desktop, with the section in view highlighted.
 */
export default function GuideTableOfContents({ sections }: GuideTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections])

  useEffect(() => {
    if (sectionIds.length === 0 || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.target.id)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25] },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  const scrollToSection = (id: string) => {
    if (typeof window === "undefined") return
    const element = document.getElementById(id)
    if (!element) return
    const offset = window.innerWidth >= 1024 ? 96 : 72
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" })
    setActiveId(id)
  }

  if (sections.length === 0) return null

  return (
    <>
      <nav aria-label="On this page" className="lg:hidden">
        <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-4 pt-2 scrollbar-hide">
          {sections.map((section) => {
            const isActive = activeId === section.id
            return (
              <li key={section.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    isActive
                      ? "border-transparent bg-foreground text-background"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground",
                  )}
                >
                  {section.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <nav aria-label="On this page" className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-eyebrow mb-4 text-subtle">On this page</p>
          <ul className="space-y-0.5 border-l border-white/[0.08]">
            {sections.map((section) => {
              const isActive = activeId === section.id
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "-ml-px block w-full border-l py-1.5 pl-4 pr-2 text-left text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-subtle hover:text-foreground",
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
