import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { FinalCta } from "@/components/prism/final-cta"
import { Eyebrow } from "@/components/prism/section"
import { proseClassName } from "@/components/landing/prose"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Youtube } from "lucide-react"
import { PodcastEpisodeSchema, VideoObjectSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const episodeYoutubeUrl = "https://youtu.be/0SS1C5d3m1w"
const episodeEmbedUrl = "https://www.youtube.com/embed/0SS1C5d3m1w"
const episodeThumbnail = "https://img.youtube.com/vi/0SS1C5d3m1w/hqdefault.jpg"
const episodePublishedAt = "2024-06-05T00:00:00.000Z"

const lessons = [
  {
    title: "\"You don't know what you don't know.\"",
    description: "Stay curious, build a circle of advisors, and keep learning from people who are a few steps ahead.",
  },
  {
    title: "Surround yourself with great people.",
    description: "Success is built on community, trust, and the teammates who pull you forward.",
  },
  {
    title: "Own your path.",
    description: "Just like owning your home, owning your practice creates freedom. It is difficult work, but it is worth it.",
  },
  {
    title: "Live within your means.",
    description: "Dentists may earn well, but too few retire comfortably. Discipline and financial health are part of life balance.",
  },
  {
    title: "Keep evolving.",
    description: "Dentistry always changes. Curiosity keeps the profession fun and keeps you relevant.",
  },
]

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dr. Michael Njo on the Prism Podcast',
  description: 'Dr. Michael Njo\'s story of discipline, reinvention, and mentorship, from building a practice to guiding dentists through Practice Transitions Institute.',
  path: "/podcast/michael-njo",
  ogImage: "/prism-opengraph.png",
})

export default function MichaelNjoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className="relative isolate overflow-x-clip pb-12 pt-12 sm:pb-16 sm:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-x-0 top-0 h-[600px] opacity-50" />
            <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(40%_50%_at_30%_40%,oklch(0.66_0.16_258/18%),transparent_70%),radial-gradient(36%_46%_at_70%_44%,oklch(0.63_0.19_295/14%),transparent_70%)] blur-2xl" />
          </div>
          <div className="prism-container flex flex-col items-center text-center">
            <Eyebrow>Podcast feature · Episode 05</Eyebrow>
            <h1 className="text-display text-gradient mt-5 max-w-[14ch] text-balance pb-2">
              Dr. Michael Njo.
            </h1>
            <p className="text-lead mt-5 max-w-[46ch] text-pretty text-foreground/90">
              A journey of dedication, reinvention, and mentorship.
            </p>
            <p className="mt-5 max-w-[64ch] text-pretty text-base leading-7 text-muted-foreground sm:text-[1.0625rem]">
              From the moment he entered college, everyone assumed Michael would become an engineer like his father.
              But one difficult dinner conversation changed everything. He told his parents he wanted a different path.
              They were disappointed yet supportive, asking only that he finish his degree and own whatever came next.
              That decision sparked a lifetime of courage, discipline, and purpose.
            </p>
          </div>
        </section>

        <section className="pb-4">
          <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_30px_80px_-30px_oklch(0_0_0/90%)]">
                <iframe
                  className="h-full w-full"
                  src={`${episodeEmbedUrl}?rel=0`}
                  title="Dr. Michael Njo - Prism Podcast Episode"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
                <p className="text-sm text-muted-foreground">Prefer to watch on YouTube?</p>
                <Button asChild variant="outline">
                  <a href={episodeYoutubeUrl} target="_blank" rel="noopener noreferrer">
                    <Youtube aria-hidden="true" />
                    Watch the episode on YouTube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <article className={`mx-auto w-full max-w-[46rem] px-5 py-16 sm:px-8 sm:py-20 ${proseClassName}`}>
          <section>
            <h2 className="!mt-0">from engineering to dentistry.</h2>
            <p>
              Michael shifted from civil engineering to psychology at the University of the Pacific, drawn to
              understanding people: their motivations, behavior, and growth. "Psychology shaped how I approach dentistry.
              It is all about people," he says. "Behavioral science taught me systems, discipline, and goal-setting. If
              you put your mind to something and stay consistent, you can achieve almost anything."
            </p>
            <p>
              That mindset fueled his progress through dental school, where he found both challenge and community. His
              fraternity became a "family within a family" and taught him the importance of support and collaboration,
              two pillars that would later define his leadership style.
            </p>
          </section>

          <section>
            <h2>building a practice from the ground up.</h2>
            <p>
              When Dr. Njo graduated, many classmates joined family practices. He did not have that option, so he built
              his future from scratch. "I went through every name in the phone book looking for opportunities," he
              laughs. Within months, he was working multiple associate positions, became a partner, and eventually
              launched his own practice.
            </p>
            <p>
              Dentistry, for him, was never just a profession. It was a mission. "If you love what you do, it does not
              matter how hard it is. You will be successful."
            </p>
          </section>

          <section>
            <h2>when adversity became a turning point.</h2>
            <p>
              Years later, a severe neck injury threatened to end his clinical career. "It physically broke me, but
              emotionally made me stronger," he says. Facing the possibility of spinal fusion at 50, his neurologist
              gave him difficult advice: "You might need to reinvent yourself."
            </p>
            <p>
              Instead of retreating, Dr. Njo pivoted into consulting, teaching, and leadership. "I loved the business and
              technology of dentistry," he explains. "And I had always believed in advisors, mentors, and collaboration."
              He began lecturing, mentoring colleagues, and consulting for dental organizations, joining The Pride
              Institute before founding his own consulting practice. What started as friends sending thank-you checks
              became a calling: helping dentists succeed as people, not just practitioners.
            </p>
          </section>

          <section>
            <h2>the power of mentorship.</h2>
            <p>
              Mentorship is a constant thread throughout his story. Guided by leaders like Dr. Arthur Dugoni, Dr. Njo
              embraces the philosophy of "Time, Talent, and Treasure": giving of yourself, your skills, and your
              resources. "Good mentors lead by example," he says. "They make you want to be that person. I have been
              blessed with incredible mentors, and it is my duty to pay that forward."
            </p>
            <p>
              Through teaching, consulting, and volunteering with dental schools, he guides dentists toward purpose,
              balance, and excellence.
            </p>
          </section>

          <section>
            <h2>lessons for new dentists and entrepreneurs.</h2>
            <p>
              Asked what advice he gives to dentists starting out, Dr. Njo never hesitates:
            </p>
            <ul className="!list-none !pl-0">
              {lessons.map((lesson) => (
                <li key={lesson.title} className="!pl-0">
                  <p className="!mb-1 font-semibold text-foreground">{lesson.title}</p>
                  <p className="!mt-0">{lesson.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>his philosophy today.</h2>
            <p>
              Dr. Njo's consulting philosophy centers on quality of life, work-life balance, and family. "When those are
              in balance, everything else becomes easier," he says. "My job now is to help others reach that same
              equilibrium, to build practices that serve people, not the other way around."
            </p>
          </section>

          <section className="mt-14 rounded-3xl border border-white/[0.08] bg-card p-6 sm:p-8">
            <h2 className="!mt-0">in his own words.</h2>
            <p>
              "Life gives you moments that will either break you or make you stronger. My injury broke me physically, but
              it made me stronger in every other way. Dentistry gave me a career; mentorship gave me purpose."
            </p>
            <div className="text-eyebrow text-subtle [overflow-wrap:anywhere]">
              Michael Njo DDS · Dentist · Mentor · Consultant · Educator
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button asChild className="h-auto min-h-10 whitespace-normal py-2.5 text-center">
                <a
                  href="https://practicetransitionsinstitute.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mdx-cta"
                >
                  Visit Practice Transitions Institute
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Link
                href="/podcast"
                className="mdx-cta inline-flex min-h-10 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to the Prism Podcast
              </Link>
            </div>
          </section>
        </article>
        <FinalCta location="podcast michael njo final cta" />
      </main>
      <Footer />
      <PodcastEpisodeSchema
        episodeId="prism-podcast-05"
        seriesId="prism-podcast"
        name="Episode 05: Dr. Michael Njo"
        description="Dr. Michael Njo on reinvention, patient experience, and guiding dentists through Practice Transitions Institute."
        url="https://www.design-prism.com/podcast/michael-njo"
        videoEmbedUrl={episodeEmbedUrl}
        videoContentUrl={episodeYoutubeUrl}
        thumbnailUrl={episodeThumbnail}
        datePublished={episodePublishedAt}
      />
      <VideoObjectSchema
        videoId="prism-podcast-michael-njo"
        name="Prism Podcast: Dr. Michael Njo"
        description="Dr. Michael Njo shares lessons on discipline, mentorship, and evolving a practice."
        thumbnailUrl={episodeThumbnail}
        uploadDate={episodePublishedAt}
        embedUrl={episodeEmbedUrl}
      />
    </div>
  )
}
