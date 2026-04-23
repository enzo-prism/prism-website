import Link from 'next/link'
import { ArrowUpRight, PlayCircle } from 'lucide-react'

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
  HOMEPAGE_CASE_STUDY_SUMMARIES,
  HOMEPAGE_PROOF,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { CASE_STUDIES } from '@/lib/case-study-data'

const CASE_STUDY_ICONS: Record<string, string> = {
  'exquisite-dentistry': '/pixelish/emoji-happy.svg',
  'infobell-it': '/pixelish/device-monitor.svg',
  'sr4-partners': '/pixelish/briefcase.svg',
  'practice-transitions-institute': '/pixelish/document-letter.svg',
}

const HOMEPAGE_CASE_STUDIES = HOMEPAGE_CASE_STUDY_SLUGS.map((slug) =>
  CASE_STUDIES.find((study) => study.slug === slug),
)
  .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))
  .map((study) => ({
    business:
      study.slug === 'practice-transitions-institute' ? 'PTI' : study.client,
    category: study.category,
    location: study.location,
    slug: study.slug,
    description: HOMEPAGE_CASE_STUDY_SUMMARIES[study.slug] ?? study.description,
    hasExplainerVideo: Boolean(study.explainerVideo),
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
              description={HOMEPAGE_PROOF.description}
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

        <div className="mt-10 grid auto-rows-fr gap-5 lg:grid-cols-2">
          {HOMEPAGE_CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              data-home-proof-card={study.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018)_42%,rgba(0,0,0,0.2))] p-5 transition-[transform,background-color,border-color,box-shadow] hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.04] hover:shadow-[0_24px_80px_-60px_rgba(245,240,232,0.5)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:p-6"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d8bc79]/30 to-transparent opacity-70"
              />
              <div className="flex items-start justify-between gap-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <PixelishIcon
                      src={study.iconSrc}
                      alt=""
                      size={20}
                      aria-hidden="true"
                      className="h-[17px] w-[17px] opacity-80"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-[#8f877b]">
                      {study.category}
                    </p>
                    <h3 className="mt-2 truncate font-sans text-[1.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-[#f5f0e8]">
                      {study.business}
                    </h3>
                  </div>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-[#8f877b] transition-colors group-hover:border-white/24 group-hover:text-[#f5f0e8]">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <p className="mt-3 max-w-[32rem] font-sans text-[1rem] leading-7 text-[#b8afa2]">
                {study.description}
              </p>

              {study.signal ? (
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8bc79]/80">
                    {study.signal.artifact}
                  </p>
                  <p className="mt-2 font-sans text-[0.95rem] leading-6 text-[#d7d0c5]">
                    {study.signal.proof}
                  </p>
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                <p className="font-sans text-[0.76rem] font-medium uppercase tracking-[0.12em] text-[#8f877b]">
                  {study.location}
                </p>
                {study.hasExplainerVideo ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d8bc79]/20 bg-[#d8bc79]/[0.08] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#d8bc79]/85">
                    <PlayCircle className="h-3 w-3" aria-hidden="true" />
                    video
                  </span>
                ) : null}
                {study.signal ? (
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7d766a]">
                    {study.signal.outcome}
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
