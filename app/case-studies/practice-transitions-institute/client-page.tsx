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

const CLIENT_SITE = "https://www.practicetransitionsinstitute.com"

export default function PracticeTransitionsInstituteCaseStudy() {
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
                practice transitions institute — building authority infrastructure for a dental transition firm with a proven process
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, local listing optimization, and analytics for a relationship-driven dental transition consultancy
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit practicetransitionsinstitute.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="practice-transitions-institute" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">from acquisition to legacy — and a website that says exactly that</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    practice transitions institute was built on a conviction that most dental transition firms get the business side right and the human side wrong. selling or buying a practice isn't just a financial event — it's a career milestone, often a life milestone. dr. michael njo founded pti to change how that process feels: less transactional, more guided; less anxious, more certain.
                  </p>
                  <p>
                    by the time pti came to prism, the firm had earned a 4.97 out of 5 rating across 35 reviews and had supported clients across 100+ dental offices throughout california. the track record was real. the team — dr. njo, coo liz armato, and transition consultant fred heppner — was experienced and tight. what pti needed was a digital presence that matched the caliber of the work: authoritative, warm, and built to convert dentists who were quietly researching their options long before they were ready to make a call.
                  </p>
                  <p>
                    prism built pti a platform that works as hard as the team does — one that earns trust before a conversation starts.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">brand-to-reality gap</h3>
                      <p className="text-neutral-600">pti's reputation outpaced its digital footprint. dentists searching for practice valuation or transition support in california weren't finding a firm that looked as credible as its reviews suggested.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">trust cycle mismatch</h3>
                      <p className="text-neutral-600">dental practice transitions are long-consideration decisions. dentists research quietly, sometimes for months, before engaging. the site wasn't built for that research phase — it didn't give cautious, self-directed buyers and sellers a reason to stay, read, and return.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local search invisibility</h3>
                      <p className="text-neutral-600">a firm based in san mateo serving practices across california had no structured local seo or listing strategy. that meant dentists in the bay area and beyond couldn't reliably find pti through organic search.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics foundation</h3>
                      <p className="text-neutral-600">without proper tracking, there was no visibility into which services were driving the most inquiry, what content was resonating with dentists at different stages of the transition timeline, or how leads were moving through the site.</p>
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
                      <p className="text-neutral-600">we developed a visual identity rooted in pti's values: integrity, expertise, and a client-first orientation. the palette — soft sage greens, deep forest tones, and warm gold accents — signals trustworthiness and calm authority. the design feels like the best version of what a dentist expects from a firm they'd trust with their life's work.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we structured the site around pti's six-stage proven process: discovery and plan, know your value, navigate the deal, transition support, protect what matters, and map your next move. each stage has its own content depth, giving dentists the information they need whether they're a seller in the early research phase or a buyer ready to move. typeform powers the contact and consultation request forms. google maps integration makes the san mateo office findable and credible. testimonials from real clients — with photos and names — are woven into the experience as trust infrastructure, not afterthoughts.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">using semrush, we identified the specific search terms dentists use when researching practice sales, valuations, and associateships in california. we built the site's content hierarchy around those queries and formatted key pages to compete for ai-generated answer placements — increasingly important as dentists use ai tools to research major decisions.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local listing optimization</h3>
                      <p className="text-neutral-600">we structured and optimized pti's local presence to ensure dentists searching for transition consultants in san mateo, the bay area, and broader california markets surface the firm consistently and accurately.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics and google search console were configured to track the full journey — from first visit through service page engagement to consultation form submission. pti now knows which services draw the most research attention, which testimonials are being read, and where in the funnel potential clients are pausing.</p>
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
                          <span className="font-semibold lowercase">a site worthy of 4.97 stars</span>
                          <p className="text-neutral-600 text-sm">pti's digital presence now reflects the firm's earned reputation. dentists who find pti through search arrive at an experience that immediately validates the decision to inquire further — clear process, visible team, real testimonials.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">long-cycle content depth</span>
                          <p className="text-neutral-600 text-sm">the site gives self-directed researchers what they need to stay engaged through a months-long consideration window: service detail, a documented process, and social proof at every stage.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">structured local authority</span>
                          <p className="text-neutral-600 text-sm">pti's local listing presence is optimized and consistent across platforms, ensuring dentists in the bay area and throughout california can find the firm across search surfaces.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">searchable for the right terms</span>
                          <p className="text-neutral-600 text-sm">the seo architecture targets the specific queries dentists actually use — practice valuation near me, selling a dental practice california, dental associateships bay area — placing pti in front of the right audience at the moment of intent.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">measurable inquiry pipeline</span>
                          <p className="text-neutral-600 text-sm">the analytics infrastructure gives pti's leadership a clear view of the site's performance as a business development tool, enabling ongoing optimization of the pages and content that convert.</p>
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
                      <Link
                        href="https://www.practicetransitionsinstitute.com"
                        className="break-words font-semibold text-neutral-900 underline underline-offset-4"
                        target="_blank"
                        rel="noreferrer"
                      >
                        practicetransitionsinstitute.com
                      </Link>{" "}
                      — full site, process pages, and testimonials
                    </li>
                    <li>
                      <Link
                        href="https://www.practicetransitionsinstitute.com"
                        className="break-all font-semibold text-neutral-900 underline underline-offset-4 sm:break-words"
                        target="_blank"
                        rel="noreferrer"
                      >
                        practicetransitionsinstitute.com/services
                      </Link>{" "}
                      — service-specific landing pages
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to make your firm's website as strong as your reputation?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">the best consulting firms in dentistry are often under-represented online. we build the digital infrastructure to match the quality of the work — and track results so you can keep improving.</p>
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
                  url="https://www.design-prism.com/case-studies/practice-transitions-institute"
                  title="Practice Transitions Institute — Prism Case Study"
                  description="How Prism built authority infrastructure for a dental transition firm with a proven process — brand, website, SEO/AEO, local listings, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Practice Transitions Institute — Building Authority Infrastructure for a Dental Transition Firm"
        description="How Prism built authority infrastructure for a dental transition firm with a proven process — brand design, custom website, SEO/AEO, local listing optimization, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/practice-transitions-institute"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Practice Transitions Institute"
        outcome="A digital presence that matches the caliber of the firm — authoritative, warm, and built to convert dentists through a long research cycle."
      />
    </div>
  )
}
