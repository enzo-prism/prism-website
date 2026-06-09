import {
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { HOMEPAGE_GROWTH_RAMP } from '@/components/home/homepage-content'
import HomeCountUp from '@/components/home/HomeCountUp'
import HomeReveal from '@/components/home/HomeReveal'

export default function HomeProofBandSection() {
  return (
    <section className={coreRouteSectionCompactClassName}>
      <div className={coreRouteContainerClassName}>
        <HomeReveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/12 bg-black/35 p-5 shadow-[0_30px_90px_-72px_rgba(216,188,121,0.82)] sm:p-6 lg:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(216,188,121,0.16),transparent_31%),radial-gradient(circle_at_86%_12%,rgba(245,240,232,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-[#d8bc79]/55 to-transparent" />
              <span className="home-scan-line absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#f5f0e8]/80 to-transparent" />
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
              <div className="flex min-h-full flex-col justify-between gap-8 border-b border-white/10 pb-7 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#d8bc79]/80">
                    {HOMEPAGE_GROWTH_RAMP.eyebrow}
                  </p>
                  <h2 className="mt-5 max-w-[9ch] text-balance font-sans text-[34px] font-medium leading-none tracking-[-0.06em] text-[#f5f0e8] sm:text-[52px] lg:text-[72px]">
                    {HOMEPAGE_GROWTH_RAMP.title}
                  </h2>
                </div>

                <div>
                  <p className="max-w-[18rem] font-sans text-[1.05rem] leading-6 tracking-[-0.02em] text-[#d8d0c5] sm:text-[1.16rem] sm:leading-7">
                    {HOMEPAGE_GROWTH_RAMP.microcopy}
                  </p>
                  <p className="mt-5 max-w-[21rem] font-sans text-[0.82rem] leading-5 text-[#8f877b]">
                    {HOMEPAGE_GROWTH_RAMP.finePrint}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-[1.35rem] top-6 bottom-6 w-px bg-linear-to-b from-[#d8bc79]/0 via-[#d8bc79]/35 to-[#d8bc79]/0 md:left-0 md:right-0 md:top-[2.15rem] md:bottom-auto md:h-px md:w-auto md:bg-linear-to-r"
                />

                <div className="grid gap-3 md:grid-cols-3">
                  {HOMEPAGE_GROWTH_RAMP.metrics.map((metric) => (
                    <article
                      key={metric.day}
                      data-home-ramp-metric={metric.day}
                      className="relative rounded-[1.35rem] border border-white/12 bg-black/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-[border-color,background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#d8bc79]/35 hover:bg-white/[0.045] hover:shadow-[0_26px_70px_-55px_rgba(216,188,121,0.8)] motion-reduce:transition-none sm:p-6"
                    >
                      <div className="mb-7 flex items-center gap-3 md:mb-8 md:block">
                        <span className="relative z-10 inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-[#d8bc79]/45 bg-black px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8bc79] shadow-[0_0_34px_-16px_rgba(216,188,121,0.9)] md:h-12">
                          {metric.day}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-px flex-1 bg-white/10 md:hidden"
                        />
                      </div>

                      <p className="font-sans text-[44px] font-medium leading-none tracking-[-0.065em] text-[#f5f0e8] sm:text-[52px] lg:text-[60px]">
                        <HomeCountUp value={metric.value} />
                      </p>
                      <p className="mt-4 max-w-[12rem] font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8bc79]/85">
                        {metric.label}
                      </p>
                      <p className="mt-4 max-w-[16rem] font-sans text-[0.88rem] leading-6 text-[#a8a092]">
                        {metric.detail}
                      </p>
                    </article>
                  ))}
                </div>

                <p className="sr-only">
                  Prism targets a first 90 day growth ramp for businesses: day
                  30, plus 25 percent qualified actions; day 60, plus 50
                  percent qualified demand; day 90, 10 to 30 growth
                  opportunities per month.
                </p>
              </div>
            </div>
          </div>
        </HomeReveal>
      </div>
    </section>
  )
}
