import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Award, Calendar, Camera, Layers3, MapPin, Megaphone, Share2, Sparkles, Users } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const proofPoints = [
  {
    title: "clinical storytelling that converts",
    description:
      "macro shots, operatory scenes, and lifestyle portraits that make premium care tangible for patients comparing options."
  },
  {
    title: "before-and-after clarity",
    description: "standardized angles and lighting so smile galleries, case studies, and landing pages feel trustworthy."
  },
  {
    title: "consistent brand system",
    description:
      "shot lists matched to your color palette, typography, and tone so every touchpoint from website to signage aligns."
  },
  {
    title: "assets built for every file format",
    description:
      "horizontal hero loops, square social cuts, and vertical shorts ready for ads, reels, stories, and listing galleries."
  }
]

const channelCards = [
  {
    title: "websites that feel alive",
    description:
      "hero videos, provider bios, treatment pages, and smile galleries swap stock for authentic footage that boosts time-on-site.",
    icon: <Sparkles className="h-6 w-6" aria-hidden />
  },
  {
    title: "ads that stop the scroll",
    description: "paid social, youtube, and display ads use cinematic b-roll and patient stories that raise CTR and trust.",
    icon: <Megaphone className="h-6 w-6" aria-hidden />
  },
  {
    title: "local listings that win the map pack",
    description: "google, apple, and yelp profiles stay refreshed with seasonal shots, procedure close-ups, and team portraits.",
    icon: <MapPin className="h-6 w-6" aria-hidden />
  },
  {
    title: "social feeds with a point of view",
    description: "reels, carousels, and behind-the-scenes snippets feed your content calendar for months after the shoot.",
    icon: <Share2 className="h-6 w-6" aria-hidden />
  }
]

const processSteps = [
  {
    step: "01",
    title: "pre-production workshop",
    description:
      "treatment priorities, talent releases, wardrobe, shot lists, and editing references dialed in on a 45-minute call."
  },
  {
    step: "02",
    title: "on-site shoot day",
    description:
      "two-person team manages lighting, directing, and patient flow with minimal downtime for your clinicians."
  },
  {
    step: "03",
    title: "edit, retouch, deliver",
    description: "color grading, light retouching, and exports sized for web, ads, and print all delivered within 10 days."
  },
  {
    step: "04",
    title: "deployment across prism stack",
    description:
      "we wire final selects into website modules, ad templates, listing profiles, and scheduled social content."
  }
]

const shotTypes = [
  "provider portraits and team camaraderie",
  "patient journey b-roll from intake to post-op",
  "before / after macros with consistent lighting grids",
  "operatory tech, lab gear, and sterilization proof",
  "community involvement and office culture moments",
  "short-form video clips for reels, shorts, and ads"
]

const specialtyTracks = [
  {
    label: "culture & recruiting (bookable)",
    title: "office & team photography",
    description:
      "portraits, lobby, and candid team stories shot by prism. perfect for websites, ads, local listings, and hiring kits.",
    href: "/dental-photography/office-team",
    icon: <Users className="h-6 w-6" aria-hidden />
  },
  {
    label: "case acceptance (diy guide)",
    title: "before + after photography equipment guide",
    description:
      "a self-serve protocol any practice can run in-house to capture standardized before/after photos and clips for case presentations.",
    href: "/dental-photography/before-after",
    icon: <Award className="h-6 w-6" aria-hidden />
  }
]

const PAGE_TITLE = "dental photography that fuels every prism campaign | prism"
const PAGE_DESCRIPTION =
  "prism captures on-site dental photography and video that power websites, paid ads, local listings, and social media launches."
const CANONICAL_URL = "https://www.design-prism.com/dental-photography"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/dental-photography",
  ogImage: "/prism-opengraph.png",
})

export default function DentalPhotographyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden border-b border-neutral-200 text-white">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761853323/thumbnail_yscklx.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <video
              className="hero-loop-video pointer-events-none hidden h-full w-full object-cover sm:block"
              src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761852734/models_2_x9gxtj.mp4"
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              x-webkit-airplay="deny"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
              draggable={false}
              poster="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761853323/thumbnail_yscklx.webp"
              aria-hidden="true"
              data-hero-loop="true"
            />
            <div className="absolute inset-0 bg-neutral-950/80" aria-hidden />
          </div>
          <div className="container relative mx-auto px-4 py-24 md:py-28">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-neutral-200">
                dental photography
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                pro photos that make every prism deliverable hit harder.
              </h1>
              <p className="mt-6 max-w-2xl text-base text-neutral-200 md:text-lg">
                we shoot cinematic photos inside your practice so websites feel bespoke, ads look premium, local listings stay fresh, and social media never runs out of material.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline-inverted" size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                  <Link href="/dental-photography/office-team">
                    office + team photos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline-inverted" size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                  <Link href="/dental-photography/before-after">
                    patient before + after guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2">
              {specialtyTracks.map((track) => (
                <div key={track.title} className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-neutral-900/5 p-3 text-neutral-900">{track.icon}</div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-400">{track.label}</p>
                      <h3 className="text-xl font-semibold text-neutral-900">{track.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm text-neutral-600">{track.description}</p>
                  <Button asChild variant="outline" className="mt-6 w-full rounded-full border-neutral-200 px-6 py-3 text-base lowercase">
                    <Link href={track.href}>
                      {track.href === "/dental-photography/office-team" ? "view results" : "open the guide"}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                  {track.href === "/dental-photography/office-team" && (
                    <Button asChild variant="ghost" className="mt-3 w-full rounded-full px-6 py-3 text-sm lowercase text-neutral-900">
                      <Link href="/book-a-shoot">
                        ready to book?
                        <Calendar className="ml-2 h-4 w-4" aria-hidden />
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
              <div className="space-y-6">
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">why it matters</p>
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">photos that sell dentistry</h2>
                <p className="text-base leading-relaxed text-neutral-600">
                  patients judge the quality of your work before they ever call. our creative team directs real moments with your dentists, team, and patients so every pixel feels candid, modern, and clinically accurate.
                </p>
                <div className="space-y-4">
                  {proofPoints.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                      <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <Camera className="h-10 w-10 text-neutral-900" aria-hidden />
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-neutral-500">shot list staples</p>
                    <h3 className="text-xl font-semibold text-neutral-900">delivered from every shoot</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                  {shotTypes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Layers3 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-2xl bg-neutral-950 px-4 py-3 text-sm text-neutral-100">
                  ready-to-publish folders land in your drive plus a highlight reel for quick approvals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">plugged into prism</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">one shoot, four growth engines</h2>
              <p className="mt-4 text-base text-neutral-600">
                your photo library syncs straight into prism&apos;s website sprints, ad builds, local listing optimizations, and social calendars so every campaign launches faster and stays on-brand.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {channelCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-neutral-200 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-neutral-900/5 p-3 text-neutral-900">{card.icon}</div>
                    <h3 className="text-lg font-semibold text-neutral-900">{card.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-neutral-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-200 bg-white px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">ready when you are</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              pick the direction, we handle the shoot
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              whether you want prism on-site for office + team photography or you&apos;re following the before + after guide yourself, we make sure every asset lands where it needs to go.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                <Link href="/book-a-shoot">
                  book office + team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                <Link href="/dental-photography/before-after">
                  open the DIY guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
