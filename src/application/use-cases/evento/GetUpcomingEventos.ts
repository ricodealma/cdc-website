/**
 * Use Case: Get Upcoming Events
 * 
 * Application layer - orchestrates domain operations.
 * No business logic here, just coordination.
 */

import { IEvent } from '@/src/domain/aggregates/evento';
import { IEventRepository } from '@/src/domain/repositories/IEventoRepository';
import { z } from 'zod';

// Input validation schema
export const GetUpcomingEventsInputSchema = z.object({
    limit: z.number().min(1).max(100).optional().default(10),
});

export type GetUpcomingEventsInput = z.infer<typeof GetUpcomingEventsInputSchema>;

export class GetUpcomingEventsUseCase {
    constructor(private readonly eventRepository: IEventRepository) { }

    async execute(input: GetUpcomingEventsInput): Promise<IEvent[]> {
        // Validate input
        const validatedInput = GetUpcomingEventsInputSchema.parse(input);

        // Execute domain operation
        return await this.eventRepository.findUpcoming(validatedInput.limit);
    }
}
