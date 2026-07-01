import type { CSSProperties } from 'react'

import {
  CoreActionLink,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import DeferredAsciiHeroBackdrop from '@/components/home/DeferredAsciiHeroBackdrop'
import { HOMEPAGE_HERO } from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import TrackedAnchor from '@/components/tracked-anchor'
import TrackedLink from '@/components/tracked-link'
import { cn } from '@/lib/utils'

function heroRiseDelay(ms: number) {
  return { '--hero-rise-delay': `${ms}ms` } as CSSProperties
}

export default function HomeHeroSection() {
  return (
    <section
      id="homepage-hero"
      className="border-b border-white/12 px-4 pb-20 pt-[calc(var(--prism-header-height,4.5rem)+2.5rem)] sm:px-6 sm:pb-24 sm:pt-[calc(var(--prism-header-height,4.5rem)+3.5rem)]"
    >
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteHeroFrameClassName}>
          <DeferredAsciiHeroBackdrop
            animationName="wave"
            frameCount={300}
            fps={18}
            quality="high"
            renderMode="canvas"
            textSize="text-[2.3px] sm:text-[2.8px] md:text-[3.2px]"
            ariaLabel="Wave ASCII animation behind the homepage hero"
            forceAutoplay
            zoom={0.84}
            className="!opacity-[0.72] drop-shadow-[0_0_18px_rgba(245,240,232,0.22)] sm:!opacity-[0.88] md:!opacity-100 md:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_100%)] md:[mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_100%)]"
            scrimClassName="absolute inset-0 bg-gradient-to-b from-background/28 via-background/42 to-background/68 sm:from-background/20 sm:via-background/34 sm:to-background/58 md:from-background/12 md:via-background/24 md:to-background/48"
            focusScrimClassName="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_48%,hsl(var(--background)/0.92)_0%,hsl(var(--background)/0.76)_32%,hsl(var(--background)/0.28)_56%,hsl(var(--background)/0)_80%)] sm:bg-[radial-gradient(ellipse_at_22%_48%,hsl(var(--background)/0.86)_0%,hsl(var(--background)/0.66)_34%,hsl(var(--background)/0.2)_58%,hsl(var(--background)/0)_82%)] md:bg-[radial-gradient(ellipse_at_24%_48%,hsl(var(--background)/0.78)_0%,hsl(var(--background)/0.52)_34%,hsl(var(--background)/0.12)_58%,hsl(var(--background)/0)_82%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.24))]"
          />

          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16">
            <div className="max-w-[46rem]">
              <div
                className="home-hero-rise flex flex-wrap gap-2.5 sm:gap-3"
                style={heroRiseDelay(0)}
              >
                {HOMEPAGE_HERO.supportPoints.map((point, index) => {
                  const isAiRecommendation =
                    point.variant === 'aiRecommendation'

                  return (
                    <div
                      key={point.label}
                      data-testid="home-hero-support-point"
                      className={cn(
                        index > 1 ? 'hidden sm:inline-flex' : 'inline-flex',
                        'max-w-full items-center rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                        isAiRecommendation
                          ? 'min-h-11 gap-2.5 border-[#d8bc79]/35 bg-[#d8bc79]/[0.07] px-2.5 py-2 pr-4 font-sans text-[0.8rem] font-medium tracking-[-0.01em] text-[#f5f0e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_38px_-30px_rgba(216,188,121,0.95)] hover:border-[#d8bc79]/55 hover:bg-[#d8bc79]/[0.11] sm:text-[0.84rem]'
                          : 'gap-2 border-white/12 bg-white/[0.03] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8afa2] hover:border-white/20 hover:text-[#d6cec2]',
                      )}
                    >
                      {isAiRecommendation ? (
                        <span
                          aria-hidden="true"
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d8bc79]/30 bg-black/50 shadow-[0_0_24px_-14px_rgba(216,188,121,0.9)]"
                        >
                          <PixelishIcon
                            src={point.iconSrc}
                            alt=""
                            size={16}
                            aria-hidden="true"
                            invert={point.iconInvert ?? true}
                            className="h-3.5 w-3.5 opacity-95"
                          />
                        </span>
                      ) : (
                        <PixelishIcon
                          src={point.iconSrc}
                          alt=""
                          size={16}
                          aria-hidden="true"
                          invert={point.iconInvert ?? true}
                          className="h-3.5 w-3.5 opacity-80"
                        />
                      )}
                      <span
                        className={
                          isAiRecommendation ? 'whitespace-nowrap' : undefined
                        }
                      >
                        {point.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              <h1
                className="home-hero-rise mt-8 font-sans text-[clamp(3rem,9vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-[#f5f0e8] sm:mt-9"
                style={heroRiseDelay(120)}
              >
                {HOMEPAGE_HERO.title}
              </h1>

              <p
                className="home-hero-rise mt-5 max-w-[40rem] text-balance font-sans text-[1.2rem] leading-8 text-[#e9e2d6] sm:text-[1.35rem]"
                style={heroRiseDelay(220)}
              >
                {HOMEPAGE_HERO.subheading}
              </p>

              <p
                className="home-hero-rise mt-4 max-w-[40rem] text-pretty font-sans text-[1rem] leading-7 text-[#b8afa2] sm:text-[1.05rem]"
                style={heroRiseDelay(300)}
              >
                {HOMEPAGE_HERO.description}
              </p>

              <div
                className="home-hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
                style={heroRiseDelay(380)}
              >
                <CoreActionLink
                  href={HOMEPAGE_HERO.primaryCta.href}
                  label="order now"
                  location="homepage hero"
                  variant="heroPrimary"
                >
                  {HOMEPAGE_HERO.primaryCta.label}
                </CoreActionLink>
                <CoreActionLink
                  href={HOMEPAGE_HERO.secondaryCta.href}
                  label="explore plans"
                  location="homepage hero"
                  variant="heroSecondary"
                >
                  {HOMEPAGE_HERO.secondaryCta.label}
                </CoreActionLink>
              </div>

              <div
                data-testid="home-hero-stats"
                className="home-hero-rise mt-10"
                style={heroRiseDelay(560)}
              >
                <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_30px_80px_-70px_rgba(216,188,121,0.7)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d8bc79]/45 to-transparent" />
                    <span className="home-scan-line absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#f5f0e8]/70 to-transparent" />
                  </div>

                  {/* Traffic & attention — the dominant proof trio */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 pt-5 sm:px-7">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="home-signal-dot h-1 w-1 rounded-full bg-[#d8bc79]"
                        />
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8bc79]/85">
                          {HOMEPAGE_HERO.stats.headline.label}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#7d766a]">
                        {HOMEPAGE_HERO.stats.note}
                      </span>
                    </div>
                    <div className="mt-1 grid grid-cols-1 divide-y divide-[#d8bc79]/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      {HOMEPAGE_HERO.stats.headline.items.map((stat) => (
                        <div
                          key={stat.label}
                          className="px-5 pb-6 pt-4 sm:px-7 sm:pb-7"
                        >
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-sans text-[clamp(1.9rem,4.6vw,2.5rem)] font-medium leading-none tracking-[-0.04em] text-[#f5f0e8] tabular-nums">
                              {stat.value}
                            </span>
                            {stat.unit ? (
                              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8a092]">
                                {stat.unit}
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-2.5 max-w-[20ch] text-pretty font-sans text-[0.88rem] leading-snug text-[#b8afa2]">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Per-platform breakdown — where the totals come from */}
                  <div className="border-t border-[#d8bc79]/15">
                    <div className="flex items-center gap-2 px-5 pt-5 sm:px-7">
                      <span
                        aria-hidden="true"
                        className="home-signal-dot h-1 w-1 rounded-full bg-[#d8bc79]"
                      />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8bc79]/85">
                        {HOMEPAGE_HERO.stats.reach.label}
                      </span>
                    </div>
                    <ul
                      aria-label="Prism social reach by platform"
                      className="grid grid-cols-1 divide-y divide-[#d8bc79]/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                    >
                      {HOMEPAGE_HERO.stats.reach.channels.map((channel) => (
                        <li key={channel.platform}>
                          <TrackedAnchor
                            href={channel.url}
                            label={`prism ${channel.platform.toLowerCase()}`}
                            location="homepage hero social reach"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/social flex h-full flex-col px-5 py-5 transition-colors hover:bg-white/[0.03] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d8bc79]/35 sm:px-7 sm:py-6"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={`/home-hero/social/${channel.platform.toLowerCase()}.svg`}
                                alt=""
                                aria-hidden="true"
                                width={22}
                                height={15}
                                loading="lazy"
                                className="h-[15px] w-auto max-w-[22px] shrink-0"
                              />
                              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b8afa2] transition-colors group-hover/social:text-[#d6cec2]">
                                {channel.platform}
                              </span>
                              <span
                                aria-hidden="true"
                                className="ml-auto text-[11px] leading-none text-[#7d766a] opacity-0 transition-all duration-300 group-hover/social:text-[#d8bc79] group-hover/social:opacity-100 group-focus-visible/social:opacity-100"
                              >
                                ↗
                              </span>
                            </div>
                            <div className="mt-3 flex items-baseline gap-1.5">
                              <span className="font-sans text-[1.45rem] font-medium leading-none tracking-[-0.02em] text-[#f5f0e8]">
                                {channel.followers}
                              </span>
                              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7d766a]">
                                followers
                              </span>
                            </div>
                            <div className="mt-2 flex items-baseline gap-1.5">
                              <span className="font-sans text-[1.05rem] font-medium leading-none tracking-[-0.01em] text-[#cfc7ba]">
                                {channel.views}
                              </span>
                              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7d766a]">
                                views
                              </span>
                            </div>
                            <span className="sr-only"> (opens in a new tab)</span>
                          </TrackedAnchor>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-start gap-2 border-t border-white/10 px-5 py-4 sm:px-7">
                      <span
                        aria-hidden="true"
                        className="home-signal-dot mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d8bc79]"
                      />
                      <p className="text-pretty font-sans text-[0.9rem] leading-6 text-[#cfc7ba]">
                        100% grown by Prism AI Agents, powered by{' '}
                        <TrackedLink
                          href="/content-os"
                          label="content os"
                          location="homepage hero social reach"
                          className="group/cos inline-flex items-baseline gap-0.5 font-medium text-[#d8bc79] underline-offset-4 transition-colors hover:text-[#e8cd8a] hover:underline focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          Content OS
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover/cos:translate-x-0.5"
                          >
                            →
                          </span>
                        </TrackedLink>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <p className="sr-only">
                  Each month, Prism drives 18,563 new users to client websites,
                  based on the latest data from June 2026. Across YouTube,
                  Instagram, and TikTok, Prism&apos;s own channels reach 71,000
                  followers and over 17 million views: 24,000 YouTube followers
                  with over 3 million views, 38,000 Instagram followers with over
                  10 million views, and 9,000 TikTok followers with over 4
                  million views. These channels are grown automatically by Prism
                  AI Agents, powered by Content OS.
                </p>
              </div>

              <div
                data-testid="home-hero-social-proof"
                className="home-hero-rise mt-6"
                style={heroRiseDelay(650)}
              >
                <TrackedLink
                  href="/case-studies"
                  label="view case studies"
                  location="homepage hero social proof"
                  className="group flex flex-col gap-3 border-t border-white/10 pt-5 transition-colors hover:border-white/18 focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex items-center gap-3">
                    <div
                      aria-label="5 star rating"
                      role="img"
                      className="inline-flex shrink-0 items-center gap-1 text-[0.78rem] leading-none text-[#d8bc79]/85"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={`hero-star-${index}`} aria-hidden="true">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-pretty font-sans text-[0.94rem] leading-6 text-[#a8a092] sm:text-[0.98rem]">
                      {HOMEPAGE_HERO.socialProof.headline}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d766a] transition-colors group-hover:text-[#c1b9ac]">
                    {HOMEPAGE_HERO.socialProof.linkLabel}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </TrackedLink>
              </div>
            </div>

            <div
              className="home-hero-rise relative mt-12 border-t border-white/10 pt-5 sm:mt-14"
              style={heroRiseDelay(740)}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[-1px] h-px overflow-hidden"
              >
                <span className="home-scan-line absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#d8bc79]/70 to-transparent" />
              </div>
              <ul
                aria-label="What the Prism growth system includes"
                className="flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                {HOMEPAGE_HERO.systemStrip.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f877b]"
                  >
                    <span
                      aria-hidden="true"
                      className="home-signal-dot h-1 w-1 rounded-full bg-[#d8bc79]"
                      style={{ '--signal-delay': `${index * 260}ms` } as CSSProperties}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
