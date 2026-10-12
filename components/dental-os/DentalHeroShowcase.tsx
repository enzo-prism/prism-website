import Image from 'next/image'

import BrowserFrame from '@/components/prism/browser-frame'

/**
 * Product shot for the /dental-os split hero: two current dental client
 * homepages layered in browser chrome, plus one practice site on a phone.
 * Real screenshots only (public/case-studies), current clients only.
 */
export function DentalHeroShowcase() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-[36rem]">
      <div
        aria-hidden="true"
        className="absolute -inset-x-[6%] inset-y-[4%] -z-10 bg-[radial-gradient(50%_55%_at_45%_45%,oklch(0.66_0.16_258/30%),transparent_75%),radial-gradient(35%_40%_at_85%_20%,oklch(0.63_0.19_295/18%),transparent_75%),radial-gradient(30%_35%_at_15%_85%,oklch(0.66_0.21_29/12%),transparent_75%)] blur-2xl"
      />
      <BrowserFrame
        src="/case-studies/town-centre-dental-home-desktop.jpg"
        alt="Town Centre Dental website home page built by Prism"
        url="towncentredental.net"
        sizes="(min-width: 1024px) 25rem, 70vw"
        className="absolute right-0 top-0 w-[72%] origin-bottom-left rotate-[3deg] opacity-60"
      />
      <BrowserFrame
        src="/case-studies/dr-christopher-wong-home-desktop.jpg"
        alt="Dr. Christopher B. Wong's dental website home page built by Prism"
        url="chriswongdds.com"
        priority
        sizes="(min-width: 1024px) 32rem, 88vw"
        className="absolute left-0 top-[16%] z-10 w-[88%] shadow-[0_50px_120px_-40px_oklch(0_0_0/95%),0_0_0_1px_oklch(1_0_0/6%)]"
      />
      <figure className="absolute bottom-0 right-[1%] z-20 w-[27%] overflow-hidden rounded-[1.4rem] border border-white/15 bg-popover p-1 shadow-[0_30px_70px_-20px_oklch(0_0_0/90%)]">
        <Image
          src="/case-studies/family-first-smile-care-home-mobile.jpg"
          alt="Family First Smile Care website on a phone, built by Prism"
          width={780}
          height={1688}
          sizes="(min-width: 1024px) 10rem, 27vw"
          className="block h-auto w-full rounded-[1.15rem]"
        />
      </figure>
    </div>
  )
}

export default DentalHeroShowcase
