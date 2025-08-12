type Organization = {
  "@type": "Organization"
  "@id": string
  name: string
  url: string
  logo: {
    "@type": "ImageObject"
    url: string
    width: number
    height: number
  }
  sameAs: string[]
  contactPoint: {
    "@type": "ContactPoint"
    telephone: string
    contactType: string
    email?: string
  }
}

type WebSite = {
  "@type": "WebSite"
  "@id": string
  url: string
  name: string
  description: string
  publisher: {
    "@id": string
  }
  potentialAction: {
    "@type": "SearchAction"
    target: string
    "query-input": string
  }
}

type BreadcrumbList = {
  "@type": "BreadcrumbList"
  itemListElement: {
    "@type": "ListItem"
    position: number
    name: string
    item: string
  }[]
}

type Article = {
  "@type": "Article"
  headline: string
  description: string
  image: string
  author: {
    "@type": "Person"
    name: string
  }
  publisher: {
    "@id": string
  }
  datePublished: string
  dateModified: string
  mainEntityOfPage: {
    "@type": "WebPage"
    "@id": string
  }
}

export function OrganizationSchema() {
  const orgSchema: Organization = {
    "@type": "Organization",
    "@id": "https://www.design-prism.com/#organization",
    name: "Prism Agency",
    url: "https://www.design-prism.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.design-prism.com/prism-opengraph.png",
      width: 1200,
      height: 630,
    },
    sameAs: [
      "https://www.instagram.com/the_design_prism/?hl=en",
      "https://www.linkedin.com/company/web-prism/",
      "https://www.tiktok.com/@the_design_prism",
      "https://x.com/NosisTheGod",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-650-862-4069",
      contactType: "customer service",
      email: "support@design-prism.com",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(orgSchema),
      }}
    />
  )
}

export function WebsiteSchema() {
  const websiteSchema: WebSite = {
    "@type": "WebSite",
    "@id": "https://www.design-prism.com/#website",
    url: "https://www.design-prism.com",
    name: "Prism Agency - Beautiful Software That Grows Revenue",
    description:
      "Prism Agency creates beautiful websites, apps, and designs that shatter revenue goals for ambitious businesses. AI-powered digital solutions that convert visitors into customers.",
    publisher: {
      "@id": "https://www.design-prism.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
       target: "https://www.design-prism.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const breadcrumbSchema: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  )
}

export function BlogPostSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string
  description: string
  url: string
  imageUrl: string
  datePublished: string
  dateModified: string
  authorName: string
}) {
  const articleSchema: Article = {
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": "https://www.design-prism.com/#organization",
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema),
      }}
    />
  )
}

export function CaseStudySchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  clientName,
  outcome,
}: {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished: string
  dateModified: string
  clientName: string
  outcome: string
}) {
  const caseStudySchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    headline: title,
    description,
    author: {
      "@id": "https://design-prism.com/#organization",
    },
    about: {
      "@type": "Organization",
      name: clientName,
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    text: outcome,
  }

  if (imageUrl) {
    caseStudySchema.image = imageUrl
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(caseStudySchema),
      }}
    />
  )
}

export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  )
}

export function ContactPageSchema() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: "https://design-prism.com/contact",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://design-prism.com/#organization",
      name: "Prism Agency",
      telephone: "+1-800-123-4567",
      email: "support@design-prism.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-123-4567",
        email: "support@design-prism.com",
        url: "https://www.design-prism.com/get-started",
        contactType: "customer service",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(contactSchema),
      }}
    />
  )
}

// New Service Schema Types
type Service = {
  "@type": "Service"
  "@id": string
  name: string
  description: string
  provider: {
    "@id": string
  }
  serviceType: string
  areaServed: string | string[]
  offers?: {
    "@type": "Offer"
    name: string
    description: string
    businessFunction: string
    priceSpecification?: {
      "@type": "PriceSpecification"
      price?: string
      priceCurrency?: string
      priceRange?: string
    }
  }
}

type LocalBusiness = {
  "@type": "LocalBusiness"
  "@id": string
  name: string
  legalName?: string
  url: string
  image?: string
  logo: {
    "@type": "ImageObject"
    url: string
    width: number
    height: number
  }
  telephone?: string
  sameAs: string[]
  contactPoint: {
    "@type": "ContactPoint"
    telephone: string
    contactType: string
    email: string
  }
  address?: {
    "@type": "PostalAddress"
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  geo?: {
    "@type": "GeoCoordinates"
    latitude: number
    longitude: number
  }
  areaServed: (string | {
    "@type": "GeoCircle"
    geoMidpoint: {
      "@type": "GeoCoordinates"
      latitude: number
      longitude: number
    }
    geoRadius: string
  })[]
  serviceArea?: string
  priceRange?: string
  openingHoursSpecification?: {
    "@type": "OpeningHoursSpecification"
    dayOfWeek: string[]
    opens: string
    closes: string
  }[]
  description?: string
  founder?: {
    "@type": "Person"
    name: string
  }
  hasOfferCatalog: {
    "@type": "OfferCatalog"
    name: string
    itemListElement: {
      "@type": "Offer"
      itemOffered: {
        "@type": "Service"
        name: string
      }
    }[]
  }
}

type Offer = {
  "@type": "Offer"
  "@id": string
  name: string
  description: string
  businessFunction: string
  seller: {
    "@id": string
  }
  itemOffered: {
    "@type": "Service"
    name: string
    description: string
  }
  priceSpecification: {
    "@type": "PriceSpecification"
    price?: string
    priceCurrency?: string
    priceRange?: string
  }
  availability: string
  validFrom?: string
}

type VideoObject = {
  "@type": "VideoObject"
  "@id": string
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl?: string
  embedUrl?: string
  publisher: {
    "@id": string
  }
  creator?: {
    "@type": "Person"
    name: string
  }
}

type Person = {
  "@type": "Person"
  "@id": string
  name: string
  jobTitle: string
  description?: string
  image?: string
  url?: string
  worksFor: {
    "@id": string
  }
  sameAs?: string[]
}

type CreativeWork = {
  "@type": "CreativeWork"
  "@id": string
  name: string
  description: string
  image: string
  creator: {
    "@id": string
  }
  dateCreated: string
  genre?: string
  keywords?: string[]
}

// Service Schema Components
export function ServiceSchema({
  serviceId,
  name,
  description,
  serviceType,
  areaServed,
  offerDetails,
}: {
  serviceId: string
  name: string
  description: string
  serviceType: string
  areaServed: string | string[]
  offerDetails?: {
    name: string
    description: string
    businessFunction: string
    price?: string
    priceCurrency?: string
    priceRange?: string
  }
}) {
  const serviceSchema: Service = {
    "@type": "Service",
    "@id": `https://design-prism.com/#${serviceId}`,
    name,
    description,
    provider: {
      "@id": "https://design-prism.com/#organization",
    },
    serviceType,
    areaServed,
    ...(offerDetails && {
      offers: {
        "@type": "Offer",
        name: offerDetails.name,
        description: offerDetails.description,
        businessFunction: offerDetails.businessFunction,
        ...(offerDetails.price || offerDetails.priceRange
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                ...(offerDetails.price && { price: offerDetails.price }),
                ...(offerDetails.priceCurrency && { priceCurrency: offerDetails.priceCurrency }),
                ...(offerDetails.priceRange && { priceRange: offerDetails.priceRange }),
              },
            }
          : {}),
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...serviceSchema,
        }),
      }}
    />
  )
}

export function LocalBusinessSchema() {
  const localBusinessSchema: LocalBusiness = {
    "@type": "LocalBusiness",
    "@id": "https://www.design-prism.com/#localbusiness",
    name: "Prism",
    legalName: "Design Prism LLC",
    url: "https://www.design-prism.com",
    image: "https://www.design-prism.com/prism-opengraph.png",
    logo: {
      "@type": "ImageObject",
      url: "https://www.design-prism.com/prism-opengraph.png",
      width: 1200,
      height: 630,
    },
    telephone: "+1-650-862-4069",
    priceRange: "$1,000 – $3,000",
    description: "Prism builds revenue-driving custom websites, apps and design systems for startups and local businesses.",
    sameAs: [
      "https://www.instagram.com/the_design_prism/?hl=en",
      "https://www.linkedin.com/company/web-prism/",
      "https://www.tiktok.com/@the_design_prism",
      "https://x.com/NosisTheGod",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-650-862-4069",
      contactType: "customer service",
      email: "support@design-prism.com",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1075 Space Park Way",
      addressLocality: "Mountain View",
      addressRegion: "CA",
      postalCode: "94043",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.3861,
      longitude: -122.0839,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Enzo Sison",
    },
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 37.3861,
          longitude: -122.0839,
        },
        geoRadius: "50000",
      },
    ],
    serviceArea: "United States",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI-Powered Digital Solutions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development - AI-Powered Conversion Optimization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development - Cross-Platform Solutions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing - AI-Driven Lead Generation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design - Conversion-Focused Design",
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...localBusinessSchema,
        }),
      }}
    />
  )
}

export function OfferSchema({
  offerId,
  name,
  description,
  businessFunction,
  serviceName,
  serviceDescription,
  price,
  priceCurrency = "USD",
  priceRange,
  availability = "InStock",
  validFrom,
}: {
  offerId: string
  name: string
  description: string
  businessFunction: string
  serviceName: string
  serviceDescription: string
  price?: string
  priceCurrency?: string
  priceRange?: string
  availability?: string
  validFrom?: string
}) {
  const offerSchema: Offer = {
    "@type": "Offer",
    "@id": `https://design-prism.com/#${offerId}`,
    name,
    description,
    businessFunction,
    seller: {
      "@id": "https://design-prism.com/#organization",
    },
    itemOffered: {
      "@type": "Service",
      name: serviceName,
      description: serviceDescription,
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      ...(price && { price }),
      priceCurrency,
      ...(priceRange && { priceRange }),
    },
    availability,
    ...(validFrom && { validFrom }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...offerSchema,
        }),
      }}
    />
  )
}

export function VideoObjectSchema({
  videoId,
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  creatorName,
}: {
  videoId: string
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl?: string
  embedUrl?: string
  creatorName?: string
}) {
  const videoSchema: VideoObject = {
    "@type": "VideoObject",
    "@id": `https://design-prism.com/#${videoId}`,
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    publisher: {
      "@id": "https://design-prism.com/#organization",
    },
    ...(creatorName && {
      creator: {
        "@type": "Person",
        name: creatorName,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...videoSchema,
        }),
      }}
    />
  )
}

export function PersonSchema({
  personId,
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs,
}: {
  personId: string
  name: string
  jobTitle: string
  description?: string
  image?: string
  url?: string
  sameAs?: string[]
}) {
  const personSchema: Person = {
    "@type": "Person",
    "@id": `https://design-prism.com/#${personId}`,
    name,
    jobTitle,
    ...(description && { description }),
    ...(image && { image }),
    ...(url && { url }),
    worksFor: {
      "@id": "https://design-prism.com/#organization",
    },
    ...(sameAs && { sameAs }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...personSchema,
        }),
      }}
    />
  )
}

export function CreativeWorkSchema({
  workId,
  name,
  description,
  image,
  dateCreated,
  genre,
  keywords,
}: {
  workId: string
  name: string
  description: string
  image: string
  dateCreated: string
  genre?: string
  keywords?: string[]
}) {
  const creativeWorkSchema: CreativeWork = {
    "@type": "CreativeWork",
    "@id": `https://design-prism.com/#${workId}`,
    name,
    description,
    image,
    creator: {
      "@id": "https://design-prism.com/#organization",
    },
    dateCreated,
    ...(genre && { genre }),
    ...(keywords && { keywords }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...creativeWorkSchema,
        }),
      }}
    />
  )
}
