'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  LayoutTemplate,
  Megaphone,
  MessageSquareQuote,
} from 'lucide-react'

import Breadcrumbs from '@/components/breadcrumbs'
import { PrismLogo } from '@/components/prism/prism-logo'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { findCaseStudyNavItem } from '@/lib/case-study-nav-data'
import {
  NAV_ITEMS,
  NAV_MENU_SERVICE_ITEMS,
  NAV_SERVICE_ITEMS,
} from '@/lib/constants'
import type { NavItem, NavServiceItem } from '@/lib/constants'
import { WAITLIST_CTA } from '@/lib/waitlist'
import { cn } from '@/lib/utils'
import { trackNavigation } from '@/utils/analytics'

type BreadcrumbItem = {
  name: string
  url: string
}

const MOBILE_NAV_ID = 'mobile-site-nav'
const DESKTOP_NAV_BREAKPOINT = 1024

const SERVICE_ICONS: Record<NavServiceItem['icon'], typeof LayoutTemplate> = {
  website: LayoutTemplate,
  content: Camera,
  ads: Megaphone,
  aeo: MessageSquareQuote,
}

function getCaseStudyBreadcrumbs(
  pathname: string | null,
): BreadcrumbItem[] | null {
  if (!pathname?.startsWith('/case-studies')) return null

  const baseTrail = [
    { name: 'home', url: '/' },
    { name: 'work', url: '/case-studies' },
  ]

  const parts = pathname.split('/').filter(Boolean)
  if (parts.length <= 1) return null

  const slug = parts[1]
  const label = findCaseStudyNavItem(slug)?.client ?? slug.replace(/-/g, ' ')
  return [...baseTrail, { name: label, url: pathname }]
}

function isNavItemActive(pathname: string | null, href: string) {
  if (!pathname) return false
  if (href === '/') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function isServicesActive(pathname: string | null) {
  return NAV_SERVICE_ITEMS.some((item) => isNavItemActive(pathname, item.href))
}

function DesktopLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem
  pathname: string | null
  onNavigate: (label: string, href: string) => void
}) {
  const active = isNavItemActive(pathname, item.href)
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild active={active}>
        <Link
          href={item.href}
          aria-current={active ? 'page' : undefined}
          onClick={() => onNavigate(item.label, item.href)}
          className={cn(
            'inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50',
            active ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function ServicesMenu({
  pathname,
  onNavigate,
}: {
  pathname: string | null
  onNavigate: (label: string, href: string) => void
}) {
  const active = isServicesActive(pathname)
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(active && 'text-foreground')}
        data-active={active ? 'true' : undefined}
      >
        Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[min(92vw,640px)] grid-cols-[1.35fr_1fr] gap-2 p-1.5">
          {/* The four services are equal tiles that share the featured
              card's height; "All services" keeps its natural height. */}
          <ul className="flex flex-col gap-1.5">
            {NAV_MENU_SERVICE_ITEMS.map((item) => {
              const Icon = SERVICE_ICONS[item.icon]
              return (
                <li key={item.href} className="flex-1">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      onClick={() => onNavigate(item.label, item.href)}
                      className="group/item flex h-full items-center gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground transition-colors group-hover/item:border-white/20">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                        <span className="text-[13px] leading-snug text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              )
            })}
            <li>
              <NavigationMenuLink asChild>
                <Link
                  href="/services"
                  onClick={() => onNavigate('All services', '/services')}
                  className="group/all flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
                >
                  All services
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-200 group-hover/all:translate-x-0.5"
                  />
                </Link>
              </NavigationMenuLink>
            </li>
          </ul>
          <NavigationMenuLink asChild>
            <Link
              href={WAITLIST_CTA.href}
              onClick={() =>
                onNavigate('Services menu waitlist', WAITLIST_CTA.href)
              }
              className="group/feature relative flex flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(120%_90%_at_100%_0%,oklch(0.66_0.16_258/28%),transparent_55%),radial-gradient(90%_80%_at_0%_100%,oklch(0.66_0.21_29/22%),transparent_60%)] p-5"
            >
              <span
                aria-hidden="true"
                className="bg-noise absolute inset-0 opacity-[0.12]"
              />
              <span
                aria-hidden="true"
                className="relative -mx-1 mb-5 block overflow-hidden rounded-lg border border-white/10 bg-popover shadow-[0_20px_40px_-20px_oklch(0_0_0/90%)] transition-transform duration-500 group-hover/feature:-translate-y-0.5"
              >
                <span className="flex h-4 items-center gap-1 border-b border-white/[0.06] px-2">
                  <span className="size-1 rounded-full bg-white/20" />
                  <span className="size-1 rounded-full bg-white/20" />
                  <span className="size-1 rounded-full bg-white/20" />
                </span>
                <Image
                  src="/case-studies/exquisite-dentistry-home-desktop.jpg"
                  alt=""
                  width={2880}
                  height={1800}
                  sizes="240px"
                  className="block h-auto w-full"
                />
              </span>
              <span className="relative inline-flex items-center gap-2 text-[13px] text-muted-foreground">
                <span className="prism-live-dot" aria-hidden="true" />
                Fully booked
              </span>
              <span className="relative mt-3 text-lg font-semibold leading-tight tracking-[-0.03em] text-foreground">
                get on the list for <WaitlistIntakeMonth />.
              </span>
              <span className="relative mt-2 text-[13px] leading-snug text-muted-foreground">
                We open new spots every month. Waitlist members get first pick.
              </span>
              <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                {WAITLIST_CTA.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover/feature:translate-x-0.5"
                />
              </span>
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)
  const mobilePanelRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusAfterCloseRef = useRef(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = pathname === '/'
  // The waitlist routes are the destination; no header CTA back to them.
  const isWaitlistRoute = pathname?.startsWith('/waitlist') ?? false
  const caseStudyBreadcrumbs = getCaseStudyBreadcrumbs(pathname)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setIsScrolled(window.scrollY > 8)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const { body, documentElement } = document
    const header = headerRef.current
    const menuButton = menuButtonRef.current
    const previouslyFocused = document.activeElement
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = documentElement.style.overflow
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    documentElement.dataset.mobileNavOpen = 'true'

    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer'),
    ).filter((element) => !element.closest('header'))
    const mobilePanel = mobilePanelRef.current
    const bodyLevelTargets = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element.tagName !== 'SCRIPT' &&
        element !== header &&
        element !== mobilePanel &&
        (!header || !element.contains(header)),
    )
    const allInertTargets = Array.from(
      new Set([...inertTargets, ...bodyLevelTargets]),
    )
    const priorInertState = new Map(
      allInertTargets.map((element) => [
        element,
        element.hasAttribute('inert'),
      ]),
    )
    allInertTargets.forEach((element) => {
      element.setAttribute('inert', '')
    })

    mobilePanelRef.current
      ?.querySelector<HTMLAnchorElement>('a[href]')
      ?.focus({ preventScroll: true })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_NAV_BREAKPOINT)
        setIsMobileMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      body.style.overflow = previousBodyOverflow
      documentElement.style.overflow = previousHtmlOverflow
      delete documentElement.dataset.mobileNavOpen
      allInertTargets.forEach((element) => {
        if (!priorInertState.get(element)) element.removeAttribute('inert')
      })

      if (restoreFocusAfterCloseRef.current) {
        if (
          previouslyFocused instanceof HTMLElement &&
          previouslyFocused !== body &&
          previouslyFocused !== documentElement &&
          document.contains(previouslyFocused)
        ) {
          previouslyFocused.focus({ preventScroll: true })
        } else {
          menuButton?.focus({ preventScroll: true })
        }
      }
    }
  }, [isMobileMenuOpen])

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--prism-header-height',
        `${header.getBoundingClientRect().height}px`,
      )
    }

    updateHeaderHeight()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateHeaderHeight)
        : null

    resizeObserver?.observe(header)
    window.addEventListener('resize', updateHeaderHeight)

    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      resizeObserver?.disconnect()
    }
  }, [pathname])

  const handleNavigate = (label: string, href: string) => {
    trackNavigation(label, href)
    restoreFocusAfterCloseRef.current = false
    setIsMobileMenuOpen(false)
  }

  const solid = isScrolled || isMobileMenuOpen || !isHome

  const mobilePanel = isMobileMenuOpen ? (
    <div
      ref={mobilePanelRef}
      id={MOBILE_NAV_ID}
      className="fixed inset-x-0 bottom-0 top-[var(--prism-header-height)] z-[60] overflow-y-auto overscroll-contain border-t border-white/[0.06] bg-background [-webkit-overflow-scrolling:touch] motion-safe:animate-[nav-panel-in_220ms_cubic-bezier(0.22,1,0.36,1)_both] lg:hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(80%_100%_at_50%_0%,oklch(1_0_0/5%),transparent)]"
      />
      <nav
        aria-label="Mobile"
        className="prism-container relative flex min-h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4"
      >
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(pathname, item.href)
            return (
              <li key={item.href} className="border-b border-white/[0.06]">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => handleNavigate(item.label, item.href)}
                  className={cn(
                    'flex min-h-14 items-center justify-between gap-3 py-3 text-2xl font-semibold tracking-[-0.03em] transition-colors [@media(max-height:500px)]:min-h-11 [@media(max-height:500px)]:text-xl',
                    active
                      ? 'text-foreground'
                      : 'text-foreground/80 hover:text-foreground',
                  )}
                >
                  {item.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-subtle-foreground"
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 text-eyebrow text-subtle">Services</p>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {NAV_MENU_SERVICE_ITEMS.map((item) => {
            const Icon = SERVICE_ICONS[item.icon]
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => handleNavigate(item.label, item.href)}
                  className="flex min-h-12 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
          {/* The four services fill a 2x2 grid; "All services" spans the row
              beneath them. */}
          <li className="col-span-2">
            <Link
              href="/services"
              onClick={() => handleNavigate('All services', '/services')}
              className="group/all flex min-h-12 items-center justify-between gap-2.5 rounded-xl border border-white/[0.08] px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
            >
              All services
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5"
              />
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-10">
          <div className="rounded-2xl border border-white/[0.08] bg-card p-5">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="prism-live-dot" aria-hidden="true" />
              <span>
                Fully booked. Waitlist open for <WaitlistIntakeMonth />.
              </span>
            </p>
            <Link
              href={WAITLIST_CTA.href}
              onClick={() =>
                handleNavigate(WAITLIST_CTA.label, WAITLIST_CTA.href)
              }
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {WAITLIST_CTA.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  ) : null

  return (
    <>
      <header
        ref={headerRef}
        data-solid={solid ? 'true' : 'false'}
        className={cn(
          'z-50 w-full overflow-x-clip border-b text-foreground transition-[background-color,border-color,backdrop-filter] duration-300',
          isHome || isMobileMenuOpen ? 'fixed inset-x-0 top-0' : 'sticky top-0',
          solid
            ? 'nav-blur border-white/[0.07] bg-background/75 backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent',
        )}
      >
        <div data-navbar-chrome className="pt-[env(safe-area-inset-top,0px)]">
          <div className="prism-container flex h-16 min-w-0 flex-nowrap items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="Prism home"
              onClick={() => handleNavigate('Logo', '/')}
              className="group/logo -m-1 shrink-0 rounded-xl p-1 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <PrismLogo />
            </Link>

            <NavigationMenu
              aria-label="Main"
              className="hidden lg:flex"
              delayDuration={80}
            >
              <NavigationMenuList className="gap-0.5">
                <DesktopLink
                  item={NAV_ITEMS[0]}
                  pathname={pathname}
                  onNavigate={handleNavigate}
                />
                <ServicesMenu pathname={pathname} onNavigate={handleNavigate} />
                {NAV_ITEMS.slice(1).map((item) => (
                  <DesktopLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onNavigate={handleNavigate}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex shrink-0 items-center gap-2">
              {isWaitlistRoute ? (
                <span
                  data-testid="navbar-status"
                  className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] text-muted-foreground sm:inline-flex"
                >
                  <span className="prism-live-dot" aria-hidden="true" />
                  <span>
                    <WaitlistIntakeMonth /> intake
                  </span>
                </span>
              ) : (
                <Link
                  href={WAITLIST_CTA.href}
                  onClick={() =>
                    handleNavigate('Header waitlist', WAITLIST_CTA.href)
                  }
                  data-testid="navbar-cta"
                  className="group/cta inline-flex h-9 items-center gap-2 rounded-full bg-primary pl-3.5 pr-4 text-sm font-medium text-primary-foreground shadow-[0_1px_0_0_oklch(1_0_0/40%)_inset,0_8px_24px_-12px_oklch(1_0_0/50%)] transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <span
                    className="prism-live-dot hidden sm:inline-flex"
                    aria-hidden="true"
                  />
                  <span className="sm:hidden">Join</span>
                  <span className="hidden sm:inline">{WAITLIST_CTA.label}</span>
                </Link>
              )}
              <button
                ref={menuButtonRef}
                type="button"
                aria-controls={MOBILE_NAV_ID}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => {
                  restoreFocusAfterCloseRef.current = true
                  setIsMobileMenuOpen((open) => !open)
                }}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition-colors hover:bg-white/[0.08] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 lg:hidden"
              >
                <span aria-hidden="true" className="relative block h-3 w-4">
                  <span
                    className={cn(
                      'absolute left-0 h-[1.5px] w-4 rounded-full bg-current motion-safe:transition-transform duration-200',
                      isMobileMenuOpen ? 'top-[5px] rotate-45' : 'top-0.5',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 h-[1.5px] w-4 rounded-full bg-current motion-safe:transition-transform duration-200',
                      isMobileMenuOpen ? 'top-[5px] -rotate-45' : 'top-[8.5px]',
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {caseStudyBreadcrumbs ? (
            <div className="border-t border-white/[0.06]">
              <div className="prism-container">
                {/* Visual trail only: each case study page emits its own
                    BreadcrumbList via CaseStudySchema. */}
                <Breadcrumbs
                  items={caseStudyBreadcrumbs}
                  className="mb-0 py-2 text-muted-foreground"
                  includeSchema={false}
                />
              </div>
            </div>
          ) : null}
        </div>
      </header>
      {mobilePanel && typeof document !== 'undefined'
        ? createPortal(mobilePanel, document.body)
        : null}
    </>
  )
}
