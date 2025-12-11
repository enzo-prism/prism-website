"use client"

import { BadgeDollarSign, BookOpen, FolderOpen, Heart, Home, Menu, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"

import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { LOGO_CONFIG, NAV_ITEMS, type NavItem } from "@/lib/constants"
import { trackNavigation } from "@/utils/analytics"
import CoreImage from "./core-image"

const aliasMap: Record<string, string> = {
  "/design": "/designs",
  "/growth": "/prism-flywheel",
}

const topIconMap: Record<string, LucideIcon> = {
  home: Home,
  "our story": BookOpen,
  "case studies": FolderOpen,
  "wall of love": Heart,
  pricing: BadgeDollarSign,
}

const getTopIcon = (label?: string) => {
  if (!label) return null
  const Icon = topIconMap[label.toLowerCase()]
  if (!Icon) return null
  return <Icon className="h-4 w-4 text-neutral-400" aria-hidden />
}

const getNavIcon = getTopIcon

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navItems = NAV_ITEMS

  const caseStudyBreadcrumbs = useMemo(() => {
    if (!pathname?.startsWith("/case-studies")) return null
    const baseTrail = [
      { name: "home", url: "/" },
      { name: "case studies", url: "/case-studies" },
    ]

    const parts = pathname.split("/").filter(Boolean)
    if (parts.length <= 1) return baseTrail

    const slug = parts[1]
    const match = CASE_STUDIES.find((study) => study.slug === slug)
    const label = match?.client ?? slug.replace(/-/g, " ")
    return [...baseTrail, { name: label, url: pathname }]
  }, [pathname])

  const normalizeHref = (href: string) => aliasMap[href] ?? href
  const isActivePath = (href?: string) => (href ? pathname === normalizeHref(href) : false)
  const isParentActive = (item: NavItem) => {
    if (item.href && isActivePath(item.href)) return true
    if (item.children?.length) {
      return item.children.some((child) => isActivePath(child.href))
    }
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center rounded-lg transition-transform duration-150 hover:scale-[1.04]"
          onClick={() => trackNavigation("logo", "/")}
          aria-label="Prism home"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
            <CoreImage
              src={LOGO_CONFIG.src}
              alt={LOGO_CONFIG.alt}
              width={36}
              height={36}
              className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
              priority
              fallbackSrc={LOGO_CONFIG.fallbackSrc}
              trackingId="navbar_logo"
              quality={90}
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium lowercase transition-colors hover:text-primary ${
                    isActivePath(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => trackNavigation(item.label, item.href!)}
                >
                  {getTopIcon(item.label)}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  className={`flex items-center gap-1 text-sm font-medium lowercase transition-colors hover:text-primary ${
                    isParentActive(item) ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded="false"
                >
                  <span>{item.label}</span>
                </button>
              )}
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 rounded-xl border bg-white p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={`group/nav-item flex items-center gap-2 rounded-md px-3 py-2 text-sm lowercase transition-colors hover:bg-neutral-50 ${
                        isActivePath(child.href) ? "text-neutral-900" : "text-neutral-700 hover:text-neutral-900"
                      }`}
                      onClick={() => trackNavigation(child.label, child.href)}
                    >
                      {getNavIcon(child.label)}
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="md:hidden border-t bg-background shadow-sm">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-base lowercase transition-colors hover:bg-muted ${
                      isActivePath(item.href) ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => {
                      setIsMenuOpen(false)
                      trackNavigation(item.label, item.href!)
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {getTopIcon(item.label)}
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <div
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-base lowercase ${
                      isParentActive(item) ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                  </div>
                )}
                {item.children && (
                  <div className="mt-2 space-y-1 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-base lowercase transition-colors hover:bg-muted ${
                          isActivePath(child.href)
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false)
                          trackNavigation(child.label, child.href)
                        }}
                      >
                        {getNavIcon(child.label)}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      ) : null}
      {caseStudyBreadcrumbs ? (
        <div className="border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <Breadcrumbs items={caseStudyBreadcrumbs} className="py-2 mb-0" />
          </div>
        </div>
      ) : null}
    </header>
  )
}
