"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Quote as QuoteIcon } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

interface Quote {
  id: number
  text: string
  client: string
  company: string
}

const quotesData: Quote[] = [
  {
    id: 1,
    text: "Everyone loves the website — you did a **great job** on it.",
    client: "Renata Chun",
    company: "Coast Periodontics",
  },
  {
    id: 2,
    text: "The **design was so amazing — it was incredible.**",
    client: "Michael",
    company: "Exquisite Dentistry",
  },
  {
    id: 3,
    text: "I **love** the new home page; it looks **professional** and it's **easy for patients.**",
    client: "Dr. Tingjen Ji",
    company: "Grace Dental",
  },
  {
    id: 4,
    text: "Those **scheduling options** you built were **brilliant.**",
    client: "Michael",
    company: "Exquisite Dentistry",
  },
  {
    id: 5,
    text: "I'd **love to keep working with you — you're so talented.**",
    client: "Renata Chun",
    company: "Coast Periodontics",
  },
  { id: 6, text: "I **love everything you've done.**", client: "Suzanne Meinhardt", company: "Rebellious Aging" },
  { id: 8, text: "The implant page is **great — it's perfect.**", client: "Dr. Tingjen Ji", company: "Grace Dental" },
  {
    id: 9,
    text: "Seeing this makes me feel **hopeful — I'm confident in you.**",
    client: "Dr. Tingjen Ji",
    company: "Grace Dental",
  },
  {
    id: 10,
    text: "That little snippet is **brilliant — it'll be fun!**",
    client: "Mary Lynn Wheaton",
    company: "Leadership Summit",
  },
  {
    id: 11,
    text: "This is so smart",
    client: "hay_bail1",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 12,
    text: "This is brilliant",
    client: "aboinpally1",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 13,
    text: "Amazing framework 🙌",
    client: "itsoguzhank",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 14,
    text: "Wow. Just wow",
    client: "spencer_kunkel",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 15,
    text: "Not gonna lie… It's been an hour and I'm still just listening to this on repeat.",
    client: "aaronwbateman",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 16,
    text: "This hits.",
    client: "victimhair_co",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 17,
    text: "Saw this on a right time.",
    client: "garlic_soss",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 18,
    text: "This side of Instagram is what keeping me in this app.",
    client: "i_m_y_r_s",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 19,
    text: "Brilliant, more please",
    client: "maggieedwards109",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 20,
    text: "🔥",
    client: "strategicdiaries",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 21,
    text: "Grateful 🙏🏼",
    client: "ernestkings",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 22,
    text: "This is so true amen 🙏🏾",
    client: "mr.noelespinoza",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 23,
    text: "that's great 🔥",
    client: "miskagonzalez",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 24,
    text: "Beautiful",
    client: "bruce.connect",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 25,
    text: "That was a epic one thank you",
    client: "chrisdarch150",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 26,
    text: "One of the best words of wisdoms you'll here",
    client: "linden_raaen3",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 27,
    text: "damn. speechless",
    client: "_instaluna",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 28,
    text: "Poetic",
    client: "apez7",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 29,
    text: "Beautiful.",
    client: "ashleydowds",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 30,
    text: "Finally my algorithm is doing its job",
    client: "zirbmaa",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 31,
    text: "Holy moly this took me and shook me",
    client: "muhammadkathrada",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 32,
    text: "let this video blow.",
    client: "piiyyyyush",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 33,
    text: "I'm making this my morning alarm",
    client: "greegy_the_great",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 34,
    text: "Spitting facts 🔥🔥",
    client: "blue.moon.thoughtz",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 35,
    text: "Powerful",
    client: "yt_dying_breed",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 36,
    text: "Thank you for this video, such powerful message👏",
    client: "zemp_alessandro",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 37,
    text: "👏🏼 si!!!! Ty!!! Ty.",
    client: "la_chica_del_312",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 38,
    text: "🔥🔥🔥",
    client: "dr_tripp",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 39,
    text: "Gotta keep this in my reel cycles",
    client: "ivanjohnson845",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 40,
    text: "Amazing",
    client: "nicolasmartinezval",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 41,
    text: "I found the perfect video.",
    client: "ryankjamess",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 42,
    text: "He absolutely cooked. 🔥🔥🔥🔥",
    client: "bossgangvip",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 43,
    text: "FYP!",
    client: "i_am_damithjayarathne",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 44,
    text: "This is one of the best videos I've ever watched. It's exactly what I always do when the doubts come to my head, I close my eyes and visualise the dream life I'm fighting for, refuel and go again",
    client: "sorin.7_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 45,
    text: "I thought it was just me feeling this😃.",
    client: "befitwithshan",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 46,
    text: "Amazing.",
    client: "kyledsantos",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 47,
    text: "I'm here!!! It hits hard!!! Thank youuu",
    client: "ko_phy7",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 48,
    text: "It's 3am now and I was talking to myself. This its hard rn. I needed this",
    client: "yann.ng14",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 49,
    text: "Who feels it knows it.. 👁️Focus Forward🧘",
    client: "chef.steveconstantine",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 50,
    text: "🔥🔥🔥 Absolutely",
    client: "lisaannpetrie",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 51,
    text: "I felt this deeply. Been here thousands times.",
    client: "collinsnyatanga",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 52,
    text: "Speaking total truth",
    client: "zackssiegel",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 53,
    text: "This one…🥹🙏🏼",
    client: "devjams.og",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 54,
    text: "Inspirational ✨🙌",
    client: "delgesh_al_haider",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 55,
    text: "Fyp",
    client: "kamanofallah__",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 56,
    text: "Needed this🙏",
    client: "therealhaydend",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 57,
    text: "Living it right now 💯🙏",
    client: "damian_palazzola_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 58,
    text: "Might be the realest and best piece of content I've seen in the last 5 years.",
    client: "helder_movement",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 59,
    text: "I can 100% relate to every fucking word that he said",
    client: "ahadk442",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 60,
    text: "Thank you",
    client: "_mohawu_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 61,
    text: "Remind me of this everyday",
    client: "salman.rafique9",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 62,
    text: "Gold",
    client: "david_s2f",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 63,
    text: "Been exactly here hundreds of times. Preach.",
    client: "michaelrrcurtis",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 64,
    text: "Thanks man.",
    client: "_hiranbanerjee_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 65,
    text: "That hits hard 🔥🔥👏",
    client: "masculinity_arts",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 66,
    text: "Love this",
    client: "wisefp_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 67,
    text: "Wow so powerful GO AND DREAM",
    client: "jmantheplug",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 68,
    text: "I needed this for real 🔥",
    client: "emileagbeko",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 69,
    text: "Thank you! I needed this today",
    client: "cruzer1991",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 70,
    text: "Powerful.",
    client: "mikekwal",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 71,
    text: "Needed this. 💔",
    client: "realemmanlamola",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 72,
    text: "This is gold",
    client: "ziegler_alex",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 73,
    text: "I can feel that ❤️",
    client: "himedakanchi",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 74,
    text: "Soooo much truth here!!",
    client: "soldoutservant",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 75,
    text: "Mental really",
    client: "leinad_inamat",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 76,
    text: "this video is life changing",
    client: "andriiikoo",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 77,
    text: "literally listen to this every monday night ❤️",
    client: "mr. mazamio",
    company: "Instagram Community of Entrepreneurs",
  },
]

const renderFormattedText = (text: string) => {
  const segments = text.split(/(\*\*.*?\*\*)/g).filter(Boolean)

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-neutral-900 underline decoration-amber-300/50 decoration-2 underline-offset-4"
        >
          {segment.substring(2, segment.length - 2)}
        </strong>
      )
    }
    return segment
  })
}

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Quote[]): Quote[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  
  // Ensure the new testimonials (id: 76 and 77) appear in the first 10
  const newTestimonialIds = [76, 77]
  newTestimonialIds.forEach(id => {
    const testimonialIndex = newArray.findIndex(q => q.id === id)
    if (testimonialIndex > 9) {
      // Move it to a random position in the first 10
      const newPosition = Math.floor(Math.random() * 10)
      const [testimonial] = newArray.splice(testimonialIndex, 1)
      newArray.splice(newPosition, 0, testimonial)
    }
  })
  
  return newArray
}

const TestimonialCard = ({ quote, index, cardRef }: {
  quote: Quote;
  index: number;
  cardRef: (el: HTMLQuoteElement | null) => void;
}) => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-neutral-200/60 to-white p-[1px]">
      <blockquote
        ref={cardRef}
        data-index={index}
        className="testimonial-card relative bg-white p-5 sm:p-6 rounded-2xl w-full border border-white shadow-sm transition-transform duration-300 sm:hover:shadow-md sm:hover:-translate-y-0.5 will-change-transform"
        style={{ contain: "layout style paint" }}
        aria-label={`Testimonial from ${quote.client}`}
      >
        <div className="absolute -top-3 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-50 ring-1 ring-neutral-200">
          <QuoteIcon className="h-4 w-4 text-neutral-400" aria-hidden="true" />
        </div>
        <p className="mt-2 text-[15px] sm:text-base text-neutral-700 leading-relaxed tracking-tight">
          &ldquo;{renderFormattedText(quote.text)}&rdquo;
        </p>
        <footer className="mt-4 flex items-center justify-end gap-2 text-right">
          <p className="font-semibold text-sm sm:text-base text-neutral-900">{quote.client}</p>
          <span className="text-neutral-300">•</span>
          <p className="text-xs sm:text-sm text-neutral-500">{quote.company}</p>
        </footer>
      </blockquote>
    </div>
  )
}

export default function WallOfLoveClientPage() {
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([])
  const [visibleCount, setVisibleCount] = useState(15) // Increased from 10 to 15
  const loadMoreRef = useRef<HTMLDivElement>(null)
  // Initialize with proper SSR-friendly default
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false // SSR default
    }
    return window.innerWidth < 768
  })
  const [isHydrated, setIsHydrated] = useState(false)
  const cardRefs = useRef<WeakMap<HTMLQuoteElement, number>>(new WeakMap())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [sourceFilter, setSourceFilter] = useState<"all" | "clients" | "community">("all")

  const isCommunityQuote = useCallback((q: Quote) => q.company === "Instagram Community of Entrepreneurs", [])
  const filterQuotesBySource = useCallback(
    (source: "all" | "clients" | "community") => {
      if (source === "community") return quotesData.filter(isCommunityQuote)
      if (source === "clients") return quotesData.filter((q) => !isCommunityQuote(q))
      return quotesData
    },
    [isCommunityQuote]
  )

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement
      
      // Handle load more detection
      if (element === loadMoreRef.current && entry.isIntersecting) {
        setVisibleCount(prev => Math.min(prev + (isMobile ? 5 : 8), shuffledQuotes.length))
      }
    })
  }, [isMobile, shuffledQuotes.length])

  const setCardRef = useCallback((index: number) => {
    return (el: HTMLQuoteElement | null) => {
      if (el) {
        cardRefs.current.set(el, index)
      }
    }
  }, [])

  useEffect(() => {
    setIsHydrated(true)
    setShuffledQuotes(shuffleArray(filterQuotesBySource(sourceFilter)))
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [filterQuotesBySource, sourceFilter])

  useEffect(() => {
    // Recompute when the filter changes after hydration
    if (isHydrated) {
      setShuffledQuotes(shuffleArray(filterQuotesBySource(sourceFilter)))
      setVisibleCount(15)
    }
  }, [sourceFilter, filterQuotesBySource, isHydrated])

  useEffect(() => {
    // Observer for load-more detection
    observerRef.current = new IntersectionObserver(
      observerCallback,
      { 
        threshold: 0.1, 
        rootMargin: "60px"
      }
    )

    // Observe load more element if it exists
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [observerCallback])

  useEffect(() => {
    if ('ontouchstart' in window) {
      document.documentElement.style.setProperty('--touch-action', 'pan-y')
    }
  }, [])

  return (
    <>
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-white overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute left-1/2 top-1/2 h-[60vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06),transparent_60%)]" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-5xl mb-4">❤️</div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight lowercase sm:text-6xl md:text-7xl text-neutral-900 break-words">
              wall of love
            </h1>
            <div className="text-base sm:text-lg text-neutral-600 md:text-xl lowercase max-w-lg mx-auto space-y-1">
              <p>38.5k+ followers on instagram</p>
              <p>24.5k+ subscribers on youtube</p>
            </div>
            <div className="pt-2">
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg lowercase shadow-md w-auto"
                  aria-label="Hire Prism"
                >
                  hire prism <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-neutral-50 optimize-scrolling overflow-x-hidden">
        <main className="w-full max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-neutral-200">
              {([
                { key: "all", label: "All" },
                { key: "clients", label: "Clients" },
                { key: "community", label: "Community" },
              ] as const).map(({ key, label }) => {
                const active = sourceFilter === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSourceFilter(key)}
                    aria-pressed={active}
                    className={
                      `min-w-[86px] px-4 py-2 text-sm rounded-full transition-colors ` +
                      (active
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-100")
                    }
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="testimonial-container space-y-6 sm:space-y-8">
            {(!isHydrated ? quotesData.slice(0, visibleCount) : shuffledQuotes.slice(0, visibleCount)).map((quote, index) => (
              <TestimonialCard
                key={quote.id}
                quote={quote}
                index={index}
                cardRef={setCardRef(index)}
              />
            ))}
          </div>
          
          {visibleCount < shuffledQuotes.length && (
            <div
              ref={loadMoreRef}
              className="h-20 flex items-center justify-center mt-8"
              aria-live="polite"
            >
              <div className="flex items-center space-x-2 text-neutral-500">
                <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                <span className="text-sm sm:text-base">Loading more testimonials...</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
