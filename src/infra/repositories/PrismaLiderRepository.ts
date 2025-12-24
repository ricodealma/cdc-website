/**
 * Prisma Implementation of ILiderRepository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import {
    ILiderRepository,
    CreateLiderDTO,
    UpdateLiderDTO,
} from '@/src/domain/repositories/ILiderRepository';
import { ILider } from '@/src/domain/aggregates/lider';
import {
    RepositoryError,
    DuplicateEntityError,
} from '@/src/domain/repositories/errors';

export class PrismaLiderRepository implements ILiderRepository {
    async findAll(onlyActive = true): Promise<ILider[]> {
        try {
            const lideres = await prisma.lider.findMany({
                where: onlyActive ? { ativo: true } : undefined,
                orderBy: { nome: 'asc' },
            });
            return lideres.map(this.toDomain);
        } catch (error) {
            throw new RepositoryError('Failed to find lideres', error);
        }
    }

    private toDomain(prismaLider: any): ILider {
        return {
            id: prismaLider.id,
            nome: prismaLider.nome,
            role: prismaLider.role,
            fotoUrl: prismaLider.fotoUrl,
            email: prismaLider.email,
            telefone: prismaLider.telefone,
            ativo: prismaLider.ativo,
            createdAt: prismaLider.createdAt,
            updatedAt: prismaLider.updatedAt,
        };
    }
}
