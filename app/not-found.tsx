import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 lowercase">page not found</h1>
          <p className="text-neutral-600 mb-8 lowercase">
            sorry, we couldn't find the page you're looking for. it might have been moved or deleted.
          </p>
          <div className="space-y-4">
            <Link href="/">
              <Button className="rounded-full lowercase">
                <ArrowLeft className="mr-2 h-4 w-4" /> return to home
              </Button>
            </Link>
            <div className="pt-4">
              <p className="text-sm text-neutral-500 lowercase">
                looking for something specific? check out our{" "}
                <Link href="/websites" className="underline hover:text-black">
                  websites
                </Link>
                ,{" "}
                <Link href="/apps" className="underline hover:text-black">
                  apps
                </Link>
                , or{" "}
                <Link href="/designs" className="underline hover:text-black">
                  designs
                </Link>{" "}
                pages.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
