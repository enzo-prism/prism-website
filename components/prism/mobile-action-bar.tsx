'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { cn } from '@/lib/utils'

type MobileActionBarProps = {
  href: string
  label: string
  /** No bar on this route (the waitlist routes are the destination). */
  disabled: boolean
  /** Hide for now (the menu is open). */
  suppressed: boolean
  onNavigate: () => void
}

/** Scrolled this far before the bar may appear (the hero has its own CTA). */
const REVEAL_AFTER_PX = 420

/**
 * The phone's one action, under the thumb (DESIGN.md "Mobile"). Below md the
 * header is logo + menu only, so this bar carries the waitlist once the hero
 * has scrolled away. It steps aside whenever another waitlist link is on
 * screen (the hero, an inline invitation, the closing band, the footer), so
 * the page never shows the same action twice, and it clears the home
 * indicator with the safe-area inset.
 */
export function MobileActionBar({
  href,
  label,
  disabled,
  suppressed,
  onNavigate,
}: MobileActionBarProps) {
  const [scrolledPast, setScrolledPast] = useState(false)
  const [otherCtaVisible, setOtherCtaVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolledPast(window.scrollY > REVEAL_AFTER_PX)
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
    if (typeof IntersectionObserver === 'undefined') return

    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setOtherCtaVisible(visible.size > 0)
      },
      // The bar's own height at the bottom counts as covered.
      { rootMargin: '0px 0px -96px 0px' },
    )

    const observed = new WeakSet<Element>()
    const scan = () => {
      document
        .querySelectorAll('main a[href^="/waitlist"], footer a[href^="/waitlist"]')
        .forEach((link) => {
          if (observed.has(link)) return
          observed.add(link)
          observer.observe(link)
        })
    }
    scan()
    const mutations = new MutationObserver(scan)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [])

  // The footer reads this to leave room for the bar on routes that have it.
  useEffect(() => {
    const root = document.documentElement
    if (disabled) delete root.dataset.actionBar
    else root.dataset.actionBar = 'on'
    return () => {
      delete root.dataset.actionBar
    }
  }, [disabled])

  const shown = !disabled && !suppressed && scrolledPast && !otherCtaVisible

  return (
    <div
      data-testid="mobile-action-bar"
      data-shown={shown ? 'true' : 'false'}
      aria-hidden={shown ? undefined : true}
      inert={!shown}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden',
        'transition-[translate,opacity] duration-(--dur-sheet) ease-(--ease-drawer) motion-reduce:translate-y-0',
        shown
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-[calc(100%+0.5rem)] opacity-0',
      )}
    >
      <div className="nav-blur flex items-center gap-3 rounded-[1.375rem] border border-white/[0.1] bg-background/80 p-1.5 pl-4 shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset,0_24px_48px_-20px_oklch(0_0_0/90%)] backdrop-blur-xl backdrop-saturate-150">
        <p className="flex min-w-0 flex-col text-[11px] leading-[1.2] text-subtle">
          <span className="flex items-center gap-1.5">
            <span className="prism-live-dot" aria-hidden="true" />
            Next intake
          </span>
          <span className="mt-0.5 text-[13px] font-medium text-foreground">
            <WaitlistIntakeMonth />
          </span>
        </p>
        <Link
          href={href}
          onClick={onNavigate}
          data-testid="mobile-action-bar-cta"
          className="group/bar ml-auto inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-primary px-4 text-[14px] font-medium text-primary-foreground transition-[background-color,scale] duration-(--dur-press) ease-(--ease-out) hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.97]"
        >
          <span className="truncate">{label}</span>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      </div>
    </div>
  )
}

export default MobileActionBar
