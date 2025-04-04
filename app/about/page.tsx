import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span>Grace Community Church</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="font-medium transition-colors hover:text-primary">
              About Us
            </Link>
            <Link href="/#calendar" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Calendar
            </Link>
            <Link href="/#contact" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Our Story</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Learn about our journey, foundation, and the values that guide us
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Humble Beginnings</h2>
                <p className="text-muted-foreground md:text-xl">
                  Grace Community Church was founded in 1985 by a small group of families who shared a vision for a
                  church that would be deeply rooted in scripture while actively serving the community.
                </p>
                <p className="text-muted-foreground md:text-xl">
                  What began as a small gathering in a living room has grown into a vibrant community of believers
                  dedicated to worship, discipleship, and outreach.
                </p>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Historic photo of church founding"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Church building"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover order-2 lg:order-1"
              />
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Theological Foundation</h2>
                <p className="text-muted-foreground md:text-xl">
                  We are grounded in the historic Christian faith, affirming the authority of Scripture and the
                  centrality of Jesus Christ in all aspects of our lives and ministry.
                </p>
                <p className="text-muted-foreground md:text-xl">Our theological bases include:</p>
                <ul className="list-disc pl-6 text-muted-foreground md:text-xl space-y-2">
                  <li>The inerrancy and authority of Scripture</li>
                  <li>The Trinity: Father, Son, and Holy Spirit</li>
                  <li>Salvation by grace through faith in Jesus Christ</li>
                  <li>The importance of spiritual growth and discipleship</li>
                  <li>The call to serve others and share the gospel</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Leadership</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Meet the dedicated team that guides our church
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
                {[
                  {
                    name: "Pastor John Smith",
                    role: "Senior Pastor",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Sarah Johnson",
                    role: "Worship Director",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Michael Williams",
                    role: "Youth Pastor",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Rebecca Davis",
                    role: "Children's Ministry",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                ].map((leader, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      width={150}
                      height={150}
                      alt={leader.name}
                      className="rounded-full object-cover h-32 w-32"
                    />
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-sm text-muted-foreground">{leader.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Our Community</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We'd love to welcome you to our church family
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/#calendar"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
                >
                  View Calendar
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
                >
                  Contact Us
                </Link>
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

