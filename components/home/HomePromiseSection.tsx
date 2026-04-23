import {
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_PROMISE,
  HOMEPAGE_PROMISE_CARDS,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomePromiseSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteContainedSectionClassName}>
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-start">
            <CoreSectionHeading
              title={HOMEPAGE_PROMISE.title}
              className="gap-4"
              titleClassName="max-w-[20ch] lg:max-w-[21ch]"
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {HOMEPAGE_PROMISE_CARDS.map((card) => (
                <article
                  key={card.title}
                  data-home-promise-card={card.title}
                  className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5 sm:p-6"
                >
                  <PixelishIcon
                    src={card.iconSrc}
                    alt=""
                    size={20}
                    aria-hidden="true"
                    className="h-[17px] w-[17px] opacity-80"
                  />
                  <h3 className="mt-5 max-w-[18ch] font-sans text-[1.55rem] font-medium leading-[1.03] tracking-[-0.05em] text-[#f5f0e8]">
                    {card.title}
                  </h3>
                  <p className="mt-4 font-sans text-[1rem] leading-7 text-[#b8afa2]">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
