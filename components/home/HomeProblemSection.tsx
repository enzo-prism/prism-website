import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSplitLayoutClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import BrandLogo from '@/components/brand-logo'
import { HOMEPAGE_PROBLEM } from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeProblemSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div
          className={`${coreRouteSplitLayoutClassName} xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]`}
        >
          <CoreSectionHeading
            title={HOMEPAGE_PROBLEM.title}
            description={HOMEPAGE_PROBLEM.description}
            className="gap-4"
            titleClassName="max-w-[17ch] lg:max-w-[19ch] xl:max-w-[18ch]"
            descriptionClassName="max-w-[30rem] text-pretty text-[1rem] leading-7 sm:text-[1.08rem] sm:leading-8"
          />

          <div className="space-y-8">
            <div className="grid gap-x-5 gap-y-6 border-y border-white/12 py-6 sm:grid-cols-2 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,0.98fr)_minmax(0,1.28fr)_minmax(0,0.84fr)]">
              {HOMEPAGE_PROBLEM.points.map((point) => (
                <div
                  key={point.label}
                  data-testid="home-problem-point"
                  className="space-y-4 xl:min-w-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]">
                      {point.brandLogo ? (
                        <BrandLogo
                          brand={point.brandLogo}
                          theme={point.brandLogoTheme}
                          decorative
                          className="h-4.5 w-4.5 opacity-90"
                        />
                      ) : point.iconSrc ? (
                        <PixelishIcon
                          src={point.iconSrc}
                          alt=""
                          size={18}
                          aria-hidden="true"
                          className="h-4.5 w-4.5 opacity-80"
                        />
                      ) : null}
                    </span>
                    <p className="text-ui-pretty text-ui-tight max-w-[18ch] font-sans text-[0.9rem] font-medium text-[#f1ebe2] sm:text-[0.92rem]">
                      {point.label}
                    </p>
                  </div>
                  {point.text ? (
                    <p className="max-w-[22rem] font-sans text-[0.98rem] leading-7 text-[#c9c1b6] sm:text-[1.02rem]">
                      {point.text}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-ui-pretty text-ui-tight font-sans text-[0.92rem] font-medium text-[#d7d0c5]">
                {HOMEPAGE_PROBLEM.stackLabel}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {HOMEPAGE_PROBLEM.stack.map((item) => (
                  <p
                    key={item.label}
                    data-testid="home-problem-stack-item"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 font-sans text-[0.82rem] font-medium tracking-[0.01em] text-[#d3ccc1] sm:whitespace-nowrap"
                  >
                    {item.brandLogo ? (
                      <BrandLogo
                        brand={item.brandLogo}
                        theme={item.brandLogoTheme}
                        decorative
                        className="h-3.5 w-3.5 opacity-90"
                      />
                    ) : item.iconSrc ? (
                      <PixelishIcon
                        src={item.iconSrc}
                        alt=""
                        size={16}
                        aria-hidden="true"
                        className="h-3.5 w-3.5 opacity-80"
                      />
                    ) : null}
                    <span>{item.label}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
