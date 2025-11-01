import type { Metadata } from "next"
import ChristopherWongCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "dr. christopher wong case study | seamless transition",
  description:
    "how we helped a palo alto dental practice achieve 100% patient retention and sustainable growth through a multi-phase digital strategy.",
  alternates: {
    canonical: "/case-studies/dr-christopher-wong",
  },
  openGraph: {
    title: "dr. christopher wong case study | seamless transition",
    description:
      "how we helped a palo alto dental practice achieve 100% patient retention and sustainable growth through a multi-phase digital strategy.",
    images: [
      {
        url: "/dr-wong-polaroids.png",
        width: 800,
        height: 450,
        alt: "polaroid photos of dr. christopher wong in his dental practice",
      },
    ],
  },
}

export default function ChristopherWongCaseStudyPage() {
  return (
    <>
      <section id="static-dr-wong-hero" className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            dr. christopher wong case study: seamless practice transition
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            when dr. wong took ownership of a beloved palo alto practice, prism rebuilt the patient journey end-to-end. we refreshed the identity, launched a conversion-ready site, and activated nurture campaigns so existing families stayed while new patients found the practice fast.
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>• 100% patient retention through the first 90 days of transition.</li>
            <li>• 4x increase in appointment requests once the new scheduling funnel launched.</li>
            <li>• Automated post-visit review sequences to keep local search visibility climbing.</li>
          </ul>
        </div>
      </section>
      <noscript>
        <section className="px-6 py-12">
          <div className="mx-auto max-w-4xl space-y-4 text-neutral-900">
            <h2 className="text-2xl font-semibold tracking-tight">in brief: dr. wong&apos;s results</h2>
            <p>
              when dr. christopher wong acquired a long-standing palo alto dental practice, prism handled the brand refresh,
              website rebuild, and automations that preserved patient loyalty while attracting new appointments.
            </p>
            <p>
              the project delivered 100% patient retention during the handover, a fourfold increase in digital appointment
              requests, and automated review campaigns that lifted local search visibility week over week.
            </p>
          </div>
        </section>
      </noscript>
      <ChristopherWongCaseStudy />
    </>
  )
}
