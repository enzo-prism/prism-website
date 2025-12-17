"use client"

import Footer from "@/components/footer"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import YouTubeVideoEmbed from "@/components/youtube-video-embed"
import { useCaseStudyStickyNavHeight } from "@/hooks/use-case-study-sticky-nav"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const CLIENT_SITE = "https://lagunabeachdentalarts.com"

export default function LagunaBeachDentalArtsCaseStudy() {
  const stickyNavRef = useRef<HTMLDivElement>(null)
  useCaseStudyStickyNavHeight(stickyNavRef)

  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]")
      let currentSection = ""
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop < 200) currentSection = section.getAttribute("data-section") || ""
      })
      if (currentSection !== activeSection) setActiveSection(currentSection)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`)
    if (section instanceof HTMLElement) section.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Hero (minimal, text-only) */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                post‑m&a relaunch for laguna beach dental arts
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                brand refresh, modern website, full‑funnel acquisition channels and end‑to‑end tracking
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit lagunabeachdentalarts.com
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop TOC */}
        <div
          ref={stickyNavRef}
          className="hidden lg:block sticky top-[var(--prism-header-height)] z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="py-4 flex gap-6 text-sm overflow-x-auto scrollbar-hide">
              {[
                ["overview", "Overview"],
                ["situation", "The Situation"],
                ["solution", "Our Solution"],
                ["results", "Results"],
                ["interview", "Founder Interview"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(String(id))}
                  className={`whitespace-nowrap ${activeSection === id ? "font-medium text-black" : "text-neutral-500"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Mobile TOC */}
            <div className="lg:hidden border-b pb-6 mt-6">
              <h2 className="font-medium mb-4 lowercase">Contents</h2>
              <ul className="space-y-3 text-sm">
                {[
                  ["overview", "Overview"],
                  ["situation", "The Situation"],
                  ["solution", "Our Solution"],
                  ["results", "Results"],
                  ["interview", "Founder Interview"],
                ].map(([id, label]) => (
                  <li key={id as string}>
                    <button
                      onClick={() => scrollToSection(String(id))}
                      className={`flex items-center ${activeSection === id ? "font-medium text-black" : "text-neutral-500"}`}
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main */}
            <div className="col-span-1 lg:col-span-4">
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center border-t pt-8">
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">100%</div>
                  <div className="text-sm text-neutral-600 lowercase">retained patient continuity post‑m&a</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">first‑page</div>
                  <div className="text-sm text-neutral-600 lowercase">ranking for core local terms</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">full‑funnel</div>
                  <div className="text-sm text-neutral-600 lowercase">analytics & attribution</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">multi‑channel</div>
                  <div className="text-sm text-neutral-600 lowercase">organic + paid acquisition</div>
                </div>
              </div>

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">from transition to traction</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    After a change in ownership, laguna beach dental arts needed a fast and confident relaunch: a new
                    brand expression, a modern website, and acquisition systems that would sustain the practice while
                    preserving patient trust.
                  </p>
                  <p>
                    We partnered directly with the new owner‑dentist to ship a complete relaunch—brand, site, channels,
                    and analytics—built to perform from day one.
                  </p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">brand and web gap</h3>
                      <p className="text-neutral-600">legacy brand fragments and template‑driven web experience</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">acquisition blindspots</h3>
                      <p className="text-neutral-600">no structured SEO, no reliable ad pipeline, inconsistent intake</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">no measurement</h3>
                      <p className="text-neutral-600">limited analytics, no attribution, no conversion tracking</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Solution */}
              <section className="py-8 border-t" data-section="solution">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">our solution</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">new brand system</h3>
                      <p className="text-neutral-600">clean visual identity, tone of voice, and on‑site messaging</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">custom website</h3>
                      <p className="text-neutral-600">fast, mobile‑first architecture with conversion‑oriented UX</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">seo + listings</h3>
                      <p className="text-neutral-600">structured site architecture, content plan, gmb optimization</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">paid acquisition</h3>
                      <p className="text-neutral-600">geo‑targeted search campaigns and high‑intent landing flows</p>
                    </div>
                    <div>
                      <h3 className="font-medium lowercase">end‑to‑end tracking</h3>
                      <p className="text-neutral-600">events, goals, form capture, and call tracking integrated</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Results */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">results</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-green-600">✓</span>
                        <div>
                          <span className="font-semibold lowercase">frictionless relaunch</span>
                          <p className="text-neutral-600 text-sm">no disruption to patient scheduling post‑m&a</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-600">✓</span>
                        <div>
                          <span className="font-semibold lowercase">search visibility</span>
                          <p className="text-neutral-600 text-sm">first‑page presence for key local queries</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-green-600">✓</span>
                        <div>
                          <span className="font-semibold lowercase">measurable pipeline</span>
                          <p className="text-neutral-600 text-sm">end‑to‑end tracking from click to appointment</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-600">✓</span>
                        <div>
                          <span className="font-semibold lowercase">multi‑channel growth</span>
                          <p className="text-neutral-600 text-sm">organic + paid acquisition working in tandem</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interview video */}
              <section className="py-8 border-t" data-section="interview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">founder interview</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Conversation with the new owner‑dentist about the relaunch process and outcomes.</p>
                  <YouTubeVideoEmbed
                    videoId="wCQrUajsnk8"
                    title="Laguna Beach Dental Arts — Owner Interview"
                    className="rounded-lg overflow-hidden"
                  />
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to relaunch with confidence?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">
                    post‑m&a transitions demand clarity, speed, and measurement. we can help you keep momentum while
                    leveling up your digital presence.
                  </p>
                  <p className="text-sm text-neutral-600 lowercase max-w-2xl mx-auto">
                    built with prism’s{" "}
                    <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                      dental practice website system
                    </Link>
                    .
                  </p>
                <div className="pt-6">
                  <Link href="/get-started">
                    <Button
                      className="rounded-full px-8 py-6 text-lg lowercase"
                      onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "laguna beach dental arts case study")}
                    >
                      {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
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
                  url="https://www.design-prism.com/case-studies/laguna-beach-dental-arts"
                  title="Laguna Beach Dental Arts Case Study"
                  description="Post‑M&A relaunch: brand, website, acquisition channels, and tracking."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="laguna beach dental arts — post‑m&a relaunch"
        description="how we partnered with laguna beach dental arts to relaunch brand, website, and acquisition with full‑funnel tracking"
        url="https://www.design-prism.com/case-studies/laguna-beach-dental-arts"
        datePublished="2025-03-05T00:00:00.000Z"
        dateModified="2025-03-05T00:00:00.000Z"
        clientName="Laguna Beach Dental Arts"
        outcome="patient continuity preserved post‑m&a, first‑page search presence, measurable pipeline from click to appointment"
      />
    </div>
  )
}
