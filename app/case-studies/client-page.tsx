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

const CASE_STUDIES_HERO_VIDEO =
  'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1771353172/ocean-ascii-hq_lbqose.mp4'
const CASE_STUDIES_HERO_POSTER =
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353245/Screenshot_2026-02-17_at_10.33.32_AM_lsxdpz.webp'

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
                posterClassName="absolute inset-0 h-full w-full object-cover opacity-45 sm:hidden"
                videoClassName="pointer-events-none absolute inset-0 hidden h-full w-full object-cover opacity-40 sm:block"
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
                  Real redesigns, growth experiments, and execution playbooks
                  built with clients across dental, local, nonprofit, and
                  consulting brands.
                </p>
              </div>
            </div>

            <div className="mt-10 md:mt-12">
              <CaseStudiesList studies={CASE_STUDIES} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CollectionPageSchema
        name="Prism case studies"
        description="Growth wins from Prism clients across dental, local, nonprofit, and consulting businesses."
        url="https://www.design-prism.com/case-studies"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <ItemListSchema
        name="Prism case study highlights"
        url="https://www.design-prism.com/case-studies"
        items={CASE_STUDIES.map((study) => ({
          name: study.title,
          description: study.description,
          url: `https://www.design-prism.com/case-studies/${study.slug}`,
          itemType: 'CaseStudy',
        }))}
      />
    </div>
  )
}
