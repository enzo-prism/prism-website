import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"

export default function LaunchCheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12 sm:py-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-4">
              Launch Plan 🚀
            </span>
            {/* Optional: Add specific plan details or summary here if needed */}
          </div>
          <CheckoutForm plan="launch" />
        </div>
      </main>
      <Footer />
    </div>
  )
}