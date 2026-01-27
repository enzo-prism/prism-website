import { CaseStudySectionNav } from "@/components/case-studies/CaseStudySectionNav"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import TrackedLink from "@/components/tracked-link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
const FounderImpactGraph = dynamic(
  () => import("@/components/case-studies/FounderImpactGraph").then((m) => m.FounderImpactGraph),
  { loading: () => <Skeleton className="h-64 w-full rounded-2xl" /> }
)
const CLIENT_SITE = "https://www.towncentredental.net"

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "solution", label: "Our Solution" },
  { id: "results", label: "Results" },
] as const

export default function TownCentreDentalCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">family dentistry growth system</h1>
              <p className="text-xl text-neutral-600 lowercase">modern website, clear services, and measurable acquisition in brentwood, ca</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit towncentredental.net
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CaseStudySectionNav sections={[...sectionNav]} containerClassName="max-w-3xl" />

        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main */}
            <div className="col-span-1 lg:col-span-4">
              {/* Key points */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center border-t pt-8">
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">clear ux</div><div className="text-sm text-neutral-600 lowercase">services & team front‑and‑center</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">book fast</div><div className="text-sm text-neutral-600 lowercase">streamlined appointment paths</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">local seo</div><div className="text-sm text-neutral-600 lowercase">structured content & gmb</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">tracking</div><div className="text-sm text-neutral-600 lowercase">end‑to‑end analytics</div></div>
              </div>

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">family‑centered care, modern digital foundation</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Town Centre Dental provides comprehensive family dentistry in Brentwood, CA led by Dr. Gerard “Dr. G” Banaga and a trusted team.</p>
                  <p>We partnered to modernize their web presence—clarifying services, improving findability, and making it effortless to book.</p>
                </div>
              </section>

              {/* Challenge */}
              <section className="py-8 border-t" data-section="challenge">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the challenge</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div><h3 className="font-medium lowercase">unclear paths to care</h3><p className="text-neutral-600">services and booking were not streamlined</p></div>
                    <div><h3 className="font-medium lowercase">limited local visibility</h3><p className="text-neutral-600">search presence didn’t reflect offline reputation</p></div>
                    <div><h3 className="font-medium lowercase">no measurement</h3><p className="text-neutral-600">incomplete analytics and attribution</p></div>
                  </div>
                </div>
              </section>

              {/* Solution */}
              <section className="py-8 border-t" data-section="solution">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">our solution</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div><h3 className="font-medium lowercase">custom site</h3><p className="text-neutral-600">fast, accessible pages with family‑friendly ux</p></div>
                    <div><h3 className="font-medium lowercase">content & seo</h3><p className="text-neutral-600">preventive, cosmetic, restorative hubs with schema</p></div>
                    <div><h3 className="font-medium lowercase">conversion flows</h3><p className="text-neutral-600">primary ctas, appointment forms, and phone prompts</p></div>
                    <div><h3 className="font-medium lowercase">analytics</h3><p className="text-neutral-600">events for calls, forms, and bookings; attribution</p></div>
                  </div>
                </div>
              </section>

              {/* Results */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">results</h2>
                <div className="mb-8">
                  <FounderImpactGraph />
                </div>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">frictionless booking</span><p className="text-neutral-600 text-sm">clear paths from homepage to appointment</p></div></div>
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">local discovery</span><p className="text-neutral-600 text-sm">improved visibility for core services</p></div></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">measurable funnel</span><p className="text-neutral-600 text-sm">events and goals from click to booked visit</p></div></div>
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">team showcased</span><p className="text-neutral-600 text-sm">practice values and staff experience surfaced</p></div></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to modernize your family practice?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">let’s make it effortless to discover your services and book appointments—measurably.</p>
                  <p className="text-sm text-neutral-600 lowercase max-w-2xl mx-auto">
                    built with prism’s{" "}
                    <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                      dental practice website system
                    </Link>
                    .
                  </p>
                  <div className="pt-6">
                    <Button asChild className="rounded-full px-8 py-6 text-lg lowercase">
                      <TrackedLink
                        href="/get-started"
                        label={FREE_AUDIT_CTA_TEXT}
                        location="town centre dental case study"
                      >
                        {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                      </TrackedLink>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Nav */}
              <div className="flex justify-between py-8">
                <Link href="/case-studies"><Button variant="outline" className="rounded-full lowercase"><ArrowLeft className="mr-2 h-4 w-4" /> all case studies</Button></Link>
                <Link href="/get-started">
                  <Button variant="outline" className="rounded-full lowercase">
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Share */}
              <div className="mt-12">
                <SocialShare url="https://www.design-prism.com/case-studies/town-centre-dental" title="Town Centre Dental Case Study" description="Modern site, clear services, and measurable acquisition for a family dentistry practice." />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="town centre dental — family dentistry growth system"
        description="how we modernized web, conversion flows, and analytics to help more families find care in brentwood, ca"
        url="https://www.design-prism.com/case-studies/town-centre-dental"
        datePublished="2025-03-05T00:00:00.000Z"
        dateModified="2025-03-05T00:00:00.000Z"
        clientName="Town Centre Dental"
        outcome="clear booking flows, improved local discovery, and end‑to‑end measurement"
      />
    </div>
  )
}
