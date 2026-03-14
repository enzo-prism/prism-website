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

const CLIENT_SITE = "https://www.rebelliousaging.com"

export default function RebelliousAgingCaseStudy() {
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
                rebellious aging — building an audience platform for a contrarian wellness brand that challenges how people think about getting older
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand design, custom website, seo/aeo, and analytics for a wellness brand redefining aging
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit rebelliousaging.com
                  </Link>
                </Button>
              </div>
              <CaseStudyWorkHighlights caseStudySlug="rebellious-aging" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">aging as identity — a brand for people who refuse to disappear</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <p>
                    rebellious aging is built on a single, sharp conviction: the mainstream narrative around aging is wrong. it treats getting older as a series of losses — of energy, relevance, capability, vitality. rebellious aging argues the opposite. that aging can be a chapter of expansion if you approach it with the right mindset, the right information, and the refusal to accept the story you've been told.
                  </p>
                  <p>
                    founded by joan jakel, a wellness professional who has spent her career working at the intersection of health, mindset, and aging, rebellious aging needed a digital home that could carry the weight of that positioning. not just a website — a platform. something that could hold a growing content library, attract search traffic from people researching aging well, and convert readers into community members and coaching clients.
                  </p>
                  <p>
                    prism built that platform.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">a strong point of view without a home</h3>
                      <p className="text-neutral-600">joan had a compelling perspective and real expertise, but no digital platform that could communicate both. the brand needed to be as bold as the idea — not generic wellness, but a specific, contrarian take that would attract the right audience and repel the wrong one.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">content without architecture</h3>
                      <p className="text-neutral-600">there was content being created, but no structure to make it discoverable, searchable, or scalable. without a proper content architecture and seo foundation, the work wasn't reaching the audience it deserved.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no conversion pathway</h3>
                      <p className="text-neutral-600">readers and interested visitors had no clear next step — no way to join a community, book a coaching session, or deepen their engagement with the brand. the digital experience was informational but not transactional.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no data layer</h3>
                      <p className="text-neutral-600">without analytics, there was no way to know what content was resonating, who the audience actually was, or what was driving conversions. every decision was made on instinct rather than evidence.</p>
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
                      <p className="text-neutral-600">we developed a visual identity that embodies the brand's core tension: warmth and defiance. earthy terracottas, deep burgundies, and warm neutrals signal vitality and groundedness. bold typographic choices communicate confidence without aggression. the overall aesthetic feels like a magazine you'd actually read — not a medical brochure or a generic wellness site.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website on vercel</h3>
                      <p className="text-neutral-600">we built a platform designed to grow. the content section is structured to support a deep library of articles, guides, and resources — each optimized for search and organized by theme. the homepage makes the brand's positioning unmistakable in the first five seconds. coaching and community pages give visitors a clear path from interest to action. the site is built to serve both a casual reader who's just discovered rebellious aging and a returning community member who comes back regularly for new content.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo/aeo</h3>
                      <p className="text-neutral-600">we built the site's content architecture around the specific searches that rebellious aging's target audience actually performs — questions about aging well, hormones, longevity, mindset, and wellness for women over 50. we formatted key content to compete for ai-generated answer placements, recognizing that this audience increasingly uses ai tools to research health and wellness topics.</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">enterprise analytics</h3>
                      <p className="text-neutral-600">google analytics was configured to track content engagement, coaching page visits, and community sign-up conversions — giving joan and her team visibility into what's driving growth and where the audience is most engaged.</p>
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
                          <span className="font-semibold lowercase">a platform worthy of the brand</span>
                          <p className="text-neutral-600 text-sm">rebellious aging now has a digital home that matches the boldness of its positioning — a platform that communicates the brand's point of view immediately and gives visitors a reason to stay, read, and return.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">searchable content architecture</span>
                          <p className="text-neutral-600 text-sm">content is now structured to be found. the seo architecture ensures that articles and resources surface for the specific queries rebellious aging's audience uses — building organic reach over time.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">clear conversion pathways</span>
                          <p className="text-neutral-600 text-sm">visitors now have a clear path from reader to community member to coaching client — eliminating the friction that was keeping interested visitors from taking the next step.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">a scalable content platform</span>
                          <p className="text-neutral-600 text-sm">the site is built to grow. as rebellious aging adds content, expands its community, and develops new offerings, the platform can scale without needing a rebuild.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 rounded-full bg-neutral-200 flex-shrink-0" />
                        <div>
                          <span className="font-semibold lowercase">audience intelligence</span>
                          <p className="text-neutral-600 text-sm">analytics give joan visibility into what content is driving the most engagement, where the audience is coming from, and what's converting — enabling smarter decisions about content, community, and coaching.</p>
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
                      <Link href="https://www.rebelliousaging.com" className="font-semibold text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                        rebelliousaging.com
                      </Link>{" "}
                      — full platform, content library, coaching, and community
                    </li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to build a digital platform for your brand?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">the best brands in wellness have a clear point of view — but that point of view needs a digital home that can carry it. we build platforms that match the boldness of the brand and grow with it.</p>
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
                  url="https://www.design-prism.com/case-studies/rebellious-aging"
                  title="Rebellious Aging — Prism Case Study"
                  description="How Prism built an audience platform for a contrarian wellness brand — brand design, custom website, SEO/AEO, and analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="Rebellious Aging — Building an Audience Platform for a Contrarian Wellness Brand"
        description="How Prism built an audience platform for a contrarian wellness brand that challenges how people think about getting older — brand design, custom website, SEO/AEO, and enterprise analytics."
        url="https://www.design-prism.com/case-studies/rebellious-aging"
        datePublished="2026-03-13T00:00:00.000Z"
        dateModified="2026-03-13T00:00:00.000Z"
        clientName="Rebellious Aging"
        outcome="A digital platform that matches the boldness of the brand — searchable, scalable, and built to convert readers into community members and coaching clients."
      />
    </div>
  )
}
