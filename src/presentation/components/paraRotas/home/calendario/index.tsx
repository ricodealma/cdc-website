import Calendario from './calendario';
interface Props {
  id: string;
}
const SecaoCalendario = ({ id }: Props) => {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Calendário da Igreja
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Se mantenha atualizado com nossos eventos e cultos no decorrer do
              ano
            </p>
          </div>
          <Calendario />
        </div>
      </div>
    </section>
  );
};

export default SecaoCalendario;
