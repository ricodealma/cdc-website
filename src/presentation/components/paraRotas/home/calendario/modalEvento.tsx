import { IEvent, Ministries } from '@/src/domain/aggregates/evento';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  events: IEvent[];
  date: Date;
}

const EventModal = ({ isOpen, onClose, events, date }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Eventos em {date.toLocaleDateString('pt-BR')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="border p-2 rounded-md bg-muted/20">
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {event.dateTime.toLocaleTimeString('pt-BR')}
              </p>
              <p className="text-sm text-muted-foreground">
                Ministério: {ministryTranslations[event.ministry] || 'Geral'}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ministryTranslations: Record<number, string> = {
  [Ministries.General]: 'Geral',
  [Ministries.Intercession]: 'Intercessão',
  [Ministries.Women]: 'Mulheres',
  [Ministries.Children]: 'Infantil',
  [Ministries.Evangelism]: 'Evangelismo',
  [Ministries.Media]: 'Mídia',
  [Ministries.Worship]: 'Louvor',
  [Ministries.Youth]: 'Jovens',
};

export default EventModal;
