import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { FAQSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "frequently asked questions | prism agency",
  description: "get answers to common questions about prism agency’s web, app, and marketing services, including pricing, timelines, and our ai-powered approach.",
  path: "/faq",
  ogImage: "/prism-opengraph.png",
})

const faqs = [
  {
    question: "What makes Prism different from other digital agencies?",
    answer: "Prism specializes in AI-powered solutions that focus on revenue growth, not just pretty designs. Our proven methodology, 'The Prism Method,' has helped businesses achieve 300%+ increases in conversions. We combine beautiful design with data-driven optimization to ensure every project delivers measurable results."
  },
  {
    question: "How much does a website cost?",
    answer: "Our core website offer is a Website Overhaul at $1,000 one-time. If you want ongoing execution beyond the rebuild, our Growth Partnership is $2,000/month. You can also start with a Free Expert Audit at $0."
  },
  {
    question: "What's included in your website development service?",
    answer: "Complete website design and development, AI-powered optimization, mobile responsiveness, SEO setup, hosting, SSL certificates, analytics integration, and ongoing support. We also include conversion optimization, speed optimization, and basic content management system training."
  },
  {
    question: "How long does it take to build a website?",
    answer: "Most websites are completed in 2-4 weeks, depending on complexity. Simple business websites take 2-3 weeks, while complex e-commerce or custom applications may take 4-8 weeks. We provide regular updates throughout the process and work efficiently to meet your launch goals."
  },
  {
    question: "Do you work with small businesses?",
    answer: "Yes! We specialize in helping small and medium businesses grow their revenue through beautiful, conversion-focused digital solutions. Many of our clients are local businesses, startups, and growing companies looking to establish a strong online presence."
  },
  {
    question: "What industries do you serve?",
    answer: "We work with businesses across all industries, with particular expertise in healthcare (dental practices), retail, professional services, e-commerce, and technology companies. Our case studies include successful projects with dental practices, retail stores, and service-based businesses."
  },
  {
    question: "Do you offer mobile app development?",
    answer: "Yes. We develop native and cross-platform apps as custom projects. App work is scoped separately from Prism's core website and growth offers, so pricing is quoted based on requirements, timeline, and integrations."
  },
  {
    question: "What is your digital marketing approach?",
    answer: "Our digital marketing approach combines SEO, paid ads, and conversion-focused creative with clear analytics. For teams that want this managed continuously, the core Growth Partnership is $2,000/month and includes website, SEO, ads, and design execution."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes. Ongoing support, optimization, and reporting are included in the $2,000/month Growth Partnership. If you only need a one-time build, the Website Overhaul at $1,000 includes launch support and handoff."
  },
  {
    question: "What is 'The Prism Method'?",
    answer: "The Prism Method is our proven 4-step process: 1) Discovery & Strategy (understanding your business goals), 2) Design & Prototyping (creating conversion-focused designs), 3) Development & Testing (building with AI optimization), and 4) Launch & Growth (deploying and optimizing for results)."
  },
  {
    question: "Can you help improve my existing website?",
    answer: "Absolutely! We offer website redesign and optimization services to improve your current site's performance, conversion rates, and user experience. We can also add new features, improve speed, and enhance SEO without starting from scratch."
  },
  {
    question: "What's your typical client ROI?",
    answer: "Our clients typically see 200-500% increases in online visibility, 150-300% increases in conversions, and significant improvements in lead generation within 3-6 months. Specific ROI varies by industry and business model, but we focus on measurable revenue growth."
  },
  {
    question: "Do you offer AI-powered website features?",
    answer: "Yes, we integrate AI-powered features like chatbots, personalization, predictive analytics, and automated optimization. These features help improve user experience, increase conversions, and provide valuable insights about your customers' behavior."
  },
  {
    question: "What's your payment structure?",
    answer: "Website Overhaul is billed as a one-time $1,000 project. Growth Partnership is billed monthly at $2,000/month. We also offer a Free Expert Audit at $0 so you can evaluate fit before committing."
  },
  {
    question: "How do you measure success?",
    answer: "We track key performance indicators including conversion rates, page load speeds, search engine rankings, lead generation, and revenue attribution. We provide detailed reports and work with you to continuously optimize performance based on real data."
  }
]

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                frequently asked questions
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our web development, app development, and digital marketing services.
              </p>
            </header>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                still have questions?
              </h2>
              <p className="text-gray-600 mb-8">
                We're here to help! Get in touch with our team for personalized answers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@design-prism.com"
                  className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Email Us
                </a>
                <a
                  href="/get-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {FREE_AUDIT_CTA_TEXT}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FAQSchema questions={faqs} />
    </>
  )
}
