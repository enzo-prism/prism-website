import { ArrowLeft, Briefcase, Mail } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Eyebrow, Section } from '@/components/prism/section'
import TrackedAnchor from '@/components/tracked-anchor'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'

export default function CareersClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section
          aria-labelledby="careers-title"
          className="relative isolate overflow-x-clip pb-16 pt-16 sm:pb-24 sm:pt-24"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-x-0 top-0 h-[600px] opacity-50" />
            <div className="absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(40%_50%_at_35%_40%,oklch(0.66_0.16_258/16%),transparent_70%),radial-gradient(36%_46%_at_68%_44%,oklch(0.63_0.19_295/12%),transparent_70%)] blur-2xl" />
          </div>
          <div className="prism-container flex flex-col items-center text-center">
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-foreground"
            >
              <Briefcase className="size-5" strokeWidth={1.75} />
            </span>
            <Eyebrow className="mt-8">Careers at Prism</Eyebrow>
            <h1
              id="careers-title"
              className="text-display text-gradient mt-5 max-w-[14ch] text-balance pb-2"
            >
              no open roles right now.
            </h1>
            <p className="text-lead mt-6 max-w-[52ch] text-pretty text-muted-foreground">
              We are not accepting applications for a specific position today.
              When a role opens, the current details and application path will
              appear on this page.
            </p>
          </div>
        </section>

        <Section aria-labelledby="careers-check-back-title" className="pt-0 sm:pt-0">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2
              id="careers-check-back-title"
              className="text-heading text-foreground"
            >
              check back for current openings.
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-[1rem] leading-7 text-muted-foreground">
              This page is the source of truth for Prism hiring. Archived job
              pages now return here instead of presenting an expired
              application.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <TrackedLink href="/" label="back to home" location="careers">
                  <ArrowLeft aria-hidden="true" />
                  Back to home
                </TrackedLink>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <TrackedAnchor
                  href="mailto:support@design-prism.com"
                  label="email prism support"
                  location="careers"
                >
                  <Mail aria-hidden="true" />
                  Existing inquiry?
                </TrackedAnchor>
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
