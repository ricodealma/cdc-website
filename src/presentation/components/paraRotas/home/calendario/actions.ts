"use server"

import { IEvent } from '@/src/domain/aggregates/evento';
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

// Function to fetch events with cache
export const fetchEvents = async (): Promise<IEvent[]> => {
  const fetchEventsFromDb = unstable_cache(
    async () => {
      console.log('Fetching events from database (Cache miss)...')
      return await eventRepository.findAll()
    },
    ['eventos-calendar'],
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
