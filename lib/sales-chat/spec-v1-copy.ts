import type { OfferRecommendation, QuickReply, SalesChatSpecRuntimeLinks } from "@/lib/sales-chat/spec-v1-types"

export type NodeReply = {
  assistantMessage: string
  quickReplies: QuickReply[]
  recommendedOffer?: OfferRecommendation
}

function reply(id: string, label: string): QuickReply {
  return { id, label, actionType: "reply" }
}

function openUrl(id: string, label: string, url: string): QuickReply {
  return { id, label, actionType: "open_url", url }
}

function openBooking(id: string, label: string): QuickReply {
  return { id, label, actionType: "open_booking" }
}

export function welcomeCopy(): NodeReply {
  return {
    assistantMessage:
      "Hey, I'm Prism's assistant. I can help you figure out the fastest way to grow your business online.\n\n" +
      "Here's what I can do for you right now:\n" +
      "-> Get a free expert audit of your website and marketing\n" +
      "-> Buy a complete website overhaul ($1,000 one-time)\n" +
      "-> Explore Prism as your $2,000/month growth partner\n" +
      "-> Not sure yet - I'll help you choose\n\n" +
      "What sounds closest to what you need?",
    quickReplies: [
      reply("starter_free_audit", "Get a free audit of my website"),
      reply("starter_website", "I need a new or better website"),
      reply("starter_growth_partner", "I want a growth partner ($2K/mo)"),
      reply("starter_help_choose", "Help me figure out what's best"),
      reply("starter_general_question", "I just have a question about Prism"),
    ],
  }
}

export function intentAStartCopy(): NodeReply {
  return {
    assistantMessage:
      "No problem - let me ask a few quick questions and I'll recommend the best path for you.\n\n" +
      "First: do you already have a website for your business?",
    quickReplies: [
      reply("a_has_site_yes", "Yes, I have a site"),
      reply("a_has_site_no", "No, I need one built"),
    ],
  }
}

export function intentAHasSiteFollowupCopy(): NodeReply {
  return {
    assistantMessage: "Got it. What's your biggest frustration with your current site or online presence?",
    quickReplies: [
      reply("a_has_site_outdated", "It looks outdated or unprofessional"),
      reply("a_has_site_no_leads", "It's not bringing in leads or customers"),
      reply("a_has_site_doing_it_all", "I'm doing all the marketing myself and I'm stuck"),
      reply("a_has_site_tell_me_fix", "I just want someone to tell me what to fix"),
    ],
  }
}

export function intentANoSiteFollowupCopy(): NodeReply {
  return {
    assistantMessage: "Got it - starting fresh. What's most important to you right now?",
    quickReplies: [
      reply("a_no_site_fast", "Get a professional site up fast"),
      reply("a_no_site_full_partner", "I want a full marketing partner, not just a site"),
      reply("a_no_site_unsure", "I'm not sure what I need yet"),
    ],
  }
}

export function intentAUnsureBusinessTypeCopy(): NodeReply {
  return {
    assistantMessage: "Totally fine. Here's an easy one: what kind of business do you run?",
    quickReplies: [
      reply("a_business_dental", "Dental / medical practice"),
      reply("a_business_local", "Local retail or service business"),
      reply("a_business_consulting", "Consulting or professional services"),
      reply("a_business_community", "Online community or membership"),
      reply("a_business_nonprofit", "Nonprofit or education"),
    ],
  }
}

export function routeToWebsiteOverhaulCopy(): NodeReply {
  return {
    assistantMessage:
      "Sounds like a website overhaul would be perfect. Prism can rebuild your entire site - modern design, mobile-first, SEO-ready, and built to convert - for $1,000 one-time.\n\n" +
      "Want me to walk you through what's included, or are you ready to get started?",
    quickReplies: [
      reply("c_walkthrough", "Tell me what's included"),
      reply("c_ready", "I'm ready - let's go"),
      reply("b_start", "I'd rather start with a free audit first"),
    ],
    recommendedOffer: "website_overhaul",
  }
}

export function routeToGrowthPartnerNoLeadsCopy(): NodeReply {
  return {
    assistantMessage:
      "If your site exists but isn't generating leads, the issue is usually messaging, SEO, and ads - not just design.\n\n" +
      "Prism's $2,000/month Growth Partnership handles all of that: your website, SEO, ads, and design so you stop being the bottleneck.\n\n" +
      "The best next step is a 30-minute strategy call where we'll map what's holding you back. Want to grab a time?",
    quickReplies: [
      openBooking("book_call", "Book a 30-min call"),
      reply("d_scope", "Tell me more about the partnership"),
      reply("b_start", "Start with a free audit instead"),
    ],
    recommendedOffer: "growth_partnership",
  }
}

export function routeToGrowthPartnerDoingAllCopy(): NodeReply {
  return {
    assistantMessage:
      "That's exactly what the Online Presence Transformation program solves. For $2,000/month you get a dedicated team - website developer, designer, marketer, and project manager - working 7 days a week so you can focus on running your business.\n\n" +
      "A quick 30-minute call is the fastest way to see if it's a fit. Want to book one?",
    quickReplies: [
      openBooking("book_call", "Book a 30-min call"),
      reply("d_scope", "What exactly is included?"),
      reply("f_expensive", "That sounds expensive - what else do you have?"),
    ],
    recommendedOffer: "growth_partnership",
  }
}

export function routeToFreeAuditCopy(): NodeReply {
  return {
    assistantMessage:
      "Perfect - that's exactly what our free expert audit is for. The Prism team will review your website, Google visibility, and messaging, then send a tailored analysis with specific recommendations.\n\n" +
      "It takes about 60 seconds to request. Want to do it now?",
    quickReplies: [
      reply("b_start", "Yes, get me a free audit"),
      openBooking("b_live_call", "Can we do it live on a call instead?"),
    ],
    recommendedOffer: "free_audit",
  }
}

export function routeAUnsureRecommendationCopy(businessType: string): NodeReply {
  return {
    assistantMessage:
      `Nice - we work with a lot of ${businessType} businesses. Based on what you've told me, I'd recommend starting with the Free Expert Audit so you get immediate clarity with zero risk.\n\n` +
      "Here's what I'd suggest as next steps:\n" +
      "-> Get your free audit\n" +
      "-> Book a 30-minute call if you'd like to move faster",
    quickReplies: [
      reply("b_start", "Get your free audit"),
      openBooking("book_call", "Book a 30-min call"),
      reply("d_start", "Tell me about the $2K/mo partnership"),
    ],
    recommendedOffer: "free_audit",
  }
}

export function intentBPitchCopy(): NodeReply {
  return {
    assistantMessage:
      "Great choice. The Prism team will do a full expert audit of your online presence - your website, Google visibility, and messaging - and send a tailored analysis with actionable recommendations.\n\n" +
      "It's completely free. I just need a few details. What's your website URL?",
    quickReplies: [
      reply("b_skip_url", "I don't have a website yet"),
      openBooking("book_call", "Book a 30-min call instead"),
    ],
    recommendedOffer: "free_audit",
  }
}

export function intentBCollectBusinessTypeCopy(): NodeReply {
  return {
    assistantMessage: "Got it - what type of business is this?",
    quickReplies: [
      reply("b_business_dental", "Dental / medical"),
      reply("b_business_local", "Local retail / shop"),
      reply("b_business_consulting", "Consulting / services"),
      reply("b_business_community", "Online community"),
      reply("b_business_nonprofit", "Nonprofit / education"),
    ],
  }
}

export function intentBCollectPainCopy(): NodeReply {
  return {
    assistantMessage: "And what's the #1 thing frustrating you about your online presence right now?",
    quickReplies: [
      reply("b_need_help_writing", "Help me write this quickly"),
      openBooking("book_call", "Book a call and review live"),
    ],
  }
}

export function intentBCollectEmailCopy(): NodeReply {
  return {
    assistantMessage: "Last thing - what's the best email to send your free audit to?",
    quickReplies: [
      openBooking("book_call", "Book a 30-min call too"),
    ],
  }
}

export function intentBConfirmCopy(runtimeLinks: SalesChatSpecRuntimeLinks): NodeReply {
  return {
    assistantMessage:
      "You're all set!\n\n" +
      "Here's what happens next:\n" +
      "-> The Prism team will review your site and send a personalized audit within 1-2 business days.\n\n" +
      "If you want to speed things up and do this live, we can cover it on a 30-minute strategy call. You'll still get the written audit either way. Want to book a call too?",
    quickReplies: [
      openUrl("b_book_call_too", "Book a 30-min call too", runtimeLinks.bookingUrl),
      reply("b_written_only", "The written audit is great for now"),
    ],
    recommendedOffer: "free_audit",
  }
}

export function intentBWrittenOnlyCopy(): NodeReply {
  return {
    assistantMessage:
      "Perfect - keep an eye on your inbox. The team will have your audit ready soon.\n\n" +
      "If you want to explore what a full partnership looks like, check out our case studies: https://www.design-prism.com/case-studies\n\n" +
      "Anything else I can help with?",
    quickReplies: [
      reply("starter_help_choose", "Help me choose an offer"),
      reply("d_start", "Tell me about the Growth Partnership"),
      openBooking("book_call", "Book a 30-min call"),
    ],
  }
}

export function intentCPitchCopy(): NodeReply {
  return {
    assistantMessage:
      "Prism builds fast, modern websites designed to convert visitors into customers. Here's what's included in a complete website overhaul ($1,000 one-time):\n" +
      "- Brand-calibrated modern design\n" +
      "- Conversion-first architecture with clear CTAs\n" +
      "- Mobile-first fast Next.js build\n" +
      "- Technical SEO built in\n" +
      "- Analytics and tracking setup\n" +
      "- Launch support and team training\n\n" +
      "Want to see examples, or are you ready to get started?",
    quickReplies: [
      reply("c_examples", "Show me examples"),
      reply("c_ready", "I'm ready to get started"),
      reply("c_questions", "I have a few questions first"),
    ],
    recommendedOffer: "website_overhaul",
  }
}

export function intentCExamplesCopy(): NodeReply {
  return {
    assistantMessage:
      "Here are a few recent launches:\n\n" +
      "- Exquisite Dentistry -> exquisitedentistryla.com\n" +
      "- Olympic Bootworks -> olympicbootworks.com\n" +
      "- Coast Periodontics -> coastperiodontics.com\n" +
      "- Rebellious Aging -> rebelwithsuz.com\n" +
      "- Canary Foundation -> canaryfoundation.org\n\n" +
      "Want to see more, or ready to get started on yours?",
    quickReplies: [
      reply("c_ready", "I'm ready - let's do this"),
      reply("e_website_timeline", "How long does it take?"),
      openBooking("book_call", "Book a call to discuss my project"),
    ],
  }
}

export function intentCQualificationCopy(): NodeReply {
  return {
    assistantMessage:
      "Let's make sure this is the right fit. Quick questions:\n" +
      "1. Do you have an existing website, or is this from scratch?\n" +
      "2. Roughly how many pages do you need?\n" +
      "3. What's the main goal - more leads, more customers, better credibility, or something else?",
    quickReplies: [
      reply("c_has_existing_site", "I have an existing website"),
      reply("c_from_scratch", "From scratch"),
      reply("c_share_scope", "I'll share scope in one message"),
    ],
  }
}

export function intentCCloseCopy(runtimeLinks: SalesChatSpecRuntimeLinks): NodeReply {
  return {
    assistantMessage:
      "Based on what you've shared, this looks like a great fit for the $1,000 website overhaul.\n\n" +
      "You have two options:\n" +
      "-> Pay now and start immediately\n" +
      "-> Book a 30-minute call first\n\n" +
      "Which do you prefer?",
    quickReplies: [
      openUrl("c_pay_now", "Pay now and start immediately", runtimeLinks.websiteOverhaulCheckoutUrl),
      openUrl("c_book_call", "Book a call first", runtimeLinks.bookingUrl),
      reply("c_scope_questions", "I have more scope questions"),
    ],
    recommendedOffer: "website_overhaul",
  }
}

export function intentCPayNowCopy(runtimeLinks: SalesChatSpecRuntimeLinks): NodeReply {
  return {
    assistantMessage:
      `Here's the secure payment link: ${runtimeLinks.websiteOverhaulCheckoutUrl}\n\n` +
      "Once payment is confirmed, I'll walk you through intake:\n" +
      "- business name and industry\n" +
      "- brand assets\n" +
      "- must-have pages and features\n" +
      "- sites you admire\n\n" +
      "After payment, tap below so I can open intake.",
    quickReplies: [
      reply("c_payment_confirmed", "Payment completed"),
      openUrl("book_call", "Book a 30-min call instead", runtimeLinks.bookingUrl),
    ],
  }
}

export function intentCPaymentConfirmedCopy(): NodeReply {
  return {
    assistantMessage:
      "Payment received - you're in!\n\n" +
      "Let's lock your project details:\n" +
      "1. Business name and what you do\n" +
      "2. Brand colors/logo/fonts\n" +
      "3. Required pages\n" +
      "4. Reference websites\n" +
      "5. Anything else the team should know",
    quickReplies: [
      reply("c_share_intake_now", "I'll share intake details now"),
      openBooking("book_call", "Book kickoff call"),
    ],
  }
}

export function intentDPitchCopy(): NodeReply {
  return {
    assistantMessage:
      "The Online Presence Transformation is Prism's flagship program. For $2,000/month, you get a dedicated team working 7 days a week: website developer, designer, marketer/storyteller, and project manager.\n\n" +
      "We handle your website, design, Google Ads, Meta Ads, local SEO, analytics, and reporting so you stop being the bottleneck.\n\n" +
      "The best next step is a 30-minute strategy call. Want to book one?",
    quickReplies: [
      openBooking("book_call", "Book a 30-min strategy call"),
      reply("d_scope", "What exactly do you handle?"),
      reply("d_ready_signup", "I'm ready to sign up now"),
      reply("d_big_commitment", "That's a big commitment - tell me more"),
    ],
    recommendedOffer: "growth_partnership",
  }
}

export function intentDScopeCopy(): NodeReply {
  return {
    assistantMessage:
      "Here's the full scope of the Growth Partnership:\n\n" +
      "WEBSITE: design, conversion architecture, technical SEO, analytics, CMS updates\n" +
      "DESIGN: brand identity, ad creative, social and web assets\n" +
      "ADS: Google, Meta, TikTok, Yelp with optimization and reporting\n" +
      "ONGOING: 7-day execution, weekly optimization, monthly reporting, dedicated PM\n\n" +
      "Want to book a 30-minute strategy call?",
    quickReplies: [
      openBooking("book_call", "Book a 30-min call"),
      reply("e_results_timeline", "How fast will I see results?"),
      reply("e_business_types", "Who is this best for?"),
    ],
  }
}

export function intentDSignupChoiceCopy(runtimeLinks: SalesChatSpecRuntimeLinks): NodeReply {
  return {
    assistantMessage:
      "Love the energy. I recommend starting with a 30-minute strategy call so the team can build a custom first-90-day plan.\n\n" +
      "If you're 100% ready, I can send the direct $2,000/month signup link now. Which do you prefer?",
    quickReplies: [
      openUrl("d_book_strategy_call", "Book the strategy call first (recommended)", runtimeLinks.bookingUrl),
      openUrl("d_direct_signup", "Send me the signup link - I'm ready", runtimeLinks.growthPartnershipSignupUrl),
    ],
  }
}

export function intentDDirectSignupCopy(runtimeLinks: SalesChatSpecRuntimeLinks): NodeReply {
  return {
    assistantMessage:
      `Here's the subscription link: ${runtimeLinks.growthPartnershipSignupUrl}\n\n` +
      "Once you're subscribed, the Prism team will reach out within 1 business day to schedule kickoff, audit everything, and start executing immediately.\n\n" +
      "Welcome to Prism. Let's grow.",
    quickReplies: [
      openBooking("book_call", "Book kickoff call"),
      reply("d_collect_qualification", "Share my business details now"),
    ],
    recommendedOffer: "growth_partnership",
  }
}

export function intentDBookCallCopy(runtimeLinks: SalesChatSpecRuntimeLinks): NodeReply {
  return {
    assistantMessage:
      `Here's the booking link: ${runtimeLinks.bookingUrl}\n\n` +
      "Pick a time that works - it's a 30-minute Zoom strategy call with Enzo and the Prism team.\n\n" +
      "Before the call, can you share: business type, website URL, and your #1 outcome in the next 3-6 months?",
    quickReplies: [
      reply("d_collect_qualification", "I'll share those now"),
      reply("b_start", "Start with a free audit first"),
    ],
    recommendedOffer: "growth_partnership",
  }
}

export function intentDBigCommitmentCopy(): NodeReply {
  return {
    assistantMessage:
      "Totally fair. Here's the simplest way to think about it: $2,000/month gives you a developer, designer, marketer, and PM working 7 days a week - usually less than hiring even one role part-time.\n\n" +
      "Most clients see measurable movement in 60-90 days. If you want lower risk first, start with a free audit or a 30-minute strategy call.",
    quickReplies: [
      reply("b_start", "Get a free audit first"),
      openBooking("book_call", "Book a 30-min call"),
      reply("d_scope", "Show me exactly what's included"),
    ],
  }
}

export function faqCopy(topic: string): NodeReply {
  if (topic === "what_is_prism") {
    return {
      assistantMessage:
        "Prism is a Silicon Valley agency that handles your website, design, and ads so you can focus on running your business.\n\n" +
        "Founded by Enzo Sison in 2023, we work with dental practices, local businesses, consultants, online communities, nonprofits, and more.\n\n" +
        "What are you most interested in?",
      quickReplies: [
        reply("c_start", "Websites"),
        reply("e_ads", "Ads"),
        reply("d_start", "The full growth partnership"),
      ],
    }
  }

  if (topic === "who_is_enzo") {
    return {
      assistantMessage:
        "Enzo is the founder of Prism. He studied engineering at Cal Poly, interned at Apple twice, worked as a product manager at a VC-backed startup, then went pro in pole vault while building Prism in 2023.\n\n" +
        "You can learn more here: https://www.design-prism.com/about",
      quickReplies: [
        reply("starter_general_question", "Ask another question"),
        openBooking("book_call", "Book a 30-min call"),
      ],
    }
  }

  if (topic === "business_types") {
    return {
      assistantMessage:
        "We work with growth-minded teams across dental and medical, local retail/service, consulting, online communities, nonprofits and education, annual events, and private vacation rentals.\n\n" +
        "Tell me your business type and I can suggest the best entry offer.",
      quickReplies: [
        reply("starter_help_choose", "Help me choose"),
        reply("b_start", "Start with a free audit"),
      ],
    }
  }

  if (topic === "pricing") {
    return {
      assistantMessage:
        "Here's the pricing breakdown:\n\n" +
        "- Free Expert Audit: $0\n" +
        "- Complete Website Overhaul: $1,000 one-time\n" +
        "- Growth Partnership: $2,000/month\n\n" +
        "Which one should I walk you through?",
      quickReplies: [
        reply("b_start", "Tell me about the free audit"),
        reply("c_start", "Walk me through the website overhaul"),
        reply("d_start", "Explain the $2K/mo partnership"),
      ],
    }
  }

  if (topic === "website_timeline") {
    return {
      assistantMessage:
        "Timeline depends on scope. Most 5-7 page marketing sites take about 2-4 weeks. Larger custom builds usually take 4-8 weeks, and complex integrations can run 8+ weeks.\n\n" +
        "The biggest speed variable is content readiness. Want a quick scope estimate?",
      quickReplies: [
        reply("c_ready", "Yes, estimate my scope"),
        openBooking("book_call", "Book a 30-min call"),
      ],
    }
  }

  if (topic === "results_timeline") {
    return {
      assistantMessage:
        "For ads, initial signal usually appears in 1-2 weeks, early wins in weeks 2-4, and optimized performance in 60-90 days.\n\n" +
        "For the full partnership, you usually see quick wins in the first 30 days and stronger momentum by month 3 as site, SEO, and ads compound.",
      quickReplies: [
        openBooking("book_call", "Book a 30-min strategy call"),
        reply("d_scope", "Tell me more about ads"),
      ],
    }
  }

  if (topic === "proof") {
    return {
      assistantMessage:
        "Yes. You can review real outcomes here:\n" +
        "- Case Studies: https://www.design-prism.com/case-studies\n" +
        "- Wall of Love: https://www.design-prism.com/wall-of-love\n\n" +
        "Want me to point you to the closest example for your industry?",
      quickReplies: [
        reply("starter_help_choose", "Recommend one for my industry"),
        openBooking("book_call", "Book a 30-min call"),
      ],
    }
  }

  if (topic === "stack") {
    return {
      assistantMessage:
        "Our stack includes Next.js websites, technical SEO and schema markup, GA4 and GTM analytics, Google/Meta/TikTok/Yelp ads, and Notion/Zoom/Slack for operations.\n\n" +
        "If you already have a stack, we can usually work with it.",
      quickReplies: [
        reply("starter_general_question", "Ask another question"),
        openBooking("book_call", "Book a 30-min call"),
      ],
    }
  }

  if (topic === "portfolio") {
    return {
      assistantMessage:
        "Absolutely.\n" +
        "Homepage: https://www.design-prism.com\n" +
        "Websites: https://www.design-prism.com/websites\n" +
        "Designs: https://www.design-prism.com/designs\n" +
        "Ads: https://www.design-prism.com/ads\n" +
        "Case studies: https://www.design-prism.com/case-studies\n\n" +
        "Anything specific you want to review?",
      quickReplies: [
        reply("starter_general_question", "Ask another question"),
        openBooking("book_call", "Book a 30-min call"),
      ],
    }
  }

  if (topic === "post_launch") {
    return {
      assistantMessage:
        "Launch is the start, not the finish. After launch you get analytics and automation setup, training for day-to-day content updates, and post-launch support for fixes and tuning.\n\n" +
        "If you're on the $2,000/month partnership, we keep optimizing indefinitely across site, SEO, ads, and reporting.",
      quickReplies: [
        reply("d_start", "Explore the Growth Partnership"),
        reply("c_start", "I'm mainly looking for one-time build"),
      ],
    }
  }

  return {
    assistantMessage:
      "Great question. I can help with Prism services, pricing, and next steps. If you'd like, I can route you to the team directly too.",
    quickReplies: [
      reply("starter_general_question", "Ask another Prism question"),
      openBooking("book_call", "Book a 30-min call"),
      reply("starter_help_choose", "Help me choose an offer"),
    ],
  }
}

export function objectionCopy(kind: string): NodeReply {
  if (kind === "too_expensive") {
    return {
      assistantMessage:
        "I hear you - budget matters. If $2,000/month isn't right today, you can still get serious value from a Free Expert Audit ($0) or a Website Overhaul ($1,000 one-time).\n\n" +
        "Many clients start there and upgrade later. Which option feels more realistic right now?",
      quickReplies: [
        reply("b_start", "Get a free audit"),
        reply("c_start", "Tell me about the $1,000 website"),
        reply("f_think", "Let me think about it"),
      ],
    }
  }

  if (kind === "need_to_think") {
    return {
      assistantMessage:
        "Totally understandable. The lowest-risk move is to request a free expert audit now - zero commitment and you'll get a clear roadmap while you decide.",
      quickReplies: [
        reply("b_start", "Yes, get me a free audit"),
        reply("later", "I'll come back later"),
        openBooking("book_call", "Actually, let me book a call"),
      ],
    }
  }

  if (kind === "has_agency") {
    return {
      assistantMessage:
        "No worries. Many clients came from other agencies. The Prism difference is integrated execution across website, design, ads, and SEO with transparent reporting and 7-day execution.\n\n" +
        "If you want a clean comparison, we can run a free audit first.",
      quickReplies: [
        reply("b_start", "Get a free audit to compare"),
        openBooking("book_call", "Book a call to learn more"),
        reply("later", "I'm good for now"),
      ],
    }
  }

  if (kind === "no_time") {
    return {
      assistantMessage:
        "Totally get it. Two no-call options: request the free audit (60 seconds) or buy the website overhaul and complete intake async.\n\n" +
        "You can always book a call later if you want deeper strategy.",
      quickReplies: [
        reply("b_start", "Get a free audit (no call)"),
        reply("c_pay_now", "Buy the website overhaul now"),
      ],
    }
  }

  if (kind === "competitor") {
    return {
      assistantMessage:
        "Fair question. Prism is differentiated by integrated execution (site + design + ads + SEO), 7-day tempo, founder-led product thinking, transparent reporting, and vertical playbooks for dental/local/consulting/community/nonprofit teams.\n\n" +
        "Want proof via case studies or testimonials?",
      quickReplies: [
        reply("e_proof", "Show me case studies"),
        reply("e_proof", "Show me testimonials"),
        openBooking("book_call", "Book a 30-min call"),
      ],
    }
  }

  if (kind === "contract") {
    return {
      assistantMessage:
        "For Growth Partnership, terms are reviewed on the strategy call with a partnership-first approach. For Website Overhaul, it's one-time and you own what we build. Free Audit is zero obligation.\n\n" +
        "Want to start with the lowest-commitment option?",
      quickReplies: [
        reply("b_start", "Start with free audit"),
        openBooking("book_call", "Book a 30-min call"),
      ],
    }
  }

  return {
    assistantMessage:
      "Totally fair concern. I can give you a lower-risk path so you can move forward confidently.",
    quickReplies: [
      reply("b_start", "Start with free audit"),
      openBooking("book_call", "Book a 30-min call"),
      reply("starter_help_choose", "Help me choose"),
    ],
  }
}

export function edgeCaseCopy(kind: string, runtimeLinks: SalesChatSpecRuntimeLinks): NodeReply {
  if (kind === "off_topic") {
    return {
      assistantMessage:
        "That's a great question, but it's outside what I can help with here. I'm best at Prism services, pricing, and growth planning.\n\n" +
        "If you want, I can connect you to the team directly.",
      quickReplies: [
        openUrl("contact_team", "Contact the team", "https://www.design-prism.com/contact"),
        reply("starter_general_question", "Ask a Prism question"),
      ],
    }
  }

  if (kind === "confused") {
    return {
      assistantMessage:
        "No worries - quick version: Prism helps businesses get more customers online through better websites, smarter ads, and stronger design.\n\n" +
        "The easiest next step is a free audit. Zero cost, zero commitment.",
      quickReplies: [
        reply("b_start", "Yes, free audit please"),
        reply("starter_general_question", "Actually, let me ask a question"),
      ],
    }
  }

  if (kind === "discount") {
    return {
      assistantMessage:
        "I appreciate you asking. Pricing reflects the depth of work, but the free expert audit is a $0 way to see exactly what Prism would do before you invest.\n\n" +
        "If budget is tight, we can also scope options on a strategy call.",
      quickReplies: [
        reply("b_start", "Start with free audit"),
        openBooking("book_call", "Book a call to discuss options"),
      ],
    }
  }

  if (kind === "human") {
    return {
      assistantMessage:
        `Absolutely - fastest way is a 30-minute Zoom call: ${runtimeLinks.bookingUrl}\n` +
        "You can also contact the team at https://www.design-prism.com/contact or Instagram @the_design_prism.",
      quickReplies: [
        openUrl("book_human", "Open booking link", runtimeLinks.bookingUrl),
        openUrl("contact_human", "Open contact page", "https://www.design-prism.com/contact"),
      ],
    }
  }

  if (kind === "returning_client") {
    return {
      assistantMessage:
        "Welcome back. If you're already a Prism client, the fastest route is your existing Slack/Notion channel or https://www.design-prism.com/contact.\n\n" +
        "If you're exploring a new service, I can help scope that now.",
      quickReplies: [
        reply("starter_general_question", "Tell me about a new service"),
        openUrl("contact_human", "Open contact page", "https://www.design-prism.com/contact"),
      ],
    }
  }

  return {
    assistantMessage:
      "I'm not sure I understood that. Could you rephrase? Or if you'd prefer, I can connect you to the team directly.",
    quickReplies: [
      reply("starter_general_question", "Rephrase my question"),
      openBooking("book_call", "Book a quick call"),
    ],
  }
}

export function softCloseCopy(): NodeReply {
  return {
    assistantMessage:
      "Happy to help. If anything else comes up, I'm here. And remember - the free audit is always available if you want an expert look at your online presence.",
    quickReplies: [
      reply("b_start", "Get a free audit"),
      openBooking("book_call", "Book a 30-min call"),
      reply("starter_help_choose", "Help me choose an offer"),
    ],
  }
}

export function fallbackRephraseCopy(): NodeReply {
  return {
    assistantMessage:
      "I'm not sure I understood that. Could you rephrase? Or if you'd prefer, I can connect you to the team directly.",
    quickReplies: [
      reply("starter_help_choose", "Help me choose"),
      openBooking("book_call", "Book a quick call"),
      reply("b_start", "Start with free audit"),
    ],
  }
}
