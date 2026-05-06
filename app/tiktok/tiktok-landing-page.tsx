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
      otherChannel={{
        label: 'Instagram',
        handle: '@the_design_prism',
        href: '/ig',
        iconSrc: '/pixelish/socials-instagram.svg',
      }}
      headerLabel="Prism on TikTok"
      title="you found prism."
      description="If you came from TikTok, Prism builds premium growth systems for dental practices and local-service brands: stronger proof, clearer offers, sharper websites, and cleaner booking paths."
      metaLine="watch the clips. see the results. start with the audit."
      hiddenSectionDetailIds={['business']}
      actionLinks={[
        {
          label: 'free audit',
          href: '/get-started',
          iconSrc: '/pixelish/graph-chart-high.svg',
        },
        {
          label: 'results',
          href: '/case-studies',
          iconSrc: '/pixelish/award-checkmark.svg',
        },
        {
          label: 'pricing',
          href: '/pricing',
          iconSrc: '/pixelish/currency-dollar.svg',
        },
        {
          label: 'instagram',
          href: '/ig',
          iconSrc: '/pixelish/socials-instagram.svg',
        },
        {
          label: 'tiktok',
          href: 'https://www.tiktok.com/@the_design_prism',
          iconSrc: '/pixelish/socials-tiktok.svg',
        },
      ]}
    />
  )
}
