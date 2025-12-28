'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/presentation/components/ui/carousel';
import { Button } from '@/src/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/presentation/components/ui/card';
import { useData } from '@/src/presentation/hooks/paraRotas/home/calendario/useData';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
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
    previousWeek,
    nextWeek,
    viewDate,
    openModal,
    isModalOpen,
    closeModal,
    selectedEvents,
    selectedDate,
    eventsQuery,
  } = useData();

  // Helper to get week range
  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = (day === 0 ? -6 : 1 - day); // Monday as start
    start.setDate(start.getDate() + diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return { start, end };
  };

  const { start: weekStart, end: weekEnd } = getWeekRange(viewDate);

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
          className={`min-h-12 border border-muted p-1 cursor-pointer transition-colors ${dayEvents.length > 0
            ? 'bg-primary/5 hover:bg-primary/10'
            : 'bg-background hover:bg-muted/50'
            } ${isToday ? 'ring-2 ring-primary relative z-10 rounded-sm' : ''}`}
          onClick={() =>
            dayEvents.length > 0 && openModal(dayEvents, day)
          }
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>{day}</span>
            {dayEvents.length > 0 && (
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
          {dayEvents.length > 0 && (
            <div className="hidden sm:block mt-1">
              <div className="text-[10px] leading-tight truncate">
                {dayEvents[0].title}
              </div>
              {dayEvents.length > 1 && (
                <div className="text-[10px] text-muted-foreground">
                  +{dayEvents.length - 1} mais
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const isEventInWeek = (eventDate: Date, baseDate: Date): boolean => {
    const { start, end } = getWeekRange(baseDate);
    // Reset hours for comparison
    const d = new Date(eventDate);
    d.setHours(0, 0, 0, 0);
    const s = new Date(start);
    s.setHours(0, 0, 0, 0);
    const e = new Date(end);
    e.setHours(23, 59, 59, 999);

    return d >= s && d <= e;
  };

  const renderMobileCarousel = () => {
    const filteredEvents = events
      .filter((event) => isEventInWeek(event.dateTime, viewDate))
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    if (filteredEvents.length === 0) {
      return (
        <Card className="border-dashed bg-muted/20">
          <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
            <CalendarIcon className="mx-auto h-8 w-8 mb-2 opacity-20" />
            <p className="text-sm">Nenhum evento para esta semana</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Carousel className="w-full">
        <CarouselContent>
          {filteredEvents.map((event, index) => (
            <CarouselItem key={index} className="basis-[85%] sm:basis-[45%]">
              <div className="p-1">
                <Card
                  className="cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => openModal([event], event.dateTime)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base line-clamp-1">{event.title}</CardTitle>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {event.dateTime.toLocaleDateString('pt-BR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {event.dateTime.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-end space-x-2 mt-4">
          <CarouselPrevious className="relative static translate-y-0 h-8 w-8" />
          <CarouselNext className="relative static translate-y-0 h-8 w-8" />
        </div>
      </Carousel>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          {/* Desktop Header */}
          <h3 className="hidden md:block text-2xl font-bold">
            {months[currentMonth]} {currentYear}
          </h3>

          {/* Mobile Header */}
          <div className="md:hidden space-y-1">
            <h3 className="text-lg font-bold">
              {weekStart.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - {weekEnd.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
            </h3>
            <p className="text-xs text-muted-foreground">
              {months[currentMonth]} {currentYear}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={previousMonth} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Mês anterior</span>
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próximo mês</span>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={previousWeek} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Semana anterior</span>
            </Button>
            <Button variant="outline" size="icon" onClick={nextWeek} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima semana</span>
            </Button>
          </div>
        </div>
      </div>

      {eventsQuery.isLoading ? (
        <div className="h-48 flex items-center justify-center border rounded-lg bg-muted/10 animate-pulse">
          <p className="text-sm text-muted-foreground">Carregando eventos...</p>
        </div>
      ) : eventsQuery.error ? (
        <div className="h-48 flex items-center justify-center border border-destructive/20 rounded-lg bg-destructive/5">
          <p className="text-sm text-destructive">Erro ao carregar eventos.</p>
        </div>
      ) : (
        <>
          {/* Mobile View */}
          <div className="md:hidden">
            {renderMobileCarousel()}
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-7 gap-px border rounded-lg overflow-hidden bg-muted">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
              <div
                key={dia}
                className="h-10 flex items-center justify-center bg-muted text-xs font-semibold uppercase tracking-wider"
              >
                {dia}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </>
      )}

      {/* Week View for Desktop */}
      <div className="hidden md:block space-y-4 mt-8">
        <h3 className="text-lg font-bold">Eventos desta Semana</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events
            .filter((event) => isEventInWeek(event.dateTime, viewDate))
            .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
            .map((event, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => openModal([event], event.dateTime)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{event.title}</CardTitle>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {event.dateTime.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {event.dateTime.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          {events.filter((event) => isEventInWeek(event.dateTime, viewDate)).length === 0 && (
            <p className="text-sm text-muted-foreground col-span-full py-4 text-center border rounded-lg border-dashed">
              Nenhum evento agendado para esta semana.
            </p>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        events={selectedEvents}
        date={selectedDate}
      />
    </div>
  );
}

