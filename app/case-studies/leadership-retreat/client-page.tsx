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

const CLIENT_SITE = "https://www.dentistretreat.com"

export default function LeadershipRetreatCaseStudy() {
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
                leadership retreat — building a compelling event presence that drives registrations for an annual dental leadership gathering
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                website design, brand design, seo/aeo, and analytics for a boutique annual event in the dental community
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit dentistretreat.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="leadership-retreat" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">a retreat worth the trip deserves a website that proves it</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    the leadership retreat isn't a dental conference. there are no thousands of attendees, no convention center floors, no badge lanyards. it is something rarer: a small, intentionally curated gathering of dental professionals who want to think differently about leadership, connect with peers who take growth seriously, and leave with more than a binder of slides.
                  </p>
                  <p>
                    organized by dr. michael njo and liz armato — who run practice transitions institute and spend their professional lives guiding dentists through the most consequential transitions of their careers — the retreat has built a quiet reputation through word of mouth. naples 2023. deer valley 2024. savannah 2026. each year a new city, a new venue, the same ethos: boutique by design, substantive by necessity, luxurious without being inaccessible.
                  </p>
                  <p>
                    the challenge with an event like this is making its exclusivity legible to someone who has never attended. you can't rely on brand recognition or a long conference history. every registration cycle, the site has to do the work of converting a dentist who's intrigued but skeptical into one who books a hotel room and clears their calendar. prism built the digital experience to do exactly that.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">new event, recurring credibility problem</h3>
                      <p className="text-neutral-600">each time the retreat moves cities, it needs to re-establish context and legitimacy for first-time attendees. a generic event website couldn't carry that weight. the site needed to feel as elevated as the event itself.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">registration conversion friction</h3>
                      <p className="text-neutral-600">an intimate, capped event means every registration matters. a site that failed to communicate value clearly and move visitors toward booking was a direct revenue problem — not a branding concern.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no visual differentiation</h3>
                      <p className="text-neutral-600">the dental events space is crowded with conferences that look like conferences. the leadership retreat needed to look like something else entirely — closer to a luxury travel brand than a ce course listing.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no data layer</h3>
                      <p className="text-neutral-600">without analytics, there was no way to know whether potential attendees were reading the agenda, clicking through to hotel booking, or dropping off at the registration form. every marketing decision was made blind.</p>
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
                      <p className="text-neutral-600">we developed a visual language built around the "southern charm x modern luxury" positioning of the savannah edition — warm neutrals, ivory, gold, and deep green. cinematic photography of the thompson savannah's riverfront and interior created an immediate sense of place. elegant serif headings paired with clean sans-serif body text established the tone: sophisticated without being cold, exclusive without being unwelcoming.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom event website on vercel</h3>
                      <p className="text-neutral-600">we built an experience organized around the journey of a prospective attendee: why should i come? what will i actually do? what have past attendees said? how do i register? the interactive itinerary gives a day-by-day breakdown of the three-day program — from the opening welcome with dr. njo and liz to brian parsley's behavioral science sessions to the partner alliances panel featuring carecredit, cbg, and pti. hotel reservation details, the group rate code, and direct booking instructions are integrated seamlessly so that moving from "i want to come" to "i've booked my room" requires minimal effort.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">social proof architecture</h3>
                      <p className="text-neutral-600">past event photography and testimonials from returning attendees are built into the site as primary content, not footnotes. for a boutique event, proof of a lived experience is the most powerful conversion tool available. we treated it accordingly.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to surface for searches around dental leadership events, dental professional development retreats, and continuing education alternatives — capturing dentists who are actively looking for something different.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics was configured to track itinerary engagement, hotel booking click-throughs, and registration form submissions, giving the organizing team a clear picture of where attendee interest is highest and where the conversion funnel has friction.</p>
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
                          <span className="font-semibold lowercase">a site that converts skeptics</span>
                          <p className="text-neutral-600 text-sm">first-time visitors encounter a cinematic, high-credibility experience that immediately communicates that this is not another dental conference. the visual quality signals the quality of the event itself.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">full attendee journey in one place</span>
                          <p className="text-neutral-600 text-sm">from agenda exploration to hotel booking to registration, the entire decision-making path is mapped and friction is eliminated — a dentist who's interested can become a confirmed attendee in a single session.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">social proof as primary content</span>
                          <p className="text-neutral-600 text-sm">past attendee testimonials and event photography are woven throughout the experience — not siloed to a testimonials page — giving prospective registrants a vivid sense of what the retreat actually feels like.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">event searchability</span>
                          <p className="text-neutral-600 text-sm">the site is structured to surface for dental leadership and professional development searches — putting the retreat in front of dentists who are actively looking for something better than a standard conference.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">data-driven event marketing</span>
                          <p className="text-neutral-600 text-sm">analytics tracking gives the organizing team visibility into where attendee interest is strongest and where the registration funnel has friction, enabling smarter decisions every cycle.</p>
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
                      <Link href="https://www.dentistretreat.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        dentistretreat.com
                      </Link>{" "}
                      — full event site, itinerary, registration, and hotel booking
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a registration experience that fills your event?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">boutique events live and die by their digital presence. we build the event websites that turn interest into registrations — and track results so you can optimize every cycle.</p>
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
                  url="https://www.design-prism.com/case-studies/leadership-retreat"
                  title="Leadership Retreat — Prism Case Study"
                  description="How Prism built a compelling event presence that drives registrations for an annual dental leadership gathering — brand, website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Leadership Retreat — Building a Compelling Event Presence"
        description="How Prism built a compelling event presence that drives registrations for an annual dental leadership gathering — website design, brand design, SEO/AEO, and analytics."
        url="https://www.design-prism.com/case-studies/leadership-retreat"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Leadership Retreat"
        outcome="A cinematic, high-converting event website that turns dental professionals from skeptics into confirmed attendees."
      />
    </div>
  )
}
