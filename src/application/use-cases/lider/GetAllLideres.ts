/**
 * Use Case: Get All Lideres
 */

import { ILider } from '@/src/domain/aggregates/lider';
import { ILiderRepository } from '@/src/domain/repositories/ILiderRepository';
import { z } from 'zod';

export const GetAllLideresInputSchema = z.object({
    onlyActive: z.boolean().optional().default(true),
});

export type GetAllLideresInput = z.infer<typeof GetAllLideresInputSchema>;

export class GetAllLideresUseCase {
    constructor(private readonly liderRepository: ILiderRepository) { }

    async execute(input: GetAllLideresInput = { onlyActive: true }): Promise<ILider[]> {
        const validatedInput = GetAllLideresInputSchema.parse(input);
        return await this.liderRepository.findAll(validatedInput.onlyActive);
    }
}
