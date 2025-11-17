"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState } from "react"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Palette,
  PenTool,
  Compass,
  Paintbrush,
  PencilRuler,
  Sparkles,
  Droplets,
  Type as TypeIcon,
  ShieldCheck,
  MapPin,
} from "lucide-react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

type LogoSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  icon?: React.ComponentType<{ className?: string }>
  subsections?: {
    label: string
    icon?: React.ComponentType<{ className?: string }>
    items: string[]
  }[]
}

type LogoConcept = {
  title: string
  summary: string
  image: string
  variant: "light" | "dark"
  sections: LogoSection[]
}

const logoConcepts: LogoConcept[] = [
  {
    title: "Concept 01 · Horizon Field / Relief Line",
    summary:
      "A small house sits on a gentle green slope under a huge sky, with a long, clean horizon line. The composition becomes a metaphor for relief after pain, calm after crisis, and a specialist who operates with perspective and care.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_horizontal_landscape_c_47d1ef8c-986b-4116-851a-a6b2d43ec68f_0_zhmoeq.png",
    variant: "light",
    sections: [
      {
        heading: "Visual treatment",
        subsections: [
          {
            label: "Icon",
            icon: PenTool,
            items: [
              "Ultra-wide horizontal rectangle – almost panoramic.",
              "House is positioned left-of-center, fairly small relative to the canvas: front wall white, side wall muted blue-green, roof bright warm red.",
              "Foreground is a sweeping green field with a darker shadow sweeping diagonally, pointing toward the building.",
              "Background is a layered band of ochre fields, then a vast pale blue sky with a subtle grain.",
            ],
          },
          {
            label: "Style",
            icon: Sparkles,
            items: [
              "Extremely minimal detail – no fences, no trees, no extra buildings.",
              "Negative space leads: landscape and sky carry the emotion while the house stays small.",
              "Diagonal field shadow plus horizon lines keep the composition dynamic yet calm.",
            ],
          },
        ],
      },
    {
        heading: "Meaning cues",
        icon: MapPin,
        bullets: [
          "Tiny house in big landscape = your tooth in the larger story of health (small moment, large life).",
          "Sweeping shadow = path to the practice (patient journey from discomfort to relief or a stylized canal path).",
          "Huge sky = anxiety dissipating; open pale space mirrors the release of tension post-treatment.",
          "House scale = specialist focus; small but precise, like Dr. Anderson’s work inside a tooth.",
        ],
      },
      {
        heading: "Color",
        icon: Palette,
        bullets: [
          "Sky: Very light blue, almost gray – reassuring, non-aggressive.",
          "Horizon bands: warm ochre and deeper orange nodding to wine, soil, and Sonoma warmth.",
          "Field: Multiple greens from bright to deep for vineyard energy.",
          "House: White front, blue-green side, red roof – memorable triad for the hero moment.",
        ],
        paragraphs: ["This is the most open, emotional palette of the four—ideal for a primary hero."],
      },
      {
        heading: "Type",
        icon: TypeIcon,
        bullets: [
          "Centered wordmark spanning the house + shadow width for symmetric pages.",
          "Right-aligned wordmark for headers to keep the house as a visual anchor on the left.",
          "Refined serif or clean humanist sans both work depending on how contemporary you want the brand to feel.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        icon: ShieldCheck,
        bullets: [
          "Positions the practice within a broader landscape, mirroring Dr. Anderson’s focus on education and relationship-driven care.",
          "Soft, calm, non-threatening atmosphere eases fearful patients.",
          "Minimal geometry + expansive space echo his technical precision and preventive, whole-health philosophy.",
        ],
      },
    ],
  },
  {
    title: "Concept 02 · Standing Barn / Endodontic Pillar",
    summary:
      "A solitary barn stands calm and unshakable in the middle of an open field. It becomes a metaphor for a single, strong tooth that’s been saved and stabilized by expert root canal care.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat_vector_logo_icon_of_a_simple_barn_bfcfd0d7-719f-487d-a74b-74f1994212fb_1_vxgtxa.png",
    variant: "dark",
    sections: [
      {
        heading: "Visual treatment",
        subsections: [
          {
            label: "Icon",
            icon: PenTool,
            items: [
              "Horizontal rectangle format – feels like one of his paintings, not a generic logo.",
              "Single barn viewed from a slight angle: front wall nearly frontal, roof and side receding gently to the right.",
              "Tall enough proportions that the barn body clearly reads as a tooth when abstracted.",
              "Ground is a soft band of greens and ochres; behind it a narrow horizontal band of rust; above that a large expanse of muted teal sky.",
              "A single narrow doorway punctures the front wall—a simple dark vertical rectangle.",
            ],
          },
          {
            label: "Style",
            icon: Paintbrush,
            items: [
              "Completely flat planes of color with a soft stippled texture (or vectorized for a cleaner look).",
              "No outlines or decorative details; shapes are defined purely by color edges.",
              "Centered, stable composition with the barn slightly left-of-center so the eye moves across the roofline.",
            ],
          },
        ],
      },
      {
        heading: "Meaning cues",
        bullets: [
          "Solitary barn = single structural tooth saved and stabilized by specialty care.",
          "Slight perspective hints at internal complexity (multiple canals) despite calm exterior.",
          "Tall vertical face + narrow door stand in for crown + canal pathway.",
          "Open landscape + huge sky mirror the relief patients feel once pain and anxiety subside.",
          "Warm orange band nods to contained inflammation—present in the history, now controlled.",
        ],
      },
      {
        heading: "Color",
        bullets: [
          "Sky: Muted teal/blue–green, calming and clinical without looking cold or hospital-like.",
          "Field: Strips of yellow–green and olive, tying directly into Sonoma vineyards and rural landscapes.",
          "Back band: Rust/orange – a nod to wine, soil, and warmth.",
          "Barn: Soft off-white with a subtle gray–blue shadow side; roof in olive/gray.",
        ],
        paragraphs: ["Palette lands between medical trust (cool teal/off-white) and wine-country warmth (orange/olive)."],
      },
      {
        heading: "Type",
        bullets: [
          "Wordmark directly below icon keeps a unified column.",
          "Top line: WINE COUNTRY in refined serif, lightly letterspaced small caps.",
          "Second line: ROOT CANAL same serif, slightly larger/bolder.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        bullets: [
          "Quiet, serious composition mirrors decades of specialization and precision.",
          "Slow, controlled mood echoes careful diagnosis and infection-control ethos.",
          "Rural cues keep the brand grounded in wine country without clichés.",
          "Reassuring tone aligns with his goal of reducing anxiety and building trust.",
        ],
      },
    ],
  },
  {
    title: "Concept 03 · Upright House / Restored Structure",
    summary:
      "A simple house stands upright on a warm field with a vivid orange roof, representing a rebuilt, stable tooth and a patient who’s regained confidence.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_icon_of_a_simple_barn__4115452d-3c6e-460e-ab12-33ea0b84a2e3_1_papyu5.png",
    variant: "light",
    sections: [
      {
        heading: "Visual treatment",
        subsections: [
          {
            label: "Icon",
            icon: PenTool,
            items: [
              "Horizontal rectangle with generous negative space around the central house.",
              "Geometric silhouette: near-square front wall, steep triangular roof slanting back, block attached on the right.",
              "Structure sits on a thin band of golden–ochre ground with a pale blue–gray sky behind.",
              "Single dark doorway centered on the front wall.",
            ],
          },
          {
            label: "Style",
            icon: PencilRuler,
            items: [
              "Very clean, poster-like treatment with sharp edges and high contrast.",
              "Pure flat blocks of color, zero texture or detail beyond the door.",
              "Feels like a logo-ready symbol—the shape reads instantly even at small sizes.",
            ],
          },
        ],
      },
      {
        heading: "Meaning cues",
        bullets: [
          "Compact, upright house = restored functional tooth with balanced structure.",
          "Orange roof = crown/restoration placed after root canal work.",
          "Single dark door = canal access point, centered to highlight precision.",
          "Pale sky + clean geometry = clarity and expertise, reflecting clinical rigor.",
        ],
      },
      {
        heading: "Color",
        bullets: [
          "Sky: Very light, cool blue–gray—neutral backdrop.",
          "Ground: Warm golden–ochre referencing vineyard soil.",
          "House body: Crisp off-white to mirror sterile environments.",
          "Roof: Strong burnt orange for warmth, wine, vitality.",
          "Door: Deep charcoal for contrast.",
        ],
        paragraphs: ["Palette bridges clinic white and wine-country warmth for safety + regional identity."],
      },
      {
        heading: "Type",
        bullets: [
          "Bold, minimal icon pairs with equally clean wordmark.",
          "WINE COUNTRY in modern serif or humanist sans, small caps, letterspaced.",
          "ROOT CANAL underneath in same family, slightly heavier.",
          "Horizontal lockup: icon left, two-line wordmark right with aligned baselines.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        bullets: [
          "Communicates comprehensive planning and long-term outcomes—built to last.",
          "Cool clinical tones + vivid warm roof mirror his mix of technical skill and humanity.",
          "Straightforward, serious, design-first approach matches his academic rigor.",
        ],
      },
    ],
  },
  {
    title: "Concept 04 · Oval Seal / Protected Home",
    summary:
      "A barn-like building sits inside an oval frame, creating a seal or medallion that feels like a protected “home” for your tooth – an emblem of specialized endodontic care in Wine Country.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_emblem_circular_badge__fd88e535-2f33-437a-b9bd-9e2a413b7d84_1_htuezo.png",
    variant: "light",
    sections: [
      {
        heading: "Visual treatment",
        subsections: [
          {
            label: "Icon",
            icon: PenTool,
            items: [
              "Central oval fills most of the square; inside sits a simple barn on a warm orange field with a muted olive sky.",
              "Front wall on the right, side volume on the left with three tall black slits plus a single right-hand door.",
              "The oval crops out any horizon line except a thin stripe of ground to keep focus on the structure.",
            ],
          },
          {
            label: "Style",
            icon: Paintbrush,
            items: [
              "Oval frame instantly feels like a seal or medallion—very brandable.",
              "Shapes stay extremely minimal: no trim, no texture beyond a subtle canvas feel, no extra scenery.",
              "Repeating vertical slits create rhythm and reference multiple canals.",
            ],
          },
        ],
      },
      {
        heading: "Meaning cues",
        bullets: [
          "Oval = protection and containment—safe boundary mirroring infection-control emphasis.",
          "Multiple vertical slits = multiple canals located and treated.",
          "House/barn silhouette keeps the care local and grounded.",
          "Warm ground + muted sky balance empathy and clinical rationality.",
        ],
      },
      {
        heading: "Color",
        bullets: [
          "Sky: Soft muted olive/khaki—sophisticated, never cold.",
          "Ground: Burnt orange for warmth and wine-country DNA.",
          "Building body: Off-white with muted cool gray.",
          "Roof/doors: Dark teal or charcoal.",
        ],
        paragraphs: ["Combination delivers a heritage-winery vibe without literal grape motifs."],
      },
      {
        heading: "Type",
        bullets: [
          "Treat oval emblem as primary mark with wordmark paired underneath or to the side.",
          "High-contrast serif reminiscent of the “SELECTED SOLD ARTWORKS” heading style.",
          "Alternate circular version could wrap the text around the emblem for referral pads or stickers.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        bullets: [
          "Feels like a professional seal of quality, aligning with Dr. Anderson’s credentials and teaching.",
          "Vertical slits + structure echo multi-canal work and thoroughness.",
          "Communicates safety and containment, reassuring anxious patients.",
          "Ideal for use on reports, letters, or educational collateral.",
        ],
      },
    ],
  },
]

const inspirationImages = [
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763394748/1_lzhlya.png",
    alt: "wine country moodboard tile 1",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763394748/2_ygtro6.png",
    alt: "wine country moodboard tile 2",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763394749/3_rt6iaz.png",
    alt: "wine country moodboard tile 3",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763394749/4_pt1jjj.png",
    alt: "wine country moodboard tile 4",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763394749/6_gx3jyg.png",
    alt: "wine country moodboard tile 5",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763394750/5_c4bhrw.png",
    alt: "wine country moodboard tile 6",
  },
]


export default function WineCountryRootCanalDesignReview() {
  const [selectedConcept, setSelectedConcept] = useState<string>("")
  const [voterName, setVoterName] = useState("")
  const [notes, setNotes] = useState("")
  const [voteStatus, setVoteStatus] = useState<"idle" | "error" | "success">("idle")
  const [isVoteOpen, setIsVoteOpen] = useState(false)

  const handleVoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedConcept) {
      setVoteStatus("error")
      return
    }
    try {
      const response = await fetch("https://formspree.io/f/mldayroq", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: voterName,
          concept: selectedConcept,
          notes,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit vote")

      setVoteStatus("success")
    } catch {
      setVoteStatus("error")
    }
  }

  const handleDialogChange = (open: boolean) => {
    setIsVoteOpen(open)
    if (!open) {
      setVoteStatus("idle")
    }
  }

  const resetForm = () => {
    setSelectedConcept("")
    setVoterName("")
    setNotes("")
    setVoteStatus("idle")
  }

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
                <p className="text-base text-neutral-600 sm:text-lg">Dr. Anderson</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    onClick={() => setIsVoteOpen(true)}
                  >
                    vote on design
                  </Button>
                </div>
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

        <section id="vote" className="px-4 py-16 scroll-mt-32">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-neutral-900">design inspiration</h2>
            </div>
            <Carousel opts={{ align: "start", dragFree: true }} className="relative">
              <CarouselContent>
                {inspirationImages.map((image, index) => (
                  <CarouselItem key={image.alt} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="mr-4 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-50">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold text-neutral-900">logo concepts</h2>
              </div>
              <Button
                type="button"
                className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                onClick={() => setIsVoteOpen(true)}
              >
                vote on design
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {logoConcepts.map((concept) => {
                const frameBg =
                  concept.variant === "dark" ? "bg-neutral-900" : "bg-neutral-50"
                const copyColor = concept.variant === "dark" ? "text-white" : "text-neutral-900"
                const descriptionColor = concept.variant === "dark" ? "text-white/70" : "text-neutral-600"
                const cardBg =
                  concept.variant === "dark"
                    ? "bg-neutral-900 border-neutral-800 text-white"
                    : "bg-white border-neutral-200 text-neutral-900"
                const frameBorder = concept.variant === "dark" ? "border-neutral-800" : "border-neutral-100"
                return (
                  <div key={concept.title} className={`rounded-3xl border p-6 shadow-sm ${cardBg}`}>
                    <div className={`relative overflow-hidden rounded-2xl border ${frameBorder} ${frameBg}`}>
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
                    <h3 className={`mt-4 text-xl font-semibold ${copyColor}`}>{concept.title}</h3>
                    <p className={`mt-2 text-sm ${descriptionColor}`}>{concept.summary}</p>
                    <div className="mt-4 space-y-4">
                      {concept.sections.map((section) => (
                        <div key={`${concept.title}-${section.heading}`} className="space-y-2 rounded-2xl border border-neutral-200/40 p-4">
                          <div className="flex items-center gap-2">
                            {section.icon ? (
                              <section.icon className={`h-4 w-4 ${descriptionColor}`} aria-hidden />
                            ) : null}
                            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${copyColor}`}>{section.heading}</p>
                          </div>
                          {section.paragraphs?.map((paragraph) => (
                            <p key={paragraph} className={`text-sm leading-relaxed ${descriptionColor}`}>
                              {paragraph}
                            </p>
                          ))}
                          {section.bullets && (
                            <ul className={`list-disc space-y-1 pl-4 text-sm leading-relaxed ${descriptionColor}`}>
                              {section.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                          {section.subsections?.map((subsection) => (
                            <div key={subsection.label} className="space-y-1">
                              <div className="flex items-center gap-2">
                                {subsection.icon ? (
                                  <subsection.icon className={`h-4 w-4 ${descriptionColor}`} aria-hidden />
                                ) : null}
                                <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${descriptionColor}`}>{subsection.label}</p>
                              </div>
                              <ul className={`list-disc space-y-1 pl-4 text-sm leading-relaxed ${descriptionColor}`}>
                                {subsection.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <Dialog open={isVoteOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle>pick the direction</DialogTitle>
            <DialogDescription>Choose your favorite concept and drop notes for the creative team.</DialogDescription>
          </DialogHeader>
          {voteStatus === "success" ? (
            <div className="space-y-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">thank you</p>
              <h3 className="text-2xl font-semibold text-neutral-900">vote received</h3>
              <p className="text-sm text-neutral-600">
                We’ll review your notes and follow up with revised directions. Feel free to share more context anytime.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setIsVoteOpen(false)
                  }}
                  className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  close
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-neutral-300 text-neutral-900"
                  onClick={() => {
                    resetForm()
                    setVoteStatus("idle")
                  }}
                >
                  submit another vote
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVoteSubmit} className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-neutral-900">concept</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {logoConcepts.map((concept) => (
                    <label
                      key={concept.title}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition hover:border-neutral-900 ${
                        selectedConcept === concept.title ? "border-neutral-900 bg-neutral-900/5" : "border-neutral-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="concept"
                        value={concept.title}
                        className="h-4 w-4 border-neutral-400 text-neutral-900 focus:ring-neutral-900"
                        checked={selectedConcept === concept.title}
                        onChange={(event) => {
                          setSelectedConcept(event.target.value)
                          if (voteStatus !== "idle") setVoteStatus("idle")
                        }}
                      />
                      <span>{concept.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="voter-name" className="text-sm font-semibold text-neutral-900">
                  name (optional)
                </label>
                <Input
                  id="voter-name"
                  placeholder="Dr. Anderson"
                  value={voterName}
                  onChange={(event) => {
                    setVoterName(event.target.value)
                    if (voteStatus !== "idle") setVoteStatus("idle")
                  }}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-semibold text-neutral-900">
                  notes
                </label>
                <Textarea
                  id="notes"
                  placeholder="Drop reactions, tweaks, or questions here…"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>

              {voteStatus === "error" && (
                <p className="text-sm font-semibold text-red-600">Please select a concept before submitting.</p>
              )}

              <Button type="submit" className="w-full rounded-full px-8 py-3 text-base font-semibold">
                submit vote
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
