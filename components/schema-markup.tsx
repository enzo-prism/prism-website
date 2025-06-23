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
    "@id": "https://design-prism.com/#organization",
    name: "Prism Agency",
    url: "https://design-prism.com",
    logo: {
      "@type": "ImageObject",
      url: "https://design-prism.com/Prism Logo.png",
      width: 600,
      height: 60,
    },
    sameAs: [
      // Previous official links (review if these are still primary or should be removed/updated)
      "https://www.instagram.com/prism.agency",
      "https://www.linkedin.com/company/prism-agency",

      // Current/newly added social profiles
      "https://www.instagram.com/the_design_prism/",
      "https://www.youtube.com/@the_design_prism",
      "https://x.com/NosisTheGod",
      "https://www.tiktok.com/@the_design_prism",
      "https://www.linkedin.com/company/web-prism/?viewAsMember=true",
    ],
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
    "@id": "https://design-prism.com/#website",
    url: "https://design-prism.com",
    name: "Prism Agency",
    description:
      "Digital agency creating websites, apps, and designs that shatter revenue goals and delight customers.",
    publisher: {
      "@id": "https://design-prism.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://design-prism.com/search?q={search_term_string}",
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
      "@id": "https://design-prism.com/#organization",
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
  imageUrl: string
  datePublished: string
  dateModified: string
  clientName: string
  outcome: string
}) {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    headline: title,
    description,
    image: imageUrl,
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
    url: "https://www.design-prism.com/contact",
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
        url: "https://calendly.com/enzomarzorati/30min",
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
