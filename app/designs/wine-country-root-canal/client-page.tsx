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
    summary:
      "A panoramic field with a tiny home under a vast sky mirrors the relief patients feel after treatment.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_horizontal_landscape_c_47d1ef8c-986b-4116-851a-a6b2d43ec68f_0_zhmoeq.png",
    variant: "light",
    sections: [
      {
        heading: "Core idea",
        body:
          "A small house on a gentle slope with an endless sky symbolizes relief after pain: a single tooth restored within the broader context of someone’s life.",
      },
      {
        heading: "Visual treatment",
        body:
          "The ultra-wide rectangle leaves huge negative space so the landscape carries the emotion. The diagonal shadow leads the eye toward the home, echoing the patient’s path to the practice.",
      },
      {
        heading: "Meaning cues",
        body:
          "The tiny structure represents the tooth, the sweeping shadow reads as the canal path or patient journey, and the sky communicates anxiety lifting once treatment is complete.",
      },
      {
        heading: "Color & type",
        body:
          "Bands of ochre, orange, and vineyard greens create a wine-country palette while the house uses a memorable triad of white, blue-green, and red. It pairs well with a refined serif or humanist sans set alongside or beneath the illustration.",
      },
      {
        heading: "Why it fits",
        body:
          "Dr. Anderson’s emphasis on education and long-term relationships shines through in this calm, human composition. It whispers reassurance instead of shouting clinical precision.",
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
    title: "Concept 03 · Elevated crest",
    summary:
      "A bold geometric house with an orange roof reads instantly as a rebuilt structure—perfect for a root-canal success story.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_icon_of_a_simple_barn__4115452d-3c6e-460e-ab12-33ea0b84a2e3_1_papyu5.png",
    variant: "light",
    sections: [
      {
        heading: "Core idea",
        body:
          "An upright house sitting on a thin band of soil represents a tooth restored to full strength with a bright crown on top.",
      },
      {
        heading: "Visual treatment",
        body:
          "Sharply cut blocks, high contrast, and zero texture make this feel like a logo-ready symbol. The centered doorway highlights precision access to the canal.",
      },
      {
        heading: "Meaning cues",
        body:
          "The square façade equals structural stability, the orange roof acts as the restorative crown, and the single dark door becomes the canal opening in the most literal way.",
      },
      {
        heading: "Color & type",
        body:
          "Cool blue-gray sky, golden soil, crisp whites, and burnt orange bridge clinical cleanliness with wine-country warmth. Pair it with a modern serif or humanist sans stacked in two lines.",
      },
      {
        heading: "Why it fits",
        body:
          "Dr. Anderson’s methodical planning and emphasis on long-term outcomes are expressed through the neat geometry and bold clarity of this mark.",
      },
    ],
  },
  {
    title: "Concept 04 · Circular seal",
    summary:
      "An oval emblem frames a protected home, creating a seal that feels official enough for reports, referral pads, or patient keepsakes.",
    image:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763392232/u6213582198_minimalist_flat-color_logo_emblem_circular_badge__fd88e535-2f33-437a-b9bd-9e2a413b7d84_1_htuezo.png",
    variant: "light",
    sections: [
      {
        heading: "Core idea",
        body:
          "A barn-like building encapsulated in an oval feels like a specialized home for the tooth—safe, sealed, and cared for.",
      },
      {
        heading: "Visual treatment",
        body:
          "The oval crop removes distractions and focuses on the structure, with repeating vertical slits that rhythmically echo multiple canals.",
      },
      {
        heading: "Meaning cues",
        body:
          "The frame communicates containment and infection control, while the quartet of doorways mirrors multiple canal systems being treated thoroughly.",
      },
      {
        heading: "Color & type",
        body:
          "Olive sky, burnt orange ground, off-white walls, and charcoal accents offer a heritage-winery vibe without resorting to clichés. The seal can sit with a high-contrast serif or be wrapped with text for stickers and reports.",
      },
      {
        heading: "Why it fits",
        body:
          "This is the most formal of the concepts—perfect for a specialist who writes reports, teaches, and needs a mark that feels like a stamp of quality for referring dentists.",
      },
    ],
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

      </main>
      <Footer />
    </div>
  )
}
