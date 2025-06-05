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
    "@id": "https://prism.agency/#organization",
    name: "Prism Agency",
    url: "https://prism.agency",
    logo: {
      "@type": "ImageObject",
      url: "https://prism.agency/transparent-prism-logo.png",
      width: 600,
      height: 60,
    },
    sameAs: ["https://www.instagram.com/prism.agency", "https://www.linkedin.com/company/prism-agency"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-123-4567",
      contactType: "customer service",
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
    "@id": "https://prism.agency/#website",
    url: "https://prism.agency",
    name: "Prism Agency",
    description:
      "Digital agency creating websites, apps, and designs that shatter revenue goals and delight customers.",
    publisher: {
      "@id": "https://prism.agency/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://prism.agency/search?q={search_term_string}",
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
      "@id": "https://prism.agency/#organization",
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

// Add the FAQSchema component after the BlogPostSchema component

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
