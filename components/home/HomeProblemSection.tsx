import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSplitLayoutClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import BrandLogo from '@/components/brand-logo'
import { HOMEPAGE_PROBLEM } from '@/components/home/homepage-content'
import HomeReveal from '@/components/home/HomeReveal'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeProblemSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div
          className={`${coreRouteSplitLayoutClassName} xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]`}
        >
          <HomeReveal className="flex flex-col gap-6">
            <CoreSectionHeading
              eyebrow={HOMEPAGE_PROBLEM.eyebrow}
              title={HOMEPAGE_PROBLEM.title}
              description={HOMEPAGE_PROBLEM.description}
              className="gap-4"
              titleClassName="max-w-[15ch] lg:max-w-[16ch]"
              descriptionClassName="max-w-[30rem] text-pretty text-[1rem] leading-7 sm:text-[1.08rem] sm:leading-8"
            />

            <p className="max-w-[26rem] border-l-2 border-[#d8bc79]/60 pl-4 font-sans text-[1.02rem] leading-7 text-[#e7e0d4] sm:text-[1.08rem]">
              {HOMEPAGE_PROBLEM.closingLine}
            </p>
          </HomeReveal>

          <HomeReveal delay={120} className="space-y-7">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/35 p-3 sm:p-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_12%,rgba(216,188,121,0.09),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_46%)]"
              />

              {/* Buyer-journey rail: a quiet signal line connecting every check. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-10 left-[2.45rem] top-10 w-px bg-gradient-to-b from-transparent via-white/14 to-transparent sm:left-[2.7rem]"
              >
                <span className="home-rail-flow absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-[#d8bc79]/80 to-transparent shadow-[0_0_12px_rgba(216,188,121,0.55)]" />
              </div>

              <ol className="relative">
                {HOMEPAGE_PROBLEM.points.map((point, index) => (
                  <li
                    key={point.label}
                    data-testid="home-problem-point"
                    className="group rounded-[1.25rem] border border-transparent p-3 transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/12 hover:bg-white/[0.03] motion-reduce:transition-none sm:p-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#d8bc79]/45 group-hover:shadow-[0_0_28px_-14px_rgba(216,188,121,0.85)] motion-reduce:transition-none sm:h-12 sm:w-12">
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

                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-ui-pretty font-sans text-[1.02rem] font-medium tracking-[-0.02em] text-[#f1ebe2] sm:text-[1.08rem]">
                            {point.label}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="font-mono text-[10px] font-semibold tracking-[0.22em] text-[#5f594f] transition-colors group-hover:text-[#d8bc79]/75"
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        {point.text ? (
                          <p className="mt-1.5 max-w-[30rem] text-pretty font-sans text-[0.92rem] leading-6 text-[#a8a092]">
                            {point.text}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
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
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 font-sans text-[0.82rem] font-medium tracking-[0.01em] text-[#d3ccc1] transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#d8bc79]/35 hover:bg-white/[0.055] motion-reduce:transition-none sm:whitespace-nowrap"
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
          </HomeReveal>
        </div>
      </div>
    </section>
  )
}
