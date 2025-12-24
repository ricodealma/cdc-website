"use server"

import { IEvento } from '@/src/domain/aggregates/evento';
import { IDiaSemana } from '@/src/domain/aggregates/diaSemana';
import { PrismaEventoRepository } from "@/src/infra/repositories/PrismaEventoRepository"
import { unstable_cache } from 'next/cache'
import { prisma } from "@/src/infra/database/prisma"

const eventoRepository = new PrismaEventoRepository()

/**
 * Calculates seconds remaining until the next 00:00 (midnight)
 */
const getSecondsUntilMidnight = () => {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  return Math.floor((midnight.getTime() - now.getTime()) / 1000)
}

// Função para selecionar eventos com cache
export const selecionaEventos = async (): Promise<IEvento[]> => {
  const fetchEventos = unstable_cache(
    async () => {
      console.log('Fetching eventos from database (Cache miss)...')
      return await eventoRepository.findAll()
    },
    ['eventos-calendar'],
    {
      revalidate: getSecondsUntilMidnight(),
      tags: ['eventos']
    }
  )

  return await fetchEventos()
}

// Função para selecionar dias da semana e mapear para a interface IDiaSemana
export const selecionaDiasSemana = async (): Promise<IDiaSemana[]> => {
  const fetchDias = unstable_cache(
    async () => {
      console.log('Fetching dias da semana from database (Cache miss)...')
      return await prisma.diaSemana.findMany({
        orderBy: { id: 'asc' }
      });
    },
    ['dias-semana'],
    {
      revalidate: getSecondsUntilMidnight(),
      tags: ['dias-semana']
    }
  );

  return await fetchDias();
}
