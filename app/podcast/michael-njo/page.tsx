import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
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
  titleStem: "Dr. Michael Njo | Prism Podcast",
  description: "Read Dr. Michael Njo's story of discipline, reinvention, and mentorship—from building a practice to guiding dentists through Practice Transitions Institute.",
  path: "/podcast/michael-njo",
  ogImage: "/prism-opengraph.png",
})

export default function MichaelNjoPage() {
  return (
    <div>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="container mx-auto max-w-4xl px-4 py-16 text-center sm:py-20 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">podcast feature</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Dr. Michael Njo
            </h1>
            <p className="mt-4 text-lg text-white/80 sm:text-xl">
              A journey of dedication, reinvention, and mentorship.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
              From the moment he entered college, everyone assumed Michael would become an engineer like his father.
              But one difficult dinner conversation changed everything. He told his parents he wanted a different path.
              They were disappointed yet supportive, asking only that he finish his degree and own whatever came next.
              That decision sparked a lifetime of courage, discipline, and purpose.
            </p>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-neutral-50">
          <div className="container mx-auto max-w-3xl px-4 py-12 sm:py-16 md:px-6">
            <div className="space-y-8">
              <div className="aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-neutral-900/5">
                <iframe
                  className="h-full w-full"
                  src={`${episodeEmbedUrl}?rel=0`}
                  title="Dr. Michael Njo - Prism Podcast Episode"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="text-center">
                <p className="text-base text-neutral-600">Prefer to watch on YouTube?</p>
                <Button
                  asChild
                  className="mt-4 rounded-full bg-red-600 px-8 py-5 text-base text-white shadow-lg hover:bg-red-700"
                >
                  <a href={episodeYoutubeUrl} target="_blank" rel="noopener noreferrer">
                    watch episode on youtube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl px-4 py-16 sm:py-20 md:px-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">from engineering to dentistry</h2>
            <p className="text-base leading-relaxed text-neutral-700">
              Michael shifted from civil engineering to psychology at the University of the Pacific, drawn to
              understanding people--their motivations, behavior, and growth. "Psychology shaped how I approach dentistry.
              It is all about people," he says. "Behavioral science taught me systems, discipline, and goal-setting. If
              you put your mind to something and stay consistent, you can achieve almost anything."
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              That mindset fueled his progress through dental school, where he found both challenge and community. His
              fraternity became a "family within a family" and taught him the importance of support and collaboration,
              two pillars that would later define his leadership style.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">building a practice from the ground up</h2>
            <p className="text-base leading-relaxed text-neutral-700">
              When Dr. Njo graduated, many classmates joined family practices. He did not have that option, so he built
              his future from scratch. "I went through every name in the phone book looking for opportunities," he
              laughs. Within months, he was working multiple associate positions, became a partner, and eventually
              launched his own practice.
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              Dentistry, for him, was never just a profession--it was a mission. "If you love what you do, it does not
              matter how hard it is. You will be successful."
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">when adversity became a turning point</h2>
            <p className="text-base leading-relaxed text-neutral-700">
              Years later, a severe neck injury threatened to end his clinical career. "It physically broke me, but
              emotionally made me stronger," he says. Facing the possibility of spinal fusion at 50, his neurologist
              gave him difficult advice: "You might need to reinvent yourself."
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              Instead of retreating, Dr. Njo pivoted into consulting, teaching, and leadership. "I loved the business and
              technology of dentistry," he explains. "And I had always believed in advisors, mentors, and collaboration."
              He began lecturing, mentoring colleagues, and consulting for dental organizations--joining The Pride
              Institute before founding his own consulting practice. What started as friends sending thank-you checks
              became a calling: helping dentists succeed as people, not just practitioners.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">the power of mentorship</h2>
            <p className="text-base leading-relaxed text-neutral-700">
              Mentorship is a constant thread throughout his story. Guided by leaders like Dr. Arthur Dugoni, Dr. Njo
              embraces the philosophy of "Time, Talent, and Treasure"--giving of yourself, your skills, and your
              resources. "Good mentors lead by example," he says. "They make you want to be that person. I have been
              blessed with incredible mentors, and it is my duty to pay that forward."
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              Through teaching, consulting, and volunteering with dental schools, he guides dentists toward purpose,
              balance, and excellence.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">lessons for new dentists and entrepreneurs</h2>
            <p className="mt-4 text-base text-neutral-700">
              Asked what advice he gives to dentists starting out, Dr. Njo never hesitates:
            </p>
            <ul className="mt-6 space-y-6">
              {lessons.map((lesson) => (
                <li key={lesson.title}>
                  <p className="text-base font-semibold text-neutral-900">{lesson.title}</p>
                  <p className="mt-2 text-base text-neutral-700">{lesson.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">his philosophy today</h2>
            <p className="text-base leading-relaxed text-neutral-700">
              Dr. Njo's consulting philosophy centers on quality of life, work-life balance, and family. "When those are
              in balance, everything else becomes easier," he says. "My job now is to help others reach that same
              equilibrium--to build practices that serve people, not the other way around."
            </p>
          </section>

          <section className="mt-12 space-y-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">in his own words</h2>
            <p className="text-base leading-relaxed text-neutral-700">
              "Life gives you moments that will either break you or make you stronger. My injury broke me physically--but
              it made me stronger in every other way. Dentistry gave me a career; mentorship gave me purpose."
            </p>
            <div className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Michael Njo DDS · Dentist · Mentor · Consultant · Educator
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://practicetransitionsinstitute.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full bg-neutral-900 px-6 py-5 text-base text-white hover:bg-neutral-800">
                  Visit Practice Transitions Institute
                  <ArrowUpRight className="h-5 w-5" />
                </Button>
              </a>
              <Link
                href="/podcast"
                className="text-sm font-medium text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
              >
                ← Back to the Prism Podcast
              </Link>
            </div>
          </section>
        </article>
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
        name="Prism Podcast — Dr. Michael Njo"
        description="Dr. Michael Njo shares lessons on discipline, mentorship, and evolving a practice."
        thumbnailUrl={episodeThumbnail}
        uploadDate={episodePublishedAt}
        embedUrl={episodeEmbedUrl}
      />
    </div>
  )
}
