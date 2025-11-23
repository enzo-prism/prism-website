"use client"

import { ExquisiteChannelShareChart } from "@/components/case-studies/exquisite-channel-share-chart"
import { ExquisiteSessionsGrowthChart } from "@/components/case-studies/exquisite-sessions-growth-chart"
import { ExquisiteSpeedGauge } from "@/components/case-studies/exquisite-speed-gauge"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const CLIENT_SITE = "https://exquisitedentistryla.com/"

export default function ExquisiteDentistryCaseStudy() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]")
      let current = ""
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top
        if (top < 200) {
          current = section.getAttribute("data-section") || ""
        }
      })
      if (current !== activeSection) setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Exquisite Dentistry Case Study" />
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Aligning Digital Excellence with Luxury Care</h1>
              <p className="text-xl text-neutral-600">How Prism elevated Beverly Hills' Exquisite Dentistry's online presence to match their premium in-person experience.</p>
              <p className="text-neutral-500">Practice owner: <strong>Dr. Alexie Aguil</strong></p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit exquisitedentistryla.com
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-10 mb-6">
              <Image src="/exquisite-dentistry-consultation.png" alt="Exquisite Dentistry consultation" width={800} height={450} className="rounded-md w-full h-auto" priority />
            </div>
          </div>
        </section>

        {/* Table of Contents - Desktop */}
        <div className="hidden lg:block sticky top-16 bg-white border-b z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="py-4 flex gap-6 text-sm overflow-x-auto scrollbar-hide">
              <button onClick={() => scrollToSection("overview")} className={`whitespace-nowrap ${activeSection === "overview" ? "font-medium text-black" : "text-neutral-500"}`}>Overview</button>
              <button onClick={() => scrollToSection("opportunity")} className={`whitespace-nowrap ${activeSection === "opportunity" ? "font-medium text-black" : "text-neutral-500"}`}>The Opportunity</button>
              <button onClick={() => scrollToSection("approach")} className={`whitespace-nowrap ${activeSection === "approach" ? "font-medium text-black" : "text-neutral-500"}`}>Our Approach</button>
              <button onClick={() => scrollToSection("transformation")} className={`whitespace-nowrap ${activeSection === "transformation" ? "font-medium text-black" : "text-neutral-500"}`}>Transformation</button>
              <button onClick={() => scrollToSection("results")} className={`whitespace-nowrap ${activeSection === "results" ? "font-medium text-black" : "text-neutral-500"}`}>Results</button>
              <button onClick={() => scrollToSection("insights")} className={`whitespace-nowrap ${activeSection === "insights" ? "font-medium text-black" : "text-neutral-500"}`}>Insights</button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden border-b pb-6 mt-6">
              <h2 className="font-medium mb-4">Contents</h2>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => scrollToSection("overview")} className={`flex items-center ${activeSection === "overview" ? "font-medium text-black" : "text-neutral-500"}`}><ChevronRight className="h-3 w-3 mr-1" />Overview</button></li>
                <li><button onClick={() => scrollToSection("opportunity")} className={`flex items-center ${activeSection === "opportunity" ? "font-medium text-black" : "text-neutral-500"}`}><ChevronRight className="h-3 w-3 mr-1" />The Opportunity</button></li>
                <li><button onClick={() => scrollToSection("approach")} className={`flex items-center ${activeSection === "approach" ? "font-medium text-black" : "text-neutral-500"}`}><ChevronRight className="h-3 w-3 mr-1" />Our Approach</button></li>
                <li><button onClick={() => scrollToSection("transformation")} className={`flex items-center ${activeSection === "transformation" ? "font-medium text-black" : "text-neutral-500"}`}><ChevronRight className="h-3 w-3 mr-1" />Transformation</button></li>
                <li><button onClick={() => scrollToSection("results")} className={`flex items-center ${activeSection === "results" ? "font-medium text-black" : "text-neutral-500"}`}><ChevronRight className="h-3 w-3 mr-1" />Results</button></li>
                <li><button onClick={() => scrollToSection("insights")} className={`flex items-center ${activeSection === "insights" ? "font-medium text-black" : "text-neutral-500"}`}><ChevronRight className="h-3 w-3 mr-1" />Insights</button></li>
              </ul>
            </div>

            <div className="col-span-1 lg:col-span-4">
              {/* Overview */}
              <section className="py-8 border-t" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Overview</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead>
                      <tr>
                        <th className="border px-3 py-2">At-a-Glance KPI</th>
                        <th className="border px-3 py-2">Last 12 Months*</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-3 py-2 font-medium">Search Clicks</td><td className="border px-3 py-2">9.3 K</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Search Impressions</td><td className="border px-3 py-2">1.67 M</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">New Users (GA4)</td><td className="border px-3 py-2">2.9 K</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Organic-Search Share of Sessions</td><td className="border px-3 py-2">64 %</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Avg. Engagement Rate (Organic)</td><td className="border px-3 py-2">60.7 %</td></tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-neutral-500 mt-2">*Google Search Console & Google Analytics 4, Jun 2024 – Jun 2025.</p>
                </div>
              </section>

              {/* Opportunity */}
              <section className="py-8 border-t" data-section="opportunity">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">The Opportunity — Bridging the Digital–Physical Divide</h2>
                <ol className="list-decimal space-y-4 pl-6">
                  <li><p><strong>Out-of-date mobile experience</strong><br /><em>Mobile CTR sat at just <strong>0.3 %</strong> and average rank hovered near page 5.</em></p></li>
                  <li><p><strong>Brand incongruence</strong><br />High-end photography and celebrity testimonials were hidden behind clunky navigation.</p></li>
                  <li><p><strong>Visibility gaps</strong><br />Directory inconsistencies made it harder for Google to surface the practice locally.</p></li>
                </ol>
              </section>

              {/* Approach */}
              <section className="py-8 border-t" data-section="approach">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Prism's Approach — Crafting a Patient-Centric Digital Ecosystem</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead>
                      <tr><th className="border px-3 py-2">Pillar</th><th className="border px-3 py-2">What We Did</th><th className="border px-3 py-2">Result</th></tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-3 py-2 font-medium">Bespoke Website Rebuild</td><td className="border px-3 py-2">Hand-coded, mobile-first framework (2.1 s LCP).</td><td className="border px-3 py-2">Load time cut <strong>50 %</strong>; mobile CTR rose to <strong>0.7 %</strong>.</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">UX First</td><td className="border px-3 py-2">Instagram-style navigation, thumb-zone CTAs.</td><td className="border px-3 py-2">Avg. pages per mobile session doubled.</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Content Remix</td><td className="border px-3 py-2">Integrated pro photos & video testimonials across service pages.</td><td className="border px-3 py-2"><strong>+68 %</strong> clicks on "veneers" & "teeth-whitening" queries.</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Listing Clean-Up</td><td className="border px-3 py-2">Synced NAP data across 40+ directories.</td><td className="border px-3 py-2">Consistent local-pack visibility.</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Ad Campaigns</td><td className="border px-3 py-2">High-intent Instagram retargeting.</td><td className="border px-3 py-2">Funnel filled while organic traffic ramped.</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Systems Integration</td><td className="border px-3 py-2">Connected online scheduling & VOIP tracking.</td><td className="border px-3 py-2">Leads drop straight into the PMS.</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">AI-Ready Schema</td><td className="border px-3 py-2">Added FAQ & Review markup.</td><td className="border px-3 py-2">Prepares site for Google SGE & chat-based search.</td></tr>
                    </tbody>
                  </table>
                </div>
                {/* Removed interactive KPI chart per latest update */}
              </section>

              {/* Transformation */}
              <section className="py-8 border-t" data-section="transformation">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">The Transformation — 90-Day Pre- vs Post-Launch <span className="block text-sm font-normal">(Jan 1 – Mar 31 vs Apr 1 – Jun 30 2025)</span></h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead>
                      <tr><th className="border px-3 py-2">Metric</th><th className="border px-3 py-2">Pre</th><th className="border px-3 py-2">Post</th><th className="border px-3 py-2">Δ</th></tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-3 py-2 font-medium">Avg. Google Rank (all queries)</td><td className="border px-3 py-2">48.2</td><td className="border px-3 py-2">37.0</td><td className="border px-3 py-2 font-medium">▲ 11.2</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Organic Click-Through Rate</td><td className="border px-3 py-2">0.32 %</td><td className="border px-3 py-2">0.71 %</td><td className="border px-3 py-2 font-medium">▲ 119 %</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Organic Sessions</td><td className="border px-3 py-2">1,134</td><td className="border px-3 py-2">2,195</td><td className="border px-3 py-2 font-medium">▲ 93 %</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Engagement Rate</td><td className="border px-3 py-2">52.4 %</td><td className="border px-3 py-2">60.7 %</td><td className="border px-3 py-2 font-medium">▲ 8.3 pp</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Events / Session</td><td className="border px-3 py-2">3.98</td><td className="border px-3 py-2">4.64</td><td className="border px-3 py-2 font-medium">▲ 16 %</td></tr>
                      <tr><td className="border px-3 py-2 font-medium">Avg. Page Load (LCP)</td><td className="border px-3 py-2">4.2 s</td><td className="border px-3 py-2">2.1 s</td><td className="border px-3 py-2 font-medium">▼ 50 %</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-neutral-600 mt-4">Practice staff note a clear uptick in veneer and whitening consultations, confirming the quality of incoming leads.</p>
                <div className="mt-6 space-y-6">
                  <ExquisiteSessionsGrowthChart />
                  <ExquisiteSpeedGauge />
                </div>
              </section>

              {/* Results */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Results That Matter</h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Luxury Brand Cohesion – The website now mirrors the spa-like, white-glove in-office feel.</li>
                  <li>High-Value Lead Surge – Form-fills and phone clicks up <strong>71 %</strong> (internal PMS).</li>
                  <li>Market Precision – <strong>46 %</strong> of new visitors originate from the LA metro (GA4 city heat map).</li>
                  <li>Future-Ready Foundation – Structured data and analytics wiring position the practice for AI-driven growth.</li>
                </ul>
                <div className="mt-8">
                  <ExquisiteChannelShareChart />
                </div>
              </section>

              {/* Partner Insights */}
              <section className="py-8 border-t" data-section="insights">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Partner Insights</h2>
                <p>Dr. Alexie Aguil and team now view the website as an authentic extension of their signature luxury experience—and prospective patients agree.</p>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8" data-section="cta">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Ready to Close the Digital Gap?</h2>
                  <p>If your offline experience screams five-star but your website whispers two-star, let's talk.<br />➡ <strong>Book a 15-min strategy call</strong> or explore more success stories.</p>
                  <div className="pt-6">
                    <Link href="/free-analysis">
                      <Button
                        className="rounded-full px-8 py-6 text-lg"
                        onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "case study bottom")}
                      >
                        {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Data Note */}
              <section className="py-8" data-section="data-note">
                <h3 className="font-medium mb-2">Data Note</h3>
                <p>Figures sourced from Google Search Console & GA4 for Exquisite Dentistry, Jun 2024 – Jun 2025. Improvement percentages compare 90-day windows before and after the Mar 2025 relaunch.</p>
                <p className="mt-2">Need the raw numbers or custom charts? Let us know—Prism can spin up an embeddable Looker Studio view in minutes.</p>
              </section>

              {/* Navigation */}
              <div className="flex justify-between py-8">
                <Link href="/case-studies">
                  <Button variant="outline" className="rounded-full"><ArrowLeft className="mr-2 h-4 w-4" /> all case studies</Button>
                </Link>
                <Link href="/free-analysis">
                  <Button variant="outline" className="rounded-full">
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SocialShare url="https://design-prism.com/case-studies/exquisite-dentistry" imageUrl="https://design-prism.com/exquisite-dentistry-consultation.png" title="Exquisite Dentistry Case Study" description="How Prism elevated Beverly Hills' Exquisite Dentistry's online presence." />
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title="aligning digital excellence with luxury care | exquisite dentistry case study"
        description="how prism elevated beverly hills' exquisite dentistry's online presence to match their premium in-person experience."
        url="https://design-prism.com/case-studies/exquisite-dentistry"
        imageUrl="https://design-prism.com/exquisite-dentistry-consultation.png"
        datePublished="2025-06-01T00:00:00.000Z"
        dateModified="2025-06-01T00:00:00.000Z"
        clientName="Exquisite Dentistry"
        outcome="higher-quality leads and luxury brand cohesion"
      />
    </div>
  )
}
