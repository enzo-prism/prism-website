export interface PodcastEpisode {
  number: string
  guest: string
  youtubeUrl: string
  takeaways: string[]
  publishedAt?: string
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    number: "01",
    guest: "Dr. Ahmed Mataria",
    youtubeUrl: "https://youtu.be/WIWxwdZflzo",
    publishedAt: "2024-05-01",
    takeaways: [
      "From single chair to multi-location",
      "Pricing service-based work with confidence",
      "Building a culture patients feel"
    ]
  },
  {
    number: "02",
    guest: "Ludmila (dental office manager)",
    youtubeUrl: "https://youtu.be/5eB4Y27zkE8",
    publishedAt: "2024-05-15",
    takeaways: [
      "Turning passion projects into revenue",
      "Operating as a team of one",
      "Leveraging community for early traction"
    ]
  },
  {
    number: "03",
    guest: "Melissa (dental office front desk)",
    youtubeUrl: "https://youtu.be/jE6YAimUxMQ",
    publishedAt: "2024-05-22",
    takeaways: [
      "Scaling customer experience without losing heart",
      "Hiring before you feel \"ready\"",
      "Systems that free the founder's time"
    ]
  },
  {
    number: "04",
    guest: "Dr. Arash Abolfazlian",
    youtubeUrl: "https://youtu.be/zL4Ax2bs9pU",
    publishedAt: "2024-05-29",
    takeaways: [
      "Switching careers and industries",
      "Financing a first practice purchase",
      "Marketing specialist services in crowded markets"
    ]
  },
  {
    number: "05",
    guest: "Dr. Michael Njo",
    youtubeUrl: "https://youtu.be/0SS1C5d3m1w",
    publishedAt: "2024-06-05",
    takeaways: [
      "Buying vs. building a practice",
      "Doubling revenue in 12 months",
      "Tech that actually improves chair-time efficiency"
    ]
  },
  {
    number: "06",
    guest: "Dr. Katie Lee",
    youtubeUrl: "https://youtu.be/FxuzACT-o2Q",
    publishedAt: "2024-06-12",
    takeaways: [
      "Brand-building on TikTok & IG",
      "From side-hustle to full clinic",
      "Crafting an unforgettable patient journey"
    ]
  },
  {
    number: "07",
    guest: "Dr. Chris Wong",
    youtubeUrl: "https://youtu.be/HrksJeYb02Q",
    publishedAt: "2024-06-19",
    takeaways: [
      "M&A: buying a legacy practice",
      "Modernizing ops without scaring staff",
      "Data-driven decisions on new services"
    ]
  },
  {
    number: "08",
    guest: "Wil Gilmore",
    youtubeUrl: "https://youtu.be/UDYw11mQe-c",
    publishedAt: "2024-06-26",
    takeaways: [
      "Nailing product–market fit in a niche",
      "Fund-raise vs. bootstrap math",
      "Selling \"boring\" products with story"
    ]
  },
  {
    number: "09",
    guest: "Dr. Teagan Willes",
    youtubeUrl: "https://youtu.be/wCQrUajsnk8",
    publishedAt: "2024-07-03",
    takeaways: [
      "Differentiating in a luxury market",
      "Designing spaces that sell themselves",
      "Balancing artistry and profitability"
    ]
  }
]
