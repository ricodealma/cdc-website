import Link from "next/link"
import { Calendar } from "@/components/calendar"
import { MissionSection } from "@/components/mission-section"
import { VideoSection } from "@/components/video-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span>Grace Community Church</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              About Us
            </Link>
            <Link href="#calendar" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Calendar
            </Link>
            <Link href="#contact" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 bg-background/80 p-6 rounded-lg backdrop-blur-sm">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Grace Community Church
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A place of worship, community, and spiritual growth
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="#mission"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
                  >
                    Our Mission
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MissionSection id="mission" />

        <VideoSection />

        <section id="calendar" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Church Calendar</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Stay updated with our events and services throughout the year
                </p>
              </div>
              <Calendar />
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Us This Sunday</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We'd love to welcome you to our church family. Services every Sunday at 9:00 AM and 11:00 AM.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
                >
                  Get Directions
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="overflow-hidden rounded-lg border bg-background">
                <div className="p-8">
                  <h3 className="text-xl font-bold">Church Address</h3>
                  <address className="not-italic text-muted-foreground">
                    123 Faith Avenue
                    <br />
                    Hometown, ST 12345
                    <br />
                    (555) 123-4567
                    <br />
                    <a href="mailto:info@gracechurch.org" className="text-primary hover:underline">
                      info@gracechurch.org
                    </a>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Grace Community Church. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

