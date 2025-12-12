export type ClientInfo = {
  title: string
  image?: string
  location?: string
  website?: string
  href?: string
  objectPosition?: string
  category?: string
}

// Curated client list for the homepage rail. Use image paths that exist under `public/`.
export const CLIENTS: ClientInfo[] = [
  {
    title: "Exquisite Dentistry",
    location: "Beverly Hills, CA",
    image: "/exquisite-dentistry.webp",
    website: "https://exquisitedentistryla.com/",
    href: "/case-studies/exquisite-dentistry",
    category: "dentistry",
  },
  {
    title: "Dr. Christopher B. Wong",
    location: "Palo Alto, CA",
    image: "/christopher-b-wong-dds.webp",
    website: "https://www.chriswongdds.com",
    href: "/case-studies/dr-christopher-wong",
    category: "dentistry",
  },
  {
    title: "Laguna Beach Dental Arts",
    location: "Laguna Beach, CA",
    image: "/laguna-beach-dental-arts.webp",
    website: "https://lagunabeachdentalarts.com",
    href: "/case-studies/laguna-beach-dental-arts",
    category: "dentistry",
  },
  {
    title: "Town Centre Dental",
    location: "Brentwood, CA",
    image: "/town-centre-dental.webp",
    website: "https://www.towncentredental.net",
    href: "/case-studies/town-centre-dental",
    category: "dentistry",
  },
  {
    title: "Grace Dental Santa Rosa",
    location: "Santa Rosa, CA",
    image: "/grace-dental-santa-rosa-2.webp",
    website: "https://www.tingjenjidds.com",
    href: "/case-studies/grace-dental-santa-rosa",
    category: "dentistry",
  },
  {
    title: "Coast Periodontics",
    location: "San Luis Obispo, CA",
    image: "/coast-periodontics.webp",
    website: "http://coastperiodontics.com",
    href: "/case-studies/coast-periodontics-and-laser-surgery",
    category: "dentistry",
  },
  {
    title: "Olympic Bootworks",
    location: "Olympic Valley, CA",
    image: "/olympic-bootworks.webp",
    website: "https://www.olympicbootworks.com",
    href: "/case-studies/olympic-bootworks",
    category: "retail",
  },
  {
    title: "Belize Kids Foundation",
    location: "San Pedro, Belize",
    image: "/belize-kids.webp",
    website: "https://belizekids.org",
    href: "/case-studies/belize-kids-foundation",
    category: "nonprofit",
  },
  {
    title: "Practice Transitions Institute",
    location: "San Mateo, CA",
    image: "/practice-transitions-institute.webp",
    website: "https://practicetransitionsinstitute.com",
    href: "/case-studies/practice-transitions-institute",
    category: "consulting",
  },
  {
    title: "Rebellious Aging",
    location: "Los Gatos, CA",
    image: "/rebellious-aging.webp",
    website: "https://rebelwithsuz.com/",
    href: "/case-studies/rebellious-aging",
    category: "online community",
  },
  {
    title: "Canary Foundation",
    location: "Palo Alto, CA",
    image: "/canary-foundation.webp",
    website: "https://www.canaryfoundation.org/",
    href: "/case-studies/canary-foundation",
    category: "nonprofit",
  },
  {
    title: "Wine Country Root Canal",
    location: "Santa Rosa, CA",
    image: "/wine-country-root-canal.webp",
    website: "https://www.winecountryrootcanal.com/",
    href: "/case-studies/wine-country-root-canal",
    category: "dentistry",
  },
  {
    title: "Family First Smile Care",
    location: "Los Gatos, CA",
    image: "/family-first-smile-care.webp",
    website: "https://famfirstsmile.com/",
    href: "/case-studies/family-first-smile-care",
    category: "dentistry",
  },
  {
    title: "sr4 Partners",
    location: "Chicago, IL",
    image: "/sr4-partners.webp",
    website: "https://www.sr4partners.com/",
    href: "/case-studies/sr4-partners",
    category: "consulting",
  },
  {
    title: "Infobell IT",
    location: "San Jose, CA",
    category: "it",
  },
  {
    title: "Saorsa Growth Partners",
    location: "San Francisco, CA",
    category: "consulting",
  },
  {
    title: "We Are Saplings",
    location: "New York City",
    category: "education",
  },
  {
    title: "Dentist Retreat",
    location: "San Francisco, CA",
    category: "event",
  },
  {
    title: "Mataria Dental Group",
    location: "Torrance, CA",
    category: "dentistry",
  },
]
