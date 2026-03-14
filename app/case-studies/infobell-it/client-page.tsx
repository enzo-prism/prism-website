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

const CLIENT_SITE = "https://www.infobellt.com"

export default function InfobellITCaseStudy() {
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
                infobell it — building a credible digital presence for a managed services provider competing in a trust-driven market
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, and analytics for a managed it services and cybersecurity firm
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit infobellt.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="infobell-it" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">in managed it, trust is the product</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    infobell it is a managed services provider and cybersecurity firm serving small and mid-sized businesses. the services — managed it, network management, cybersecurity, cloud solutions, and compliance support — are the kind that businesses don't think about until something goes wrong. which means the entire sales challenge is convincing a decision-maker to invest before the crisis, not after.
                  </p>
                  <p>
                    that sales challenge is fundamentally a trust challenge. a business owner handing over their it infrastructure to an outside firm is making a significant bet on competence and reliability. they're evaluating not just capability, but the kind of partner they'd want on the other end of the phone at 2am when systems go down. the website has to communicate all of that before a prospect ever picks up the phone.
                  </p>
                  <p>
                    prism built infobell it a digital presence that does exactly that — one that earns trust systematically through credibility signals, clear service articulation, and a visual identity that communicates the stability and professionalism that msp clients are actually buying.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">a capable firm with a generic presence</h3>
                      <p className="text-neutral-600">infobell it had built a strong technical capability and a track record of reliable service delivery. but the digital presence didn't communicate that — it looked like every other msp website, with no differentiation and no trust architecture that would give a skeptical business owner confidence.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">the msp trust gap</h3>
                      <p className="text-neutral-600">managed it is a category where buyers are inherently cautious. the decision to outsource infrastructure is high-stakes and hard to reverse. a website that fails to communicate competence, stability, and responsiveness doesn't just underperform — it actively loses deals to competitors who look more trustworthy, even if they aren't.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no content foundation for organic search</h3>
                      <p className="text-neutral-600">businesses searching for managed it services or cybersecurity support weren't finding infobell through organic search. the site lacked the content architecture to rank for the terms its ideal clients actually use when they're evaluating msp partners.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics infrastructure</h3>
                      <p className="text-neutral-600">without tracking, there was no visibility into which services were attracting the most prospect research, where site visitors were dropping off, or what content was driving engagement from decision-makers.</p>
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
                      <p className="text-neutral-600">we developed a visual identity built around the core values msp clients are actually buying: reliability, professionalism, and calm competence. deep navy blues, clean whites, and precise typography signal the kind of organized, systematic firm that a business owner wants managing their infrastructure. the identity is distinctive in the msp category — professional without being cold, technical without being inaccessible.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we built the site around the decision-making journey of a business owner evaluating an msp: what services do you offer, what does working with you actually look like, who are your clients, and how do i get started? service pages for managed it, network management, cybersecurity, cloud solutions, and compliance articulate not just what infobell does, but why it matters and what a business gets from having it handled properly. client testimonials and a clearly communicated service model build the confidence that converts a skeptical prospect into an inquiry. a streamlined contact flow makes taking the next step frictionless.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we built the site's content architecture around the terms businesses actually use when searching for managed it and cybersecurity support. we also formatted key pages to compete for ai-generated answer placements — increasingly important as decision-makers use ai tools to research and evaluate msp options before engaging directly.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics and search console were configured to track prospect engagement across service areas — giving infobell visibility into which services attract the most research attention and where high-value prospects are in the evaluation process.</p>
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
                          <span className="font-semibold lowercase">a presence that earns msp trust</span>
                          <p className="text-neutral-600 text-sm">infobell's digital presence now communicates the reliability and professionalism that msp clients are actually evaluating — prospects arrive at a site that immediately signals the right kind of partner.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">service clarity at every stage</span>
                          <p className="text-neutral-600 text-sm">each service area is articulated clearly — not just what it is, but why it matters and what a business gets from having it managed properly. prospects can quickly understand the full scope of infobell's capabilities and identify the services they need.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">organic search foundation</span>
                          <p className="text-neutral-600 text-sm">the content architecture and seo foundation place infobell in front of businesses actively researching managed it and cybersecurity options — building a channel for inbound prospect discovery.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">differentiated in a crowded category</span>
                          <p className="text-neutral-600 text-sm">the visual identity and site experience distinguish infobell from the generic msp website landscape — creating a memorable, credible impression that stands out in a category where most competitors look the same.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">prospect pipeline visibility</span>
                          <p className="text-neutral-600 text-sm">analytics give infobell visibility into which service areas attract the most decision-maker research — enabling smarter content investment and business development prioritization.</p>
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
                      <Link href="https://www.infobellt.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        infobellt.com
                      </Link>{" "}
                      — full site, service pages, and client testimonials
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build an it services website that earns the right kind of trust?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">managed it is a trust category. we build the digital presences that communicate reliability, competence, and the kind of partnership business owners actually want before they're ever in a crisis.</p>
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
                  url="https://www.design-prism.com/case-studies/infobell-it"
                  title="Infobell IT — Prism Case Study"
                  description="How Prism built a credible digital presence for a managed services provider — brand design, custom website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Infobell IT — Building a Credible Digital Presence for a Managed Services Provider"
        description="How Prism built a credible digital presence for a managed services provider competing in a trust-driven market — brand design, custom website, SEO/AEO, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/infobell-it"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Infobell IT"
        outcome="A credible, trust-building digital presence that earns msp client confidence and drives inbound prospect discovery through organic search."
      />
    </div>
  )
}
