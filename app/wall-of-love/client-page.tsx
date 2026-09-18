'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { trackCTAClick } from '@/utils/analytics'
import DeferredAsciiHeroBackdrop from '@/components/home/DeferredAsciiHeroBackdrop'
import { SOCIAL_PROOF } from '@/lib/proof-metrics'
import {
  formatSocialHandle,
  isClientQuote,
  quotesData,
  renderFormattedText,
  takeawaysData,
  type Quote,
  type Takeaway,
} from '@/content/wall-of-love-data'

type FeedItem =
  | { kind: 'quote'; data: Quote }
  | { kind: 'takeaway'; data: Takeaway }

const HEART_POSTER_SRC = '/animations/heart/poster.svg'

// Generic Fisher–Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = array.slice()
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function WallOfLoveClientPage() {
  const combinedFeed: FeedItem[] = useMemo(
    () => [
      ...quotesData.map((q) => ({ kind: 'quote', data: q }) as FeedItem),
      ...takeawaysData.map((t) => ({ kind: 'takeaway', data: t }) as FeedItem),
    ],
    [],
  )

  const [feed, setFeed] = useState<FeedItem[]>(combinedFeed)
  const reviewCount = combinedFeed.length

  useEffect(() => {
    setFeed(shuffleArray(combinedFeed))
  }, [combinedFeed])
  // minimal vertical list – no carousels, observers, or shuffling

  return (
    <>
      <section id="wall-of-love-hero" className="px-4 py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/50 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.7)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-12 lg:py-16">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Wall of Love / Incoming
                </p>
                <h1 className="mt-4 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
                  Love letters, still arriving.
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Prism shares content for world-class founders and athletes.
                  This is what they send back.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/waitlist">
                    <Button
                      size="lg"
                      className="rounded-md px-6"
                      onClick={() =>
                        trackCTAClick(
                          'wall_of_love_become_client_cta',
                          '/waitlist',
                        )
                      }
                    >
                      Become a Client <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href="#testimonials-feed"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground/25"
                  >
                    Read the letters
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>

              <div className="relative order-first min-h-[260px] overflow-hidden border-b border-border/60 md:min-h-[300px] lg:order-last lg:min-h-[380px] lg:border-b-0 lg:border-l">
                <DeferredAsciiHeroBackdrop
                  animationName="heart"
                  frameCount={60}
                  fps={15}
                  quality="medium"
                  renderMode="canvas"
                  fit="contain"
                  zoom={1.05}
                  offsetY={-3}
                  maskClassName=""
                  ariaLabel="ASCII heart animation in the Wall of Love flight lane"
                  posterSrc={HEART_POSTER_SRC}
                  posterClassName="absolute inset-0 h-full w-full object-contain object-center opacity-90 [image-rendering:pixelated]"
                  scrimClassName="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/40"
                  focusScrimClassName=""
                />
                <p
                  aria-hidden="true"
                  className="absolute bottom-3 left-4 z-10 rounded-full bg-background/70 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Incoming / {reviewCount.toLocaleString()} voices
                </p>
              </div>
            </div>

            <div className="border-t border-border/60 px-6 py-4 sm:px-10 md:px-12">
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span>
                  Instagram {SOCIAL_PROOF.instagram.audience}{' '}
                  {SOCIAL_PROOF.instagram.audienceLabel}
                </span>
                <span aria-hidden="true" className="hidden lg:inline">
                  /
                </span>
                <span>
                  TikTok {SOCIAL_PROOF.tiktok.audience}{' '}
                  {SOCIAL_PROOF.tiktok.audienceLabel}
                </span>
                <span aria-hidden="true" className="hidden lg:inline">
                  /
                </span>
                <span>
                  YouTube {SOCIAL_PROOF.youtube.audience}{' '}
                  {SOCIAL_PROOF.youtube.audienceLabel}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-transparent">
        <main
          id="testimonials-feed"
          className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
        >
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground text-center font-pixel">
            {reviewCount.toLocaleString()} voices from our community of founders
          </p>
          <div className="space-y-4 sm:space-y-5 columns-1 md:columns-2 xl:columns-3 gap-5">
            {feed.map((item) => {
              const isQuote = item.kind === 'quote'
              const quote = isQuote ? (item.data as Quote) : null
              const isClient = quote ? isClientQuote(quote) : false

              // Paying clients show their real name + a "client" marker; every
              // other voice is a social comment, surfaced as an @handle.
              const sourceName = isQuote
                ? (item.data as Quote).client
                : (item.data as Takeaway).handle
              const displayName = isClient
                ? sourceName
                : formatSocialHandle(sourceName)
              const monogram =
                displayName.replace(/^@/, '').charAt(0).toUpperCase() || '•'

              return (
                <blockquote
                  key={`${item.kind}-${item.data.id}`}
                  className="mb-4 w-full break-inside-avoid overflow-hidden rounded-md border border-border/60 bg-card/30 p-4 shadow-none backdrop-blur-sm sm:p-5"
                  aria-label={
                    isClient
                      ? `Testimonial from ${displayName}, Prism client`
                      : `Comment from ${displayName}`
                  }
                >
                  <p className="text-[15px] leading-relaxed text-foreground sm:text-base">
                    &ldquo;
                    {renderFormattedText(
                      isQuote
                        ? (item.data as Quote).text
                        : (item.data as Takeaway).text,
                    )}
                    &rdquo;
                  </p>
                  <footer className="mt-4 flex items-center gap-2.5 border-t border-border/40 pt-3">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-[11px] font-semibold text-muted-foreground"
                    >
                      {monogram}
                    </span>
                    <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
                      {isClient ? (
                        <>
                          <span className="truncate text-sm font-medium text-foreground">
                            {displayName}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                            client
                          </span>
                        </>
                      ) : (
                        <span className="truncate text-sm font-medium text-foreground">
                          <span className="text-muted-foreground">@</span>
                          {displayName.replace(/^@/, '')}
                        </span>
                      )}
                    </div>
                  </footer>
                </blockquote>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
