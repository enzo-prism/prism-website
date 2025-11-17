"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const logoConcepts = [
  {
    title: "Concept 01 · Sonoma horizon",
    description:
      "A calm horizon bar nods to the rolling vineyards surrounding the practice. The softened serif keeps the medical mark premium while the warm amber line hints at sedation comfort.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_horizontal_landscape_c_47d1ef8c-986b-4116-851a-a6b2d43ec68f_0_zhmoeq.png",
  },
  {
    title: "Concept 02 · Architectural monogram",
    description:
      "A single-line barn icon references the Anderson family’s agricultural roots. The negative space forms a canal path, reinforcing precision dentistry without literal tooth imagery.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat_vector_logo_icon_of_a_simple_barn_bfcfd0d7-719f-487d-a74f-74f1994212fb_1_vxgtxa.png",
  },
  {
    title: "Concept 03 · Elevated crest",
    description:
      "Stacked typography with a centered crest balances clinical trust and boutique hospitality. The geometric barn outline keeps things modern while the script accent nods to handoffs from referring dentists.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_icon_of_a_simple_barn__4115452d-3c6e-460e-ab12-33ea0b84a2e3_1_papyu5.png",
  },
  {
    title: "Concept 04 · Circular seal",
    description:
      "A seal-style badge with grape-leaf etching creates a keepsake moment for patient packets. The outer ring holds Sonoma copy while the inner icon spotlights the micro-endodontic tools.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_emblem_circular_badge__fd88e535-2f33-437a-b9bd-9e2a413b7d84_1_htuezo.png",
  },
]

export default function WineCountryRootCanalDesignReview() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <PageViewTracker title="Wine Country Root Canal Design Review" />
      <Navbar />
      <main className="flex-1">
        <section className="bg-white px-4 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">logo design board</p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">wine country root canal</h1>
                <p className="text-base text-neutral-600 sm:text-lg">
                  One board for every deliverable—site polish, patient packets, and referral assets—so Dr. Anderson can react fast.
                </p>
                <Link
                  href="/case-studies/wine-country-root-canal"
                  className="inline-flex items-center text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                >
                  view latest case study
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-900 shadow-2xl shadow-black/20">
                <Image
                  src="/Wine Country Root Canal.webp"
                  alt="Wine Country Root Canal web concepts"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">logo exploration</p>
              <h2 className="text-3xl font-semibold text-neutral-900">four angles on the mark</h2>
              <p className="text-base text-neutral-600 sm:text-lg">
                Each study keeps the tone premium, calm, and rooted in Sonoma—pick the direction that feels most like the practice.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {logoConcepts.map((concept) => (
                <div key={concept.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
                    <div className="relative aspect-[5/3] w-full">
                      <Image
                        src={concept.image}
                        alt={concept.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
                        className="object-contain p-6"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-neutral-900">{concept.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
