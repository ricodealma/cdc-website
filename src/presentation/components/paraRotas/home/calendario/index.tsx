import Calendario from './calendario';
interface Props {
  id: string;
}
const SecaoCalendario = ({ id }: Props) => {
  return (
    <section id={id} className="w-full section-padding-y bg-muted/50">
      <div className="container-responsive">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-fluid-4xl font-bold tracking-tighter">
              Calendário da Igreja
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-fluid-xl">
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
