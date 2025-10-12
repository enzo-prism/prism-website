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

export default function GraceDentalSantaRosaCaseStudy() {
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
    if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Grace Dental Santa Rosa Case Study" />
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">post‑m&a relaunch for grace dental santa rosa</h1>
              <p className="text-xl text-neutral-600 lowercase">new brand, modern website, multi‑channel acquisition, and tracking</p>
            </div>
          </div>
        </section>

        {/* Desktop TOC */}
        <div className="hidden lg:block sticky top-16 bg-white border-b z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="py-4 flex gap-6 text-sm overflow-x-auto scrollbar-hide">
              {[["overview","Overview"],["situation","The Situation"],["solution","Our Solution"],["results","Results"],["interview","Owner Interview"]].map(([id,label]) => (
                <button key={id} onClick={() => scrollToSection(String(id))} className={`whitespace-nowrap ${activeSection===id?"font-medium text-black":"text-neutral-500"}`}>{label}</button>
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
                {[["overview","Overview"],["situation","The Situation"],["solution","Our Solution"],["results","Results"],["interview","Owner Interview"]].map(([id,label]) => (
                  <li key={id as string}>
                    <button onClick={() => scrollToSection(String(id))} className={`flex items-center ${activeSection===id?"font-medium text-black":"text-neutral-500"}`}>
                      <ChevronRight className="h-3 w-3 mr-1" />{label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main */}
            <div className="col-span-1 lg:col-span-4">
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center border-t pt-8">
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">patient first</div><div className="text-sm text-neutral-600 lowercase">clear paths to exams & cleanings</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">search ready</div><div className="text-sm text-neutral-600 lowercase">structured content for services</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">multi‑channel</div><div className="text-sm text-neutral-600 lowercase">organic + paid acquisition</div></div>
                <div className="border p-4 rounded-md"><div className="text-2xl font-bold mb-1 lowercase">tracking</div><div className="text-sm text-neutral-600 lowercase">events, forms, and calls</div></div>
              </div>

              {/* Overview */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">exceptional family dental care, modernized</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Grace Dental in Santa Rosa, led by Dr. Tingjen Ji, provides comprehensive family dentistry—from preventive care to implants and cosmetic treatments.</p>
                  <p>We partnered post‑M&A to relaunch the brand and website, stand up acquisition channels, and implement end‑to‑end tracking.</p>
                </div>
              </section>

              {/* Situation */}
              <section className="py-8 border-t" data-section="situation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">the situation</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div><h3 className="font-medium lowercase">fragmented brand</h3><p className="text-neutral-600">multiple templates and inconsistent messaging</p></div>
                    <div><h3 className="font-medium lowercase">limited findability</h3><p className="text-neutral-600">service content not structured for search</p></div>
                    <div><h3 className="font-medium lowercase">no attribution</h3><p className="text-neutral-600">calls and forms not tied to channels</p></div>
                  </div>
                </div>
              </section>

              {/* Solution */}
              <section className="py-8 border-t" data-section="solution">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">our solution</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div><h3 className="font-medium lowercase">brand refresh</h3><p className="text-neutral-600">tone, typography, and service positioning</p></div>
                    <div><h3 className="font-medium lowercase">custom site</h3><p className="text-neutral-600">fast, mobile‑first pages with clear conversion points</p></div>
                    <div><h3 className="font-medium lowercase">seo + content</h3><p className="text-neutral-600">service hubs (exams, cleanings, implants, veneers, whitening)</p></div>
                    <div><h3 className="font-medium lowercase">paid search</h3><p className="text-neutral-600">high‑intent campaigns for priority procedures</p></div>
                    <div><h3 className="font-medium lowercase">analytics stack</h3><p className="text-neutral-600">events, form capture, and call tracking end‑to‑end</p></div>
                  </div>
                </div>
              </section>

              {/* Results */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">results</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">confident relaunch</span><p className="text-neutral-600 text-sm">patient‑friendly paths to care</p></div></div>
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">findable services</span><p className="text-neutral-600 text-sm">structured hubs for core procedures</p></div></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">measurable growth</span><p className="text-neutral-600 text-sm">from click to booked appointment</p></div></div>
                      <div className="flex items-start gap-3"><span className="text-green-600">✓</span><div><span className="font-semibold lowercase">multi‑channel demand</span><p className="text-neutral-600 text-sm">organic + paid working together</p></div></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Owner Interview (embed optional video if provided later) */}
              <section className="py-8 border-t" data-section="interview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">owner interview</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Conversation with Dr. Tingjen Ji about the relaunch and patient‑first approach.</p>
                  {/* If a video interview exists in the future, it can be embedded here using YouTubeVideoEmbed */}
                </div>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">ready to relaunch with clarity?</h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">we’ll help you ship a brand, site, and acquisition stack that patients—and search engines—love.</p>
                  <div className="pt-6">
                    <Link href="/get-started">
                      <Button
                        className="rounded-full px-8 py-6 text-lg lowercase"
                        onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "grace dental santa rosa case study")}
                      >
                        {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Nav */}
              <div className="flex justify-between py-8">
                <Link href="/case-studies"><Button variant="outline" className="rounded-full lowercase"><ArrowLeft className="mr-2 h-4 w-4" /> all case studies</Button></Link>
                <Link href="/get-started">
                  <Button variant="outline" className="rounded-full lowercase">
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Share */}
              <div className="mt-12">
                <SocialShare url="https://design-prism.com/case-studies/grace-dental-santa-rosa" title="Grace Dental Santa Rosa Case Study" description="Post‑M&A relaunch: brand, website, acquisition channels, and tracking for a family dental practice." />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CaseStudySchema
        title="grace dental santa rosa — post‑m&a relaunch"
        description="how we partnered post‑m&a to relaunch brand and website, and implement acquisition and tracking"
        url="https://design-prism.com/case-studies/grace-dental-santa-rosa"
        datePublished="2025-03-05T00:00:00.000Z"
        dateModified="2025-03-05T00:00:00.000Z"
        clientName="Grace Dental Santa Rosa (Tingjen Ji, DDS MSD)"
        outcome="patient‑friendly site architecture, findable service hubs, and measurable acquisition"
      />
    </div>
  )
}
