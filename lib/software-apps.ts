export type SoftwareApp = {
  title: string
  description: string
  platform?: string
  href: string
  hrefLabel: string
}

export const PRISM_APPS: SoftwareApp[] = [
  {
    title: "Density",
    description: "Track posting frequency and learn from performance trends",
    platform: "YouTube",
    href: "https://density.report",
    hrefLabel: "density.report",
  },
  {
    title: "Hot Content",
    description: "Test how viral video ideas are BEFORE you start shooting.",
    platform: "YouTube",
    href: "https://hotcontent.app",
    hrefLabel: "hotcontent.app",
  },
  {
    title: "Engineering Tracker",
    description: "Track new code Prism is publishing",
    href: "https://enzo.engineering",
    hrefLabel: "enzo.engineering",
  },
]
