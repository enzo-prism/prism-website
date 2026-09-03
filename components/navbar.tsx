'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Breadcrumbs from '@/components/breadcrumbs'
import { findCaseStudyNavItem } from '@/lib/case-study-nav-data'
import {
  HOME_NAV_ITEM,
  PROOF_NAV_ITEMS,
} from '@/lib/constants'
import type { NavItem } from '@/lib/constants'
import { PRISM_SERVICES, isServicePath } from '@/lib/services'
import { cn } from '@/lib/utils'
import { trackNavigation } from '@/utils/analytics'

import CoreImage from './core-image'
import { LOGO_CONFIG } from '@/lib/constants'

type BreadcrumbItem = {
  name: string
  url: string
}

type NavVariant = 'desktop' | 'mobile'

const MOBILE_NAV_ID = 'mobile-site-nav'
const SERVICES_MENU_ID = 'services-menu'
const DESKTOP_NAV_BREAKPOINT = 1024
const HEADER_CLASSES =
  'border-b border-white/12 bg-black text-[#f5f0e8] transition-[background-color,border-color,color]'
const DESKTOP_LINK_CLASSES =
  'whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors'
const MOBILE_LINK_CLASSES =
  'group/row flex min-h-14 items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 [@media(max-height:500px)]:min-h-[44px] [@media(max-height:500px)]:py-2'
const MOBILE_EYEBROW_CLASSES =
  'px-4 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8afa2]'

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
  const activeClasses = 'bg-white/[0.08] text-[#f5f0e8]'
  const inactiveClasses =
    variant === 'desktop'
      ? 'text-[#8f877b] hover:bg-white/[0.04] hover:text-[#f5f0e8]'
      : 'text-[#8f877b] hover:bg-white/[0.04] hover:text-[#f5f0e8] active:bg-white/[0.06] active:text-[#f5f0e8]'

  return cn(
    variant === 'desktop' ? DESKTOP_LINK_CLASSES : MOBILE_LINK_CLASSES,
    active ? activeClasses : inactiveClasses,
  )
}

function MobileRowArrow({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn(
        'h-4 w-4 shrink-0 transition-[opacity,transform] duration-200',
        active
          ? 'translate-x-0 opacity-100'
          : 'opacity-35 group-hover/row:translate-x-0.5 group-hover/row:opacity-90',
      )}
    >
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavbarLinks({
  items,
  pathname,
  variant,
  onNavigate,
  startIndex = 0,
}: {
  items: NavItem[]
  pathname: string | null
  variant: NavVariant
  onNavigate: (label: string, href: string) => void
  startIndex?: number
}) {
  return (
    <>
      {items.map((item, index) => {
        const active = isNavItemActive(pathname, item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            onClick={() => onNavigate(item.label, item.href)}
            className={cn(
              getNavItemClasses(active, variant),
              variant === 'mobile' &&
                'motion-safe:animate-[nav-item-rise_360ms_cubic-bezier(0.22,1,0.36,1)_both]',
            )}
            style={
              variant === 'mobile'
                ? { animationDelay: `${(startIndex + index) * 40}ms` }
                : undefined
            }
          >
            {item.label}
            {variant === 'mobile' ? (
              <MobileRowArrow active={active} />
            ) : null}
          </Link>
        )
      })}
    </>
  )
}

function ServicesDropdown({
  pathname,
  onNavigate,
}: {
  pathname: string | null
  onNavigate: (label: string, href: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const closeTimer = useRef<number | null>(null)
  const serviceActive = isServicePath(pathname)

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = window.setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const handlePointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  useEffect(() => () => clearCloseTimer(), [])

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={SERVICES_MENU_ID}
        className={getNavItemClasses(serviceActive || open, 'desktop')}
        onClick={() => {
          clearCloseTimer()
          setOpen((value) => !value)
        }}
      >
        services
        <span
          aria-hidden="true"
          className={cn(
            'ml-1.5 inline-block text-[9px] transition-transform duration-200',
            open && 'rotate-180',
          )}
        >
          ▾
        </span>
      </button>
      {open ? (
        <div
          id={SERVICES_MENU_ID}
          className="absolute left-0 top-[calc(100%+0.65rem)] z-[60] w-[19.5rem] rounded-2xl border border-white/12 bg-black p-2 shadow-[0_28px_70px_-32px_rgba(0,0,0,0.9)]"
        >
          <p className="sr-only">Services</p>
          {PRISM_SERVICES.map((service) => {
            const active = isNavItemActive(pathname, service.href)
            return (
              <Link
                key={service.href}
                href={service.href}
                aria-label={service.label}
                aria-current={active ? 'page' : undefined}
                onClick={() => onNavigate(service.label, service.href)}
                className={cn(
                  'flex flex-col rounded-xl px-3.5 py-3 transition-colors',
                  active
                    ? 'bg-white/[0.08] text-[#f5f0e8]'
                    : 'text-[#f5f0e8] hover:bg-white/[0.05]',
                )}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {service.label}
                </span>
                <span className="mt-1 font-sans text-[0.82rem] font-normal normal-case tracking-[-0.01em] text-[#b8afa2]">
                  {service.navDescription}
                </span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function MobileNavGroups({
  pathname,
  onNavigate,
}: {
  pathname: string | null
  onNavigate: (label: string, href: string) => void
}) {
  return (
    <div className="flex flex-col">
      <div className="pb-2 pt-1">
        <div className="flex flex-col gap-1">
          <NavbarLinks
            items={[HOME_NAV_ITEM]}
            pathname={pathname}
            variant="mobile"
            onNavigate={onNavigate}
            startIndex={0}
          />
        </div>
      </div>
      <div className="border-t border-white/14 py-2">
        <p className={MOBILE_EYEBROW_CLASSES}>Services</p>
        <div className="flex flex-col gap-1">
          <NavbarLinks
            items={PRISM_SERVICES.map(({ label, href }) => ({ label, href }))}
            pathname={pathname}
            variant="mobile"
            onNavigate={onNavigate}
            startIndex={1}
          />
        </div>
      </div>
      <div className="border-t border-white/14 py-2">
        <p className={MOBILE_EYEBROW_CLASSES}>Proof</p>
        <div className="flex flex-col gap-1">
          <NavbarLinks
            items={[...PROOF_NAV_ITEMS]}
            pathname={pathname}
            variant="mobile"
            onNavigate={onNavigate}
            startIndex={4}
          />
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)
  const mobilePanelRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusAfterCloseRef = useRef(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHome = pathname === '/'
  const caseStudyBreadcrumbs = getCaseStudyBreadcrumbs(pathname)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

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

  const mobilePanel =
    isMobileMenuOpen ? (
      <div
        ref={mobilePanelRef}
        id={MOBILE_NAV_ID}
        className="fixed inset-x-0 bottom-0 top-[var(--prism-header-height)] z-[60] overflow-y-auto overscroll-contain border-t border-white/12 bg-black [-webkit-overflow-scrolling:touch] motion-safe:animate-[nav-panel-in_220ms_cubic-bezier(0.22,1,0.36,1)_both] lg:hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(65%_100%_at_50%_0%,rgba(92,220,255,0.08),transparent_70%),radial-gradient(45%_80%_at_85%_0%,rgba(255,69,207,0.07),transparent_70%)]"
        />
        <nav
          aria-label="Mobile"
          className="container-px-safe container relative mx-auto flex min-h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2"
        >
          <MobileNavGroups pathname={pathname} onNavigate={handleNavigate} />
        </nav>
      </div>
    ) : null

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        HEADER_CLASSES,
        'overflow-x-clip',
        isHome || isMobileMenuOpen
          ? 'fixed inset-x-0 top-0 z-50 w-full'
          : 'sticky top-0 z-50 w-full',
      )}
    >
      <div
        data-navbar-chrome
        className="pt-[env(safe-area-inset-top,0px)]"
      >
        <div className="container-px-safe container mx-auto flex h-[72px] min-w-0 flex-nowrap items-center justify-between">
          <Link
            href="/"
            className="group/logo flex min-w-0 items-center gap-3 rounded-full text-[#f5f0e8] transition-[color,transform] duration-300 ease-out hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-safe:hover:-translate-y-0.5"
            onClick={() => handleNavigate('logo', '/')}
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
                className="h-full w-full rounded-none object-cover"
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
              <span className="hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.26em] text-[#b8afa2] transition-[color,transform] duration-300 ease-out group-hover/logo:text-[#5cdcff] group-focus-visible/logo:text-[#5cdcff] motion-safe:group-hover/logo:translate-x-0.5 motion-safe:group-focus-visible/logo:translate-x-0.5 xl:block">
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
              className="hidden items-center gap-0.5 lg:flex xl:gap-1 2xl:gap-2"
            >
              <NavbarLinks
                items={[HOME_NAV_ITEM]}
                pathname={pathname}
                variant="desktop"
                onNavigate={handleNavigate}
              />
              <ServicesDropdown
                pathname={pathname}
                onNavigate={handleNavigate}
              />
              <span
                aria-hidden="true"
                className="mx-1.5 h-4 w-px shrink-0 bg-white/14 xl:mx-2"
              />
              <NavbarLinks
                items={PROOF_NAV_ITEMS}
                pathname={pathname}
                variant="desktop"
                onNavigate={handleNavigate}
              />
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              aria-controls={MOBILE_NAV_ID}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[#f5f0e8] transition-[border-color,background-color,color] hover:border-white/28 hover:bg-white/[0.06] hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden',
                isMobileMenuOpen && 'border-white/28 bg-white/[0.06] text-white',
              )}
              onClick={() => {
                restoreFocusAfterCloseRef.current = true
                setIsMobileMenuOpen((open) => !open)
              }}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              <span aria-hidden="true" className="relative block h-4 w-5">
                <span
                  className={cn(
                    'absolute left-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-200',
                    isMobileMenuOpen ? 'top-[7px] rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200',
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-200',
                    isMobileMenuOpen ? 'top-[7px] -rotate-45' : 'top-[14px]',
                  )}
                />
              </span>
            </button>
          </div>
        </div>

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
      </div>

    </header>
    {mobilePanel && typeof document !== 'undefined'
      ? createPortal(mobilePanel, document.body)
      : null}
    </>
  )
}
