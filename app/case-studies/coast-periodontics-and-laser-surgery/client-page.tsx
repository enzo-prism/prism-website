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

const CLIENT_SITE = "https://www.coastperiodontics.com"

export default function CoastPeriodonticsCaseStudy() {
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
                coast periodontics and laser surgery — building a calming, authority-driven digital presence for a specialist periodontic practice
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, local listing optimization, and analytics for a specialist periodontic and laser surgery practice
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit coastperiodontics.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="coast-periodontics-and-laser-surgery" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">specialist dentistry requires specialist marketing</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    coast periodontics and laser surgery is a specialist periodontic practice offering gum disease treatment, dental implants, laser surgery, and the full range of periodontal care. the practice serves both direct patients and referrals from general dentists who need a reliable specialist for complex cases.
                  </p>
                  <p>
                    periodontic practices face a specific digital challenge: the procedures involve gums, surgery, and conditions that patients often find intimidating. a website that leads with clinical detail and surgical imagery can amplify that anxiety and drive patients toward avoidance rather than action. but a site that downplays the specialist nature of the work fails to communicate the authority that referring dentists need to see before they trust a colleague with their most complex patients.
                  </p>
                  <p>
                    prism built coast periodontics a digital presence that resolves that tension — calm and approachable for anxious patients, authoritative and credible for referring dental professionals.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">dual audience challenge</h3>
                      <p className="text-neutral-600">the practice needed to serve two distinct audiences with different needs: anxious patients who needed reassurance, and referring general dentists who needed to see specialist authority. a single site had to speak to both without compromising for either.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">the anxiety amplification problem</h3>
                      <p className="text-neutral-600">periodontal procedures — gum surgery, implants, laser treatment — are procedures patients delay and avoid. a website that felt clinical or intimidating would push anxious patients away rather than converting them into appointments.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local and referral search visibility</h3>
                      <p className="text-neutral-600">the practice needed to surface for both direct patient searches and the professional searches general dentists use when looking for specialist referral partners. two distinct search intents, one seo architecture.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics foundation</h3>
                      <p className="text-neutral-600">without tracking, there was no visibility into which services were attracting the most patient research, where the referral funnel was working, or what content was converting the most anxious patients into scheduled appointments.</p>
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
                      <p className="text-neutral-600">we developed a visual identity built around calm authority — the combination that anxious patients and discerning referring dentists both respond to. coastal blues and clean whites draw on the coastal california setting, creating a palette that feels serene without being generic. the design communicates expertise through precision and restraint, not clinical heaviness.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we built the site to serve both audiences: patient-facing service pages that explain procedures in plain language and address anxiety directly; a specialist credentials section that communicates the depth of training and experience that referring dentists evaluate. gum disease treatment, dental implants, laser surgery, and full-mouth reconstruction pages are written to inform and reassure, not to intimidate. patient testimonials are prominently featured. opencare integration makes appointment booking immediate.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to rank for periodontic search terms in the local market — both patient-facing searches (periodontist near me, gum disease treatment, dental implants) and the professional searches general dentists use when identifying specialist referral partners. key service pages were formatted to compete for ai-generated answer placements, recognizing that patients increasingly research periodontal procedures through ai before accepting a referral.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local listing optimization</h3>
                      <p className="text-neutral-600">we optimized the practice's local presence across google business profile and relevant directories to ensure consistent, accurate visibility across local searches — particularly for patients searching on mobile at the moment of referral or initial symptom research.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics and search console were configured to track the full patient journey from search to appointment booking — giving the practice visibility into which channels and services drive the most appointments and where anxious patients are pausing in the conversion funnel.</p>
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
                          <span className="font-semibold lowercase">calm authority for both audiences</span>
                          <p className="text-neutral-600 text-sm">the site speaks to anxious patients with warmth and reassurance while communicating specialist authority to referring dentists — a dual-audience challenge resolved through thoughtful content architecture and visual design.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">anxiety reduced, appointments increased</span>
                          <p className="text-neutral-600 text-sm">the site actively counteracts the fear that leads patients to avoid necessary periodontal care — plain-language procedure descriptions, visible testimonials, and a calm design combine to make booking an appointment feel manageable.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">local and referral visibility</span>
                          <p className="text-neutral-600 text-sm">seo architecture and local listing optimization place the practice in front of both patient-direct searches and the professional searches general dentists use when selecting specialist referral partners.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">specialist credibility</span>
                          <p className="text-neutral-600 text-sm">the credentials section and specialist service descriptions communicate the depth of training that referring dentists evaluate — positioning the practice as the obvious referral choice for complex periodontal cases in the local market.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">measurable patient pipeline</span>
                          <p className="text-neutral-600 text-sm">analytics infrastructure gives the practice visibility into the complete acquisition funnel — enabling continuous optimization of the channels and content that convert the most patients and referrals into scheduled appointments.</p>
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
                      <Link href="https://www.coastperiodontics.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        coastperiodontics.com
                      </Link>{" "}
                      — full site, service pages, specialist credentials, and patient testimonials
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a specialist practice website that earns trust from both patients and referring dentists?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">specialist dental practices need specialist marketing — digital presences that reduce patient anxiety while communicating the authority that drives referrals. we build both.</p>
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
                  url="https://www.design-prism.com/case-studies/coast-periodontics-and-laser-surgery"
                  title="Coast Periodontics and Laser Surgery — Prism Case Study"
                  description="How Prism built a calming, authority-driven digital presence for a specialist periodontic practice — brand design, custom website, SEO/AEO, local listings, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Coast Periodontics and Laser Surgery — Building a Calming, Authority-Driven Specialist Digital Presence"
        description="How Prism built a calming, authority-driven digital presence for a specialist periodontic and laser surgery practice — brand design, custom website, SEO/AEO, local listing optimization, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/coast-periodontics-and-laser-surgery"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Coast Periodontics and Laser Surgery"
        outcome="A dual-audience specialist presence — calming and reassuring for anxious patients, authoritative and credible for referring general dentists — with full-funnel analytics tracking the patient acquisition pipeline."
      />
    </div>
  )
}
