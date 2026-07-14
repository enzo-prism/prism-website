import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { FAQSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'FAQ',
  description: 'Answers about Prism pricing, timelines, services, and how our website, SEO, ads, and growth work fits together.',
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
    answer: "A Prism website is a flat $300, one-time. That covers design, build, and launch, with an optional $100/month care plan for hosting-level upkeep, edits, and support. For bigger systems — Content OS, Dental OS, or Prism Infinity — see the pricing page."
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
    answer: "Our digital marketing approach combines SEO, paid ads, conversion-focused creative, reviews, local visibility, and clear analytics. Content OS installs a content engine that compounds, and Prism Infinity covers every Prism service under one monthly plan when you want us running the whole system."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes. Websites can add a $100/month care plan for updates, edits, and support. For ongoing growth across everything — websites, content, SEO, ads, and more — Prism Infinity is $2,000/month with unlimited requests, one at a time."
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
    answer: "Simple flat pricing: the Website is $300 one-time, Content OS is $5,000 to implement over 3 months then $1,000/month, Dental OS is custom-quoted after a call, and Prism Infinity is $2,000/month. You can also start free — create a Growth Dashboard and request a free deep audit from the team."
  },
  {
    question: "How do you measure success?",
    answer: "We track key performance indicators including conversion rates, page load speeds, search engine rankings, lead generation, and revenue attribution. We provide detailed reports and work with you to continuously optimize performance based on real data."
  }
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <header className="mb-14 sm:mb-20">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
                FAQ
              </p>
              <h1 className="mt-4 text-balance font-sans text-[clamp(2.05rem,4.8vw,3.65rem)] font-medium leading-[1] tracking-[-0.05em] text-[#f5f0e8]">
                Frequently asked questions
              </h1>
              <p className="mt-5 max-w-[44rem] text-pretty font-sans text-[1.05rem] leading-7 text-[#b8afa2]">
                Answers to common questions about our web development, app
                development, and digital marketing services.
              </p>
            </header>

            <dl className="divide-y divide-white/12 border-y border-white/12">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-7 sm:py-8">
                  <dt className="font-sans text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-[#f5f0e8]">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-pretty font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 sm:mt-20">
              <h2 className="font-sans text-[1.7rem] font-medium leading-tight tracking-[-0.03em] text-[#f5f0e8]">
                Still have questions?
              </h2>
              <p className="mt-3 max-w-[40rem] text-pretty font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                We&apos;re here to help. Get in touch with the team for
                personalized answers.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="mailto:support@design-prism.com"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#f5f0e8] px-6 font-sans text-[0.95rem] font-medium text-[#050505] transition-colors hover:bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Email us
                </a>
                <a
                  href="/get-started"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/16 bg-white/[0.03] px-6 font-sans text-[0.95rem] font-medium text-[#f5f0e8] transition-colors hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
    </div>
  )
}
