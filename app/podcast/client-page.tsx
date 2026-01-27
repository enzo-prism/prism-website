"use client"

import GetStartedCTA from "@/components/GetStartedCTA"
import { Button } from "@/components/ui/button"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"
import { ChevronDown, ChevronUp, Youtube } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { PODCAST_EPISODES } from "@/content/podcast/episodes"

export default function PodcastClientPage() {
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null)

  const episodes = PODCAST_EPISODES

  const toggleEpisode = (episodeNumber: string) => {
    setExpandedEpisode(expandedEpisode === episodeNumber ? null : episodeNumber)
  }

  return (
    <>
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
                      <span className="bg-neutral-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0">
                        {episode.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold lowercase text-neutral-800">
                          {episode.guest}
                        </h3>
                      </div>
                    </div>
                    {expandedEpisode === episode.number ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500 shrink-0" />
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
                              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-3 mt-2 shrink-0"></span>
                              {takeaway}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href={episode.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm:flex-1"
                          onClick={() => trackCTAClick(`watch episode ${episode.number}`, "podcast page")}
                        >
                          <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-4 lowercase"
                          >
                            <Youtube className="mr-2 h-4 w-4" />
                            watch episode {episode.number}
                          </Button>
                        </a>
                        {episode.number === "05" && (
                          <Button
                            asChild
                            className="w-full rounded-full border border-neutral-200 bg-white px-6 py-4 text-neutral-900 hover:bg-neutral-50 lowercase sm:flex-1"
                          >
                            <Link
                              href="/podcast/michael-njo"
                              onClick={() => trackNavigation("podcast_michael_njo_profile", "/podcast/michael-njo")}
                            >
                              read dr. michael njo's story
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GetStartedCTA
        heading="inspired by these success stories?"
        description="let's write yours next. from idea to execution, we'll help you build something remarkable."
        analyticsLabel="podcast inspiration CTA"
        variant="light"
      />

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
                href="mailto:support@design-prism.com"
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
    </>
  )
}
