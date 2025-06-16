"use client"

import Link from "next/link"
import { ExternalLink, Youtube, Mail, MessageCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"

export default function PodcastClientPage() {
  const platforms = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@the_design_prism",
      icon: Youtube,
      description: "Watch full episodes with video"
    },
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/the-prism-pod/id1745660200",
      icon: ExternalLink,
      description: "Listen on Apple Podcasts"
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/1VvDo110AVVbOYdgZgzoKb?si=a41c116896ff4f80",
      icon: ExternalLink,
      description: "Stream on Spotify"
    }
  ]

  const episodes = [
    {
      number: "01",
      guest: "Dr. Anthony Mataria",
      youtubeUrl: "https://youtu.be/WIWxwdZflzo",
      takeaways: [
        "From single chair to multi-location",
        "Pricing service-based work with confidence",
        "Building a culture patients feel"
      ]
    },
    {
      number: "02",
      guest: "Ludmila Garcia",
      youtubeUrl: "https://youtu.be/5eB4Y27zkE8",
      takeaways: [
        "Turning passion projects into revenue",
        "Operating as a team of one",
        "Leveraging community for early traction"
      ]
    },
    {
      number: "03",
      guest: "Melissa Chen",
      youtubeUrl: "https://youtu.be/jE6YAimUxMQ",
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
      takeaways: [
        "Differentiating in a luxury market",
        "Designing spaces that sell themselves",
        "Balancing artistry and profitability"
      ]
    }
  ]

  const whyWeBuilt = [
    "Actionable playbooks you can put to work tomorrow",
    "Candid founder therapy—the stuff we usually only share off-mic", 
    "Community—because you're not building in a vacuum"
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Prism Podcast" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl">🎙️</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  prism podcast
                </h1>
                <h2 className="text-2xl font-medium text-neutral-500 lowercase sm:text-3xl">
                  founders · journeys · lessons
                </h2>
                <p className="mx-auto mt-6 max-w-[700px] text-neutral-600 lowercase md:text-xl leading-relaxed">
                  every episode our founder <strong>enzo sison</strong> sits down with another builder who's in the arena—unpacking the wins, the wrong turns, and the frameworks you can swipe for your own business. no fluff, no jargon—just real stories from real founders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Watch & Listen Section */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                watch & listen
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-neutral-600 lowercase">
                pick your favorite player—new episodes hit all three at the same time.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {platforms.map((platform) => (
                <Card key={platform.name} className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <platform.icon className="h-12 w-12 mx-auto mb-4 text-neutral-700" />
                    <CardTitle className="text-xl font-semibold lowercase text-neutral-800">
                      {platform.name}
                    </CardTitle>
                    <CardDescription className="text-neutral-600 lowercase">
                      {platform.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTAClick(`podcast platform ${platform.name.toLowerCase()}`, "podcast page")}
                    >
                      <Button className="w-full rounded-full px-6 py-3 lowercase">
                        listen now <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Episodes Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                latest episodes (1 – 9)
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-neutral-600 lowercase">
                full show notes & transcripts are linked from each episode.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {episodes.map((episode) => (
                <Card key={episode.number} className="bg-neutral-50 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-neutral-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {episode.number}
                      </span>
                      <CardTitle className="text-lg font-semibold lowercase text-neutral-800">
                        {episode.guest}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-neutral-700 lowercase mb-3">quick-hit takeaways:</h4>
                        <ul className="space-y-2">
                          {episode.takeaways.map((takeaway, index) => (
                            <li key={index} className="text-sm text-neutral-600 lowercase flex items-start">
                              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              {takeaway}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href={episode.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCTAClick(`watch episode ${episode.number}`, "podcast page")}
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full rounded-full px-4 py-2 text-xs lowercase"
                        >
                          <Youtube className="mr-2 h-3 w-3 text-red-600" />
                          watch on youtube
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Built The Show */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                why we built the show
              </h2>
            </div>

            <div className="bg-white rounded-xl p-8 md:p-12 border border-neutral-200 shadow-sm">
              <p className="text-neutral-700 lowercase text-lg leading-relaxed mb-8 text-center">
                running a business can feel like climbing a mountain alone. <strong>prism podcast</strong> hands you the trail map—straight from founders a few steps ahead. expect:
              </p>
              
              <ul className="space-y-4 max-w-2xl mx-auto">
                {whyWeBuilt.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-neutral-900 rounded-full mr-4 mt-3 flex-shrink-0"></span>
                    <span className="text-neutral-700 lowercase text-lg leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                get involved
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow text-center">
                <CardHeader>
                  <Youtube className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-xl font-semibold lowercase text-neutral-800">
                    subscribe
                  </CardTitle>
                  <CardDescription className="text-neutral-600 lowercase">
                    follow on youtube, spotify & apple podcasts so the next conversation lands in your queue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://www.youtube.com/@the_design_prism"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("subscribe youtube", "podcast page")}
                  >
                    <Button variant="outline" className="w-full rounded-full px-6 py-3 lowercase">
                      subscribe on youtube
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow text-center">
                <CardHeader>
                  <Mail className="h-12 w-12 mx-auto mb-4 text-neutral-700" />
                  <CardTitle className="text-xl font-semibold lowercase text-neutral-800">
                    suggest a guest
                  </CardTitle>
                  <CardDescription className="text-neutral-600 lowercase">
                    know a builder with a story that matters? we'd love to hear about them
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:podcast@design-prism.com"
                    onClick={() => trackCTAClick("suggest guest", "podcast page")}
                  >
                    <Button variant="outline" className="w-full rounded-full px-6 py-3 lowercase">
                      email us
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow text-center">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-neutral-700" />
                  <CardTitle className="text-xl font-semibold lowercase text-neutral-800">
                    join the conversation
                  </CardTitle>
                  <CardDescription className="text-neutral-600 lowercase">
                    tweet your takeaways and connect with other founders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://x.com/nosisthegod"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("twitter conversation", "podcast page")}
                  >
                    <Button variant="outline" className="w-full rounded-full px-6 py-3 lowercase">
                      follow on x
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="px-4 py-8">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
              onClick={() => trackNavigation("podcast_back_home", "/")}
            >
              ← back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}