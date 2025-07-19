import Script from "next/script"

interface IndustryResult {
  id: string
  name: string
  icon: React.ReactNode
  ltv: number
  monthlyCustomers: number
  monthlyValue: number
  investmentMin: number
  investmentMax: number
  roiMin: number
  roiMax: number
  caseStudies: Array<{
    name: string
    link?: string
  }>
}

interface IndustryResultsSchemaProps {
  results: IndustryResult[]
}

export function IndustryResultsSchema({ results }: IndustryResultsSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Prism Agency ROI by Industry",
    "description": "Digital marketing ROI results across different industries",
    "provider": {
      "@type": "Organization",
      "name": "Prism Agency",
      "url": "https://design-prism.com"
    },
    "serviceType": "Digital Marketing ROI",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Industry-specific ROI Results",
      "itemListElement": results.map((industry, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "name": `${industry.name} Digital Marketing`,
        "description": `Generate ${industry.roiMin}x-${industry.roiMax}x ROI for ${industry.name.toLowerCase()} businesses`,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": industry.investmentMin,
          "maxPrice": industry.investmentMax,
          "priceCurrency": "USD",
          "unitText": "per month"
        },
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": industry.monthlyCustomers,
          "unitText": "new customers per month"
        },
        "businessFunction": "Marketing",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Customer Lifetime Value",
            "value": industry.ltv,
            "unitText": "USD"
          },
          {
            "@type": "PropertyValue",
            "name": "Monthly Value Generated",
            "value": industry.monthlyValue,
            "unitText": "USD"
          },
          {
            "@type": "PropertyValue",
            "name": "ROI Range",
            "minValue": industry.roiMin,
            "maxValue": industry.roiMax,
            "unitText": "x"
          }
        ]
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <Script
      id="industry-results-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}