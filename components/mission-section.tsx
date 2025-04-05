import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface MissionSectionProps {
  id?: string;
}

export function MissionSection({ id }: MissionSectionProps) {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Visão, Missão, Propósito e Valores
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Princípios que moldam a nossa comunidade cristã
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 pt-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Visão e Propósito</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <p>
                    <strong>Visão:</strong>
                    <br />
                    Ser uma comunidade cristã que de forma relevante vive o amor
                    e cuida das famílias.
                  </p>
                  <p>
                    <strong>Propósito:</strong>
                    <br />
                    Ser uma família de muitos filhos, semelhantes a Jesus para a
                    glória de Deus Pai. <br />
                    <em>Romanos 8:29</em>
                  </p>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base space-y-2">
                  <p>
                    Nossa missão como igreja é abraçar a todos com amor, dando a
                    oportunidade de fazerem parte de uma família que cresce a
                    cada dia através da ação do evangelho, do poder do Espírito
                    e do discipulado.
                  </p>
                  <p>
                    Trazendo à tona o potencial de cada um para cumprir o seu
                    propósito.
                  </p>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base space-y-2">
                  <ul className="list-disc pl-5 text-left space-y-1">
                    <li>Amor a Deus e ao próximo.</li>
                    <li>Comprometimento com a palavra de Deus.</li>
                    <li>Oração e gratidão.</li>
                    <li>Santidade sincera.</li>
                    <li>Serviço ao Senhor com alegria.</li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
