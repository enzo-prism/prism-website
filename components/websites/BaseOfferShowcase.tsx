'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowDown,
  FileText,
  Layout,
  Palette,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { cn } from '@/lib/utils'

type BaseFeature = {
  icon: LucideIcon
  label: string
  detail: string
}

const BASE_FEATURES: BaseFeature[] = [
  {
    icon: Layout,
    label: 'One responsive page',
    detail: 'Sharp on every screen, from phone to desktop.',
  },
  {
    icon: FileText,
    label: 'Your copy & assets',
    detail: 'Send the words, logos, photos, and links you already have.',
  },
  {
    icon: Palette,
    label: 'Prism design system',
    detail: 'The same type, color, and motion standards as our top builds.',
  },
  {
    icon: Zap,
    label: 'Launch-ready frontend',
    detail: 'Clean, optimized code that loads fast everywhere.',
  },
  {
    icon: ShieldCheck,
    label: 'Yours to keep',
    detail: 'The finished website is 100% yours, with no lock-in.',
  },
]

type RevealPhase = 'static' | 'hidden' | 'revealed'

// Mirrors the proven HomeReveal contract: content renders visible by default,
// and only elements below the fold hide + animate in on intersection.
function revealStyle(phase: RevealPhase, delay: number): CSSProperties {
  if (phase === 'static') return {}
  if (phase === 'hidden') {
    return { opacity: 0, transform: 'translateY(22px)' }
  }
  return {
    opacity: 1,
    transform: 'translateY(0)',
    transition:
      'opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)',
    transitionDelay: `${delay}ms`,
  }
}

export default function BaseOfferShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [phase, setPhase] = useState<RevealPhase>('static')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      return
    }

    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) {
      return
    }

    setPhase('hidden')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase('revealed')
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={coreRouteSectionCompactClassName}>
      <div
        className={cn(
          coreRouteContainerClassName,
          'grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center',
        )}
      >
        {/* Heading column */}
        <div style={revealStyle(phase, 0)}>
          <CoreSectionHeading
            eyebrow="Flat $300"
            title="One price. Built to your spec."
            description="Every website is a flat $300, one-time. You describe exactly what you want, and we build a real Prism-grade site to match — no tiers, no add-on creep, no long agency process."
          />
          <div
            className="mt-8 flex flex-wrap items-center gap-3"
            style={revealStyle(phase, 90)}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#c9c1b6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8bc79]" />
              5 included capabilities
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8bc79]/25 bg-[#d8bc79]/[0.06] px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#d8bc79]">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              $300 flat · one-time
            </span>
          </div>
        </div>

        {/* Interactive card */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#070707] shadow-[0_30px_90px_-60px_rgba(216,188,121,0.5)]"
          style={revealStyle(phase, 150)}
        >
          {/* Subtle backdrop depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(216,188,121,0.06),transparent_55%)]"
          />

          {/* Price centerpiece */}
          <div className="relative flex items-center gap-5 border-b border-white/10 px-6 py-6 sm:px-7">
            <div
              aria-hidden="true"
              className="base-offer-glow pointer-events-none absolute -left-12 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,188,121,0.22),transparent_70%)] blur-xl"
            />
            <div className="relative">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-[#8f877b]">
                Flat price
              </p>
              <div className="relative mt-1">
                <span className="block text-[clamp(2.8rem,8vw,3.8rem)] font-medium leading-none tracking-[-0.06em] text-[#f5f0e8] tabular-nums">
                  $300
                </span>
                {/* The shimmer sweep lives in its own clipped layer so
                    overflow-hidden contains the animation without slicing the
                    number's glyph ink (leading-none makes the line box 1em, so
                    a clip on the text itself would crop the bottom of $300). */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <span className="base-offer-shimmer absolute inset-y-2 -left-1/2 w-1/2 bg-[linear-gradient(100deg,transparent,rgba(245,240,232,0.5),transparent)] blur-[1px]" />
                </span>
              </div>
            </div>
            <div className="relative ml-auto text-right">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#c9c1b6]">
                One-time
              </p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#8f877b]">
                Built to your spec
              </p>
            </div>
          </div>

          {/* Feature grid: gap-px hairlines match the proof grid pattern */}
          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {BASE_FEATURES.map((feature, index) => {
              const Icon = feature.icon
              const isActive = activeIndex === index
              return (
                <button
                  key={feature.label}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`base-offer-detail-${index}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                  className={cn(
                    'group relative flex items-start gap-4 bg-[#070707] p-5 text-left transition-[background-color] duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d8bc79]/40',
                    isActive ? 'bg-[#d8bc79]/[0.07]' : 'hover:bg-[#0c0c0c]',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      isActive
                        ? 'border-[#d8bc79]/45 bg-[#d8bc79]/15 text-[#d8bc79] shadow-[0_0_22px_-12px_rgba(216,188,121,0.9)] motion-safe:scale-105'
                        : 'border-white/12 bg-white/[0.03] text-[#b8afa2] group-hover:border-white/22 group-hover:text-[#f5f0e8]',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-medium leading-6 tracking-[-0.01em] text-[#f5f0e8]">
                      {feature.label}
                    </span>
                    <span
                      id={`base-offer-detail-${index}`}
                      className={cn(
                        'block max-w-[26ch] overflow-hidden text-[0.82rem] leading-6 text-[#9a9288] transition-[max-height,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        // Hover-revealed on fine pointers; on touch there is
                        // no affordance that these cells expand, so keep the
                        // detail copy visible by default.
                        isActive
                          ? 'mt-1.5 max-h-16 opacity-100'
                          : 'max-h-0 opacity-0 pointer-coarse:mt-1.5 pointer-coarse:max-h-16 pointer-coarse:opacity-100',
                      )}
                    >
                      {feature.detail}
                    </span>
                  </span>
                </button>
              )
            })}

            {/* Bridge cell linking to the order form below */}
            <a
              href="#start"
              className="group relative flex items-center gap-4 bg-[#d8bc79]/[0.05] p-5 transition-[background-color] duration-300 hover:bg-[#d8bc79]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d8bc79]/40"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d8bc79]/35 bg-[#d8bc79]/15 text-[#d8bc79]"
              >
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-medium leading-6 tracking-[-0.01em] text-[#e8dcc8]">
                  Ready to start?
                </span>
                <span className="block text-[0.82rem] leading-6 text-[#d8bc79]">
                  Describe your website below
                </span>
              </span>
              <ArrowDown
                aria-hidden="true"
                className="base-offer-bob ml-auto h-4 w-4 shrink-0 text-[#d8bc79]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
