"use client"

import * as React from "react"
import { BookOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCaseStudyStickyNavHeight } from "@/hooks/use-case-study-sticky-nav"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export type CaseStudySectionNavItem = {
  id: string
  label: string
}

type CaseStudySectionNavProps = {
  sections: CaseStudySectionNavItem[]
  className?: string
  containerClassName?: string
  ariaLabel?: string
}

function escapeSelector(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value)
  }

  return value.replace(/["\\]/g, "\\$&")
}

function findSectionTarget(id: string): HTMLElement | null {
  const safe = escapeSelector(id)

  const candidates = [
    `[data-section="${safe}"]`,
    `[data-case-study-section][id="${safe}"]`,
    `#${safe}`,
  ]

  for (const selector of candidates) {
    const el = document.querySelector(selector)
    if (el instanceof HTMLElement) return el
  }

  return null
}

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getHeaderOffset() {
  const root = document.documentElement
  const styles = getComputedStyle(root)
  const header = Number.parseFloat(styles.getPropertyValue("--prism-header-height")) || 0
  return header
}

export function CaseStudySectionNav({
  sections,
  className,
  containerClassName,
  ariaLabel = "case study sections",
}: CaseStudySectionNavProps) {
  const navRef = React.useRef<HTMLDivElement>(null)
  useCaseStudyStickyNavHeight(navRef)

  const [activeSection, setActiveSection] = React.useState<string>(sections[0]?.id ?? "")
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [intersectionOffset, setIntersectionOffset] = React.useState(120)

  React.useLayoutEffect(() => {
    const updateOffset = () => {
      const header = getHeaderOffset()
      const navHeight = navRef.current?.getBoundingClientRect().height ?? 0
      setIntersectionOffset(header + navHeight + 24)
    }

    updateOffset()

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateOffset) : null
    if (navRef.current && resizeObserver) resizeObserver.observe(navRef.current)
    window.addEventListener("resize", updateOffset)

    return () => {
      window.removeEventListener("resize", updateOffset)
      resizeObserver?.disconnect()
    }
  }, [])

  React.useEffect(() => {
    if (!sections.length) return

    const elements = sections
      .map((section) => ({ id: section.id, el: findSectionTarget(section.id) }))
      .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el))

    if (!elements.length) return

    const elementToId = new Map<Element, string>(elements.map((item) => [item.el, item.id]))

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting)
        if (!intersecting.length) return

        intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const next = elementToId.get(intersecting[0].target)
        if (next) setActiveSection(next)
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${intersectionOffset}px 0px -70% 0px`,
      }
    )

    elements.forEach((item) => observer.observe(item.el))

    return () => observer.disconnect()
  }, [sections, intersectionOffset])

  const scrollTo = React.useCallback((id: string) => {
    const el = findSectionTarget(id)
    if (!el) return

    setActiveSection(id)
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" })
  }, [])

  if (!sections.length) return null

  return (
    <div
      ref={navRef}
      className={cn(
        "sticky top-[var(--prism-header-height)] z-40 border-b bg-background/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className
      )}
    >
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        <div className="flex items-center gap-2 py-3">
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <BookOpen className="h-4 w-4" />
                  contents
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl">
                <SheetHeader className="text-left">
                  <SheetTitle className="lowercase">jump to</SheetTitle>
                </SheetHeader>
                <div className="mt-4 grid gap-2">
                  {sections.map((section) => {
                    const isActive = section.id === activeSection
                    return (
                      <Button
                        key={section.id}
                        type="button"
                        variant={isActive ? "default" : "outline"}
                        className={cn("justify-start rounded-xl lowercase", !isActive && "bg-background")}
                        onClick={() => {
                          scrollTo(section.id)
                          setIsSheetOpen(false)
                        }}
                      >
                        {section.label}
                      </Button>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <ScrollArea className="w-full">
            <div className="w-max py-0.5">
              <ToggleGroup
                type="single"
                value={activeSection}
                onValueChange={(next) => {
                  if (!next) return
                  scrollTo(next)
                }}
                variant="outline"
                size="sm"
                wrap={false}
                className="justify-start"
                aria-label={ariaLabel}
              >
                {sections.map((section) => (
                  <ToggleGroupItem
                    key={section.id}
                    value={section.id}
                    className="rounded-full border-neutral-200 bg-background px-4 lowercase data-[state=on]:border-neutral-900 data-[state=on]:bg-neutral-900 data-[state=on]:text-white"
                  >
                    {section.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

