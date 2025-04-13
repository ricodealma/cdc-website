import Link from 'next/link';

interface Props {
  id: string;
}
const ContactSection = ({ id }: Props) => {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Junte-se a nós nesse Domingo !!
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Nós vamos amar te receber na nossa família. Cultos todos os Domingos
            de 18:30 às 21:00
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
              href="https://ig.me/m/comunidade_do_caminho"
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
                <a
                  href="https://www.instagram.com/comunidade_do_caminho/"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  @comunidade_do_caminho
                </a>
                <br />
                <a
                  href="mailto:comunidadedocaminhobh@gmail.com"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  comunidadedocaminhobh@gmail.com
                </a>
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
