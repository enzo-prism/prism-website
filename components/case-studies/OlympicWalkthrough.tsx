import Link from 'next/link'

import { Section, SectionHeader } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'

export default function OlympicWalkthrough() {
  return (
    <Section
      id="walkthrough"
      aria-labelledby="walkthrough-title"
      className="scroll-mt-16"
    >
      <SectionHeader
        id="walkthrough-title"
        eyebrow="The shopper’s view"
        title="from shortlist to test ride."
      />
      <video
        controls
        playsInline
        preload="none"
        poster="/case-studies/olympic-catalog.webp"
        width={1280}
        height={800}
        aria-label="Olympic Bootworks catalog and test-ride walkthrough"
        className="mt-8 w-full rounded-3xl border border-border bg-card"
      >
        {/* Phones get a 720px encode (about a quarter of the bytes). */}
        <source
          src="/case-studies/olympic-walkthrough-720.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src="/case-studies/olympic-walkthrough.mp4" type="video/mp4" />
        <track
          kind="captions"
          src="/case-studies/olympic-walkthrough.vtt"
          srcLang="en"
          label="English"
          default
        />
      </video>
      <ol className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
        <li>
          <strong>01 · Compare.</strong>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Trail, enduro, and urban models with live pricing.
          </p>
        </li>
        <li>
          <strong>02 · Choose.</strong>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Terrain fit and specs at a glance.
          </p>
        </li>
        <li>
          <strong>03 · Request a ride.</strong>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Pick a Tahoe shop and send a prepared test-ride request.
          </p>
        </li>
      </ol>
      <p className="mt-4 font-mono text-xs text-subtle">
        Live capability verified. Completed rides and sales require shop records.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <WaitlistButton
          href="/waitlist?intent=review"
          label="What would you fix on my site?"
          location="Olympic walkthrough"
        />
        <Link href="/website-design" className="underline underline-offset-4">
          Explore website design
        </Link>
      </div>
    </Section>
  )
}
