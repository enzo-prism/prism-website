import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HomeAiToolsSection from '@/components/home/HomeAiToolsSection'
import HomeFAQSurface from '@/components/home/HomeFAQSurface'
import HomeFinalCtaSection from '@/components/home/HomeFinalCtaSection'
import HomeHeroSection from '@/components/home/HomeHeroSection'
import HomeHowItWorksSection from '@/components/home/HomeHowItWorksSection'
import HomeProblemSection from '@/components/home/HomeProblemSection'
import HomeProofBandSection from '@/components/home/HomeProofBandSection'
import HomeProofSection from '@/components/home/HomeProofSection'
import HomePromiseSection from '@/components/home/HomePromiseSection'
import HomeServicesSection from '@/components/home/HomeServicesSection'
import HomeWhyPrismSection from '@/components/home/HomeWhyPrismSection'

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <HomeHeroSection />
        <HomeProofBandSection />
        <HomeProblemSection />
        <HomeAiToolsSection />
        <HomePromiseSection />
        <HomeServicesSection />
        <HomeWhyPrismSection />
        <HomeHowItWorksSection />
        <HomeProofSection />
        <HomeFAQSurface />
        <HomeFinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
