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

const CLIENT_SITE = "https://www.michaelnjodds.com"

export default function MichaelNjoDDSCaseStudy() {
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
                michael njo dds — building a complete digital presence for a san mateo dental practice with deep community roots
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, google ads, seo/aeo, local listing optimization, and analytics for a relationship-driven general dental practice
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit michaelnjodds.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="michael-njo-dds" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">a practice built on trust deserves a website that earns it</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    dr. michael njo has practiced general dentistry in san mateo for over two decades. his practice isn't built on marketing — it's built on relationships. patients refer family members. they come back year after year. they trust him with their kids. that kind of loyalty is hard-won and it shows in every interaction.
                  </p>
                  <p>
                    the problem is that new patients don't know any of that when they search for a dentist. they see a website — and they make a judgment. if the website doesn't reflect the quality of the practice, the best dentist in san mateo loses to one who just has better marketing. dr. njo came to prism because he wanted a digital presence that was as good as his dentistry.
                  </p>
                  <p>
                    prism built him a complete digital infrastructure: a brand identity that communicates warmth and expertise, a website that earns trust before a patient walks through the door, google ads that fill the schedule with the right patients, seo that keeps the practice findable for years, and analytics that make every decision data-driven.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">a 20-year practice with a day-one website</h3>
                      <p className="text-neutral-600">dr. njo's digital presence didn't reflect two decades of excellent care and deep patient relationships. the website looked dated and failed to communicate the quality and warmth that defines the practice.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">referral dependency</h3>
                      <p className="text-neutral-600">the practice had grown primarily through word-of-mouth. that's a strong foundation — but it left growth dependent on the referral network rather than digital acquisition, limiting the practice's ability to reach new patients who weren't already connected to an existing patient.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local search underperformance</h3>
                      <p className="text-neutral-600">a san mateo practice with 20+ years of history wasn't ranking for the terms patients use when searching for a dentist. that meant competitors with newer, better-optimized sites were capturing patients who would have been a natural fit for dr. njo's practice.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no digital advertising foundation</h3>
                      <p className="text-neutral-600">the practice had no google ads presence, leaving immediate, intent-driven search traffic completely uncaptured. patients who were actively looking for a new dentist in san mateo weren't finding dr. njo at the moment they were ready to book.</p>
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
                      <p className="text-neutral-600">we developed a visual identity that balances clinical confidence with approachable warmth — the combination that makes patients trust a dentist before they've even sat in the chair. clean blues, soft neutrals, and professional typography create a brand that feels both modern and reassuring.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we built the site around what a new patient actually needs to feel comfortable booking: who is this dentist, what do they offer, what do other patients say, and how do i make an appointment? service pages cover the full scope of dr. njo's practice — cleanings and preventive care, cosmetic dentistry, restorations, and emergency care. patient testimonials and a visible, warm physician profile build the trust that converts a searcher into a scheduled appointment. opencare integration makes booking frictionless.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">google ads</h3>
                      <p className="text-neutral-600">we built and manage a google ads campaign targeting patients actively searching for a dentist in san mateo. the campaigns are structured around high-intent search terms — new patient dentist san mateo, teeth cleaning san mateo, emergency dentist san mateo — and optimized for appointment bookings rather than clicks.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to rank for the specific terms san mateo patients use when searching for dental care, from general dentistry to cosmetic procedures. we also formatted key pages to compete for ai-generated answer placements — increasingly important as patients use ai to research dental providers before booking.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">local listing optimization</h3>
                      <p className="text-neutral-600">we optimized and standardized dr. njo's presence across google business profile and local directories to ensure the practice surfaces consistently in local and map-based searches — where the majority of new dental patient searches land.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics and search console were configured to track the full patient journey — from first search impression through site visit, service page engagement, and appointment booking. the practice now has visibility into which channels drive the most bookings and which services attract the most patient research.</p>
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
                          <span className="font-semibold lowercase">a brand that earns trust immediately</span>
                          <p className="text-neutral-600 text-sm">the new identity and website give dr. njo a digital presence that matches the quality of care he delivers — patients encounter a warm, credible, professional experience before they've called the office.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">new patient acquisition beyond referrals</span>
                          <p className="text-neutral-600 text-sm">google ads and seo give the practice a channel for reaching patients who have no existing connection to dr. njo — expanding the funnel beyond word-of-mouth and filling the schedule with new patients who are ready to book.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">local search presence</span>
                          <p className="text-neutral-600 text-sm">optimized local listings and seo architecture place dr. njo's practice consistently in front of san mateo patients searching for dental care across google search and maps.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">frictionless booking experience</span>
                          <p className="text-neutral-600 text-sm">opencare integration makes appointment scheduling immediate and seamless — a patient who finds dr. njo through search can book an appointment in the same session without picking up the phone.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">full-funnel measurement</span>
                          <p className="text-neutral-600 text-sm">analytics infrastructure gives the practice visibility into the complete patient acquisition journey — from search impression to appointment — enabling continuous optimization of the channels and content that convert.</p>
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
                      <Link href="https://www.michaelnjodds.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        michaelnjodds.com
                      </Link>{" "}
                      — full site, service pages, and patient testimonials
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a dental practice website that fills your schedule?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">the best dental practices deserve more than a generic website. we build the digital infrastructure that earns patient trust, drives new bookings, and gives you the data to keep growing.</p>
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
                  url="https://www.design-prism.com/case-studies/michael-njo-dds"
                  title="Michael Njo DDS — Prism Case Study"
                  description="How Prism built a complete digital presence for a San Mateo dental practice — brand design, custom website, Google Ads, SEO/AEO, local listings, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Michael Njo DDS — Building a Complete Digital Presence for a San Mateo Dental Practice"
        description="How Prism built a complete digital presence for a San Mateo dental practice — brand design, custom website, Google Ads, SEO/AEO, local listing optimization, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/michael-njo-dds"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Michael Njo DDS"
        outcome="A complete digital infrastructure that earns patient trust, drives new bookings, and gives the practice data-driven visibility into its acquisition funnel."
      />
    </div>
  )
}
