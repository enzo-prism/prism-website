import SeoTextSection from "@/components/seo-text-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { PODCAST_EPISODES } from "@/content/podcast/episodes"
import type { Metadata } from "next"
import PodcastClientPage from "./client-page"
import { PodcastEpisodeSchema, PodcastSeriesSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "prism podcast | founders · journeys · lessons",
  description: "each episode, founder enzo sison sits down with builders in the arena to unpack wins, missteps, and frameworks you can apply to your business.",
  path: "/podcast",
  ogImage: "/prism-opengraph.png",
})

export default function PodcastPage() {
  const seriesId = "prism-podcast"

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section id="static-podcast-hero" className="bg-neutral-900 text-white">
          <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16 text-center">
            <h1 className="text-4xl font-semibold tracking-tight">prism podcast</h1>
            <p className="text-lg leading-relaxed text-white/80">
              join founder enzo sison as he speaks with dentists, operators, and creative leaders who are actively scaling. expect honest stories, practical frameworks, and questions that uncover the moves behind their momentum.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <a
                href="https://www.youtube.com/@the_design_prism"
                className="rounded-full bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-white/80"
              >
                watch on youtube
              </a>
              <a
                href="https://podcasts.apple.com/us/podcast/the-prism-pod/id1745660200"
                className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                listen on apple podcasts
              </a>
            </div>
          </div>
        </section>
        <section id="static-podcast-preview" className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">recent episodes</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {PODCAST_EPISODES.slice(0, 4).map((episode) => (
                <li key={episode.number} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <a href={episode.youtubeUrl} className="space-y-2" target="_blank" rel="noopener noreferrer">
                    <span className="block text-xs uppercase tracking-[0.24em] text-neutral-400">episode {episode.number}</span>
                    <span className="block text-lg font-semibold leading-snug text-neutral-900">{episode.guest}</span>
                    <span className="block text-sm text-neutral-600">
                      {episode.takeaways.join(" · ")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <noscript>
          <section className="px-6 py-12">
            <div className="mx-auto max-w-4xl space-y-4 text-neutral-900">
              <h2 className="text-2xl font-semibold tracking-tight">listen without javascript</h2>
              <p>
                prism podcast spotlights the lessons behind real growth stories. browse a few episodes below,
                then subscribe on your preferred platform.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {PODCAST_EPISODES.slice(0, 4).map((episode) => (
                  <li key={`noscript-${episode.number}`}>
                    <a href={episode.youtubeUrl} className="underline">
                      episode {episode.number}: {episode.guest}
                    </a>{" "}
                    — {episode.takeaways.join(" · ")}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </noscript>
        <PodcastClientPage />
        <SeoTextSection title="about the prism podcast">
          <p>
            candid conversations with founders and operators about what actually works—pricing, hiring,
            positioning, and growth. zero fluff, actionable lessons you can apply to your team this week.
          </p>
        </SeoTextSection>
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
