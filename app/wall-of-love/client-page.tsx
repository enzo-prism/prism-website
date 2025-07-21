"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion"

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
]

const renderFormattedText = (text: string) => {
  const segments = text.split(/(\*\*.*?\*\*)/g).filter(Boolean)

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return <strong key={index}>{segment.substring(2, segment.length - 2)}</strong>
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
  return newArray
}

const TestimonialCard = ({ quote, index, isMobile, isVisible, cardRef }: { 
  quote: Quote; 
  index: number;
  isMobile: boolean;
  isVisible: boolean;
  cardRef: (el: HTMLQuoteElement | null) => void;
}) => {
  const shouldReduceMotion = useReducedMotion()

  const cardVariants: Variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        hover: {}
      }
    }

    return {
      hidden: { 
        opacity: 0, 
        y: isMobile ? 10 : 15,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: isMobile ? 0.25 : 0.3,
          ease: "easeOut",
        },
      },
      hover: isMobile ? {} : {
        y: -3,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      },
    }
  }, [shouldReduceMotion, isMobile])

  return (
    <motion.blockquote
      ref={cardRef}
      data-index={index}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={!isMobile ? "hover" : undefined}
      className="testimonial-card bg-white p-4 sm:p-6 rounded-xl shadow-md w-full"
      style={{
        contain: "layout style paint",
        // Remove transform style on mobile to prevent conflicts
        willChange: isVisible ? "opacity, transform" : "auto",
      }}
      aria-label={`Testimonial from ${quote.client.toLowerCase()}`}
    >
      <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-3 sm:mb-4">
        &ldquo;{renderFormattedText(quote.text.toLowerCase())}&rdquo;
      </p>
      <footer className="text-right">
        <p className="font-semibold text-sm sm:text-base text-neutral-800">{quote.client.toLowerCase()}</p>
        <p className="text-xs sm:text-sm text-neutral-500">{quote.company.toLowerCase()}</p>
      </footer>
    </motion.blockquote>
  )
}

export default function WallOfLoveClientPage() {
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([])
  const [visibleCount, setVisibleCount] = useState(10)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
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

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const updates = { cards: new Set<number>(), shouldLoadMore: false }
    
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement
      
      // Handle load more detection
      if (element === loadMoreRef.current && entry.isIntersecting) {
        updates.shouldLoadMore = true
        return
      }
      
      // Handle card visibility
      const cardElement = element as HTMLQuoteElement
      const cardIndex = parseInt(cardElement.dataset.index || '-1', 10)
      
      if (cardIndex >= 0 && entry.isIntersecting) {
        updates.cards.add(cardIndex)
      }
    })
    
    // Batch state updates
    if (updates.cards.size > 0) {
      setVisibleCards(prev => {
        const newSet = new Set([...prev, ...updates.cards])
        return newSet.size !== prev.size ? newSet : prev
      })
    }
    
    if (updates.shouldLoadMore) {
      setVisibleCount(prev => Math.min(prev + (isMobile ? 5 : 8), shuffledQuotes.length))
    }
  }, [isMobile, shuffledQuotes.length])

  const setCardRef = useCallback((index: number) => {
    return (el: HTMLQuoteElement | null) => {
      if (el) {
        cardRefs.current.set(el, index)
        observerRef.current?.observe(el)
      } else {
        // When el is null, element has been unmounted
        // WeakMap automatically handles cleanup, no need to unobserve null
        // Skip unobserve since element is already removed from DOM
      }
    }
  }, [])

  useEffect(() => {
    setIsHydrated(true)
    setShuffledQuotes(shuffleArray(quotesData))
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Single observer for both card visibility and load-more detection
    observerRef.current = new IntersectionObserver(
      observerCallback,
      { 
        threshold: [0.1, 0.15], 
        rootMargin: isMobile ? "30px" : "60px"
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
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white overflow-x-hidden">
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
          <div className="testimonial-container space-y-6 sm:space-y-8">
            {(!isHydrated ? quotesData.slice(0, visibleCount) : shuffledQuotes.slice(0, visibleCount)).map((quote, index) => (
              <TestimonialCard
                key={quote.id}
                quote={quote}
                index={index}
                isMobile={isHydrated ? isMobile : false}
                isVisible={visibleCards.has(index)}
                cardRef={setCardRef(index)}
              />
            ))}
          </div>
          
          {visibleCount < shuffledQuotes.length && (
            <div
              ref={loadMoreRef}
              className="h-20 flex items-center justify-center mt-8"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2 text-neutral-500"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full"
                />
                <span className="text-sm sm:text-base">Loading more testimonials...</span>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
