"use client"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export default function OlympicBootworksCaseStudy() {
  const [activeSection, setActiveSection] = useState("")

  // Track scroll position to highlight active section in table of contents
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]")
      let currentSection = ""

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop < 200) {
          currentSection = section.getAttribute("data-section") || ""
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Scroll to section when clicking on table of contents
  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`)
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Olympic Bootworks Case Study" />
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Minimal Hero Section (text-only) */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                from 10/100 online to an always-open revenue engine
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                how we transformed olympic bootworks from a seasonal tahoe shop into a year-round digital powerhouse
              </p>
              <p className="text-sm text-neutral-500 italic lowercase">
                the transformation: from outdated squarespace template to custom e-commerce powerhouse
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents - Desktop */}
        <div className="hidden lg:block sticky top-16 bg-white border-b z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="py-4 flex gap-6 text-sm overflow-x-auto scrollbar-hide">
              <button
                onClick={() => scrollToSection("overview")}
                className={`whitespace-nowrap ${activeSection === "overview" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("challenge")}
                className={`whitespace-nowrap ${activeSection === "challenge" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                The Challenge
              </button>
              <button
                onClick={() => scrollToSection("solution")}
                className={`whitespace-nowrap ${activeSection === "solution" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Our Solution
              </button>
              <button
                onClick={() => scrollToSection("results")}
                className={`whitespace-nowrap ${activeSection === "results" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Results
              </button>
              <button
                onClick={() => scrollToSection("partnership")}
                className={`whitespace-nowrap ${activeSection === "partnership" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Partnership
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden border-b pb-6 mt-6">
              <h2 className="font-medium mb-4 lowercase">Contents</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("overview")}
                    className={`flex items-center ${activeSection === "overview" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("challenge")}
                    className={`flex items-center ${activeSection === "challenge" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    The Challenge
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("solution")}
                    className={`flex items-center ${activeSection === "solution" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Our Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("results")}
                    className={`flex items-center ${activeSection === "results" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Results
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("partnership")}
                    className={`flex items-center ${activeSection === "partnership" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Partnership
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-4">
              {/* Key Stats - Minimal Design */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center border-t pt-8">
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">300%+</div>
                  <div className="text-sm text-neutral-600 lowercase">organic impressions</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">$25k+</div>
                  <div className="text-sm text-neutral-600 lowercase">e-bike sales (90 days)</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">150+</div>
                  <div className="text-sm text-neutral-600 lowercase">online bookings</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">85%</div>
                  <div className="text-sm text-neutral-600 lowercase">speed improvement</div>
                </div>
              </div>

              {/* Overview Section */}
              <section className="py-8 border-t" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  olympic bootworks: legendary on the slopes, invisible online
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    Olympic Bootworks in Tahoe, California, had built a legendary reputation among skiers and
                    snowboarders for their custom boot-fitting expertise and high-end e-bike selection. Founded by Buck
                    Brown, the shop was the go-to destination for serious athletes who demanded perfect equipment.
                  </p>
                  <p>
                    But despite their stellar offline reputation, Olympic Bootworks faced a critical challenge: their
                    digital presence was virtually non-existent. With a dated Squarespace template and no e-commerce
                    capabilities, they were missing out on significant revenue opportunities and struggling to serve
                    customers during the off-season.
                  </p>
                </div>
              </section>

              {/* The Challenge Section */}
              <section className="py-8 border-t" data-section="challenge">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the challenge: 100/100 offline, 10/100 online
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Olympic Bootworks came to us with a stark contrast in their business performance:</p>

                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase text-green-800">offline excellence</h3>
                      <p className="text-green-700 text-sm">
                        Perfect reputation, loyal customers, expert service, premium inventory
                      </p>
                      <div className="text-2xl font-bold text-green-600 mt-2">100/100</div>
                    </div>

                    <div className="bg-white border border-neutral-200 p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase text-neutral-900">online presence</h3>
                      <p className="text-neutral-600 text-sm">
                        Dated website, no e-commerce, poor mobile experience, zero analytics
                      </p>
                      <div className="text-2xl font-bold text-neutral-900 mt-2">10/100</div>
                    </div>
                  </div>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">the specific problems</h3>
                      <ul className="mt-2 space-y-2 text-neutral-600">
                        <li>• dated squarespace template hurt ux, seo, and credibility</li>
                        <li>• no e-commerce despite six-figure e-bike inventory</li>
                        <li>• no way to book fittings in the off-season</li>
                        <li>• zero analytics, ads, or structured seo</li>
                        <li>• seasonal cash flow challenges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Solution Section */}
              <section className="py-8 border-t" data-section="solution">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  our solution: building an always-open revenue engine
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    We approached Olympic Bootworks' transformation with a comprehensive strategy that would address
                    every aspect of their digital presence:
                  </p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">1. discovery & brand story</h3>
                      <p className="text-neutral-600">
                        Deep interviews with founder Buck Brown to understand the brand essence and create a
                        crystal-clear UX brief that would translate their offline excellence online.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">2. custom-built website</h3>
                      <p className="text-neutral-600">
                        Designed and coded from scratch—lightning-fast, mobile-first, featuring athlete imagery and
                        conversion-oriented copy that speaks to their target audience.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">3. lightspeed retail integration</h3>
                      <p className="text-neutral-600">
                        Real-time inventory sync between the shop floor and new web store, ensuring accurate stock
                        levels and seamless operations.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">4. e-commerce & payments</h3>
                      <p className="text-neutral-600">
                        High-ticket e-bikes now purchasable end-to-end online with Apple Pay and Google Pay integration
                        for frictionless checkout.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">5. 24/7 booking engine</h3>
                      <p className="text-neutral-600">
                        Riders can now schedule custom boot-fits year-round—even when Tahoe storefronts hibernate for
                        summer, creating off-season revenue.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">6. analytics foundation</h3>
                      <p className="text-neutral-600">
                        Event tracking, funnel mapping, and search-intent capture—providing data for every growth lever
                        and optimization opportunity.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">7. review flywheel</h3>
                      <p className="text-neutral-600">
                        5-star Yelp reviews surfaced site-wide for SEO juice and instant trust-building with new
                        visitors.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Results Section */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the transformation: measurable impact in 90 days
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>The results spoke for themselves within the first 90 days:</p>

                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <div>
                          <span className="font-semibold lowercase">visibility exploded</span>
                          <p className="text-neutral-600 text-sm">
                            organic impressions up 300%+ within weeks, dramatically increasing brand awareness
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <div>
                          <span className="font-semibold lowercase">new revenue unlocked</span>
                          <p className="text-neutral-600 text-sm">
                            first online e-bike sold 48 hours after launch, generating $25k+ in new sales
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <div>
                          <span className="font-semibold lowercase">off-season cash-flow smoothed</span>
                          <p className="text-neutral-600 text-sm">
                            150+ fitting appointments booked months in advance, creating predictable revenue
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <div>
                          <span className="font-semibold lowercase">data-driven roadmap enabled</span>
                          <p className="text-neutral-600 text-sm">
                            comprehensive dashboards now guide every CRO and advertising sprint
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Client Testimonial (text-only) */}
                  <div className="border-l-4 border-neutral-300 p-6 my-8 bg-neutral-50">
                    <blockquote className="text-lg italic lowercase">
                      "the new site is night-and-day. customers keep telling us how easy it is to buy and book online—exactly what we needed while we focus on the slopes."
                    </blockquote>
                    <p className="mt-3 text-sm text-neutral-600 lowercase">— buck brown, founder of olympic bootworks</p>
                  </div>
                </div>
              </section>

              {/* Partnership Section */}
              <section className="py-8 border-t" data-section="partnership">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  what's next: scaling the momentum
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>With the foundation in place, we're now focused on scaling Olympic Bootworks' digital success:</p>

                  <div className="grid gap-4 md:grid-cols-3 my-6">
                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">targeted advertising</h3>
                      <p className="text-neutral-600 text-sm">
                        launch segmented google & meta campaigns tied to real-time product feeds
                      </p>
                    </div>

                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">customer retention</h3>
                      <p className="text-neutral-600 text-sm">
                        roll out personalized post-purchase flows to drive repeat sales and loyalty
                      </p>
                    </div>

                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">service expansion</h3>
                      <p className="text-neutral-600 text-sm">
                        expand booking engine to injury assessments & pro-fit clinics
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">
                    ready to turn your brick-and-mortar momentum into 24/7 growth?
                  </h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">
                    Like Olympic Bootworks, many established businesses have incredible offline success but struggle
                    online. If you're ready to unlock your digital potential and create an always-open revenue engine,
                    let's talk.
                  </p>
                <div className="pt-6">
                  <Link href="/get-started">
                    <Button
                      className="rounded-full px-8 py-6 text-lg lowercase"
                      onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "case study bottom")}
                    >
                      {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                </div>
              </section>

              {/* Navigation Section */}
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
            </div>
          </div>
        </div>
        <div className="mt-12">
          <SocialShare
            url="https://design-prism.com/case-studies/olympic-bootworks"
            title="Olympic Bootworks Case Study"
            description="Discover how we crafted a digital presence for a premier ski boot fitting shop."
          />
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title="olympic bootworks case study - from 10/100 online to always-open revenue engine"
        description="discover how prism transformed olympic bootworks from a dated squarespace template to a lightning-fast e-commerce powerhouse with real-time inventory sync and 24/7 booking engine."
        url="https://design-prism.com/case-studies/olympic-bootworks"
        imageUrl={undefined as unknown as string}
        datePublished="2025-03-01T00:00:00.000Z"
        dateModified="2025-03-01T00:00:00.000Z"
        clientName="Olympic Bootworks"
        outcome="300%+ organic visibility, $25k+ online sales, and 150+ bookings in the first 90 days"
      />
    </div>
  )
}
