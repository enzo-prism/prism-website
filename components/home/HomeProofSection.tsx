import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteIntroBandClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_CASE_STUDY_SLUGS,
  HOMEPAGE_CASE_STUDY_SIGNALS,
  HOMEPAGE_PROOF,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { CASE_STUDIES } from '@/lib/case-study-data'

const CASE_STUDY_ICONS: Record<string, string> = {
  'dr-christopher-wong': '/pixelish/arrow-refresh.svg',
  'exquisite-dentistry': '/pixelish/award-checkmark.svg',
  'olympic-bootworks': '/pixelish/handbag.svg',
  'roseville-dental-academy': '/pixelish/kanban.svg',
  'rebellious-aging': '/pixelish/emoji-heart.svg',
  'saorsa-growth-partners': '/pixelish/briefcase.svg',
  'belize-kids-foundation': '/pixelish/award-plus.svg',
  'canary-cove': '/pixelish/house.svg',
}

const HOMEPAGE_CASE_STUDIES = HOMEPAGE_CASE_STUDY_SLUGS.map((slug) =>
  CASE_STUDIES.find((study) => study.slug === slug),
)
  .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))
  .map((study) => ({
    business:
      study.slug === 'practice-transitions-institute' ? 'PTI' : study.client,
    category: study.category,
    slug: study.slug,
    signal: HOMEPAGE_CASE_STUDY_SIGNALS[study.slug],
    iconSrc: CASE_STUDY_ICONS[study.slug] ?? '/pixelish/lens-plus.svg',
  }))

export default function HomeProofSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteIntroBandClassName}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <CoreSectionHeading
              title={HOMEPAGE_PROOF.title}
              description={HOMEPAGE_PROOF.description || undefined}
              titleClassName="max-w-[17ch] lg:max-w-[19ch]"
              descriptionClassName="max-w-[40rem]"
            />

            <CoreActionLink
              href="/case-studies"
              label="see client results"
              location="homepage proof"
              variant="secondary"
            >
              {HOMEPAGE_PROOF.ctaLabel}
            </CoreActionLink>
          </div>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOMEPAGE_CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              data-home-proof-card={study.slug}
              className="group relative flex h-full min-h-40 flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.014)_45%,rgba(0,0,0,0.18))] p-4 transition-[transform,background-color,border-color,box-shadow] hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.04] hover:shadow-[0_24px_80px_-60px_rgba(245,240,232,0.5)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d8bc79]/30 to-transparent opacity-70"
              />
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <PixelishIcon
                      src={study.iconSrc}
                      alt=""
                      size={20}
                      aria-hidden="true"
                      className="h-[17px] w-[17px] opacity-80"
                    />
                  </div>
                  <h3 className="mt-5 font-sans text-[1.12rem] font-medium leading-[1.05] tracking-[-0.04em] text-[#f5f0e8]">
                    {study.business}
                  </h3>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-[#8f877b] transition-colors group-hover:border-white/24 group-hover:text-[#f5f0e8]">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <p className="mt-auto border-t border-white/10 pt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8f877b]">
                {study.signal?.outcome ?? study.category}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
