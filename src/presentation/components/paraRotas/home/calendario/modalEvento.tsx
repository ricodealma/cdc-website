import { IEvento, Ministerios } from '@/src/domain/aggregates/evento';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';

interface Props {
  aberto: boolean;
  aoFechar: () => void;
  eventos: IEvento[];
  data: Date;
}

const ModalEvento = ({ aberto, aoFechar, eventos, data }: Props) => {
  return (
    <Dialog open={aberto} onOpenChange={aoFechar}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Eventos em {data.toLocaleDateString('pt-BR')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {eventos.map((evento, index) => (
            <div key={index} className="border p-2 rounded-md bg-muted/20">
              <p className="font-semibold">{evento.titulo}</p>
              <p className="text-sm text-muted-foreground">{evento.horario}</p>
              <p className="text-sm text-muted-foreground">
                Ministério: {Ministerios[evento.ministerio]}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEvento;
