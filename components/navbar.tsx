'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Breadcrumbs from '@/components/breadcrumbs'
import { findCaseStudyNavItem } from '@/lib/case-study-nav-data'
import {
  LOGO_CONFIG,
  MORE_NAV_ITEMS,
  NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
} from '@/lib/constants'
import type { NavItem } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { trackNavigation } from '@/utils/analytics'

import CoreImage from './core-image'

type BreadcrumbItem = {
  name: string
  url: string
}

type NavVariant = 'desktop' | 'mobile'

const MOBILE_NAV_ID = 'mobile-site-nav'
const DESKTOP_MORE_MENU_ID = 'desktop-more-nav'
// The inline desktop nav takes over from the menu button at this width.
const DESKTOP_NAV_BREAKPOINT = 1280
const HEADER_CLASSES =
  'border-b border-white/12 bg-black text-[#f5f0e8] transition-[background-color,border-color,color]'
// Compact desktop links: tighter tracking + no-wrap so the four primary items,
// the "more" dropdown, the logo, and the persistent CTA fit on one row from
// xl (1280px) up without overflow.
const DESKTOP_LINK_CLASSES =
  'whitespace-nowrap border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors'
const MOBILE_LINK_CLASSES =
  'block py-4 text-sm font-semibold uppercase tracking-[0.24em] transition-colors'

// Persistent primary action. Mirrors the "websites" nav item destination but
// reads as a filled CTA (ivory on near-black per the hero-primary-button token).
const PRIMARY_CTA = { label: 'Order now', href: '/websites' } as const
const CTA_BASE_CLASSES =
  'items-center justify-center rounded-md bg-[#f5f0e8] font-semibold uppercase tracking-[0.2em] text-[#050505] transition-colors hover:bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black'

function getCaseStudyBreadcrumbs(
  pathname: string | null,
): BreadcrumbItem[] | null {
  if (!pathname?.startsWith('/case-studies')) return null

  const baseTrail = [
    { name: 'home', url: '/' },
    { name: 'case studies', url: '/case-studies' },
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

function getNavItemClasses(active: boolean, variant: NavVariant) {
  const activeClasses =
    variant === 'desktop' ? 'border-[#f5f0e8] text-[#f5f0e8]' : 'text-[#f5f0e8]'

  const inactiveClasses =
    variant === 'desktop'
      ? 'border-transparent text-[#8f877b] hover:border-white/40 hover:text-[#f5f0e8]'
      : 'text-[#8f877b] hover:text-[#f5f0e8]'

  return cn(
    variant === 'desktop' ? DESKTOP_LINK_CLASSES : MOBILE_LINK_CLASSES,
    active ? activeClasses : inactiveClasses,
  )
}

function NavbarLinks({
  items,
  pathname,
  variant,
  onNavigate,
}: {
  items: NavItem[]
  pathname: string | null
  variant: NavVariant
  onNavigate: (label: string, href: string) => void
}) {
  return (
    <>
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => onNavigate(item.label, item.href)}
          className={cn(
            getNavItemClasses(isNavItemActive(pathname, item.href), variant),
            variant === 'mobile' &&
              'motion-safe:animate-[nav-item-rise_360ms_cubic-bezier(0.22,1,0.36,1)_both]',
          )}
          style={
            variant === 'mobile'
              ? { animationDelay: `${index * 40}ms` }
              : undefined
          }
        >
          {item.label}
        </Link>
      ))}
    </>
  )
}

// Desktop-only disclosure that collapses the utility items (pricing, get
// started, contact) behind a quiet "more" trigger styled like its sibling
// links. Follows the APG disclosure-navigation pattern: plain links in a
// toggled panel (no ARIA menu semantics), dismissed by outside pointer,
// Escape (refocusing the trigger), or navigation.
function MoreNavDropdown({
  pathname,
  onNavigate,
}: {
  pathname: string | null
  onNavigate: (label: string, href: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const hasActiveItem = MORE_NAV_ITEMS.some((item) =>
    isNavItemActive(pathname, item.href),
  )

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    // `flex` (not a plain block) so the inline-flex trigger is block-ified and
    // the wrapper's height equals the button exactly — a block wrapper would
    // size from an inline line box (baseline + half-leading), rendering the
    // trigger a few px lower than its sibling links under `items-center`.
    <div ref={containerRef} className="relative flex">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={DESKTOP_MORE_MENU_ID}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          'inline-flex items-center gap-1.5',
          getNavItemClasses(hasActiveItem, 'desktop'),
        )}
      >
        more
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn(
            'h-2.5 w-2.5 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen ? (
        <div
          id={DESKTOP_MORE_MENU_ID}
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-[11rem] rounded-xl border border-white/12 bg-black p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
        >
          {MORE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                onNavigate(item.label, item.href)
                setIsOpen(false)
              }}
              className={cn(
                'block whitespace-nowrap rounded-lg px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors',
                isNavItemActive(pathname, item.href)
                  ? 'bg-white/[0.06] text-[#f5f0e8]'
                  : 'text-[#8f877b] hover:bg-white/[0.04] hover:text-[#f5f0e8]',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHome = pathname === '/'
  const caseStudyBreadcrumbs = getCaseStudyBreadcrumbs(pathname)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    // Full-screen menu: lock the page behind it (touch scroll otherwise
    // chains to the body) and make it inert so focus cannot tab into
    // content underneath the panel. Both scrollers are locked: body
    // overflow alone does not reach the viewport when the root element
    // carries its own overflow styles.
    const { body, documentElement } = document
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = documentElement.style.overflow
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'

    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer'),
    ).filter((element) => !element.closest('header'))
    inertTargets.forEach((element) => {
      element.setAttribute('inert', '')
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    const handleResize = () => {
      // The horizontal nav takes over at xl (1280px); close the panel so it
      // never lingers behind the desktop layout after a resize or rotation.
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
      inertTargets.forEach((element) => {
        element.removeAttribute('inert')
      })
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
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        HEADER_CLASSES,
        isHome ? 'fixed inset-x-0 top-0 z-50' : 'sticky top-0 z-50 w-full',
      )}
    >
      <div className="container-px-safe container mx-auto flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="group/logo flex min-w-0 items-center gap-3 rounded-full text-[#f5f0e8] transition-[color,transform] duration-300 ease-out hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-safe:hover:-translate-y-0.5"
          onClick={() => trackNavigation('logo', '/')}
          aria-label="Prism home"
        >
          <div
            data-testid="navbar-logo-mark"
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl border border-white/14 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover/logo:border-white/45 group-hover/logo:shadow-[0_0_0_1px_rgba(255,255,255,0.18),-7px_0_24px_rgba(92,220,255,0.5),7px_0_24px_rgba(255,69,207,0.5),0_16px_34px_rgba(0,0,0,0.42)] group-focus-visible/logo:border-white/45 group-focus-visible/logo:shadow-[0_0_0_1px_rgba(255,255,255,0.18),-7px_0_24px_rgba(92,220,255,0.5),7px_0_24px_rgba(255,69,207,0.5),0_16px_34px_rgba(0,0,0,0.42)] motion-safe:group-hover/logo:scale-105 motion-safe:group-focus-visible/logo:scale-105"
          >
            <span
              data-testid="navbar-logo-glow"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(118deg,rgba(92,220,255,0.55)_0%,rgba(255,255,255,0.3)_46%,rgba(255,69,207,0.55)_100%)] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/2 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.78),transparent)] opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100 motion-safe:group-hover/logo:translate-x-[300%] motion-safe:group-focus-visible/logo:translate-x-[300%]"
            />
            <CoreImage
              src={LOGO_CONFIG.src}
              alt={LOGO_CONFIG.alt}
              width={40}
              height={40}
              className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
              priority
              fallbackSrc={LOGO_CONFIG.fallbackSrc}
              trackingId="navbar_logo"
              quality={90}
            />
          </div>

          <div className="relative flex min-w-0 flex-col justify-center">
            <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.22em] text-[#f5f0e8] transition-[color,transform] duration-300 ease-out group-hover/logo:text-white group-focus-visible/logo:text-white motion-safe:group-hover/logo:translate-x-px motion-safe:group-focus-visible/logo:translate-x-px">
              Prism
            </span>
            <span className="max-[479px]:hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.26em] text-[#b8afa2] transition-[color,transform] duration-300 ease-out group-hover/logo:text-[#5cdcff] group-focus-visible/logo:text-[#5cdcff] motion-safe:group-hover/logo:translate-x-0.5 motion-safe:group-focus-visible/logo:translate-x-0.5">
              impossible is temporary
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#5cdcff]/80 via-white/55 to-[#ff45cf]/80 opacity-0 transition-[width,opacity] duration-300 group-hover/logo:w-full group-hover/logo:opacity-100 group-focus-visible/logo:w-full group-focus-visible/logo:opacity-100"
            />
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <nav
            aria-label="Main"
            className="hidden items-center gap-4 xl:flex 2xl:gap-6"
          >
            <NavbarLinks
              items={PRIMARY_NAV_ITEMS}
              pathname={pathname}
              variant="desktop"
              onNavigate={handleNavigate}
            />
            <MoreNavDropdown pathname={pathname} onNavigate={handleNavigate} />
          </nav>

          <Link
            href={PRIMARY_CTA.href}
            onClick={() => handleNavigate('order-cta', PRIMARY_CTA.href)}
            className={cn(
              // Keep the primary action reachable on phones too; only the
              // narrowest viewports (<400px) fall back to the menu CTA.
              'inline-flex whitespace-nowrap px-3.5 py-2 text-[10px] max-[359px]:hidden sm:px-4 sm:text-[11px]',
              CTA_BASE_CLASSES,
            )}
          >
            <span className="sm:hidden">Order</span>
            <span className="hidden sm:inline">{PRIMARY_CTA.label}</span>
          </Link>

          <button
            type="button"
            aria-controls={MOBILE_NAV_ID}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[#f5f0e8] transition-[border-color,background-color,color] hover:border-white/28 hover:bg-white/[0.06] hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black xl:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <span aria-hidden="true" className="relative block h-3.5 w-4">
              <span
                className={cn(
                  'absolute left-0 top-0 h-[1.5px] w-4 rounded-full bg-current transition-transform duration-200',
                  isMobileMenuOpen ? 'top-[6px] rotate-45' : '',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[6px] h-[1.5px] w-4 rounded-full bg-current transition-opacity duration-200',
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-3 h-[1.5px] w-4 rounded-full bg-current transition-transform duration-200',
                  isMobileMenuOpen ? 'top-[6px] -rotate-45' : '',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          id={MOBILE_NAV_ID}
          className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-white/12 bg-black motion-safe:animate-[nav-panel-in_220ms_cubic-bezier(0.22,1,0.36,1)_both] xl:hidden"
        >
          <nav
            aria-label="Mobile"
            className="container-px-safe container mx-auto flex min-h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <div className="divide-y divide-white/12">
              <NavbarLinks
                items={NAV_ITEMS}
                pathname={pathname}
                variant="mobile"
                onNavigate={handleNavigate}
              />
            </div>
            <div className="mt-auto pt-8">
              <Link
                href={PRIMARY_CTA.href}
                onClick={() => handleNavigate('order-cta', PRIMARY_CTA.href)}
                className={cn(
                  'flex min-h-[52px] w-full px-5 text-sm',
                  CTA_BASE_CLASSES,
                )}
              >
                {PRIMARY_CTA.label}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}

      {caseStudyBreadcrumbs ? (
        <div className="border-t border-white/12 bg-black">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={caseStudyBreadcrumbs}
              className="mb-0 py-2 text-[#b8afa2]"
            />
          </div>
        </div>
      ) : null}
    </header>
  )
}
