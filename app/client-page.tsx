"use client"

import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Star, Check, Sparkles, MessageSquare, Zap, Target, Users, Clock, MousePointer, Megaphone } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"

// Dynamically import mobile-specific components to reduce initial bundle
const MobileServicesTiles = dynamic(() => import("@/components/mobile-services-tiles"), {
  ssr: false, // Only load on client side when needed
  loading: () => <div className="w-full h-32 animate-pulse bg-gray-100 rounded-lg" />
})
// Lazy load below-the-fold components
const CaseStudyCard = dynamic(() => import("@/components/case-study-card"), {
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-100 rounded-lg" />
})
const ScrollProgressBar = dynamic(() => import("@/components/scroll-progress-bar"), {
  ssr: false
})

// Import analytics functions directly for now (will optimize separately)
import { trackCTAClick, trackServiceCardClick, trackNavigation } from "@/utils/analytics"
import PageViewTracker from "@/components/page-view-tracker"
import CoreImage from "@/components/core-image"
import { LOGO_CONFIG, LOGO_SIZES } from "@/lib/constants"
import { ServiceSchema } from "@/components/schema-markup"
import ClientImagePreloader from "@/components/client-image-preloader"
import YouTubeVideoEmbed from "@/components/youtube-video-embed"
import VideoWithPoster from "@/components/video-with-poster"
import { useRevealAnimation, useStaggeredReveal, useGPUHover } from "@/hooks/use-reveal-animation"
import GetStartedCTA from "@/components/GetStartedCTA"

export default function ClientPage() {
  const isMobile = useMobile() // Added this line
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [videoScale, setVideoScale] = useState(1.5)
  const heroRef = useRef<HTMLElement>(null)
  
  // Lazy loading states for below-the-fold sections
  const [shouldLoadCaseStudies, setShouldLoadCaseStudies] = useState(false)
  const [shouldLoadTestimonials, setShouldLoadTestimonials] = useState(false)
  const caseStudiesRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  
  // GPU-accelerated animation hooks
  const { elementRef: servicesRef, isVisible: servicesVisible } = useRevealAnimation({ 
    threshold: 0.2, 
    delay: 100 
  })
  const { elementRef: testimonialsAnimRef, isVisible: testimonialsVisible } = useRevealAnimation({ 
    threshold: 0.15, 
    delay: 200 
  })
  const { elementRef: caseStudiesAnimRef, isVisible: caseStudiesVisible } = useRevealAnimation({ 
    threshold: 0.1, 
    delay: 150 
  })
  const { containerRef: serviceCardsRef, visibleItems: serviceCardsVisible } = useStaggeredReveal(3, {
    threshold: 0.2,
    delay: 150
  })

  // Calculate video scale based on viewport dimensions
  useEffect(() => {
    const calculateVideoScale = () => {
      // Video aspect ratio is 16:9
      const videoAspectRatio = 16 / 9
      const viewportAspectRatio = window.innerWidth / window.innerHeight
      
      // Calculate the minimum scale needed to cover the viewport
      let scale = 1
      
      if (viewportAspectRatio < videoAspectRatio) {
        // Portrait orientation - scale based on width to fill height
        scale = videoAspectRatio / viewportAspectRatio
      } else {
        // Landscape orientation - scale based on height to fill width
        scale = viewportAspectRatio / videoAspectRatio
      }
      
      // Use minimal extra scale (5%) just to ensure no edge gaps
      // For mobile, use even less extra scale
      const extraScale = isMobile ? 1.02 : 1.05
      setVideoScale(scale * extraScale)
    }

    calculateVideoScale()
    window.addEventListener('resize', calculateVideoScale)
    window.addEventListener('orientationchange', calculateVideoScale)
    
    return () => {
      window.removeEventListener('resize', calculateVideoScale)
      window.removeEventListener('orientationchange', calculateVideoScale)
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
            
            // Load video only on good conditions
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

  // Lazy load case studies section
  useEffect(() => {
    if (!caseStudiesRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadCaseStudies) {
            setShouldLoadCaseStudies(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "300px", // Load 300px before coming into view
        threshold: 0.1,
      }
    )

    observer.observe(caseStudiesRef.current)
    return () => observer.disconnect()
  }, [shouldLoadCaseStudies])

  // Lazy load testimonials section
  useEffect(() => {
    if (!testimonialsRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadTestimonials) {
            setShouldLoadTestimonials(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "200px", // Load 200px before coming into view
        threshold: 0.1,
      }
    )

    observer.observe(testimonialsRef.current)
    return () => observer.disconnect()
  }, [shouldLoadTestimonials])

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
        <section ref={heroRef} className="hero-section relative min-h-[100vh] flex items-center justify-center overflow-hidden">
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
              <div className="relative mx-auto mb-4 md:mb-6 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 logo-float">
                <CoreImage
                  src={LOGO_CONFIG.src}
                  alt={LOGO_CONFIG.alt}
                  width={LOGO_SIZES.hero.width}
                  height={LOGO_SIZES.hero.height}
                  className={`object-contain ${LOGO_CONFIG.className} overflow-hidden gpu-accelerated`}
                  sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 96px"
                  priority
                  fallbackSrc={LOGO_CONFIG.fallbackSrc}
                  trackingId="hero_logo"
                  quality={90}
                  showLoadingIndicator={true}
                />
              </div>
              <div className="space-y-3 smooth-reveal">
                <h1 className="text-5xl font-bold tracking-tighter lowercase sm:text-6xl md:text-7xl lg:text-8xl gpu-accelerated">
                  prism
                </h1>
                <p className="text-2xl font-medium text-neutral-500 lowercase sm:text-3xl md:text-4xl">
                  impossible is temporary
                </p>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  beautiful software that grows revenue.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="pt-6">
                  <Link href="/get-started">
                    <Button
                      className="rounded-full px-8 py-6 text-lg lowercase hardware-hover touch-feedback"
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
                    className="text-sm text-neutral-400 lowercase hover:text-neutral-600 hover:underline smooth-transform"
                  >
                    38,500+ entrepreneurs follow us on Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@the_design_prism"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 lowercase hover:text-neutral-600 hover:underline smooth-transform"
                  >
                    24,500+ subscribers on youtube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section 
          ref={servicesRef} 
          className={`bg-neutral-50 py-16 md:py-24 ${servicesVisible ? 'reveal-up visible' : 'reveal-up'}`}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl gpu-accelerated">services</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                expertise in 3 areas to improve your online business
              </p>
            </div>
            {isMobile ? (
              <MobileServicesTiles />
            ) : (
              <div ref={serviceCardsRef} className="grid gap-10 md:grid-cols-3">
                <div className={`bg-white rounded-xl p-8 shadow-sm hardware-hover border border-neutral-100 gpu-accelerated touch-feedback ${serviceCardsVisible[0] ? 'reveal-scale visible' : 'reveal-scale'}`}>
                  <div className="mb-6 w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center elastic-scale">
                    <span className="text-2xl">🖥️</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">websites</h3>
                  <p className="text-neutral-600 lowercase">attract and convert more leads</p>
                  <Link
                    href="/websites"
                    className="inline-flex items-center mt-4 text-sm font-medium text-neutral-900 hover:underline smooth-transform"
                    onClick={() => trackServiceCardClick("websites", "/websites")}
                  >
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <div className={`bg-white rounded-xl p-8 shadow-sm hardware-hover border border-neutral-100 gpu-accelerated touch-feedback ${serviceCardsVisible[1] ? 'reveal-scale visible' : 'reveal-scale'}`}>
                  <div className="mb-6 w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center elastic-scale">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">apps</h3>
                  <p className="text-neutral-600 lowercase">improve customer experience with delightful software</p>
                  <Link
                    href="/apps"
                    className="inline-flex items-center mt-4 text-sm font-medium text-neutral-900 hover:underline smooth-transform"
                    onClick={() => trackServiceCardClick("apps", "/apps")}
                  >
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <div className={`bg-white rounded-xl p-8 shadow-sm hardware-hover border border-neutral-100 gpu-accelerated touch-feedback ${serviceCardsVisible[2] ? 'reveal-scale visible' : 'reveal-scale'}`}>
                  <div className="mb-6 w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center elastic-scale">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">design</h3>
                  <p className="text-neutral-600 lowercase">not just how it looks…but how it works, how it feels</p>
                  <Link
                    href="/designs"
                    className="inline-flex items-center mt-4 text-sm font-medium text-neutral-900 hover:underline smooth-transform"
                    onClick={() => trackServiceCardClick("designs", "/designs")}
                  >
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Mid-Content CTA */}
        <GetStartedCTA
          heading="see a service that fits your needs?"
          description="let's discuss your project and find the perfect solution to grow your business."
          buttonText="let's discuss your project"
          analyticsLabel="services section CTA"
          variant="light"
        />

        {/* Testimonials Section */}
        <section 
          ref={testimonialsRef} 
          className={`py-16 md:py-24 bg-white dark:bg-neutral-900 ${testimonialsVisible ? 'reveal-fade visible' : 'reveal-fade'}`}
        >
          <div ref={testimonialsAnimRef} className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl text-neutral-900 dark:text-neutral-100 gpu-accelerated">
                client feedback
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 lowercase md:text-lg">
                see why founders love prism ❤️
              </p>
              {/* Embedded client feedback video with poster - Lazy loaded */}
              <div className="mt-6 flex justify-center">
                {shouldLoadTestimonials ? (
                  <div className="hardware-hover gpu-accelerated">
                    <VideoWithPoster
                      videoId="1095461781"
                      posterSrc="/client feedback image.webp"
                      fallbackPosterSrc="/instagram-video-thumbnail.png"
                      width={360}
                      height={360}
                      autoplay={true}
                      loop={true}
                      muted={true}
                      controls={false}
                      posterAlt="Client feedback testimonials - See why founders love Prism"
                      trackAnalytics={true}
                    />
                  </div>
                ) : (
                  <div className="w-[360px] h-[360px] bg-gray-100 rounded-lg shadow-md border border-neutral-200 flex items-center justify-center pulse-soft">
                    <div className="text-gray-400">Loading video...</div>
                  </div>
                )}
              </div>
              <div className="pt-4">
                <Link href="/wall-of-love">
                  <Button
                    className="rounded-full px-8 py-3 text-base lowercase hardware-hover touch-feedback"
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
        <section 
          ref={caseStudiesRef} 
          className={`py-16 md:py-24 bg-neutral-50 dark:bg-neutral-800 ${caseStudiesVisible ? 'reveal-up visible' : 'reveal-up'}`}
        >
          <div ref={caseStudiesAnimRef} className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl gpu-accelerated">success stories</h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-300 lowercase md:text-lg">
                see how we've helped businesses achieve remarkable results
              </p>
            </div>
            {shouldLoadCaseStudies ? (
              <div className="grid gap-6 md:grid-cols-2">
                {featuredCaseStudies.map((study, index) => (
                  <div key={index} className="hardware-hover gpu-accelerated touch-feedback">
                    <CaseStudyCard
                      title={study.title}
                      client={study.client}
                      industry={study.industry}
                      location={study.location}
                      description={study.description}
                      slug={study.slug}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map((placeholder) => (
                  <div key={placeholder} className="bg-white rounded-lg p-6 shadow-sm pulse-soft">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 text-center">
              <Link
                href="/case-studies"
                onClick={() => trackCTAClick("view all case studies", "homepage")}
                className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline smooth-transform"
              >
                view all case studies <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

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
      
      {/* Service Schema Markup */}
      <ServiceSchema
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
      
      <ServiceSchema
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
      
      <ServiceSchema
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
      
      <ServiceSchema
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
