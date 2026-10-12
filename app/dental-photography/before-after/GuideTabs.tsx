"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, type ReactNode } from "react"
import { ArrowUpRight, Camera, Check, ClipboardList, FileText, Lightbulb, ListChecks, ShieldCheck, Sparkles } from "lucide-react"

import { Eyebrow, Section } from "@/components/prism/section"
import { WaitlistButton } from "@/components/prism/waitlist-button"
import { cn } from "@/lib/utils"
import { WAITLIST_FOCUS_HREFS } from "@/lib/waitlist"

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
    budget: "~$800 - $1,200 equipment budget estimate",
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
      { title: "Step 1: Choose the location", description: "Pick a neutral wall with no backlighting and enough room for 5-6 feet of distance." },
      { title: "Step 2: Install the backdrop", description: "Hang a wrinkle-free white or gray fabric/vinyl backdrop about 5-6 feet wide." },
      {
        title: "Step 3: Set up lighting",
        description:
          "Place LED fill light at a 45° angle from the patient, head height, 2-3 feet away on medium brightness. Add a second light if you want zero shadows."
      },
      {
        title: "Step 4: Mark the floor",
        description: "Use tape for patient foot placement and a second marker for the team. Consistency is what makes the comparisons pop."
      },
      {
        title: "Step 5: Prepare smartphone + lens",
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
    budget: "~$2,500 - $4,000 equipment budget estimate",
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
    budget: "$6,000+ equipment budget estimate",
    goal: "Studio-grade capture with cinematic lighting, live review monitors, and automated DAM handoff (coming soon).",
    intro:
      "The premium tier bundles pro camera bodies, twin flashes, color calibration, and rolling carts so multi-location groups can capture assets at agency quality. Reach out if you want early access or a live build.",
    guideIncludes: [],
    products: [],
    comingSoon: true
  }
}

const panelClass = "min-w-0 rounded-2xl border border-white/[0.08] bg-card p-5 sm:p-6"
const labelClass = "flex items-center gap-2 text-eyebrow text-subtle"

function StepHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-foreground">{children}</h3>
}

function DotList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2 text-[14px] leading-6 text-muted-foreground", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check className="mt-1 size-3.5 shrink-0 text-foreground/70" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function GuideTabs() {
  const [activeTier, setActiveTier] = useState<TierId>("entry")
  const content = tiers[activeTier]

  const overviewItems = useMemo(
    () => [
      { label: "equipment budget estimate (not prism service pricing)", value: content.budget },
      { label: "goal", value: content.goal }
    ],
    [content]
  )

  return (
    <Section id="guide-tabs" aria-labelledby="guide-tabs-title" className="scroll-mt-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Choose your build</Eyebrow>
          <h2 id="guide-tabs-title" className="text-title text-gradient mt-5 pb-1">
            entry · mid · premium.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-muted-foreground">
            Switch tiers to see the exact parts list, setup steps, and workflows for the gear budget that matches your practice.
          </p>
          <p className="mt-2 text-[13px] leading-6 text-subtle">
            All dollar amounts on this page are photography equipment estimates, not Prism website or growth service pricing.
          </p>
        </div>
        <div
          className="flex w-fit max-w-full flex-wrap gap-1 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-1 sm:rounded-full"
          role="tablist"
          aria-label="Before and after tier selector"
        >
          {(Object.keys(tiers) as TierId[]).map((tierId) => {
            const isActive = activeTier === tierId
            const tier = tiers[tierId]
            return (
              <button
                key={tierId}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTier(tierId)}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  isActive
                    ? "bg-white/[0.09] text-foreground shadow-[0_0_0_1px_oklch(1_0_0/12%)_inset]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("mr-2 font-mono text-xs", isActive ? "text-foreground/80" : "text-subtle")}>
                  {"$".repeat(tier.priceLevel)}
                </span>
                <span>{tier.label}</span>
                {tier.comingSoon && (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                    soon
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-10 space-y-12 rounded-[2rem] border border-white/[0.08] bg-white/[0.015] p-5 sm:p-8 lg:p-12" role="tabpanel" aria-label={`${content.label} tier guide`}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-eyebrow text-subtle">{content.label} tier guide</p>
            <p className="text-heading mt-3 text-foreground">{content.budget}</p>
            <p className="mt-4 text-[15px] leading-7 text-muted-foreground">{content.intro}</p>
          </div>
          <div className="grid gap-3">
            {overviewItems.map((item) => (
              <div key={item.label} className={panelClass}>
                <p className="text-eyebrow text-subtle">{item.label}</p>
                <p className="mt-2 text-[15px] leading-6 text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {content.guideIncludes.length > 0 && (
          <div className={panelClass}>
            <p className="text-eyebrow text-subtle">this guide includes</p>
            <DotList className="mt-4 grid gap-x-8 space-y-0 gap-y-2 sm:grid-cols-2" items={content.guideIncludes} />
          </div>
        )}

        {content.comingSoon ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
            <p className="text-[15px] leading-7 text-muted-foreground">
              The {content.label.toLowerCase()} tier breakdown is in progress. Need it now?{" "}
              <a
                href="mailto:support@design-prism.com"
                className="font-medium text-foreground underline decoration-white/25 underline-offset-[5px] hover:decoration-white/70"
              >
                Email the Prism team
              </a>{" "}
              and we&apos;ll prioritize the build.
            </p>
          </div>
        ) : (
          <>
            {content.products.length > 0 && (
              <div>
                <StepHeading>1. Recommended {content.label.toLowerCase()} products</StepHeading>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {content.products.map((product) => (
                    <div key={product.title + product.subtitle} className={cn(panelClass, "flex flex-col")}>
                      <p className="text-eyebrow text-subtle">{product.title}</p>
                      {product.subtitle && (
                        <h4 className="mt-2 text-[17px] font-semibold tracking-[-0.02em] text-foreground">{product.subtitle}</h4>
                      )}
                      {product.price && <p className="mt-1 font-mono text-[13px] text-muted-foreground">{product.price}</p>}
                      {product.image && (
                        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-foreground">
                          <Image
                            src={product.image}
                            alt={product.subtitle ?? product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                            className="object-contain p-3"
                          />
                        </div>
                      )}
                      <p className="mt-4 text-[14px] leading-6 text-muted-foreground">{product.description}</p>
                      {product.bullets && <DotList className="mt-4" items={product.bullets} />}
                      {product.link && (
                        <Link
                          href={product.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group/product mt-auto inline-flex min-h-10 items-center gap-1.5 self-start rounded-sm pt-4 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                          {product.link.label}
                          <ArrowUpRight
                            className="size-4 text-muted-foreground transition-transform duration-200 group-hover/product:-translate-y-0.5 group-hover/product:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.setupSteps && (
              <div>
                <StepHeading>2. Physical setup (5-10 minutes)</StepHeading>
                <ol className="mt-5 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card md:grid-cols-2">
                  {content.setupSteps.map((step, index) => (
                    <li key={step.title} className="-mb-px -mr-px flex gap-4 border-b border-r border-white/[0.07] p-5 sm:p-6">
                      <span className="font-mono text-[11px] leading-6 tracking-[0.18em] text-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold text-foreground">{step.title}</p>
                        <p className="mt-1.5 text-[14px] leading-6 text-muted-foreground">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {content.workflow && (
              <div>
                <StepHeading>3. Team workflow</StepHeading>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {content.workflow.map((item) => (
                    <div key={item.role} className={panelClass}>
                      <p className={labelClass}>
                        <ClipboardList className="size-3.5" aria-hidden />
                        {item.role}
                      </p>
                      <p className="mt-3 text-[14px] leading-6 text-muted-foreground">{item.responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.protocol && (
              <div>
                <StepHeading>4. Photo protocol (use this every time)</StepHeading>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {content.protocol.map((block) => (
                    <div key={block.title} className={cn(panelClass, "flex flex-col")}>
                      <p className={labelClass}>
                        <Camera className="size-3.5" aria-hidden />
                        protocol
                      </p>
                      <h4 className="mt-3 text-[16px] font-semibold text-foreground">{block.title}</h4>
                      <DotList className="mt-3" items={block.instructions} />
                      {block.tips && (
                        <div className="mt-auto pt-4">
                          <div className="rounded-xl border border-white/[0.07] bg-background/60 px-4 py-3 text-[13px] leading-5 text-muted-foreground">
                            {block.tips.map((tip) => (
                              <p key={tip} className="mb-1 last:mb-0">
                                {tip}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(content.fileNaming || content.consent) && (
              <div className="grid gap-4 lg:grid-cols-2">
                {content.fileNaming && (
                  <div className={panelClass}>
                    <p className={labelClass}>
                      <FileText className="size-3.5" aria-hidden />
                      file naming & storage
                    </p>
                    <p className="mt-3 text-[15px] font-medium text-foreground [overflow-wrap:anywhere]">{content.fileNaming.naming}</p>
                    <p className="mt-2 text-[14px] text-muted-foreground">Storage structure:</p>
                    <ul className="mt-2 space-y-1 overflow-x-auto rounded-xl border border-white/[0.07] bg-background/60 p-4 font-mono text-xs text-muted-foreground">
                      {content.fileNaming.storage.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.consent && (
                  <div className={panelClass}>
                    <p className={labelClass}>
                      <ShieldCheck className="size-3.5" aria-hidden />
                      consent workflow
                    </p>
                    <DotList className="mt-4" items={content.consent} />
                  </div>
                )}
              </div>
            )}

            {content.checklists && (
              <div>
                <StepHeading>5. Daily operation checklists</StepHeading>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {content.checklists.map((group) => (
                    <div key={group.title} className={panelClass}>
                      <p className={labelClass}>
                        <ListChecks className="size-3.5" aria-hidden />
                        {group.title}
                      </p>
                      <DotList className="mt-4" items={group.items} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.outcomes && (
              <div className={panelClass}>
                <p className={labelClass}>
                  <Sparkles className="size-3.5" aria-hidden />
                  outcomes
                </p>
                <ul className="mt-4 grid gap-x-8 gap-y-2 text-[14px] leading-6 text-muted-foreground sm:grid-cols-2">
                  {content.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Lightbulb className="mt-1 size-3.5 shrink-0 text-foreground/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-eyebrow text-subtle">ready to deploy</p>
                <h3 className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-foreground">
                  have assets already? prism will wire them everywhere.
                </h3>
                <p className="mt-2 max-w-[60ch] text-[14px] leading-6 text-muted-foreground">
                  Drop your monthly highlight folder and we&apos;ll push it to websites, ads, local listings, consult decks, and content calendars.
                </p>
              </div>
              <WaitlistButton location="before after guide deploy" href={WAITLIST_FOCUS_HREFS.content} className="shrink-0" />
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
