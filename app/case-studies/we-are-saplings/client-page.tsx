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

const CLIENT_SITE = "https://www.wearesaplings.com"

export default function WeAreSaplingsCaseStudy() {
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
                we are saplings — building a joyful, mission-driven digital presence for a nature-based children's program
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, and analytics for a nature-based early childhood education program
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit wearesaplings.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="we-are-saplings" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">kids grow better outside — a website that makes parents believe it</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    we are saplings is a nature-based early childhood program that takes children outside — not as a field trip, but as the primary educational environment. the philosophy is straightforward: kids learn better, develop more fully, and grow into more resilient people when they spend their days in nature rather than inside four walls. it's backed by research. it's also, for many parents, an unfamiliar concept that requires some convincing.
                  </p>
                  <p>
                    the program serves young children whose parents have made an intentional choice — to prioritize outdoor development, to accept the mud and the weather, to believe that unstructured exploration is more valuable than structured worksheets. those parents exist everywhere. finding them, and helping them understand that we are saplings is exactly what they've been looking for, is the digital challenge.
                  </p>
                  <p>
                    prism built we are saplings a brand and website that speaks directly to those parents — joyful, warm, grounded in the program's philosophy, and built to convert a curious parent into an enrolled family.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">an unfamiliar concept that needed explaining</h3>
                      <p className="text-neutral-600">nature-based education isn't mainstream. many parents have never encountered the concept. the website needed to educate and persuade simultaneously — explaining what nature-based education is and why it's better, without being preachy or condescending.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">parent trust and safety concerns</h3>
                      <p className="text-neutral-600">parents choosing a program for young children are making a high-trust decision. nature-based education introduces additional considerations — weather, terrain, supervision ratios, safety protocols. the site needed to address those concerns directly without undermining the magic of the outdoor experience.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no search presence for nature-based education</h3>
                      <p className="text-neutral-600">parents searching for nature-based preschools, forest schools, or outdoor early childhood programs weren't finding we are saplings. the site needed seo architecture to capture parents at the moment they're exploring alternatives to conventional early childhood education.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no analytics foundation</h3>
                      <p className="text-neutral-600">without tracking, there was no visibility into which program descriptions were resonating, what content was driving inquiry, or where the enrollment funnel had friction.</p>
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
                      <p className="text-neutral-600">we developed a visual identity that captures the joy and groundedness of the program — earthy greens, warm yellows, and natural textures that feel organic without being rustic. the imagery centers children in nature: mud, leaves, sticks, and wide open spaces. the typography is warm and approachable, not institutional. the overall aesthetic makes the program feel like exactly what it is: a place where children are joyfully, safely, genuinely outside.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we structured the site around the parent's journey: what is this, why does it matter, what does a day look like, is it safe, and how do i enroll? the program philosophy is communicated with warmth and specificity — not just "children learn in nature" but what that actually looks like, feels like, and does for a child's development. safety and supervision are addressed directly and honestly. testimonials from enrolled families give skeptical parents the social proof that converts curiosity into confidence. enrollment inquiry flows are streamlined to reduce friction at the moment of decision.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we structured the site to surface for the specific searches parents use when exploring alternatives to conventional early childhood education — nature-based preschool, forest school, outdoor early childhood program, nature kindergarten. we also formatted key pages to compete for ai-generated answer placements, recognizing that parents increasingly research education options through ai before engaging directly with programs.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics was configured to track parent engagement with program content, safety pages, and enrollment inquiry flows — giving the program visibility into what's driving the most meaningful engagement and where the enrollment funnel has friction.</p>
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
                          <span className="font-semibold lowercase">the concept made vivid</span>
                          <p className="text-neutral-600 text-sm">parents who have never encountered nature-based education arrive at a site that explains and demonstrates the program with warmth and specificity — moving them from curious to convinced.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">trust built for hesitant parents</span>
                          <p className="text-neutral-600 text-sm">safety, supervision, and the daily reality of the outdoor program are addressed directly — giving hesitant parents the information and confidence they need to move forward.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">search presence for alternatives</span>
                          <p className="text-neutral-600 text-sm">the seo architecture places we are saplings in front of parents who are actively exploring alternatives to conventional early childhood education — capturing demand at the moment of open consideration.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">a brand parents connect with</span>
                          <p className="text-neutral-600 text-sm">the visual identity and site experience resonate with the parents the program is designed for — families who value nature, development, and an alternative to conventional schooling feel immediately at home on the site.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">enrollment funnel visibility</span>
                          <p className="text-neutral-600 text-sm">analytics give the program visibility into what content is driving the most parent engagement and where the enrollment funnel has friction — enabling continuous improvement of the conversion experience.</p>
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
                      <Link href="https://www.wearesaplings.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        wearesaplings.com
                      </Link>{" "}
                      — full site, program philosophy, and enrollment experience
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a program website that converts curious parents into enrolled families?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">educational programs with a strong philosophy deserve a digital presence that communicates it clearly. we build the websites that explain the concept, earn parent trust, and drive enrollment.</p>
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
                  url="https://www.design-prism.com/case-studies/we-are-saplings"
                  title="We Are Saplings — Prism Case Study"
                  description="How Prism built a joyful, mission-driven digital presence for a nature-based children's program — brand design, custom website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="We Are Saplings — Building a Joyful Digital Presence for a Nature-Based Children's Program"
        description="How Prism built a joyful, mission-driven digital presence for a nature-based early childhood education program — brand design, custom website, SEO/AEO, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/we-are-saplings"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="We Are Saplings"
        outcome="A joyful, grounded digital presence that explains nature-based education, earns parent trust, and converts curious parents into enrolled families."
      />
    </div>
  )
}
