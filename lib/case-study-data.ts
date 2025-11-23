export type SegmentKey =
  | "consulting"
  | "dental"
  | "local"
  | "nonprofit"
  | "community"
  | "hospitality"
  | "education"
  | "it"

export type CaseStudyMeta = {
  id: string
  title: string
  client: string
  industry: string
  location: string
  description: string
  slug: string
  segments: SegmentKey[]
}

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    id: "1",
    title: "Powering a Seamless Transition",
    client: "Dr. Christopher B. Wong",
    industry: "Dentistry",
    location: "Palo Alto, CA",
    description:
      "How we helped achieve 100% patient retention during practice transition and drive sustainable growth.",
    slug: "dr-christopher-wong",
    segments: ["dental", "local"],
  },
  {
    id: "2",
    title: "Aligning Digital Excellence with Luxury Care",
    client: "Exquisite Dentistry",
    industry: "High-End Dentistry",
    location: "Beverly Hills, CA",
    description: "Creating a sophisticated online experience that matches their premium in-person patient care.",
    slug: "exquisite-dentistry",
    segments: ["dental", "local"],
  },
  {
    id: "3",
    title: "From 10/100 Online to Always-Open Revenue Engine",
    client: "Olympic Bootworks",
    industry: "Retail & E-Commerce",
    location: "Tahoe, CA",
    description: "Full-stack digital overhaul: brand-new site, e-commerce build, analytics & growth program.",
    slug: "olympic-bootworks",
    segments: ["local"],
  },
  {
    id: "4",
    title: "Post‑M&A Relaunch with Measurable Growth",
    client: "Laguna Beach Dental Arts",
    industry: "Dentistry",
    location: "Laguna Beach, CA",
    description: "New brand, custom website, multi‑channel acquisition and end‑to‑end tracking working in tandem.",
    slug: "laguna-beach-dental-arts",
    segments: ["dental", "local"],
  },
  {
    id: "5",
    title: "Family‑Focused Website with Clear Conversion",
    client: "Family First Smile Care",
    industry: "Dentistry",
    location: "Los Gatos, CA",
    description: "Services clarity, office comforts, and measurable conversion flows built for families.",
    slug: "family-first-smile-care",
    segments: ["dental", "local"],
  },
  {
    id: "6",
    title: "Family Dentistry Growth System",
    client: "Town Centre Dental",
    industry: "Dentistry",
    location: "Brentwood, CA",
    description: "Modern website, clear services, streamlined booking, and end‑to‑end analytics.",
    slug: "town-centre-dental",
    segments: ["dental", "local"],
  },
  {
    id: "7",
    title: "Post‑M&A Relaunch for a Family Dental Practice",
    client: "Grace Dental Santa Rosa",
    industry: "Dentistry",
    location: "Santa Rosa, CA",
    description: "Brand refresh, custom site, multi‑channel acquisition, and tracking built for scale.",
    slug: "grace-dental-santa-rosa",
    segments: ["dental", "local"],
  },
  {
    id: "8",
    title: "Designing a Digital Home for Bold Aging",
    client: "Rebellious Aging",
    industry: "Online Community",
    location: "Los Gatos, CA",
    description:
      "Foundational website refresh and local discovery groundwork for a movement that celebrates aging loudly.",
    slug: "rebellious-aging",
    segments: ["community"],
  },
  {
    id: "9",
    title: "Endodontic Growth System Launch",
    client: "Wine Country Root Canal",
    industry: "Dentistry",
    location: "Santa Rosa, CA",
    description: "Calming patient journey, local visibility, and analytics readiness for a specialty practice.",
    slug: "wine-country-root-canal",
    segments: ["dental", "local"],
  },
  {
    id: "10",
    title: "Consulting Presence Refresh",
    client: "sr4 Partners",
    industry: "Consulting",
    location: "Chicago, IL",
    description: "Messaging clarity and modular web design that support enterprise transformation engagements.",
    slug: "sr4-partners",
    segments: ["consulting"],
  },
  {
    id: "11",
    title: "Making Complex IT Services Clear",
    client: "Infobell IT",
    industry: "IT Services",
    location: "Global",
    description: "Approachable messaging, modular design, and analytics guardrails for managed it solutions.",
    slug: "infobell-it",
    segments: ["it"],
  },
  {
    id: "12",
    title: "Mission-Driven Web Refresh",
    client: "Canary Foundation",
    industry: "Nonprofit",
    location: "Palo Alto, CA",
    description: "Accessible storytelling and donor journeys that amplify early cancer detection work.",
    slug: "canary-foundation",
    segments: ["nonprofit"],
  },
  {
    id: "13",
    title: "Story-First Nonprofit Hub",
    client: "Belize Kids Foundation",
    industry: "Nonprofit",
    location: "San Pedro, Belize",
    description: "Program storytelling, supporter flows, and analytics groundwork that keep impact front and center.",
    slug: "belize-kids-foundation",
    segments: ["nonprofit"],
  },
  {
    id: "14",
    title: "Private Retreat Storytelling",
    client: "Canary Cove",
    industry: "Hospitality",
    location: "San Pedro, Belize",
    description: "Immersive visuals, concierge-ready booking flows, and analytics for a private island experience.",
    slug: "canary-cove",
    segments: ["hospitality", "local"],
  },
  {
    id: "15",
    title: "Joyful Education Platform",
    client: "We Are Saplings",
    industry: "Education",
    location: "Global",
    description: "Parent-friendly storytelling, enrollment journeys, and resource hubs for curiosity-led learning.",
    slug: "we-are-saplings",
    segments: ["community", "education"],
  },
  {
    id: "16",
    title: "Specialty Dental Foundations",
    client: "Coast Periodontics & Laser Surgery",
    industry: "Dentistry",
    location: "San Luis Obispo, CA",
    description:
      "Reassuring website design, local presence support, and conversion tracking for a periodontic team.",
    slug: "coast-periodontics-and-laser-surgery",
    segments: ["dental", "local"],
  },
  {
    id: "17",
    title: "Transition Consulting Launchpad",
    client: "Practice Transitions Institute",
    industry: "Consulting",
    location: "San Mateo, CA",
    description: "Narrative clarity, modern website, and local visibility for a dental transition advisory firm.",
    slug: "practice-transitions-institute",
    segments: ["consulting"],
  },
  {
    id: "18",
    title: "Leadership Retreat Digital Presence",
    client: "Leadership Retreat",
    industry: "Professional Development",
    location: "United States",
    description: "Conversion-friendly retreat site with clear agenda, speakers, and booking paths.",
    slug: "leadership-retreat",
    segments: ["education", "community"],
  },
  {
    id: "19",
    title: "Modern Dental Presence",
    client: "Michael Njo, DDS",
    industry: "Dentistry",
    location: "Bay Area, CA",
    description: "Credibility-first website with clear services, patient flows, and tracking.",
    slug: "michael-njo-dds",
    segments: ["dental", "local"],
  },
]
