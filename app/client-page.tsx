import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HomeDentistWinsSection from '@/components/home/HomeDentistWinsSection'
import HomeFinalCtaSection from '@/components/home/HomeFinalCtaSection'
import HomeFitSection from '@/components/home/HomeFitSection'
import HomeHashScrollStabilizer from '@/components/home/HomeHashScrollStabilizer'
import HomeHeroSection from '@/components/home/HomeHeroSection'
import HomeHowItWorksSection from '@/components/home/HomeHowItWorksSection'
import HomeElevenLabsAgentSection from '@/components/home/HomeElevenLabsAgentSection'
import HomeImpossibleHero from '@/components/home/HomeImpossibleHero'
import HomeOffersSection from '@/components/home/HomeOffersSection'
import HomeProblemSection from '@/components/home/HomeProblemSection'
import HomeProofBandSection from '@/components/home/HomeProofBandSection'
import HomeProofSection from '@/components/home/HomeProofSection'
import HomeServicesSection from '@/components/home/HomeServicesSection'

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <HomeHashScrollStabilizer />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <HomeImpossibleHero />
        <HomeHeroSection />
        <HomeDentistWinsSection />
        <HomeProblemSection />
        <HomeServicesSection />
        <HomeProofBandSection />
        <HomeFitSection />
        <HomeElevenLabsAgentSection />
        <HomeHowItWorksSection />
        <HomeProofSection />
        <HomeFinalCtaSection />
        <HomeOffersSection />
      </main>
      <Footer />
    </div>
  )
}
