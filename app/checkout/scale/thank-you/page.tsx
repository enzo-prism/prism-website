import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function ScaleThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="max-w-lg text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Ready to Scale! 📈</h1>
          <p className="text-lg text-zinc-600">
            We've received your inquiry for the <strong>Scale Plan</strong>.
            <br className="hidden sm:block" />
            Our team will review your operational needs and reach out shortly to schedule your discovery call.
          </p>
          <div className="pt-6">
             <Button asChild size="lg" className="rounded-full bg-black text-white hover:bg-black/90">
               <Link href="/">Return to Home</Link>
             </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
