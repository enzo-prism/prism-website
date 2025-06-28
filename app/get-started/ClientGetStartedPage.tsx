"use client"
import { useState, useEffect, useRef } from "react"
import { Calendar, CheckCircle, ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HowItWorksSlides from "@/components/how-it-works-slides"
import VideoWithPoster from "@/components/video-with-poster"
import ElegantHowItWorks from "@/components/elegant-how-it-works"
import { useMobile } from "@/hooks/use-mobile"

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
      "our projects typically range from $5,000 for smaller design projects to $50,000+ for comprehensive website and app development. for single design assets, we also offer a $600 flat fee option. we'll provide a custom quote based on your specific needs after our consultation.",
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
  const isMobile = useMobile()
  const videoRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Improved for mobile */}
        <section ref={videoRef} className="relative px-4 py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div
                className={`space-y-3 transition-all duration-500 ${
                  scrolled ? "transform -translate-y-2 scale-95" : ""
                }`}
              >
                {/* Video frame with poster image */}
                <div className="mb-2 flex justify-center">
                  {shouldLoadVideo ? (
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
                  ) : (
                    <div className="w-[360px] h-[360px] bg-gray-100 rounded-lg shadow-md border border-neutral-200 flex items-center justify-center animate-pulse">
                      <div className="text-gray-400">Loading video...</div>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">get started</h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  schedule a 30-minute consultation with our team to discuss your goals.
                </p>
              </div>

              {/* Mobile-only quick action button */}
              {isMobile && (
                <div className="mt-8 w-full max-w-xs animate-pulse-once">
                  <a
                    href="#schedule"
                    className="flex items-center justify-center w-full py-3 px-6 bg-black text-white rounded-full text-lg lowercase"
                    onClick={() => trackCTAClick("quick schedule", "get started page")}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    schedule now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}

              {/* Mobile scroll indicator */}
              {isMobile && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce">
                  <ChevronDown className="h-6 w-6 text-neutral-400" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Design Callout */}
        <section className="py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold lowercase mb-2">need just one design?</h3>
                    <p className="text-neutral-600 lowercase mb-4">
                      skip the consultation. get a business card, logo, or flyer for $600 with unlimited revisions.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Button
                        className="rounded-full px-6 py-3 text-base lowercase"
                        onClick={() => trackCTAClick("quick design $600", "get started page")}
                        asChild
                      >
                        <a
                          href="https://buy.stripe.com/3cIcN6c6O8L00Sc23RdZ60B"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          start $600 design <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full px-4 py-3 text-sm lowercase"
                        onClick={() => trackNavigation("learn more about quick design", "/one-time-fee")}
                        asChild
                      >
                        <a href="/one-time-fee">
                          learn more
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Enhanced with modern design */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 via-white to-neutral-50/30 pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="mx-auto max-w-5xl">
              {/* Section header with enhanced styling */}
              <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700 mb-6">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
                  simple process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                  how it works
                </h2>
                <p className="mx-auto mt-6 max-w-[600px] text-lg text-neutral-600 lowercase leading-relaxed">
                  a simple, no-commitment process to see if we're a good fit for each other.
                </p>
              </div>

              {/* Enhanced process component */}
              <div className="transform transition-all duration-500">
                <ClientHowItWorks />
              </div>
            </div>
          </div>

          {/* Bottom fade effect */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
        </section>

        {/* Calendly Section - Redesigned for mobile */}
        <section id="schedule" className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">schedule your call</h2>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                  pick a time that works for you to chat with our team.
                </p>
              </div>

              {/* Mobile-optimized card with accordion-style sections */}
              <div className="rounded-xl border shadow-sm overflow-hidden bg-white">
                {/* Card header - always visible */}
                <div className="p-6 border-b">
                  <h3 className="text-2xl font-bold lowercase">exclusive strategy session</h3>
                  <p className="mt-2 text-neutral-600 lowercase">
                    in this 30-minute call, we'll discuss your goals and see if we're a good fit to work together.
                  </p>
                </div>

                {/* Mobile accordion sections */}
                {isMobile ? (
                  <div className="divide-y">
                    {/* What to expect section */}
                    <div className="border-t">
                      <button
                        className="flex items-center justify-between w-full p-4 text-left"
                        onClick={() => toggleSection("expect")}
                      >
                        <span className="font-medium">what to expect</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${activeSection === "expect" ? "rotate-180" : ""}`}
                        />
                      </button>

                      <div
                        className={`px-4 pb-4 overflow-hidden transition-all duration-300 ${activeSection === "expect" ? "max-h-96" : "max-h-0"}`}
                      >
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-600 lowercase">no commitment or obligation</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-600 lowercase">understand your business goals</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-600 lowercase">explore potential solutions</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Desktop version - always expanded
                  <div className="p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-neutral-600 lowercase">no commitment or obligation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-neutral-600 lowercase">understand your business goals</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-neutral-600 lowercase">explore potential solutions</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* CTA Button - Enhanced for mobile */}
                <div className={`p-6 ${isMobile ? "bg-neutral-50" : ""}`}>
                  <a
                    href="https://calendly.com/enzo-prism/exclusive-strategy-session-with-prism"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("schedule your call", "get started page")}
                    className={`
                      block w-full text-center py-4 px-6 rounded-full 
                      ${isMobile ? "bg-black text-white shadow-lg transform transition-transform active:scale-95" : "bg-black text-white"}
                      text-lg lowercase font-medium
                    `}
                  >
                    <div className="flex items-center justify-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      schedule your call
                      {isMobile && <ArrowRight className="ml-2 h-4 w-4" />}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FAQs Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                  frequently asked questions
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                  everything you need to know about working with us.
                </p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-lg border bg-white shadow-sm">
                    <button
                      className="flex w-full items-center justify-between px-6 py-4 text-left"
                      onClick={() => toggleSection(`faq-${index}`)}
                    >
                      <h3 className="font-medium lowercase">{faq.question}</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-neutral-500 transition-transform ${
                          activeSection === `faq-${index}` ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`px-6 overflow-hidden transition-all duration-300 ${
                        activeSection === `faq-${index}` ? "pb-4 max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="text-neutral-600 lowercase">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add FAQ Schema for SEO */}
          <FAQSchema questions={faqs} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
