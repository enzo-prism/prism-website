'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Breadcrumbs from '@/components/breadcrumbs'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { LOGO_CONFIG, NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { trackNavigation } from '@/utils/analytics'

import CoreImage from './core-image'

type BreadcrumbItem = {
  name: string
  url: string
}

type NavVariant = 'desktop' | 'mobile'

const MOBILE_NAV_ID = 'mobile-site-nav'
const HEADER_CLASSES =
  'border-b border-white/12 bg-black text-[#f5f0e8] transition-[background-color,border-color,color]'
const DESKTOP_LINK_CLASSES =
  'border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.26em] transition-colors'
const MOBILE_LINK_CLASSES =
  'block py-4 text-sm font-semibold uppercase tracking-[0.24em] transition-colors'

function getCaseStudyBreadcrumbs(pathname: string | null): BreadcrumbItem[] | null {
  if (!pathname?.startsWith('/case-studies')) return null

  const baseTrail = [
    { name: 'home', url: '/' },
    { name: 'case studies', url: '/case-studies' },
  ]

  const parts = pathname.split('/').filter(Boolean)
  if (parts.length <= 1) return null

  const slug = parts[1]
  const match = CASE_STUDIES.find((study) => study.slug === slug)
  const label = match?.client ?? slug.replace(/-/g, ' ')
  return [...baseTrail, { name: label, url: pathname }]
}

function isNavItemActive(pathname: string | null, href: string) {
  if (!pathname) return false
  if (href === '/') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function getNavItemClasses(active: boolean, variant: NavVariant) {
  const activeClasses =
    variant === 'desktop'
      ? 'border-[#f5f0e8] text-[#f5f0e8]'
      : 'text-[#f5f0e8]'

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
  pathname,
  variant,
  onNavigate,
}: {
  pathname: string | null
  variant: NavVariant
  onNavigate: (label: string, href: string) => void
}) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => onNavigate(item.label, item.href)}
          className={getNavItemClasses(
            isNavItemActive(pathname, item.href),
            variant,
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
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
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group/logo flex min-w-0 items-center gap-3 rounded-full text-[#f5f0e8] transition-[color,transform] duration-300 ease-out hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-safe:hover:-translate-y-0.5"
          onClick={() => trackNavigation('logo', '/')}
          aria-label="Prism home"
        >
          <div
            data-testid="navbar-logo-mark"
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl border border-white/14 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover/logo:border-[#d8bc79]/55 group-hover/logo:shadow-[0_0_0_1px_rgba(245,240,232,0.14),0_16px_34px_rgba(0,0,0,0.34),0_0_26px_rgba(216,188,121,0.22)] group-focus-visible/logo:border-[#d8bc79]/55 group-focus-visible/logo:shadow-[0_0_0_1px_rgba(245,240,232,0.14),0_16px_34px_rgba(0,0,0,0.34),0_0_26px_rgba(216,188,121,0.22)] motion-safe:group-hover/logo:-rotate-3 motion-safe:group-hover/logo:scale-105 motion-safe:group-focus-visible/logo:-rotate-3 motion-safe:group-focus-visible/logo:scale-105"
          >
            <span
              data-testid="navbar-logo-glow"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_28%_22%,rgba(216,188,121,0.36),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.22),transparent_58%)] opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-2 left-2 z-20 w-px bg-[#d8bc79]/0 transition-[background-color,box-shadow] duration-300 group-hover/logo:bg-[#d8bc79]/70 group-hover/logo:shadow-[0_0_14px_rgba(216,188,121,0.72)] group-focus-visible/logo:bg-[#d8bc79]/70 group-focus-visible/logo:shadow-[0_0_14px_rgba(216,188,121,0.72)]"
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
            <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.26em] text-[#b8afa2] transition-[color,transform] duration-300 ease-out group-hover/logo:text-[#d8bc79] group-focus-visible/logo:text-[#d8bc79] motion-safe:group-hover/logo:translate-x-0.5 motion-safe:group-focus-visible/logo:translate-x-0.5">
              impossible is temporary
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#d8bc79]/70 via-[#f5f0e8]/55 to-transparent opacity-0 transition-[width,opacity] duration-300 group-hover/logo:w-full group-hover/logo:opacity-100 group-focus-visible/logo:w-full group-focus-visible/logo:opacity-100"
            />
          </div>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <NavbarLinks
            pathname={pathname}
            variant="desktop"
            onNavigate={handleNavigate}
          />
        </nav>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-controls={MOBILE_NAV_ID}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[#f5f0e8] transition-[border-color,background-color,color] hover:border-white/28 hover:bg-white/[0.06] hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
          className="border-t border-white/12 bg-black md:hidden"
        >
          <nav aria-label="Main" className="container mx-auto px-4 sm:px-6">
            <div className="divide-y divide-white/12">
              <NavbarLinks
                pathname={pathname}
                variant="mobile"
                onNavigate={handleNavigate}
              />
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
