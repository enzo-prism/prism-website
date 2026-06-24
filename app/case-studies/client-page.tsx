import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { existsSync } from 'node:fs'
import path from 'node:path'

import Breadcrumbs from '@/components/breadcrumbs'
import CaseStudiesList from '@/components/case-studies/CaseStudiesList'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HeroBackgroundLoop from '@/components/HeroBackgroundLoop'
import {
  CollectionPageSchema,
  ItemListSchema,
} from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { CASE_STUDIES, type CaseStudyMeta } from '@/lib/case-study-data'

// Headline metrics sourced from case-study data so the hub band can never
// drift from what the detail pages publish.
const measuredHighlights = CASE_STUDIES.flatMap((study) => {
  const metric = study.structured?.results?.[0]
  return metric
    ? [{ client: study.client, slug: study.slug, metric }]
    : []
}).slice(0, 4)

function screenshotSrcFor(slug: string) {
  const assetPath = `/case-studies/${slug}-home-desktop.jpg`
  return existsSync(
    path.join(process.cwd(), 'public', assetPath.replace(/^\//, '')),
  )
    ? assetPath
    : undefined
}

// Lead with studies that carry proof: measured results first, explainer
// videos second, everything else in data order.
const proofWeight = (study: CaseStudyMeta) =>
  (study.structured?.results?.length ? 2 : 0) + (study.explainerVideo ? 1 : 0)

const orderedCaseStudies = [...CASE_STUDIES].sort(
  (a, b) => proofWeight(b) - proofWeight(a),
)

const caseStudyListItems = orderedCaseStudies.map((study) => ({
  id: study.id,
  client: study.client,
  category: study.category,
  location: study.location,
  slug: study.slug,
  description: study.description,
  clientLogo: study.clientLogo,
  hasExplainerVideo: Boolean(study.explainerVideo),
  screenshotSrc: screenshotSrcFor(study.slug),
  metric: study.structured?.results?.[0],
}))

const CASE_STUDIES_HERO_VIDEO =
  'https://res.cloudinary.com/dhqpqfw6w/video/upload/w_1280,q_auto,vc_auto/v1771353172/ocean-ascii-hq_lbqose.mp4'
const CASE_STUDIES_HERO_POSTER =
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1600/v1771353245/Screenshot_2026-02-17_at_10.33.32_AM_lsxdpz.webp'

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[
              { name: 'home', url: '/' },
              { name: 'case studies', url: '/case-studies' },
            ]}
          />
        </div>
        <section className="px-4 py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/50 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.7)]">
              <HeroBackgroundLoop
                videoSrc={CASE_STUDIES_HERO_VIDEO}
                posterSrc={CASE_STUDIES_HERO_POSTER}
              posterAlt="ASCII ocean animation preview"
                posterClassName="absolute inset-0 h-full w-full object-contain object-center opacity-52 sm:object-cover sm:opacity-45"
                videoClassName="pointer-events-none absolute inset-0 h-full w-full object-contain object-center opacity-46 sm:object-cover sm:opacity-40"
                posterUnoptimized
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/75 to-background/90"
              />
              <div className="relative z-10 mx-auto flex min-h-[300px] max-w-4xl flex-col items-center justify-center px-6 py-14 text-center sm:min-h-[360px] md:px-10 md:py-20">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
                  case studies
                </p>
                <h1 className="mt-4 text-balance text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
                  recent client work
                </h1>
                <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  One growth system for founders, doctors, and local
                  operators: websites, SEO, reviews, ads, photography, and
                  tracking that turn searches into booked patients, clients,
                  and customers.
                </p>
              </div>
            </div>

            {measuredHighlights.length > 0 ? (
              <div className="mt-8 rounded-3xl border border-border/60 bg-card/40 px-6 py-7 md:px-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  measured results · google search console
                </p>
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {measuredHighlights.map(({ client, slug, metric }) => (
                    <Link
                      key={slug}
                      href={`/case-studies/${slug}`}
                      prefetch={false}
                      className="group space-y-1.5 rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground/25"
                    >
                      <p className="text-3xl font-semibold tracking-tight text-foreground">
                        {metric.value}
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="text-xs font-medium text-muted-foreground/80 underline-offset-4 group-hover:underline">
                        {client}
                      </p>
                    </Link>
                  ))}
                </div>
                <p className="mt-6 max-w-3xl text-xs leading-5 text-muted-foreground/80">
                  How we measure: every metric quoted on this page comes from a
                  named, dated source — Google Search Console or GA4 over a
                  specific date range — and links to the case study where the
                  full context lives. When a project doesn&apos;t have measured
                  results yet, we say so instead of estimating.
                </p>
              </div>
            ) : null}

            <div className="mt-10 md:mt-12">
              <CaseStudiesList studies={caseStudyListItems} />
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-4 md:pb-20">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Want results like these?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Prism builds websites, search visibility, reviews, ads, and
              analytics as one connected growth system — then measures what
              changes.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="rounded-full px-5">
                <TrackedLink
                  href="/get-started"
                  label="Start a free growth audit from case studies hub"
                  location="case studies hub footer"
                >
                  <span className="inline-flex items-center gap-2">
                    <span>Get a free audit</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </TrackedLink>
              </Button>
              <TrackedLink
                href="/wall-of-love"
                label="Read client reviews from case studies hub"
                location="case studies hub footer"
                className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Read what clients say
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CollectionPageSchema
        name="Prism case studies"
        description="Measured client wins from Prism across dental, local business, retail, nonprofit, education, hospitality, and consulting engagements."
        url="https://www.design-prism.com/case-studies"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <ItemListSchema
        name="Prism case study highlights"
        url="https://www.design-prism.com/case-studies"
        items={orderedCaseStudies.map((study) => ({
          name: study.title,
          description: study.description,
          url: `https://www.design-prism.com/case-studies/${study.slug}`,
          // "CaseStudy" is not a real schema.org type and gets discarded; model
          // each item as an Article, matching the detail-page schema.
          itemType: 'Article',
        }))}
      />
    </div>
  )
}
