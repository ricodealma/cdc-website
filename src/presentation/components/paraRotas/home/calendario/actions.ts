"use server"

import { IEvent, Ministries } from '@/src/domain/aggregates/evento';
import { IWeekDay } from '@/src/domain/aggregates/diaSemana';
import { PrismaEventRepository } from "@/src/infra/repositories/PrismaEventoRepository"
import { unstable_cache } from 'next/cache'
import { prisma } from "@/src/infra/database/prisma"

const eventRepository = new PrismaEventRepository()

/**
 * Calculates seconds remaining until the next 00:00 (midnight)
 */
const getSecondsUntilMidnight = () => {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  return Math.floor((midnight.getTime() - now.getTime()) / 1000)
}

/**
 * Generates recurring events dynamically avoiding conflicts with existing events
 */
const generateDynamicEvents = (existingEvents: IEvent[], years: number[]): IEvent[] => {
  const generatedEvents: IEvent[] = [];
  const occupiedDates = new Set<string>();
  let virtualIdCounter = -1;

  // Helper to get date key in BRT (UTC-3)
  const getBRTDateKey = (date: Date) => {
    // We want the components as they appear in Brazil.
    // If we shift the absolute time by -3 hours, the UTC components of the resulting point
    // will match the BRT components of the original point.
    const brtTime = new Date(date.getTime() - (3 * 3600000));
    return `${brtTime.getUTCFullYear()}-${brtTime.getUTCMonth()}-${brtTime.getUTCDate()}`;
  };

  // Mark occupied dates from DB events
  existingEvents.forEach(evt => {
    occupiedDates.add(getBRTDateKey(new Date(evt.dateTime)));
  });

  years.forEach(year => {
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday...
        const dateKey = `${year}-${month}-${day}`;

        if (occupiedDates.has(dateKey)) {
          continue;
        }

        // TUESDAY (2) - Intercession Meeting 20:00 BRT
        if (dayOfWeek === 2) {
          // 20:00 BRT is 23:00 UTC
          const evtDate = new Date(Date.UTC(year, month, day, 23, 0, 0));
          generatedEvents.push({
            id: virtualIdCounter--,
            dateTime: evtDate,
            title: 'Reunião de Intercessão',
            ministryId: 2, // Intercession ID
            ministry: Ministries.Intercession
          });
        }

        // SUNDAY (0) - Celebration Service 18:30 BRT
        if (dayOfWeek === 0) {
          // 18:30 BRT is 21:30 UTC
          const evtDate = new Date(Date.UTC(year, month, day, 21, 30, 0));
          generatedEvents.push({
            id: virtualIdCounter--,
            dateTime: evtDate,
            title: 'Culto de Celebração',
            ministryId: 1, // General ID
            ministry: Ministries.General
          });
        }

        // WEDNESDAY (3) - Family Cell 20:00 BRT (except last wednesday of the month)
        if (dayOfWeek === 3 && (day + 7 <= daysInMonth)) {
          // 20:00 BRT is 23:00 UTC
          const evtDate = new Date(Date.UTC(year, month, day, 23, 0, 0));
          generatedEvents.push({
            id: virtualIdCounter--,
            dateTime: evtDate,
            title: 'Célula Família',
            ministryId: 1, // General ID
            ministry: Ministries.General
          });
        }
      }
    }
  });

  return generatedEvents;
}

// Function to fetch events with cache
export const fetchEvents = async (): Promise<IEvent[]> => {
  const fetchEventsFromDb = unstable_cache(
    async () => {
      console.log('Fetching events from database (Cache miss)...')
      const dbEvents = await eventRepository.findAll()

      // Generate recurring events for current and next year
      const currentYear = new Date().getFullYear();
      const yearsToCheck = [currentYear, currentYear + 1];

      const dynamicEvents = generateDynamicEvents(dbEvents, yearsToCheck);

      // Merge and sort
      const allEvents = [...dbEvents, ...dynamicEvents].sort((a, b) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );

      return allEvents
    },
    ['eventos-calendar-v3'], // Update key to force refresh
    {
      revalidate: getSecondsUntilMidnight(),
      tags: ['eventos']
    }
  )

  return await fetchEventsFromDb()
}

// Function to fetch week days and map to IWeekDay interface
export const fetchWeekDays = async (): Promise<IWeekDay[]> => {
  const fetchDaysFromDb = unstable_cache(
    async () => {
      console.log('Fetching week days from database (Cache miss)...')
      const days = await prisma.diaSemana.findMany({
        orderBy: { id: 'asc' }
      });
      // Map Prisma data to IWeekDay interface
      return days.map(day => ({
        id: day.id,
        name: day.nome
      }));
    },
    ['dias-semana'],
    {
      revalidate: getSecondsUntilMidnight(),
      tags: ['dias-semana']
    }
  );

  return await fetchDaysFromDb();
}
