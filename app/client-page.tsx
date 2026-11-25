import { OwnerDecision } from '@/components/prism/owner-decision'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { HomeAppCard } from '@/components/home/HomeAppCallout'
import HomeRefraction from '@/components/home/HomeRefraction'
import HomeLogoRail from '@/components/home/HomeLogoRail'
import HomeAudience from '@/components/home/HomeAudience'
import HomeFeaturedWork from '@/components/home/HomeFeaturedWork'
import HomeFaq from '@/components/home/HomeFaq'
import HomeFounder from '@/components/home/HomeFounder'
import HomeHashScrollStabilizer from '@/components/home/HomeHashScrollStabilizer'
import HomeHero from '@/components/home/HomeHero'
import HomeHowToGetIn from '@/components/home/HomeHowToGetIn'
import HomeLove from '@/components/home/HomeLove'
import HomeNumbers from '@/components/home/HomeNumbers'
import HomePillars from '@/components/home/HomePillars'
import HomeProducts from '@/components/home/HomeProducts'
import HomeStories from '@/components/home/HomeStories'
import HomeWorkWall from '@/components/home/HomeWorkWall'
import { HOMEPAGE_FINAL_CTA, HOMEPAGE_HERO } from '@/components/home/homepage-content'
import { FinalCta } from '@/components/prism/final-cta'

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-foreground">
      <Navbar />
      <HomeHashScrollStabilizer />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <HomeHero />
        <HomeFeaturedWork />
        <HomeStories />
        <OwnerDecision
          eyebrow="Working with Prism"
          title="a direct line to the people doing the work."
          body="Bring Enzo one thing you want customers to do more often. Together we choose what to build first. As the work ships, you can see what changed, where customers still get stuck and which decision comes next."
          links={[
            { label: 'Meet Enzo and see a sample update', href: '/about' },
            { label: 'Explore Prism Grow for clients', href: '/app' },
          ]}
        />
        <HomeNumbers />
        <HomeLogoRail />
        <HomePillars />
        <HomeLove />
        <HomeFounder />
        <HomeHowToGetIn />
        <HomeFaq />
        <details id="more-work-and-reach" className="prism-container border-y border-border">
          <summary className="cursor-pointer py-6 text-center font-medium">Explore the full client roster and Prism’s own audience</summary>
          <HomeWorkWall />
          <HomeAudience />
        </details>
        <div className="relative">
          <HomeRefraction labels={HOMEPAGE_HERO.spectrumLabels} />
          <HomeAppCard />
        </div>
        <HomeProducts />
        <FinalCta
          location="homepage final cta"
          title={HOMEPAGE_FINAL_CTA.title}
          secondary={{ label: 'See the work', href: '/case-studies' }}
        />
      </main>
      <Footer />
    </div>
  )
}
