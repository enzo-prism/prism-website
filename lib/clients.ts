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
    image: "/exquisite-dentistry-mobile.png",
    website: "https://exquisitedentistryla.com/",
    href: "/case-studies/exquisite-dentistry",
  },
  {
    title: "Dr. Christopher B. Wong",
    location: "Palo Alto, CA",
    image: "/dr-christopher-wong-mobile.png",
    website: "https://www.chriswongdds.com",
    href: "/case-studies/dr-christopher-wong",
  },
  {
    title: "Laguna Beach Dental Arts",
    location: "Laguna Beach, CA",
    image: "/laguna-beach-dental-arts-mobile.png",
    website: "https://lagunabeachdentalarts.com",
  },
  {
    title: "Town Centre Dental",
    location: "Brentwood, CA",
    image: "/town-centre-dental.png",
    website: "https://www.towncentredental.net",
  },
  {
    title: "Grace Dental Santa Rosa",
    location: "Santa Rosa, CA",
    image: "/grace-dental.png",
    website: "https://www.tingjenjidds.com",
  },
  {
    title: "Coast Periodontics",
    location: "San Luis Obispo, CA",
    image: "/coast-periodontics.png",
    website: "http://coastperiodontics.com",
  },
  {
    title: "Olympic Bootworks",
    location: "Tahoe, CA",
    image: "/olympic-bootworks-mobile.png",
    href: "/case-studies/olympic-bootworks",
  },
  {
    title: "Belize Kids Foundation",
    location: "San Pedro, Belize",
    image: "/belize-kids.png",
    website: "https://belizekids.org",
  },
  {
    title: "Leadership Summit",
    location: "San Francisco, CA",
    image: "/liz-armato.png",
  },
  {
    title: "Rebellious Aging",
    location: "Los Gatos, CA",
    image: "/suz-meinhardt.png",
    website: "https://rebelwithsuz.com/",
  },
  {
    title: "Canary Foundation",
    location: "Palo Alto, CA",
    image: "/soft-gradient-portrait.svg",
    website: "https://www.canaryfoundation.org/",
  },
  {
    title: "Wine Country Root Canal",
    location: "Santa Rosa, CA",
    image: "/soft-gradient-portrait.svg",
    website: "https://www.winecountryrootcanal.com/",
  },
  {
    title: "Family First Smile Care",
    location: "Los Gatos, CA",
    image: "/soft-gradient-portrait.svg",
    website: "https://famfirstsmile.com/",
  },
  {
    title: "sr4 Partners",
    location: "Chicago, IL",
    image: "/soft-gradient-portrait.svg",
    website: "https://www.sr4partners.com/",
  },
]
