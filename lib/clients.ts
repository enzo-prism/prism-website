export type ClientInfo = {
  title: string
  image: string
  location?: string
  website?: string
  href?: string
  objectPosition?: string
}

// Curated client list for the homepage rail. Use image paths that exist under `public/`.
export const CLIENTS: ClientInfo[] = [
  {
    title: "Exquisite Dentistry",
    location: "Beverly Hills, CA",
    image: "/Exquisite Dentistry.webp",
    website: "https://exquisitedentistryla.com/",
    href: "/case-studies/exquisite-dentistry",
  },
  {
    title: "Dr. Christopher B. Wong",
    location: "Palo Alto, CA",
    image: "/Christopher B Wong DDS.webp",
    website: "https://www.chriswongdds.com",
    href: "/case-studies/dr-christopher-wong",
  },
  {
    title: "Laguna Beach Dental Arts",
    location: "Laguna Beach, CA",
    image: "/Laguna Beach Dental Arts.webp",
    website: "https://lagunabeachdentalarts.com",
    href: "/case-studies/laguna-beach-dental-arts",
  },
  {
    title: "Town Centre Dental",
    location: "Brentwood, CA",
    image: "/Town Centre Dental.webp",
    website: "https://www.towncentredental.net",
    href: "/case-studies/town-centre-dental",
  },
  {
    title: "Grace Dental Santa Rosa",
    location: "Santa Rosa, CA",
    image: "/Grace Dental Santa Rosa-2.webp",
    website: "https://www.tingjenjidds.com",
    href: "/case-studies/grace-dental-santa-rosa",
  },
  {
    title: "Coast Periodontics",
    location: "San Luis Obispo, CA",
    image: "/Coast Periodontics.webp",
    website: "http://coastperiodontics.com",
    href: "/case-studies/coast-periodontics-and-laser-surgery",
  },
  {
    title: "Olympic Bootworks",
    location: "Olympic Valley, CA",
    image: "/Olympic Bootworks.webp",
    website: "https://www.olympicbootworks.com",
    href: "/case-studies/olympic-bootworks",
  },
  {
    title: "Belize Kids Foundation",
    location: "San Pedro, Belize",
    image: "/Belize Kids.webp",
    website: "https://belizekids.org",
    href: "/case-studies/belize-kids-foundation",
  },
  {
    title: "Practice Transitions Institute",
    location: "San Mateo, CA",
    image: "/Practice Transitions Institute.webp",
    website: "https://practicetransitionsinstitute.com",
    href: "/case-studies/practice-transitions-institute",
  },
  {
    title: "Leadership Summit",
    location: "San Francisco, CA",
    image: "/Leadership Summit.webp",
  },
  {
    title: "Rebellious Aging",
    location: "Los Gatos, CA",
    image: "/Rebellious Aging.webp",
    website: "https://rebelwithsuz.com/",
    href: "/case-studies/rebellious-aging",
  },
  {
    title: "Canary Foundation",
    location: "Palo Alto, CA",
    image: "/Canary Foundation.webp",
    website: "https://www.canaryfoundation.org/",
    href: "/case-studies/canary-foundation",
  },
  {
    title: "Wine Country Root Canal",
    location: "Santa Rosa, CA",
    image: "/Wine Country Root Canal.webp",
    website: "https://www.winecountryrootcanal.com/",
    href: "/case-studies/wine-country-root-canal",
  },
  {
    title: "Family First Smile Care",
    location: "Los Gatos, CA",
    image: "/Family First Smile Care.webp",
    website: "https://famfirstsmile.com/",
    href: "/case-studies/family-first-smile-care",
  },
  {
    title: "sr4 Partners",
    location: "Chicago, IL",
    image: "/sr4 Partners.webp",
    website: "https://www.sr4partners.com/",
    href: "/case-studies/sr4-partners",
  },
]
