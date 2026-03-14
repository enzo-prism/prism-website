"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { CaseStudyWorkHighlights } from "@/components/case-studies/CaseStudyWorkHighlights"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

const CLIENT_SITE = "https://www.canarycovehomes.com"

export default function CanarycoveCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                canary cove — building a property brand and digital presence for a boutique residential development in coastal california
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, and analytics for a boutique residential real estate development
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit canarycovehomes.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="canary-cove" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">selling a home starts long before the showing</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    canary cove is a boutique residential development in coastal california. the properties are thoughtfully designed — premium finishes, considered layouts, locations that place residents close to the water and the community amenities that make coastal living worth the premium. these aren't commodity homes. they're a specific lifestyle proposition, and selling them requires communicating that proposition in a way that creates desire before a prospect ever schedules a visit.
                  </p>
                  <p>
                    residential real estate is a category where first impressions happen online. a buyer who doesn't feel something on the website is unlikely to book a showing. the digital experience has to do the emotional work that the physical space does in person — and it has to do it with photography, copy, and design that makes the properties feel like a life upgrade, not just a transaction.
                  </p>
                  <p>
                    prism built canary cove a brand and digital presence that creates that desire — one that communicates the lifestyle and quality of the development before a prospect steps through the door.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">a premium property without a premium brand</h3>
                      <p className="text-neutral-600">the development's quality wasn't being communicated digitally. without a brand and website that matched the caliber of the homes, the development was competing on price and availability rather than on the lifestyle and quality that justified the premium.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">the consideration length problem</h3>
                      <p className="text-neutral-600">residential buyers research for months before making a decision. they visit a property website multiple times, compare options, and return to the sites that made them feel something. the canary cove site needed to be the one buyers came back to.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no local search presence</h3>
                      <p className="text-neutral-600">buyers searching for coastal california homes, new construction, or specific community features weren't finding canary cove through organic search. the site needed seo architecture to capture buyers at the research phase.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics foundation</h3>
                      <p className="text-neutral-600">without tracking, there was no visibility into which properties were generating the most interest, where prospective buyers were in the consideration process, or what content was driving inquiry.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Solution */}
              <section className="py-8 border-t" data-section="solution">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">our solution</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">brand identity system</h3>
                      <p className="text-neutral-600">we developed a visual identity that captures the essence of coastal california living — a palette of ocean blues, warm sand tones, and clean whites that communicate the natural beauty of the location. the canary cove mark is distinctive and memorable. typography and layout choices signal quality and attention to detail — the same signals buyers associate with premium construction.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we built an experience organized around the buyer's emotional journey: the lifestyle first, then the properties, then the practical details. the homepage communicates the feeling of living at canary cove before it communicates any specs. property pages combine high-quality photography, floor plans, and feature descriptions in a format that lets buyers imagine themselves in the space. a neighborhood section contextualizes the development within the broader coastal community — restaurants, parks, schools, proximity to the water. contact and inquiry flows are streamlined to capture interest at the moment of peak engagement.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to rank for the specific searches coastal california home buyers use during the research phase — new construction coastal california, boutique residential development, and community-specific searches. key pages were formatted to compete for ai-generated answer placements, recognizing that buyers increasingly use ai to research and shortlist properties before engaging directly.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics was configured to track property page engagement, inquiry form submissions, and the content paths that lead to the highest-quality prospect inquiries — giving the sales team visibility into buyer interest and the information they need to prioritize outreach.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Results */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">results</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">desire before the showing</span>
                          <p className="text-neutral-600 text-sm">the digital experience creates the emotional connection that motivates buyers to schedule a visit — prospects arrive at showings already invested in the lifestyle the development offers, not just evaluating specs.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">a brand that justifies the premium</span>
                          <p className="text-neutral-600 text-sm">the visual identity and site experience communicate the quality and lifestyle of canary cove in a way that supports premium pricing — buyers understand what they're paying for before they ask the price.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">research phase capture</span>
                          <p className="text-neutral-600 text-sm">seo architecture places canary cove in front of buyers during the research phase — building familiarity and preference before buyers begin actively scheduling showings.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">the site buyers return to</span>
                          <p className="text-neutral-600 text-sm">the experience is built for the long consideration cycle of residential buyers — properties are presented in a way that rewards repeat visits and keeps canary cove top of mind through a months-long decision process.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">buyer interest intelligence</span>
                          <p className="text-neutral-600 text-sm">analytics give the sales team visibility into which properties are generating the most engagement and where buyers are in the consideration process — enabling smarter, better-timed outreach.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Proof Links */}
              <section className="py-8 border-t" data-section="proof">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">live-page proof</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <Link href="https://www.canarycovehomes.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        canarycovehomes.com
                      </Link>{" "}
                      — full site, property listings, and inquiry experience
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a real estate brand that creates desire before the showing?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">premium properties deserve premium brands. we build the digital presences that make buyers feel something — and track results so you can optimize the inquiry pipeline.</p>
                  <div className="pt-6">
                    <Button asChild className="rounded-full px-8 py-6 text-lg lowercase">
                      <Link href="/get-started">
                        {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Nav */}
              <div className="flex justify-between py-8">
                <Link href="/case-studies">
                  <Button variant="outline" className="rounded-full lowercase">
                    <ArrowLeft className="mr-2 h-4 w-4" /> all case studies
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button variant="outline" className="rounded-full lowercase">
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Share */}
              <div className="mt-12">
                <SocialShare
                  url="https://www.design-prism.com/case-studies/canary-cove"
                  title="Canary Cove — Prism Case Study"
                  description="How Prism built a property brand and digital presence for a boutique residential development in coastal California — brand design, custom website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Canary Cove — Building a Property Brand and Digital Presence for a Boutique Residential Development"
        description="How Prism built a property brand and digital presence for a boutique residential development in coastal California — brand design, custom website, SEO/AEO, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/canary-cove"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Canary Cove"
        outcome="A property brand and digital experience that creates desire before the showing — communicating the lifestyle and quality that justify the premium and capturing buyers during the research phase."
      />
    </div>
  )
}
