import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "book a shoot | prism",
  description: "share two dates and one-hour windows for Prism to capture your office + team photography."
}

export default function BookAShootPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-neutral-50 px-4 py-12 sm:py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">book a shoot</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-neutral-900">pick two windows and we&apos;ll lock it in.</h1>
            <p className="mt-4 text-base text-neutral-600">
              share your email plus two one-hour windows that work for the shoot. our team replies with a confirmation and prep checklist.
            </p>
            <div className="mt-6 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              <Link href="/dental-photography" className="hover:text-neutral-900">
                overview
              </Link>
              <span className="text-neutral-200">―――</span>
              <Link href="/dental-photography/office-team" className="hover:text-neutral-900">
                office + team (bookable)
              </Link>
              <span className="text-neutral-200">―――</span>
              <Link href="/dental-photography/before-after" className="hover:text-neutral-900">
                before + after guide
              </Link>
            </div>
          </div>
        </section>

        {/* What to expect section */}
        <section className="px-4 py-12 bg-white">
          <div className="container mx-auto max-w-3xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-4">
                <p className="text-2xl mb-2">📸</p>
                <h3 className="font-semibold text-neutral-900 mb-1">Professional Equipment</h3>
                <p className="text-sm text-neutral-600">High-quality cameras and lighting for stunning results</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl mb-2">⏱️</p>
                <h3 className="font-semibold text-neutral-900 mb-1">One Hour Session</h3>
                <p className="text-sm text-neutral-600">Efficient shoots that capture everything you need</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl mb-2">🖼️</p>
                <h3 className="font-semibold text-neutral-900 mb-1">Edited Deliverables</h3>
                <p className="text-sm text-neutral-600">Professionally edited photos delivered within a week</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6 text-center">Schedule Your Photography Session</h2>
              <form action="https://formspree.io/f/xjkjkggn" method="POST" className="space-y-6">
                <input
                  type="hidden"
                  name="_redirect"
                  value="https://www.design-prism.com/book-a-shoot/thank-you"
                />
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-neutral-800">
                    your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    placeholder="name@practice.com"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-800">preferred day #1</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="date"
                      name="day_one_date"
                      required
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none sm:text-sm"
                    />
                    <select
                      name="day_one_time"
                      required
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none sm:text-sm"
                    >
                      <option value="">best one-hour window</option>
                      <option value="08:00">8:00 – 9:00 AM</option>
                      <option value="09:00">9:00 – 10:00 AM</option>
                      <option value="10:00">10:00 – 11:00 AM</option>
                      <option value="11:00">11:00 AM – 12:00 PM</option>
                      <option value="12:00">12:00 – 1:00 PM</option>
                      <option value="13:00">1:00 – 2:00 PM</option>
                      <option value="14:00">2:00 – 3:00 PM</option>
                      <option value="15:00">3:00 – 4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-800">preferred day #2</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="date"
                      name="day_two_date"
                      required
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none sm:text-sm"
                    />
                    <select
                      name="day_two_time"
                      required
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none sm:text-sm"
                    >
                      <option value="">best one-hour window</option>
                      <option value="08:00">8:00 – 9:00 AM</option>
                      <option value="09:00">9:00 – 10:00 AM</option>
                      <option value="10:00">10:00 – 11:00 AM</option>
                      <option value="11:00">11:00 AM – 12:00 PM</option>
                      <option value="12:00">12:00 – 1:00 PM</option>
                      <option value="13:00">1:00 – 2:00 PM</option>
                      <option value="14:00">2:00 – 3:00 PM</option>
                      <option value="15:00">3:00 – 4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium text-neutral-800">
                    anything we should know?
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    placeholder="number of operatories, parking instructions, etc."
                  />
                </div>

                <Button type="submit" className="w-full rounded-2xl bg-neutral-900 py-3 text-base lowercase text-white">
                  send request
                </Button>
                <p className="text-center text-xs text-neutral-500">we usually reply within one business day.</p>
              </form>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
