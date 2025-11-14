import { canonicalUrl } from "@/lib/canonical"
import { buildAggregateRating } from "@/lib/review-metrics"

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

type AggregateRating = {
  "@type": "AggregateRating"
  ratingValue: string
  reviewCount: string
  bestRating?: string
  worstRating?: string
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
      "Prism Agency builds high-converting websites, manages local listing optimization, and runs online ad campaigns that grow revenue for ambitious businesses.",
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
      item: canonicalUrl(item.url),
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
  aggregateRating?: AggregateRating
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
  thumbnailUrl: string | string[]
  uploadDate: string
  duration?: string
  contentUrl: string
  embedUrl?: string
  width?: number
  height?: number
  publisher: {
    "@id": string
  }
  creator?: {
    "@type": "Person"
    name: string
  }
  potentialAction?: {
    "@type": "WatchAction" | "SeekToAction"
    target: string | {
      "@type": "EntryPoint"
      urlTemplate: string
    }
    "startOffset-input"?: string
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

type JobPosting = {
  "@type": "JobPosting"
  "@id": string
  title: string
  description: string
  identifier: {
    "@type": "PropertyValue"
    name: string
    value: string
  }
  datePosted: string
  validThrough: string
  employmentType: string
  hiringOrganization: {
    "@type": "Organization"
    name: string
    url: string
    sameAs?: string[]
    logo?: string
  }
  jobLocationType?: string
  jobLocation?: {
    "@type": "Place"
    address: {
      "@type": "PostalAddress"
      streetAddress?: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }
  applicantLocationRequirements?: {
    "@type": "Country" | "AdministrativeArea"
    name: string
  }[]
  baseSalary?: {
    "@type": "MonetaryAmount"
    currency: string
    value: {
      "@type": "QuantitativeValue"
      value?: number
      unitText?: string
    }
  }
  responsibilities?: string[]
  qualifications?: string[]
  directApply?: boolean
  url: string
}

type Product = {
  "@type": "Product"
  "@id": string
  name: string
  description: string
  brand: {
    "@type": "Brand"
    name: string
  }
  sku?: string
  url: string
  offers: Offer
  aggregateRating?: AggregateRating
}

type PodcastSeries = {
  "@type": "PodcastSeries"
  "@id": string
  name: string
  description: string
  url: string
  image?: string
  sameAs?: string[]
  inLanguage?: string
  author: {
    "@type": "Person" | "Organization"
    name: string
  }
  publisher?: {
    "@type": "Organization"
    name: string
  }
}

type PodcastEpisode = {
  "@type": "PodcastEpisode"
  "@id": string
  partOfSeries: {
    "@id": string
  }
  name: string
  description: string
  url: string
  datePublished?: string
  duration?: string
  associatedMedia?: {
    "@type": "MediaObject"
    contentUrl?: string
    embedUrl?: string
    thumbnailUrl?: string
  }
}

type SoftwareApplication = {
  "@type": "SoftwareApplication"
  "@id": string
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string[]
  url: string
  offers?: Offer
  aggregateRating?: AggregateRating
}

type Dataset = {
  "@type": "Dataset"
  "@id": string
  name: string
  description: string
  url: string
  creator: {
    "@type": "Organization"
    name: string
    url: string
  }
  variableMeasured?: string[]
  keywords?: string[]
  distribution?: {
    "@type": "DataDownload"
    contentUrl: string
    encodingFormat?: string
  }[]
}

type HowToStep = {
  "@type": "HowToStep"
  position: number
  name: string
  text: string
}

type HowTo = {
  "@type": "HowTo"
  name: string
  description: string
  step: HowToStep[]
  totalTime?: string
  supply?: {
    "@type": "HowToSupply"
    name: string
  }[]
  tool?: {
    "@type": "HowToTool"
    name: string
  }[]
}

// Service Schema Components
export function ServiceSchema({
  serviceId,
  name,
  description,
  serviceType,
  areaServed,
  offerDetails,
  aggregateRating,
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
  aggregateRating?: AggregateRating
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
    ...(aggregateRating && { aggregateRating }),
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

export function VideoSchema({
  id,
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  width,
  height,
  publisherId = "https://design-prism.com/#organization",
  creatorName,
  seekToActionTarget,
}: {
  id: string
  name: string
  description: string
  thumbnailUrl: string | string[]
  uploadDate: string
  duration?: string
  contentUrl: string
  embedUrl?: string
  width?: number
  height?: number
  publisherId?: string
  creatorName?: string
  seekToActionTarget?: string
}) {
  const videoSchema: VideoObject = {
    "@type": "VideoObject",
    "@id": id,
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    publisher: {
      "@id": publisherId,
    },
    ...(embedUrl && { embedUrl }),
    ...(duration && { duration }),
    ...(typeof width === "number" && typeof height === "number" && { width, height }),
    ...(creatorName && { creator: { "@type": "Person", name: creatorName } }),
  }

  if (seekToActionTarget) {
    videoSchema.potentialAction = {
      "@type": "SeekToAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: seekToActionTarget,
      },
      "startOffset-input": "required name=seek_to_second_number",
    }
  } else if (embedUrl) {
    videoSchema.potentialAction = {
      "@type": "WatchAction",
      target: embedUrl,
    }
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
    priceRange: "$1,000 - $3,000",
    description: "Prism builds high-converting websites, manages local listing optimization, and runs online ad campaigns for growing businesses.",
    sameAs: [
      "https://www.instagram.com/the_design_prism/?hl=en",
      "https://www.linkedin.com/company/web-prism/",
      "https://www.tiktok.com/@the_design_prism",
      "https://x.com/NosisTheGod",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "548 Market St #62411",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94104",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7897,
      longitude: -122.3942,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-650-862-4069",
      contactType: "customer service",
      email: "support@design-prism.com",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Enzo Sison",
    },
    areaServed: ["United States"],
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
    aggregateRating: buildAggregateRating(),
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

export function JobPostingSchema({
  jobId,
  title,
  description,
  employmentType,
  datePosted,
  validThrough,
  url,
  jobLocation,
  applicantLocations,
  baseSalary,
  responsibilities = [],
  qualifications = [],
  jobLocationType = "TELECOMMUTE",
  directApply = true,
}: {
  jobId: string
  title: string
  description: string
  employmentType: string
  datePosted: string
  validThrough: string
  url: string
  jobLocation?: {
    "@type": "Place"
    address: {
      "@type": "PostalAddress"
      streetAddress?: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }
  applicantLocations?: {
    "@type": "Country" | "AdministrativeArea"
    name: string
  }[]
  baseSalary?: {
    currency: string
    amount?: number
    unitText?: string
  }
  responsibilities?: string[]
  qualifications?: string[]
  jobLocationType?: string
  directApply?: boolean
}) {
  const schema: JobPosting = {
    "@type": "JobPosting",
    "@id": `https://design-prism.com/#${jobId}`,
    title,
    description,
    identifier: {
      "@type": "PropertyValue",
      name: "Prism",
      value: jobId,
    },
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "Prism",
      url: "https://www.design-prism.com",
      sameAs: [
        "https://www.instagram.com/the_design_prism/?hl=en",
        "https://www.linkedin.com/company/web-prism/",
        "https://x.com/NosisTheGod",
      ],
      logo: "https://www.design-prism.com/prism-opengraph.png",
    },
    ...(jobLocationType && { jobLocationType }),
    ...(jobLocation && { jobLocation }),
    ...(applicantLocations && applicantLocations.length > 0 && {
      applicantLocationRequirements: applicantLocations,
    }),
    ...(baseSalary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: baseSalary.currency,
        value: {
          "@type": "QuantitativeValue",
          ...(baseSalary.amount && { value: baseSalary.amount }),
          ...(baseSalary.unitText && { unitText: baseSalary.unitText }),
        },
      },
    }),
    ...(responsibilities.length > 0 && { responsibilities }),
    ...(qualifications.length > 0 && { qualifications }),
    directApply,
    url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...schema,
        }),
      }}
    />
  )
}

export function ProductSchema({
  productId,
  name,
  description,
  sku,
  url,
  offer,
  aggregateRating,
}: {
  productId: string
  name: string
  description: string
  sku?: string
  url: string
  offer: {
    name?: string
    description?: string
    price?: string
    priceCurrency?: string
    priceRange?: string
    businessFunction?: string
    availability?: string
    validFrom?: string
  }
  aggregateRating?: AggregateRating
}) {
  const offerSchema: Offer = {
    "@type": "Offer",
    "@id": `https://design-prism.com/#${productId}-offer`,
    name: offer.name || `${name} offer`,
    description: offer.description || description,
    businessFunction: offer.businessFunction || "http://purl.org/goodrelations/v1#ProvideService",
    seller: {
      "@id": "https://design-prism.com/#organization",
    },
    itemOffered: {
      "@type": "Service",
      name,
      description,
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      ...(offer.price && { price: offer.price }),
      ...(offer.priceCurrency && { priceCurrency: offer.priceCurrency }),
      ...(offer.priceRange && { priceRange: offer.priceRange }),
    },
    availability: offer.availability || "https://schema.org/InStock",
    ...(offer.validFrom && { validFrom: offer.validFrom }),
  }

  const productSchema: Product = {
    "@type": "Product",
    "@id": `https://design-prism.com/#${productId}`,
    name,
    description,
    brand: {
      "@type": "Brand",
      name: "Prism",
    },
    ...(sku && { sku }),
    url,
    offers: offerSchema,
    ...(aggregateRating && { aggregateRating }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...productSchema,
        }),
      }}
    />
  )
}

export function PodcastSeriesSchema({
  seriesId,
  name,
  description,
  url,
  image,
  sameAs,
  inLanguage = "en-US",
  publisherName = "Prism",
}: {
  seriesId: string
  name: string
  description: string
  url: string
  image?: string
  sameAs?: string[]
  inLanguage?: string
  publisherName?: string
}) {
  const seriesSchema: PodcastSeries = {
    "@type": "PodcastSeries",
    "@id": `https://design-prism.com/#${seriesId}`,
    name,
    description,
    url,
    ...(image && { image }),
    ...(sameAs && { sameAs }),
    inLanguage,
    author: {
      "@type": "Person",
      name: "Enzo Sison",
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...seriesSchema,
        }),
      }}
    />
  )
}

export function PodcastEpisodeSchema({
  episodeId,
  seriesId,
  name,
  description,
  url,
  audioUrl,
  videoUrl,
  thumbnailUrl,
  datePublished,
  duration,
}: {
  episodeId: string
  seriesId: string
  name: string
  description: string
  url: string
  audioUrl?: string
  videoUrl?: string
  thumbnailUrl?: string
  datePublished?: string
  duration?: string
}) {
  const episodeSchema: PodcastEpisode = {
    "@type": "PodcastEpisode",
    "@id": `https://design-prism.com/#${episodeId}`,
    partOfSeries: {
      "@id": `https://design-prism.com/#${seriesId}`,
    },
    name,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(duration && { duration }),
    ...(audioUrl || videoUrl
      ? {
          associatedMedia: {
            "@type": "MediaObject",
            ...(audioUrl && { contentUrl: audioUrl }),
            ...(videoUrl && { embedUrl: videoUrl }),
            ...(thumbnailUrl && { thumbnailUrl }),
          },
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...episodeSchema,
        }),
      }}
    />
  )
}

export function SoftwareApplicationSchema({
  appId,
  name,
  description,
  applicationCategory,
  operatingSystems,
  url,
  offer,
  aggregateRating,
}: {
  appId: string
  name: string
  description: string
  applicationCategory: string
  operatingSystems: string[]
  url: string
  offer?: {
    price?: string
    priceCurrency?: string
    priceRange?: string
  }
  aggregateRating?: AggregateRating
}) {
  const appSchema: SoftwareApplication = {
    "@type": "SoftwareApplication",
    "@id": `https://design-prism.com/#${appId}`,
    name,
    description,
    applicationCategory,
    operatingSystem: operatingSystems,
    url,
    ...(offer && {
      offers: {
        "@type": "Offer",
        "@id": `https://design-prism.com/#${appId}-offer`,
        name: `${name} access`,
        description,
        businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
        seller: {
          "@id": "https://design-prism.com/#organization",
        },
        itemOffered: {
          "@type": "Service",
          name,
          description,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          ...(offer.price && { price: offer.price }),
          ...(offer.priceCurrency && { priceCurrency: offer.priceCurrency }),
          ...(offer.priceRange && { priceRange: offer.priceRange }),
        },
        availability: "https://schema.org/InStock",
      },
    }),
    ...(aggregateRating && { aggregateRating }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...appSchema,
        }),
      }}
    />
  )
}

export function DatasetSchema({
  datasetId,
  name,
  description,
  url,
  keywords,
  variableMeasured,
  distribution,
}: {
  datasetId: string
  name: string
  description: string
  url: string
  keywords?: string[]
  variableMeasured?: string[]
  distribution?: {
    contentUrl: string
    encodingFormat?: string
  }[]
}) {
  const dataset: Dataset = {
    "@type": "Dataset",
    "@id": `https://design-prism.com/#${datasetId}`,
    name,
    description,
    url,
    creator: {
      "@type": "Organization",
      name: "Prism",
      url: "https://www.design-prism.com",
    },
    ...(keywords && { keywords }),
    ...(variableMeasured && { variableMeasured }),
    ...(distribution && {
      distribution: distribution.map((item) => ({
        "@type": "DataDownload",
        contentUrl: item.contentUrl,
        ...(item.encodingFormat && { encodingFormat: item.encodingFormat }),
      })),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...dataset,
        }),
      }}
    />
  )
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  supplies,
  tools,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
  totalTime?: string
  supplies?: string[]
  tools?: string[]
}) {
  const schema: HowTo = {
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    ...(totalTime && { totalTime }),
    ...(supplies &&
      supplies.length > 0 && {
        supply: supplies.map((item) => ({
          "@type": "HowToSupply",
          name: item,
        })),
      }),
    ...(tools &&
      tools.length > 0 && {
        tool: tools.map((item) => ({
          "@type": "HowToTool",
          name: item,
        })),
      }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...schema,
        }),
      }}
    />
  )
}
