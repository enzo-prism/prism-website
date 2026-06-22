'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import type { HomepageClientWinSlide } from '@/components/home/homepage-content'
import { cn } from '@/lib/utils'
import { trackCTAClick } from '@/utils/analytics'

const SCROLL_TOLERANCE = 8
const AUTOPLAY_INTERVAL = 5200
const RESUME_DELAY = 7000
const ABSTRACT_VISUAL_THEMES = [
  { accent: '#d8bc79', secondary: '#5cdcff', tertiary: '#9eff2e' },
  { accent: '#5cdcff', secondary: '#d8bc79', tertiary: '#ff45cf' },
  { accent: '#9eff2e', secondary: '#5cdcff', tertiary: '#d8bc79' },
  { accent: '#ff45cf', secondary: '#d8bc79', tertiary: '#5cdcff' },
] as const

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

type HomeDentistWinsCarouselProps = {
  slides: readonly HomepageClientWinSlide[]
}

export default function HomeDentistWinsCarousel({
  slides,
}: HomeDentistWinsCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const resumeTimerRef = useRef<number | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const updateScrollState = useCallback(() => {
    const rail = railRef.current
    if (!rail) return

    const { scrollLeft, scrollWidth, clientWidth } = rail
    setCanScrollLeft(scrollLeft > SCROLL_TOLERANCE)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - SCROLL_TOLERANCE)

    const max = scrollWidth - clientWidth
    setProgress(max > 0 ? Math.min(1, Math.max(0, scrollLeft / max)) : 0)
  }, [])

  useEffect(() => {
    updateScrollState()
  }, [updateScrollState])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    updateScrollState()

    const handleScroll = () => updateScrollState()
    const handleResize = () => updateScrollState()

    rail.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      rail.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateScrollState])

  const scrollByAmount = useCallback((direction: 'left' | 'right') => {
    const rail = railRef.current
    if (!rail) return

    const firstCard = rail.querySelector<HTMLElement>('[data-client-win-card]')
    let amount = Math.max(rail.clientWidth * 0.82, 320)

    if (firstCard) {
      const styles = window.getComputedStyle(rail)
      const gapRaw = styles.columnGap || styles.gap || '0'
      const gap = Number.parseFloat(gapRaw) || 0
      amount = firstCard.getBoundingClientRect().width + gap
    }

    rail.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [])

  // Gentle auto-advance that loops back to the start and respects reduced motion.
  useEffect(() => {
    if (isPaused || prefersReducedMotion()) return

    const id = window.setInterval(() => {
      const rail = railRef.current
      if (!rail) return

      const atEnd =
        rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - SCROLL_TOLERANCE

      if (atEnd) {
        rail.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollByAmount('right')
      }
    }, AUTOPLAY_INTERVAL)

    return () => window.clearInterval(id)
  }, [isPaused, scrollByAmount])

  const pauseAutoplay = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
    setIsPaused(true)
  }, [])

  const resumeAutoplay = useCallback(() => {
    setIsPaused(false)
  }, [])

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = window.setTimeout(
      () => setIsPaused(false),
      RESUME_DELAY,
    )
  }, [])

  useEffect(
    () => () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    },
    [],
  )

  const handleArrowClick = useCallback(
    (direction: 'left' | 'right') => {
      pauseAutoplay()
      scrollByAmount(direction)
      scheduleResume()
    },
    [pauseAutoplay, scrollByAmount, scheduleResume],
  )

  const handleCardPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    },
    [],
  )

  return (
    <div className="relative">
      <div className="mb-4 flex items-center gap-4 sm:mb-5">
        <div
          className="relative h-px flex-1 overflow-hidden bg-white/10"
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d8bc79] to-[#f5f0e8] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${Math.max(progress * 100, 6)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <CarouselButton
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => handleArrowClick('left')}
          />
          <CarouselButton
            direction="right"
            disabled={!canScrollRight}
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black to-transparent transition-opacity sm:w-16',
            canScrollLeft ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black to-transparent transition-opacity sm:w-16',
            canScrollRight ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-1 pb-2 scrollbar-hide sm:gap-4"
          role="list"
          aria-label="Client growth stories using Prism"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onFocusCapture={pauseAutoplay}
          onBlurCapture={scheduleResume}
          onTouchStart={pauseAutoplay}
          onTouchEnd={scheduleResume}
        >
          {slides.map((slide, index) => {
            const slideKey = buildSlideKey(slide)

            return (
              <div
                key={slideKey}
                data-client-win-card
                className="w-[82vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem] sm:max-w-none lg:w-[24rem]"
                role="listitem"
              >
                <Link
                  href={slide.href}
                  prefetch={false}
                  aria-label={`Open case study for ${slide.company}`}
                  onPointerMove={handleCardPointerMove}
                  onClick={() =>
                    trackCTAClick(
                      `view ${slide.company} case study`,
                      'homepage client wins carousel',
                    )
                  }
                  className="group/card block h-full rounded-[1.75rem] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  <article className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.03] shadow-[0_28px_90px_-70px_rgba(216,188,121,0.45)] transition-[transform,border-color,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-1 group-hover/card:border-[#d8bc79]/40 group-hover/card:bg-white/[0.05] group-hover/card:shadow-[0_36px_110px_-60px_rgba(216,188,121,0.6)] group-focus-visible/card:-translate-y-1 group-focus-visible/card:border-[#d8bc79]/40 group-focus-visible/card:bg-white/[0.05] group-focus-visible/card:shadow-[0_36px_110px_-60px_rgba(216,188,121,0.6)] motion-reduce:transition-none">
                    <div className="relative aspect-[4/5]">
                      <AbstractClientWinVisual slide={slide} index={index} />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_8%,rgba(0,0,0,0.22)_56%,rgba(0,0,0,0.92)_100%)] transition-opacity duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-[0.82] group-focus-visible/card:opacity-[0.82] motion-reduce:transition-none"
                      />
                      <div
                        aria-hidden="true"
                        data-client-win-hover-glow
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100 group-focus-visible/card:opacity-100 motion-reduce:transition-none"
                      >
                        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#d8bc79]/60 to-transparent" />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 12%), rgba(216,188,121,0.22), transparent 62%)',
                          }}
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
                        {slide.contextLabel ? (
                          <span className="inline-flex items-center rounded-full border border-white/16 bg-black/45 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e7e0d4] backdrop-blur-sm">
                            {slide.contextLabel}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] font-semibold tracking-[0.22em] text-[#f5f0e8]/65"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-16 sm:p-6 sm:pb-16">
                        <p className="font-sans text-[1.45rem] font-medium leading-none tracking-normal text-[#f5f0e8] sm:text-[1.7rem]">
                          {slide.leader}
                        </p>
                        <p className="mt-2 font-sans text-[0.98rem] leading-5 text-[#d8d0c5]">
                          {slide.company}
                        </p>
                        <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b8afa2]">
                          <MapPin
                            aria-hidden="true"
                            className="h-3 w-3 text-[#d8bc79]"
                            strokeWidth={2}
                          />
                          {slide.location}
                        </p>
                      </div>
                    </div>
                    <span className="absolute bottom-5 right-5 z-20 inline-flex min-h-9 items-center gap-2 border border-[#d8bc79]/25 bg-black/55 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e7e0d4] backdrop-blur-sm transition-[transform,border-color,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-0.5 group-hover/card:border-[#d8bc79]/60 group-hover/card:bg-black/75 group-hover/card:text-[#f5f0e8] group-hover/card:shadow-[0_18px_38px_-26px_rgba(216,188,121,0.6)] group-focus-visible/card:-translate-y-0.5 group-focus-visible/card:border-[#d8bc79]/60 group-focus-visible/card:bg-black/75 group-focus-visible/card:text-[#f5f0e8] motion-reduce:transition-none sm:bottom-6 sm:right-6">
                      case study
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-focus-visible/card:translate-x-0.5 group-focus-visible/card:-translate-y-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>
                  </article>
                </Link>
              </div>
            )
          })}
          <span className="sr-only">Swipe for more Prism client stories.</span>
        </div>
      </div>
    </div>
  )
}

function AbstractClientWinVisual({
  slide,
  index,
}: {
  slide: HomepageClientWinSlide
  index: number
}) {
  const theme = ABSTRACT_VISUAL_THEMES[index % ABSTRACT_VISUAL_THEMES.length]
  const labels = buildSignalLabels(slide)
  const gradientId = `client-win-line-${index}`

  return (
    <div
      aria-hidden="true"
      data-client-win-abstract
      className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,rgba(245,240,232,0.07),rgba(16,16,15,0.94)_38%,rgba(0,0,0,0.98))] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.025] group-focus-visible/card:scale-[1.025] motion-reduce:transition-none"
      style={
        {
          '--client-win-accent': theme.accent,
          '--client-win-secondary': theme.secondary,
          '--client-win-tertiary': theme.tertiary,
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 opacity-[0.16] transition-opacity duration-700 group-hover/card:opacity-[0.28] group-focus-visible/card:opacity-[0.28] motion-reduce:transition-none [background-image:linear-gradient(rgba(245,240,232,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(245,240,232,0.18)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div
        className="absolute inset-x-6 top-7 h-px opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        }}
      />
      <div className="absolute left-1/2 top-[45%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 opacity-70 transition-colors duration-700 [animation-duration:26s] group-hover/card:border-[#d8bc79]/40 group-focus-visible/card:border-[#d8bc79]/40 motion-safe:animate-spin motion-reduce:transition-none" />
      <div className="absolute left-1/2 top-[45%] h-36 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[2.25rem] border border-white/8 opacity-70 [animation-direction:reverse] [animation-duration:34s] motion-safe:animate-spin motion-reduce:transition-none" />

      <svg
        className="absolute inset-0 h-full w-full opacity-85"
        viewBox="0 0 320 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={theme.secondary} stopOpacity="0" />
            <stop offset="34%" stopColor={theme.accent} stopOpacity="0.82" />
            <stop offset="100%" stopColor={theme.tertiary} stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M34 118 C96 56 154 132 224 78 C250 58 276 50 306 58"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeDasharray="8 13"
          strokeLinecap="round"
          strokeWidth="1.5"
          className="motion-safe:animate-pulse"
        />
        <path
          d="M18 246 C92 198 134 284 214 220 C250 190 280 190 312 206"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeDasharray="2 10"
          strokeLinecap="round"
          strokeWidth="1.5"
          className="opacity-80 motion-safe:animate-pulse"
          style={{ animationDelay: '700ms' }}
        />
        <path
          d="M62 330 L122 292 L176 316 L256 258"
          fill="none"
          stroke={theme.secondary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.45"
          strokeWidth="1.25"
        />
      </svg>

      {[
        ['15%', '22%', '0ms'],
        ['74%', '18%', '400ms'],
        ['18%', '58%', '900ms'],
        ['78%', '62%', '1200ms'],
        ['50%', '74%', '1500ms'],
      ].map(([left, top, delay]) => (
        <span
          key={`${left}-${top}`}
          className="absolute h-3 w-3 rounded-[0.35rem] border border-white/18 motion-safe:animate-pulse"
          style={{
            left,
            top,
            animationDelay: delay,
            backgroundColor: `${theme.accent}33`,
            boxShadow: `0 0 22px ${theme.accent}45`,
          }}
        />
      ))}

      <div className="absolute left-1/2 top-[44%] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[1.65rem] border border-white/14 bg-black/55 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(245,240,232,0.34)] backdrop-blur-sm transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:border-[#d8bc79]/45 group-hover/card:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_28px_78px_-40px_rgba(216,188,121,0.5)] group-focus-visible/card:border-[#d8bc79]/45 group-focus-visible/card:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_28px_78px_-40px_rgba(216,188,121,0.5)] motion-reduce:transition-none sm:h-36 sm:w-36">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.26em] text-[#b8afa2]">
          Prism
        </span>
        <span className="mt-2 font-sans text-3xl font-medium tracking-normal text-[#f5f0e8]">
          {buildInitials(slide.leader)}
        </span>
        <span
          className="mt-2 h-px w-12"
          style={{ backgroundColor: `${theme.accent}b3` }}
        />
      </div>

      <div className="absolute bottom-28 left-4 right-4 grid grid-cols-3 gap-2">
        {labels.map((label, labelIndex) => (
          <span
            key={`${label}-${labelIndex}`}
            className="min-w-0 rounded-md border border-white/10 bg-black/35 px-2 py-1.5 text-center font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#d8d0c5] backdrop-blur-sm"
            style={{
              color:
                labelIndex === 0
                  ? theme.accent
                  : labelIndex === 1
                    ? theme.secondary
                    : '#d8d0c5',
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

function buildSignalLabels(slide: HomepageClientWinSlide) {
  const primary = slide.contextLabel.split(/\s|\+/).filter(Boolean)[0] ?? 'growth'
  const secondary = slide.company.split(/\s+/).filter(Boolean)[0] ?? 'system'

  return [primary, secondary, 'growth']
}

function buildInitials(name: string) {
  return name
    .replace(/\bdr\.?\s*/gi, '')
    .replace(/\+.*$/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function buildSlideKey(slide: HomepageClientWinSlide) {
  return `${slide.href}-${slide.company}-${slide.leader}`
}

type CarouselButtonProps = {
  direction: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}

function CarouselButton({ direction, disabled, onClick }: CarouselButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      aria-label={
        direction === 'left' ? 'Show previous client' : 'Show next client'
      }
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[#c9c1b6] transition-[transform,border-color,background-color,color,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#d8bc79]/45 hover:bg-white/[0.07] hover:text-[#f5f0e8] hover:shadow-[0_18px_42px_-28px_rgba(216,188,121,0.55)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}
