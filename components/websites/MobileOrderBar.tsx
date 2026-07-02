'use client'

import { useEffect, useState } from 'react'

import { trackCTAClick } from '@/utils/analytics'

/**
 * Slim fixed bottom bar for phones on /websites. The order form lives far
 * below the hero (past proof and FAQ), so on mobile the primary action
 * otherwise disappears for several screens of scrolling.
 *
 * Shows once the visitor scrolls past the hero CTA; hides again while the
 * order form itself is on screen (or already behind them) so it never
 * duplicates a visible CTA or sits over the footer.
 */
export default function MobileOrderBar() {
  const [pastHero, setPastHero] = useState(false)
  const [formState, setFormState] = useState<'above' | 'visible' | 'below'>(
    'above',
  )

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > 480)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const form = document.getElementById('start')
    if (!form || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormState('visible')
        } else {
          setFormState(entry.boundingClientRect.top < 0 ? 'below' : 'above')
        }
      },
      { threshold: 0.08 },
    )

    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  const visible = pastHero && formState === 'above'

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-[#0a0a0a] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-sans text-[0.95rem] font-medium leading-tight text-[#f5f0e8]">
            $300 flat
          </p>
          <p className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#8f877b]">
            Live in 7 days
          </p>
        </div>
        <a
          href="#order"
          tabIndex={visible ? 0 : -1}
          onClick={() =>
            trackCTAClick('start your website', 'websites mobile order bar')
          }
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-[#f5f0e8] px-5 font-sans text-[0.92rem] font-medium text-[#050505] transition-colors hover:bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Start your website
        </a>
      </div>
    </div>
  )
}
