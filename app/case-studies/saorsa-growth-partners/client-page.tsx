import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CASE_STUDIES } from "@/lib/case-study-data"
import dynamic from "next/dynamic"
import Link from "next/link"

const FounderImpactGraph = dynamic(
  () => import("@/components/case-studies/FounderImpactGraph").then((m) => m.FounderImpactGraph),
  { loading: () => <Skeleton className="h-64 w-full rounded-2xl" /> }
)

const CASE_STUDY_SLUG = "saorsa-growth-partners"
const CANONICAL_URL = `https://www.design-prism.com/case-studies/${CASE_STUDY_SLUG}`
const caseStudy = CASE_STUDIES.find((study) => study.slug === CASE_STUDY_SLUG)
const schemaTitle = caseStudy?.title ?? "Growth Systems for a Boutique Consultancy"
const schemaDescription =
  caseStudy?.description ?? "Clarity, credibility, and lead capture for a focused advisory firm."
const schemaClient = caseStudy?.client ?? "Saorsa Growth Partners"
const schemaImage = caseStudy?.structured?.heroImage ?? "https://www.design-prism.com/prism-opengraph.png"

export default function SaorsaGrowthPartnersCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4 md:px-6 space-y-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">case study</p>
            <h1 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">Saorsa Growth Partners</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 lowercase">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 font-semibold text-neutral-800">
                consulting
              </span>
              <span>San Francisco, CA</span>
            </div>
            <p className="text-neutral-600 text-base md:text-lg lowercase">
              Clarity, credibility, and lead capture for a boutique advisory firm—fast-loading pages, concise offers,
              and inquiry paths that surface the right work.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm text-neutral-600 lowercase">
              <span className="rounded-full bg-neutral-100 px-3 py-1">messaging clarity</span>
              <span className="rounded-full bg-neutral-100 px-3 py-1">services overview</span>
              <span className="rounded-full bg-neutral-100 px-3 py-1">fast contact paths</span>
            </div>
            <div className="pt-6">
              <Button asChild className="rounded-full lowercase">
                <Link href="/contact">start a project</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl space-y-6 px-4 md:px-6">
            <FounderImpactGraph />
          </div>
        </section>
      </main>
      <Footer />
      <CaseStudySchema
        title={schemaTitle}
        description={schemaDescription}
        url={CANONICAL_URL}
        imageUrl={schemaImage}
        datePublished={caseStudy?.structured?.datePublished}
        dateModified={caseStudy?.structured?.dateModified}
        clientName={schemaClient}
        outcome={caseStudy?.structured?.outcomes?.[0]}
      />
    </div>
  )
}
