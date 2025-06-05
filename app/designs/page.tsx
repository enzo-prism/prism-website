import type { Metadata } from "next"
import DesignsPageClient from "./DesignsPageClient"
import { FAQSchema } from "@/components/schema-markup"

// Design services FAQs
const designFaqs = [
  {
    question: "what types of design services do you offer?",
    answer:
      "we provide a comprehensive range of design services including brand identity (logos, color palettes, typography), marketing materials (brochures, business cards, flyers), digital assets (social media graphics, email templates, web banners), packaging design, environmental graphics, and custom illustrations. all our designs are created with both aesthetic appeal and strategic business goals in mind.",
  },
  {
    question: "how does your design process work?",
    answer:
      "our design process begins with a discovery phase to understand your brand, audience, and objectives. we then create concept designs, gather your feedback, refine the designs, and deliver final files in all formats you need. we maintain open communication throughout and offer unlimited revisions during the concept phase to ensure you're completely satisfied with the final result.",
  },
  {
    question: "how much do your design services cost?",
    answer:
      "our design services are priced based on project scope and complexity. logo and brand identity packages typically range from $1,500 to $5,000. individual design projects like brochures or social media templates start at $500. we also offer monthly design subscriptions starting at $997/month for businesses needing ongoing design support. we provide detailed quotes after understanding your specific requirements.",
  },
  {
    question: "how long do design projects take to complete?",
    answer:
      "project timelines vary based on complexity. logo and brand identity projects typically take 2-4 weeks from start to finish. smaller projects like social media graphics can be completed in 3-5 business days. we'll provide a specific timeline during our initial consultation and keep you updated on progress throughout the project.",
  },
  {
    question: "what file formats will i receive for my designs?",
    answer:
      "we provide all designs in multiple formats suitable for both print and digital use. this typically includes vector files (ai, eps, svg), editable files (psd, indd), and ready-to-use formats (pdf, jpg, png). we also provide brand guidelines and templates when applicable to ensure consistent implementation across all channels.",
  },
  {
    question: "do you offer rush services for urgent design needs?",
    answer:
      "yes, we offer expedited design services for time-sensitive projects at an additional fee. depending on our current workload and the complexity of your project, we can often accommodate rush requests with 24-72 hour turnarounds. please contact us directly about your urgent design needs so we can provide specific timing and pricing options.",
  },
]

export const metadata: Metadata = {
  title: "graphic design portfolio & creative services | prism",
  description:
    "browse our collection of award-winning designs including logos, branding, marketing materials, and social media graphics. see how professional design can elevate your brand and capture attention.",
  openGraph: {
    title: "graphic design portfolio & creative services | prism",
    description:
      "browse our collection of award-winning designs including logos, branding, marketing materials, and social media graphics. see how professional design can elevate your brand and capture attention.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://prism.agency/designs",
  },
}

export default function DesignsPage() {
  return (
    <>
      <DesignsPageClient />
      <FAQSchema questions={designFaqs} />
    </>
  )
}
