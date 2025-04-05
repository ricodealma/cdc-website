import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Nossa História
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Conheça a jornada, fundamentos e valores que nos guiam
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Nosso pequeno começo
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  A Comunidade do Caminho foi fundada em janeiro de 2000, após
                  um período de jejum e oração, com o propósito de seguir uma
                  direção de Deus. Desde então, a igreja desenvolve ministérios,
                  células e discipulado, sempre com o foco em ensinar princípios
                  bíblicos por meio do exemplo de vida.
                </p>
                <p className="text-muted-foreground md:text-xl">
                  Ao longo dos anos, a comunidade cresceu e experimentou
                  momentos marcantes na presença de Deus, como retiros, festas
                  bíblicas e encontros. Ministérios como Intercessão, o infantil
                  GNC e os grupos de dança Ruach e Ruach Kids se fortaleceram,
                  contribuindo para o impacto na vida da comunidade. A história
                  da igreja continua sendo marcada por fidelidade, milagres e
                  parcerias, sempre sob o governo de Deus.
                </p>
              </div>
              <Image
                src="/humble-begining.jpg?height=400&width=600"
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
                alt="Prédio da igreja"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover order-2 lg:order-1"
              />
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Nossa Base Teológica
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Estamos fundamentados na fé cristã histórica, afirmando a
                  autoridade das Escrituras e a centralidade de Jesus Cristo em
                  todos os aspectos de nossas vidas e ministério.
                </p>
                <p className="text-muted-foreground md:text-xl">
                  Nossas bases teológicas incluem:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground md:text-xl space-y-2">
                  <li>A inerrância e autoridade das Escrituras</li>
                  <li>A Trindade: Pai, Filho e Espírito Santo</li>
                  <li>Salvação pela graça mediante a fé em Jesus Cristo</li>
                  <li>A importância do crescimento espiritual e discipulado</li>
                  <li>
                    O chamado para servir ao próximo e compartilhar o evangelho
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Nossa Liderança
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Conheça aqueles que o senhor chamou para cumprir a obra em
                  nosso meio
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
                {[
                  {
                    name: 'Adenilson Santos',
                    role: 'Pastor presidente',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Guilhermano Júnior',
                    role: 'Presbítero',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Daniel Ferraz',
                    role: 'Presbítero',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Simone Marques',
                    role: 'Pastora e lider de intercessão',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Andreia Santos',
                    role: 'Pastora',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Meire Márcia',
                    role: 'Líder do Ministério Infantil',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Luciana Maia',
                    role: 'Líder do Ministério de mulheres',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Fabiane Ferraz',
                    role: 'Líder do Ministério de Evangelismo',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                  {
                    name: 'Weldson Batista',
                    role: 'Líder do Ministério de Mídia',
                    image: '/placeholder.svg?height=300&width=300',
                  },
                ].map((leader, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                  >
                    <Image
                      src={leader.image || '/placeholder.svg'}
                      width={150}
                      height={150}
                      alt={leader.name}
                      className="rounded-full object-cover h-32 w-32"
                    />
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {leader.role}
                    </p>
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Faça parte da família
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  vamos amar receber você em nossa família
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/#calendar"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
                >
                  Agenda
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
                >
                  Entre em contato
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
