"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import IndustryROICard from "./industry-roi-card"
import { IndustryResultsSchema } from "./schema-markup/IndustryResultsSchema"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, ShoppingBag, Users, Stethoscope } from "lucide-react"
import { trackEvent } from "@/utils/analytics"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { useRevealAnimation } from "@/hooks/use-reveal-animation"
import { useMobile } from "@/hooks/use-mobile"


// Industry data
const industries = [
  {
    id: "dental",
    name: "dental",
    icon: <Stethoscope className="w-6 h-6" />,
    ltv: 7500,
    monthlyCustomers: 12,
    monthlyValue: 90000,
    investmentMin: 1200,
    investmentMax: 2000,
    roiMin: 45,
    roiMax: 75,
    caseStudies: [
      { name: "dr. wong", link: "/case-studies/dr-christopher-wong" },
      { name: "exquisite dentistry", link: "/case-studies/exquisite-dentistry" }
    ]
  },
  {
    id: "outdoor-sports",
    name: "outdoor sports",
    icon: <ShoppingBag className="w-6 h-6" />,
    ltv: 255,
    monthlyCustomers: 50,
    monthlyValue: 12750,
    investmentMin: 1200,
    investmentMax: 2000,
    roiMin: 6,
    roiMax: 10,
    caseStudies: [
      { name: "olympic bootworks", link: "/case-studies/olympic-bootworks" }
    ]
  },
  {
    id: "ecommerce",
    name: "e-commerce",
    icon: <Briefcase className="w-6 h-6" />,
    ltv: 250,
    monthlyCustomers: 60,
    monthlyValue: 15000,
    investmentMin: 1200,
    investmentMax: 2000,
    roiMin: 7.5,
    roiMax: 12.5,
    caseStudies: [
      { name: "fantic bike warehouse", link: "#" }
    ]
  },
  {
    id: "online-community",
    name: "online community",
    icon: <Users className="w-6 h-6" />,
    ltv: 600,
    monthlyCustomers: 20,
    monthlyValue: 12000,
    investmentMin: 1200,
    investmentMax: 2000,
    roiMin: 6,
    roiMax: 10,
    caseStudies: [
      { name: "coming soon" }
    ]
  }
]

export default function IndustryResultsSection() {
  const [activeIndustry, setActiveIndustry] = useState(0)
  const isMobile = useMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const { elementRef, isVisible } = useRevealAnimation({ threshold: 0.2 })

  const handleIndustryChange = (index: number) => {
    setActiveIndustry(index)
    trackEvent("click", {
      element_type: "industry_tab",
      industry: industries[index].name,
      previous_industry: industries[activeIndustry].name
    })
  }


  return (
    <>
      <IndustryResultsSchema results={industries} />
      <section 
        id="industry-results"
        ref={sectionRef}
        className={`py-16 md:py-24 bg-white ${isVisible ? 'reveal-fade visible' : 'reveal-fade'}`}
      >
        <div ref={elementRef} className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl gpu-accelerated">
              real results, real roi
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
              see what prism delivers for businesses like yours
            </p>
          </div>

          {/* Industry Tabs - Desktop */}
          {!isMobile && (
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-neutral-100 rounded-full p-1">
                {industries.map((industry, index) => (
                  <button
                    key={industry.id}
                    onClick={() => handleIndustryChange(index)}
                    className={`px-6 py-2 rounded-full text-sm font-medium lowercase transition-[background-color,color,box-shadow] duration-300 ${
                      activeIndustry === index
                        ? 'bg-black text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {industry.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Industry Cards - Mobile Carousel / Desktop Single */}
          <div className="mb-12">
            {isMobile ? (
              // Mobile: Horizontal scroll
              <div className="overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {industries.map((industry, index) => (
                    <div key={industry.id} className="w-[320px] shrink-0">
                      <IndustryROICard {...industry} isActive={true} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Desktop: Single card with animation
              <AnimatePresence mode="wait">
                <motion.div
                  key={industries[activeIndustry].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="max-w-2xl mx-auto"
                >
                  <IndustryROICard {...industries[activeIndustry]} isActive={true} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-sm text-neutral-500 lowercase mb-4">
              ready to see results like these for your business?
            </p>
            <Button
              className="rounded-full px-8 py-3 lowercase"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_text: FREE_AUDIT_CTA_TEXT,
                  cta_location: "industry_results_section",
                })
              }
              asChild
            >
              <a href="/free-analysis">
                {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
