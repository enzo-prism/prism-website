"use client"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

// Lazy load below-the-fold components
const ScrollProgressBar = dynamic(() => import("@/components/scroll-progress-bar"), {
  ssr: false
})

// New homepage sections
// Use SSR for these sections to improve first paint/SEO
const ClientsSection = dynamic(() => import("@/components/home/Clients"))
const GrowthResultsSlider = dynamic(() => import("@/components/home/GrowthResultsSlider"))
const WebsitesFeatures = dynamic(() => import("@/components/home/WebsitesFeatures"))
const SegmentsGrid = dynamic(() => import("@/components/home/SegmentsGrid"))

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
  const isMobile = useMobile() // Added this line
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [videoScale, setVideoScale] = useState(1.5)
  const heroRef = useRef<HTMLElement>(null)
  
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
            // Enhanced connection speed detection
            const connection = (navigator as any).connection
            const isSlowConnection = 
              connection?.effectiveType === "2g" || 
              connection?.effectiveType === "slow-2g" ||
              connection?.saveData
            
            // Check user motion preferences
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            
            // Check device memory if available (< 2GB = skip video)
            const hasLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 2
            
            // On mobile, always allow video unless user explicitly prefers reduced motion
            if (isMobile && !prefersReducedMotion) {
              setShouldLoadVideo(true)
              observer.disconnect()
              return
            }

            // Otherwise (desktop/tablet), load video only on good conditions
            if (!isSlowConnection && !prefersReducedMotion && !hasLowMemory) {
              setShouldLoadVideo(true)
              observer.disconnect()
            } else {
              console.log('[Performance] Skipping video due to:', {
                slowConnection: isSlowConnection,
                reducedMotion: prefersReducedMotion,
                lowMemory: hasLowMemory
              })
            }
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
              className={`absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 ${shouldLoadVideo ? 'opacity-0' : 'opacity-100'} gpu-fade hero-gradient-shift`}
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
                  src={`https://player.vimeo.com/video/1096693144?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1&quality=${isMobile ? '360p' : 'auto'}`}
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
                  loading="lazy"
                />
              </div>
            )}
          </div>
          {/* White overlay for elegant contrast */}
          <div className="absolute inset-0 bg-white/80 -z-10 gpu-layer" />

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
              <div className="flex flex-col items-center">
                <div className="pt-6 flex items-center gap-3">
                  <Link href="/get-started">
                    <Button
                      className="rounded-full px-8 py-6 text-lg lowercase hardware-hover touch-feedback"
                      onClick={() => trackCTAClick("hire prism", "hero section")}
                    >
                      hire prism <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/wall-of-love">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-6 text-lg lowercase hardware-hover touch-feedback"
                      onClick={() => trackCTAClick("reviews", "hero section")}
                    >
                      reviews
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New homepage sections per updated structure */}
        <ClientsSection />
        <GrowthResultsSlider />
        <WebsitesFeatures />
        <SegmentsGrid />

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
                book a meeting with enzo to discuss more
              </p>
              <div className="pt-6">
                <Link href="/get-started">
                  <Button
                    className="rounded-full px-8 py-6 text-lg lowercase hardware-hover touch-feedback scale-bounce"
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
