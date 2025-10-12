"use client"

import Footer from "@/components/footer"
import GetStartedCTA from "@/components/GetStartedCTA"
import PageViewTracker from "@/components/page-view-tracker"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { useMobile } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

// Quotes data
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


// Simplified: use Embla via our Carousel instead of custom drag + spring transitions

export default function DesignsPageClient() {
  const isMobile = useMobile()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [shuffledSlides, setShuffledSlides] = useState([...slides])
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    const shuffled = [...slides].sort(() => Math.random() - 0.5)
    setShuffledSlides(shuffled)
  }, [])

  const nextSlide = useCallback(() => api?.scrollNext(), [api])
  const prevSlide = useCallback(() => api?.scrollPrev(), [api])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Keep current slide index in sync with Embla
  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Captivating Designs" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 mb-6">
              designs
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-md font-light">
              “design is the silent ambassador of your brand.”
            </p>
          </div>
        </section>

        {/* Slider Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              {/* Image Slider */}
              <div className="w-full max-w-3xl relative">
                <Carousel
                  setApi={setApi}
                  opts={{ loop: true, align: "center", containScroll: "trimSnaps" }}
                  className="[&_*]:select-none"
                >
                  <CarouselContent>
                    {shuffledSlides.map((slide) => (
                      <CarouselItem key={slide.id}>
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white" style={{ touchAction: "pan-x" }}>
                          <img
                            src={slide.image}
                            alt={`Design slide: ${slide.quote}`}
                            className="w-full h-full object-contain pointer-events-none"
                            draggable="false"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation Arrows - Only visible on non-mobile */}
                  {!isMobile && (
                    <>
                      <CarouselPrevious className="bg-white/80 hover:bg-white" />
                      <CarouselNext className="bg-white/80 hover:bg-white" />
                    </>
                  )}
                </Carousel>

                {/* Quote Text */}
                <div className="mt-6 text-center max-w-xl mx-auto">
                  <p className="text-xl md:text-2xl font-light text-gray-800 mb-2 lowercase">
                    {shuffledSlides[currentSlide].quote}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 lowercase">{shuffledSlides[currentSlide].author}</p>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {shuffledSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index)
                        api?.scrollTo(index)
                      }}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === index ? "w-6 bg-black" : "w-2 bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Swipe Hint - Only visible on mobile */}
                {isMobile && (
                  <div className="flex items-center justify-center space-x-2 text-center text-sm text-gray-500 mt-4">
                    <ChevronLeft className="h-4 w-4" />
                    <p>swipe to navigate</p>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <GetStartedCTA
          heading="inspired by what you see?"
          description="let's create something amazing together. from logos to complete brand identities, we'll bring your vision to life."
          analyticsLabel="design portfolio CTA"
          variant="gradient"
        />

      </main>
      <Footer />
    </div>
  )
}
