import SeoTextSection from "@/components/seo-text-section"
import { getAllPosts } from "@/lib/mdx"
import type { Metadata } from "next"
import { notFound } from 'next/navigation'
import BlogPage from "./BlogPage"

export const metadata: Metadata = {
  title: "Prism Blog | Web Design, AI Marketing & Growth Experiments",
  description:
    "Actionable lessons from shipping websites, AI workflows, and conversion experiments for dentists and local businesses, field-tested not theory.",
  alternates: {
    canonical: "https://www.design-prism.com/blog",
  },
}

export default async function Blog() {
  const posts = await getAllPosts()
  if (!posts) notFound()
  return (
    <>
      <SeoTextSection
        title="field notes from active projects"
        subtitle="we publish experiments, templates, and lessons learned while shipping websites, ai workflows, and growth systems for service businesses."
        variant="compact"
        showDivider={false}
      >
        <p>
          Expect practical breakdowns rather than theory—how to rebuild funnel pages, wire analytics, brief AI copilots, and keep creative output high with a small team. Use the articles to run your own tests or share them with stakeholders who need the blueprint.
        </p>
        <ul>
          <li><strong>Design & UX:</strong> interfaces that convert and scale across devices.</li>
          <li><strong>AI & automation:</strong> playbooks for agents, internal tools, and operational leverage.</li>
          <li><strong>Growth:</strong> measurement frameworks, retention systems, and campaign ideas you can deploy immediately.</li>
        </ul>
      </SeoTextSection>
      <BlogPage posts={posts} />
      <SeoTextSection title="prism blog: design, development, and growth">
        <p>
          we publish practical notes on product design, engineering, and modern seo—how to ship faster,
          write clearer interfaces, and measure what matters. each post is written from real client work
          and experiments, not theory.
        </p>
      </SeoTextSection>
    </>
  )
}
