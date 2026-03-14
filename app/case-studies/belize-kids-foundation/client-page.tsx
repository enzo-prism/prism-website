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

const CLIENT_SITE = "https://www.belizekidsfoundation.org"

export default function BelizeKidsFoundationCaseStudy() {
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
                belize kids foundation — building a warm, conversion-focused digital presence for a nonprofit serving children in belize
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, and analytics for a nonprofit supporting education and opportunity for children in belize
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit belizekidsfoundation.org
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="belize-kids-foundation" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">a foundation built on presence — a website that makes it real for donors everywhere</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    belize kids foundation works where the need is most direct: supporting children in belize with access to education, resources, and opportunity. the founders have deep personal connections to belize — the foundation isn't a distant charitable exercise, it's rooted in real relationships with the communities and families it serves.
                  </p>
                  <p>
                    that personal connection is the foundation's most powerful asset — and its most significant digital challenge. how do you make a donor in california feel the reality of a child's life in belize? how do you communicate the impact of a contribution in a way that makes someone pull out their credit card rather than scroll past?
                  </p>
                  <p>
                    prism built belize kids foundation a digital presence designed to close that distance — one that makes the work vivid, the impact tangible, and the giving frictionless.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">geographic and emotional distance</h3>
                      <p className="text-neutral-600">most donors are far from belize. the website had to bridge that distance — making the children, the communities, and the impact of support feel real and immediate to someone reading from thousands of miles away.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">donor trust and impact clarity</h3>
                      <p className="text-neutral-600">donors want to know that their contribution matters and that it reaches the people it's intended for. the site needed to communicate impact with specificity — not just general statements about helping children, but tangible descriptions of what donations enable.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">reaching new donors beyond the immediate network</h3>
                      <p className="text-neutral-600">the foundation had relied on personal networks for early support. growth required reaching donors who had no existing connection to the founders or to belize — which required a digital presence that could stand on its own and earn trust from strangers.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics visibility</h3>
                      <p className="text-neutral-600">without tracking, the foundation had no visibility into how donors were finding the site, what content was driving engagement, or where the donation conversion funnel had friction.</p>
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
                      <p className="text-neutral-600">we developed a visual identity rooted in warmth and hope — vibrant colors inspired by the belize landscape, approachable typography, and imagery that centers the children and communities the foundation serves. the design communicates the joy and humanity of the work, not just the need.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we built the site to close the distance between donor and beneficiary. the mission and impact sections make the work vivid — specific programs, real outcomes, and the personal connection the founders have to the communities they serve. the donation experience is structured to convert: clear impact statements tied to specific giving levels, frictionless payment flows, and multiple giving pathways (one-time, recurring, and program-specific) to match different donor preferences and intentions.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to surface for searches around belize nonprofits, children's education nonprofits, and international giving opportunities — expanding the foundation's reach to donors who are actively looking for meaningful giving opportunities but have no prior connection to the foundation.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics was configured to track donor engagement, program content consumption, and donation conversion — giving the foundation visibility into what's driving the most meaningful engagement and where the giving funnel can be improved.</p>
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
                          <span className="font-semibold lowercase">distance closed</span>
                          <p className="text-neutral-600 text-sm">the site makes the belize kids foundation's work feel immediate and real to donors anywhere in the world — the children, the communities, and the impact of giving are communicated with warmth and specificity that motivates action.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">donor conversion architecture</span>
                          <p className="text-neutral-600 text-sm">multiple giving pathways, clear impact statements, and frictionless payment flows give donors confidence and flexibility — reducing the barriers between intention and contribution.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">reach beyond the network</span>
                          <p className="text-neutral-600 text-sm">the seo architecture and standalone credibility of the digital presence enable the foundation to reach donors who have no prior connection to the founders or to belize — growing the donor base beyond the initial personal network.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">trust earned at first glance</span>
                          <p className="text-neutral-600 text-sm">the visual identity and site experience communicate the professionalism and authenticity that donors need to see before giving — the foundation looks like what it is: a real, accountable organization doing important work.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">donor engagement visibility</span>
                          <p className="text-neutral-600 text-sm">analytics give the foundation visibility into how donors are engaging with the site and where the giving funnel has friction — enabling continuous improvement of the conversion experience.</p>
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
                      <Link href="https://www.belizekidsfoundation.org" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        belizekidsfoundation.org
                      </Link>{" "}
                      — full site, programs, and donation experience
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a nonprofit website that closes the distance and drives giving?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">the best nonprofits make their work vivid and their impact tangible. we build the digital presences that earn donor trust, communicate impact clearly, and convert visitors into committed supporters.</p>
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
                  url="https://www.design-prism.com/case-studies/belize-kids-foundation"
                  title="Belize Kids Foundation — Prism Case Study"
                  description="How Prism built a warm, conversion-focused digital presence for a nonprofit serving children in Belize — brand design, custom website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Belize Kids Foundation — Building a Warm Digital Presence for a Nonprofit Serving Children in Belize"
        description="How Prism built a warm, conversion-focused digital presence for a nonprofit supporting education and opportunity for children in Belize — brand design, custom website, SEO/AEO, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/belize-kids-foundation"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Belize Kids Foundation"
        outcome="A warm, conversion-focused digital presence that closes the distance between donor and beneficiary — making the work vivid, the impact tangible, and the giving frictionless."
      />
    </div>
  )
}
