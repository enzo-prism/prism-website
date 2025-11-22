import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"
import { Button } from "@/components/ui/button"

export default function GrowCheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12 sm:py-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
             <Button variant="ghost" size="sm" asChild className="gap-2 pl-0 hover:bg-transparent hover:text-neutral-600">
                <Link href="/pricing">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Pricing
                </Link>
             </Button>
          </div>
           <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-4">
              Grow Plan 🌱
            </span>
          </div>
          <CheckoutForm plan="grow" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
