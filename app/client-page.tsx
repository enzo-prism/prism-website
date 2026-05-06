import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HomeDentistWinsSection from '@/components/home/HomeDentistWinsSection'
import HomeFinalCtaSection from '@/components/home/HomeFinalCtaSection'
import HomeHashScrollStabilizer from '@/components/home/HomeHashScrollStabilizer'
import HomeHeroSection from '@/components/home/HomeHeroSection'
import HomeHowItWorksSection from '@/components/home/HomeHowItWorksSection'
import HomeProblemSection from '@/components/home/HomeProblemSection'
import HomeProofBandSection from '@/components/home/HomeProofBandSection'
import HomeProofSection from '@/components/home/HomeProofSection'
import HomePromiseSection from '@/components/home/HomePromiseSection'
import HomeServicesSection from '@/components/home/HomeServicesSection'

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <HomeHashScrollStabilizer />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <HomeHeroSection />
        <HomeDentistWinsSection />
        <HomeProofBandSection />
        <HomeProblemSection />
        <HomePromiseSection />
        <HomeServicesSection />
        <HomeHowItWorksSection />
        <HomeProofSection />
        <HomeFinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
