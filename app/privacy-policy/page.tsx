import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { WebPageSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import Link from "next/link"

const PAGE_TITLE = "privacy policy | prism agency"
const PAGE_DESCRIPTION =
  "learn how prism agency collects, uses, and protects your personal information across our website and services."
const CANONICAL_URL = "https://www.design-prism.com/privacy-policy"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Agency Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 1, 2025"
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 lowercase">
                privacy policy
              </h1>
              <p className="text-gray-600">
                Last updated: {lastUpdated}
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">introduction</h2>
                <p className="text-gray-600 mb-4">
                  prism agency ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website design-prism.com, use our services, or engage with us in any way.
                </p>
                <p className="text-gray-600 mb-4">
                  Please read this privacy policy carefully. By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">information we collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">personal information</h3>
                <p className="text-gray-600 mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Fill out contact forms on our website</li>
                  <li>Subscribe to our newsletter or blog</li>
                  <li>Request a quote or consultation</li>
                  <li>Create an account or profile</li>
                  <li>Communicate with us via email, phone, or other channels</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Name and contact information (email address, phone number, mailing address)</li>
                  <li>Business information (company name, industry, website)</li>
                  <li>Project requirements and preferences</li>
                  <li>Payment and billing information</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">automatically collected information</h3>
                <p className="text-gray-600 mb-4">
                  When you visit our website, we automatically collect certain information about your device and usage, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Device information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">how we use your information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">cookies and tracking technologies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. These technologies may include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li><strong>Cookies:</strong> Small data files stored on your device</li>
                  <li><strong>Web Beacons:</strong> Electronic images used to count users who have visited certain pages</li>
                  <li><strong>Analytics Tools:</strong> Google Analytics, Hotjar, and similar services to understand how visitors use our site</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">sharing your information</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                  <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for any other purpose</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">data security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">your rights and choices</h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                  <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">children's privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">international data transfers</h2>
                <p className="text-gray-600 mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. By using our services, you consent to the transfer of information to countries outside of your country of residence.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">third-party links</h2>
                <p className="text-gray-600 mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">changes to this privacy policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">contact us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 font-semibold mb-2">prism agency</p>
                  <p className="text-gray-600">Email: <a href="mailto:support@design-prism.com" className="text-blue-600 hover:underline">support@design-prism.com</a></p>
                  <p className="text-gray-600">Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">(123) 456-7890</a></p>
                  <p className="text-gray-600">Website: <Link href="/" className="text-blue-600 hover:underline">design-prism.com</Link></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
