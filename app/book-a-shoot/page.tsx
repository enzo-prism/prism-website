import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import BookAShootForm from "./BookAShootForm"

const PAGE_TITLE = 'Book dental photography'
const PAGE_DESCRIPTION =
  'Choose a time for Prism to capture office and team photos for your dental website, ads, and local listings.'
const CANONICAL_URL = "https://www.design-prism.com/book-a-shoot"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/book-a-shoot",
  ogImage: "/prism-opengraph.png",
})

export default function BookAShootPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-neutral-50 px-4 py-12 sm:py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">book a shoot</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-neutral-900">pick two windows and we&apos;ll lock it in.</h1>
            <p className="mt-4 text-base text-neutral-600">
              share your email plus two one-hour windows that work for the shoot. our team replies with a confirmation and prep checklist.
            </p>
            <div className="mt-6 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              <Link href="/dental-photography" className="hover:text-neutral-900">
                overview
              </Link>
              <span className="text-neutral-200">―――</span>
              <Link href="/dental-photography/office-team" className="hover:text-neutral-900">
                office + team (bookable)
              </Link>
              <span className="text-neutral-200">―――</span>
              <Link href="/dental-photography/before-after" className="hover:text-neutral-900">
                before + after guide
              </Link>
            </div>
          </div>
        </section>

        {/* What to expect section */}
        <section className="px-4 py-12 bg-white">
          <div className="container mx-auto max-w-3xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-4">
                <div className="mb-2 flex justify-center" aria-hidden="true">
                  <PixelishIcon src="/pixelish/device-camera.svg" alt="" size={26} invert={false} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Professional Equipment</h3>
                <p className="text-sm text-neutral-600">High-quality cameras and lighting for stunning results</p>
              </div>
              <div className="text-center p-4">
                <div className="mb-2 flex justify-center" aria-hidden="true">
                  <PixelishIcon src="/pixelish/device-stop-clock.svg" alt="" size={26} invert={false} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">One Hour Session</h3>
                <p className="text-sm text-neutral-600">Efficient shoots that capture everything you need</p>
              </div>
              <div className="text-center p-4">
                <div className="mb-2 flex justify-center" aria-hidden="true">
                  <PixelishIcon src="/pixelish/browser.svg" alt="" size={26} invert={false} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Edited Deliverables</h3>
                <p className="text-sm text-neutral-600">Professionally edited photos delivered within a week</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6 text-center">Schedule Your Photography Session</h2>
              <BookAShootForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
