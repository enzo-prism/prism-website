"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Camera, CheckCircle2, ClipboardList, FileText, Lightbulb, ListChecks, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

type TierId = "entry" | "mid" | "premium"

interface ProductCard {
  title: string
  subtitle?: string
  price?: string
  description: string
  image?: string
  link?: {
    href: string
    label: string
  }
  bullets?: string[]
}

interface SetupStep {
  title: string
  description: string
}

interface WorkflowRole {
  role: string
  responsibility: string
}

interface ProtocolBlock {
  title: string
  instructions: string[]
  tips?: string[]
}

interface ChecklistGroup {
  title: string
  items: string[]
}

interface TierContent {
  label: string
  priceLevel: 1 | 2 | 3
  budget: string
  goal: string
  intro: string
  guideIncludes: string[]
  products: ProductCard[]
  setupSteps?: SetupStep[]
  workflow?: WorkflowRole[]
  protocol?: ProtocolBlock[]
  fileNaming?: {
    naming: string
    storage: string[]
  }
  consent?: string[]
  checklists?: ChecklistGroup[]
  outcomes?: string[]
  comingSoon?: boolean
}

const tiers: Record<TierId, TierContent> = {
  entry: {
    label: "Entry",
    priceLevel: 1,
    budget: "~$800 - $1,200",
    goal: "A repeatable photography workflow that produces clean, consistent before/after photos for marketing, case acceptance, and social media.",
    intro:
      "Here’s a clean, practical, entry-tier guide you can hand to any dental practice to get them taking consistent, high-quality before/after photos without overspending. This is built to be simple to implement, repeatable by the team, and aligned with what actually works inside real dental offices.",
    guideIncludes: [
      "Recommended entry-tier products",
      "Step-by-step setup instructions",
      "A full team workflow (who does what)",
      "A storage + naming structure",
      "A repeatable checklist for every case"
    ],
    products: [
      {
        title: "Lighting (most important)",
        subtitle: "Dental LED Photography Fill Light",
        price: "~$49.45",
        description:
          "Shadow-free lighting with adjustable brightness. Works for extraoral and intraoral photos, lightweight and consistent enough that anyone can use it.",
        image: "https://wholesale.azdentall.com/cdn/shop/products/10_e5816172-00e2-421e-bfd2-d2b0bd5edfc0.jpg?v=1689929865&width=600",
        link: {
          href: "https://wholesale.azdentall.com/products/dental-oral-photography-led-lamp-flash-light-with-three-foot-bracket",
          label: "wholesale.azdentall.com"
        },
        bullets: ["Place one or two lights in every capture corner.", "Set at head height, 2-3 feet from the patient."]
      },
      {
        title: "Camera setup - Option 1",
        subtitle: "Smartphone + 120mm Macro Lens",
        price: "$99.90",
        description:
          "Use the practice’s existing iPhone or Android and add a clip-on macro lens. Fast for staff, no complicated settings, and incredible close-ups with proper lighting.",
        image: "https://dentiphoto.com/cdn/shop/products/Sa1199fe5bd554b9e880e209f52153f7bN.jpg?v=1733984014&width=700",
        link: {
          href: "https://dentiphoto.com/products/120mm-macro-lens",
          label: "dentiphoto.com"
        },
        bullets: ["Clips onto any smartphone.", "Great for intraoral shots.", "Keep lens off for full-face photos."]
      },
      {
        title: "Camera setup - Option 2",
        subtitle: "Existing DSLR + Dental Accessories Bundle",
        price: "$229.95",
        description:
          "If a practice already owns a DSLR, pair it with a turnkey kit that covers retractors, mirrors, contrastors, LED attachments, and a carry case.",
        link: {
          href: "https://dentiphoto.com/products/dentiphoto-set-phototography",
          label: "dentiphoto.com"
        },
        bullets: ["Uses the body you already own.", "Adds every accessory needed for before/after sessions."]
      },
      {
        title: "Room setup essentials",
        description:
          "Simple environmental tweaks keep every session uniform without expensive build-outs. Neutral backdrops, floor markers, and optional ring lights go a long way.",
        bullets: [
          "Neutral backdrop (white or gray) - ~$20 from Amazon or a clean wall.",
          "Floor position markers - two pieces of tape for patient + camera spots.",
          "Optional ring light stand ($30-$50) for softer diffused lighting."
        ]
      }
    ],
    setupSteps: [
      { title: "Step 1 — Choose the location", description: "Pick a neutral wall with no backlighting and enough room for 5-6 feet of distance." },
      { title: "Step 2 — Install the backdrop", description: "Hang a wrinkle-free white or gray fabric/vinyl backdrop about 5-6 feet wide." },
      {
        title: "Step 3 — Set up lighting",
        description:
          "Place LED fill light at a 45° angle from the patient, head height, 2-3 feet away on medium brightness. Add a second light if you want zero shadows."
      },
      {
        title: "Step 4 — Mark the floor",
        description: "Use tape for patient foot placement and a second marker for the team. Consistency is what makes the comparisons pop."
      },
      {
        title: "Step 5 — Prepare smartphone + lens",
        description:
          "Attach the macro lens for intraoral shots, remove it for extraoral. Turn on grid lines, auto exposure, and capture at the highest resolution."
      }
    ],
    workflow: [
      { role: "Hygienist", responsibility: "Captures all before photos during the new patient exam." },
      { role: "Assistant", responsibility: "Captures all after photos during the final appointment." },
      { role: "Front desk / treatment coordinator", responsibility: "Uploads images to the shared drive and flags the best cases." },
      { role: "Doctor", responsibility: "Approves cases that can be used for marketing channels." }
    ],
    protocol: [
      {
        title: "Extraoral sequence (no macro lens)",
        instructions: ["Full face – neutral expression", "Full face – big smile", "Close-up smile", "45° left smile", "45° right smile"],
        tips: ["Patient stands on tape markers.", "Camera stays on the fixed spot.", "Shoulders relaxed, head straight."]
      },
      {
        title: "Intraoral sequence (macro lens + retractors)",
        instructions: ["Retracted frontal", "Left buccal", "Right buccal", "Upper arch occlusal", "Lower arch occlusal"],
        tips: ["Hit teeth evenly with lighting.", "Avoid fogging by having patients breathe through their nose.", "Focus sharply on incisors."]
      },
      {
        title: "After photos",
        instructions: ["Repeat every angle with identical lighting and positioning."],
        tips: ["Consistency sells the transformation.", "If same-day, let the patient rinse or refresh makeup before filming."]
      }
    ],
    fileNaming: {
      naming: "LastName_FirstName_Procedure_Date_BEFORE (and AFTER)",
      storage: ["Google Drive / Dropbox / SharePoint > Case Library > procedure folders such as Veneers, Invisalign, Whitening, Implants, Crowns, Composite Bonding."]
    },
    consent: [
      "Collect a one-time digital consent (PDF or Google Form) and store in the patient chart.",
      'Front desk tags the chart with "Marketing Photos Approved" so only cleared cases reach the Case Library.'
    ],
    checklists: [
      {
        title: "Clinical team daily checklist",
        items: [
          "Backdrop clean and wrinkle-free",
          "Lights on and set to the same brightness",
          "Phone lens cleaned",
          "Macro lens attached for intraoral shots",
          "Retraction tools sterilized",
          "Follow the photo sequence exactly"
        ]
      },
      {
        title: "Front desk daily checklist",
        items: [
          "Upload photos the same day",
          "Rename using the standard format",
          "File into the correct procedure folder",
          "Flag best before/after pairs for doctor review",
          "Doctor approves quarterly batch for marketing"
        ]
      }
    ],
    outcomes: [
      "Sharp intraoral shots without investing in pro rigs.",
      "Consistent full-face and smile photos that look polished.",
      "A case library ready for websites, social, and treatment presentations.",
      "A workflow anyone on the team can follow confidently."
    ]
  },
  mid: {
    label: "Mid",
    priceLevel: 2,
    budget: "~$2,500 - $4,000",
    goal: "Balanced DSLR + lighting setup with automated storage templates (coming soon).",
    intro:
      "We are finishing the mid-tier guide that pairs enthusiast-level DSLRs with dual-light kits, tethered capture, and automated storage templates. Check back soon or ask Prism to prioritize this tier for you.",
    guideIncludes: [],
    products: [],
    comingSoon: true
  },
  premium: {
    label: "Premium",
    priceLevel: 3,
    budget: "$6,000+",
    goal: "Studio-grade capture with cinematic lighting, live review monitors, and automated DAM handoff (coming soon).",
    intro:
      "The premium tier bundles pro camera bodies, twin flashes, color calibration, and rolling carts so multi-location groups can capture assets at agency quality. Reach out if you want early access or a live build.",
    guideIncludes: [],
    products: [],
    comingSoon: true
  }
}

export default function GuideTabs() {
  const [activeTier, setActiveTier] = useState<TierId>("entry")
  const content = tiers[activeTier]

  const overviewItems = useMemo(
    () => [
      { label: "budget", value: content.budget },
      { label: "goal", value: content.goal }
    ],
    [content]
  )

  return (
    <section id="guide-tabs" className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">choose your build</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">entry · mid · premium</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Switch tiers to see the exact parts list, setup steps, and workflows for the gear budget that matches your practice.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Before and after tier selector">
              {(Object.keys(tiers) as TierId[]).map((tierId) => {
                const isActive = activeTier === tierId
                const tier = tiers[tierId]
                return (
                  <button
                    key={tierId}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTier(tierId)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                      isActive ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    <span className={`mr-2 text-xs font-semibold ${isActive ? "text-white/80" : "text-neutral-500"}`}>
                      {"$".repeat(tier.priceLevel)}
                    </span>
                    <span>{tier.label}</span>
                    {tier.comingSoon && (
                      <span
                        className={`ml-2 text-[10px] font-medium uppercase tracking-[0.3em] ${
                          isActive ? "text-white/70" : "text-neutral-500"
                        }`}
                      >
                        coming soon
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:w-2/3">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">{content.label} tier guide</p>
              <h3 className="mt-3 text-2xl font-semibold text-neutral-900">{content.budget}</h3>
              <p className="mt-4 text-base text-neutral-700">{content.intro}</p>
            </div>
            <div className="grid gap-4 text-sm text-neutral-700 lg:w-1/3">
              {overviewItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">{item.label}</p>
                  <p className="mt-1 font-medium text-neutral-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {content.guideIncludes.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">this guide includes</p>
              <ul className="mt-4 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                {content.guideIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content.comingSoon ? (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
              <p className="text-base font-medium text-neutral-800">
                The {content.label.toLowerCase()} tier breakdown is in progress. Need it now?{" "}
                <Link href="/contact" className="text-neutral-900 underline decoration-neutral-300 underline-offset-4">
                  Ping the Prism team
                </Link>{" "}
                and we&apos;ll prioritize the build.
              </p>
            </div>
          ) : (
            <>
              {content.products.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">1. Recommended {content.label.toLowerCase()} products</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {content.products.map((product) => (
                      <div key={product.title + product.subtitle} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">{product.title}</p>
                        {product.subtitle && <h5 className="mt-2 text-lg font-semibold text-neutral-900">{product.subtitle}</h5>}
                        {product.price && <p className="text-sm font-medium text-neutral-700">{product.price}</p>}
                        {product.image && (
                          <div className="mt-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                              <Image
                                src={product.image}
                                alt={product.subtitle ?? product.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                className="object-contain p-2"
                              />
                            </div>
                          </div>
                        )}
                        <p className="mt-3 text-sm text-neutral-600">{product.description}</p>
                        {product.link && (
                          <Link
                            href={product.link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex items-center text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                          >
                            {product.link.label}
                            <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden />
                          </Link>
                        )}
                        {product.bullets && (
                          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                            {product.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.setupSteps && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">2. Physical setup (5-10 minutes)</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {content.setupSteps.map((step) => (
                      <div key={step.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <p className="text-sm font-semibold text-neutral-900">{step.title}</p>
                        <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.workflow && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">3. Team workflow</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {content.workflow.map((item) => (
                      <div key={item.role} className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                          <ClipboardList className="h-4 w-4" aria-hidden />
                          {item.role}
                        </div>
                        <p className="mt-2 text-sm text-neutral-600">{item.responsibility}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.protocol && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">4. Photo protocol (use this every time)</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {content.protocol.map((block) => (
                      <div key={block.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-600">
                          <Camera className="h-3.5 w-3.5" aria-hidden />
                          protocol
                        </div>
                        <h5 className="mt-3 text-base font-semibold text-neutral-900">{block.title}</h5>
                        <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                          {block.instructions.map((instruction) => (
                            <li key={instruction}>• {instruction}</li>
                          ))}
                        </ul>
                        {block.tips && (
                          <div className="mt-4 rounded-2xl bg-neutral-950 px-4 py-3 text-xs text-neutral-200">
                            {block.tips.map((tip) => (
                              <p key={tip} className="mb-1 last:mb-0">
                                {tip}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(content.fileNaming || content.consent) && (
                <div className="grid gap-6 lg:grid-cols-2">
                  {content.fileNaming && (
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                        <FileText className="h-4 w-4" aria-hidden />
                        file naming & storage
                      </div>
                      <p className="mt-3 text-sm font-medium text-neutral-900">{content.fileNaming.naming}</p>
                      <p className="mt-2 text-sm text-neutral-600">Storage structure:</p>
                      <ul className="mt-2 space-y-1 rounded-2xl bg-neutral-50 p-4 text-xs font-mono text-neutral-700">
                        {content.fileNaming.storage.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {content.consent && (
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                        <ShieldCheck className="h-4 w-4" aria-hidden />
                        consent workflow
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                        {content.consent.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {content.checklists && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">5. Daily operation checklists</h4>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    {content.checklists.map((group) => (
                      <div key={group.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                          <ListChecks className="h-4 w-4" aria-hidden />
                          {group.title}
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.outcomes && (
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                    <Sparkles className="h-4 w-4" aria-hidden />
                    outcomes
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                    {content.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-3xl border border-neutral-200 bg-neutral-950 px-6 py-8 text-neutral-50 sm:px-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">ready to deploy</p>
                    <h4 className="mt-2 text-2xl font-semibold text-white">have assets already? prism will wire them everywhere</h4>
                    <p className="mt-3 text-sm text-neutral-200">
                      Drop your monthly highlight folder and we&apos;ll push it to websites, ads, local listings, consult decks, and content calendars.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="rounded-full bg-white px-8 py-3 text-base text-neutral-900">
                    <Link href="/get-started">
                      plug into prism
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
