/**
 * Use Case: Create Event
 */

import { IEvent } from '@/src/domain/aggregates/evento';
import { IEventRepository, CreateEventDTO } from '@/src/domain/repositories/IEventoRepository';
import { z } from 'zod';
import { Ministries } from '@/src/domain/aggregates/evento';

// Input validation schema
export const CreateEventInputSchema = z.object({
    title: z.string().min(3).max(255),
    dateTime: z.coerce.date(),
    description: z.string().optional(),
    ministry: z.nativeEnum(Ministries),
});

export type CreateEventInput = z.infer<typeof CreateEventInputSchema>;

export class CreateEventUseCase {
    constructor(private readonly eventRepository: IEventRepository) { }

    async execute(input: CreateEventInput): Promise<IEvent> {
        // Validate input
        const validatedInput = CreateEventInputSchema.parse(input);

        // Business rule: event cannot be in the past
        if (validatedInput.dateTime < new Date()) {
            throw new Error('Cannot create event in the past');
        }

        // Execute domain operation
        return await this.eventRepository.create(validatedInput);
    }
}
