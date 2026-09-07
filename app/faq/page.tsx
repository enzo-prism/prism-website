import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FAQSchema } from '@/components/schema-markup'
import type { Metadata } from 'next'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'FAQ',
  description:
    'Answers about Prism pricing, timelines, services, and how our website, SEO, ads, and growth work fits together.',
  path: '/faq',
  ogImage: '/prism-opengraph.png',
})

const faqs = [
  {
    question: 'What makes Prism different?',
    answer:
      'We bring website design, engineering, content, and ads together around your business goals. You get a team that can build the work and help you understand its performance. Our case studies show dated results and their sources.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'Pricing depends on your pages, content, features, and integrations. Start with a 30-minute Zoom call to discuss your goals. We confirm the scope and price before work begins, including any optional ongoing care.',
  },
  {
    question: "What's included in a Prism website?",
    answer:
      'Custom design and development, mobile layouts, search foundations, and analytics. We agree on the pages, features, content, and integrations with you before building. Hosting, updates, and ongoing edits are available through optional Website Care.',
  },
  {
    question: 'How long does a website project take?',
    answer:
      'Timing depends on the scope, content readiness, integrations, and review process. Tell us your target launch date on the intake or scoping call. We will agree on a realistic schedule before work begins.',
  },
  {
    question: 'Do you work with small businesses?',
    answer:
      'Yes. We work with owners who want a stronger website, more consistent content, or help reaching customers through ads. You can start with one project and add support as your needs change.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'Our work includes dental practices, retailers, professional services, and other local businesses. Dental marketing is a particular specialty. Explore our case studies to see projects closest to your own.',
  },
  {
    question: 'Do you offer mobile app development?',
    answer:
      'Yes. App development is scoped as a custom project. Share what the app needs to do, who will use it, and any integrations so we can discuss the right approach.',
  },
  {
    question: 'How do your marketing services work together?',
    answer:
      'Your website explains the offer, content helps people understand and trust your business, and ads bring it to a relevant audience. We help you decide which part needs attention first and what to measure.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer:
      'Yes. Website Care covers agreed hosting, updates, and edits after launch. Content OS supports ongoing content work, and Prism Infinity handles a queue of creative and growth requests, one at a time. We scope the right plan on a call.',
  },
  {
    question: 'What happens after the first call?',
    answer:
      'We confirm the scope, price, and next steps with you. Once approved, we gather the content and access needed, build the work, and review it with you before launch.',
  },
  {
    question: 'Can you improve my existing website?',
    answer:
      'Yes. Share your site and what is getting in the way. We can assess the design, speed, search visibility, and path to an inquiry, then recommend focused improvements or a rebuild if needed.',
  },
  {
    question: 'What results can I expect?',
    answer:
      'Results depend on your market, starting point, scope, and time frame. We agree on what success means for your business and use available data to track progress. Our case studies include the measurement periods and sources behind reported results.',
  },
  {
    question: 'Can you add AI features to my website?',
    answer:
      'Yes, where they serve a clear purpose. Tell us what you want customers or your team to do more easily. We can assess an assistant, workflow, or other integration as part of the project scope.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Payment terms are included with your agreed scope before work starts. Book a 30-minute Zoom call to discuss a project, or begin with a free Growth Dashboard and request a free audit from the team.',
  },
  {
    question: 'How do you measure success?',
    answer:
      'We choose measures that match your goals, such as search visibility, website inquiries, calls, or bookings. We review the available data with you and distinguish observed results from estimates or gaps in tracking.',
  },
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
                What to expect from your project, from the first conversation
                through launch and ongoing support.
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
                Send us your question and a link to your business. We can help
                you choose a useful next step.
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
