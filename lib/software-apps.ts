export type SoftwareApp = {
  title: string
  description: string
  platform?: string
  href: string
  hrefLabel: string
  icon: {
    src: string
    trigger: string
    delay?: string
    size: number
  }
}

export const PRISM_APPS: SoftwareApp[] = [
  {
    title: "Density",
    description: "Track posting frequency and learn from performance trends",
    platform: "YouTube",
    href: "https://density.report",
    hrefLabel: "density.report",
    icon: {
      src: "https://cdn.lordicon.com/uoljexdg.json",
      trigger: "loop",
      delay: "2000",
      size: 25,
    },
  },
  {
    title: "Hot Content",
    description: "Test how viral video ideas are BEFORE you start shooting.",
    platform: "YouTube",
    href: "https://hotcontent.app",
    hrefLabel: "hotcontent.app",
    icon: {
      src: "https://cdn.lordicon.com/excswhey.json",
      trigger: "loop",
      delay: "2000",
      size: 25,
    },
  },
  {
    title: "Engineering Tracker",
    description: "Track new code Prism is publishing",
    href: "https://enzo.engineering",
    hrefLabel: "enzo.engineering",
    icon: {
      src: "https://cdn.lordicon.com/mudwpdhy.json",
      trigger: "loop",
      delay: "2000",
      size: 25,
    },
  },
]
