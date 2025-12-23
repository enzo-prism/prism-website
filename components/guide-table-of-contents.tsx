"use client"

import { useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import { Button } from "@/components/ui/button"

type GuideSection = {
  id: string
  label: string
  emoji?: string
}

interface GuideTableOfContentsProps {
  sections: GuideSection[]
}

export default function GuideTableOfContents({ sections }: GuideTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections])

  useEffect(() => {
    if (sectionIds.length === 0 || typeof window === "undefined") return

    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id)
            }
          })
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0.25, 0.6] },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds])

  const scrollToSection = (id: string) => {
    if (typeof window === "undefined") return
    const element = document.getElementById(id)
    if (!element) return
    const offset = window.innerWidth >= 1024 ? 96 : 72
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  if (sections.length === 0) return null

  return (
    <>
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-2 pb-4 pt-2">
          {sections.map((section) => (
            <Button
              type="button"
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              variant="ghost"
              className={clsx(
                "w-full rounded-full border px-4 py-2 text-sm font-medium transition sm:w-auto",
                activeId === section.id
                  ? "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-900"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400 hover:bg-white hover:text-neutral-900",
              )}
            >
              {section.emoji && (
                <span className="mr-2" aria-hidden>
                  {section.emoji}
                </span>
              )}
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      <nav className="hidden lg:block">
        <div className="sticky top-28 space-y-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">On this page</p>
            <p className="mt-1 text-sm text-neutral-500">Jump to the section you need.</p>
          </div>
          <ul className="space-y-1.5">
            {sections.map((section) => {
              const isActive = activeId === section.id
              return (
                <li key={section.id}>
                  <Button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    variant="ghost"
                    className={clsx(
                      "flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-neutral-900 text-white shadow-sm hover:bg-neutral-900"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold transition",
                        isActive
                          ? "border-white/40 bg-white/10 text-white"
                          : "border-neutral-300 bg-white text-neutral-500",
                      )}
                      aria-hidden
                    >
                      {section.emoji ?? "•"}
                    </span>
                    <span>{section.label}</span>
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
