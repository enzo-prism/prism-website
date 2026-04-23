import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { HOMEPAGE_FINAL_CTA } from '@/components/home/homepage-content'

export default function HomeFinalCtaSection() {
  return (
    <section className="px-4 py-20 pb-28 sm:px-6 sm:py-24">
      <div
        className={`${coreRouteContainerClassName} border-t border-white/12 pt-8 sm:pt-10`}
      >
        <CoreSectionHeading
          title={
            <span className="block text-[1.18rem] leading-[1.12] sm:text-[clamp(1.4rem,4vw,2.35rem)] sm:leading-[1.08]">
              {HOMEPAGE_FINAL_CTA.title}
            </span>
          }
          description={HOMEPAGE_FINAL_CTA.description}
          titleClassName="max-w-[30ch] lg:max-w-[32ch]"
          descriptionClassName="max-w-[42rem]"
        />

        <div className="mt-10">
          <CoreActionLink
            href="/get-started"
            label="get a free growth plan"
            location="homepage final cta"
          >
            {HOMEPAGE_FINAL_CTA.primaryCtaLabel}
          </CoreActionLink>
        </div>

        <p className="mt-8 border-t border-white/12 pt-6 font-sans text-[0.94rem] leading-7 text-[#948b80]">
          {HOMEPAGE_FINAL_CTA.supportLine}
        </p>
      </div>
    </section>
  )
}
