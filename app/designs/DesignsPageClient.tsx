"use client"

import type React from "react" // Keep type import

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Quotes data (assuming slides array is defined as before)
const slides = [
  {
    id: "1",
    image: "/designs/obstacle-way.jpeg",
    quote: '"the obstacle is the way."',
    author: "– marcus aurelius",
  },
  {
    id: "2",
    image: "/designs/kobe-soul-eternal.jpeg",
    quote: '"the soul is never born, never dies."',
    author: "– bhagavad gita",
  },
  {
    id: "3",
    image: "/designs/la28-logos.png",
    quote: '"the man on top of the mountain didn\'t fall there."',
    author: "— vince lombardi",
  },
  {
    id: "4",
    image: "/designs/mountain-stones.jpeg",
    quote: '"the man who moves a mountain begins by carrying away small stones."',
    author: "— confucius",
  },
  {
    id: "5",
    image: "/designs/small-beginnings.jpeg",
    quote: '"do not despise the day of small beginnings."',
    author: "– book of zechariah",
  },
  {
    id: "6",
    image: "/designs/journey-step.jpeg",
    quote: '"a journey of a thousand miles begins with a single step."',
    author: "– lao tzu",
  },
  {
    id: "7",
    image: "/designs/the-way-is-training.png",
    quote: '"the way is in training."',
    author: "— miyamoto musashi",
  },
  {
    id: "8",
    image: "/designs/hearts-that-bend.png",
    quote: '"blessed are the hearts that can bend; they shall never be broken."',
    author: "— camus",
  },
  {
    id: "9",
    image: "/designs/dark-side-of-the-moon.png",
    quote: "“Look for what you notice but no one else sees.”",
    author: "– Rick Rubin",
  },
]

// Design services FAQs (assuming designFaqs array is defined as before)
const designFaqs = [
  {
    question: "what types of design services do you offer?",
    answer:
      "we provide a comprehensive range of design services including brand identity (logos, color palettes, typography), marketing materials (brochures, business cards, flyers), digital assets (social media graphics, email templates, web banners), packaging design, environmental graphics, and custom illustrations. all our designs are created with both aesthetic appeal and strategic business goals in mind.",
  },
  {
    question: "how does your design process work?",
    answer:
      "our design process begins with a discovery phase to understand your brand, audience, and objectives. we then create concept designs, gather your feedback, refine the designs, and deliver final files in all formats you need. we maintain open communication throughout and offer unlimited revisions during the concept phase to ensure you're completely satisfied with the final result.",
  },
  {
    question: "how much do your design services cost?",
    answer:
      "our design services are priced based on project scope and complexity. logo and brand identity packages typically range from $1,500 to $5,000. individual design projects like brochures or social media templates start at $500. we also offer monthly design subscriptions starting at $997/month for businesses needing ongoing design support. we provide detailed quotes after understanding your specific requirements.",
  },
  {
    question: "how long do design projects take to complete?",
    answer:
      "project timelines vary based on complexity. logo and brand identity projects typically take 2-4 weeks from start to finish. smaller projects like social media graphics can be completed in 3-5 business days. we'll provide a specific timeline during our initial consultation and keep you updated on progress throughout the project.",
  },
  {
    question: "what file formats will i receive for my designs?",
    answer:
      "we provide all designs in multiple formats suitable for both print and digital use. this typically includes vector files (ai, eps, svg), editable files (psd, indd), and ready-to-use formats (pdf, jpg, png). we also provide brand guidelines and templates when applicable to ensure consistent implementation across all channels.",
  },
  {
    question: "do you offer rush services for urgent design needs?",
    answer:
      "yes, we offer expedited design services for time-sensitive projects at an additional fee. depending on our current workload and the complexity of your project, we can often accommodate rush requests with 24-72 hour turnarounds. please contact us directly about your urgent design needs so we can provide specific timing and pricing options.",
  },
]

const X_OFFSET = 100 // Represents a percentage or relative unit for Framer Motion

export default function DesignsPageClient() {
  const isMobile = useMobile()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [shuffledSlides, setShuffledSlides] = useState([...slides])
  const [isDragging, setIsDragging] = useState(false)
  const [dragDirectionVisual, setDragDirectionVisual] = useState<null | "left" | "right">(null) // For visual swipe indicators
  const [transitionIntent, setTransitionIntent] = useState<"next" | "prev" | null>(null) // For animation direction

  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)
  const slideWidth = useRef(0) // For potential use if X_OFFSET needs to be dynamic
  const slideContainerRef = useRef<HTMLDivElement>(null)
  const dragThreshold = 50
  const dragSpring = useSpring(0, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const shuffled = [...slides].sort(() => Math.random() - 0.5)
    setShuffledSlides(shuffled)
  }, [])

  const nextSlide = useCallback(() => {
    setTransitionIntent("next")
    setCurrentSlide((prev) => (prev === shuffledSlides.length - 1 ? 0 : prev + 1))
  }, [shuffledSlides.length])

  const prevSlide = useCallback(() => {
    setTransitionIntent("prev")
    setCurrentSlide((prev) => (prev === 0 ? shuffledSlides.length - 1 : prev - 1))
  }, [shuffledSlides.length])

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide) return
      setTransitionIntent(index > currentSlide ? "next" : "prev")
      setCurrentSlide(index)
    },
    [currentSlide],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (slideContainerRef.current) {
      slideWidth.current = slideContainerRef.current.offsetWidth
    }
    touchStartX.current = e.touches[0].clientX
    touchCurrentX.current = e.touches[0].clientX
    setIsDragging(true)
    dragSpring.set(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    touchCurrentX.current = e.touches[0].clientX
    const distance = touchCurrentX.current - touchStartX.current
    dragSpring.set(distance)

    if (distance > 10) {
      setDragDirectionVisual("right")
    } else if (distance < -10) {
      setDragDirectionVisual("left")
    } else {
      setDragDirectionVisual(null)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    const distance = touchCurrentX.current - touchStartX.current

    if (Math.abs(distance) > dragThreshold) {
      if (distance < 0) {
        // Swiped left
        nextSlide()
      } else {
        // Swiped right
        prevSlide()
      }
    } else {
      dragSpring.set(0, { damping: 20 }) // Animate back if not enough drag
    }

    setDragDirectionVisual(null) // Reset visual indicator
    touchStartX.current = 0
    touchCurrentX.current = 0
    // dragSpring.set(0) // Already handled or will be by new animation
  }

  const slideVariants = {
    initial: (intent: "next" | "prev" | null) => ({
      opacity: 0,
      x: intent === "next" ? X_OFFSET : intent === "prev" ? -X_OFFSET : 0,
    }),
    animate: {
      opacity: 1,
      x: 0,
      zIndex: 1,
    },
    exit: (intent: "next" | "prev" | null) => ({
      opacity: 0,
      zIndex: 0,
      x: intent === "next" ? -X_OFFSET : intent === "prev" ? X_OFFSET : 0,
    }),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Captivating Designs" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
              <div className="space-y-3">
                <div className="text-4xl">🎨</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  captivating designs.
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  eye-catching visuals and brand identity solutions that make your business unforgettable.
                </p>
                <div className="pt-6">
                  <Link href="/get-started?service=graphic-design">
                    <Button className="rounded-full px-8 py-6 text-lg lowercase">
                      get started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="text-xs text-neutral-500 mt-2 lowercase">2x sales in 90 days or don't pay</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slider Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center">
              <div
                className="w-full max-w-3xl relative"
                ref={slideContainerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Slide ${currentSlide + 1} of ${shuffledSlides.length}`}
              >
                <div className="relative">
                  <AnimatePresence initial={false} custom={transitionIntent} mode="wait">
                    <motion.div
                      key={shuffledSlides[currentSlide]?.id || currentSlide} // Use a stable key
                      custom={transitionIntent}
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30, duration: 0.4 },
                        opacity: { duration: 0.3 },
                      }}
                      style={{ x: isDragging ? dragSpring : 0 }} // Apply drag motion
                      className="aspect-square w-full overflow-hidden rounded-lg bg-white"
                    >
                      <img
                        src={shuffledSlides[currentSlide]?.image || "/placeholder.svg"}
                        alt={`Design slide: ${shuffledSlides[currentSlide]?.quote}`}
                        className="w-full h-full object-contain"
                      />

                      {isDragging && dragDirectionVisual === "left" && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md">
                          <ChevronLeft className="h-6 w-6 text-black" />
                        </div>
                      )}
                      {isDragging && dragDirectionVisual === "right" && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md">
                          <ChevronRight className="h-6 w-6 text-black" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {!isMobile && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white pointer-events-auto z-10"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white pointer-events-auto z-10"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xl md:text-2xl font-light text-gray-800 mb-2 lowercase">
                    {shuffledSlides[currentSlide]?.quote}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 lowercase">{shuffledSlides[currentSlide]?.author}</p>
                </div>

                <div className="flex justify-center space-x-2 mt-6">
                  {shuffledSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === index ? "w-6 bg-black" : "w-2 bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {isMobile && (
                  <div className="flex items-center justify-center space-x-2 text-center text-sm text-gray-500 mt-4">
                    <ChevronLeft className="h-4 w-4" />
                    <p>swipe to navigate between designs</p>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter lowercase text-center mb-12">
                frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {designFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left lowercase font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-neutral-600 lowercase">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-12 text-center">
                <p className="text-neutral-600 lowercase mb-6">have more questions? we're here to help.</p>
                <Link href="/get-started">
                  <Button className="rounded-full px-8 py-6 text-lg lowercase">
                    schedule a consultation <ArrowRight className="ml-2 h-5 w-5" />
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
