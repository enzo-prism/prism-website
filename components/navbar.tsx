"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

import PixelishIcon from "@/components/pixelish/PixelishIcon"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { LOGO_CONFIG, NAV_ITEMS, type NavItem } from "@/lib/constants"
import { trackNavigation } from "@/utils/analytics"
import CoreImage from "./core-image"

const aliasMap: Record<string, string> = {
  "/design": "/designs",
  "/growth": "/prism-flywheel",
}

const topIconMap: Record<string, { src: string; motionClass: string }> = {
  home: { src: "/pixelish/house.svg", motionClass: "nav-icon-home" },
  "our story": { src: "/pixelish/user.svg", motionClass: "nav-icon-story" },
  software: { src: "/pixelish/device-monitor.svg", motionClass: "nav-icon-software" },
  blog: { src: "/pixelish/document-letter.svg", motionClass: "nav-icon-blog" },
  "case studies": { src: "/pixelish/folder.svg", motionClass: "nav-icon-case-studies" },
  "wall of love": { src: "/pixelish/emoji-heart.svg", motionClass: "nav-icon-love" },
  start: { src: "/pixelish/emoji-rocket.svg", motionClass: "nav-icon-start" },
}

const getTopIcon = (label?: string) => {
  if (!label) return null
  const iconConfig = topIconMap[label.toLowerCase()]
  if (!iconConfig) return null
  return (
    <PixelishIcon
      src={iconConfig.src}
      alt=""
      size={20}
      className={`nav-icon ${iconConfig.motionClass} h-5 w-5 opacity-75`}
      aria-hidden
    />
  )
}

const getNavIcon = getTopIcon

type NavbarProps = {
  mobileRevealOnFirstTap?: boolean
}

export default function Navbar({ mobileRevealOnFirstTap = false }: NavbarProps) {
  const pathname = usePathname()
  const navItems = NAV_ITEMS
  const headerRef = useRef<HTMLElement | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(!mobileRevealOnFirstTap)

  const caseStudyBreadcrumbs = useMemo(() => {
    if (!pathname?.startsWith("/case-studies")) return null
    const baseTrail = [
      { name: "home", url: "/" },
      { name: "case studies", url: "/case-studies" },
    ]

    const parts = pathname.split("/").filter(Boolean)
    // Only show the in-navbar breadcrumb bar for case study detail pages.
    // The `/case-studies` index page already renders its own breadcrumbs in-page.
    if (parts.length <= 1) return null

    const slug = parts[1]
    const match = CASE_STUDIES.find((study) => study.slug === slug)
    const label = match?.client ?? slug.replace(/-/g, " ")
    return [...baseTrail, { name: label, url: pathname }]
  }, [pathname])

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty("--prism-header-height", `${header.getBoundingClientRect().height}px`)
    }

    updateHeaderHeight()

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateHeaderHeight) : null
    resizeObserver?.observe(header)
    window.addEventListener("resize", updateHeaderHeight)

    return () => {
      window.removeEventListener("resize", updateHeaderHeight)
      resizeObserver?.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!mobileRevealOnFirstTap || hasInteracted) return

    const handleFirstInteraction = () => {
      setHasInteracted(true)
    }

    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true, once: true })

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction)
    }
  }, [hasInteracted, mobileRevealOnFirstTap])

  const normalizeHref = (href: string) => aliasMap[href] ?? href
  const isActivePath = (href?: string) => (href ? pathname === normalizeHref(href) : false)
  const isParentActive = (item: NavItem) => {
    if (item.href && isActivePath(item.href)) return true
    if (item.children?.length) {
      return item.children.some((child) => isActivePath(child.href))
    }
    return false
  }

  const shouldReveal = !mobileRevealOnFirstTap || hasInteracted
  const revealClasses = mobileRevealOnFirstTap
    ? shouldReveal
      ? "opacity-100 translate-y-0"
      : "pointer-events-none opacity-0 -translate-y-2 md:pointer-events-auto md:opacity-100 md:translate-y-0"
    : ""
  const transitionClasses = mobileRevealOnFirstTap
    ? "transition-[opacity,transform,background-color,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none"
    : "transition-colors"

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full backdrop-blur nav-blur ${transitionClasses} ${revealClasses} ${
        isScrolled
          ? "bg-background/95 shadow-sm supports-[backdrop-filter]:bg-background/90"
          : "bg-background/80 supports-[backdrop-filter]:bg-background/60"
      } ${
        caseStudyBreadcrumbs ? "" : "border-b"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
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

        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-6">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.href ? (
                  <NavigationMenuLink
                    asChild
                    className={`group nav-link flex items-center gap-2 p-0 text-xs font-semibold uppercase font-pixel tracking-[0.22em] transition-colors hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary ${
                      isActivePath(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                    active={isActivePath(item.href)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => trackNavigation(item.label, item.href!)}
                    >
                      {getTopIcon(item.label)}
                      <span>{item.label}</span>
                    </Link>
                  </NavigationMenuLink>
                ) : (
                  <>
                    <NavigationMenuTrigger
                      className={`h-auto bg-transparent px-0 py-0 text-xs font-semibold uppercase font-pixel tracking-[0.22em] transition-colors hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary ${
                        isParentActive(item) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    {item.children && (
                      <NavigationMenuContent className="rounded-md border border-border/60 bg-popover p-2 text-popover-foreground shadow-lg shadow-black/40">
                        <div className="flex w-52 flex-col gap-1">
                          {item.children.map((child) => (
                            <NavigationMenuLink
                              key={child.label}
                              asChild
                              className={`group nav-link flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold uppercase font-pixel tracking-[0.18em] transition-colors ${
                                isActivePath(child.href)
                                  ? "bg-muted text-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              active={isActivePath(child.href)}
                            >
                              <Link
                                href={child.href}
                                onClick={() => trackNavigation(child.label, child.href)}
                              >
                                {getNavIcon(child.label)}
                                {child.label}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    )}
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="top-16 border-t border-b-0 p-0 shadow-sm">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="container mx-auto flex flex-col gap-2 px-4 py-4 sm:px-6">
                {navItems.map((item) => (
                  <div key={item.label} className="flex flex-col">
                    {item.href ? (
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={`group nav-link flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold uppercase font-pixel tracking-[0.16em] transition-colors hover:bg-muted ${
                            isActivePath(item.href)
                              ? "bg-muted font-semibold text-foreground"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => trackNavigation(item.label, item.href!)}
                        >
                          <span className="flex items-center gap-2">
                            {getTopIcon(item.label)}
                            {item.label}
                          </span>
                        </Link>
                      </SheetClose>
                    ) : (
                      <div
                        className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold uppercase font-pixel tracking-[0.16em] ${
                          isParentActive(item) ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <span>{item.label}</span>
                      </div>
                    )}
                    {item.children && (
                      <div className="mt-2 space-y-1 pl-4">
                        {item.children.map((child) => (
                          <SheetClose asChild key={child.label}>
                            <Link
                              href={child.href}
                              className={`group nav-link flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold uppercase font-pixel tracking-[0.16em] transition-colors hover:bg-muted ${
                                isActivePath(child.href)
                                  ? "bg-muted font-medium text-foreground"
                                  : "text-muted-foreground"
                              }`}
                              onClick={() => trackNavigation(child.label, child.href)}
                            >
                              {getNavIcon(child.label)}
                              {child.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {caseStudyBreadcrumbs ? (
        <div className="border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs items={caseStudyBreadcrumbs} className="py-2 mb-0" />
          </div>
        </div>
      ) : null}
    </header>
  )
}
