import FAQSection from "@/components/faq-section"
import SeoTextSection from "@/components/seo-text-section"
import WhatWeDo from "@/components/what-we-do"
import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism - beautiful software that grows revenue",
  description: "prism agency creates beautiful websites, apps, and designs that shatter revenue goals for ambitious businesses. ai-powered digital solutions that convert visitors into customers.",
}

export default function Home() {
  return (
    <>
      <ClientPage />

      {/* Move What We Do near the bottom for all breakpoints */}
      <WhatWeDo className="pb-8" />

      {/* SEO supporting copy - comprehensive content for better text-HTML ratio */}
      <SeoTextSection 
        title="what prism does"
        subtitle="comprehensive digital solutions that drive measurable business growth"
        variant="expanded"
      >
        <p>
          prism designs and builds fast, accessible websites and mobile apps that convert visitors into
          customers. we combine clean design systems with measurement and ai‑assisted workflows, so every
          page loads quickly, reads clearly, and drives outcomes. if you need a new site, an app, or a
          growth program that compounds, we build the stack end‑to‑end.
        </p>
        
        <h3>our core services</h3>
        <p>
          at prism, we specialize in three interconnected areas of digital excellence. our website development 
          services create lightning-fast, conversion-optimized sites that rank well in search engines and 
          delight users. our mobile app development team builds native and cross-platform applications that 
          solve real business problems. our design services ensure every pixel serves a purpose, from brand 
          identity to user interface design.
        </p>
        
        <h3>why businesses choose prism</h3>
        <p>
          companies partner with prism because we deliver more than just code and design. we provide strategic 
          thinking, technical excellence, and measurable results. our team understands that beautiful software 
          must also drive revenue. we focus on conversion rate optimization, search engine visibility, and user 
          experience metrics that matter to your bottom line. whether you're a startup seeking product-market 
          fit or an established business ready to scale, we have the expertise to accelerate your growth.
        </p>
        
        <h3>our proven process</h3>
        <p>
          every prism project follows a battle-tested methodology. we begin with deep discovery, understanding 
          your business goals, target audience, and competitive landscape. our design phase creates intuitive 
          interfaces backed by user research and testing. development leverages modern frameworks and best 
          practices for performance and maintainability. we deploy with confidence using automated testing and 
          continuous integration. post-launch, we monitor analytics and iterate based on real user data.
        </p>
      </SeoTextSection>
      
      <SeoTextSection 
        title="industries we serve"
        variant="default"
        showDivider={true}
      >
        <p>
          prism has deep expertise across multiple industries, with particular strength in healthcare, 
          professional services, and e-commerce. we've helped dental practices modernize their digital 
          presence, assisted law firms in attracting ideal clients, and enabled retail brands to compete 
          online. our industry knowledge means faster project delivery and better strategic recommendations.
        </p>
        
        <h3>healthcare & medical practices</h3>
        <p>
          we understand the unique challenges healthcare providers face online. from HIPAA compliance to 
          patient acquisition, our healthcare websites and apps address industry-specific needs. we've helped 
          dental practices, medical clinics, and specialty providers enhance their digital presence while 
          maintaining professional standards and regulatory compliance.
        </p>
        
        <h3>professional services</h3>
        <p>
          law firms, accounting practices, and consulting companies trust prism to elevate their online 
          presence. we create sophisticated websites that establish authority, build trust, and generate 
          qualified leads. our solutions help professional service firms showcase expertise, share insights, 
          and connect with ideal clients.
        </p>
        
        <h3>e-commerce & retail</h3>
        <p>
          in the competitive world of online retail, every millisecond counts. prism builds blazing-fast 
          e-commerce experiences that convert browsers into buyers. from product discovery to checkout 
          optimization, we implement proven strategies that increase average order value and customer lifetime 
          value.
        </p>
      </SeoTextSection>
      
      <SeoTextSection 
        title="technology & innovation"
        variant="compact"
        showDivider={true}
      >
        <p>
          prism stays at the forefront of web technology. we leverage Next.js for server-side rendering and 
          optimal performance. our mobile apps use React Native and Flutter for cross-platform efficiency. 
          we implement headless CMS solutions for content flexibility. our infrastructure runs on AWS and 
          Vercel for reliability and scale. we integrate AI tools for content generation, image optimization, 
          and user personalization.
        </p>
        
        <p>
          security and performance are non-negotiable. every prism project includes SSL certificates, CDN 
          distribution, and comprehensive security headers. we optimize Core Web Vitals for superior page 
          experience scores. our code follows industry best practices for maintainability and scalability. 
          we implement robust testing strategies including unit tests, integration tests, and end-to-end 
          testing.
        </p>
      </SeoTextSection>
      
      <FAQSection 
        title="common questions about prism"
        subtitle="get answers to frequently asked questions about our services and process"
        items={[
          {
            question: "how long does it take to build a website with prism?",
            answer: "typical website projects range from 4-12 weeks depending on complexity. a simple marketing site can be completed in 4-6 weeks, while complex web applications may take 8-12 weeks. we provide detailed timelines during our initial consultation and keep you updated throughout the development process with weekly progress reports."
          },
          {
            question: "what is your pricing structure for website and app development?",
            answer: "our pricing is project-based and depends on scope, features, and timeline. website projects typically range from $5,000 to $50,000. mobile apps start at $15,000 for mvps and can scale based on features. we offer flexible payment terms including milestone-based payments and monthly retainers for ongoing work. every project begins with a free consultation where we provide a detailed proposal and transparent pricing."
          },
          {
            question: "do you work with small businesses or only enterprise clients?",
            answer: "we work with businesses of all sizes, from startups to established enterprises. our sweet spot is small to medium businesses that are ready to invest in professional digital solutions. we've helped dental practices, law firms, e-commerce brands, and tech startups achieve their growth goals. regardless of size, we focus on clients who value quality, design, and measurable results."
          },
          {
            question: "what technologies and frameworks does prism use?",
            answer: "we use modern, proven technologies including next.js, react, and typescript for web development. for mobile apps, we leverage react native and flutter. our backend solutions use node.js, python, and postgresql or mongodb for databases. we host on aws, vercel, and netlify for optimal performance. we choose technologies based on your specific needs, always prioritizing performance, maintainability, and scalability."
          },
          {
            question: "how does prism ensure websites rank well in search engines?",
            answer: "seo is built into every website we create. we implement technical seo best practices including semantic html, structured data, xml sitemaps, and optimized meta tags. our sites achieve excellent core web vitals scores through performance optimization. we conduct keyword research, optimize content structure, and ensure mobile responsiveness. post-launch, we provide seo monitoring and can offer ongoing optimization services."
          },
          {
            question: "what happens after my website or app launches?",
            answer: "we don't disappear after launch. every project includes 30 days of post-launch support for bug fixes and minor adjustments. we offer ongoing maintenance packages that include updates, security patches, performance monitoring, and content updates. many clients choose our growth packages which include continuous optimization based on analytics, a/b testing, and feature additions to drive better results over time."
          },
          {
            question: "can prism help redesign our existing website or app?",
            answer: "absolutely. many of our projects involve redesigning and modernizing existing digital properties. we begin with a comprehensive audit of your current site or app, identifying opportunities for improvement in design, performance, and conversion. we can migrate content, preserve seo equity, and ensure a smooth transition. our redesigns typically result in 2-3x improvements in page speed and conversion rates."
          }
        ]}
        variant="default"
      />
    </>
  )
}
