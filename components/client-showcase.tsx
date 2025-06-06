"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import OptimizedImage from "./optimized-image"

// Import the tracking function at the top of the file
import { trackClientShowcaseInteraction } from "@/utils/analytics"
// Add the import for scroll optimization utilities
import { throttle, addPassiveEventListener, removePassiveEventListener } from "@/utils/scroll-optimization"
// Import the new preloader component
import ClientImagePreloader from "./client-image-preloader"

interface Client {
  id: number
  name: string
  business: string
  clientType: "website" | "growth" | "podcast guest" | "Instagram"
  metric?: string
  description?: string
  gradient: string
  image?: string
}

// Fisher-Yates (Knuth) shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Define a configurable speed factor (pixels per second)
const SCROLL_SPEED_FACTOR = 80

export default function ClientShowcase() {
  const clientsData: Client[] = [
    {
      id: 1,
      name: "dr. chris wong",
      business: "dental practice in palo alto",
      clientType: "website",
      gradient: "bg-gradient-to-br from-purple-200 to-purple-400",
      image: "/dr-chris-wong.png",
    },
    {
      id: 2,
      name: "dr. alexie aguil",
      business: "exquisite dentistry",
      clientType: "growth",
      gradient: "bg-gradient-to-br from-blue-200 to-blue-400",
      image: "/dr-alexie-aguil.png",
    },
    {
      id: 3,
      name: "dr. teagan willes",
      business: "laguna beach dental arts",
      clientType: "website",
      gradient: "bg-gradient-to-br from-teal-200 to-teal-400",
      image: "/dr-teagan-willes-headshot.jpeg",
    },
    {
      id: 4,
      name: "dr. tingjen ji",
      business: "grace dental santa rosa",
      clientType: "growth",
      gradient: "bg-gradient-to-br from-amber-200 to-amber-400",
      image: "/dr-tingjen-ji.png",
    },
    {
      id: 5,
      name: "dr. gerard banaga",
      business: "town centre dental",
      clientType: "website",
      gradient: "bg-gradient-to-br from-rose-200 to-rose-400",
      image: "/dr-gerard-banaga-headshot.png",
    },
    {
      id: 6,
      name: "suz meinhardt",
      business: "rebellious aging",
      clientType: "growth",
      gradient: "bg-gradient-to-br from-green-200 to-green-400",
      image: "/suz-meinhardt.png",
    },
    {
      id: 7,
      name: "clare frattarola",
      business: "we are saplings",
      clientType: "website",
      gradient: "bg-gradient-to-br from-indigo-200 to-indigo-400",
      image: "/clare-frattarola-headshot.png",
    },
    {
      id: 8,
      name: "buck brown",
      business: "olympic bootworks",
      clientType: "growth",
      gradient: "bg-gradient-to-br from-pink-200 to-pink-400",
      image: "/buck-brown-olympic-bootworks.jpeg",
    },
    {
      id: 9,
      name: "don listwin",
      business: "belize kids foundation",
      clientType: "website",
      gradient: "bg-gradient-to-br from-orange-200 to-orange-400",
      image: "/don-listwin-headshot.jpeg",
    },
    {
      id: 10,
      name: "dr. michael njo",
      business: "practice transitions institute",
      clientType: "growth",
      gradient: "bg-gradient-to-br from-cyan-200 to-cyan-400",
      image: "/dr-michael-njo.jpeg",
    },
    {
      id: 11,
      name: "liz armato",
      business: "leadership summit",
      clientType: "website",
      gradient: "bg-gradient-to-br from-violet-200 to-violet-400",
      image: "/liz-armato.png",
    },
    {
      id: 12,
      name: "dr. katie lee",
      business: "author of saved by the mouth",
      clientType: "podcast guest",
      gradient: "bg-gradient-to-br from-emerald-200 to-emerald-400",
      image: "/dr-katie-lee.jpeg",
    },
    {
      id: 13,
      name: "dr. arash abolfazlian",
      business: "crow canyon orthodontics",
      clientType: "podcast guest",
      gradient: "bg-gradient-to-br from-sky-200 to-sky-400",
      image: "/dr-arash-abolfazlian.png", // Ensured this line is clean
    },
    {
      id: 14,
      name: "dr. bryce chun",
      business: "coast periodontics",
      clientType: "website",
      gradient: "bg-gradient-to-br from-fuchsia-200 to-fuchsia-400",
      image: "/dr-bryce-chun.jpeg",
    },
    {
      id: 15,
      name: "kai lenny",
      business: "professional surfer & innovator",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-blue-400 via-cyan-400 to-sky-500",
      image: "/instagram-clients/kai-lenny.png",
    },
    {
      id: 16,
      name: "neels visser",
      business: "model & entrepreneur",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-neutral-400 via-slate-500 to-gray-600",
      image: "/instagram-clients/neels-visser.png",
    },
    {
      id: 17,
      name: "jay alvarrez",
      business: "filmmaker & lifestyle influencer",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-yellow-300 via-orange-400 to-amber-500",
      image: "/instagram-clients/jay-alvarrez.png",
    },
    {
      id: 18,
      name: "matthew espinosa",
      business: "digital creator & actor",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-red-500 via-pink-500 to-rose-600",
      image: "/instagram-clients/matthew-espinosa.png",
    },
    {
      id: 19,
      name: "kerri walsh jennings",
      business: "olympic gold medalist",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500",
      image: "/instagram-clients/kerri-walsh-jennings.png",
    },
    {
      id: 20,
      name: "rob riggle",
      business: "actor & comedian",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-teal-400 via-cyan-500 to-sky-500",
      image: "/instagram-clients/rob-riggle.png",
    },
    {
      id: 21,
      name: "tai lopez",
      business: "investor & entrepreneur",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-green-400 via-lime-500 to-emerald-500",
      image: "/instagram-clients/tai-lopez.png",
    },
    {
      id: 22,
      name: "alex hormozi",
      business: "entrepreneur & author",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-red-500 via-rose-600 to-pink-600",
      image: "/instagram-clients/alex-hormozi.png",
    },
    {
      id: 25,
      name: "justin mateen",
      business: "co-founder, tinder",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500",
      image: "/instagram-clients/justin-mateen.png",
    },
    {
      id: 26,
      name: "cole hocker",
      business: "olympic athlete, team usa",
      clientType: "Instagram",
      gradient: "bg-gradient-to-br from-red-400 via-blue-400 to-red-500",
      image: "/instagram-clients/cole-hocker.png",
    },
  ]

  const [clients, setClients] = useState<Client[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(isPaused)
  const prevPausedRef = useRef(isPaused)
  const [isLoaded, setIsLoaded] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [animationDuration, setAnimationDuration] = useState(0)
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0)

  // Keep a ref of the latest paused state for the IntersectionObserver
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    // Ensure any previous Miguel entries (ID 23 or 24 or 27) are filtered out before shuffling
    const filteredClientsData = clientsData.filter((client) => client.id !== 23 && client.id !== 24 && client.id !== 27)
    const shuffledClients = shuffleArray(filteredClientsData)
    setClients([...shuffledClients, ...shuffledClients])
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded && clients.length > 0) {
      const imagesToPreload = clients
        .slice(0, Math.min(5, clients.length)) // Preload first 5 visible images
        .filter((client) => client.image)
        .map((client) => client.image as string)

      imagesToPreload.forEach((imageSrc) => {
        if (typeof imageSrc === "string") {
          const img = new Image()
          img.src = imageSrc
        }
      })
    }
  }, [isLoaded, clients])

  useEffect(() => {
    if (!containerRef.current || !isLoaded || clients.length === 0) {
      setContentWidth(0)
      setAnimationDuration(0)
      return
    }

    const calculateWidths = () => {
      const container = containerRef.current
      if (!container) return

      const containerWidthVal = container.clientWidth
      const actualContentWidth = container.firstChild ? container.scrollWidth / 2 : 0

      setContainerWidth(containerWidthVal)
      setContentWidth(actualContentWidth)

      if (actualContentWidth > 0 && SCROLL_SPEED_FACTOR > 0) {
        const duration = actualContentWidth / SCROLL_SPEED_FACTOR
        setAnimationDuration(duration)
      } else {
        setAnimationDuration(0)
      }
    }

    calculateWidths()
    const debouncedCalculateWidths = throttle(calculateWidths, 200)
    window.addEventListener("resize", debouncedCalculateWidths)
    return () => window.removeEventListener("resize", debouncedCalculateWidths)
  }, [isLoaded, clients])

  const handleScroll = useCallback(
    throttle(() => {
      if (containerRef.current) {
        trackClientShowcaseInteraction("manual_scroll")
      }
    }, 100),
    [],
  )

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      addPassiveEventListener(container, "scroll", handleScroll)
      return () => {
        if (container) {
          removePassiveEventListener(container, "scroll", handleScroll)
        }
      }
    }
  }, [handleScroll])

  const handleMouseEnter = () => {
    setIsPaused(true)
    captureScrollPosition()
    trackClientShowcaseInteraction("hover_pause")
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    trackClientShowcaseInteraction("hover_resume")
  }

  const captureScrollPosition = useCallback(() => {
    if (containerRef.current) {
      const innerContainer = containerRef.current.querySelector("div")
      if (innerContainer) {
        const style = window.getComputedStyle(innerContainer)
        const matrix = new WebMatrix(style.transform)
        const translateX = matrix.m41 || 0
        setCurrentScrollPosition(translateX)
      }
    }
  }, [])

  function WebMatrix(transformString: string | null) {
    // @ts-ignore
    this.m41 = 0
    if (!transformString || transformString === "none") return

    const matrixMatch = transformString.match(/matrix.*$$(.+)$$/)
    if (matrixMatch) {
      const values = matrixMatch[1].split(/,\s*/)
      if (values.length >= 6) {
        // @ts-ignore
        this.m41 = Number.parseFloat(values[4])
      }
    } else {
      const translateMatch = transformString.match(/translateX$$(.+)px$$/)
      if (translateMatch) {
        // @ts-ignore
        this.m41 = Number.parseFloat(translateMatch[1])
      }
    }
  }

  const handleTouchStart = useCallback(() => {
    setIsPaused(true)
    captureScrollPosition()
    trackClientShowcaseInteraction("touch_stop_scrolling")
  }, [captureScrollPosition])

  const handleTouchEnd = useCallback(() => {
    setIsPaused(false)
    trackClientShowcaseInteraction("touch_resume_scrolling")
  }, [])

  // Pause the animation when the showcase leaves the viewport
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPaused(prevPausedRef.current)
        } else {
          prevPausedRef.current = isPausedRef.current
          setIsPaused(true)
        }
      })
    })

    observer.observe(container)
    return () => {
      observer.disconnect()
    }
  }, [])

  if (!isLoaded || clients.length === 0) {
    return null
  }

  const isAnimationActive = contentWidth > containerWidth && !isPaused

  return (
    <div className="relative w-full overflow-hidden">
      <ClientImagePreloader
        imagePaths={clients
          .slice(0, Math.min(10, clients.length))
          .filter((client) => client.image)
          .map((client) => client.image as string)}
      />

      <div
        ref={containerRef}
        className="flex w-full overflow-x-auto pb-8 scrollbar-hide hardware-accelerated scroll-container"
        onScroll={handleScroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex pause-on-scroll"
          style={{
            transform: isAnimationActive ? `translateX(-${contentWidth}px)` : `translateX(${currentScrollPosition}px)`,
            transition: isAnimationActive ? `transform ${animationDuration}s linear infinite` : "none",
            animation:
              isAnimationActive && animationDuration > 0
                ? `scroll-clients ${animationDuration}s linear infinite`
                : "none",
          }}
        >
          {clients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="relative flex-shrink-0 px-2 first:pl-4 last:pr-4"
              style={{ width: "280px" }}
            >
              <div className={`relative overflow-hidden rounded-xl ${client.gradient}`} style={{ aspectRatio: "9/16" }}>
                <div className="absolute inset-0 w-full h-full">
                  {client.image ? (
                    <OptimizedImage
                      src={client.image}
                      alt={`Photo of ${client.name}`}
                      width={280}
                      height={498}
                      className="object-cover w-full h-full"
                      sizes="280px"
                      priority={index < 5} // Prioritize loading for first 5 images
                      fallbackSrc={`/placeholder.svg?height=498&width=280&query=${encodeURIComponent(client.name)}`}
                      fallbackColor={
                        client.gradient.includes("from-") ? client.gradient.split("from-")[1].split(" ")[0] : "#f3f4f6"
                      }
                    />
                  ) : (
                    <div className={`w-full h-full ${client.gradient}`}></div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full p-6">
                  <div>
                    <h3 className="text-lg font-bold text-white lowercase">{client.name}</h3>
                    <p className="text-sm text-white text-opacity-90 lowercase">
                      {client.clientType === "podcast guest" || client.clientType === "Instagram"
                        ? client.business
                        : `owner of ${client.business}`}
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 text-3xl font-bold text-white lowercase">{client.clientType}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
