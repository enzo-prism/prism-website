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
  return <AffiliateClientPage />
}
