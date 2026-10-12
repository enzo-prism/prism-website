import { ArrowUpRight, Podcast, Youtube } from "lucide-react"

import SeoTextSection from "@/components/seo-text-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { FinalCta } from "@/components/prism/final-cta"
import { Eyebrow, Section } from "@/components/prism/section"
import { Button } from "@/components/ui/button"
import { PODCAST_EPISODES } from "@/content/podcast/episodes"
import type { Metadata } from "next"
import PodcastClientPage from "./client-page"
import { PodcastEpisodeSchema, PodcastSeriesSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Growth podcast for founders & operators',
  description: 'Founder Enzo Sison interviews builders, operators, and dentists about growth, systems, and the real decisions behind lasting momentum.',
  path: "/podcast",
  ogImage: "/prism-opengraph.png",
})

export default function PodcastPage() {
  const seriesId = "prism-podcast"
  const recentEpisodes = PODCAST_EPISODES.slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section
          id="static-podcast-hero"
          aria-labelledby="podcast-hero-title"
          className="relative isolate overflow-x-clip pb-14 pt-12 sm:pb-20 sm:pt-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-x-0 top-0 h-[640px] opacity-50" />
            <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(40%_50%_at_30%_40%,oklch(0.66_0.21_29/16%),transparent_70%),radial-gradient(36%_46%_at_70%_44%,oklch(0.63_0.19_295/16%),transparent_70%)] blur-2xl" />
            <div className="bg-noise absolute inset-0 opacity-[0.05]" />
          </div>
          <div className="prism-container">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <Eyebrow>Podcast</Eyebrow>
              <h1
                id="podcast-hero-title"
                className="text-display text-gradient mt-5 max-w-[14ch] text-balance pb-2"
              >
                the Prism podcast.
              </h1>
              <p className="text-lead mt-6 max-w-[56ch] text-pretty text-muted-foreground">
                Join founder Enzo Sison as he speaks with dentists, operators, and creative leaders who are actively scaling. Expect honest stories, practical frameworks, and questions that uncover the moves behind their momentum.
              </p>
              <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Button asChild size="xl">
                  <a
                    href="https://www.youtube.com/@the_design_prism"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube aria-hidden="true" />
                    Watch on YouTube
                  </a>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <a
                    href="https://podcasts.apple.com/us/podcast/the-prism-pod/id1745660200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Podcast aria-hidden="true" />
                    Listen on Apple Podcasts
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Section id="static-podcast-preview" aria-labelledby="podcast-recent-title" className="pt-0 sm:pt-0">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Recent episodes</Eyebrow>
              <h2 id="podcast-recent-title" className="text-heading mt-4 text-foreground">
                fresh conversations.
              </h2>
            </div>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentEpisodes.map((episode) => (
              <li key={episode.number}>
                <a
                  href={episode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/episode flex h-full flex-col rounded-2xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] tabular-nums tracking-[0.14em] text-subtle">
                      EP {episode.number}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-subtle transition-[transform,color] duration-200 group-hover/episode:-translate-y-0.5 group-hover/episode:translate-x-0.5 group-hover/episode:text-foreground"
                    />
                  </span>
                  <span className="mt-6 block text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-foreground">
                    {episode.guest}
                  </span>
                  <span className="mt-2 block text-pretty text-sm leading-6 text-muted-foreground">
                    {episode.takeaways.join(" · ")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <noscript>
          <section className="prism-container py-12">
            <div className="max-w-3xl space-y-4 text-muted-foreground">
              <h2 className="text-heading text-foreground">listen without javascript.</h2>
              <p>
                Prism podcast spotlights the lessons behind real growth stories. Browse a few episodes below,
                then subscribe on your preferred platform.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {recentEpisodes.map((episode) => (
                  <li key={`noscript-${episode.number}`}>
                    <a href={episode.youtubeUrl} className="text-foreground underline underline-offset-4">
                      episode {episode.number}: {episode.guest}
                    </a>.{" "}
                    {episode.takeaways.join(" · ")}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </noscript>
        <PodcastClientPage />
        <SeoTextSection title="about the prism podcast">
          <p>
            Candid conversations with founders and operators about what actually works: pricing, hiring,
            positioning, and growth. Zero fluff, actionable lessons you can apply to your team this week.
          </p>
        </SeoTextSection>
        <FinalCta location="podcast final cta" secondary={{ label: "See the work", href: "/case-studies" }} />
      </main>
      <Footer />
      <PodcastSeriesSchema
        seriesId={seriesId}
        name="Prism Podcast"
        description="Interviews with dentists, operators, and creative leaders about building trustworthy local brands."
        url="https://www.design-prism.com/podcast"
        image="https://www.design-prism.com/prism-opengraph.png"
        sameAs={[
          "https://www.youtube.com/@the_design_prism",
          "https://podcasts.apple.com/us/podcast/the-prism-pod/id1745660200",
          "https://open.spotify.com/show/1VvDo110AVVbOYdgZgzoKb?si=a41c116896ff4f80",
        ]}
      />
      {PODCAST_EPISODES.map((episode) => {
        const videoId = extractYouTubeId(episode.youtubeUrl)
        return (
          <PodcastEpisodeSchema
            key={episode.number}
            episodeId={`prism-podcast-${episode.number}`}
            seriesId={seriesId}
            name={`Episode ${episode.number}: ${episode.guest}`}
            description={episode.takeaways.join(" · ")}
            url={`https://www.design-prism.com/podcast#episode-${episode.number}`}
            videoEmbedUrl={videoId ? `https://www.youtube.com/embed/${videoId}` : undefined}
            videoContentUrl={episode.youtubeUrl}
            thumbnailUrl={videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined}
            datePublished={episode.publishedAt}
          />
        )
      })}
    </div>
  )
}

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "")
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v") || undefined
    }
    return parsed.pathname.split("/").pop()
  } catch {
    return undefined
  }
}
