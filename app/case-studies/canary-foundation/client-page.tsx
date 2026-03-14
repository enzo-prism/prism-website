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

const CLIENT_SITE = "https://www.canaryfoundation.org"

export default function CanaryFoundationCaseStudy() {
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
                canary foundation — building a mission-driven digital presence for a nonprofit pioneering early cancer detection
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, and analytics for a nonprofit advancing cancer detection through early-stage research
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit canaryfoundation.org
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="canary-foundation" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the mission is urgent — the website should feel that way</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    canary foundation is a nonprofit dedicated to advancing early detection of cancer — the period when treatment is most effective and survival rates are highest. the organization funds research, supports scientists working on detection technology, and builds the case that early detection isn't just a medical priority, it's a solvable problem.
                  </p>
                  <p>
                    the challenge with mission-driven organizations is that the importance of the work doesn't automatically translate into a compelling digital experience. a site that's technically accurate but emotionally flat fails donors, fails scientists who might partner with the foundation, and fails the mission. canary needed a website that communicated the urgency and hope of early detection research in a way that moved people to act.
                  </p>
                  <p>
                    prism built canary foundation a digital presence that matches the importance of the work — one that communicates the mission clearly, earns donor trust, and drives the engagement that sustains the research.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">important work, underpowered presence</h3>
                      <p className="text-neutral-600">canary foundation was doing significant research work, but the digital presence didn't communicate the urgency or importance of that work. the site wasn't earning the attention or donor engagement that the mission deserved.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">donor trust and conversion</h3>
                      <p className="text-neutral-600">donors evaluating a nonprofit want to understand exactly what their contribution enables. a site that's vague about research impact or donation use fails to convert interested visitors into committed donors. the conversion architecture needed to be explicit and compelling.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">research community reach</h3>
                      <p className="text-neutral-600">beyond donors, canary needed to reach scientists and research institutions who might collaborate, contribute, or bring new early-detection approaches to the foundation's attention. the site needed to serve a professional research audience as well as a general donor audience.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics foundation</h3>
                      <p className="text-neutral-600">without tracking, the foundation had no visibility into how donors were engaging with the site, which content was driving the most research interest, or where the donation conversion funnel had friction.</p>
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
                      <p className="text-neutral-600">we developed a visual identity that balances hope and urgency — the emotional register that early cancer detection work actually occupies. warm golds and deep blues create a palette that feels both optimistic and serious. the canary imagery — a nod to the canary in the coal mine, the sentinel that detects danger before it becomes catastrophic — is carried through the visual language in a way that's distinctive without being heavy-handed.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we structured the site to serve both donor and research audiences: a clear mission statement and impact narrative for donors; research program descriptions and collaboration pathways for the scientific community. donation pages are built to convert — clear impact statements, transparent fund use, and frictionless giving flows. the research section communicates the foundation's scientific rigor and the real-world implications of the detection work being funded.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to surface for searches around early cancer detection, cancer research nonprofits, and cancer detection funding — capturing both donors searching for meaningful giving opportunities and researchers exploring funding and collaboration channels.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics was configured to track donor engagement, research content consumption, and donation conversion — giving the foundation visibility into what's driving the most meaningful engagement and where the giving funnel has room to improve.</p>
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
                          <span className="font-semibold lowercase">a presence worthy of the mission</span>
                          <p className="text-neutral-600 text-sm">canary foundation's digital presence now communicates the urgency and hope of early detection research — donors and scientists arrive at an experience that makes the importance of the work immediately clear.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">donor conversion architecture</span>
                          <p className="text-neutral-600 text-sm">the donation experience is structured to convert — clear impact statements, transparent fund use, and frictionless giving flows give donors the confidence and clarity they need to commit.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">research community reach</span>
                          <p className="text-neutral-600 text-sm">the site serves the scientific community with program descriptions and collaboration pathways — expanding the foundation's reach beyond donors to the researchers who advance the detection work.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">mission discoverability</span>
                          <p className="text-neutral-600 text-sm">seo architecture places canary foundation in front of people searching for meaningful giving opportunities and early detection research — growing the pool of potential donors and collaborators organically.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">donor engagement intelligence</span>
                          <p className="text-neutral-600 text-sm">analytics give the foundation visibility into what content is driving the most donor engagement and where the giving funnel has friction — enabling continuous improvement of the conversion experience.</p>
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
                      <Link href="https://www.canaryfoundation.org" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        canaryfoundation.org
                      </Link>{" "}
                      — full site, research programs, and donation experience
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a nonprofit website that earns donor trust and drives giving?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">mission-driven organizations deserve digital presences that match the importance of the work. we build the websites that communicate urgency, earn trust, and convert visitors into committed supporters.</p>
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
                  url="https://www.design-prism.com/case-studies/canary-foundation"
                  title="Canary Foundation — Prism Case Study"
                  description="How Prism built a mission-driven digital presence for a nonprofit pioneering early cancer detection — brand design, custom website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Canary Foundation — Building a Mission-Driven Digital Presence for an Early Cancer Detection Nonprofit"
        description="How Prism built a mission-driven digital presence for a nonprofit pioneering early cancer detection — brand design, custom website, SEO/AEO, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/canary-foundation"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Canary Foundation"
        outcome="A mission-worthy digital presence that communicates the urgency of early detection research, earns donor trust, and drives the engagement that sustains the work."
      />
    </div>
  )
}
