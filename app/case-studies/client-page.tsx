"use client"

import CaseStudyCard from "@/components/case-study-card"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Case Studies" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl">
                client success stories
              </h1>
              <p className="text-neutral-600 lowercase md:text-lg max-w-2xl mx-auto md:mx-0">
                explore how we've helped businesses achieve remarkable growth through strategic digital solutions
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies List - Minimalist Design */}
        <section className="px-4 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-6">
              {CASE_STUDIES.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  title={study.title}
                  client={study.client}
                  industry={study.industry}
                  location={study.location}
                  description={study.description}
                  slug={study.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter lowercase sm:text-3xl">
                ready to become our next success story?
              </h2>
              <p className="text-neutral-600 lowercase">let's discuss how we can help your business grow</p>
              <div className="pt-4">
                <Link href="/get-started">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 lowercase"
                    onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "case studies page")}
                  >
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
