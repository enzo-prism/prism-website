"use client"

import Footer from "@/components/footer"
import GetStartedCTA from "@/components/GetStartedCTA"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"
import { ChevronDown, ChevronUp, Youtube } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export default function PodcastClientPage() {
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null)

  const episodes = [
    {
      number: "01",
      guest: "Dr. Ahmed Mataria",
      youtubeUrl: "https://youtu.be/WIWxwdZflzo",
      takeaways: [
        "From single chair to multi-location",
        "Pricing service-based work with confidence",
        "Building a culture patients feel"
      ]
    },
    {
      number: "02",
      guest: "Ludmila (dental office manager)",
      youtubeUrl: "https://youtu.be/5eB4Y27zkE8",
      takeaways: [
        "Turning passion projects into revenue",
        "Operating as a team of one",
        "Leveraging community for early traction"
      ]
    },
    {
      number: "03",
      guest: "Melissa (dental office front desk)",
      youtubeUrl: "https://youtu.be/jE6YAimUxMQ",
      takeaways: [
        "Scaling customer experience without losing heart",
        "Hiring before you feel \"ready\"",
        "Systems that free the founder's time"
      ]
    },
    {
      number: "04",
      guest: "Dr. Arash Abolfazlian",
      youtubeUrl: "https://youtu.be/zL4Ax2bs9pU",
      takeaways: [
        "Switching careers and industries",
        "Financing a first practice purchase",
        "Marketing specialist services in crowded markets"
      ]
    },
    {
      number: "05",
      guest: "Dr. Michael Njo",
      youtubeUrl: "https://youtu.be/0SS1C5d3m1w",
      takeaways: [
        "Buying vs. building a practice",
        "Doubling revenue in 12 months",
        "Tech that actually improves chair-time efficiency"
      ]
    },
    {
      number: "06",
      guest: "Dr. Katie Lee",
      youtubeUrl: "https://youtu.be/FxuzACT-o2Q",
      takeaways: [
        "Brand-building on TikTok & IG",
        "From side-hustle to full clinic",
        "Crafting an unforgettable patient journey"
      ]
    },
    {
      number: "07",
      guest: "Dr. Chris Wong",
      youtubeUrl: "https://youtu.be/HrksJeYb02Q",
      takeaways: [
        "M&A: buying a legacy practice",
        "Modernizing ops without scaring staff",
        "Data-driven decisions on new services"
      ]
    },
    {
      number: "08",
      guest: "Wil Gilmore",
      youtubeUrl: "https://youtu.be/UDYw11mQe-c",
      takeaways: [
        "Nailing product–market fit in a niche",
        "Fund-raise vs. bootstrap math",
        "Selling \"boring\" products with story"
      ]
    },
    {
      number: "09",
      guest: "Dr. Teagan Willes",
      youtubeUrl: "https://youtu.be/wCQrUajsnk8",
      takeaways: [
        "Differentiating in a luxury market",
        "Designing spaces that sell themselves",
        "Balancing artistry and profitability"
      ]
    }
  ]

  const toggleEpisode = (episodeNumber: string) => {
    setExpandedEpisode(expandedEpisode === episodeNumber ? null : episodeNumber)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Prism Podcast" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl">🎙️</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  prism podcast
                </h1>
                <h2 className="text-2xl font-medium text-neutral-500 lowercase sm:text-3xl">
                  founders · journeys · lessons
                </h2>
                <p className="mx-auto mt-6 max-w-[600px] text-neutral-600 lowercase md:text-xl leading-relaxed">
                  <strong>enzo sison</strong> sits down with builders in the arena—unpacking wins, wrong turns, and frameworks for your business.
                </p>
              </div>
              <div className="pt-6">
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://www.youtube.com/@the_design_prism"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("subscribe youtube", "podcast page")}
                  >
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg lowercase shadow-lg"
                    >
                      <Youtube className="mr-3 h-6 w-6" />
                      watch on youtube
                    </Button>
                  </a>
                  <a
                    href="https://podcasts.apple.com/us/podcast/the-prism-pod/id1745660200"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("apple podcasts", "podcast page")}
                  >
                    <Button
                      size="lg"
                      className="bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-full px-8 py-6 text-lg lowercase shadow-lg"
                    >
                      <img src="/icons/applepodcasts.svg" alt="Apple Podcasts" className="mr-3 h-6 w-6" />
                      listen on apple
                    </Button>
                  </a>
                  <a
                    href="https://open.spotify.com/show/1VvDo110AVVbOYdgZgzoKb?si=a41c116896ff4f80"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("spotify", "podcast page")}
                  >
                    <Button
                      size="lg"
                      className="bg-[#1db954] hover:bg-[#169c46] text-white rounded-full px-8 py-6 text-lg lowercase shadow-lg"
                    >
                      <img src="/icons/spotify.svg" alt="Spotify" className="mr-3 h-6 w-6" />
                      listen on spotify
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes Section */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                episodes
              </h2>
              <p className="mx-auto mt-4 text-neutral-600 lowercase">
                tap any episode to see takeaways and watch
              </p>
            </div>

            <div className="space-y-4">
              {episodes.map((episode) => (
                <div key={episode.number} className="bg-white rounded-xl border border-neutral-200 shadow-sm">
                  <button
                    onClick={() => toggleEpisode(episode.number)}
                    className="w-full p-6 text-left hover:bg-neutral-50 transition-colors rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="bg-neutral-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {episode.number}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold lowercase text-neutral-800">
                            {episode.guest}
                          </h3>
                        </div>
                      </div>
                      {expandedEpisode === episode.number ? (
                        <ChevronUp className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  {expandedEpisode === episode.number && (
                    <div className="px-6 pb-6 border-t border-neutral-100">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-700 lowercase mb-3">
                            key takeaways:
                          </h4>
                          <ul className="space-y-2">
                            {episode.takeaways.map((takeaway, index) => (
                              <li key={index} className="text-sm text-neutral-600 lowercase flex items-start">
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                {takeaway}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <a
                          href={episode.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackCTAClick(`watch episode ${episode.number}`, "podcast page")}
                        >
                          <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-4 lowercase"
                          >
                            <Youtube className="mr-2 h-4 w-4" />
                            watch episode {episode.number}
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <GetStartedCTA
          heading="inspired by these success stories?"
          description="let's write yours next. from idea to execution, we'll help you build something remarkable."
          buttonText="start your journey"
          analyticsLabel="podcast inspiration CTA"
          variant="light"
        />

        {/* Simple Footer Links */}
        <section className="px-4 py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <div className="space-y-6">
              <p className="text-neutral-600 lowercase text-sm">
                listen on other platforms:
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="https://podcasts.apple.com/us/podcast/the-prism-pod/id1745660200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
                  onClick={() => trackCTAClick("apple podcasts", "podcast page")}
                >
                  apple podcasts
                </a>
                <a
                  href="https://open.spotify.com/show/1VvDo110AVVbOYdgZgzoKb?si=a41c116896ff4f80"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
                  onClick={() => trackCTAClick("spotify", "podcast page")}
                >
                  spotify
                </a>
                <a
                  href="mailto:podcast@design-prism.com"
                  className="text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
                  onClick={() => trackCTAClick("suggest guest", "podcast page")}
                >
                  suggest a guest
                </a>
                <a
                  href="https://x.com/nosisthegod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
                  onClick={() => trackCTAClick("twitter", "podcast page")}
                >
                  follow on x
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="px-4 py-8">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
              onClick={() => trackNavigation("podcast_back_home", "/")}
            >
              ← back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}