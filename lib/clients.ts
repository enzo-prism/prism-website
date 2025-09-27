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
  },
  {
    title: "Town Centre Dental",
    location: "Brentwood, CA",
    image: "/Town Centre Dental.webp",
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
    image: "/Coast Periodontics.webp",
    website: "http://coastperiodontics.com",
  },
  {
    title: "Olympic Bootworks",
    location: "Tahoe, CA",
    image: "/Olympic Bootworks.webp",
    href: "/case-studies/olympic-bootworks",
  },
  {
    title: "Belize Kids Foundation",
    location: "San Pedro, Belize",
    image: "/Belize Kids.webp",
    website: "https://belizekids.org",
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
  },
  {
    title: "Canary Foundation",
    location: "Palo Alto, CA",
    image: "/Canary Foundation.webp",
    website: "https://www.canaryfoundation.org/",
  },
  {
    title: "Wine Country Root Canal",
    location: "Santa Rosa, CA",
    image: "/Wine Country Root Canal.webp",
    website: "https://www.winecountryrootcanal.com/",
  },
  {
    title: "Family First Smile Care",
    location: "Los Gatos, CA",
    image: "/Family First Smile Care.webp",
    website: "https://famfirstsmile.com/",
  },
  {
    title: "sr4 Partners",
    location: "Chicago, IL",
    image: "/sr4 Partners.webp",
    website: "https://www.sr4partners.com/",
  },
]
