/**
 * Use Case: Get Upcoming Eventos
 * 
 * Application layer - orchestrates domain operations.
 * No business logic here, just coordination.
 */

import { IEvento } from '@/src/domain/aggregates/evento';
import { IEventoRepository } from '@/src/domain/repositories/IEventoRepository';
import { z } from 'zod';

// Input validation schema
export const GetUpcomingEventosInputSchema = z.object({
    limit: z.number().min(1).max(100).optional().default(10),
});

export type GetUpcomingEventosInput = z.infer<typeof GetUpcomingEventosInputSchema>;

export class GetUpcomingEventosUseCase {
    constructor(private readonly eventoRepository: IEventoRepository) { }

    async execute(input: GetUpcomingEventosInput): Promise<IEvento[]> {
        // Validate input
        const validatedInput = GetUpcomingEventosInputSchema.parse(input);

        // Execute domain operation
        return await this.eventoRepository.findUpcoming(validatedInput.limit);
    }
}
