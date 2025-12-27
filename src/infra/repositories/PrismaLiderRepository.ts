/**
 * Prisma Implementation of ILeaderRepository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import {
    ILeaderRepository,
    CreateLeaderDTO,
    UpdateLeaderDTO,
} from '@/src/domain/repositories/ILiderRepository';
import { ILeader } from '@/src/domain/aggregates/lider';
import {
    RepositoryError,
    DuplicateEntityError,
} from '@/src/domain/repositories/errors';

export class PrismaLeaderRepository implements ILeaderRepository {
    async findAll(onlyActive = true): Promise<ILeader[]> {
        try {
            const leaders = await prisma.lider.findMany({
                where: onlyActive ? { ativo: true } : undefined,
                orderBy: { nome: 'asc' },
            });
            return leaders.map(this.toDomain);
        } catch (error) {
            throw new RepositoryError('Failed to find leaders', error);
        }
    }

    private toDomain(prismaLeader: any): ILeader {
        return {
            id: prismaLeader.id,
            name: prismaLeader.nome,
            role: prismaLeader.role,
            photoUrl: prismaLeader.fotoUrl,
            email: prismaLeader.email,
            phone: prismaLeader.telefone,
            active: prismaLeader.ativo,
            createdAt: prismaLeader.createdAt,
            updatedAt: prismaLeader.updatedAt,
        };
    }
}
