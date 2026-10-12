import { Play, Quote as QuoteIcon } from 'lucide-react'

import type {
  CaseStudyQuotes,
  CaseStudyVideo,
} from '@/components/case-studies/case-study-proof'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section } from '@/components/prism/section'
import { VideoDialog } from '@/components/prism/video-dialog'

type CaseStudyVoiceProps = {
  slug: string
  clientName: string
  video?: CaseStudyVideo
  quotes?: CaseStudyQuotes
}

function initials(name: string) {
  const words = name.replace(/^(Dr|Mr|Mrs|Ms)\.\s+/, '').split(/\s+/)
  return words.length > 1
    ? `${words[0][0]}${words[words.length - 1][0]}`
    : (words[0]?.[0] ?? '')
}

/**
 * The human moment on a case study page, right after the stats band: a
 * verified client video (poster card that opens the YouTube player in a
 * dialog; nothing loads from YouTube until the click) and/or a verified
 * named client quote. Renders nothing when neither exists.
 */
export default function CaseStudyVoice({
  slug,
  clientName,
  video,
  quotes,
}: CaseStudyVoiceProps) {
  if (!video && !quotes) return null

  return (
    <>
      {video ? (
        <Section
          aria-labelledby="case-study-video-title"
          className="pb-4 pt-16 sm:pb-6 sm:pt-24"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>{video.eyebrow}</Eyebrow>
              <h2
                id="case-study-video-title"
                className="text-title text-gradient mt-5 max-w-[14ch] text-balance pb-1"
              >
                {video.heading}
              </h2>
              <p className="text-lead mt-5 max-w-[44ch] text-pretty text-muted-foreground">
                {video.summary}
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-subtle">
                <span>{video.kind}</span>
                <span aria-hidden="true" className="size-0.5 rounded-full bg-current" />
                <span>{video.duration}</span>
                <span aria-hidden="true" className="size-0.5 rounded-full bg-current" />
                <span>{video.source}</span>
              </p>
            </Reveal>

            <Reveal delay={120} className="relative lg:col-span-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-[8%] -bottom-8 top-[25%] -z-10 bg-[radial-gradient(45%_60%_at_25%_70%,oklch(0.66_0.21_29/16%),transparent_70%),radial-gradient(45%_60%_at_75%_70%,oklch(0.66_0.16_258/22%),transparent_70%)] blur-3xl"
              />
              <VideoDialog
                youtubeId={video.youtubeId}
                title={video.title}
                description={`${video.title}. ${video.kind}, ${video.duration}, ${video.source}.`}
                location={`${slug} case study video`}
                triggerClassName="block h-auto w-full rounded-[1.25rem] text-left text-foreground hover:text-foreground sm:rounded-[2rem]"
              >
                <span className="sr-only">Play video: </span>
                <span className="relative block aspect-video overflow-hidden rounded-[1.25rem] border border-white/10 bg-card shadow-[0_40px_80px_-40px_oklch(0_0_0/90%)] transition-[border-color,transform] duration-500 ease-out group-hover/play:-translate-y-0.5 group-hover/play:border-white/25 sm:rounded-[2rem]">
                  {/* YouTube posters stay a plain img: i.ytimg.com is not an
                      optimized image host, and the frame is already sized. */}
                  <img
                    src={video.poster}
                    alt=""
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/play:scale-[1.02]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.1_0_0/88%)_0%,oklch(0.1_0_0/35%)_38%,transparent_65%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_0_10px_oklch(1_0_0/12%),0_20px_50px_-10px_oklch(0_0_0/70%)] transition-transform duration-300 ease-out group-hover/play:scale-105 sm:size-20"
                  >
                    <Play className="size-6 translate-x-0.5 fill-current sm:size-7" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-4 p-8 sm:flex">
                    <span className="min-w-0">
                      <span className="block text-2xl font-semibold leading-tight tracking-[-0.02em] text-white">
                        {video.title}
                      </span>
                      <span className="mt-1.5 block text-[13px] text-white/70">
                        {clientName}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] tabular-nums text-white/80 backdrop-blur-md">
                      {video.duration}
                    </span>
                  </span>
                </span>
                {/* Small screens: the caption sits under the frame so it never
                    covers the speaker. */}
                <span className="mt-4 flex items-baseline justify-between gap-3 px-1 sm:hidden">
                  <span className="text-base font-semibold tracking-[-0.02em] text-foreground">
                    {video.title}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-subtle">
                    {video.duration}
                  </span>
                </span>
              </VideoDialog>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {quotes ? (
        <Section
          aria-label={`${quotes.speaker.name} on the work`}
          className="pb-4 pt-16 sm:pb-6 sm:pt-24"
        >
          <Reveal>
            <figure className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
              <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/16%),transparent)] blur-2xl"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-[12%] bottom-0 -z-10 h-px bg-spectrum opacity-60"
              />

              <div className="flex items-center justify-between gap-4">
                <Eyebrow>In their words</Eyebrow>
                <QuoteIcon aria-hidden="true" className="size-7 text-subtle sm:size-8" />
              </div>

              <blockquote className="mt-8 sm:mt-10">
                <p className="text-gradient max-w-[24ch] text-balance pb-1 text-[clamp(1.85rem,1.2rem+2.6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
                  &ldquo;{quotes.quotes[0].text}&rdquo;
                </p>
              </blockquote>

              <div className="mt-10 flex flex-col gap-8 sm:mt-12 lg:flex-row lg:items-end lg:justify-between">
                <figcaption className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/[0.05] font-mono text-sm text-foreground"
                  >
                    {initials(quotes.speaker.name)}
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-foreground">
                      {quotes.speaker.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {quotes.speaker.role}
                    </span>
                  </span>
                </figcaption>

                {quotes.quotes.length > 1 ? (
                  <div className="flex flex-col gap-2 border-l border-white/10 pl-5 lg:max-w-[22rem]">
                    {quotes.quotes.slice(1, 3).map((quote) => (
                      <blockquote key={quote.id}>
                        <p className="text-pretty text-[15px] leading-6 text-muted-foreground">
                          &ldquo;{quote.text}&rdquo;
                        </p>
                      </blockquote>
                    ))}
                  </div>
                ) : null}
              </div>
            </figure>
          </Reveal>
        </Section>
      ) : null}
    </>
  )
}
