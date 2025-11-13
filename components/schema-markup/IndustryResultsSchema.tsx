import { DatasetSchema } from "@/components/schema-markup"

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
  const keywords = results.map((industry) => `${industry.name} roi`)
  const variables = [
    ...new Set(
      results.flatMap((industry) => [
        `${industry.name} customer lifetime value`,
        `${industry.name} monthly customers`,
        `${industry.name} monthly revenue potential`,
        `${industry.name} marketing investment range`,
      ])
    ),
  ]

  return (
    <DatasetSchema
      datasetId="industry-roi"
      name="Prism industry ROI dataset"
      description="Modeled customer lifetime value, monthly demand, suggested marketing investment, and ROI bands for Prism focus industries."
      url="https://www.design-prism.com/#industry-results"
      keywords={keywords}
      variableMeasured={variables}
      distribution={[
        {
          contentUrl: "https://www.design-prism.com/#industry-results",
          encodingFormat: "text/html",
        },
      ]}
    />
  )
}
