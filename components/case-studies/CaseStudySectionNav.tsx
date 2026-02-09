"use client"

import * as React from "react"
import { BookOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCaseStudyStickyNavHeight } from "@/hooks/use-case-study-sticky-nav"
import { Button } from "@/components/ui/button"
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
  const listRef = React.useRef<HTMLDivElement>(null)
  useCaseStudyStickyNavHeight(navRef)

  const [activeSection, setActiveSection] = React.useState<string>(sections[0]?.id ?? "")
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [intersectionOffset, setIntersectionOffset] = React.useState(120)
  const activeLabel = React.useMemo(() => {
    return sections.find((section) => section.id === activeSection)?.label ?? sections[0]?.label ?? ""
  }, [activeSection, sections])

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

  React.useEffect(() => {
    if (!listRef.current || !activeSection) return
    const safe = escapeSelector(activeSection)
    const activeItem = listRef.current.querySelector<HTMLElement>(`[data-section-id="${safe}"]`)
    if (!activeItem) return

    activeItem.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [activeSection])

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
        "sticky top-[var(--prism-header-height)] z-40 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        <div className="flex flex-col gap-2 py-3 lg:flex-row lg:items-center">
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between rounded-md px-4"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    jump to
                  </span>
                  <span className="max-w-[55%] truncate font-medium text-foreground">
                    {activeLabel}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-md">
                <SheetHeader className="text-left">
                  <SheetTitle>jump to</SheetTitle>
                </SheetHeader>
                <div className="mt-4 grid gap-2">
                  {sections.map((section) => {
                    const isActive = section.id === activeSection
                    return (
                      <Button
                        key={section.id}
                        type="button"
                        variant={isActive ? "default" : "outline"}
                        className={cn("justify-start rounded-md", !isActive && "bg-transparent")}
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

          <div
            ref={listRef}
            className="-mx-4 overflow-x-auto px-4 scrollbar-hide scroll-smooth motion-reduce:scroll-auto lg:mx-0 lg:px-0"
          >
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
              className="w-max justify-start gap-2"
              aria-label={ariaLabel}
            >
              {sections.map((section) => (
                <ToggleGroupItem
                  key={section.id}
                  value={section.id}
                  data-section-id={section.id}
                  className="rounded-md border-border/60 bg-muted/30 px-3 text-muted-foreground hover:bg-muted/45 hover:text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground sm:px-4"
                >
                  {section.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  )
}
