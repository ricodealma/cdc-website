/**
 * Use Case: Create Evento
 */

import { IEvento } from '@/src/domain/aggregates/evento';
import { IEventoRepository, CreateEventoDTO } from '@/src/domain/repositories/IEventoRepository';
import { z } from 'zod';
import { Ministerios } from '@/src/domain/aggregates/evento';

// Input validation schema
export const CreateEventoInputSchema = z.object({
    titulo: z.string().min(3).max(255),
    dataHora: z.coerce.date(),
    descricao: z.string().optional(),
    ministerio: z.nativeEnum(Ministerios),
});

export type CreateEventoInput = z.infer<typeof CreateEventoInputSchema>;

export class CreateEventoUseCase {
    constructor(private readonly eventoRepository: IEventoRepository) { }

    async execute(input: CreateEventoInput): Promise<IEvento> {
        // Validate input
        const validatedInput = CreateEventoInputSchema.parse(input);

        // Business rule: evento cannot be in the past
        if (validatedInput.dataHora < new Date()) {
            throw new Error('Cannot create evento in the past');
        }

        // Execute domain operation
        return await this.eventoRepository.create(validatedInput);
    }
}
