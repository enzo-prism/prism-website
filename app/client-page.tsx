"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useMobile } from "@/hooks/use-mobile"
import MobileServicesTiles from "@/components/mobile-services-tiles"
import CaseStudyCard from "@/components/case-study-card"
import ScrollProgressBar from "@/components/scroll-progress-bar" // Added this import

import { trackCTAClick, trackServiceCardClick, trackNavigation } from "@/utils/analytics"
import PageViewTracker from "@/components/page-view-tracker"
import CoreImage from "@/components/core-image"

export default function ClientPage() {
  const isMobile = useMobile() // Added this line

  const featuredCaseStudies = [
    {
      title: "Powering a Seamless Transition",
      client: "Dr. Christopher B. Wong",
      industry: "Dentistry",
      location: "Palo Alto, CA",
      description: "100% patient retention during practice transition",
      slug: "dr-christopher-wong",
    },
    {
      title: "Aligning Digital Excellence with Luxury Care",
      client: "Exquisite Dentistry",
      industry: "High-End Dentistry",
      location: "Beverly Hills, CA",
      description: "Sophisticated online experience for premium care",
      slug: "exquisite-dentistry",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile && <ScrollProgressBar />} {/* Added this line */}
      <PageViewTracker title="Prism Agency" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
          {/* Background video container with full viewport coverage */}
          <div className="absolute inset-0 -z-20">
            <iframe
              src="https://player.vimeo.com/video/1095467469?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1"
              title="Prism hero background"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vw',
                height: '100vh',
                minWidth: '100%',
                minHeight: '100%',
                transform: 'translate(-50%, -50%) scale(1.2)',
                objectFit: 'cover'
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {/* White overlay for elegant contrast */}
          <div className="absolute inset-0 bg-white/80 -z-10" />

          <div className="container relative mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative mx-auto mb-6 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
                <CoreImage
                  src="/prism-logo.jpeg"
                  alt="Prism logo"
                  width={96}
                  height={96}
                  className="object-contain rounded-xl overflow-hidden" // Ensured overflow-hidden is here too
                  sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 96px"
                  priority
                  fallbackSrc="/favicon-large.png"
                  trackingId="hero_logo"
                  quality={90}
                  showLoadingIndicator={true}
                />
              </div>
              <div className="space-y-3">
                <h1 className="text-5xl font-bold tracking-tighter lowercase sm:text-6xl md:text-7xl lg:text-8xl">
                  prism
                </h1>
                <p className="text-2xl font-medium text-neutral-500 lowercase sm:text-3xl md:text-4xl">
                  impossible is temporary
                </p>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  websites, apps, and designs that shatter revenue goals and delight your customers.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="pt-6">
                  <Link href="/get-started">
                    <Button
                      className="rounded-full px-8 py-6 text-lg lowercase"
                      onClick={() => trackCTAClick("get started", "hero section")}
                    >
                      get started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 flex flex-col items-center space-y-2">
                  <a
                    href="https://www.instagram.com/the_design_prism/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 lowercase hover:text-neutral-600 hover:underline transition-colors"
                  >
                    38,500+ entrepreneurs follow us on Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@the_design_prism"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 lowercase hover:text-neutral-600 hover:underline transition-colors"
                  >
                    24,500+ subscribers on youtube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="bg-neutral-50 px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">services</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                expertise in 3 areas to improve your online business
              </p>
            </div>
            {isMobile ? (
              <MobileServicesTiles />
            ) : (
              <div className="grid gap-10 md:grid-cols-3">
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-neutral-100">
                  <div className="mb-6 w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🖥️</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">websites</h3>
                  <p className="text-neutral-600 lowercase">attract and convert more leads</p>
                  <Link
                    href="/websites"
                    className="inline-flex items-center mt-4 text-sm font-medium text-neutral-900 hover:underline"
                    onClick={() => trackServiceCardClick("websites", "/websites")}
                  >
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-neutral-100">
                  <div className="mb-6 w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">apps</h3>
                  <p className="text-neutral-600 lowercase">improve customer experience with delightful software</p>
                  <Link
                    href="/apps"
                    className="inline-flex items-center mt-4 text-sm font-medium text-neutral-900 hover:underline"
                    onClick={() => trackServiceCardClick("apps", "/apps")}
                  >
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-neutral-100">
                  <div className="mb-6 w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">design</h3>
                  <p className="text-neutral-600 lowercase">not just how it looks…but how it works, how it feels</p>
                  <Link
                    href="/designs"
                    className="inline-flex items-center mt-4 text-sm font-medium text-neutral-900 hover:underline"
                    onClick={() => trackServiceCardClick("designs", "/designs")}
                  >
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Wall of Love CTA Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl text-neutral-900 dark:text-neutral-100">
                client feedback
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 lowercase md:text-lg">
                see why founders love prism ❤️
              </p>
              {/* Embedded client feedback video */}
              <div className="mt-6 flex justify-center">
                <iframe
                  src="https://player.vimeo.com/video/1095461781?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&playsinline=1"
                  width="360"
                  height="360"
                  className="rounded-lg shadow-md border border-neutral-200"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="pt-4">
                <Link href="/wall-of-love">
                  <Button
                    className="rounded-full px-8 py-3 text-base lowercase"
                    onClick={() => trackCTAClick("visit wall of love", "homepage cta")}
                  >
                    wall of love <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Studies Section */}
        <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">success stories</h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-300 lowercase md:text-lg">
                see how we've helped businesses achieve remarkable results
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredCaseStudies.map((study, index) => (
                <CaseStudyCard
                  key={index}
                  title={study.title}
                  client={study.client}
                  industry={study.industry}
                  location={study.location}
                  description={study.description}
                  slug={study.slug}
                  compact={true}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/case-studies"
                onClick={() => trackCTAClick("view all case studies", "homepage")}
                className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                view all case studies <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="bg-neutral-50 dark:bg-neutral-800 px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                ready to hit your business goals?
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 lowercase md:text-lg">
                book a meeting with enzo to discuss more
              </p>
              <div className="pt-6">
                <Link href="/get-started">
                  <Button
                    className="rounded-full px-8 py-6 text-lg lowercase"
                    onClick={() => trackCTAClick("get started", "bottom cta")}
                  >
                    get started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="border-t border-neutral-100 dark:border-neutral-800 px-4 py-12">
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
      </main>
      <Footer />
    </div>
  )
}
