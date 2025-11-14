"use client"

import { MapPin, Megaphone, Menu, MonitorSmartphone, Search, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { LOGO_CONFIG, NAV_ITEMS, type NavItem } from "@/lib/constants"
import { trackNavigation } from "@/utils/analytics"
import CoreImage from "./core-image"

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  const navItems = NAV_ITEMS
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Normalize paths for active-state (aliases for spec vs. actual routes)
  const aliasMap: Record<string, string> = {
    '/design': '/designs',
    '/growth': '/prism-flywheel',
  }

  const normalizeHref = (href: string) => aliasMap[href] ?? href
  const isActivePath = (href?: string) => (href ? pathname === normalizeHref(href) : false)
  const isParentActive = (item: NavItem) => {
    if (item.href && isActivePath(item.href)) return true
    if (item.children?.length) {
      return item.children.some((c) => isActivePath(c.href))
    }
    return false
  }

  const headerPositionClass = isMobile && pathname === "/" ? "fixed" : "sticky"
  const serviceIconMap: Record<string, LucideIcon> = {
    websites: MonitorSmartphone,
    seo: Search,
    ads: Megaphone,
    "local listings": MapPin,
  }
  const getNavIcon = (label?: string) => {
    if (!label) return null
    const Icon = serviceIconMap[label.toLowerCase()]
    return Icon ? <Icon className="h-4 w-4 text-neutral-400" aria-hidden /> : null
  }
  return (
    <header className={`${headerPositionClass} top-0 z-50 w-full border-b bg-background/95 md:backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
      <div className="w-full max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-0">
        <div className="flex items-center justify-between w-full px-3 md:px-0">
        <Link href="/" className="flex items-center gap-2" onClick={() => trackNavigation("logo", "/")}>
          {/* This div provides the dimensions and primary clipping */}
          <div className="relative h-8 w-8 overflow-hidden rounded-lg isolate">
            <CoreImage
              src={LOGO_CONFIG.src}
              alt={LOGO_CONFIG.alt}
              width={32}
              height={32}
              // Pass classes to CoreImage to apply to the NextImage component
              // This ensures the NextImage itself is rounded and clips its content.
              className={`object-contain w-full h-full ${LOGO_CONFIG.className} overflow-hidden`}
              priority
              fallbackSrc={LOGO_CONFIG.fallbackSrc}
              trackingId="navbar_logo"
              quality={90}
            />
          </div>
          <span className="text-2xl font-bold lowercase text-foreground">prism</span>
        </Link>

        { !isMounted ? (
            <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                item.href ? (
                  <Link key={item.label} href={item.href} className="text-sm lowercase text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <span key={item.label} className="text-sm lowercase text-muted-foreground">{item.label}</span>
                )
              ))}
            </nav>
          ) : isMobile ? (
            <>
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              {isMenuOpen && (
                <div className="absolute left-0 top-16 z-50 w-full bg-background px-4 py-4 shadow-md animate-in slide-in-from-top-4 duration-300">
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <div key={item.label} className="flex flex-col">
                        {item.href ? (
                          <Link
                            href={item.href}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-lg lowercase transition-colors hover:bg-muted ${
                              isActivePath(item.href)
                                ? "font-semibold text-foreground bg-muted"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => {
                              setIsMenuOpen(false)
                              trackNavigation(item.label, item.href!)
                            }}
                          >
                            {item.emoji ? <span className="text-xl" aria-hidden>{item.emoji}</span> : null}
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <div className={`flex items-center gap-2 px-3 py-2 text-lg lowercase ${isParentActive(item) ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {item.emoji ? <span className="text-xl" aria-hidden>{item.emoji}</span> : null}
                            <span>{item.label}</span>
                          </div>
                        )}
                        {item.children && (
                          <div className="pl-6 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-base lowercase transition-colors hover:bg-muted ${
                                  isActivePath(child.href)
                                    ? "font-medium text-foreground bg-muted"
                                    : "text-muted-foreground hover:text-foreground"
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
              )}
            </>
          ) : (
            <nav className="flex items-center gap-5">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-sm font-medium lowercase transition-colors hover:text-primary ${
                        isActivePath(item.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => trackNavigation(item.label, item.href!)}
                    >
                      {item.emoji ? <span className="text-base" aria-hidden>{item.emoji}</span> : null}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 text-sm font-medium lowercase hover:text-primary ${
                        isParentActive(item) ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      aria-haspopup="menu"
                      aria-expanded="false"
                    >
                      {item.emoji ? <span className="text-base" aria-hidden>{item.emoji}</span> : null}
                      <span>{item.label}</span>
                    </button>
                  )}
                        {item.children && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150">
                            <div className="rounded-xl border bg-white shadow-lg p-2 min-w-[220px]">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm lowercase hover:bg-neutral-50 ${
                                    isActivePath(child.href) ? 'text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                                  }`}
                                  onClick={() => trackNavigation(child.label, child.href)}
                                >
                                  {getNavIcon(child.label)}
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                  )}
                </div>
              ))}
            </nav>
          ) }
        </div>
      </div>
    </header>
  )
}
