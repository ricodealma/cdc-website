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
                Ministério: {Ministries[event.ministry]}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
