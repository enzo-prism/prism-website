"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface Quote {
  id: number
  text: string
  client: string
  company: string
}

const quotesData: Quote[] = [
  {
    id: 1,
    text: "Everyone loves the website — you did a **great job** on it.",
    client: "Renata Chun",
    company: "Coast Periodontics",
  },
  {
    id: 2,
    text: "The **design was so amazing — it was incredible.**",
    client: "Michael",
    company: "Exquisite Dentistry",
  },
  {
    id: 3,
    text: "I **love** the new home page; it looks **professional** and it's **easy for patients.**",
    client: "Dr. Tingjen Ji",
    company: "Grace Dental",
  },
  {
    id: 4,
    text: "Those **scheduling options** you built were **brilliant.**",
    client: "Michael",
    company: "Exquisite Dentistry",
  },
  {
    id: 5,
    text: "I'd **love to keep working with you — you're so talented.**",
    client: "Renata Chun",
    company: "Coast Periodontics",
  },
  { id: 6, text: "I **love everything you've done.**", client: "Suzanne Meinhardt", company: "Rebellious Aging" },
  { id: 8, text: "The implant page is **great — it's perfect.**", client: "Dr. Tingjen Ji", company: "Grace Dental" },
  {
    id: 9,
    text: "Seeing this makes me feel **hopeful — I'm confident in you.**",
    client: "Dr. Tingjen Ji",
    company: "Grace Dental",
  },
  {
    id: 10,
    text: "That little snippet is **brilliant — it'll be fun!**",
    client: "Mary Lynn Wheaton",
    company: "Leadership Summit",
  },
  {
    id: 11,
    text: "This is so smart",
    client: "hay_bail1",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 12,
    text: "This is brilliant",
    client: "aboinpally1",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 13,
    text: "Amazing framework 🙌",
    client: "itsoguzhank",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 14,
    text: "Wow. Just wow",
    client: "spencer_kunkel",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 15,
    text: "Not gonna lie… It's been an hour and I'm still just listening to this on repeat.",
    client: "aaronwbateman",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 16,
    text: "This hits.",
    client: "victimhair_co",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 17,
    text: "Saw this on a right time.",
    client: "garlic_soss",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 18,
    text: "This side of Instagram is what keeping me in this app.",
    client: "i_m_y_r_s",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 19,
    text: "Brilliant, more please",
    client: "maggieedwards109",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 20,
    text: "🔥",
    client: "strategicdiaries",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 21,
    text: "Grateful 🙏🏼",
    client: "ernestkings",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 22,
    text: "This is so true amen 🙏🏾",
    client: "mr.noelespinoza",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 23,
    text: "that's great 🔥",
    client: "miskagonzalez",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 24,
    text: "Beautiful",
    client: "bruce.connect",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 25,
    text: "That was a epic one thank you",
    client: "chrisdarch150",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 26,
    text: "One of the best words of wisdoms you'll here",
    client: "linden_raaen3",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 27,
    text: "damn. speechless",
    client: "_instaluna",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 28,
    text: "Poetic",
    client: "apez7",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 29,
    text: "Beautiful.",
    client: "ashleydowds",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 30,
    text: "Finally my algorithm is doing its job",
    client: "zirbmaa",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 31,
    text: "Holy moly this took me and shook me",
    client: "muhammadkathrada",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 32,
    text: "let this video blow.",
    client: "piiyyyyush",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 33,
    text: "I'm making this my morning alarm",
    client: "greegy_the_great",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 34,
    text: "Spitting facts 🔥🔥",
    client: "blue.moon.thoughtz",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 35,
    text: "Powerful",
    client: "yt_dying_breed",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 36,
    text: "Thank you for this video, such powerful message👏",
    client: "zemp_alessandro",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 37,
    text: "👏🏼 si!!!! Ty!!! Ty.",
    client: "la_chica_del_312",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 38,
    text: "🔥🔥🔥",
    client: "dr_tripp",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 39,
    text: "Gotta keep this in my reel cycles",
    client: "ivanjohnson845",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 40,
    text: "Amazing",
    client: "nicolasmartinezval",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 41,
    text: "I found the perfect video.",
    client: "ryankjamess",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 42,
    text: "He absolutely cooked. 🔥🔥🔥🔥",
    client: "bossgangvip",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 43,
    text: "FYP!",
    client: "i_am_damithjayarathne",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 44,
    text: "This is one of the best videos I've ever watched. It's exactly what I always do when the doubts come to my head, I close my eyes and visualise the dream life I'm fighting for, refuel and go again",
    client: "sorin.7_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 45,
    text: "I thought it was just me feeling this😃.",
    client: "befitwithshan",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 46,
    text: "Amazing.",
    client: "kyledsantos",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 47,
    text: "I'm here!!! It hits hard!!! Thank youuu",
    client: "ko_phy7",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 48,
    text: "It's 3am now and I was talking to myself. This its hard rn. I needed this",
    client: "yann.ng14",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 49,
    text: "Who feels it knows it.. 👁️Focus Forward🧘",
    client: "chef.steveconstantine",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 50,
    text: "🔥🔥🔥 Absolutely",
    client: "lisaannpetrie",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 51,
    text: "I felt this deeply. Been here thousands times.",
    client: "collinsnyatanga",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 52,
    text: "Speaking total truth",
    client: "zackssiegel",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 53,
    text: "This one…🥹🙏🏼",
    client: "devjams.og",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 54,
    text: "Inspirational ✨🙌",
    client: "delgesh_al_haider",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 55,
    text: "Fyp",
    client: "kamanofallah__",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 56,
    text: "Needed this🙏",
    client: "therealhaydend",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 57,
    text: "Living it right now 💯🙏",
    client: "damian_palazzola_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 58,
    text: "Might be the realest and best piece of content I've seen in the last 5 years.",
    client: "helder_movement",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 59,
    text: "I can 100% relate to every fucking word that he said",
    client: "ahadk442",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 60,
    text: "Thank you",
    client: "_mohawu_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 61,
    text: "Remind me of this everyday",
    client: "salman.rafique9",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 62,
    text: "Gold",
    client: "david_s2f",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 63,
    text: "Been exactly here hundreds of times. Preach.",
    client: "michaelrrcurtis",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 64,
    text: "Thanks man.",
    client: "_hiranbanerjee_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 65,
    text: "That hits hard 🔥🔥👏",
    client: "masculinity_arts",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 66,
    text: "Love this",
    client: "wisefp_",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 67,
    text: "Wow so powerful GO AND DREAM",
    client: "jmantheplug",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 68,
    text: "I needed this for real 🔥",
    client: "emileagbeko",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 69,
    text: "Thank you! I needed this today",
    client: "cruzer1991",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 70,
    text: "Powerful.",
    client: "mikekwal",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 71,
    text: "Needed this. 💔",
    client: "realemmanlamola",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 72,
    text: "This is gold",
    client: "ziegler_alex",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 73,
    text: "I can feel that ❤️",
    client: "himedakanchi",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 74,
    text: "Soooo much truth here!!",
    client: "soldoutservant",
    company: "Instagram Community of Entrepreneurs",
  },
  {
    id: 75,
    text: "Mental really",
    client: "leinad_inamat",
    company: "Instagram Community of Entrepreneurs",
  },
]

const renderFormattedText = (text: string) => {
  const segments = text.split(/(\*\*.*?\*\*)/g).filter(Boolean)

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return <strong key={index}>{segment.substring(2, segment.length - 2)}</strong>
    }
    return segment
  })
}

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Quote[]): Quote[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function WallOfLoveClientPage() {
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([])

  useEffect(() => {
    setShuffledQuotes(shuffleArray(quotesData))
  }, [])

  return (
    <>
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-5xl mb-4">❤️</div>
            <h1 className="text-5xl font-bold tracking-tight lowercase sm:text-6xl md:text-7xl text-neutral-900">
              wall of love
            </h1>
            <div className="text-lg text-neutral-600 md:text-xl lowercase max-w-lg mx-auto space-y-1">
              <p>38.5k+ followers on instagram</p>
              <p>24.5k+ subscribers on youtube</p>
            </div>
            <div>
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-10 py-7 text-lg lowercase shadow-md"
                  aria-label="Hire Prism"
                >
                  hire prism <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-neutral-50">
        <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="space-y-8">
            {shuffledQuotes.map((quote) => (
              <blockquote
                key={quote.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                aria-label={`Testimonial from ${quote.client.toLowerCase()}`}
              >
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  &ldquo;{renderFormattedText(quote.text.toLowerCase())}&rdquo;
                </p>
                <footer className="text-right">
                  <p className="font-semibold text-neutral-800">{quote.client.toLowerCase()}</p>
                  <p className="text-sm text-neutral-500">{quote.company.toLowerCase()}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
