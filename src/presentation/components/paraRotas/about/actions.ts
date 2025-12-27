"use server"

import { PrismaLeaderRepository } from "@/src/infra/repositories/PrismaLiderRepository"
import { unstable_cache } from 'next/cache'
import { ILeader } from "@/src/domain/aggregates/lider"

const leaderRepository = new PrismaLeaderRepository()

/**
 * Calculates seconds remaining until the next 00:00 (midnight)
 */
const getSecondsUntilMidnight = () => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    return Math.floor((midnight.getTime() - now.getTime()) / 1000)
}

// Function to fetch leaders with cache
export const fetchLeaders = async (): Promise<ILeader[]> => {
    const fetchLeadersFromDb = unstable_cache(
        async () => {
            console.log('Fetching leaders from database (Cache miss)...')
            return await leaderRepository.findAll()
        },
        ['lideres-about'],
        {
            revalidate: getSecondsUntilMidnight(),
            tags: ['lideres']
        }
    )

    return await fetchLeadersFromDb()
}
