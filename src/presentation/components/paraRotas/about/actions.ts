"use server"

import { PrismaLiderRepository } from "@/src/infra/repositories/PrismaLiderRepository"
import { unstable_cache } from 'next/cache'
import { ILider } from "@/src/domain/aggregates/lider"

const liderRepository = new PrismaLiderRepository()

/**
 * Calculates seconds remaining until the next 00:00 (midnight)
 */
const getSecondsUntilMidnight = () => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    return Math.floor((midnight.getTime() - now.getTime()) / 1000)
}

// Função para selecionar líderes com cache
export const selecionaLideres = async (): Promise<ILider[]> => {
    const fetchLideres = unstable_cache(
        async () => {
            console.log('Fetching lideres from database (Cache miss)...')
            return await liderRepository.findAll()
        },
        ['lideres-about'],
        {
            revalidate: getSecondsUntilMidnight(),
            tags: ['lideres']
        }
    )

    return await fetchLideres()
}
