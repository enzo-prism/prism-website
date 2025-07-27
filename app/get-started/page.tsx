import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"

export const metadata: Metadata = {
  title: "join prism's exclusive circle | limited to 10 partners monthly",
  description: "secure early access to prism's revenue-driving design innovations. priority consultations for first 50 applicants. curated partnerships for visionary startups and healthcare leaders.",
}

export default function GetStartedPage() {
  return <ClientGetStartedPage />
}
