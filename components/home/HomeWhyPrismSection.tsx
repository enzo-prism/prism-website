import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_DIFFERENTIATORS,
  HOMEPAGE_WHY_PRISM,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeWhyPrismSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <CoreSectionHeading
            eyebrow={HOMEPAGE_WHY_PRISM.eyebrow}
            title={HOMEPAGE_WHY_PRISM.title}
            titleClassName="max-w-[11ch]"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {HOMEPAGE_DIFFERENTIATORS.map((item) => (
              <article
                key={item.title}
                className="border-t border-white/12 pt-5 last:sm:col-span-2"
              >
                <PixelishIcon
                  src={item.iconSrc}
                  alt=""
                  size={18}
                  aria-hidden="true"
                  className="h-[15px] w-[15px] opacity-80"
                />
                <h3 className="mt-4 font-sans text-[1.22rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
