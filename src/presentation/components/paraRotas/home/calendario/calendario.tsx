'use client';

import { Button } from '@/src/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/presentation/components/ui/card';
import { useData } from '@/src/presentation/hooks/paraRotas/home/calendario/useData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventModal from './modalEvento';

export default function Calendario() {
  const {
    daysInMonth,
    firstDayOfMonth,
    currentYear,
    currentMonth,
    events,
    todayDay,
    todayMonth,
    todayYear,
    months,
    previousMonth,
    nextMonth,
    openModal,
    isModalOpen,
    closeModal,
    selectedEvents,
    selectedDate,
    eventsQuery, // Access to loading and error state
  } = useData();

  // Renders the monthly calendar
  const renderCalendar = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const firstDay = firstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-12 border border-muted bg-muted/20"
        ></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayEvents = events.filter(
        (event) =>
          event.dateTime.getDate() === day &&
          event.dateTime.getMonth() === currentMonth &&
          event.dateTime.getFullYear() === currentYear
      );

      const isToday =
        day === todayDay && currentMonth === todayMonth && currentYear === todayYear;

      days.push(
        <div
          key={`day-${day}`}
          className={`min-h-12 border border-muted p-1 cursor-pointer ${dayEvents.length > 0
            ? 'bg-primary/5 hover:bg-primary/10'
            : 'bg-background'
            } ${isToday ? 'ring-2 ring-primary rounded-md' : ''}`}
          onClick={() =>
            dayEvents.length > 0 && openModal(dayEvents, day)
          }
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">{day}</span>
            {dayEvents.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                {dayEvents.length}
              </span>
            )}
          </div>
          {dayEvents.length > 0 && dayEvents.length <= 2 && (
            <div className="mt-1 space-y-1">
              {dayEvents.map((event, index) => (
                <div key={index} className="text-xs truncate">
                  {event.title}
                </div>
              ))}
            </div>
          )}
          {dayEvents.length > 2 && (
            <div className="mt-1">
              <div className="text-xs truncate">{dayEvents[0].title}</div>
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 1} mais
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  // Checks if date is in the same week
  const isSameWeek = (date: Date): boolean => {
    const now = new Date();
    const startOfWeek = new Date(now);

    const dayOfWeek = now.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return date >= startOfWeek && date <= endOfWeek;
  };


  // Renders the list of events for the current week
  const renderEventsList = () => {
    const filteredEvents = events
      .filter((event) => isSameWeek(event.dateTime))
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    return (
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Eventos desta Semana</h3>
        {filteredEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {event.dateTime.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event.dateTime.toLocaleTimeString('pt-BR')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nenhum evento agendado para esta semana.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          {months[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Mês anterior</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próximo mês</span>
          </Button>
        </div>
      </div>

      {eventsQuery.isLoading ? (
        <p>Carregando eventos...</p>
      ) : eventsQuery.error ? (
        <p>Erro ao carregar eventos. Tente novamente mais tarde.</p>
      ) : (
        <div className="grid grid-cols-7 gap-px">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
            <div
              key={dia}
              className="h-10 flex items-center justify-center bg-muted font-medium"
            >
              {dia}
            </div>
          ))}
          {renderCalendar()}
        </div>
      )}

      {renderEventsList()}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        events={selectedEvents}
        date={selectedDate}
      />
    </div>
  );
}
