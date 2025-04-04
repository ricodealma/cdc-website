import Link from "next/link"
import { Play } from "lucide-react"

export function VideoSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Church Story</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Watch our video to learn about our journey and community
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto pt-8">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=720&width=1280')] bg-cover bg-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-background/80 p-4 backdrop-blur-sm">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
              >
                Learn More About Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

