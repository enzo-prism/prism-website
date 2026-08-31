import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import TrackedAnchor from '@/components/tracked-anchor'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function CareersClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
            <div className="flex justify-center" aria-hidden="true">
              <PixelishIcon
                src="/pixelish/briefcase.svg"
                alt=""
                size={40}
                invert={false}
                aria-hidden="true"
              />
            </div>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
              careers at prism
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
              no open roles right now
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-neutral-600 lowercase md:text-xl">
              we are not accepting applications for a specific position today.
              when a role opens, the current details and application path will
              appear on this page.
            </p>
          </div>
        </section>

        <section className="bg-neutral-50 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
              check back for current openings
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-600 lowercase">
              this page is the source of truth for prism hiring. archived job
              pages now return here instead of presenting an expired
              application.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className="rounded-full px-8 py-4 lowercase">
                <TrackedLink href="/" label="back to home" location="careers">
                  back to home
                </TrackedLink>
              </Button>
              <TrackedAnchor
                href="mailto:support@design-prism.com"
                label="email prism support"
                location="careers"
                className="inline-flex items-center text-sm font-medium text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
              >
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                existing inquiry?
              </TrackedAnchor>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
