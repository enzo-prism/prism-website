import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-5xl font-semibold sm:text-6xl">page not found</h1>
          <p className="mb-8 text-muted-foreground">
            sorry, we couldn't find the page you're looking for. it might have been moved or deleted.
          </p>
          <div className="space-y-4">
            <Link href="/">
              <Button className="rounded-md">
                <ArrowLeft className="mr-2 h-4 w-4" /> return to home
              </Button>
            </Link>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                looking for something specific? check out our{" "}
                <Link href="/websites" className="underline decoration-border/60 underline-offset-4 hover:text-foreground hover:decoration-border">
                  websites
                </Link>
                ,{" "}
                <Link href="/apps" className="underline decoration-border/60 underline-offset-4 hover:text-foreground hover:decoration-border">
                  apps
                </Link>
                , or{" "}
                <Link href="/designs" className="underline decoration-border/60 underline-offset-4 hover:text-foreground hover:decoration-border">
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
