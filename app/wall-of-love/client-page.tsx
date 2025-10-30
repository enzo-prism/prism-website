"use client"

import { Button } from "@/components/ui/button"
// animations removed for a simpler, static page
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { trackCTAClick } from "@/utils/analytics"

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

type FeedItem =
  | { kind: "quote"; data: Quote }
  | { kind: "takeaway"; data: Takeaway }

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
  { id: 108, text: "🙌🏽", client: "sbongadubazana", company: "Instagram Community of Entrepreneurs" },
  { id: 109, text: "💯", client: "markghalumyan7", company: "Instagram Community of Entrepreneurs" },
  { id: 110, text: "💯", client: "princeforbes_", company: "Instagram Community of Entrepreneurs" },
  { id: 111, text: "🔥", client: "ieeshan7", company: "Instagram Community of Entrepreneurs" },
  { id: 112, text: "🔥", client: "jadenbottarini", company: "Instagram Community of Entrepreneurs" },
  { id: 113, text: "❤️❤️❤️🔥", client: "abo_3obd1312", company: "Instagram Community of Entrepreneurs" },
  { id: 114, text: "🔥", client: "julian_mcalster", company: "Instagram Community of Entrepreneurs" },
  { id: 115, text: "Love this ❤️", client: "thebiggestfx", company: "Instagram Community of Entrepreneurs" },
  { id: 116, text: "It changed my mind", client: "moasis7abakar", company: "Instagram Community of Entrepreneurs" },
  { id: 117, text: "Amen 🙏🙌", client: "sammdima7", company: "Instagram Community of Entrepreneurs" },
  { id: 118, text: "💯", client: "chinosavage98", company: "Instagram Community of Entrepreneurs" },
  { id: 119, text: "👏", client: "themujahidsiddique", company: "Instagram Community of Entrepreneurs" },
  { id: 120, text: "😍", client: "levshahh", company: "Instagram Community of Entrepreneurs" },
  { id: 121, text: "👏 (gif)", client: "1imbai", company: "Instagram Community of Entrepreneurs" },
  { id: 122, text: "🔥👏", client: "bozorgi.marketing", company: "Instagram Community of Entrepreneurs" },
  { id: 123, text: "👏", client: "kairuiii", company: "Instagram Community of Entrepreneurs" },
  { id: 124, text: "🔥🔥", client: "artbystill", company: "Instagram Community of Entrepreneurs" },
  { id: 125, text: "🔥", client: "salviofrv", company: "Instagram Community of Entrepreneurs" },
  { id: 126, text: "🔥🔥", client: "singh_.331", company: "Instagram Community of Entrepreneurs" },
  { id: 127, text: "🔥👏👏👏😍", client: "rellik_ktl", company: "Instagram Community of Entrepreneurs" },
  { id: 128, text: "❤️", client: "samuel_akecho", company: "Instagram Community of Entrepreneurs" },
  { id: 129, text: "🔥", client: "eduardo_arenas__", company: "Instagram Community of Entrepreneurs" },
  { id: 130, text: "This is so real", client: "notbrandontref", company: "Instagram Community of Entrepreneurs" },
  { id: 131, text: "👏👏👏👏", client: "maryam.1358.m", company: "Instagram Community of Entrepreneurs" },
  { id: 132, text: "🔥", client: "ndaya8375", company: "Instagram Community of Entrepreneurs" },
  { id: 133, text: "💯", client: "trki_28", company: "Instagram Community of Entrepreneurs" },
  { id: 134, text: "🙌", client: "kundan_kumar112", company: "Instagram Community of Entrepreneurs" },
  { id: 135, text: "👏👏👏", client: "zyvenai", company: "Instagram Community of Entrepreneurs" },
  { id: 136, text: "👏👏👏", client: "harri_son0", company: "Instagram Community of Entrepreneurs" },
  { id: 137, text: "❤️‍🔥", client: "369tfn", company: "Instagram Community of Entrepreneurs" },
  { id: 138, text: "❤️", client: "imagine_3333", company: "Instagram Community of Entrepreneurs" },
  { id: 139, text: "❤️‍🩹", client: "deception_000", company: "Instagram Community of Entrepreneurs" },
  { id: 140, text: "🙌💯🔥", client: "rudyrl.98", company: "Instagram Community of Entrepreneurs" },
  { id: 141, text: "🔥", client: "nikotsironis", company: "Instagram Community of Entrepreneurs" },
  { id: 142, text: "🙌", client: "e.x422", company: "Instagram Community of Entrepreneurs" },
  { id: 143, text: "🙌", client: "cyprian_masvikeni", company: "Instagram Community of Entrepreneurs" },
  { id: 144, text: "🔥🔥🔥🔥🔥", client: "miguel_riveryjuggking", company: "Instagram Community of Entrepreneurs" },
  { id: 145, text: "Fire 🔥", client: "theprincetrading_", company: "Instagram Community of Entrepreneurs" },
  { id: 146, text: "💯💯", client: "sw1pess", company: "Instagram Community of Entrepreneurs" },
  { id: 147, text: "Interesting.", client: "officialronaldnyirenda", company: "Instagram Community of Entrepreneurs" },
  { id: 148, text: "I had nothing to lose.", client: "officialronaldnyirenda", company: "Instagram Community of Entrepreneurs" },
  { id: 149, text: "Powerful.", client: "officialronaldnyirenda", company: "Instagram Community of Entrepreneurs" },
  { id: 150, text: "Get back up", client: "kipchumber", company: "Instagram Community of Entrepreneurs" },
  { id: 151, text: "GET RICH OR DIE TRYING YOU ONLY LIVE ONCE 😭😭😭", client: "vincetopg42069", company: "Instagram Community of Entrepreneurs" },
  { id: 152, text: "Men behind social media were just so extraordinary 🔥🔥🔥", client: "in.afnankhan", company: "Instagram Community of Entrepreneurs" },
  { id: 153, text: "Definitely needed this", client: "native._calabash", company: "Instagram Community of Entrepreneurs" },
  { id: 154, text: "I own 3 companies at 19. My name under my own LLC, you can too. Stop complaining and start doing.", client: "parckis_", company: "Instagram Community of Entrepreneurs" },
  { id: 155, text: "God please allow me live long. Life is very sweet❤️", client: "fo____lu", company: "Instagram Community of Entrepreneurs" },
  { id: 156, text: "Exactly", client: "nicolasjribas01", company: "Instagram Community of Entrepreneurs" },
  { id: 157, text: "To call it a risk is to say you lack conviction. If you know it's going to work, there is no risk, only reward.", client: "youngillusion_", company: "Instagram Community of Entrepreneurs" },
  { id: 158, text: "What do you think about this!", client: "jenje_kane", company: "Instagram Community of Entrepreneurs" },
  { id: 159, text: "1,2,3,4… failures never mean the end. Every dog got its day. Be grateful u actually took the risk and learnt some shit. Hunger is something that cannot be bought.", client: "ssschemin", company: "Instagram Community of Entrepreneurs" },
  { id: 160, text: "We have nothing to lose but have everything to gain.", client: "yadelew.t", company: "Instagram Community of Entrepreneurs" },
  { id: 161, text: "Worst case I get a 9-5 like everybody else my worst case is their best case.", client: "jesse_94si", company: "Instagram Community of Entrepreneurs" },
  { id: 162, text: "Yeah man alex said the same thing... If it's hard now then it will be nearly impossible later..", client: "naushadd__01", company: "Instagram Community of Entrepreneurs" },
  { id: 163, text: "Get rich or Regret Not Trying", client: "hfrmdawick4", company: "Instagram Community of Entrepreneurs" },
  { id: 164, text: "Take that risk blud, take the fvckin biggest risk in your life this month!", client: "brandonkenagwa", company: "Instagram Community of Entrepreneurs" },
  { id: 165, text: "Nothing to lose, everything to gain…", client: "log_burt", company: "Instagram Community of Entrepreneurs" },
  { id: 166, text: "The experience and skills learnt are very worth it. Start something now", client: "aura.naire", company: "Instagram Community of Entrepreneurs" },
  { id: 167, text: "If they had nothing to lose then there was no real risk", client: "21protagonist", company: "Instagram Community of Entrepreneurs" },
  { id: 168, text: "Experience,, that's it", client: "alihamzza74", company: "Instagram Community of Entrepreneurs" },
  { id: 169, text: "Winning or losing don't matter a lot as much as you doing the work", client: "lifeofsabio", company: "Instagram Community of Entrepreneurs" },
  { id: 170, text: "Role model", client: "darenavci127", company: "Instagram Community of Entrepreneurs" },
  { id: 171, text: "The best thing I have ever heard today", client: "rahim.highticketsales", company: "Instagram Community of Entrepreneurs" },
  { id: 172, text: "Very true 🙌🙌", client: "mentor_anshuman", company: "Instagram Community of Entrepreneurs" },
  { id: 173, text: "Top tier wisdom for generations", client: "guts00777", company: "Instagram Community of Entrepreneurs" },
  { id: 174, text: "That is hundred % right", client: "hanadhero95", company: "Instagram Community of Entrepreneurs" },
  { id: 175, text: "Using this mindset 🔥", client: "manifestationflo", company: "Instagram Community of Entrepreneurs" },
  { id: 176, text: "Man,this is golden ✨️✨️❤️", client: "autosync", company: "Instagram Community of Entrepreneurs" },
  { id: 177, text: "No risk no reward", client: "realkopssworld", company: "Instagram Community of Entrepreneurs" },
  { id: 178, text: "🔥🔥🔥🔥🔥🙌amen.", client: "jhumble666", company: "Instagram Community of Entrepreneurs" },
  { id: 179, text: "We have nothing to lose lads", client: "usman.ssg_", company: "Instagram Community of Entrepreneurs" },
  { id: 180, text: "Levels 🙌🔥", client: "08_harsh__", company: "Instagram Community of Entrepreneurs" },
  { id: 181, text: "Word🔥🔥", client: "ahmaadshehu", company: "Instagram Community of Entrepreneurs" },
  { id: 182, text: "🔥", client: "juztmason", company: "Instagram Community of Entrepreneurs" },
  { id: 183, text: "💯🎯", client: "ryanbradleyowens", company: "Instagram Community of Entrepreneurs" },
  { id: 184, text: "🔥🔥", client: "_therahulyadav__", company: "Instagram Community of Entrepreneurs" },
  { id: 185, text: "🙌", client: "mrodbet", company: "Instagram Community of Entrepreneurs" },
  { id: 186, text: "These were the sickest 2 minutes of that 2 hour video. Thank you for extracting it!", client: "ricardoprosperi", company: "Instagram Community of Entrepreneurs" },
  { id: 187, text: "👏", client: "barryy_off", company: "Instagram Community of Entrepreneurs" },
  { id: 188, text: "🔥🔥🔥", client: "providante", company: "Instagram Community of Entrepreneurs" },
  { id: 189, text: "👏", client: "patrickptruong", company: "Instagram Community of Entrepreneurs" },
  { id: 190, text: "Man literally I got answer for my current situation. Thank you @hormozi", client: "adhity_pa", company: "Instagram Community of Entrepreneurs" },
  { id: 191, text: "1% Men Welcome!", client: "1percent_men", company: "Instagram Community of Entrepreneurs" },
  { id: 192, text: "More people who don’t want this news to hear this.", client: "dlmiris", company: "Instagram Community of Entrepreneurs" },
  { id: 193, text: "It wasn't pretty but it was worth it.", client: "he.ls.him", company: "Instagram Community of Entrepreneurs" },
  { id: 194, text: "Time to get back to work.", client: "ezekiehl_", company: "Instagram Community of Entrepreneurs" },
  { id: 195, text: "Jesus in my Lord and King!!!", client: "stevenrushwittner", company: "Instagram Community of Entrepreneurs" },
  { id: 196, text: "This should be illegal for being this good.", client: "relevique", company: "Instagram Community of Entrepreneurs" },
  { id: 197, text: "Achievement comes from actions not aspirations.", client: "mujamajor", company: "Instagram Community of Entrepreneurs" },
  { id: 198, text: "This kept me going, thanks, btw what’s the song name?", client: "professorguac", company: "Instagram Community of Entrepreneurs" },
  { id: 199, text: "Damn…", client: "tomshawuk", company: "Instagram Community of Entrepreneurs" },
  { id: 200, text: "Facts", client: "itslukasts", company: "Instagram Community of Entrepreneurs" },
  { id: 201, text: "مكتوب — it is written", client: "mathewsalameh", company: "Instagram Community of Entrepreneurs" },
  { id: 202, text: "Wow, that's powerful. Thank you Hormozi!!", client: "dallinbunnell", company: "Instagram Community of Entrepreneurs" },
  { id: 203, text: "Straight roads don’t make for good drivers and if it ain’t tough, it ain’t worth it", client: "victor.siqueira.barbosa", company: "Instagram Community of Entrepreneurs" },
  { id: 204, text: "Glorious 🤌🏻✨", client: "aviibhardwaj", company: "Instagram Community of Entrepreneurs" },
  { id: 205, text: "This kinda content > EVERYTHING", client: "csuarezftw", company: "Instagram Community of Entrepreneurs" },
  { id: 206, text: "Which podcast/show is this from?", client: "reb_lee555", company: "Instagram Community of Entrepreneurs" },
  { id: 207, text: "Dear God this reel is beautiful👏", client: "ali._celestial", company: "Instagram Community of Entrepreneurs" },
  { id: 208, text: "Gladiator 🔥", client: "rj.mendoza_", company: "Instagram Community of Entrepreneurs" },
  { id: 209, text: "'Nothing happens to any man that he is not formed by nature to bear' 🙌", client: "rigyall", company: "Instagram Community of Entrepreneurs" },
  { id: 210, text: "Hormozi will always be my goat 🐐", client: "fidanovm7", company: "Instagram Community of Entrepreneurs" },
  { id: 211, text: "Damn, this is hitting hard. People see how patient and tough I am because what I've went through. I love all of what was just said.", client: "frazerkeaton", company: "Instagram Community of Entrepreneurs" },
  { id: 212, text: "Trials.", client: "thebookopener", company: "Instagram Community of Entrepreneurs" },
  { id: 213, text: "Pay the toll to reach your goal", client: "focus.ire", company: "Instagram Community of Entrepreneurs" },
  { id: 214, text: "Beautiful", client: "carlos.nxva", company: "Instagram Community of Entrepreneurs" },
  { id: 215, text: "@hormozi is definitely worth a follow on here and also YouTube!", client: "kai.ringeisen", company: "Instagram Community of Entrepreneurs" },
  { id: 216, text: "👏", client: "vani7561", company: "Instagram Community of Entrepreneurs" },
  { id: 217, text: "Just wow 👏", client: "zorwealth", company: "Instagram Community of Entrepreneurs" },
  { id: 218, text: "This is beautiful man 🙏🏼", client: "danielekimian", company: "Instagram Community of Entrepreneurs" },
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

// removed copy/DM helpers to simplify UI

const TakeawayCard = ({ item }: { item: Takeaway }) => {
  return (
    <blockquote
      className="bg-neutral-50 p-4 sm:p-5 rounded-xl w-full border border-neutral-200 overflow-hidden"
      aria-label={`Viewer takeaway from @${item.handle}`}
    >
      <p className="text-[15px] sm:text-base text-neutral-800 leading-relaxed tracking-tight">&ldquo;{item.text}&rdquo;</p>
      <footer className="mt-3 flex items-center justify-end gap-2 text-right">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm sm:text-[15px] text-neutral-900">@{item.handle}</p>
          <span className="text-neutral-300">•</span>
          <p className="text-xs sm:text-sm text-neutral-500">Instagram Community of Entrepreneurs</p>
        </div>
      </footer>
    </blockquote>
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

// Generic Fisher–Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = array.slice()
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const TestimonialCard = ({ quote }: { quote: Quote }) => {
  return (
    <blockquote
      className="bg-neutral-50 p-4 sm:p-5 rounded-xl w-full border border-neutral-200 overflow-hidden"
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
    </blockquote>
  )
}

export default function WallOfLoveClientPage() {
  const combinedFeed: FeedItem[] = useMemo(
    () => [
      ...quotesData.map((q) => ({ kind: "quote", data: q } as FeedItem)),
      ...takeawaysData.map((t) => ({ kind: "takeaway", data: t } as FeedItem)),
    ],
    []
  )

  const [feed, setFeed] = useState<FeedItem[]>(combinedFeed)
  const reviewCount = combinedFeed.length

  useEffect(() => {
    setFeed(shuffleArray(combinedFeed))
  }, [combinedFeed])
  // minimal vertical list – no carousels, observers, or shuffling

  return (
    <>
      <section className="relative w-full py-10 sm:py-12 bg-white">
        <div className="w-full max-w-[720px] mx-auto px-4 text-center">
          <div className="space-y-3">
            <div className="text-4xl">❤️</div>
            <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-tight lowercase text-neutral-900">wall of love</h1>
            <p className="text-[14px] sm:text-[15px] text-neutral-700 italic lowercase">impossible is temporary.</p>
            <div className="text-[13px] sm:text-[14px] text-neutral-600 lowercase flex items-center justify-center gap-3">
              <span>40,000+ on instagram</span>
              <span className="text-neutral-300">•</span>
              <span>24.5k+ on youtube</span>
            </div>
            <div className="pt-1 flex items-center justify-center">
              <Link href="/pricing">
                <Button
                  size="sm"
                  className="rounded-full px-6 py-2.5 text-sm lowercase bg-neutral-900 text-white hover:bg-neutral-800"
                  onClick={() => trackCTAClick("wall_of_love_pricing_cta", "/pricing")}
                >
                  let's make something you'll love <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* simple vertical lists – carousels removed */}

      <div className="bg-neutral-50">
        <main className="w-full max-w-[720px] mx-auto px-4 py-8 sm:py-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-400 text-center">
            {reviewCount.toLocaleString()} voices from our community
          </p>
          <div className="space-y-4 sm:space-y-5">
            {feed.map((item) =>
              item.kind === "quote" ? (
                <TestimonialCard key={`quote-${item.data.id}`} quote={item.data} />
              ) : (
                <TakeawayCard key={`takeaway-${item.data.id}`} item={item.data} />
              )
            )}
          </div>
        </main>
      </div>
    </>
  )
}
