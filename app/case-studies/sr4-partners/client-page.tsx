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

const CLIENT_SITE = "https://www.sr4partners.com"

export default function SR4PartnersCaseStudy() {
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
                sr4 partners — building a digital presence for a human-centered business consultancy that helps organizations win through people
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand refresh, custom website, seo/aeo, and analytics for a leadership and organizational development consultancy
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit sr4partners.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="sr4-partners" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the consultancy that knows culture is the strategy</h2>
2              <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    sr4 partners was founded on a conviction that most business performance problems are people problems in disguise. revenue shortfalls, execution gaps, retention crises — trace them back far enough, and you typically find a culture issue, a leadership gap, or a misalignment between what an organization says it values and how it actually operates.
                  </p>
                  <p>
                    the firm's name comes from the four vectors of organizational success the partners identified through decades of combined experience: strategy, results, relationships, and resilience — or sr4. the work spans executive coaching, team effectiveness, culture transformation, and organizational design. clients range from mid-market companies to enterprise organizations navigating significant change.
                  </p>
                  <p>
                    when sr4 came to prism, the firm had a strong body of work and a distinctive point of view — but a digital presence that didn't communicate either. prism rebuilt that presence from the ground up: a brand refresh that honors the firm's heritage while modernizing its expression, and a website that communicates sr4's methodology and value proposition with the clarity that the firm's own work demands.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">a strong methodology without a clear expression</h3>
                      <p className="text-neutral-600">sr4 had developed a distinctive approach to organizational development over years of client work. but the existing website communicated generic "consulting" rather than a specific, differentiated methodology. prospects couldn't quickly understand what made sr4 different or what working with them would actually look like.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">brand expression that had aged out</h3>
                      <p className="text-neutral-600">the firm's visual identity no longer reflected the caliber of the work or the sophistication of the clients. a brand refresh was needed — one that respected the firm's history while updating its expression for a modern professional audience.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no content foundation for search</h3>
                      <p className="text-neutral-600">organizations searching for executive coaching, culture transformation, or organizational development support couldn't find sr4 through organic search. the site lacked the content architecture to rank for the terms sr4's ideal clients actually use.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics visibility</h3>
                      <p className="text-neutral-600">without tracking, the firm had no visibility into which service areas were attracting the most prospect research, where site visitors were dropping off, or what content was driving engagement from the right audience.</p>
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
                      <h3 className="font-medium lowercase">brand refresh</h3>
                      <p className="text-neutral-600">we refreshed sr4's visual identity — evolving the brand rather than replacing it. the updated palette, typography, and visual language communicate the firm's sophistication and human-centered approach while maintaining continuity for existing clients and stakeholders. the result is a brand that feels current, credible, and distinctly sr4.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we structured the site around sr4's methodology and service areas: executive coaching, team effectiveness, culture transformation, and organizational design. each service page articulates what sr4 does, who it's for, and what outcomes clients can expect — giving prospects the information they need to self-identify as the right fit. the about section communicates the firm's founding philosophy and the partners' combined experience in a way that builds credibility without feeling like a corporate biography. a contact flow optimized for high-value b2b inquiry makes it easy for the right prospects to take the next step.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we built the site's content architecture around the terms organizations actually use when searching for sr4's services — executive coaching firms, organizational development consultants, culture transformation, team effectiveness consulting. we also formatted key pages to compete for ai-generated answer placements, which are increasingly the first touchpoint for senior leaders researching consulting partners.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics and search console were configured to track prospect engagement across service areas — giving sr4 visibility into which offerings attract the most research attention and where high-value prospects are in the evaluation process.</p>
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
                          <span className="font-semibold lowercase">a brand that matches the work</span>
                          <p className="text-neutral-600 text-sm">the refreshed identity and new website give sr4 a digital presence that communicates the firm's caliber — prospects encounter a credible, sophisticated experience that immediately positions sr4 as a serious consulting partner.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">methodology made legible</span>
                          <p className="text-neutral-600 text-sm">sr4's distinctive approach to organizational development is now clearly communicated — prospects can quickly understand what makes sr4 different, what the work involves, and whether it's the right fit for their organization.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">organic search foundation</span>
                          <p className="text-neutral-600 text-sm">the content architecture and seo foundation place sr4 in front of organizations actively researching the firm's service areas — building a channel for inbound prospect discovery that didn't exist before.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">prospect self-qualification</span>
                          <p className="text-neutral-600 text-sm">the clarity of the service pages and methodology content helps the right prospects self-identify and take action — while filtering out organizations that aren't the right fit, improving the quality of inbound inquiry.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">service area intelligence</span>
                          <p className="text-neutral-600 text-sm">analytics give sr4 visibility into which service areas attract the most prospect research — enabling smarter decisions about content investment, business development focus, and where to deepen the firm's digital footprint.</p>
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
                      <Link href="https://www.sr4partners.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        sr4partners.com
                      </Link>{" "}
                      — full site, methodology, service pages, and team
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a consulting website that communicates your methodology?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">the best consulting firms have a distinctive point of view — but that point of view needs a digital presence that communicates it clearly. we build the websites that make sophisticated work legible to the right audience.</p>
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
                  url="https://www.design-prism.com/case-studies/sr4-partners"
                  title="SR4 Partners — Prism Case Study"
                  description="How Prism built a digital presence for a human-centered business consultancy — brand refresh, custom website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="SR4 Partners — Building a Digital Presence for a Human-Centered Business Consultancy"
        description="How Prism built a digital presence for a human-centered business consultancy that helps organizations win through people — brand refresh, custom website, SEO/AEO, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/sr4-partners"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="SR4 Partners"
        outcome="A credible, sophisticated digital presence that communicates sr4's distinctive methodology and attracts the right organizational clients through organic search."
      />
    </div>
  )
}
