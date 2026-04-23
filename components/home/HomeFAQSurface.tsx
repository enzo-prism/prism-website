import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeFAQSection from '@/components/home/home-faq-section'
import { HOMEPAGE_FAQ_ITEMS } from '@/components/home/homepage-content'

export default function HomeFAQSurface() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={`${coreRouteContainerClassName} max-w-4xl`}>
        <CoreSectionHeading
          eyebrow="questions"
          title="Questions business owners usually ask"
          align="center"
          className="items-center"
          titleClassName="max-w-[18ch] lg:max-w-[20ch]"
        />
        <div className="mt-12">
          <HomeFAQSection faqItems={HOMEPAGE_FAQ_ITEMS} tone="dark" />
        </div>
      </div>
    </section>
  )
}
