import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteIntroBandClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_SERVICE_ITEMS,
  HOMEPAGE_SERVICES,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

const HOME_SYSTEM_STEPS = ['Strategy', 'Execution', 'Measurement', 'Iteration']

export default function HomeServicesSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteIntroBandClassName}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
            <CoreSectionHeading
              title={HOMEPAGE_SERVICES.title}
              description={HOMEPAGE_SERVICES.description}
              titleClassName="max-w-[17ch] lg:max-w-[19ch]"
            />

            <p className="max-w-[31rem] font-sans text-[1rem] leading-7 text-[#d0c8bc] sm:justify-self-end">
              {HOMEPAGE_SERVICES.closingLine}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-stretch">
          <aside className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-[#d8bc79]/35 to-transparent"
            />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8bc79]/80">
              Prism operating system
            </p>
            <h3 className="mt-5 max-w-[11ch] font-sans text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#f5f0e8]">
              One connected growth loop.
            </h3>
            <p className="mt-5 max-w-[24rem] font-sans text-[1rem] leading-7 text-[#b8afa2]">
              Each channel feeds the next one, so visibility, trust, and
              conversion improve together.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {HOME_SYSTEM_STEPS.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d766a]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 font-sans text-[1rem] font-medium tracking-[-0.03em] text-[#f5f0e8]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          <div className="grid gap-4 sm:grid-cols-2">
            {HOMEPAGE_SERVICE_ITEMS.map((item) => (
              <article
                key={item.title}
                data-home-service-card={item.title}
                className="rounded-[1.35rem] border border-white/10 bg-black/20 p-5 transition-[background-color,border-color] hover:border-white/18 hover:bg-white/[0.035]"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]">
                    <PixelishIcon
                      src={item.iconSrc}
                      alt=""
                      size={18}
                      aria-hidden="true"
                      className="h-4 w-4 opacity-80"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="max-w-none text-balance font-sans text-[1.16rem] font-medium leading-[1.08] tracking-[-0.04em] text-[#f5f0e8]">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-[0.95rem] leading-7 text-[#b8afa2]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
