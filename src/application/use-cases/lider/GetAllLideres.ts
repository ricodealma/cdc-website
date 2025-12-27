/**
 * Use Case: Get All Leaders
 */

import { ILeader } from '@/src/domain/aggregates/lider';
import { ILeaderRepository } from '@/src/domain/repositories/ILiderRepository';
import { z } from 'zod';

export const GetAllLeadersInputSchema = z.object({
    onlyActive: z.boolean().optional().default(true),
});

export type GetAllLeadersInput = z.infer<typeof GetAllLeadersInputSchema>;

export class GetAllLeadersUseCase {
    constructor(private readonly leaderRepository: ILeaderRepository) { }

    async execute(input: GetAllLeadersInput = { onlyActive: true }): Promise<ILeader[]> {
        const validatedInput = GetAllLeadersInputSchema.parse(input);
        return await this.leaderRepository.findAll(validatedInput.onlyActive);
    }
}
