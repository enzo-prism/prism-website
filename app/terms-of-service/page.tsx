import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "terms of service | prism agency",
  description: "read prism agency’s terms and conditions for using our web development, app development, and digital marketing services.",
  openGraph: {
    title: "terms of service | prism agency",
    description: "read prism agency’s terms and conditions for using our services.",
    url: "https://www.design-prism.com/terms-of-service",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Agency Terms of Service",
      },
    ],
  },
  alternates: {
    canonical: "https://www.design-prism.com/terms-of-service",
  },
}

export default function TermsOfServicePage() {
  const lastUpdated = "January 1, 2025"
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 lowercase">
                terms of service
              </h1>
              <p className="text-gray-600">
                Last updated: {lastUpdated}
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. acceptance of terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using the services provided by prism agency ("we," "our," or "us") through our website design-prism.com, you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
                <p className="text-gray-600 mb-4">
                  We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of our services following any changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. services description</h2>
                <p className="text-gray-600 mb-4">
                  prism agency provides various digital services including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Website design and development</li>
                  <li>Mobile application development</li>
                  <li>Digital marketing and SEO services</li>
                  <li>Graphic design and branding</li>
                  <li>AI-powered digital solutions</li>
                  <li>Ongoing maintenance and support</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  The specific scope of services will be outlined in individual project agreements or statements of work.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. client responsibilities</h2>
                <p className="text-gray-600 mb-4">
                  As a client, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Provide accurate and complete information necessary for project completion</li>
                  <li>Respond to requests for feedback or approval in a timely manner</li>
                  <li>Ensure all content provided does not infringe on third-party rights</li>
                  <li>Make payments according to the agreed schedule</li>
                  <li>Maintain confidentiality of any login credentials provided</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. payment terms</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">payment structure</h3>
                <p className="text-gray-600 mb-4">
                  Payment terms will be specified in individual project agreements. Standard terms include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>50% deposit upon project commencement</li>
                  <li>50% balance upon project completion</li>
                  <li>Monthly billing for ongoing services</li>
                  <li>Net 30 payment terms unless otherwise specified</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">late payments</h3>
                <p className="text-gray-600 mb-4">
                  Late payments may incur a fee of 1.5% per month or the maximum allowed by law. We reserve the right to suspend services for accounts that are more than 30 days overdue.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">refund policy</h3>
                <p className="text-gray-600 mb-4">
                  Refunds are evaluated on a case-by-case basis. Work already completed is non-refundable. Deposits may be refundable if the project has not commenced, subject to a processing fee.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. intellectual property</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ownership</h3>
                <p className="text-gray-600 mb-4">
                  Upon full payment, you will own the final deliverables created specifically for your project. We retain the right to use general methodologies, concepts, and know-how developed during the project.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">portfolio rights</h3>
                <p className="text-gray-600 mb-4">
                  We reserve the right to display completed work in our portfolio and marketing materials unless specifically agreed otherwise in writing.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">third-party materials</h3>
                <p className="text-gray-600 mb-4">
                  Any third-party materials (stock photos, fonts, plugins, etc.) are subject to their respective licenses. You are responsible for ongoing licensing fees for such materials.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. confidentiality</h2>
                <p className="text-gray-600 mb-4">
                  Both parties agree to maintain the confidentiality of any proprietary information received during the course of the business relationship. This obligation survives the termination of these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. warranties and disclaimers</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">service warranty</h3>
                <p className="text-gray-600 mb-4">
                  We warrant that our services will be performed in a professional and workmanlike manner. We will correct any defects in our work at no additional charge for a period of 30 days after delivery.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">disclaimer</h3>
                <p className="text-gray-600 mb-4">
                  EXCEPT AS EXPRESSLY PROVIDED HEREIN, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. limitation of liability</h2>
                <p className="text-gray-600 mb-4">
                  IN NO EVENT SHALL PRISM AGENCY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="text-gray-600 mb-4">
                  Our total liability for any claim arising out of or relating to these Terms or our services shall not exceed the amount paid by you for the specific service giving rise to the claim.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. indemnification</h2>
                <p className="text-gray-600 mb-4">
                  You agree to indemnify, defend, and hold harmless prism agency, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Your breach of these Terms</li>
                  <li>Your use of our services</li>
                  <li>Content you provide that infringes third-party rights</li>
                  <li>Your violation of applicable laws or regulations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. termination</h2>
                <p className="text-gray-600 mb-4">
                  Either party may terminate the service relationship with 30 days written notice. Upon termination:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>You must pay for all work completed up to the termination date</li>
                  <li>We will deliver all completed work and work in progress</li>
                  <li>All licenses for third-party materials must be transferred or terminated</li>
                  <li>Confidentiality obligations remain in effect</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. force majeure</h2>
                <p className="text-gray-600 mb-4">
                  Neither party shall be liable for any delay or failure to perform due to causes beyond their reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, labor disputes, or internet service interruptions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. dispute resolution</h2>
                <p className="text-gray-600 mb-4">
                  Any disputes arising from these Terms shall first be addressed through good faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. governing law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the United States and the state in which prism agency is registered, without regard to conflict of law principles.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. entire agreement</h2>
                <p className="text-gray-600 mb-4">
                  These Terms, together with any project agreements or statements of work, constitute the entire agreement between you and prism agency. Any modifications must be made in writing and signed by both parties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. severability</h2>
                <p className="text-gray-600 mb-4">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. contact information</h2>
                <p className="text-gray-600 mb-4">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 font-semibold mb-2">prism agency</p>
                  <p className="text-gray-600">Email: <a href="mailto:support@design-prism.com" className="text-blue-600 hover:underline">support@design-prism.com</a></p>
                  <p className="text-gray-600">Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">(123) 456-7890</a></p>
                  <p className="text-gray-600">Website: <Link href="/" className="text-blue-600 hover:underline">design-prism.com</Link></p>
                </div>
              </section>

              <section className="mt-12 p-6 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
