import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_HOW_IT_WORKS,
  HOMEPAGE_HOW_IT_WORKS_STEPS,
} from '@/components/home/homepage-content'

export default function HomeHowItWorksSection() {
  return (
    <section id="how-it-works" className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteContainedSectionClassName}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <CoreSectionHeading
              title={HOMEPAGE_HOW_IT_WORKS.title}
              titleClassName="max-w-[16ch] lg:max-w-[18ch]"
            />

            <CoreActionLink
              href="/get-started"
              label="get my free growth plan"
              location="homepage how it works"
            >
              {HOMEPAGE_HOW_IT_WORKS.ctaLabel}
            </CoreActionLink>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {HOMEPAGE_HOW_IT_WORKS_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6"
              >
                <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-[#7d7569]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 max-w-[19ch] font-sans text-[1.45rem] font-medium leading-[1.04] tracking-[-0.05em] text-[#f5f0e8]">
                  {step.title}
                </h3>
                <p className="mt-4 font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
