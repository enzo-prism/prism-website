import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import DeferredAsciiHeroBackdrop from '@/components/home/DeferredAsciiHeroBackdrop'
import { HOMEPAGE_HERO } from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import TrackedLink from '@/components/tracked-link'

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
            quality="medium"
            textSize="text-[2.3px] sm:text-[2.8px] md:text-[3.2px]"
            ariaLabel="Wave ASCII animation behind the homepage hero"
            className="opacity-[0.2] sm:opacity-[0.34] md:opacity-[0.48] md:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_28%,black_100%)] md:[mask-image:linear-gradient(90deg,transparent_0%,black_28%,black_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.12),rgba(0,0,0,0.45))]"
          />

          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16">
            <div className="max-w-[46rem]">
              <div className="flex flex-wrap gap-3">
                {HOMEPAGE_HERO.supportPoints.map((point) => (
                  <div
                    key={point.label}
                    data-testid="home-hero-support-point"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8afa2]"
                  >
                    <PixelishIcon
                      src={point.iconSrc}
                      alt=""
                      size={16}
                      aria-hidden="true"
                      className="h-3.5 w-3.5 opacity-80"
                    />
                    <span>{point.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CoreSectionHeading
                  eyebrow={HOMEPAGE_HERO.eyebrow}
                  title={HOMEPAGE_HERO.title}
                  description={HOMEPAGE_HERO.description}
                  as="h1"
                  variant="hero"
                  titleClassName="max-w-[10ch]"
                  descriptionClassName="max-w-[42rem] text-[1.05rem] leading-7 sm:text-[1.16rem] sm:leading-8"
                />
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <CoreActionLink
                  href="/get-started"
                  label="get a free growth plan"
                  location="homepage hero"
                  variant="heroPrimary"
                >
                  {HOMEPAGE_HERO.primaryCtaLabel}
                </CoreActionLink>
                <CoreActionLink
                  href="/#how-it-works"
                  label="see how it works"
                  location="homepage hero"
                  variant="heroSecondary"
                >
                  {HOMEPAGE_HERO.secondaryCtaLabel}
                </CoreActionLink>
              </div>

              <TrackedLink
                href="/wall-of-love"
                label="visit wall of love"
                location="homepage hero social proof"
                className="group mt-6 block max-w-[36rem]"
              >
                <div
                  data-testid="home-hero-social-proof"
                  className="relative overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[0.04] p-3.5 shadow-[0_20px_50px_-38px_rgba(0,0,0,0.85)] transition-[border-color,background-color,transform] hover:border-white/24 hover:bg-white/[0.06] sm:p-4"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-[radial-gradient(circle_at_left,rgba(245,240,232,0.16),transparent_72%)]"
                  />
                  <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#f5f0e8]/12 bg-black/35 px-3.5 py-2.5">
                        <div
                          aria-label="5 star rating"
                          role="img"
                          className="flex items-center gap-1 text-[0.9rem] leading-none text-[#f3cf75]"
                        >
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={`hero-star-${index}`} aria-hidden="true">
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="h-4 w-px bg-white/12" />
                        <div className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9c1b6]">
                          <PixelishIcon
                            src="/pixelish/users.svg"
                            alt=""
                            size={14}
                            aria-hidden="true"
                            className="h-3.5 w-3.5 opacity-80"
                          />
                          <span>{HOMEPAGE_HERO.socialProof.reviewCountLabel}</span>
                        </div>
                      </div>

                      <p className="max-w-[20rem] text-balance font-sans text-[0.98rem] font-medium leading-6 text-[#f5f0e8] sm:max-w-none sm:text-[1.02rem]">
                        {HOMEPAGE_HERO.socialProof.headline}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 self-start font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f877b] transition-colors group-hover:text-[#c9c1b6] sm:self-center">
                      <span>{HOMEPAGE_HERO.socialProof.linkLabel}</span>
                      <PixelishIcon
                        src="/pixelish/arrow-right.svg"
                        alt=""
                        size={14}
                        aria-hidden="true"
                        className="h-3.5 w-3.5 opacity-75 transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
