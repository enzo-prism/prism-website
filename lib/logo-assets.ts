export type LogoAsset = {
  name: string
  src: string
  alt: string
}

export const PRISM_PRIMARY_LOGO = {
  src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770697125/FAS_LOGO_SQUARE_cttltw.png",
  fallbackSrc: "/prism-logo.jpeg",
  alt: "Prism logo mark",
  className: "rounded-lg",
} as const

export const OLYMPIC_LOGO_ASSETS: LogoAsset[] = [
  {
    name: "Olympic rings",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770697127/OLYMPIC_RINGS_LOGO_rxfgkr.png",
    alt: "Olympic rings logo",
  },
  {
    name: "Philippine Olympic Committee",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765124410/Philippine_Olympic_Committee.svg_eqska6.png",
    alt: "Philippine Olympic Committee logo",
  },
  {
    name: "USA Track & Field member organization",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770697126/NEW_USATF_Member_Org_Logo_heja9v.jpg",
    alt: "USA Track and Field member organization logo",
  },
  {
    name: "USA Track & Field member club",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770697124/NEW_USATF_Member_Club_Logo_yrv0xy.jpg",
    alt: "USA Track and Field member club logo",
  },
  {
    name: "Philippine Athletics Track and Field Association",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770697128/PATAFA_PSC_LOGO_xzerkv.jpg",
    alt: "Philippine Athletics Track and Field Association logo",
  },
  {
    name: "Philippine Sports Commission",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770697127/PSC_LOGO_jzlpsy.jpg",
    alt: "Philippine Sports Commission logo",
  },
]
