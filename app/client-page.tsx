import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HomeCaseStudies from '@/components/home/HomeCaseStudies'
import HomeFaq from '@/components/home/HomeFaq'
import HomeFounder from '@/components/home/HomeFounder'
import HomeHashScrollStabilizer from '@/components/home/HomeHashScrollStabilizer'
import HomeHero from '@/components/home/HomeHero'
import HomeHowToGetIn from '@/components/home/HomeHowToGetIn'
import HomeNumbers from '@/components/home/HomeNumbers'
import HomeProducts from '@/components/home/HomeProducts'
import HomeServicesBento from '@/components/home/HomeServicesBento'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import HomeWorkWall from '@/components/home/HomeWorkWall'
import { FinalCta } from '@/components/prism/final-cta'

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-foreground">
      <Navbar />
      <HomeHashScrollStabilizer />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <HomeHero />
        <HomeWorkWall />
        <HomeNumbers />
        <HomeServicesBento />
        <HomeCaseStudies />
        <HomeTestimonials />
        <HomeFounder />
        <HomeProducts />
        <HomeHowToGetIn />
        <HomeFaq />
        <FinalCta
          location="homepage final cta"
          secondary={{ label: 'See the work', href: '/case-studies' }}
        />
      </main>
      <Footer />
    </div>
  )
}
