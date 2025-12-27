/**
 * Repository Interface for Leader
 */

import { ILeader } from '../aggregates/lider';

export interface ILeaderRepository {
    findAll(onlyActive?: boolean): Promise<ILeader[]>;
}

export type CreateLeaderDTO = Omit<ILeader, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLeaderDTO = Partial<CreateLeaderDTO>;
