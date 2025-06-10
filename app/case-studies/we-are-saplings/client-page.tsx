"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { CaseStudySchema } from "@/components/schema-markup"
import { trackCTAClick } from "@/utils/analytics"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import SocialShare from "@/components/social-share"

export default function WeSaplingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="We Are Saplings Case Study" />
      <Navbar />
      <ScrollProgressBar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-16 bg-[#f8f5f1]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-[#ad4e25]/10 text-[#ad4e25] rounded-full text-xs lowercase">
                  education
                </div>
                <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl">
                  we are saplings × prism
                </h1>
                <p className="text-xl text-neutral-600 lowercase">
                  planting the seeds of an emotion-literate generation
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <Link href="/case-studies">
                    <button className="inline-flex items-center justify-center text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      back to case studies
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/we-are-saplings-hero.png"
                  alt="We Are Saplings - Nurturing resilient kids who bend, not break"
                  width={1200}
                  height={600}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Snapshot Section */}
        <section className="px-4 py-12 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">snapshot</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <h3 className="font-medium text-neutral-900 lowercase">client</h3>
                <p className="text-neutral-600 lowercase">We Are Saplings — founded by Claire Frattarola</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-neutral-900 lowercase">mission</h3>
                <p className="text-neutral-600 lowercase">
                  Give kids playful tools to understand & manage big feelings
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-neutral-900 lowercase">engagement</h3>
                <p className="text-neutral-600 lowercase">
                  Zero-to-one brand launch: strategy, custom site, community engine
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-neutral-900 lowercase">early impact*</h3>
                <ul className="text-neutral-600 lowercase space-y-1">
                  <li>• 1,200+ parents & educators joined the wait-list</li>
                  <li>• 65% uptick in TED-Talk traffic post-launch</li>
                  <li>• Avg. session time 4.2 min (+78% vs. temp site)</li>
                </ul>
                <p className="text-xs text-neutral-400 lowercase italic">*Based on first 90 days of data</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge Section */}
        <section className="px-4 py-12 border-b">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the challenge</h2>
            <p className="text-lg text-neutral-600 lowercase mb-4">
              Claire had a powerful TED Talk and a box full of prototype ideas—
            </p>
            <p className="text-lg text-neutral-600 lowercase mb-4">
              but no digital home, no community hub, and no revenue engine.
            </p>
            <p className="text-lg text-neutral-600 lowercase">
              Prism's brief: turn a heartfelt vision into a living, breathing online platform that can grow with the
              brand.
            </p>
          </div>
        </section>

        {/* What Prism Did Section */}
        <section className="px-4 py-12 border-b">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">what prism did</h2>

            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-neutral-900 lowercase">1. vision-first workshop</h3>
                <ul className="text-neutral-600 lowercase space-y-1 pl-4">
                  <li>• Extracted Claire's "11/10 experience" for parents, teachers & kids</li>
                  <li>• Defined MVP content, future product tiers, and tone of voice</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-neutral-900 lowercase">2. custom-built story site</h3>
                <ul className="text-neutral-600 lowercase space-y-1 pl-4">
                  <li>• Hand-coded design inspired by Saplings' warm earth-tone palette (#ad4e25 → #563f1d)</li>
                  <li>• Mobile-first layouts that spotlight the TED Talk, origin story, and upcoming tools</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-neutral-900 lowercase">3. community engine v1</h3>
                <ul className="text-neutral-600 lowercase space-y-1 pl-4">
                  <li>• Email capture + wait-list flows (free downloadable emotion worksheet as lead magnet)</li>
                  <li>• Blog / resource library scaffolded for SEO & thought-leadership content</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-neutral-900 lowercase">4. product & monetization roadmap</h3>
                <ul className="text-neutral-600 lowercase space-y-1 pl-4">
                  <li>• Structured pathways for:</li>
                  <ul className="pl-6 space-y-1">
                    <li>- Free member accounts (access to starter printables)</li>
                    <li>- Premium subscription (monthly digital lesson packs)</li>
                    <li>- One-off physical products (card deck pre-order)</li>
                  </ul>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-neutral-900 lowercase">5. growth analytics stack</h3>
                <ul className="text-neutral-600 lowercase space-y-1 pl-4">
                  <li>• Event tracking on sign-ups, content engagement, and referral sources</li>
                  <li>• Dashboard surfaces which topics resonate most → informs next product sprint</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="px-4 py-12 border-b">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">results (first 90 days)</h2>

            <div className="space-y-4">
              <p className="text-neutral-600 lowercase">
                <span className="font-medium">Audience sprouted fast.</span> 1,200+ parents & 37 schools joined the
                wait-list—without paid ads.
              </p>
              <p className="text-neutral-600 lowercase">
                <span className="font-medium">Story amplified.</span> Claire's TED Talk views jumped 65% after the site
                launch week.
              </p>
              <p className="text-neutral-600 lowercase">
                <span className="font-medium">Community forming.</span> Avg. visitor reads 2.8 blog posts and downloads
                at least one resource.
              </p>
              <p className="text-neutral-600 lowercase">
                <span className="font-medium">Actionable data in hand.</span> Heat-maps show lesson-plan templates drive
                the most clicks, guiding the premium roadmap.
              </p>
            </div>

            <div className="mt-8 p-6 bg-[#f8f5f1] rounded-lg">
              <blockquote className="text-lg italic text-neutral-700 lowercase">
                "Prism translated my fuzzy ideas into a platform parents actually <em>use</em>. I finally feel the
                movement taking shape."
              </blockquote>
              <p className="mt-2 font-medium text-neutral-900 lowercase">— Claire Frattarola, Founder</p>
            </div>
          </div>
        </section>

        {/* What's Next Section */}
        <section className="px-4 py-12 border-b">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">what's next</h2>

            <ul className="text-neutral-600 lowercase space-y-2 pl-4">
              <li>• Build member dashboards & gamified emotion-skills tracker</li>
              <li>• Launch card-deck pre-order campaign (integrated Shopify Lite checkout)</li>
              <li>• Spin up targeted Meta & Pinterest ads once CAC benchmarks are clear</li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter lowercase sm:text-3xl">
                want to turn vision into a movement?
              </h2>
              <div className="pt-4">
                <Link href="/get-started">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 lowercase"
                    onClick={() => trackCTAClick("get started", "we are saplings case study")}
                  >
                    schedule a discovery chat <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CaseStudySchema
        title="we are saplings case study | prism"
        description="How Prism helped We Are Saplings launch a digital platform to give kids playful tools for understanding and managing emotions."
        url="https://design-prism.com/case-studies/we-are-saplings"
        imageUrl="https://design-prism.com/we-are-saplings-hero.png"
        datePublished="2025-04-01T00:00:00.000Z"
        dateModified="2025-04-01T00:00:00.000Z"
        clientName="We Are Saplings"
        outcome="1,200+ parents and 37 schools joined the wait-list, TED Talk views up 65%"
      />
      <div className="mt-12">
        <SocialShare
          url="https://design-prism.com/case-studies/we-are-saplings"
          imageUrl="https://design-prism.com/we-are-saplings-hero.png"
          title="We Are Saplings Case Study"
          description="Learn how we built a platform to connect parents with the best early childhood education."
        />
      </div>
    </div>
  )
}
