"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import AnimatedBackground from "@/components/animated-background"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"

export default function SMBClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Prism — Small Business AI (GPT‑5)" />
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Elegant rainbow gradient video-like animation */}
        <div className="absolute inset-0 -z-10">
          {/* Base mesh gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1200px 800px at 15% 30%, rgba(255,0,128,0.08), transparent 60%),
                radial-gradient(1000px 700px at 85% 20%, rgba(0,200,255,0.10), transparent 60%),
                radial-gradient(900px 600px at 30% 80%, rgba(128,0,255,0.08), transparent 60%),
                linear-gradient(120deg, #fafafa 0%, #ffffff 60%)
              `,
              filter: "saturate(1.2)",
            }}
          />
          {/* Subtle animated particles + orbs */}
          <AnimatedBackground />
          {/* Soft rainbow overlay sweep */
          }
          <motion.div
            className="absolute inset-0 opacity-60 mix-blend-screen"
            animate={{
              background: [
                "conic-gradient(from 0deg at 50% 50%, rgba(255,0,128,0.12), rgba(255,140,0,0.10), rgba(255,255,0,0.10), rgba(0,255,128,0.10), rgba(0,200,255,0.12), rgba(128,0,255,0.12), rgba(255,0,128,0.12))",
                "conic-gradient(from 180deg at 50% 50%, rgba(255,0,128,0.12), rgba(255,140,0,0.10), rgba(255,255,0,0.10), rgba(0,255,128,0.10), rgba(0,200,255,0.12), rgba(128,0,255,0.12), rgba(255,0,128,0.12))",
                "conic-gradient(from 360deg at 50% 50%, rgba(255,0,128,0.12), rgba(255,140,0,0.10), rgba(255,255,0,0.10), rgba(0,255,128,0.10), rgba(0,200,255,0.12), rgba(128,0,255,0.12), rgba(255,0,128,0.12))",
              ],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "background" }}
          />
        </div>

        {/* Content */}
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight lowercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              gpt‑5 for small business
            </motion.h1>
            <motion.p
              className="mt-4 text-neutral-600 md:text-xl lowercase"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              we set up, train, and tune ai that works like your best employee — across marketing, ops, and support.
            </motion.p>
            <motion.div
              className="mt-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            >
              <Link href="/get-started">
                <Button className="rounded-full px-8 py-6 text-base lowercase">
                  get started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/prism-flywheel" className="text-neutral-500 hover:text-neutral-900 lowercase">
                learn how it works
              </Link>
            </motion.div>
            <motion.p
              className="mt-6 text-sm text-neutral-400 lowercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              custom gpt‑5 playbooks • first wins in 14 days • built for local and online smb
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter lowercase">what you get</h2>
            <p className="mt-3 text-neutral-600 lowercase">ai woven through your business — not bolted on</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { emoji: "💬", title: "ai sales + support", desc: "reply in your voice, 24/7 across chat, email, and sms" },
              { emoji: "📈", title: "growth playbooks", desc: "gpt‑5 content, offers, and automations that convert" },
              { emoji: "🧠", title: "your data, trained", desc: "fine‑tuned on your products, policies, and tone" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 text-left">
                <div className="text-2xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-semibold lowercase mb-1">{item.title}</h3>
                <p className="text-neutral-600 lowercase">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center bg-neutral-900 text-white rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(600px 400px at 50% 50%, rgba(255,255,255,0.15), transparent 60%)" }} />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight lowercase">ready to fully leverage gpt‑5?</h3>
              <p className="mt-3 text-neutral-300 lowercase">we’ll implement, integrate, and measure with you — start with a free consult.</p>
              <div className="mt-6">
                <Link href="/get-started">
                  <Button variant="secondary" className="rounded-full px-8 py-6 text-base lowercase">
                    book a free consult <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


