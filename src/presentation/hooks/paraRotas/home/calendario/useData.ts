import { IWeekDay } from '@/src/domain/aggregates/diaSemana';
import { IEvent } from '@/src/domain/aggregates/evento';
import { fetchWeekDays, fetchEvents } from '@/src/presentation/components/paraRotas/home/calendario/actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


export const useData = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<IEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const openModal = (events: IEvent[], dateOrDay: Date | number) => {
    const date = typeof dateOrDay === 'number'
      ? new Date(currentYear, currentMonth, dateOrDay)
      : dateOrDay;
    setSelectedEvents(events);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Fetch events from the database
  const eventsQuery = useQuery<IEvent[]>({
    queryKey: ['eventos'],
    queryFn: async () => {
      const resp = await fetchEvents();
      return resp.map(e => ({
        ...e,
        dateTime: new Date(e.dateTime)
      }));
    },
  });

  const weekDaysQuery = useQuery<IWeekDay[]>({
    queryKey: ['dias'],
    queryFn: fetchWeekDays,
  });

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const previousMonth = () => {
    setViewDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const nextMonth = () => {
    setViewDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const previousWeek = () => {
    setViewDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const nextWeek = () => {
    setViewDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  return {
    nextMonth,
    previousMonth,
    nextWeek,
    previousWeek,
    viewDate,
    firstDayOfMonth,
    daysInMonth,
    months,
    events: eventsQuery.data || [],
    todayDay,
    todayMonth,
    todayYear,
    currentYear,
    currentMonth,
    openModal,
    closeModal,
    selectedDate,
    selectedEvents,
    isModalOpen,
    eventsQuery,
    weekDaysQuery,
  };
};
