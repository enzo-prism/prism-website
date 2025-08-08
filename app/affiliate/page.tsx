import type { Metadata } from "next"
import AffiliateClientPage from "./client-page"

export const metadata: Metadata = {
  title: "earn up to $9.6k per referral | prism affiliate program",
  description:
    "join prism's lucrative affiliate program and earn 20% recurring commissions. simple 3-step process: refer businesses, we close the deal, you get paid monthly. perfect for consultants, agencies, and business connectors.",
  openGraph: {
    title: "earn up to $9.6k per referral | prism affiliate program",
    description:
      "join prism's lucrative affiliate program and earn 20% recurring commissions. simple 3-step process: refer businesses, we close the deal, you get paid monthly. perfect for consultants, agencies, and business connectors.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/affiliate",
  },
}

export default function AffiliatePage() {
  return (
    <>
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">how it works</h2>
            <p>
              refer a business, we scope and close the project, you earn 20% recurring commission.
              payouts are monthly, with transparent tracking and zero minimums.
            </p>
          </div>
        </div>
      </section>
      <AffiliateClientPage />
    </>
  )
}
