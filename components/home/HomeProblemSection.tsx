import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSplitLayoutClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { HOMEPAGE_PROBLEM } from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeProblemSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteSplitLayoutClassName}>
          <CoreSectionHeading
            title={HOMEPAGE_PROBLEM.title}
            description={HOMEPAGE_PROBLEM.description}
            className="gap-4"
            titleClassName="max-w-[17ch] lg:max-w-[19ch]"
            descriptionClassName="max-w-[30rem] text-[1rem] leading-7 sm:text-[1.08rem] sm:leading-8"
          />

          <div className="space-y-8">
            <div className="grid gap-6 border-y border-white/12 py-6 sm:grid-cols-2 xl:grid-cols-3">
              {HOMEPAGE_PROBLEM.points.map((point) => (
                <div
                  key={point.label}
                  data-testid="home-problem-point"
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]">
                      <PixelishIcon
                        src={point.iconSrc}
                        alt=""
                        size={18}
                        aria-hidden="true"
                        className="h-4.5 w-4.5 opacity-80"
                      />
                    </span>
                    <p className="font-sans text-[0.92rem] font-medium tracking-[-0.015em] text-[#f1ebe2]">
                      {point.label}
                    </p>
                  </div>
                  <p className="max-w-[22rem] font-sans text-[0.98rem] leading-7 text-[#c9c1b6] sm:text-[1.02rem]">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="font-sans text-[0.92rem] font-medium tracking-[-0.015em] text-[#d7d0c5]">
                {HOMEPAGE_PROBLEM.stackLabel}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {HOMEPAGE_PROBLEM.stack.map((item) => (
                  <p
                    key={item.label}
                    data-testid="home-problem-stack-item"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 font-sans text-[0.82rem] font-medium tracking-[0.01em] text-[#d3ccc1]"
                  >
                    <PixelishIcon
                      src={item.iconSrc}
                      alt=""
                      size={16}
                      aria-hidden="true"
                      className="h-3.5 w-3.5 opacity-80"
                    />
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
