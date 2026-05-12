import SocialClipLandingPage from '@/components/social-clip-landing-page'

export default function TikTokLandingPage() {
  return (
    <SocialClipLandingPage
      channel={{
        label: 'TikTok',
        handle: '@the_design_prism',
        href: 'https://www.tiktok.com/@the_design_prism',
        iconSrc: '/pixelish/socials-tiktok.svg',
      }}
      hiddenSectionDetailIds={['business']}
    />
  )
}
