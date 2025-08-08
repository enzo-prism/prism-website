import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism - beautiful software that grows revenue",
  description: "prism agency creates beautiful websites, apps, and designs that shatter revenue goals for ambitious businesses. ai-powered digital solutions that convert visitors into customers.",
}

export default function Home() {
  return (
    <>
      <section className="px-4 pt-6">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">what we do</h2>
            <p>
              prism builds websites, apps, and content systems that convert. we pair clean design with
              robust engineering and ai automation to turn traffic into revenue—for startups, practices,
              and local brands.
            </p>
          </div>
        </div>
      </section>
      <ClientPage />
    </>
  )
}
