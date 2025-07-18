"use client"

import { useEffect, useRef, useState } from "react"
import CoreImage from "./core-image"

interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  icon: string
  image?: {
    src: string // Can be local path or absolute URL
    alt: string
    width: number
    height: number
    isExternal?: boolean // Flag to indicate if src is an external URL
  }
  link?: {
    url: string
    text: string
  }
}

export default function ScrollingTimeline() {
  const events: TimelineEvent[] = [
    {
      id: 14,
      year: "March 2009",
      title: "first track & field competition",
      description: "my favorite event at the time was high jump",
      icon: "🏅",
      image: {
        src: "/first-track-field-competition.jpeg",
        alt: "Young Enzo running in a blue and white uniform during his first track and field competition with spectators watching from the stands",
        width: 960,
        height: 640,
      },
    },
    {
      id: 13,
      year: "September 2010",
      title: "posted first review on youtube",
      description: "new super Mario bros on Wii",
      icon: "📹",
      image: {
        src: "/first-youtube-video.png",
        alt: "Young Enzo and his brother filming their first YouTube video review, wearing costumes and holding puppies with a video game on the table",
        width: 1200,
        height: 675,
      },
      link: {
        url: "https://www.youtube.com/watch?v=cFz_K56fACc",
        text: "watch the original video",
      },
    },
    {
      id: 12,
      year: "June 2012",
      title: "makes first dollar from youtube",
      description:
        "made money from playing video games?? important moment that changed the way I viewed the world forever",
      icon: "🎮",
    },
    {
      id: 11,
      year: "March 2015",
      title: "first pole vault competition",
      description: "spoiler...I didn't clear that bar lol",
      icon: "🏋️",
      image: {
        src: "/first-pole-vault-competition.jpg",
        alt: "Young Enzo mid-air during a pole vault jump at his first competition with mountains in the background",
        width: 1080,
        height: 1080,
      },
    },
    {
      id: 10,
      year: "November 2017",
      title: "goes d1 in track and field",
      description: "barely made the team. ended up having a great career at cp",
      icon: "🏃‍♂️",
      image: {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cp%20t%20and%20f-sFMISm7fIig64jJN92rJgLfgGKPIDp.png",
        alt: "Enzo smiling in his Cal Poly Track and Field jacket after achieving Division 1 status.",
        width: 450,
        height: 600,
        isExternal: true,
      },
    },
    {
      id: 9,
      year: "June 2020",
      title: "first apple internship",
      description:
        "secured and completed first internship at apple (worked on find my, airplay, and some other cool products!)",
      icon: "🍏",
      image: {
        src: "/welcome-to-apple.jpeg",
        alt: "Enzo's Apple onboarding portal welcoming him to Apple",
        width: 800,
        height: 600,
      },
    },
    {
      id: 8,
      year: "June 2021",
      title: "second apple internship",
      description: "completed a second internship at apple",
      icon: "🍎",
      image: {
        src: "/apple-gear-internship-2.png",
        alt: "Collection of Apple-branded merchandise including backpack, AirPods, water bottles, cap, and other swag items from Apple internship",
        width: 1080,
        height: 1080,
      },
    },
    {
      id: 7,
      year: "June 2022",
      title: "graduates cal poly",
      description: "earned a b.s. in engineering from california polytechnic state university.",
      icon: "🎓",
      image: {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grad-IsBQyLlLzevhd9EO2UZyIUSJDekUhk.png",
        alt: "Enzo and a friend in green graduation gowns with their father/mentor at Cal Poly commencement ceremony",
        width: 760,
        height: 592,
        isExternal: true,
      },
    },
    {
      id: 6,
      year: "June 2022",
      title: "starts full-time product manager role",
      description: "at a venture-backed tech startup",
      icon: "💼",
      image: {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linkedin%20Headshot-wqbXPfncCKxPDoDbSub2dwgsqv6yG3.jpeg",
        alt: "Enzo's professional headshot, smiling in a collared shirt, marking his first full-time product manager role.",
        width: 800,
        height: 800,
        isExternal: true,
      },
    },
    {
      id: 5,
      year: "March 2023",
      title: "first philippine national track and field championship",
      description: "first time competing overseas!",
      icon: "🏆",
      image: {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ph-U2V1yVnSjGOdkPrYBvjUZyroAD9aNN.png",
        alt: "Enzo and fellow athletes holding the Philippine flag at the Philippine National Track and Field Championship.",
        width: 800,
        height: 570,
        isExternal: true,
      },
    },
    {
      id: 4,
      year: "May 2023",
      title: "enzo goes pro in track and field",
      description: "signed the contract. left full-time job. moved out of sf. burned the ships.",
      icon: "🏃",
      image: {
        src: "/philippine-olympic-committee-logo.png",
        alt: "Philippine Olympic Committee Logo",
        width: 500,
        height: 500,
      },
    },
    {
      id: 3,
      year: "May 2023",
      title: "enzo starts driving for uber",
      description: "just trying to pay rent and groceries",
      icon: "🚗",
      image: {
        src: "/uber-driver-profile.jpeg",
        alt: "Enzo's Uber driver profile showing a perfect 5.00 star rating, 515 total trips, and 1 year 11 months of driving experience",
        width: 834,
        height: 1512,
      },
    },
    {
      id: 2,
      year: "May 2023",
      title: "enzo starts prism",
      description: '"i think there\'s a way to use what the tech industry taught me to help smaller businesses…"',
      icon: "✨",
      image: {
              src: "/Prism Logo.png",
      alt: "Prism logo with rainbow gradient",
        width: 800,
        height: 800,
      },
    },
    {
      id: 1,
      year: "December 2023",
      title: "prism makes its first dollar $",
      description: '"oh my gosh I think we\'re gonna make it…"',
      icon: "💰",
    },
  ]

  const eventRefs = useRef<Array<HTMLDivElement | null>>(events.map(() => null))
  const [visibleEvents, setVisibleEvents] = useState<number[]>([events[0].id])

  const createEventRef = (id: number) => {
    return (node: HTMLDivElement | null) => {
      const index = events.findIndex((event) => event.id === id)
      if (index !== -1) {
        eventRefs.current[index] = node
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (!visibleEvents.includes(Number.parseInt(id))) {
              setVisibleEvents((prev) => [...prev, Number.parseInt(id)])
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    events.forEach((event) => {
      const index = events.findIndex((e) => e.id === event.id)
      const node = eventRefs.current[index]
      if (node) {
        observer.observe(node)
      }
    })

    return () => {
      events.forEach((event) => {
        const index = events.findIndex((e) => e.id === event.id)
        const node = eventRefs.current[index]
        if (node) {
          observer.unobserve(node)
        }
      })
    }
  }, [visibleEvents])

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neutral-200 to-neutral-300 transform md:-translate-x-0.5 rounded-full"></div>
      <div className="space-y-16">
        {events.map((event, index) => {
          const isVisible = visibleEvents.includes(event.id)
          return (
            <div
              key={event.id}
              id={event.id.toString()}
              ref={createEventRef(event.id)}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-start transition-all duration-700 ${
                isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className={`absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-white border-2 border-neutral-300 flex items-center justify-center transform -translate-x-5 md:-translate-x-5 z-10 shadow-sm hover:scale-110 transition-transform duration-300 ${
                  isVisible ? "animate-pulse-once" : ""
                }`}
              >
                <span className="text-xl">{event.icon}</span>
              </div>
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 timeline-card">
                  <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-sm lowercase mb-3 font-medium">
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold lowercase mb-2">{event.title}</h3>
                  <p className="text-neutral-600 lowercase">{event.description}</p>

                  {event.image && (event.id === 7 || event.image.isExternal) ? ( // Check for ID 7 or isExternal flag
                    <div className="mt-4 overflow-hidden rounded-lg shadow-sm timeline-image">
                      <img
                        src={event.image.src || "/placeholder.svg"}
                        alt={event.image.alt}
                        width={event.image.width}
                        height={event.image.height}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    </div>
                  ) : event.image ? (
                    <div className="mt-4 overflow-hidden rounded-lg shadow-sm timeline-image">
                      <CoreImage
                        src={event.image.src}
                        alt={event.image.alt}
                        width={event.image.width}
                        height={event.image.height}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                        trackingId={`timeline_image_${event.id}`}
                      />
                    </div>
                  ) : null}

                  {event.link && (
                    <div className="mt-4">
                      <a
                        href={event.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-neutral-900 hover:text-neutral-600 lowercase transition-colors timeline-link"
                      >
                        {event.link.text} <span className="ml-1">→</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
