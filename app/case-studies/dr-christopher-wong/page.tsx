import type { Metadata } from "next"
import ChristopherWongCaseStudy from "./client-page"
import { CASE_STUDIES } from "@/lib/case-study-data"

const cs = CASE_STUDIES.find((cs) => cs.slug === "dr-christopher-wong")
const structured = cs?.structured

export const metadata: Metadata = {
  title: "case study: dr. wong - ai-powered dental m&a in palo alto",
  description: "how prism de-risked dr. chris wong's palo alto dental m&a with a new dental website, seo, ads, and an ai-native stack.",
  alternates: {
    canonical: "/case-studies/dr-christopher-wong",
  },
  openGraph: {
    title: "case study: dr. wong - ai-powered dental m&a in palo alto",
    description: "how prism de-risked dr. chris wong's palo alto dental m&a with a new dental website, seo, ads, and an ai-native stack.",
    images: [
      {
        url: structured?.heroImage ?? "/dr-wong-polaroids.png",
        width: 800,
        height: 450,
        alt: "polaroid photos of dr. christopher wong in his dental practice",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "case study: dr. wong - ai-powered dental m&a in palo alto",
    description: "how prism de-risked dr. chris wong's palo alto dental m&a with a new dental website, seo, ads, and an ai-native stack.",
    images: structured?.heroImage ?? "/dr-wong-polaroids.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ChristopherWongCaseStudyPage() {
  return (
    <>
      <section id="static-dr-wong-hero" className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            case study: dr. wong - de-risking a dental m&a in palo alto
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            prism helped dr. chris wong take over an established palo alto practice from dr. hamamoto, retain the patient base, and modernize the online experience with a new dental website, local seo, paid ads, and an ai-native development stack.
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>story-led hero video, photography, and brand system to introduce the new owner.</li>
            <li>rebuild from webflow to replit with ai cli workflows plus seo and local listings cleanup.</li>
            <li>google + meta ads powered by gemini optimizations and a tap-to-review system.</li>
          </ul>
        </div>
      </section>
      <noscript>
        <section className="px-6 py-12">
          <div className="mx-auto max-w-4xl space-y-4 text-neutral-900">
            <h2 className="text-2xl font-semibold tracking-tight">in brief: dr. wong&apos;s ai-powered transition</h2>
            <p>prism rebuilt the online and offline experience for dr. chris wong as he acquired dr. hamamoto&apos;s palo alto practice.</p>
            <p>the work included a new dental website, local seo cleanup, ai-assisted rebuilds on replit, story-driven video, and gemini-tuned google and meta ads - designed to retain existing patients and attract new ones.</p>
          </div>
        </section>
      </noscript>
      <ChristopherWongCaseStudy />
    </>
  )
}
