import Calendario from '@/components/calendario';
import { MissionSection } from '@/components/mission-section';
import { VideoSection } from '@/components/video-section';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section
          className="relative w-full py-12 md:py-24 lg:py-32 bg-cover bg-center"
          style={{
            backgroundImage: "url('/family.png?height=600&width=1200')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />

          <div className="relative z-10 container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 p-6 rounded-lg text-white drop-shadow-lg">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Bem-vindo à Comunidade do Caminho
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Uma igreja e uma família
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="#mission"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    Nossa Missão
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    Saiba Mais
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MissionSection id="mission" />

        <VideoSection />

        <section
          id="calendar"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Calendário da Igreja
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Se mantenha atualizado com nossos eventos e cultos no decorrer
                  do ano
                </p>
              </div>
              <Calendario />
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Junte-se a nós nesse Domingo !!
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Nós vamos amar te receber na nossa família. Cultos todos os
                Domingos de 18:30 às 21:00
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Caetano+Pirri,+97,+Milionários,+30620070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
                >
                  Como Chegar
                </Link>

                <Link
                  href="https://ig.me/comunidade_do_caminho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
                >
                  Entre em Contato
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="overflow-hidden rounded-lg border bg-background">
                <div className="p-8">
                  <h3 className="text-xl font-bold">Endereço</h3>
                  <address className="not-italic text-muted-foreground">
                    Rua Caetano Pirri, 97
                    <br />
                    Milionários, 30620070
                    <br />
                    @comunidade_do_caminho
                    <br />
                    <a
                      href="mailto:comunidadedocaminhobh@gmail.com"
                      className="text-primary hover:underline"
                    >
                      comunidadedocaminhobh@gmail.com
                    </a>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
