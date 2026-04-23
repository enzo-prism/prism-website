import {
  CoreSectionHeading,
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
        <CoreSectionHeading
          eyebrow={HOMEPAGE_PROMISE.eyebrow}
          title={HOMEPAGE_PROMISE.title}
          titleClassName="max-w-[11ch]"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {HOMEPAGE_PROMISE_CARDS.map((card) => (
            <article
              key={card.title}
              data-home-promise-card={card.title}
              className="rounded-[1.75rem] border border-white/12 bg-white/[0.03] p-6"
            >
              <PixelishIcon
                src={card.iconSrc}
                alt=""
                size={20}
                aria-hidden="true"
                className="h-[17px] w-[17px] opacity-80"
              />
              <h3 className="mt-5 max-w-[14ch] font-sans text-[1.55rem] font-medium leading-[1.03] tracking-[-0.05em] text-[#f5f0e8]">
                {card.title}
              </h3>
              <p className="mt-4 font-sans text-[1rem] leading-7 text-[#b8afa2]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
