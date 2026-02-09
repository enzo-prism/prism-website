import React from "react"

const renderJsonLd = (data: unknown) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
)

type BreadcrumbItem = { name: string; url: string }

interface CaseStudySchemaProps {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished?: string
  dateModified?: string
  clientName?: string
  outcome?: string
  breadcrumbs?: BreadcrumbItem[]
  organization?: {
    name: string
    url: string
    logo?: string
    sameAs?: string[]
  }
  video?: {
    name: string
    description: string
    embedUrl: string
    uploadDate?: string
    thumbnailUrl?: string
  }
  faq?: { question: string; answer: string }[]
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
  breadcrumbs,
  organization,
  video,
  faq,
}: CaseStudySchemaProps) {
  const schema: Record<string, unknown>[] = []

  if (breadcrumbs && breadcrumbs.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    })
  }

  const organizationId = organization?.url ? `${organization.url}#organization` : undefined
  const webpageId = `${url}#webpage`
  const videoId = video ? `${url}#video` : undefined

  schema.push({
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: title,
    description,
    url,
    mainEntityOfPage: webpageId,
    image: imageUrl,
    datePublished,
    dateModified,
    about: clientName,
    provider: organizationId ? { "@id": organizationId } : undefined,
    subjectOf: videoId ? { "@id": videoId } : undefined,
    outcome,
  })

  schema.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url,
    name: title,
    description,
    primaryImageOfPage: imageUrl,
  })

  if (organization && organizationId) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: organization.name,
      url: organization.url,
      logo: organization.logo,
      sameAs: organization.sameAs,
    })
  }

  if (video && videoId) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": videoId,
      name: video.name,
      description: video.description,
      embedUrl: video.embedUrl,
      uploadDate: video.uploadDate,
      thumbnailUrl: video.thumbnailUrl ?? imageUrl,
      publisher: organizationId ? { "@id": organizationId } : undefined,
    })
  }

  if (faq && faq.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    })
  }

  return renderJsonLd(schema)
}

export function GlobalSchemaGraph() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.design-prism.com/#organization",
    name: "Prism",
    url: "https://www.design-prism.com",
    logo: "https://www.design-prism.com/prism-logo.jpeg",
    sameAs: [
      "https://www.instagram.com/the_design_prism/",
      "https://www.youtube.com/@the_design_prism",
      "https://x.com/NosisTheGod",
      "https://www.tiktok.com/@the_design_prism",
      "https://www.linkedin.com/company/web-prism/?viewAsMember=true",
    ],
  }

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.design-prism.com/#localbusiness",
    name: "Prism",
    url: "https://www.design-prism.com",
    image: "https://www.design-prism.com/prism-opengraph.png",
    logo: "https://www.design-prism.com/prism-logo.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "548 Market St #62411",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94104",
      addressCountry: "US",
    },
    areaServed: "US",
    sameAs: organization.sameAs,
    parentOrganization: { "@id": "https://www.design-prism.com/#organization" },
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.design-prism.com/#website",
    name: "Prism",
    url: "https://www.design-prism.com",
    publisher: { "@id": "https://www.design-prism.com/#organization" },
  }

  return renderJsonLd([organization, localBusiness, website])
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return renderJsonLd(schema)
}

interface WebPageSchemaProps {
  name: string
  description?: string
  url: string
  image?: string | string[]
  isPartOfId?: string
}

export function WebPageSchema({ name, description, url, image, isPartOfId }: WebPageSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    primaryImageOfPage: image,
    isPartOf: isPartOfId ? { "@id": isPartOfId } : undefined,
  }

  return renderJsonLd(data)
}

interface CollectionPageSchemaProps {
  name: string
  description?: string
  url: string
  isPartOfId?: string
}

export function CollectionPageSchema({ name, description, url, isPartOfId }: CollectionPageSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name,
    description,
    url,
    isPartOf: isPartOfId ? { "@id": isPartOfId } : undefined,
  }

  return renderJsonLd(data)
}

type ItemListEntry = {
  name: string
  url: string
  description?: string
  image?: string | string[]
  itemType?: string
}

interface ItemListSchemaProps {
  id?: string
  name: string
  items: ItemListEntry[]
  itemType?: string
  url?: string
}

export function ItemListSchema({ id, name, items, itemType = "CreativeWork", url }: ItemListSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": id || (url ? `${url}#itemlist` : undefined),
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": item.itemType || itemType,
        name: item.name,
        description: item.description,
        url: item.url,
        image: item.image,
      },
    })),
  }

  return renderJsonLd(data)
}

interface PersonSchemaProps {
  personId: string
  name: string
  jobTitle: string
  description: string
  image: string
  url: string
  sameAs?: string[]
}

export function PersonSchema({ personId, name, jobTitle, description, image, url, sameAs }: PersonSchemaProps) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#${personId}`,
    name,
    jobTitle,
    description,
    image,
    url,
    sameAs,
  }

  return renderJsonLd(node)
}

interface BlogPostSchemaProps {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
}

export function BlogPostSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName = "Prism",
}: BlogPostSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    image: imageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.design-prism.com/#organization",
      name: "Prism",
      logo: {
        "@type": "ImageObject",
        url: "https://www.design-prism.com/prism-logo.jpeg",
      },
    },
  }

  return renderJsonLd(data)
}

interface HowToSchemaProps {
  name: string
  description: string
  totalTime?: string
  supplies?: string[]
  tools?: string[]
  steps: { name: string; text: string }[]
}

export function HowToSchema({ name, description, totalTime, supplies, tools, steps }: HowToSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    supply: supplies?.map((item) => ({ "@type": "HowToSupply", name: item })),
    tool: tools?.map((item) => ({ "@type": "HowToTool", name: item })),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }

  return renderJsonLd(data)
}

interface FAQSchemaProps {
  questions: { question: string; answer: string }[]
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  if (!questions || questions.length === 0) return null

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  }

  return renderJsonLd(data)
}

interface ServiceSchemaProps {
  serviceId: string
  name: string
  description: string
  serviceType?: string
  areaServed?: string | string[]
  offerDetails?: {
    name: string
    description?: string
    price?: string
    priceCurrency?: string
    priceRange?: string
    billingPeriod?: string
    availability?: string
    businessFunction?: string
    url?: string
  }
  aggregateRating?: Record<string, unknown>
}

export function ServiceSchema({
  serviceId,
  name,
  description,
  serviceType,
  areaServed,
  offerDetails,
  aggregateRating,
}: ServiceSchemaProps) {
  const offer =
    offerDetails &&
    Object.keys(offerDetails).length > 0
      ? {
          "@type": "Offer",
          name: offerDetails.name,
          description: offerDetails.description,
          price: offerDetails.price,
          priceCurrency: offerDetails.priceCurrency,
          priceSpecification:
            offerDetails.priceRange || offerDetails.billingPeriod
              ? {
                  "@type": "PriceSpecification",
                  price: offerDetails.price,
                  priceCurrency: offerDetails.priceCurrency,
                  billingPeriod: offerDetails.billingPeriod,
                  priceRange: offerDetails.priceRange,
                }
              : undefined,
          priceRange: offerDetails.priceRange,
          availability: offerDetails.availability,
          businessFunction: offerDetails.businessFunction,
          url: offerDetails.url,
        }
      : undefined

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.design-prism.com/#${serviceId}`,
    name,
    description,
    serviceType,
    areaServed,
    provider: {
      "@type": "Organization",
      "@id": "https://www.design-prism.com/#organization",
      name: "Prism",
      url: "https://www.design-prism.com",
    },
    offers: offer,
    aggregateRating,
  }

  return renderJsonLd(data)
}

interface VideoObjectSchemaProps {
  videoId: string
  name: string
  description: string
  thumbnailUrl: string
  uploadDate?: string
  embedUrl?: string
  contentUrl?: string
  creatorName?: string
  duration?: string
}

export function VideoObjectSchema({
  videoId,
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  contentUrl,
  creatorName,
  duration,
}: VideoObjectSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${contentUrl || embedUrl || videoId}#${videoId}`,
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl,
    contentUrl: contentUrl || embedUrl,
    creator: creatorName
      ? {
          "@type": "Person",
          name: creatorName,
        }
      : undefined,
    duration,
  }

  return renderJsonLd(data)
}

interface PodcastSeriesSchemaProps {
  seriesId: string
  name: string
  description: string
  url: string
  image?: string
  sameAs?: string[]
}

export function PodcastSeriesSchema({ seriesId, name, description, url, image, sameAs }: PodcastSeriesSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": `${url}#${seriesId}`,
    name,
    description,
    url,
    image,
    sameAs,
  }

  return renderJsonLd(data)
}

interface PodcastEpisodeSchemaProps {
  episodeId: string
  seriesId: string
  name: string
  description: string
  url: string
  videoEmbedUrl?: string
  videoContentUrl?: string
  thumbnailUrl?: string
  datePublished?: string
}

export function PodcastEpisodeSchema({
  episodeId,
  seriesId,
  name,
  description,
  url,
  videoEmbedUrl,
  videoContentUrl,
  thumbnailUrl,
  datePublished,
}: PodcastEpisodeSchemaProps) {
  const associatedMedia =
    videoEmbedUrl && thumbnailUrl && datePublished
      ? {
          "@type": "VideoObject",
          name,
          description,
          thumbnailUrl,
          uploadDate: datePublished,
          embedUrl: videoEmbedUrl,
          contentUrl: videoContentUrl || videoEmbedUrl,
        }
      : undefined

  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `${url}#${episodeId}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      "@id": `https://www.design-prism.com/podcast#${seriesId}`,
    },
    name,
    description,
    url,
    datePublished,
    associatedMedia,
  }

  return renderJsonLd(data)
}

interface SoftwareApplicationSchemaProps {
  appId: string
  name: string
  description: string
  applicationCategory?: string
  operatingSystems?: string[]
  url?: string
}

export function SoftwareApplicationSchema({
  appId,
  name,
  description,
  applicationCategory,
  operatingSystems,
  url,
}: SoftwareApplicationSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url || "https://www.design-prism.com/apps"}#${appId}`,
    name,
    description,
    applicationCategory,
    operatingSystem: operatingSystems,
    offers: url
      ? {
          "@type": "Offer",
          url,
        }
      : undefined,
  }

  return renderJsonLd(data)
}

interface JobPostingSchemaProps {
  jobId: string
  title: string
  description: string
  employmentType: string
  datePosted: string
  validThrough?: string
  url: string
  jobLocation?: Record<string, unknown>
  applicantLocations?: Record<string, unknown>[]
  responsibilities?: string[]
  qualifications?: string[]
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
  responsibilities,
  qualifications,
}: JobPostingSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${url}#${jobId}`,
    title,
    description,
    employmentType,
    datePosted,
    validThrough,
    hiringOrganization: {
      "@type": "Organization",
      name: "Prism",
      sameAs: "https://www.design-prism.com",
    },
    jobLocation,
    applicantLocationRequirements: applicantLocations,
    responsibilities,
    qualifications,
  }

  return renderJsonLd(data)
}

export function ContactPageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Prism",
    url: "https://www.design-prism.com/contact",
    description: "Get in touch with Prism for web, app, and growth projects.",
  }

  return renderJsonLd(data)
}

interface ProductSchemaProps {
  productId: string
  name: string
  description: string
  url: string
  image?: string | string[]
  offer?: {
    name?: string
    description?: string
    price?: string | number
    priceCurrency?: string
    availability?: string
  }
  aggregateRating?: Record<string, unknown>
}

export function ProductSchema({ productId, name, description, url, image, offer, aggregateRating }: ProductSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#${productId}`,
    name,
    description,
    image,
    url,
    offers: offer
      ? {
          "@type": "Offer",
          name: offer.name,
          description: offer.description,
          price: offer.price,
          priceCurrency: offer.priceCurrency,
          availability: offer.availability,
          url,
        }
      : undefined,
    aggregateRating,
  }

  return renderJsonLd(data)
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.design-prism.com/#organization",
    name: "Prism",
    url: "https://www.design-prism.com",
    logo: "https://www.design-prism.com/prism-opengraph.png",
    sameAs: [
      "https://www.youtube.com/@the_design_prism",
      "https://x.com/NosisTheGod",
      "https://www.instagram.com/the_design_prism/",
      "https://www.linkedin.com/company/design-prism/",
    ],
  }

  return renderJsonLd(data)
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.design-prism.com/#website",
    url: "https://www.design-prism.com",
    name: "Prism",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.design-prism.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return renderJsonLd(data)
}

interface LocalBusinessSchemaProps {
  name: string
  url: string
  image?: string
  logo?: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion?: string
    postalCode?: string
    addressCountry: string
  }
  areaServed?: string | string[]
  sameAs?: string[]
  priceRange?: string
  telephone?: string
}

export function LocalBusinessSchema({
  name,
  url,
  image,
  logo,
  address,
  areaServed,
  sameAs,
  priceRange,
  telephone,
}: LocalBusinessSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name,
    url,
    image,
    logo,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    areaServed,
    sameAs,
    priceRange,
    telephone,
    parentOrganization: { "@id": "https://www.design-prism.com/#organization" },
  }

  return renderJsonLd(data)
}

interface DatasetSchemaProps {
  datasetId: string
  name: string
  description: string
  url: string
  keywords?: string[]
  variableMeasured?: string[]
  distribution?: Array<{ contentUrl: string; encodingFormat: string }>
}

export function DatasetSchema({
  datasetId,
  name,
  description,
  url,
  keywords,
  variableMeasured,
  distribution,
}: DatasetSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${url}#${datasetId}`,
    name,
    description,
    url,
    keywords,
    variableMeasured,
    distribution,
  }

  return renderJsonLd(data)
}

interface VideoSchemaProps {
  id: string
  name: string
  description: string
  thumbnailUrl: string | string[]
  uploadDate: string
  duration?: string
  contentUrl: string
  embedUrl: string
  width?: number
  height?: number
  creatorName?: string
  seekToActionTarget?: string
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
  creatorName,
  seekToActionTarget,
}: VideoSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${contentUrl}#${id}`,
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    width,
    height,
    creator: creatorName
      ? {
          "@type": "Person",
          name: creatorName,
        }
      : undefined,
    potentialAction: seekToActionTarget
      ? {
          "@type": "SeekToAction",
          target: seekToActionTarget,
          "startOffset-input": "required name=seek_to_second_number",
        }
      : undefined,
  }

  return renderJsonLd(data)
}
