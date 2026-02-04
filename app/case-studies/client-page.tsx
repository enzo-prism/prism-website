import Breadcrumbs from "@/components/breadcrumbs"
import CaseStudiesList from "@/components/case-studies/CaseStudiesList"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CollectionPageSchema, ItemListSchema } from "@/components/schema-markup"
import { CASE_STUDIES } from "@/lib/case-study-data"

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ name: "home", url: "/" }, { name: "case studies", url: "/case-studies" }]} />
        </div>
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">case studies</p>
              <h1 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">
                recent client work
              </h1>
            </div>

            <CaseStudiesList studies={CASE_STUDIES} />
          </div>
        </section>
      </main>
      <Footer />
      <CollectionPageSchema
        name="Prism case studies"
        description="Growth wins from Prism clients across dental, local, nonprofit, and consulting businesses."
        url="https://www.design-prism.com/case-studies"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <ItemListSchema
        name="Prism case study highlights"
        url="https://www.design-prism.com/case-studies"
        items={CASE_STUDIES.map((study) => ({
          name: study.title,
          description: study.description,
          url: `https://www.design-prism.com/case-studies/${study.slug}`,
          itemType: "CaseStudy",
        }))}
      />
    </div>
  )
}
