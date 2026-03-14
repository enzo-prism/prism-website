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

const CLIENT_SITE = "https://www.winecountryrootcanal.com"

export default function WineCountryRootCanalCaseStudy() {
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
                wine country root canal — building a calming, conversion-focused digital presence for a napa valley endodontic practice
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, local listing optimization, and analytics for a specialist endodontic practice in napa
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit winecountryrootcanal.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="wine-country-root-canal" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">root canals don't have to feel scary — and neither should the website</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    wine country root canal is an endodontic specialty practice in napa valley. dr. kristopher kim performs root canals, endodontic retreatments, cracked tooth treatment, and apicoectomies — the procedures that save teeth other dentists can't. the technical skill required is significant. the anxiety patients bring to these appointments is equally significant.
                  </p>
                  <p>
                    that's the central tension every endodontic practice has to resolve online: how do you communicate specialist expertise without amplifying patient fear? how do you be credible without being cold? how do you earn the trust of a patient who is already anxious before they've picked up the phone?
                  </p>
                  <p>
                    prism built wine country root canal a digital presence that answers all of those questions — one that signals expertise through calm, not through clinical distance.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">a specialist practice without a specialist presence</h3>
                      <p className="text-neutral-600">endodontic practices attract patients who are often referred by general dentists and who research their options before accepting a referral. without a credible, calming digital presence, even a skilled specialist loses patients to competitors with better marketing.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">the anxiety amplification problem</h3>
                      <p className="text-neutral-600">most endodontic websites inadvertently make the anxiety problem worse — clinical imagery, technical language, and cold design can all signal "this is going to be unpleasant." the site needed to actively counteract that association.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local and referral search gaps</h3>
                      <p className="text-neutral-600">the practice needed to surface for both direct patient searches (root canal napa, endodontist napa valley) and referral-source searches — general dentists in the napa area who needed to know which specialist to send their patients to.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics infrastructure</h3>
                      <p className="text-neutral-600">without tracking, there was no visibility into whether patients were finding the practice through search, what services they were researching, or where the conversion funnel had friction.</p>
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
                      <p className="text-neutral-600">we developed a visual identity built around calm authority. the palette — warm whites, soft sage greens, and muted earth tones — draws on the napa valley landscape to create an immediate sense of place and peace. the name and branding lean into the wine country identity, making the practice memorable and distinctive in a way that generic clinical branding never could.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we built the site around the anxious patient's journey: what is this procedure, will it hurt, who is doing it, what do other patients say, and how do i book? service pages for root canals, retreatments, cracked tooth treatment, and apicoectomies are written in plain language that explains the procedure without amplifying fear. dr. kim's background and approach are prominently featured — patients who know who's treating them are less anxious. patient testimonials are woven throughout. opencare integration makes booking immediate.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to rank for endodontic search terms in the napa valley market — both patient-facing searches and the professional searches that general dentists use when looking for a specialist to refer to. key service pages were formatted to compete for ai-generated answer placements, recognizing that patients increasingly research dental procedures through ai before accepting a referral.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local listing optimization</h3>
                      <p className="text-neutral-600">we optimized the practice's local presence across google business profile and relevant directories to ensure consistent, accurate visibility across napa valley searches — particularly for patients searching on mobile at the moment of referral.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics and search console were configured to track the full patient journey from search to appointment booking — giving the practice visibility into which channels drive the most appointments and which service pages are getting the most anxious-patient research traffic.</p>
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
                          <span className="font-semibold lowercase">anxiety-reducing by design</span>
                          <p className="text-neutral-600 text-sm">the site actively counteracts the fear association with endodontic procedures — warm imagery, calm design, plain-language content, and visible social proof combine to make the practice feel approachable before a patient has even called.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">specialist credibility</span>
                          <p className="text-neutral-600 text-sm">dr. kim's expertise and background are communicated clearly — patients and referring dentists arrive at a site that immediately establishes the practice as the right specialist for complex endodontic cases.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">napa valley market visibility</span>
                          <p className="text-neutral-600 text-sm">local seo and listing optimization place the practice consistently in front of patients and general dentists searching for endodontic care in the napa valley market.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">referral source reach</span>
                          <p className="text-neutral-600 text-sm">the site is structured to serve both direct patient searches and the professional searches general dentists use when identifying specialist referral partners — expanding the practice's reach beyond patient-direct acquisition.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">measurable patient pipeline</span>
                          <p className="text-neutral-600 text-sm">analytics infrastructure gives the practice visibility into the complete acquisition funnel — enabling ongoing optimization of the channels and content that convert the most anxious patients into scheduled appointments.</p>
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
                      <Link href="https://www.winecountryrootcanal.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        winecountryrootcanal.com
                      </Link>{" "}
                      — full site, service pages, and patient testimonials
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a specialist practice website that earns patient trust?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">specialist practices deserve specialist marketing. we build digital presences that communicate expertise with calm authority — and track results so you can keep optimizing.</p>
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
                  url="https://www.design-prism.com/case-studies/wine-country-root-canal"
                  title="Wine Country Root Canal — Prism Case Study"
                  description="How Prism built a calming, conversion-focused digital presence for a Napa Valley endodontic practice — brand design, custom website, SEO/AEO, local listings, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Wine Country Root Canal — Building a Calming Digital Presence for a Napa Valley Endodontic Practice"
        description="How Prism built a calming, conversion-focused digital presence for a Napa Valley endodontic practice — brand design, custom website, SEO/AEO, local listing optimization, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/wine-country-root-canal"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Wine Country Root Canal"
        outcome="A calming, conversion-focused specialist presence that earns patient trust before the first call and drives appointment bookings across direct and referral channels."
      />
    </div>
  )
}
