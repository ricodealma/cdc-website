import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MissionSectionProps {
  id?: string
}

export function MissionSection({ id }: MissionSectionProps) {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Vision, Mission & Values</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Guiding principles that shape our church community
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 pt-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To be a vibrant community of believers who are transformed by the gospel and transforming our
                  community with the love of Christ.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To glorify God by making disciples who love God, grow in community, and serve the world.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <ul className="list-disc pl-5 text-left space-y-1">
                    <li>Biblical Authority</li>
                    <li>Authentic Worship</li>
                    <li>Intentional Discipleship</li>
                    <li>Genuine Community</li>
                    <li>Compassionate Service</li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

