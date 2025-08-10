"use client"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"
import { mobileScrollReveal } from "@/utils/animation-variants"
import { motion, type UseInViewOptions } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface Quote {
  id: number
  text: string
  client: string
  company: string
  pinned?: boolean
  requiresConsent?: boolean
}

interface Takeaway {
  id: number
  handle: string
  text: string
  pinned?: boolean
  requiresConsent?: boolean
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
    pinned: true,
    requiresConsent: true,
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
    pinned: true,
  },
  {
    id: 48,
    text: "It's 3am now and I was talking to myself. This its hard rn. I needed this",
    client: "yann.ng14",
    company: "Instagram Community of Entrepreneurs",
    pinned: true,
    requiresConsent: true,
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
    pinned: true,
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
    pinned: true,
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
  {
    id: 76,
    text: "this video is life changing",
    client: "andriiikoo",
    company: "Instagram Community of Entrepreneurs",
    pinned: true,
  },
  {
    id: 77,
    text: "Literally listen to this every Monday night ❤️",
    client: "mr.mazamio",
    company: "Instagram Community of Entrepreneurs",
    pinned: true,
  },
  // Newly added from Instagram thread (deduped where already present)
  { id: 78, text: "I watch this one almost everyday now. It’s just sooo good 😭", client: "_dev_khant", company: "Instagram Community of Entrepreneurs", pinned: true },
  { id: 79, text: "Like this comment to help remind me I need to hear this !!!", client: "nickverne7", company: "Instagram Community of Entrepreneurs" },
  { id: 80, text: "Felt it when he said ‘you make the logical decision instead of the emotional one’", client: "kenneththelim", company: "Instagram Community of Entrepreneurs" },
  { id: 81, text: "Empowerment mode activated 💪✨", client: "hichamechetby", company: "Instagram Community of Entrepreneurs" },
  { id: 82, text: "This is everything…I have always been my own cheerleader… Thank you", client: "juliastreasuresstore", company: "Instagram Community of Entrepreneurs" },
  { id: 83, text: "By far the best monolog for small business owner’s. Thank you Pat everyone who wants to win needs to hear this. The start up owner now knows we have all been there.", client: "macmacguff", company: "Instagram Community of Entrepreneurs", requiresConsent: true },
  { id: 84, text: "I have a big decision ahead of me, I have my college classes orientation tomorrow… do I wait… or do I tell them now that I don’t want to go to college", client: "whatifone_446", company: "Instagram Community of Entrepreneurs", pinned: true, requiresConsent: true },
  { id: 85, text: "Bro described my exact situation sometimes it gets that bad I sit in the car for hours in silence stationary thinking", client: "louistizzy", company: "Instagram Community of Entrepreneurs" },
  { id: 86, text: "Feelings into words couldn’t have been shot better than this video right here …..", client: "shuaib_khan", company: "Instagram Community of Entrepreneurs" },
  { id: 87, text: "needed this", client: "fitnationmg", company: "Instagram Community of Entrepreneurs" },
  { id: 88, text: "This is why I still have Instagram.", client: "notpharaoh_", company: "Instagram Community of Entrepreneurs" },
  { id: 89, text: "Someone please like this, keep liking this so I can come back and watch it every single muthafuckin day. Thank you.", client: "himiam7", company: "Instagram Community of Entrepreneurs" },
  { id: 90, text: "Fuck this hits home", client: "larsonbaldwinofficial", company: "Instagram Community of Entrepreneurs", pinned: true },
  { id: 91, text: "Goosebumps….", client: "dishonshan", company: "Instagram Community of Entrepreneurs" },
  { id: 92, text: "This came when I needed it.", client: "yasssirsaeed", company: "Instagram Community of Entrepreneurs" },
  { id: 93, text: "Been there couple of times but never went to visualisation, made logical decision and I quit! After some months I feel if just hold onto it i would have achieved it🙌❤️", client: "rohan_kohter", company: "Instagram Community of Entrepreneurs", requiresConsent: true },
  { id: 94, text: "My life right now 💀", client: "david__chinedu", company: "Instagram Community of Entrepreneurs" },
  { id: 95, text: "Bro this is me", client: "mustapha.amajoud", company: "Instagram Community of Entrepreneurs" },
  { id: 96, text: "Chills ran down my spine watching this, I know so well what he is talking about… Believe me it‘s worth it.", client: "etem_kalyon", company: "Instagram Community of Entrepreneurs", pinned: true },
  { id: 97, text: "This one hits hard", client: "maciekmob", company: "Instagram Community of Entrepreneurs" },
  { id: 98, text: "In the same exact situation rn, literally iin the car alone. driving.thinking", client: "journey_with_charlie", company: "Instagram Community of Entrepreneurs" },
  { id: 99, text: "I really needed this", client: "onigbogiclassic", company: "Instagram Community of Entrepreneurs" },
  { id: 100, text: "I can relate 💯", client: "ronaldthomson_", company: "Instagram Community of Entrepreneurs" },
  { id: 101, text: "Perfect timing", client: "jordanlm08", company: "Instagram Community of Entrepreneurs" },
  { id: 102, text: "Happened to me tonight. Pivotal moment", client: "sethbrower__", company: "Instagram Community of Entrepreneurs" },
  { id: 103, text: "Been there. Epic video!", client: "keefe.carpenter", company: "Instagram Community of Entrepreneurs" },
  { id: 104, text: "there is power in the words you say to yourself.", client: "birdsonaperch", company: "Instagram Community of Entrepreneurs" },
  { id: 105, text: "Took an opportunity across country… Homeless for 5 months… I have a chance to go back home… But I can’t decide…", client: "isaiham", company: "Instagram Community of Entrepreneurs", pinned: true, requiresConsent: true },
  { id: 106, text: "I’m in that moment right now.", client: "tobyolushola", company: "Instagram Community of Entrepreneurs" },
  { id: 107, text: "Great find @the_design_prism 🔥", client: "t_bekian", company: "Instagram Community of Entrepreneurs" },
]

const takeawaysData: Takeaway[] = [
  { id: 200, handle: "sebastian.guyant", text: "damn, this reframing is incredible", pinned: true },
  { id: 201, handle: "thomas__chapin", text: "Holy fuck did I need this", pinned: true },
  { id: 202, handle: "i_m_y_r_s", text: "This side of Instagram is what keeping me in this app." },
  { id: 203, handle: "aaronwbateman", text: "Not gonna lie… It’s been an hour and I’m still just listening to this on repeat." },
  { id: 204, handle: "guest._.1234564", text: "That’s so logical. Hits Hard 💯" },
  { id: 205, handle: "clauscataldi", text: "“I asked God for strength, and he gave me lots of challenges so i could grow stronger”", requiresConsent: true },
  { id: 206, handle: "clauscataldi", text: "I re heard this like 20 times" },
  { id: 207, handle: "rhys_wynne_", text: "This post was so good I’m locking in 🔥" },
  { id: 208, handle: "mikethomasegan", text: "This hit different … I’m starting college again next week and I need to lock tf in." },
  { id: 209, handle: "20_jin_07", text: "That changed so much in me…", pinned: true, requiresConsent: true },
  { id: 210, handle: "ivanjohnson845", text: "Gotta keep this in my reel cycles" },
  { id: 211, handle: "greegy_the_great", text: "I’m making this my morning alarm" },
  { id: 212, handle: "jenelle.champagne", text: "Like this to bring me back —->>>>" },
  { id: 213, handle: "muhammadkathrada", text: "Holy moly this took me and shook me" },
  { id: 214, handle: "shadow.22052020", text: "I am…… flaberghasted…. it makes so much sense." },
  { id: 215, handle: "icepeaklies", text: "i just realised I’d put the character i made into so much hardships than I ever was, this just tryly humbles me on how caring and merciful God is", pinned: true, requiresConsent: true },
  { id: 216, handle: "lokpalmahajan", text: "Dont know how but sometimes you just hear some words Which was eagerly needed to be heard by you ❤️" },
  { id: 217, handle: "keremtorgay", text: "Thank you for saving me", pinned: true, requiresConsent: true },
  { id: 218, handle: "zanderzone40", text: "Insane (in a good way) take on this, and also this edit of vertical Gladiator is sick too, thanks g" },
  { id: 219, handle: "elizabethmartinkirwan", text: "Amen!! Great perspective" },
  { id: 220, handle: "johananeugene", text: "Deep deep deep stuff right here" },
  { id: 221, handle: "abdulrehmaanhere", text: "Man I’m crying 😭 on the fact of uncertainty" },
  { id: 222, handle: "spencer_kunkel", text: "Wow. Just wow" },
  { id: 223, handle: "reellostproductions", text: "When you look at life from the veiw of the writer, you come to love the story.", requiresConsent: true },
  { id: 224, handle: "brody_bongo", text: "Let’s say I want to use some of these lines for an upcoming short film I’m producing. If anyone could find the original writer (if not this account) so I could give them credit that’d be amazing!", requiresConsent: true },
  { id: 225, handle: "isjebishbas", text: "It is to both overprepare someone and make them enjoy the overpreparing. This way they will overcome the obstacles in their way and keep on training for bigger obstacles.", pinned: true, requiresConsent: true },
  { id: 226, handle: "focus.staymotivated", text: "Pay the toll to reach your goal" },
  { id: 227, handle: "ntarmahemmanuelwisdom", text: "Great word, all the suffering is shaping us into the one we wanna be" },
  { id: 228, handle: "719mula", text: "Jus had a long ahh day thank you🙏🏼" },
  { id: 229, handle: "zippokinghk", text: "Jake the dog said it best. What’s the point in life if you get everything you want. In life you need problems to make us stronger.", pinned: true, requiresConsent: true },
  { id: 230, handle: "hay_bail1", text: "This is so smart" },
  { id: 231, handle: "spellcastingalien", text: "Alex Hormozi and Gladiator was not a mashup I knew I needed but damn" },
  { id: 232, handle: "kdoodlz", text: "That’s actually incredible… flipped my whole perspective", pinned: true },
  { id: 233, handle: "mulu_ferg11", text: "“If you knew you weren’t going to succeed it wouldn’t be worth doing” Damn.", requiresConsent: true },
  { id: 234, handle: "ryankjamess", text: "I found the perfect video." },
  { id: 235, handle: "hunter.domzalski", text: "Everything is more beautiful because one day we won’t be able to observe that beauty… Lastly I hope that while death waits, it doesn’t so patiently.", pinned: true, requiresConsent: true },
  { id: 236, handle: "watrrdog", text: "Holy fuck…" },
  { id: 237, handle: "victimhair_co", text: "This hits." },
  { id: 238, handle: "garlic_soss", text: "Saw this on a right time." },
  { id: 239, handle: "julien.jainrd5", text: "This is the best speech I have heard in a long time." },
  { id: 240, handle: "frankj35", text: "I love this" },
  { id: 241, handle: "jalbers10", text: "This hits. Deep" },
  { id: 242, handle: "krishnasucksatlife", text: "Hits hard man" },
  { id: 243, handle: "zemp_alessandro", text: "Thank you for this video, such powerful message👏" },
  { id: 244, handle: "d.lothian", text: "I was gonna say, I would put them through the deepest love; and then i was like Oh Shit.", requiresConsent: true },
  { id: 245, handle: "derekglatts", text: "According to Tolkien, the doom of men is mortality, but the doom of elves was immortality.", pinned: true, requiresConsent: true },
  { id: 246, handle: "frontendbymaven", text: "Smh now I gotta watch gladiator again for the 10046 time" },
  { id: 247, handle: "kennethyourmom", text: "they envy us because we are mortal, because any moment might be our last, everything is more beautiful, because we are doomed", requiresConsent: true },
  { id: 248, handle: "thescottishkorean", text: "HOW ARE YOU SO RIGHT? WHY ARE YOU NOT MENTORING YOUNG MEN ALL OVER THE WORLD. YOU ARE BRILLIANT", pinned: true },
  { id: 249, handle: "zippokinghk", text: "Jake the dog said it best. What’s the point in life if you get everything you want. In life you need problems to make us stronger.", requiresConsent: true },
  // alt for 50th if avoiding duplicates
  { id: 250, handle: "markmlvnvillarin", text: "It’s about you becoming not what you’re getting. hard🔥!" },
]

const buildDmTemplate = (handle: string, text: string, requiresConsent?: boolean) => {
  if (requiresConsent) {
    return `Hi @${handle}! Your comment — “${text}” — really resonated. With your permission, we’d love to feature it on our Wall of Love (crediting your handle). May we include it? If yes, please reply “Yes, you have my consent.” Thank you!`
  }
  return `@${handle} appreciate you — this takeaway is powerful. Adding it to our inspiration board. 🙏`
}

const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      return true
    } catch {
      return false
    }
  }
}

const TakeawayCard = ({ item }: { item: Takeaway }) => {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    const ok = await copyToClipboard(buildDmTemplate(item.handle, item.text, item.requiresConsent))
    if (ok) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
  }
  return (
    <motion.blockquote
      variants={mobileScrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.4, margin: "50px", once: true }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-neutral-50 p-4 sm:p-5 rounded-xl w-full border border-neutral-200 overflow-hidden"
      aria-label={`Viewer takeaway from @${item.handle}`}
    >
      <p className="text-[15px] sm:text-base text-neutral-800 leading-relaxed tracking-tight">&ldquo;{item.text}&rdquo;</p>
      <footer className="mt-3 flex items-center justify-end gap-2 text-right">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm sm:text-[15px] text-neutral-900">@{item.handle}</p>
          <span className="text-neutral-300">•</span>
          <p className="text-xs sm:text-sm text-neutral-500">Instagram Community of Entrepreneurs</p>
          <button onClick={onCopy} aria-label="Copy message" className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-100 transition-colors">
            {copied ? "copied" : "copy message"}
          </button>
        </div>
      </footer>
    </motion.blockquote>
  )
}

const renderFormattedText = (text: string) => {
  const segments = text.split(/(\*\*.*?\*\*)/g).filter(Boolean)

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-neutral-900 underline decoration-amber-300/50 decoration-2 underline-offset-4"
        >
          {segment.substring(2, segment.length - 2)}
        </strong>
      )
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
  
  // Ensure the new testimonials (id: 76 and 77) appear in the first 10
  const newTestimonialIds = [76, 77]
  newTestimonialIds.forEach(id => {
    const testimonialIndex = newArray.findIndex(q => q.id === id)
    if (testimonialIndex > 9) {
      // Move it to a random position in the first 10
      const newPosition = Math.floor(Math.random() * 10)
      const [testimonial] = newArray.splice(testimonialIndex, 1)
      newArray.splice(newPosition, 0, testimonial)
    }
  })
  
  return newArray
}

const TestimonialCard = ({ quote, viewport }: { quote: Quote; viewport: UseInViewOptions }) => {
  return (
    <motion.blockquote
      variants={mobileScrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, amount: 0.4, margin: "50px" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-neutral-50 p-4 sm:p-5 rounded-xl w-full border border-neutral-200 overflow-hidden"
      style={{
        contain: "paint style",
        willChange: "transform, opacity",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
      aria-label={`Testimonial from ${quote.client}`}
    >
      <p className="text-[15px] sm:text-base text-neutral-800 leading-relaxed tracking-tight">
        &ldquo;{renderFormattedText(quote.text)}&rdquo;
      </p>
      <footer className="mt-3 flex items-center justify-end gap-2 text-right">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm sm:text-[15px] text-neutral-900">{quote.client}</p>
          <span className="text-neutral-300">•</span>
          <p className="text-xs sm:text-sm text-neutral-500">{quote.company}</p>
        </div>
      </footer>
    </motion.blockquote>
  )
}

export default function WallOfLoveClientPage() {
  const { getViewportConfig } = useMobileAnimations()
  const viewport = getViewportConfig()
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([])
  const [visibleCount, setVisibleCount] = useState(15) // Increased from 10 to 15
  const loadMoreRef = useRef<HTMLDivElement>(null)
  // Initialize with proper SSR-friendly default
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false // SSR default
    }
    return window.innerWidth < 768
  })
  const [isHydrated, setIsHydrated] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const unpinnedQuotes = useMemo(() => {
    const base = isHydrated ? shuffledQuotes : quotesData
    return base.filter((q) => !q.pinned)
  }, [isHydrated, shuffledQuotes])
  const totalUnpinned = unpinnedQuotes.length

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement
      
      // Handle load more detection
      if (element === loadMoreRef.current && entry.isIntersecting) {
        setVisibleCount(prev => Math.min(prev + (isMobile ? 5 : 8), totalUnpinned))
      }
    })
  }, [isMobile, totalUnpinned])

  useEffect(() => {
    setIsHydrated(true)
    // Avoid layout shift: use stable order on first paint, then shuffle after a frame
    setShuffledQuotes(quotesData)
    const raf = requestAnimationFrame(() => {
      setShuffledQuotes(shuffleArray(quotesData))
    })

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    // Observer for load-more detection
    observerRef.current = new IntersectionObserver(
      observerCallback,
      { 
        threshold: 0.1, 
        rootMargin: "60px"
      }
    )

    // Observe load more element if it exists
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [observerCallback])

  useEffect(() => {
    if ('ontouchstart' in window) {
      document.documentElement.style.setProperty('--touch-action', 'pan-y')
    }
  }, [])

  return (
    <>
      <section className="relative w-full py-10 sm:py-12 bg-white">
        <div className="w-full max-w-[720px] mx-auto px-4 text-center">
          <div className="space-y-3">
            <div className="text-4xl">❤️</div>
            <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-tight lowercase text-neutral-900">wall of love</h1>
            <div className="text-[13px] sm:text-[14px] text-neutral-600 lowercase flex items-center justify-center gap-3">
              <span>38.5k+ on instagram</span>
              <span className="text-neutral-300">•</span>
              <span>24.5k+ on youtube</span>
            </div>
            <div className="pt-1">
              <Link href="/get-started">
                <Button size="sm" className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-5 py-2.5 text-sm lowercase" aria-label="Hire Prism">
                  hire prism <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured pinned comments carousel */}
      <section className="bg-neutral-50 border-t border-neutral-100">
        <div className="w-full max-w-[720px] mx-auto px-4 py-6 sm:py-8">
          <h2 className="text-[15px] sm:text-[16px] font-medium text-neutral-900 mb-3">what people are saying</h2>
          <Carousel>
            <CarouselContent className="[contain:content] will-change-transform">
              {quotesData.filter(q => q.pinned).map((quote) => (
                <CarouselItem key={`pinned-${quote.id}`} className="basis-full">
                  <TestimonialCard quote={quote} viewport={{ amount: 0.2, once: true }} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Viewer takeaways carousel */}
      <section className="bg-neutral-50 border-t border-neutral-100">
        <div className="w-full max-w-[720px] mx-auto px-4 pb-4 sm:pb-6">
          <h2 className="text-[15px] sm:text-[16px] font-medium text-neutral-900 mb-3">viewer takeaways</h2>
          <Carousel>
            <CarouselContent className="[contain:content] will-change-transform">
              {takeawaysData.filter(t => t.pinned).map((item) => (
                <CarouselItem key={`takeaway-pinned-${item.id}`} className="basis-full">
                  <TakeawayCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <div className="bg-neutral-50">
        <main className="w-full max-w-[720px] mx-auto px-4 py-8 sm:py-10">
          <div className="space-y-4 sm:space-y-5" style={{ transform: "translateZ(0)" }}>
            {unpinnedQuotes.slice(0, visibleCount).map((quote) => (
              <TestimonialCard key={quote.id} quote={quote} viewport={viewport} />
            ))}
            {/* Non-pinned takeaways list below testimonials */}
            <div className="space-y-4 sm:space-y-5 pt-6">
              {takeawaysData.filter(t => !t.pinned).slice(0, 18).map((item) => (
                <TakeawayCard key={`takeaway-${item.id}`} item={item} />
              ))}
            </div>
          </div>
          
          {visibleCount < totalUnpinned && (
            <div ref={loadMoreRef} className="h-12 flex items-center justify-center mt-6" aria-live="polite">
              <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            </div>
          )}
        </main>
      </div>
    </>
  )
}
