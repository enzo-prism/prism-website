import type { Metadata } from "next"
import AppsClientPage from "./AppsClientPage"
import { FAQSchema } from "@/components/schema-markup"

// App development FAQs
const appFaqs = [
  {
    question: "how much does it cost to develop a mobile app?",
    answer:
      "our mobile app development typically ranges from $15,000 to $75,000 depending on complexity, features, and platforms (ios, android, or both). we offer milestone-based payment schedules to distribute costs throughout the development process. we provide detailed estimates after understanding your specific requirements during our initial consultation.",
  },
  {
    question: "how long does it take to build a mobile app?",
    answer:
      "the timeline for app development varies based on complexity and features. simple apps can be completed in 2-3 months, while more complex applications may take 4-8 months. our process includes discovery, design, development, testing, and deployment phases. we provide a detailed timeline during our kickoff meeting and keep you updated throughout the project.",
  },
  {
    question: "do you build for both ios and android?",
    answer:
      "yes! we develop native apps for both ios and android platforms, as well as cross-platform solutions using technologies like react native or flutter when appropriate. we'll recommend the best approach based on your target audience, feature requirements, and budget considerations to ensure the optimal user experience across all devices.",
  },
  {
    question: "can you update my existing app instead of building a new one?",
    answer:
      "absolutely. we offer app audit, redesign, and enhancement services for existing applications. our team can evaluate your current app, identify improvement opportunities, and implement updates to enhance functionality, user experience, and performance. we can also help migrate outdated codebases to modern frameworks.",
  },
  {
    question: "what happens after my app is launched?",
    answer:
      "we provide comprehensive post-launch support including monitoring, bug fixes, and performance optimization. we offer flexible maintenance packages that include regular updates, feature enhancements, and technical support. we also help with app store optimization, user acquisition strategies, and analytics implementation to track and improve app performance.",
  },
  {
    question: "do you help with app store submission and approval?",
    answer:
      "yes, we handle the entire app store submission process for both apple app store and google play store. this includes preparing all required assets, writing compelling descriptions, setting up developer accounts if needed, addressing any review feedback, and ensuring your app meets all platform guidelines for approval.",
  },
]

export const metadata: Metadata = {
  title: "mobile app development portfolio & services | prism",
  description:
    "view our portfolio of custom mobile apps for restaurants, healthcare, and small businesses. interactive demos showcase native ios and android apps that boost customer engagement and streamline operations.",
  openGraph: {
    title: "mobile app development portfolio & services | prism",
    description:
      "view our portfolio of custom mobile apps for restaurants, healthcare, and small businesses. interactive demos showcase native ios and android apps that boost customer engagement and streamline operations.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://prism.agency/apps",
  },
}

export default function AppsPage() {
  return (
    <>
      <AppsClientPage />
      <FAQSchema questions={appFaqs} />
    </>
  )
}
