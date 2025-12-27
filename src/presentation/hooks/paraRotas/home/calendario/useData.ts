import { IWeekDay } from '@/src/domain/aggregates/diaSemana';
import { IEvent } from '@/src/domain/aggregates/evento';
import { fetchWeekDays, fetchEvents } from '@/src/presentation/components/paraRotas/home/calendario/actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


export const useData = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<IEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const openModal = (events: IEvent[], day: number) => {
    const date = new Date(currentYear, currentMonth, day);
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
      // Ensure dateTime items are Date objects if they were stringified
      return resp.map(e => ({
        ...e,
        dateTime: new Date(e.dateTime)
      }));
    },
  });

  // Fetch week days from the database
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
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return {
    nextMonth,
    previousMonth,
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
