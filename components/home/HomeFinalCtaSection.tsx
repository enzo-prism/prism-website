import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_CTA_NOTES,
  HOMEPAGE_FINAL_CTA,
} from '@/components/home/homepage-content'

export default function HomeFinalCtaSection() {
  return (
    <section className="px-4 py-20 pb-28 sm:px-6 sm:py-24">
      <div className={coreRouteContainerClassName}>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] p-6 sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(216,188,121,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)]"
          />
          <div className="relative z-10 max-w-[48rem]">
            <CoreSectionHeading
              title={
                <span className="block text-[clamp(2rem,5vw,4.1rem)] leading-[0.98] tracking-[-0.055em]">
                  {HOMEPAGE_FINAL_CTA.title}
                </span>
              }
              description={HOMEPAGE_FINAL_CTA.description}
              titleClassName="max-w-[16ch] lg:max-w-[18ch]"
              descriptionClassName="max-w-[42rem]"
            />

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <CoreActionLink
                href="/get-started"
                label="start free growth audit"
                location="homepage final cta"
                variant="heroPrimary"
              >
                {HOMEPAGE_FINAL_CTA.primaryCtaLabel}
              </CoreActionLink>
              {HOMEPAGE_FINAL_CTA.supportLine ? (
                <p className="font-sans text-[0.94rem] leading-7 text-[#948b80]">
                  {HOMEPAGE_FINAL_CTA.supportLine}
                </p>
              ) : null}
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5 border-t border-white/10 pt-5">
              {HOMEPAGE_CTA_NOTES.map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-white/12 bg-black/20 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f877b]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
