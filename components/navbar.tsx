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
  "/growth": "/pricing",
}

type TopNavIconConfig = {
  src: string
  motionClass: string
  activeColor: string
}

const topIconMap: Record<string, TopNavIconConfig> = {
  home: {
    src: "/pixelish/house.svg",
    motionClass: "nav-icon-home",
    activeColor: "#ffafed",
  },
  "our story": {
    src: "/pixelish/user.svg",
    motionClass: "nav-icon-story",
    activeColor: "#9effd1",
  },
  software: {
    src: "/pixelish/device-monitor.svg",
    motionClass: "nav-icon-software",
    activeColor: "#9cd6ff",
  },
  blog: {
    src: "/pixelish/document-letter.svg",
    motionClass: "nav-icon-blog",
    activeColor: "#ffdf8e",
  },
  "case studies": {
    src: "/pixelish/folder.svg",
    motionClass: "nav-icon-case-studies",
    activeColor: "#c9a2ff",
  },
  "wall of love": {
    src: "/pixelish/emoji-heart.svg",
    motionClass: "nav-icon-love",
    activeColor: "#ffb4c8",
  },
  start: {
    src: "/pixelish/emoji-rocket.svg",
    motionClass: "nav-icon-start",
    activeColor: "#9eff9a",
  },
}

const buildActivePixelishIcon = (src: string, color: string) => {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 w-5 shrink-0"
      style={{
        backgroundColor: color,
        maskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  )
}

const getTopIcon = (label?: string, isActive = false) => {
  if (!label) return null
  const iconConfig = topIconMap[label.toLowerCase()]
  if (!iconConfig) return null

  if (isActive) {
    return buildActivePixelishIcon(iconConfig.src, iconConfig.activeColor)
  }

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

const getNavIcon = (label?: string, isActive = false) => getTopIcon(label, isActive)

type NavbarProps = {
  mobileRevealOnFirstTap?: boolean
}

export default function Navbar({ mobileRevealOnFirstTap = false }: NavbarProps) {
  const pathname = usePathname()
  const navItems = NAV_ITEMS
  const headerRef = useRef<HTMLElement | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(!mobileRevealOnFirstTap)
  const [isHomepageHeroActive, setIsHomepageHeroActive] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
  }, [hasInteracted, pathname])

  useEffect(() => {
    let rafId: number | null = null

    const updateNavbarState = () => {
      rafId = null
      setIsScrolled(window.scrollY > 8)

      if (pathname !== "/") {
        setIsHomepageHeroActive(false)
        return
      }

      const hero = document.getElementById("homepage-hero")
      const header = headerRef.current

      if (!hero || !header) {
        setIsHomepageHeroActive(false)
        return
      }

      const heroRect = hero.getBoundingClientRect()
      const headerHeight = header.getBoundingClientRect().height
      const heroBottomThreshold = headerHeight + 56
      const isHeroInFocus = heroRect.top <= headerHeight && heroRect.bottom > heroBottomThreshold

      setIsHomepageHeroActive(isHeroInFocus)
    }

    const queueUpdate = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(updateNavbarState)
    }

    updateNavbarState()
    window.addEventListener("scroll", queueUpdate, { passive: true })
    window.addEventListener("resize", queueUpdate)

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener("scroll", queueUpdate)
      window.removeEventListener("resize", queueUpdate)
    }
  }, [hasInteracted, pathname])

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
  const shouldUseHomepageHeroChrome = pathname === "/" && isHomepageHeroActive
  const headerBackdropClasses = shouldUseHomepageHeroChrome ? "" : "backdrop-blur nav-blur"
  const revealClasses = mobileRevealOnFirstTap
    ? shouldReveal
      ? "opacity-100 translate-y-0"
      : "pointer-events-none opacity-0 -translate-y-2 md:pointer-events-auto md:opacity-100 md:translate-y-0"
    : ""
  const transitionClasses = mobileRevealOnFirstTap
    ? "transition-[opacity,transform,background-color,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none"
    : "transition-colors"
  const headerSurfaceClasses = shouldUseHomepageHeroChrome
    ? "border-b border-transparent !bg-white text-[rgb(12,18,30)] shadow-none backdrop-blur-none supports-[backdrop-filter]:!bg-white"
    : isScrolled
      ? "bg-background/95 shadow-sm supports-[backdrop-filter]:bg-background/90"
      : "bg-background/80 supports-[backdrop-filter]:bg-background/60"
  const desktopLinkBaseClasses = shouldUseHomepageHeroChrome
    ? "text-[rgba(15,23,42,0.62)] hover:text-[rgb(12,18,30)] focus:text-[rgb(12,18,30)]"
    : "text-muted-foreground"
  const desktopChildLinkBaseClasses = shouldUseHomepageHeroChrome
    ? "text-[rgba(15,23,42,0.62)] hover:bg-black/[0.04] hover:text-[rgb(12,18,30)]"
    : "text-muted-foreground hover:bg-muted hover:text-foreground"
  const mobileMenuTriggerClasses = shouldUseHomepageHeroChrome
    ? "!bg-transparent !text-[rgb(12,18,30)] shadow-none hover:!bg-black/[0.04] hover:!text-[rgb(12,18,30)] focus-visible:!bg-black/[0.04] focus-visible:!text-[rgb(12,18,30)] active:!bg-black/[0.04] active:!text-[rgb(12,18,30)] data-[state=open]:!bg-transparent data-[state=open]:!text-[rgb(12,18,30)]"
    : undefined
  const mobileSheetClasses = shouldUseHomepageHeroChrome
    ? "top-16 border-t border-black/5 border-b-0 !bg-white p-0 shadow-none"
    : "top-16 border-t border-b-0 p-0 shadow-sm"

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full ${headerBackdropClasses} ${transitionClasses} ${revealClasses} ${headerSurfaceClasses} ${
        !shouldUseHomepageHeroChrome && !caseStudyBreadcrumbs ? "border-b" : ""
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
                    className={`group nav-link flex items-center gap-2 p-0 text-xs font-semibold uppercase font-pixel tracking-[0.22em] transition-colors hover:bg-transparent ${
                      shouldUseHomepageHeroChrome
                        ? "hover:text-[rgb(12,18,30)] focus:bg-transparent focus:text-[rgb(12,18,30)]"
                        : "hover:text-primary focus:bg-transparent focus:text-primary"
                    } ${
                      isActivePath(item.href) ? "text-primary" : desktopLinkBaseClasses
                    }`}
                    active={isActivePath(item.href)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => trackNavigation(item.label, item.href!)}
                    >
                      {getTopIcon(item.label, isActivePath(item.href))}
                      <span>{item.label}</span>
                    </Link>
                  </NavigationMenuLink>
                ) : (
                  <>
                    <NavigationMenuTrigger
                      className={`h-auto bg-transparent px-0 py-0 text-xs font-semibold uppercase font-pixel tracking-[0.22em] transition-colors hover:bg-transparent data-[state=open]:bg-transparent ${
                        shouldUseHomepageHeroChrome
                          ? "hover:text-[rgb(12,18,30)] focus:bg-transparent focus:text-[rgb(12,18,30)] data-[state=open]:text-[rgb(12,18,30)]"
                          : "hover:text-primary focus:bg-transparent focus:text-primary data-[state=open]:text-primary"
                      } ${
                        isParentActive(item) ? "text-primary" : desktopLinkBaseClasses
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
                                  : desktopChildLinkBaseClasses
                              }`}
                              active={isActivePath(child.href)}
                            >
                              <Link
                                href={child.href}
                                onClick={() => trackNavigation(child.label, child.href)}
                              >
                                {getNavIcon(child.label, isActivePath(child.href))}
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
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className={mobileMenuTriggerClasses}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className={mobileSheetClasses}>
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
                            {getTopIcon(item.label, isActivePath(item.href))}
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
                              {getNavIcon(child.label, isActivePath(child.href))}
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
        <div
          className={
            shouldUseHomepageHeroChrome
              ? "border-t border-black/5 bg-white"
              : "border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70"
          }
        >
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs items={caseStudyBreadcrumbs} className="py-2 mb-0" />
          </div>
        </div>
      ) : null}
    </header>
  )
}
