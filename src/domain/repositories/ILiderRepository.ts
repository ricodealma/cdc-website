/**
 * Repository Interface for Lider
 */

import { ILider } from '../aggregates/lider';

export interface ILiderRepository {
    findAll(onlyActive?: boolean): Promise<ILider[]>;
}

export type CreateLiderDTO = Omit<ILider, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLiderDTO = Partial<CreateLiderDTO>;
