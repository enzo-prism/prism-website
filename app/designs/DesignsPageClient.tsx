"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"

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


const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%", // Exits in the opposite direction of new slide entry
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function DesignsPageClient() {
  const isMobile = useMobile()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [shuffledSlides, setShuffledSlides] = useState([...slides])
  const [direction, setDirection] = useState(0)
  const [isDraggingVisual, setIsDraggingVisual] = useState(false)
  const [draggedX, setDraggedX] = useState(0)

  const slideContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shuffled = [...slides].sort(() => Math.random() - 0.5)
    setShuffledSlides(shuffled)
  }, [])

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      if (newDirection > 0) {
        setCurrentSlide((prev) => (prev === shuffledSlides.length - 1 ? 0 : prev + 1))
      } else {
        setCurrentSlide((prev) => (prev === 0 ? shuffledSlides.length - 1 : prev - 1))
      }
    },
    [shuffledSlides.length],
  )

  const nextSlide = useCallback(() => paginate(1), [paginate])
  const prevSlide = useCallback(() => paginate(-1), [paginate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

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
              eye-catching visuals and brand identity solutions that make your business unforgettable.
            </p>
          </div>
        </section>

        {/* Slider Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center">
              {/* Image Slider */}
              <div
                className="w-full max-w-3xl relative" // Removed aspect-square from here
                ref={slideContainerRef}
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Slide ${currentSlide + 1} of ${shuffledSlides.length}`}
              >
                {/* This div now controls the aspect ratio and overflow for the slides */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentSlide}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragStart={() => setIsDraggingVisual(true)}
                      onDrag={(event, info) => setDraggedX(info.offset.x)}
                      onDragEnd={(e, { offset, velocity }) => {
                        setIsDraggingVisual(false)
                        setDraggedX(0)
                        const swipe = swipePower(offset.x, velocity.x)
                        const slideWidth = slideContainerRef.current?.offsetWidth || window.innerWidth

                        if (swipe < -swipeConfidenceThreshold || offset.x < -slideWidth / 3) {
                          paginate(1)
                        } else if (swipe > swipeConfidenceThreshold || offset.x > slideWidth / 3) {
                          paginate(-1)
                        }
                      }}
                      // Added absolute positioning and full width/height to fill the aspect-ratio container
                      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                    >
                      <img
                        src={shuffledSlides[currentSlide].image || "/placeholder.svg"}
                        alt={`Design slide: ${shuffledSlides[currentSlide].quote}`}
                        className="w-full h-full object-contain"
                        draggable="false"
                      />
                      {isDraggingVisual && draggedX < -10 && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md">
                          <ChevronLeft className="h-6 w-6 text-black" />
                        </div>
                      )}
                      {isDraggingVisual && draggedX > 10 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md">
                          <ChevronRight className="h-6 w-6 text-black" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows - Only visible on non-mobile */}
                {!isMobile && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-[calc(50%-2rem)] -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white pointer-events-auto z-10 ml-2 disabled:opacity-50"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-[calc(50%-2rem)] -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white pointer-events-auto z-10 mr-2 disabled:opacity-50"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

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
                        if (index > currentSlide) {
                          paginate(1)
                        } else if (index < currentSlide) {
                          paginate(-1)
                        }
                        setCurrentSlide(index)
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

      </main>
      <Footer />
    </div>
  )
}
