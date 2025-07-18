"use client"
import { useState, useEffect, useRef } from "react"
import { Calendar, CheckCircle, ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HowItWorksSlides from "@/components/how-it-works-slides"
import VideoWithPoster from "@/components/video-with-poster"
import ElegantHowItWorks from "@/components/elegant-how-it-works"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import AnimatedBackground from "@/components/animated-background"
import {
  fadeInUp,
  staggerContainer,
  springScale,
  accordionContent,
  glowPulse,
  pageTransition,
  revealOnScroll,
  shimmer,
  magneticButton,
  successPop,
} from "@/utils/animation-variants"

// Import the tracking function at the top of the file
import { trackCTAClick, trackNavigation } from "@/utils/analytics"
// Add this import at the top with the other imports
import { FAQSchema } from "@/components/schema-markup"

function ProcessSteps() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
          <span className="text-2xl">1</span>
        </div>
        <h3 className="mb-2 text-xl font-bold lowercase">consultation</h3>
        <p className="text-neutral-600 lowercase">we meet for 30 minutes to discuss your goals and challenges.</p>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
          <span className="text-2xl">2</span>
        </div>
        <h3 className="mb-2 text-xl font-bold lowercase">proposal</h3>
        <p className="text-neutral-600 lowercase">
          if we're a good fit, we'll create a custom proposal for your project.
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
          <span className="text-2xl">3</span>
        </div>
        <h3 className="mb-2 text-xl font-bold lowercase">kickoff</h3>
        <p className="text-neutral-600 lowercase">once approved, we begin work on your website, app, or designs.</p>
      </div>
    </div>
  )
}

function ClientHowItWorks() {
  // Use the new elegant component for better design
  return <ElegantHowItWorks />
}

// Add this constant after the ClientHowItWorks component and before the ClientGetStartedPage component
const faqs = [
  {
    question: "what happens during the 30-minute consultation?",
    answer:
      "during our consultation, we'll discuss your business goals, current challenges, and how our services might help. we'll ask questions about your target audience, competitors, and what success looks like for you. there's no pressure or obligation—it's simply a chance for us to understand your needs and see if we're a good fit.",
  },
  {
    question: "is there any cost or obligation for the initial consultation?",
    answer:
      "no, the 30-minute consultation is completely free with no obligations. we believe in building relationships based on trust and mutual benefit, not pressure tactics.",
  },
  {
    question: "how soon can we start working together after the consultation?",
    answer:
      "if we both agree we're a good fit, we can typically begin work within 1-2 weeks of proposal approval. for urgent projects, we may be able to accommodate faster timelines—just let us know during our consultation.",
  },
  {
    question: "what information should i prepare before our call?",
    answer:
      "it's helpful to think about your goals, timeline, budget range, and any examples of websites, apps, or designs you admire. don't worry if you don't have everything figured out—part of our job is helping you clarify your vision.",
  },
  {
    question: "what are your typical project costs?",
    answer:
      "our services start from $750 for design sprints to $1,999/month for our growth accelerator package. custom projects can range up to $50,000+ for comprehensive website and app development. for single design assets, we offer a $750 flat fee option. we'll provide a custom quote based on your specific needs after our consultation.",
  },
  {
    question: "how long do projects typically take to complete?",
    answer:
      "project timelines vary based on scope and complexity. design projects may take 2-4 weeks, while websites typically take 4-8 weeks, and apps can take 8-12 weeks or more. we'll provide a detailed timeline in our proposal.",
  },
]

export default function ClientGetStartedPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = useMobile()
  const videoRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lazy load video
  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [shouldLoadVideo])

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  // Handle mouse position for magnetic effects
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div 
      className="flex min-h-screen flex-col"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Enhanced with GPU animations */}
        <motion.section 
          ref={videoRef} 
          className="relative px-4 py-12 md:py-24 lg:py-32 overflow-hidden"
          style={{ y: heroParallax }}
        >
          {/* Animated background */}
          <AnimatedBackground />
          
          <motion.div 
            className="container mx-auto px-4 md:px-6 relative z-10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <motion.div
                className="space-y-3"
                variants={fadeInUp}
                style={{
                  transform: scrolled ? "translateY(-8px) scale(0.95)" : "translateY(0) scale(1)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Video frame with poster image */}
                <motion.div 
                  className="mb-2 flex justify-center"
                  variants={springScale}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ perspective: 1000 }}
                >
                  {shouldLoadVideo ? (
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotateZ: [-0.5, 0.5, -0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        transform: "translateZ(0)",
                        willChange: "transform",
                      }}
                    >
                      <VideoWithPoster
                        videoId="1097023041"
                        posterSrc="/prism%20get%20started.webp"
                        width={360}
                        height={360}
                        autoplay={true}
                        loop={true}
                        muted={true}
                        controls={false}
                        posterAlt="Rocket launch animation - Get started with Prism"
                        trackAnalytics={true}
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="w-[360px] h-[360px] bg-gray-100 rounded-lg shadow-md border border-neutral-200 flex items-center justify-center"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="text-gray-400">Loading video...</div>
                    </motion.div>
                  )}
                </motion.div>
                <motion.h1 
                  className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl"
                  variants={fadeInUp}
                >
                  get started
                </motion.h1>
                <motion.p 
                  className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl"
                  variants={fadeInUp}
                >
                  schedule a 30-minute consultation with our team to discuss your goals.
                </motion.p>
              </motion.div>

              {/* Mobile-only quick action button */}
              {isMobile && (
                <motion.div 
                  className="mt-8 w-full max-w-xs"
                  variants={successPop}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.a
                    href="#schedule"
                    className="flex items-center justify-center w-full py-3 px-6 bg-black text-white rounded-full text-lg lowercase relative overflow-hidden"
                    onClick={() => trackCTAClick("quick schedule", "get started page")}
                    whileHover={{ scale: 1.05 }}
                    variants={glowPulse}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    schedule now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.a>
                </motion.div>
              )}

              {/* Mobile scroll indicator */}
              {isMobile && (
                <motion.div 
                  className="absolute bottom-4 left-0 right-0 flex justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="h-6 w-6 text-neutral-400" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Quick Design Callout */}
        <motion.section 
          className="py-12 md:py-16 bg-neutral-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealOnScroll}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div 
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <motion.div 
                    className="flex-shrink-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <motion.h3 
                      className="text-2xl font-bold lowercase mb-2"
                      variants={fadeInUp}
                    >
                      need just one design?
                    </motion.h3>
                    <motion.p 
                      className="text-neutral-600 lowercase mb-4"
                      variants={fadeInUp}
                    >
                      skip the consultation. get a business card, logo, or flyer for $750 with unlimited revisions.
                    </motion.p>
                    <motion.div 
                      className="flex flex-col sm:flex-row items-center gap-3"
                      variants={staggerContainer}
                    >
                      <motion.div
                        variants={springScale}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Button
                          className="rounded-full px-6 py-3 text-base lowercase relative overflow-hidden group"
                          onClick={() => trackCTAClick("quick design $750", "get started page")}
                          asChild
                        >
                          <Link href="/one-time-fee">
                            <motion.span
                              className="relative z-10"
                              animate={magneticButton.hover(mousePosition)}
                            >
                              start $750 design <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                            </motion.span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div
                        variants={springScale}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="rounded-full px-4 py-3 text-sm lowercase"
                          onClick={() => trackNavigation("learn more about quick design", "/one-time-fee")}
                          asChild
                        >
                          <Link href="/one-time-fee">
                            learn more
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)",
                    backgroundSize: "200% 200%",
                  }}
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Process Section - Enhanced with GPU animations */}
        <motion.section 
          className="relative px-4 py-16 md:py-24 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 via-white to-neutral-50/30 pointer-events-none"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div 
            className="container mx-auto px-4 md:px-6 relative"
            variants={staggerContainer}
          >
            <div className="mx-auto max-w-5xl">
              {/* Section header with enhanced styling */}
              <motion.div className="mb-16 text-center" variants={fadeInUp}>
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-neutral-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  simple process
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-transparent"
                  variants={fadeInUp}
                >
                  how it works
                </motion.h2>
                <motion.p 
                  className="mx-auto mt-6 max-w-[600px] text-lg text-neutral-600 lowercase leading-relaxed"
                  variants={fadeInUp}
                >
                  a simple, no-commitment process to see if we're a good fit for each other.
                </motion.p>
              </motion.div>

              {/* Enhanced process component */}
              <motion.div 
                variants={revealOnScroll}
                className="transform transition-all duration-500"
              >
                <ClientHowItWorks />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom fade effect */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </motion.section>

        {/* Calendly Section - Enhanced with animations */}
        <motion.section 
          id="schedule" 
          className="px-4 py-16 md:py-24 bg-neutral-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            variants={staggerContainer}
          >
            <div className="mx-auto max-w-3xl">
              <motion.div className="mb-12 text-center" variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">schedule your call</h2>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                  pick a time that works for you to chat with our team.
                </p>
              </motion.div>

              {/* Mobile-optimized card with animations */}
              <motion.div 
                className="rounded-xl border shadow-sm overflow-hidden bg-white"
                variants={springScale}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                {/* Card header - always visible */}
                <motion.div className="p-6 border-b" variants={fadeInUp}>
                  <h3 className="text-2xl font-bold lowercase">exclusive strategy session</h3>
                  <p className="mt-2 text-neutral-600 lowercase">
                    in this 30-minute call, we'll discuss your goals and see if we're a good fit to work together.
                  </p>
                </motion.div>

                {/* Mobile accordion sections */}
                {isMobile ? (
                  <AnimatePresence>
                    <div className="divide-y">
                      {/* What to expect section */}
                      <div className="border-t">
                        <motion.button
                          className="flex items-center justify-between w-full p-4 text-left"
                          onClick={() => toggleSection("expect")}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="font-medium">what to expect</span>
                          <motion.div
                            animate={{ rotate: activeSection === "expect" ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5" />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {activeSection === "expect" && (
                            <motion.div
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={accordionContent}
                              className="px-4 pb-4 overflow-hidden"
                            >
                              <motion.ul 
                                className="space-y-3"
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                              >
                                {[
                                  "no commitment or obligation",
                                  "understand your business goals",
                                  "explore potential solutions"
                                ].map((item, index) => (
                                  <motion.li 
                                    key={index}
                                    className="flex items-start"
                                    variants={fadeInUp}
                                  >
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: index * 0.1, type: "spring" }}
                                    >
                                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    </motion.div>
                                    <span className="text-neutral-600 lowercase">{item}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </AnimatePresence>
                ) : (
                  // Desktop version - always expanded
                  <motion.div className="p-6" variants={fadeInUp}>
                    <motion.ul 
                      className="space-y-2"
                      variants={staggerContainer}
                    >
                      {[
                        "no commitment or obligation",
                        "understand your business goals",
                        "explore potential solutions"
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-start"
                          variants={fadeInUp}
                          whileHover={{ x: 5 }}
                        >
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-neutral-600 lowercase">{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}

                {/* CTA Button - Enhanced with animations */}
                <motion.div 
                  className={`p-6 ${isMobile ? "bg-neutral-50" : ""}`}
                  variants={fadeInUp}
                >
                  <motion.a
                    href="https://calendly.com/enzo-prism/exclusive-strategy-session-with-prism"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("schedule your call", "get started page")}
                    className={`
                      block w-full text-center py-4 px-6 rounded-full relative overflow-hidden
                      ${isMobile ? "bg-black text-white shadow-lg" : "bg-black text-white"}
                      text-lg lowercase font-medium group
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={glowPulse}
                  >
                    <motion.div 
                      className="flex items-center justify-center relative z-10"
                      whileHover={{ x: 5 }}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      schedule your call
                      {isMobile && <ArrowRight className="ml-2 h-4 w-4" />}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Services teaser section with 3D cards */}
        <motion.section 
          className="py-16 md:py-24 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                our services
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                choose from our flexible tiers designed to scale with your business needs. for full details, visit our services page.
              </p>
            </motion.div>
            <motion.div 
              className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
              variants={staggerContainer}
            >
              <motion.div
                className="bg-neutral-50 rounded-xl p-6 relative"
                variants={springScale}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50,
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <h3 className="text-xl font-bold lowercase mb-2">design sprint</h3>
                <motion.div 
                  className="text-2xl font-bold mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  $750 one-off
                </motion.div>
                <ul className="space-y-2 text-neutral-600 lowercase">
                  <li>custom design assets</li>
                  <li>unlimited revisions</li>
                  <li>3-5 days turnaround</li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-neutral-50 rounded-xl p-6 relative"
                variants={springScale}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50,
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <h3 className="text-xl font-bold lowercase mb-2">site essentials</h3>
                <motion.div 
                  className="text-2xl font-bold mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  $1,200/mo
                </motion.div>
                <ul className="space-y-2 text-neutral-600 lowercase">
                  <li>full website rebuild</li>
                  <li>unlimited edits</li>
                  <li>basic analytics</li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-neutral-50 rounded-xl p-6 relative overflow-hidden"
                variants={springScale}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50,
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <h3 className="text-xl font-bold lowercase mb-2">growth accelerator</h3>
                <motion.div 
                  className="text-2xl font-bold mb-2 relative"
                  whileHover={{ scale: 1.1 }}
                >
                  $1,999/mo
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <ul className="space-y-2 text-neutral-600 lowercase">
                  <li>everything in essentials</li>
                  <li>advanced SEO & listings</li>
                  <li>review boosting & apps</li>
                </ul>
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center mt-8"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="rounded-full px-6 py-3 text-base lowercase" asChild>
                  <Link href="/services">
                    explore services <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* FAQs Section with enhanced accordion */}
        <motion.section 
          className="px-4 py-16 md:py-24 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            variants={staggerContainer}
          >
            <div className="mx-auto max-w-3xl">
              <motion.div className="mb-12 text-center" variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                  frequently asked questions
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                  everything you need to know about working with us.
                </p>
              </motion.div>

              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
              >
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index} 
                    className="rounded-lg border bg-white shadow-sm overflow-hidden"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.button
                      className="flex w-full items-center justify-between px-6 py-4 text-left"
                      onClick={() => toggleSection(`faq-${index}`)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="font-medium lowercase">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: activeSection === `faq-${index}` ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5 text-neutral-500" />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeSection === `faq-${index}` && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={accordionContent}
                          className="px-6 pb-4"
                        >
                          <p className="text-neutral-600 lowercase">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Add FAQ Schema for SEO */}
          <FAQSchema questions={faqs} />
        </motion.section>
      </main>
      <Footer />
    </motion.div>
  )
}
