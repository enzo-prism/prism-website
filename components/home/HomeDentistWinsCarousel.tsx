'use client'

import Image from 'next/image'
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
  type PointerEvent as ReactPointerEvent,
} from 'react'

import type { HomepageDentistWinSlide } from '@/components/home/homepage-content'
import { cn } from '@/lib/utils'
import { trackCTAClick } from '@/utils/analytics'

const SCROLL_TOLERANCE = 8
const AUTOPLAY_INTERVAL = 5200
const RESUME_DELAY = 7000

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

type HomeDentistWinsCarouselProps = {
  slides: readonly HomepageDentistWinSlide[]
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
  const [revealedSlideKeys, setRevealedSlideKeys] = useState<Set<string>>(
    () => new Set(),
  )

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

    const firstCard = rail.querySelector<HTMLElement>('[data-dentist-win-card]')
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

  const toggleSlideColor = useCallback((slideKey: string) => {
    setRevealedSlideKeys((current) => {
      const next = new Set(current)

      if (next.has(slideKey)) {
        next.delete(slideKey)
      } else {
        next.add(slideKey)
      }

      return next
    })
  }, [])

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
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d8bc79] to-[#f5f0e8] shadow-[0_0_12px_rgba(216,188,121,0.5)] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
          aria-label="Top dentists in California using Prism"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onFocusCapture={pauseAutoplay}
          onBlurCapture={scheduleResume}
          onTouchStart={pauseAutoplay}
          onTouchEnd={scheduleResume}
        >
          {slides.map((slide, index) => {
            const slideKey = buildSlideKey(slide)
            const isColorRevealed = revealedSlideKeys.has(slideKey)

            return (
              <div
                key={slideKey}
                data-dentist-win-card
                className="w-[82vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem] sm:max-w-none lg:w-[24rem]"
                role="listitem"
              >
                <article
                  onPointerMove={handleCardPointerMove}
                  className={cn(
                    'group/card relative overflow-hidden rounded-[1.75rem] border bg-white/[0.03] shadow-[0_28px_90px_-70px_rgba(216,188,121,0.45)] transition-[transform,border-color,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#d8bc79]/40 hover:bg-white/[0.05] hover:shadow-[0_36px_110px_-60px_rgba(216,188,121,0.6)] focus-within:-translate-y-1 focus-within:border-[#d8bc79]/40 focus-within:bg-white/[0.05] focus-within:shadow-[0_36px_110px_-60px_rgba(216,188,121,0.6)] motion-reduce:transition-none',
                    isColorRevealed
                      ? 'border-[#d8bc79]/30 bg-white/[0.045]'
                      : 'border-white/12',
                  )}
                >
                  <button
                    type="button"
                    aria-pressed={isColorRevealed}
                    aria-label={`${isColorRevealed ? 'Hide' : 'Show'} color version for ${slide.dentist}, ${slide.practice}`}
                    onClick={() => toggleSlideColor(slideKey)}
                    className="relative block w-full cursor-pointer overflow-hidden text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                  >
                    <span className="sr-only">
                      {isColorRevealed
                        ? 'Color version is shown.'
                        : 'Black and white version is shown.'}
                    </span>
                    <div className="relative aspect-[4/5]">
                      {slide.imageSrc ? (
                        <Image
                          src={slide.imageSrc}
                          alt={slide.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 22rem, 82vw"
                          priority={index < 2}
                          className={cn(
                            'object-cover grayscale saturate-0 contrast-125 brightness-90 transition-[filter,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none group-hover/card:scale-[1.045] group-hover/card:grayscale-0 group-hover/card:saturate-100 group-hover/card:contrast-100 group-hover/card:brightness-100 group-focus-within/card:scale-[1.045] group-focus-within/card:grayscale-0 group-focus-within/card:saturate-100 group-focus-within/card:contrast-100 group-focus-within/card:brightness-100',
                            isColorRevealed &&
                              'grayscale-0 saturate-100 contrast-100 brightness-100',
                          )}
                          style={{
                            objectPosition: slide.objectPosition ?? 'center',
                          }}
                        />
                      ) : (
                        <DentistPlaceholder slide={slide} />
                      )}
                      <div
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_18%,rgba(0,0,0,0.3)_58%,rgba(0,0,0,0.9)_100%)] transition-opacity duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-[0.78] group-focus-within/card:opacity-[0.78] motion-reduce:transition-none',
                          isColorRevealed ? 'opacity-85' : 'opacity-100',
                        )}
                      />
                      <div
                        aria-hidden="true"
                        data-dentist-win-hover-glow
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100 group-focus-within/card:opacity-100 motion-reduce:transition-none"
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
                        <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-[#f5f0e8]/65">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-16 sm:p-6 sm:pb-16">
                        <p className="font-sans text-[1.45rem] font-medium leading-none tracking-normal text-[#f5f0e8] sm:text-[1.7rem]">
                          {slide.dentist}
                        </p>
                        <p className="mt-2 font-sans text-[0.98rem] leading-5 text-[#d8d0c5]">
                          {slide.practice}
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
                  </button>
                  <Link
                    href={slide.href}
                    prefetch={false}
                    aria-label={`Open case study for ${slide.practice}`}
                    onClick={() =>
                      trackCTAClick(
                        `view ${slide.practice} case study`,
                        'homepage dentist wins carousel',
                      )
                    }
                    className="group/link absolute bottom-5 right-5 z-20 inline-flex min-h-9 items-center gap-2 border border-[#d8bc79]/25 bg-black/55 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e7e0d4] backdrop-blur-sm transition-[transform,border-color,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#d8bc79]/60 hover:bg-black/75 hover:text-[#f5f0e8] hover:shadow-[0_18px_38px_-26px_rgba(216,188,121,0.6)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none sm:bottom-6 sm:right-6"
                  >
                    case study
                    <ArrowUpRight
                      className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </div>
            )
          })}
          <span className="sr-only">Swipe for more Prism dental clients.</span>
        </div>
      </div>
    </div>
  )
}

function DentistPlaceholder({ slide }: { slide: HomepageDentistWinSlide }) {
  return (
    <div
      aria-hidden="true"
      data-dentist-win-placeholder
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_26%_18%,rgba(245,240,232,0.12),transparent_34%),linear-gradient(135deg,rgba(245,240,232,0.1),rgba(15,15,15,0.92)_52%,rgba(0,0,0,0.98))] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.025] group-focus-within/card:scale-[1.025] motion-reduce:transition-none"
    >
      <div className="absolute inset-0 opacity-[0.18] transition-opacity duration-700 group-hover/card:opacity-[0.28] group-focus-within/card:opacity-[0.28] motion-reduce:transition-none [background-image:linear-gradient(rgba(245,240,232,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(245,240,232,0.18)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/12 bg-black/35 font-mono text-3xl font-semibold uppercase tracking-[0.08em] text-[#f5f0e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(245,240,232,0.34)] transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:border-[#d8bc79]/30 group-hover/card:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_28px_78px_-40px_rgba(216,188,121,0.5)] group-focus-within/card:border-[#d8bc79]/30 group-focus-within/card:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_28px_78px_-40px_rgba(216,188,121,0.5)] motion-reduce:transition-none sm:h-36 sm:w-36">
        {buildInitials(slide.dentist)}
      </div>
    </div>
  )
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

function buildSlideKey(slide: HomepageDentistWinSlide) {
  return `${slide.href}-${slide.practice}-${slide.dentist}`
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
        direction === 'left' ? 'Show previous dentist' : 'Show next dentist'
      }
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[#c9c1b6] transition-[transform,border-color,background-color,color,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#d8bc79]/45 hover:bg-white/[0.07] hover:text-[#f5f0e8] hover:shadow-[0_18px_42px_-28px_rgba(216,188,121,0.55)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}
