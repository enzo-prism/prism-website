import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import DeferredAsciiHeroBackdrop from '@/components/home/DeferredAsciiHeroBackdrop'
import { HOMEPAGE_HERO } from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

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

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
                <CoreActionLink
                  href="/get-started"
                  label="get a free growth plan"
                  location="homepage hero"
                >
                  {HOMEPAGE_HERO.primaryCtaLabel}
                </CoreActionLink>
                <CoreActionLink
                  href="/#how-it-works"
                  label="see how it works"
                  location="homepage hero"
                  variant="secondary"
                >
                  {HOMEPAGE_HERO.secondaryCtaLabel}
                </CoreActionLink>
              </div>

              <p className="mt-6 max-w-[34rem] font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8f877b]">
                {HOMEPAGE_HERO.trustLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
