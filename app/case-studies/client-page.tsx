import Link from 'next/link'

import Breadcrumbs from '@/components/breadcrumbs'
import CaseStudiesList from '@/components/case-studies/CaseStudiesList'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HeroBackgroundLoop from '@/components/HeroBackgroundLoop'
import {
  CollectionPageSchema,
  ItemListSchema,
} from '@/components/schema-markup'
import { CASE_STUDIES } from '@/lib/case-study-data'

// Headline metrics sourced from case-study data so the hub band can never
// drift from what the detail pages publish.
const measuredHighlights = CASE_STUDIES.flatMap((study) => {
  const metric = study.structured?.results?.[0]
  return metric
    ? [{ client: study.client, slug: study.slug, metric }]
    : []
}).slice(0, 4)

const CASE_STUDIES_HERO_VIDEO =
  'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1771353172/ocean-ascii-hq_lbqose.mp4'
const CASE_STUDIES_HERO_POSTER =
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353245/Screenshot_2026-02-17_at_10.33.32_AM_lsxdpz.webp'

const dentalFirstCaseStudies = [...CASE_STUDIES].sort((a, b) => {
  if (a.category === 'dentistry' && b.category !== 'dentistry') return -1
  if (a.category !== 'dentistry' && b.category === 'dentistry') return 1
  return 0
})

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
                  Dental growth systems first: websites, SEO, reviews, ads,
                  photography, and tracking that turn patient searches into
                  booked appointments.
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
              </div>
            ) : null}

            <div className="mt-10 md:mt-12">
              <CaseStudiesList studies={dentalFirstCaseStudies} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CollectionPageSchema
        name="Prism case studies"
        description="Dental growth wins from Prism clients, with selected cross-industry proof from local, nonprofit, and consulting businesses."
        url="https://www.design-prism.com/case-studies"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <ItemListSchema
        name="Prism case study highlights"
        url="https://www.design-prism.com/case-studies"
        items={dentalFirstCaseStudies.map((study) => ({
          name: study.title,
          description: study.description,
          url: `https://www.design-prism.com/case-studies/${study.slug}`,
          itemType: 'CaseStudy',
        }))}
      />
    </div>
  )
}
