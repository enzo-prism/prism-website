"use client"

import { ArrowRight, ArrowUpRight, ChevronDown, Youtube } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Eyebrow, Section } from "@/components/prism/section"
import { Button } from "@/components/ui/button"
import { PODCAST_EPISODES } from "@/content/podcast/episodes"
import { cn } from "@/lib/utils"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"

const PLATFORM_LINKS = [
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/the-prism-pod/id1745660200",
    tracking: "apple podcasts",
    external: true,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/1VvDo110AVVbOYdgZgzoKb?si=a41c116896ff4f80",
    tracking: "spotify",
    external: true,
  },
  {
    label: "Suggest a guest",
    href: "mailto:support@design-prism.com",
    tracking: "suggest guest",
    external: false,
  },
  {
    label: "Follow on X",
    href: "https://x.com/nosisthegod",
    tracking: "twitter",
    external: true,
  },
] as const

export default function PodcastClientPage() {
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null)

  const episodes = PODCAST_EPISODES

  const toggleEpisode = (episodeNumber: string) => {
    setExpandedEpisode(expandedEpisode === episodeNumber ? null : episodeNumber)
  }

  return (
    <Section aria-labelledby="podcast-episodes-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Every episode</Eyebrow>
          <h2
            id="podcast-episodes-title"
            className="text-title text-gradient mt-5 max-w-[12ch] text-balance pb-1"
          >
            all episodes.
          </h2>
          <p className="text-lead mt-5 max-w-[40ch] text-pretty text-muted-foreground">
            Tap any episode to see the takeaways and watch.
          </p>
          <div className="mt-8">
            <p className="text-eyebrow text-subtle">Also on</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => trackCTAClick(link.tracking, "podcast page")}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {link.label}
                    {link.external ? (
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="border-t border-white/[0.08]">
          {episodes.map((episode) => {
            const isOpen = expandedEpisode === episode.number
            const panelId = `podcast-episode-${episode.number}-panel`
            return (
              <li
                key={episode.number}
                id={`episode-${episode.number}`}
                className="border-b border-white/[0.08]"
              >
                <h3 className="text-base">
                  <button
                    type="button"
                    onClick={() => toggleEpisode(episode.number)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex min-h-16 w-full items-center gap-4 py-5 text-left transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-xs tabular-nums text-muted-foreground">
                      {episode.number}
                    </span>
                    <span className="min-w-0 flex-1 text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">
                      {episode.guest}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 text-subtle transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>

                {isOpen ? (
                  <div id={panelId} className="pb-6 pl-14">
                    <p className="text-eyebrow text-subtle">Key takeaways</p>
                    <ul className="mt-3 space-y-2">
                      {episode.takeaways.map((takeaway, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-[0.95rem] leading-6 text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1 shrink-0 rounded-full bg-white/40"
                          />
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <a
                          href={episode.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackCTAClick(`watch episode ${episode.number}`, "podcast page")
                          }
                        >
                          <Youtube aria-hidden="true" />
                          Watch episode {episode.number}
                        </a>
                      </Button>
                      {episode.number === "05" ? (
                        <Button asChild variant="outline">
                          <Link
                            href="/podcast/michael-njo"
                            onClick={() =>
                              trackNavigation(
                                "podcast_michael_njo_profile",
                                "/podcast/michael-njo",
                              )
                            }
                          >
                            Read Dr. Michael Njo&apos;s story
                            <ArrowRight aria-hidden="true" />
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
