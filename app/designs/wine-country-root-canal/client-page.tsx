"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState } from "react"
import axios from "axios"

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

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const logoConcepts = [
  {
    title: "Concept 01 · Horizon Field / Relief Line",
    summary:
      "A small house sits on a gentle green slope under a huge sky, with a long, clean horizon line. The composition becomes a metaphor for relief after pain, calm after crisis, and a specialist who operates with perspective and care.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_horizontal_landscape_c_47d1ef8c-986b-4116-851a-a6b2d43ec68f_0_zhmoeq.png",
    variant: "light",
    sections: [
      {
        heading: "Core idea",
        body:
          "A small house sits on a gentle green slope under a huge sky, with a long, clean horizon line. The composition becomes a metaphor for relief after pain, calm after crisis, and a specialist who operates with perspective and care.",
      },
      {
        heading: "Visual treatment",
        body: [
          "Icon",
          "Ultra-wide horizontal rectangle – almost panoramic.",
          "House is positioned left-of-center, fairly small relative to the canvas:",
          "Front wall white.",
          "Side wall muted blue-green.",
          "Roof bright warm red.",
          "Foreground is a sweeping green field with a darker shadow sweeping diagonally, pointing toward the building.",
          "Background is a layered band of ochre fields, then a vast pale blue sky with a subtle grain.",
          "Style",
          "Extremely minimal detail – no fences, no trees, no extra buildings.",
          "The negative space is the hero: the house occupies only a small portion; the landscape and sky do the emotional work.",
          "The diagonal field shadow and horizontal horizon lines create a dynamic but still tranquil composition.",
        ],
      },
      {
        heading: "Meaning cues",
        body: [
          "Tiny house in big landscape = your tooth in the bigger picture of health.",
          "A root canal is a small, intense moment in a much larger life; this composition respects that perspective while still focusing attention on the treated tooth (the house).",
          "Sweeping shadow = path to the practice.",
          "The dark diagonal that leads toward the house can be read as:",
          "The patient’s journey from discomfort toward relief.",
          "Or a stylized root/canal path guiding toward the treated structure.",
          "Huge sky = anxiety dissipating.",
          "The sheer amount of open, pale sky embodies the release of tension after treatment; you’re no longer “boxed in” by pain.",
          "House scale = specialist focus.",
          "It’s small but precise, like the highly specialized work he does inside a tooth.",
        ],
      },
      {
        heading: "Color",
        body: [
          "Sky: Very light blue, almost gray – reassuring, non-aggressive.",
          "Distant horizon band: Thin line of warm yellow/ochre.",
          "Mid band: Deeper orange strip, echoing wine, warmth, and Sonoma soil.",
          "Field: Multiple greens, from bright to deep, adding life and a vineyard feel.",
          "House: White front, blue–green side, red roof – a triad that’s memorable and friendly without feeling childish.",
          "This is the most open and emotional palette of the four – great for a primary website hero.",
        ],
      },
      {
        heading: "Type",
        body: [
          "Because the image is so wide, it pairs well with a centered or right-aligned wordmark:",
          "Option A: Place WINE COUNTRY ROOT CANAL centered underneath, spanning roughly the same width as the house + dark shadow region.",
          "Option B: Place the wordmark to the right of the image for a site header, keeping the house on the left as a visual anchor.",
          "A refined serif still makes sense here, but a clean humanist sans would also work if you want the brand to feel slightly more contemporary.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        body: [
          "Dr. Anderson emphasizes education, communication, and long-term relationships – this composition looks like the practice is part of a larger landscape rather than a sterile box. It makes the brand feel human and grounded.",
          "For patients who are fearful, this scene is soft, calm, and non-threatening. It doesn’t scream “surgery”; it whispers “you’ll be okay”.",
          "The clear, minimal geometry matches his technical precision, while the expansive space mirrors his philosophy of preventive care and whole-health thinking, not just single procedures.",
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
        heading: "Core idea",
        body:
          "A solitary barn stands calm and unshakable in the middle of an open field. It becomes a metaphor for a single, strong tooth that’s been saved and stabilized by expert root canal care.",
      },
      {
        heading: "Visual treatment",
        body: [
          "Icon",
          "Horizontal rectangle format – feels like one of his paintings, not a generic logo.",
          "A single barn viewed from a slight angle:",
          "Front wall nearly frontal, roof and side receding gently to the right.",
          "Proportions are tall enough that the barn body clearly reads as a “tooth” when abstracted.",
          "Ground is a soft band of greens and ochres; behind it a narrow horizontal band of warm rusty-orange; above that, a large expanse of muted teal sky.",
          "A single narrow doorway punctures the front wall — a simple dark vertical rectangle.",
          "Style",
          "Completely flat planes of color with a soft stippled texture (if you keep the texture, it will echo his canvases; if you vectorize, it becomes very clean).",
          "No outlines at all; shapes are defined by edges of color only.",
          "Zero decorative detail: no wood grain, no fencing, no clouds, no extra buildings.",
          "Composition is centered and stable, with the barn slightly left-of-center so the eye moves across the roofline.",
        ],
      },
      {
        heading: "Meaning cues",
        body: [
          "Solitary barn = single tooth.",
          "One structure, isolated and structurally sound, mirrors the idea of saving one compromised tooth and giving it a second life instead of extracting it.",
          "Slight perspective = depth and complexity.",
          "Endodontics is not flat, simple dentistry; the angled view hints there’s more going on internally (root structure, canals) even though the outside looks calm.",
          "Tall vertical face + narrow door = canal pathway.",
          "The long rectangular façade acts like the crown of a tooth; the dark narrow door reads as the cleaned and filled canal opening.",
          "Open landscape + huge sky = relief.",
          "Patients come in tight with anxiety and pain; the open field and big sky symbolize the feeling of relief and breathing room after treatment.",
          "Warm orange band = underlying inflammation that’s been contained.",
          "The orange strip behind the barn can be read as the “resolved” area of infection – present in the history, but now controlled beneath a solid structure.",
        ],
      },
      {
        heading: "Color",
        body: [
          "Sky: Muted teal/blue–green, calming and clinical without looking cold or hospital-like.",
          "Field: Strips of yellow–green and olive, tying directly into Sonoma vineyards and rural landscapes.",
          "Back band: Rust/orange – a nod to wine, soil, and warmth.",
          "Barn: Soft off-white with a subtle gray–blue shadow side; roof in olive/gray.",
          "This palette lands between medical trust (cool teal, off-white) and wine country warmth (orange/olive).",
        ],
      },
      {
        heading: "Type",
        body: [
          "Place the wordmark directly below:",
          "Top line: WINE COUNTRY in a refined serif, lightly letterspaced, all caps or small caps.",
          "Second line: ROOT CANAL same serif, slightly larger and bolder.",
          "For a stacked lockup, you can align the text width to match the barn body width so the logo feels like one unified column.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        body: [
          "Dr. Anderson’s story is about specialization, precision, and stability over decades of work. This barn is not cute or gimmicky; it’s quiet and serious, just like an endodontic specialist should be.",
          "The composition feels slow and controlled — mirroring his emphasis on careful diagnosis, infection control, and meticulous treatment.",
          "The barn and field root the brand in Wine Country without forcing grapes or cliché vine graphics.",
          "The mood is reassuring and non-threatening, which aligns with his desire to reduce anxiety and build long-term trust with patients.",
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
        heading: "Core idea",
        body:
          "A simple house stands upright on a warm field with a vivid orange roof, representing a rebuilt, stable tooth and a patient who’s regained confidence.",
      },
      {
        heading: "Visual treatment",
        body: [
          "Icon",
          "Horizontal rectangle with generous negative space around the central house.",
          "The building is more geometric and iconic:",
          "A near-square front wall.",
          "A steep triangular roof slanting back to the right.",
          "A block attached on the right, extending the form.",
          "The entire structure sits on a thin band of golden–ochre ground; background is a pale blue–gray sky.",
          "One narrow dark doorway in the center of the front wall.",
          "Style",
          "Very clean, almost poster-like: sharper edges, stronger contrast than Concept 1.",
          "Pure flat blocks of color, zero texturing, zero detail besides the door.",
          "Feels more like a logo-ready symbol than a painting: the house silhouette is bold and reads instantly at small sizes.",
        ],
      },
      {
        heading: "Meaning cues",
        body: [
          "Compact, upright house = restored functional tooth.",
          "The totally symmetrical front face suggests stability and symmetry — like a tooth that’s been structurally reinforced with a root canal and restoration.",
          "Orange roof = crown / restoration.",
          "The bright roof can be read as the “new crown” placed after a root canal, sitting on a solid underlying structure.",
          "Single dark door = canal access.",
          "Again, a single vertical element acts as a symbolic canal, but here it’s right in the center – highlighting precision and central access through the tooth.",
          "Pale sky + clean geometry = clarity and expertise.",
          "This feels clinical in a good way: neat, minimal, no clutter, reflecting Dr. Anderson’s focus on diagnosis, technology, and methodical care.",
        ],
      },
      {
        heading: "Color",
        body: [
          "Sky: Very light, cool blue–gray – almost neutral, keeps focus on the house.",
          "Ground: Warm golden–ochre – subtle nod to vineyard soil/wheat fields.",
          "House body: Crisp off-white or almost white – tying to cleanliness and sterile environment.",
          "Roof: Strong burnt orange – warmth, wine, vitality.",
          "Door: Deep charcoal – strong contrast.",
          "This palette straddles clinic white and wine-country warmth, expressing both safety and regional identity.",
        ],
      },
      {
        heading: "Type",
        body: [
          "Because this design is bold and minimal, the wordmark can be similarly clean:",
          "WINE COUNTRY in a modern serif or humanist sans, small caps, letterspaced.",
          "ROOT CANAL directly underneath in the same family, slightly heavier.",
          "A horizontal lockup works well: icon left, two-line wordmark right, baseline aligned with the bottom of the house.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        body: [
          "Dr. Anderson focuses heavily on comprehensive planning and long-term outcomes. This house reads like something built to last, not a temporary fix.",
          "The fusing of cool clinical tones with a vivid warm roof matches his blend of technical skill and approachable humanity.",
          "It’s straightforward and not clever for the sake of being clever – aligning with his serious academic background and continuing education, while still being visually appealing.",
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
        heading: "Core idea",
        body:
          "A barn-like building sits inside an oval frame, creating a seal or medallion that feels like a protected “home” for your tooth – an emblem of specialized endodontic care in Wine Country.",
      },
      {
        heading: "Visual treatment",
        body: [
          "Icon",
          "Central oval fills most of the square; inside the oval is a simple house/barn on a warm orange field with a muted olive sky.",
          "The building:",
          "Front wall on the right, side volume on the left.",
          "Roof in slate gray, walls in off-white.",
          "Three tall black door/window slits on the left volume, one door on the right.",
          "The oval crops out any horizon line except a thin stripe of ground, focusing attention on the structure itself.",
          "Style",
          "The oval frame instantly feels like a seal, award, or coin, making it very brandable.",
          "Shapes remain extremely minimal: no trim, no texture beyond subtle canvas feel, no additional scenery.",
          "The repeated vertical slits create a rhythm, making the design feel orderly and methodical, like multiple canals in a tooth.",
        ],
      },
      {
        heading: "Meaning cues",
        body: [
          "Oval = protection and containment.",
          "It’s as if the building—and by extension the tooth—is cocooned within a safe boundary, aligning with his emphasis on infection control and safety standards (ADA, OSHA, CDC).",
          "Multiple vertical slits = multiple canals.",
          "The left block with three dark slits plus the single right door can be read as multiple roots/canals that have been located and treated.",
          "House/barn silhouette = local, grounded care.",
          "It’s rural, not corporate. That reinforces the idea of a small, specialized practice deeply connected to its community.",
          "Warm ground, muted sky = calm and warmth together.",
          "A calm olive sky suggests clinical rationality; warm orange ground suggests empathy and relief.",
        ],
      },
      {
        heading: "Color",
        body: [
          "Sky: Soft muted olive/khaki – sophisticated, not cold.",
          "Ground: Burnt orange – warmth and “wine country” baked in.",
          "Building body: Off-white and muted cool gray.",
          "Roof and doors/windows: Dark teal or charcoal.",
          "This combination gives a heritage-winery vibe without resorting to grapes or literal wine imagery.",
        ],
      },
      {
        heading: "Type",
        body: [
          "Treat the oval emblem as the primary mark, with the wordmark paired underneath or to the side:",
          "For a classical look, set WINE COUNTRY ROOT CANAL in a high-contrast serif similar to the “SELECTED SOLD ARTWORKS” heading style.",
          "You can create an alternate circular version where the text wraps around the oval to make a full seal (for referral pads, wax stamp, stickers).",
        ],
      },
      {
        heading: "Why this reflects the practice",
        body: [
          "This concept feels like a professional seal of quality, which pairs well with Dr. Anderson’s credentials, memberships, and teaching.",
          "The multiple vertical slits and structured façade echo the complex multi-canal work he does daily.",
          "It visually communicates safety, containment, and thoroughness, which matters a lot for anxious patients contemplating endodontic treatment.",
          "It’s also the closest to a formal emblem you could use on reports, letters to referring dentists, and educational material.",
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

  const handleVoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedConcept) {
      setVoteStatus("error")
      return
    }
    try {
      await axios.post("https://formspree.io/f/mldayroq", {
        name: voterName,
        concept: selectedConcept,
        notes,
      })
      setVoteStatus("success")
    } catch {
      setVoteStatus("error")
    }
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
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-neutral-900">logo concepts</h2>
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
                        <div key={`${concept.title}-${section.heading}`} className="space-y-1">
                          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${copyColor}`}>{section.heading}</p>
                          <p className={`text-sm leading-relaxed ${descriptionColor}`}>{section.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">vote</p>
              <h2 className="text-3xl font-semibold text-neutral-900">pick the direction</h2>
              <p className="text-sm text-neutral-600">Choose your favorite concept and drop notes for the creative team.</p>
            </div>
            {voteStatus === "success" ? (
              <div className="mt-10 space-y-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">thank you</p>
                <h3 className="text-2xl font-semibold text-neutral-900">vote received</h3>
                <p className="text-sm text-neutral-600">
                  We’ll review your notes and follow up with revised directions. Feel free to share more context anytime.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-neutral-300 text-neutral-900"
                  onClick={() => {
                    setSelectedConcept("")
                    setVoterName("")
                    setNotes("")
                    setVoteStatus("idle")
                  }}
                >
                  submit another vote
                </Button>
              </div>
            ) : (
              <form onSubmit={handleVoteSubmit} className="mt-8 space-y-6">
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

                <Button type="submit" className="rounded-full px-8 py-3 text-base font-semibold">
                  submit vote
                </Button>
              </form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
