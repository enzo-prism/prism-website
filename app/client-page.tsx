"use client"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { ArrowRight, ArrowUpRight, Briefcase } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import HeroReviewSliderCard from "@/components/home/HeroReviewSliderCard"

const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

// Lazy load below-the-fold components
const ScrollProgressBar = dynamic(() => import("@/components/scroll-progress-bar"), {
  ssr: false
})

// New homepage sections
// Use SSR for these sections to improve first paint/SEO
const ClientsSection = dynamic(() => import("@/components/home/Clients"), { ssr: false })
const ValuesSection = dynamic(() => import("@/components/home/ValuesSection"), { ssr: false })
const GrowthResultsSlider = dynamic(() => import("@/components/home/GrowthResultsSlider"), { ssr: false })
const HottestContentSection = dynamic(() => import("@/components/home/HottestContentSection"), { ssr: false })
const WebsitesFeatures = dynamic(() => import("@/components/home/WebsitesFeatures"), { ssr: false })
const SegmentsGrid = dynamic(() => import("@/components/home/SegmentsGrid"), { ssr: false })
const ReferralSection = dynamic(() => import("@/components/home/ReferralSection"), { ssr: false })
const CoreOfferingsSection = dynamic(() => import("@/components/home/CoreOfferingsSection"), { ssr: false })
const LatestPostsSection = dynamic(() => import("@/components/home/LatestPostsSection"), { ssr: false })
const GrowthHeadline = dynamic(() => import("@/components/home/GrowthHeadline"), { ssr: false })

// Import analytics functions directly for now (will optimize separately)
import CoreImage from "@/components/core-image"
// import GetStartedCTA from "@/components/GetStartedCTA" // removed from new homepage flow
import PageViewTracker from "@/components/page-view-tracker"
// import VideoWithPoster from "@/components/video-with-poster" // removed with testimonials section
// import { useRevealAnimation } from "@/hooks/use-reveal-animation" // no longer used on simplified homepage
import { LOGO_CONFIG, LOGO_SIZES } from "@/lib/constants"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"
// Render Service schema only on client to keep SSR HTML lean
const ServiceSchemaClient = dynamic(() => import("@/components/schema-markup").then(m => m.ServiceSchema), {
  ssr: false
})

export default function ClientPage() {
  const isMobile = useMobile()

  // Lazy loading states for below-the-fold sections
  // removed case studies and testimonials sections
  
  useEffect(() => {
    const fallbackHero = document.getElementById("static-home-hero")
    if (fallbackHero) {
      fallbackHero.setAttribute("data-hydrated-hidden", "true")
      fallbackHero.setAttribute("aria-hidden", "true")
      fallbackHero.style.display = "none"
    }
  }, [])

  // GPU-accelerated animation hooks
  // services section removed in new structure
  // removed testimonials and case studies animations
  // service cards staggered reveal removed in new structure

  // removed observers for case studies and testimonials

  // removed unused featuredCaseStudies data
  const openRoles = [
    {
      title: "contract front-end developer",
      href: "/careers/front-end-developer",
      meta: "contract / remote / 10-20 hrs/week"
    },
    {
      title: "contract replit builder",
      href: "/careers/replit-builder",
      meta: "contract / remote / ~10-20 hrs/week"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile && <ScrollProgressBar />} {/* Added this line */}
      <PageViewTracker title="Prism Agency" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section relative min-h-[90svh] flex items-center justify-center bg-white pt-14 md:pt-16">
          <div className="container relative mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
              <h1 className={`text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl ${!isMobile ? 'gpu-accelerated' : ''}`}>
                prism
              </h1>
              <div className="flex flex-col items-center w-full gap-5 sm:gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <Link href="/pricing">
                    <Button
                      className="rounded-full px-7 py-5 text-base sm:text-lg lowercase hardware-hover touch-feedback"
                      onClick={() => trackCTAClick("view pricing", "hero section")}
                    >
                      build your dream <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <HeroReviewSliderCard className="w-full max-w-sm sm:max-w-md" />
              </div>
            </div>
          </div>
        </section>

        <GrowthHeadline />

        {/* New homepage sections per updated structure */}
        <ClientsSection />
        <ValuesSection />
        <GrowthResultsSlider />
        <SegmentsGrid />
        <ReferralSection />
        <HottestContentSection />
        <CoreOfferingsSection />
        <WebsitesFeatures />
        <LatestPostsSection />

        {/* Additional content pruned per new simplified homepage */}

        {/* Flywheel section removed */}

        {/* Testimonials / Wall of Love section removed */}

        {/* Featured Case Studies section removed */}

        {/* Bottom CTA Section */}
        <section className="bg-neutral-50 dark:bg-neutral-800 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl gpu-accelerated">
                ready to hit your business goals?
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 lowercase md:text-lg">
                email support@design-prism.com to take the next steps
              </p>
              <div className="pt-6">
                <Link href="mailto:support@design-prism.com">
                  <Button
                    className="rounded-full px-8 py-6 text-lg lowercase hardware-hover touch-feedback scale-bounce"
                    onClick={() => trackCTAClick("email support", "bottom cta")}
                  >
                    email support <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="border-t border-neutral-100 dark:border-neutral-800 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-1/2">
                <CoreImage
                  src="/enzo-avatar.png"
                  alt="Enzo Sison, founder of Prism"
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                  trackingId="about_section_avatar"
                />
                <h3 className="text-xl font-medium lowercase mb-2">our story</h3>
                <p className="text-neutral-500 dark:text-neutral-400 lowercase max-w-md">
                  founded by enzo sison, prism helps businesses create digital experiences that drive real results.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="rounded-full lowercase"
                    onClick={() => trackNavigation("learn more about us", "/about")}
                  >
                    learn more about us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Book a Demo */}
      </main>
      <Footer />
      
      {/* Service Schema Markup (client-only to reduce SSR HTML) */}
      <ServiceSchemaClient
        serviceId="website-development"
        name="Website Development"
        description="Custom website development services that drive business growth and enhance user experience"
        serviceType="Website Development"
        areaServed={["United States", "Canada", "Global"]}
        offerDetails={{
          name: "Custom Website Development",
          description: "professional website development with modern design and functionality",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          priceRange: "$2,500 - $10,000"
        }}
      />
      
      <ServiceSchemaClient
        serviceId="mobile-app-development"
        name="Mobile App Development"
        description="Native and cross-platform mobile app development for iOS and Android"
        serviceType="Mobile App Development"
        areaServed={["United States", "Canada", "Global"]}
        offerDetails={{
          name: "Mobile App Development Services",
          description: "end-to-end mobile app development from concept to launch",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          priceRange: "$5,000 - $25,000"
        }}
      />
      
      <ServiceSchemaClient
        serviceId="digital-marketing"
        name="Digital Marketing"
        description="Comprehensive digital marketing services including SEO, content marketing, and social media"
        serviceType="Digital Marketing"
        areaServed={["United States", "Canada", "Global"]}
        offerDetails={{
          name: "Digital Marketing Services",
          description: "data-driven digital marketing strategies to grow your online presence",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          priceRange: "$1,000 - $5,000"
        }}
      />
      
      <ServiceSchemaClient
        serviceId="ui-ux-design"
        name="UI/UX Design"
        description="User interface and user experience design services for web and mobile applications"
        serviceType="UI/UX Design"
        areaServed={["United States", "Canada", "Global"]}
        offerDetails={{
          name: "UI/UX Design Services",
          description: "beautiful and functional design that enhances user experience",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          priceRange: "$1,500 - $8,000"
        }}
      />
    </div>
  )
}
