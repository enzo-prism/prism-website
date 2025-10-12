"use client"

import CaseStudyCard from "@/components/case-study-card"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

// Define the case study type
interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  location: string
  description: string
  slug: string
}

export default function CaseStudiesPage() {
  // Case studies data - only real case studies
  const caseStudies: CaseStudy[] = [
    {
      id: "1",
      title: "Powering a Seamless Transition",
      client: "Dr. Christopher B. Wong",
      industry: "Dentistry",
      location: "Palo Alto, CA",
      description:
        "How we helped achieve 100% patient retention during practice transition and drive sustainable growth.",
      slug: "dr-christopher-wong",
    },
    {
      id: "2",
      title: "Aligning Digital Excellence with Luxury Care",
      client: "Exquisite Dentistry",
      industry: "High-End Dentistry",
      location: "Beverly Hills, CA",
      description: "Creating a sophisticated online experience that matches their premium in-person patient care.",
      slug: "exquisite-dentistry",
    },
    {
      id: "3",
      title: "From 10/100 Online to Always-Open Revenue Engine",
      client: "Olympic Bootworks",
      industry: "Retail & E-Commerce",
      location: "Tahoe, CA",
      description: "Full-stack digital overhaul: brand-new site, e-commerce build, analytics & growth program.",
      slug: "olympic-bootworks",
    },
    {
      id: "4",
      title: "Post‑M&A Relaunch with Measurable Growth",
      client: "Laguna Beach Dental Arts",
      industry: "Dentistry",
      location: "Laguna Beach, CA",
      description:
        "New brand, custom website, multi‑channel acquisition and end‑to‑end tracking working in tandem.",
      slug: "laguna-beach-dental-arts",
    },
    {
      id: "5",
      title: "Family‑Focused Website with Clear Conversion",
      client: "Family First Smile Care",
      industry: "Dentistry",
      location: "Los Gatos, CA",
      description:
        "Services clarity, office comforts, and measurable conversion flows built for families.",
      slug: "family-first-smile-care",
    },
    {
      id: "6",
      title: "Family Dentistry Growth System",
      client: "Town Centre Dental",
      industry: "Dentistry",
      location: "Brentwood, CA",
      description:
        "Modern website, clear services, streamlined booking, and end‑to‑end analytics.",
      slug: "town-centre-dental",
    },
    {
      id: "7",
      title: "Post‑M&A Relaunch for a Family Dental Practice",
      client: "Grace Dental Santa Rosa",
      industry: "Dentistry",
      location: "Santa Rosa, CA",
      description:
        "Brand refresh, custom site, multi‑channel acquisition, and tracking built for scale.",
      slug: "grace-dental-santa-rosa",
    },
  ]

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
              {caseStudies.map((study) => (
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
