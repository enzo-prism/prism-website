import {
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeDentistWinsCarousel from '@/components/home/HomeDentistWinsCarousel'
import { HOMEPAGE_DENTIST_WINS } from '@/components/home/homepage-content'

export default function HomeDentistWinsSection() {
  return (
    <section className={coreRouteSectionCompactClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[#797165]">
              {HOMEPAGE_DENTIST_WINS.eyebrow}
            </p>
            <div
              role="heading"
              aria-level={2}
              className="font-sans text-[1.8rem] font-medium leading-[1.02] tracking-[-0.035em] text-[#f5f0e8] sm:whitespace-nowrap sm:text-[2.15rem] lg:text-[2.45rem]"
            >
              {HOMEPAGE_DENTIST_WINS.title}
            </div>
          </div>

          <HomeDentistWinsCarousel slides={HOMEPAGE_DENTIST_WINS.slides} />
        </div>
      </div>
    </section>
  )
}
