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
        description="Follow a rider from the Fantic catalog to a request for a ride at the Tahoe shop they choose."
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
          <strong>Compare.</strong>
          <p className="mt-2 text-muted-foreground">
            Trail, enduro and urban models sit in one catalog with prices
            alongside the bikes.
          </p>
        </li>
        <li>
          <strong>Choose.</strong>
          <p className="mt-2 text-muted-foreground">
            Open a model to see the terrain and rider it suits, and what else to
            consider.
          </p>
        </li>
        <li>
          <strong>Ask the shop.</strong>
          <p className="mt-2 text-muted-foreground">
            Choose a location and open a prepared test-ride email. The rider and
            shop agree on a time directly.
          </p>
        </li>
      </ol>
      <p className="mt-6 max-w-prose text-muted-foreground">
        The visible result is a shorter path to the shop. A completed ride or
        sale would need separate confirmation from the shop.
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
