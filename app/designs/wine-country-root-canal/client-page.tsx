"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useState, type ComponentType } from "react"

import Footer from "@/components/footer"
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
  Building2,
  Brush,
  ClipboardList,
  CreditCard,
  FileText,
  Globe,
  Mail,
  MapPin,
  MonitorSmartphone,
  Palette,
  PenTool,
  Receipt,
  Share2,
  ShieldCheck,
  Sparkles,
  Type as TypeIcon,
} from "lucide-react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

type LogoSection = {
  heading: string
  body?: string | string[]
  paragraphs?: string[]
  bullets?: string[]
  icon?: ComponentType<{ className?: string }>
  subsections?: {
    label: string
    icon?: ComponentType<{ className?: string }>
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

type LogoUsageSection = {
  label: string
  bullets: string[]
}

type LogoUsageDetail = {
  title: string
  priorityLabel: string
  description: string
  icon: ComponentType<{ className?: string }>
  sections: LogoUsageSection[]
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
        icon: Palette,
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
        icon: TypeIcon,
        body: [
          "Because the image is so wide, it pairs well with a centered or right-aligned wordmark:",
          "Option A: Place WINE COUNTRY ROOT CANAL centered underneath, spanning roughly the same width as the house + dark shadow region.",
          "Option B: Place the wordmark to the right of the image for a site header, keeping the house on the left as a visual anchor.",
          "A refined serif still makes sense here, but a clean humanist sans would also work if you want the brand to feel slightly more contemporary.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        icon: ShieldCheck,
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
            icon: Sparkles,
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
        icon: MapPin,
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
        icon: Palette,
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
        icon: TypeIcon,
        body: [
          "Place the wordmark directly below:",
          "Top line: WINE COUNTRY in a refined serif, lightly letterspaced, all caps or small caps.",
          "Second line: ROOT CANAL same serif, slightly larger and bolder.",
          "For a stacked lockup, you can align the text width to match the barn body width so the logo feels like one unified column.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        icon: ShieldCheck,
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
            icon: Sparkles,
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
        icon: MapPin,
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
        icon: Palette,
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
        icon: TypeIcon,
        body: [
          "Because this design is bold and minimal, the wordmark can be similarly clean:",
          "WINE COUNTRY in a modern serif or humanist sans, small caps, letterspaced.",
          "ROOT CANAL directly underneath in the same family, slightly heavier.",
          "A horizontal lockup works well: icon left, two-line wordmark right, baseline aligned with the bottom of the house.",
        ],
      },
      {
        heading: "Why this reflects the practice",
        icon: ShieldCheck,
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
            icon: Sparkles,
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
        icon: MapPin,
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
        icon: Palette,
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
        icon: TypeIcon,
        body: [
          "Treat the oval emblem as the primary mark, with the wordmark paired underneath or to the side:",
          "For a classical look, set WINE COUNTRY ROOT CANAL in a high-contrast serif similar to the “SELECTED SOLD ARTWORKS” heading style.",
          "You can create an alternate circular version where the text wraps around the oval to make a full seal (for referral pads, wax stamp, stickers).",
        ],
      },
      {
        heading: "Why this reflects the practice",
        icon: ShieldCheck,
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

const logoUsageDetails: LogoUsageDetail[] = [
  {
    title: "Website (high impact — #1 priority)",
    priorityLabel: "⭐ 1 · high impact",
    description: "The website is the apex of Dr. Anderson’s brand.",
    icon: MonitorSmartphone,
    sections: [
      {
        label: "Header (most important)",
        bullets: [
          "Consistent across all pages",
          "Needs a horizontal lockup",
          "Use a clean vector SVG so it stays crisp on retina screens",
        ],
      },
      {
        label: "Impact",
        bullets: ["Builds immediate trust. Patients decide “is this legit?” in 3 seconds."],
      },
      {
        label: "Footer",
        bullets: ["Reinforces brand authority", "Helps with visual recall"],
      },
      {
        label: "Favicon",
        bullets: [
          "Needs a simple single-icon version, not the full lockup",
          "Usually just the barn / seal icon without words",
        ],
      },
    ],
  },
  {
    title: "Google Maps listing + Apple Maps",
    priorityLabel: "⭐ 2 · massive ROI",
    description: "Patients overwhelmingly discover specialists via Maps.",
    icon: MapPin,
    sections: [
      {
        label: "Where it shows up",
        bullets: [
          "Google Business Profile — Logo field",
          "Google Business Profile — Cover image (wide landscape hero with brand colors)",
          "Apple Business Connect — Logo field",
        ],
      },
      {
        label: "Impact",
        bullets: [
          "Immediately differentiates from generic dental offices",
          "Increases click-through rate to the website",
          "Aligns what patients see after searching “root canal Santa Rosa”",
        ],
      },
    ],
  },
  {
    title: "Yelp · Healthgrades · Zocdoc",
    priorityLabel: "⭐ 3 · comparison platforms",
    description: "Any profile where patients compare providers should match the brand.",
    icon: Globe,
    sections: [
      {
        label: "Standards",
        bullets: [
          "Square version of the logo",
          "Consistent color palette",
          "Clean, readable image",
        ],
      },
      {
        label: "Impact",
        bullets: ["Brand consistency builds trust and moves more appointment requests."],
      },
    ],
  },
  {
    title: "Appointment cards + business cards",
    priorityLabel: "⭐ 4 · physical touchpoints",
    description: "Physical materials still matter for a specialist.",
    icon: CreditCard,
    sections: [
      {
        label: "Placement",
        bullets: ["Front: icon + wordmark", "Back: clear contact info, keep it minimal"],
      },
      {
        label: "Impact",
        bullets: ["Referring dentists hand these to patients — the brand enters the referral loop."],
      },
    ],
  },
  {
    title: "Referring dentist packets",
    priorityLabel: "⭐ 5 · critical for specialists",
    description: "This is Dr. Anderson’s highest-leverage growth channel.",
    icon: FileText,
    sections: [
      {
        label: "What carries the logo",
        bullets: [
          "Referral forms + fax cover sheets",
          "Printed radiograph reports",
          "Welcome letters, thank-you notes, and case update sheets",
        ],
      },
      {
        label: "Impact",
        bullets: [
          "Dentists perceive specialists with strong branding as organized, reliable, and premium.",
        ],
      },
    ],
  },
  {
    title: "Patient forms (digital + paper)",
    priorityLabel: "⭐ 6 · paperwork",
    description: "Every touchpoint should feel unified.",
    icon: ClipboardList,
    sections: [
      {
        label: "Include the logo on",
        bullets: [
          "Medical history, consent, and financial policy documents",
          "Post-op instructions and PDF exports",
          "Online forms or booking portals",
        ],
      },
      {
        label: "Format tip",
        bullets: ["Use a clean black-and-white version of the mark."],
      },
      {
        label: "Impact",
        bullets: ["Professional paperwork reinforces competence."],
      },
    ],
  },
  {
    title: "In-office art + wall signage",
    priorityLabel: "⭐ 7 · environmental design",
    description: "This is where the barn artwork aesthetic becomes a strategic asset.",
    icon: Brush,
    sections: [
      {
        label: "Best placements",
        bullets: [
          "Reception desk wall — large sign or wall print",
          "Treatment room art prints with the barn emblem",
          "Hallway signage",
        ],
      },
      {
        label: "Impact",
        bullets: [
          "Patients feel the space is curated, intentional, and calming — exactly the tone an endodontist wants.",
        ],
      },
    ],
  },
  {
    title: "Email signature + templates",
    priorityLabel: "⭐ 8 · every send",
    description: "Every email should carry the brand.",
    icon: Mail,
    sections: [
      {
        label: "How to apply",
        bullets: ["Small horizontal logo", "SVG or PNG assets", "Use brand colors for dividers or accents"],
      },
      {
        label: "Impact",
        bullets: ["Referring dentists and patients see a consistent, high-level identity."],
      },
    ],
  },
  {
    title: "Social media profiles",
    priorityLabel: "⭐ 9 · consistency",
    description: "Even if usage is light, the visuals should match the website.",
    icon: Share2,
    sections: [
      {
        label: "Assets to prep",
        bullets: [
          "Facebook profile photo: square icon",
          "Facebook cover: wide banner with logo + brand palette",
          "LinkedIn profile + cover: match the Facebook treatment",
        ],
      },
      {
        label: "Impact",
        bullets: [
          "Google’s Knowledge Panel starts pulling consistent imagery, giving a major brand lift.",
        ],
      },
    ],
  },
  {
    title: "Printed + digital treatment reports",
    priorityLabel: "⭐ 10 · specialist proof",
    description: "Especially relevant for referring dentists.",
    icon: FileText,
    sections: [
      {
        label: "Where it appears",
        bullets: ["CBCT imaging PDFs", "Post-operative reports", "Before/after scan printouts"],
      },
      {
        label: "Impact",
        bullets: ["Branding here communicates competence more than anywhere else."],
      },
    ],
  },
  {
    title: "Invoices + receipts",
    priorityLabel: "⭐ 11 · operations",
    description: "Even these should follow the brand.",
    icon: Receipt,
    sections: [
      {
        label: "Execution",
        bullets: ["Small black-and-white logo", "Clean, minimal formatting"],
      },
      {
        label: "Impact",
        bullets: ["Makes the practice feel high-end and organized."],
      },
    ],
  },
  {
    title: "Office signage (exterior)",
    priorityLabel: "⭐ 12 · arrival",
    description: "If zoning allows, extend the logo outside.",
    icon: Building2,
    sections: [
      {
        label: "Placements",
        bullets: [
          "Mounted exterior sign with barn icon + name",
          "Door decal with hours and a monochrome logo",
        ],
      },
      {
        label: "Impact",
        bullets: ["Patients instantly know they’re in the right place, reducing anxiety."],
      },
    ],
  },
  {
    title: "Scrubs · jackets · embroidered items",
    priorityLabel: "⭐ 13 · team polish",
    description: "Optional, but strong brand reinforcement.",
    icon: ShieldCheck,
    sections: [
      {
        label: "Guideline",
        bullets: [
          "Clean embroidered barn icon + “Wine Country Root Canal” in small type",
        ],
      },
      {
        label: "Impact",
        bullets: ["Professional, approachable, and memorable."],
      },
    ],
  },
  {
    title: "Postcards + follow-up mailers",
    priorityLabel: "⭐ 14 · patient touchbacks",
    description: "Even minimal mailers should match the brand.",
    icon: Mail,
    sections: [
      {
        label: "Uses",
        bullets: [
          "Recall cards (“Call us if you experience pain”)",
          "Thank-you cards",
          "Use a small version of the logo for both",
        ],
      },
    ],
  },
  {
    title: "Website favicons for third-party tools",
    priorityLabel: "⭐ 15 · ecosystem",
    description: "Extend the icon into every external portal.",
    icon: Globe,
    sections: [
      {
        label: "Where to update",
        bullets: [
          "Online booking portals",
          "Typeform appointment links",
          "Insurance portals and other third-party tools",
        ],
      },
      {
        label: "Impact",
        bullets: ["Ensures consistency across the full web footprint."],
      },
    ],
  },
]

const usageSummary = [
  "Website header + favicon",
  "Google Maps / Apple Maps",
  "Referral packet materials",
  "In-office signage + art",
  "Patient forms + post-op instructions",
  "Email signature + templates",
  "Social media profiles",
  "Business / appointment cards",
  "Printed treatment reports",
  "Invoices + receipts",
  "Everything else is optional",
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
                  src="/wine-country-root-canal.webp"
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
            <div className="relative">
              <Carousel
                opts={{ align: "start", dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {inspirationImages.map((image, index) => (
                    <CarouselItem
                      key={image.alt}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-50">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                            className="object-cover"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 shadow-md hover:bg-white" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 shadow-md hover:bg-white" />
              </Carousel>
            </div>
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
                const detailBorder = concept.variant === "dark" ? "border-white/20" : "border-neutral-200/70"
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
                      {concept.sections.map((section) => {
                        const paragraphs =
                          section.paragraphs ??
                          (Array.isArray(section.body)
                            ? section.body
                            : section.body
                              ? [section.body]
                              : [])
                        return (
                          <div
                            key={`${concept.title}-${section.heading}`}
                            className={`space-y-2 rounded-2xl border ${detailBorder} p-4`}
                          >
                            <div className="flex items-center gap-2">
                              {section.icon ? (
                                <section.icon className={`h-4 w-4 ${descriptionColor}`} aria-hidden />
                              ) : null}
                              <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${copyColor}`}>
                                {section.heading}
                              </p>
                            </div>
                            {paragraphs.map((paragraph, index) => (
                              <p
                                key={`${section.heading}-paragraph-${index}`}
                                className={`text-sm leading-relaxed ${descriptionColor}`}
                              >
                                {paragraph}
                              </p>
                            ))}
                            {section.bullets && (
                              <ul className={`list-disc space-y-1 pl-4 text-sm leading-relaxed ${descriptionColor}`}>
                                {section.bullets.map((bullet, index) => (
                                  <li key={`${section.heading}-bullet-${index}`}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                            {section.subsections?.map((subsection) => (
                              <div key={`${section.heading}-${subsection.label}`} className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {subsection.icon ? (
                                    <subsection.icon className={`h-4 w-4 ${descriptionColor}`} aria-hidden />
                                  ) : null}
                                  <p
                                    className={`text-xs font-semibold uppercase tracking-[0.3em] ${descriptionColor}`}
                                  >
                                    {subsection.label}
                                  </p>
                                </div>
                                <ul className={`list-disc space-y-1 pl-4 text-sm leading-relaxed ${descriptionColor}`}>
                                  {subsection.items.map((item, index) => (
                                    <li key={`${subsection.label}-${index}`}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 px-4 py-16">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                logo usage guidance
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900">where the logo should live</h2>
              <p className="text-sm text-neutral-600">
                Below is a complete breakdown of where the logo should appear, why it matters, and what format each placement needs.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {logoUsageDetails.map((detail) => (
                <div
                  key={detail.title}
                  className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <detail.icon className="h-6 w-6 text-neutral-700" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                        {detail.priorityLabel}
                      </p>
                      <h3 className="text-xl font-semibold text-neutral-900">{detail.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">{detail.description}</p>
                  <div className="space-y-3">
                    {detail.sections.map((section) => (
                      <div key={`${detail.title}-${section.label}`} className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                          {section.label}
                        </p>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
                          {section.bullets.map((bullet, index) => (
                            <li key={`${section.label}-${index}`}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                ⭐ summary (high-impact uses ranked)
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-neutral-700">
                {usageSummary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
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
