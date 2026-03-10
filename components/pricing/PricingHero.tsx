import Link from "next/link"

const primaryLinkClassName =
  "inline-flex items-center justify-center rounded-full border border-foreground px-5 py-3 text-sm font-medium text-background bg-foreground transition hover:bg-foreground/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const secondaryLinkClassName =
  "inline-flex items-center justify-center rounded-full border border-border/70 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-white/[0.04] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export default function PricingHero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="text-sm font-medium text-muted-foreground">Pricing</p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-sans font-medium !tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Simple pricing for teams that want a clearer growth path.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Website Overhaul is $1,000 one-time. Growth Partnership is $2,000 per month. If you want guidance before
          choosing, start with the free expert audit.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="#plans" className={primaryLinkClassName}>
            See plans
          </Link>
          <Link href="/get-started#book-call" className={secondaryLinkClassName}>
            Book a strategy call
          </Link>
        </div>
      </div>
    </section>
  )
}
