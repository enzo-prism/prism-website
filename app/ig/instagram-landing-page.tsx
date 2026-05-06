import SocialClipLandingPage from '@/components/social-clip-landing-page'

export default function InstagramLandingPage() {
  return (
    <SocialClipLandingPage
      channel={{
        label: 'Instagram',
        handle: '@the_design_prism',
        href: 'https://www.instagram.com/the_design_prism/',
        iconSrc: '/pixelish/socials-instagram.svg',
      }}
      otherChannel={{
        label: 'TikTok',
        handle: '@the_design_prism',
        href: '/tiktok',
        iconSrc: '/pixelish/socials-tiktok.svg',
      }}
      hiddenSectionDetailIds={['business']}
    />
  )
}
