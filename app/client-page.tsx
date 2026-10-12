import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HomeAudience from '@/components/home/HomeAudience'
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
import { HOMEPAGE_FINAL_CTA } from '@/components/home/homepage-content'
import { FinalCta } from '@/components/prism/final-cta'

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-foreground">
      <Navbar />
      <HomeHashScrollStabilizer />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <HomeHero />
        <HomeStories />
        <HomeWorkWall />
        <HomeNumbers />
        <HomeAudience />
        <HomePillars />
        <HomeLove />
        <HomeFounder />
        <HomeHowToGetIn />
        <HomeFaq />
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
