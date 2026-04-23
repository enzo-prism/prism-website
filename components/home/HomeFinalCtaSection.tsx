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
          eyebrow={HOMEPAGE_FINAL_CTA.eyebrow}
          title={HOMEPAGE_FINAL_CTA.title}
          description={HOMEPAGE_FINAL_CTA.description}
          titleClassName="max-w-[13ch]"
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

        <p className="mt-8 border-t border-white/12 pt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8f877b]">
          {HOMEPAGE_FINAL_CTA.supportLine}
        </p>
      </div>
    </section>
  )
}
