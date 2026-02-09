import { CaseStudySectionNav } from "@/components/case-studies/CaseStudySectionNav"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import TrackedLink from "@/components/tracked-link"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
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
const CLIENT_SITE = "https://famfirstsmile.com/"

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "solution", label: "Our Solution" },
  { id: "results", label: "Results" },
] as const

export default function FamilyFirstSmileCareCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">family‑focused website for family first smile care</h1>
              <p className="text-xl text-neutral-600 lowercase">clear services, comfort highlights, and conversion‑friendly flows</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit famfirstsmile.com
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
              {/* Key Points */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center border-t pt-8">
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">services</div><div className="text-sm text-neutral-600 lowercase">clear hubs for care categories</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">comforts</div><div className="text-sm text-neutral-600 lowercase">amenities surfaced for families</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">access</div><div className="text-sm text-neutral-600 lowercase">calls, forms, and directions</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">tracking</div><div className="text-sm text-neutral-600 lowercase">events and attribution</div></div>
              </div>

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">family‑first by design</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>Family First Smile Care provides comprehensive dental care for patients of all ages with a family‑oriented approach.</p>
                  <p>We designed a modern website that makes it easy to understand services, appreciate office amenities, and book care quickly.</p>
                </div>
              </section>

              {/* Challenge */}
              <section className="py-8 border-t" data-section="challenge">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the challenge</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div><h3 className="font-medium lowercase">unclear service structure</h3><p className="text-neutral-600">patients couldn’t easily find what they needed</p></div>
                    <div><h3 className="font-medium lowercase">comforts hidden</h3><p className="text-neutral-600">amenities and technology not highlighted</p></div>
                    <div><h3 className="font-medium lowercase">limited conversion</h3><p className="text-neutral-600">paths to call or book were not prioritized</p></div>
                  </div>
                </div>
              </section>

              {/* Solution */}
              <section className="py-8 border-t" data-section="solution">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">our solution</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div><h3 className="font-medium lowercase">service hubs</h3><p className="text-neutral-600">grouped preventive, cosmetic, and restorative content</p></div>
                    <div><h3 className="font-medium lowercase">comforts & tech</h3><p className="text-neutral-600">amenities (blankets, water, wifi) and CBCT/digital X‑rays</p></div>
                    <div><h3 className="font-medium lowercase">conversion system</h3><p className="text-neutral-600">prominent phone, forms, and directions; clear CTAs</p></div>
                    <div><h3 className="font-medium lowercase">analytics</h3><p className="text-neutral-600">event tracking for calls, forms, and bookings</p></div>
                  </div>
                </div>
              </section>

              {/* Results */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">results</h2>
                <div className="mb-8">
                  <FounderImpactGraph />
                </div>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <PixelishIcon
                          src="/pixelish/checkmark.svg"
                          alt=""
                          size={16}
                          invert={false}
                          aria-hidden="true"
                          className="mt-1 opacity-90 dark:invert"
                        />
                        <div>
                          <span className="font-semibold lowercase">clarity</span>
                          <p className="text-neutral-600 text-sm">patients navigate to the right services faster</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <PixelishIcon
                          src="/pixelish/checkmark.svg"
                          alt=""
                          size={16}
                          invert={false}
                          aria-hidden="true"
                          className="mt-1 opacity-90 dark:invert"
                        />
                        <div>
                          <span className="font-semibold lowercase">comfort</span>
                          <p className="text-neutral-600 text-sm">family‑friendly amenities surfaced throughout</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <PixelishIcon
                          src="/pixelish/checkmark.svg"
                          alt=""
                          size={16}
                          invert={false}
                          aria-hidden="true"
                          className="mt-1 opacity-90 dark:invert"
                        />
                        <div>
                          <span className="font-semibold lowercase">access</span>
                          <p className="text-neutral-600 text-sm">improved call, form, and directions flows</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <PixelishIcon
                          src="/pixelish/checkmark.svg"
                          alt=""
                          size={16}
                          invert={false}
                          aria-hidden="true"
                          className="mt-1 opacity-90 dark:invert"
                        />
                        <div>
                          <span className="font-semibold lowercase">measurement</span>
                          <p className="text-neutral-600 text-sm">events and attribution for optimization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a family‑friendly site?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">let’s make services clear, comforts visible, and booking effortless—backed by tracking.</p>
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
                        location="family first smile care case study"
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
                <SocialShare url="https://www.design-prism.com/case-studies/family-first-smile-care" title="Family First Smile Care Case Study" description="Family‑focused website with services clarity, comforts, and conversion‑friendly flows." />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="family first smile care — family‑focused website"
        description="how we designed a modern site with clear services, office comforts, and measurable conversion flows"
        url="https://www.design-prism.com/case-studies/family-first-smile-care"
        datePublished="2025-03-05T00:00:00.000Z"
        dateModified="2025-03-05T00:00:00.000Z"
        clientName="Family First Smile Care"
        outcome="improved service discovery, visible comforts, stronger conversion paths, and analytics"
      />
    </div>
  )
}
