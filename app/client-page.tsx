"use client"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { ArrowRight, ArrowUpRight, Briefcase } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

// Lazy load below-the-fold components
const ScrollProgressBar = dynamic(() => import("@/components/scroll-progress-bar"), {
  ssr: false
})

// New homepage sections
// Use SSR for these sections to improve first paint/SEO
const ClientsSection = dynamic(() => import("@/components/home/Clients"), { ssr: false })
const GrowthResultsSlider = dynamic(() => import("@/components/home/GrowthResultsSlider"))
const HottestContentSection = dynamic(() => import("@/components/home/HottestContentSection"))
const WebsitesFeatures = dynamic(() => import("@/components/home/WebsitesFeatures"))
const SegmentsGrid = dynamic(() => import("@/components/home/SegmentsGrid"))
const ReferralSection = dynamic(() => import("@/components/home/ReferralSection"))
const CoreOfferingsSection = dynamic(() => import("@/components/home/CoreOfferingsSection"))
const LatestPostsSection = dynamic(() => import("@/components/home/LatestPostsSection"), { ssr: false })
const GrowthHeadline = dynamic(() => import("@/components/home/GrowthHeadline"))

// Import analytics functions directly for now (will optimize separately)
import CoreImage from "@/components/core-image"
// import GetStartedCTA from "@/components/GetStartedCTA" // removed from new homepage flow
import PageViewTracker from "@/components/page-view-tracker"
// import VideoWithPoster from "@/components/video-with-poster" // removed with testimonials section
// import { useRevealAnimation } from "@/hooks/use-reveal-animation" // no longer used on simplified homepage
import { FREE_AUDIT_CTA_TEXT, LOGO_CONFIG, LOGO_SIZES } from "@/lib/constants"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"
// Render Service schema only on client to keep SSR HTML lean
const ServiceSchemaClient = dynamic(() => import("@/components/schema-markup").then(m => m.ServiceSchema), {
  ssr: false
})

export default function ClientPage() {
  const isMobile = useMobile() // Added this line
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [videoSkipped, setVideoSkipped] = useState(false)
  const [videoQuality, setVideoQuality] = useState<"360p" | "auto">("auto")
  const [videoScale, setVideoScale] = useState(1.5)
  const heroRef = useRef<HTMLElement>(null)
  const resolvedVideoQuality = useMemo(() => {
    if (videoQuality === "auto") {
      return isMobile ? "540p" : "auto"
    }
    return videoQuality
  }, [isMobile, videoQuality])
  
  // Lazy loading states for below-the-fold sections
  // removed case studies and testimonials sections
  
  // GPU-accelerated animation hooks
  // services section removed in new structure
  // removed testimonials and case studies animations
  // service cards staggered reveal removed in new structure

  // Calculate video scale based on viewport dimensions
  // Avoid recalculating on mobile scroll-driven height changes which cause URL bar resize events
  useEffect(() => {
    let lastWidth = window.innerWidth

    const calculateVideoScale = () => {
      const currentWidth = window.innerWidth
      // Ignore height-only resize events (mobile address bar show/hide)
      if (isMobile && Math.abs(currentWidth - lastWidth) < 1) {
        return
      }

      // Video aspect ratio is 16:9
      const videoAspectRatio = 16 / 9
      const viewportAspectRatio = currentWidth / window.innerHeight

      let scale = 1
      if (viewportAspectRatio < videoAspectRatio) {
        // Portrait orientation - scale based on width to fill height
        scale = videoAspectRatio / viewportAspectRatio
      } else {
        // Landscape orientation - scale based on height to fill width
        scale = viewportAspectRatio / videoAspectRatio
      }

      const extraScale = isMobile ? 1.02 : 1.05
      setVideoScale(scale * extraScale)
      lastWidth = currentWidth
    }

    // Initial calc
    calculateVideoScale()

    // On mobile, only recompute when width changes or orientation changes
    const handleResize = () => calculateVideoScale()
    const handleOrientation = () => calculateVideoScale()

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientation)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientation)
    }
  }, [isMobile])

  // Enhanced lazy load video with comprehensive performance checks
  useEffect(() => {
    if (!heroRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            const connection = (navigator as any).connection
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            const hasLowMemory = "deviceMemory" in navigator && (navigator as any).deviceMemory < 2
            const isConstrainedNetwork =
              connection?.effectiveType === "2g" ||
              connection?.effectiveType === "slow-2g" ||
              connection?.saveData === true

            if (prefersReducedMotion) {
              setVideoSkipped(true)
              observer.disconnect()
              return
            }

            if (isConstrainedNetwork || hasLowMemory) {
              setVideoQuality("360p")
            } else {
              setVideoQuality("auto")
            }

            setVideoSkipped(false)
            setShouldLoadVideo(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "150px", // Increased preload distance for smoother UX
        threshold: 0.1,
      }
    )

    observer.observe(heroRef.current)

    return () => {
      observer.disconnect()
    }
  }, [shouldLoadVideo])

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
        <section ref={heroRef} className="hero-section relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-14 md:pt-16">
          {/* Background video container with full coverage */}
          <div className="absolute inset-0 -z-20 gpu-layer">
            {/* Lightweight placeholder while video loads */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 ${shouldLoadVideo ? 'opacity-0' : 'opacity-100'} gpu-fade hero-gradient-shift`}
              style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                                  radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)`,
                backgroundSize: '200% 200%',
              }}
            />
            
            {/* Video iframe - Only rendered when needed */}
            {shouldLoadVideo && (
              <div className="absolute inset-0 overflow-hidden gpu-accelerated">
                <iframe
                  src={`https://player.vimeo.com/video/1096693144?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1&quality=${resolvedVideoQuality}`}
                  title="Prism hero background video"
                  className="gpu-fade"
                  style={{
                    width: '100%',
                    height: '100%',
                    minWidth: '100%',
                    minHeight: '100%',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) scale(${videoScale})`,
                    opacity: shouldLoadVideo ? 1 : 0,
                    objectFit: 'cover',
                    willChange: 'transform, opacity',
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
          {/* White overlay for elegant contrast */}
          <div className="absolute inset-0 -z-10 bg-white/55 dark:bg-neutral-950/70 gpu-layer transition-opacity duration-500" />

          <div className="container relative mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex flex-col items-center space-y-4 md:space-y-6 text-center">
              <div className={`relative mx-auto mb-4 md:mb-6 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 ${!isMobile ? 'logo-float' : ''}`}>
                <CoreImage
                  src={LOGO_CONFIG.src}
                  alt={LOGO_CONFIG.alt}
                  width={LOGO_SIZES.hero.width}
                  height={LOGO_SIZES.hero.height}
                  className={`object-contain ${LOGO_CONFIG.className} overflow-hidden`}
                  sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 96px"
                  priority
                  fallbackSrc={LOGO_CONFIG.fallbackSrc}
                  trackingId="hero_logo"
                  quality={90}
                  showLoadingIndicator={true}
                />
              </div>
              <div className={`space-y-3 ${!isMobile ? 'smooth-reveal' : ''}`}>
                <h1 className={`text-5xl font-bold tracking-tighter lowercase sm:text-6xl md:text-7xl lg:text-8xl ${!isMobile ? 'gpu-accelerated' : ''}`}>
                  prism
                </h1>
                <p className="text-2xl font-medium text-neutral-500 lowercase sm:text-3xl md:text-4xl">
                  impossible is temporary.
                </p>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  upgrade your online presence to grow and convert
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Link href="/get-started">
                  <Button
                    className="rounded-full px-8 py-6 text-lg lowercase hardware-hover touch-feedback"
                    onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "hero section")}
                  >
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="/wall-of-love"
                  className="inline-flex items-center text-sm font-medium lowercase tracking-[0.32em] text-neutral-500 transition-colors hover:text-neutral-700"
                  onClick={() => trackNavigation("founders love prism", "/wall-of-love")}
                >
                  why founders love prism <ArrowUpRight className="ml-3 h-4 w-4" />
                </Link>
                {videoSkipped ? (
                  <p className="mt-4 text-xs tracking-[0.24em] uppercase text-neutral-400">
                    background motion disabled for accessibility
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <GrowthHeadline />

        {/* New homepage sections per updated structure */}
        <ClientsSection />
        <GrowthResultsSlider />
        <SegmentsGrid />
        <ReferralSection />
        <HottestContentSection />
        <CoreOfferingsSection />
        <WebsitesFeatures />
        <LatestPostsSection />

        {/* We're Hiring Section */}
        <section className="border-t border-neutral-100 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-900 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="mx-auto max-w-2xl text-center space-y-4">
              <p className="text-sm font-medium tracking-[0.32em] text-neutral-500 lowercase dark:text-neutral-400">
                we're hiring
              </p>
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl dark:text-white">
                build the future of local web with prism
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 lowercase md:text-lg">
                join our lean, fast-moving team helping dentists and local businesses grow with modern design and engineering.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {openRoles.map((role) => (
                <Link
                  key={role.href}
                  href={role.href}
                  className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
                  onClick={() => trackNavigation("home_hiring_role", role.href)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold lowercase text-neutral-800 dark:text-white">
                        {role.title}
                      </h3>
                      <p className="mt-3 text-sm text-neutral-500 lowercase dark:text-neutral-400">
                        {role.meta}
                      </p>
                    </div>
                    <Briefcase className="mt-1 h-6 w-6 text-neutral-400 transition-colors group-hover:text-neutral-500 dark:text-neutral-600 dark:group-hover:text-neutral-400" />
                  </div>
                  <div className="mt-6 inline-flex items-center text-sm font-medium lowercase text-neutral-700 transition-colors group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white">
                    view details <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/careers">
                <Button
                  variant="outline"
                  className="rounded-full lowercase"
                  onClick={() => trackCTAClick("explore careers", "home hiring section")}
                >
                  explore all openings <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

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
          description: "Professional website development with modern design and functionality",
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
          description: "End-to-end mobile app development from concept to launch",
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
          description: "Data-driven digital marketing strategies to grow your online presence",
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
          description: "Beautiful and functional design that enhances user experience",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          priceRange: "$1,500 - $8,000"
        }}
      />
    </div>
  )
}
