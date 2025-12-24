/**
 * Prisma Implementation of IEventoRepository
 * 
 * This class belongs to the infrastructure layer.
 * It translates domain operations into Prisma ORM calls.
 */

import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import {
    IEventoRepository,
    CreateEventoDTO,
    UpdateEventoDTO,
    EventoFilters,
} from '@/src/domain/repositories/IEventoRepository';
import { IEvento, Ministerios } from '@/src/domain/aggregates/evento';
import {
    RepositoryError,
    DuplicateEntityError,
} from '@/src/domain/repositories/errors';

export class PrismaEventoRepository implements IEventoRepository {
    async findAll(): Promise<IEvento[]> {
        try {
            const eventos = await prisma.evento.findMany({
                include: { ministerio: true },
                orderBy: { dataHora: 'asc' },
            });

            return eventos.map((evt: any) => this.toDomain(evt));
        } catch (error) {
            throw new RepositoryError('Failed to find eventos', error);
        }
    }

    async findUpcoming(limit = 10): Promise<IEvento[]> {
        try {
            const eventos = await prisma.evento.findMany({
                where: {
                    dataHora: {
                        gte: new Date(),
                    },
                },
                orderBy: { dataHora: 'asc' },
                take: limit,
                include: { ministerio: true },
            });

            return eventos.map(this.toDomain);
        } catch (error) {
            throw new RepositoryError('Failed to find upcoming eventos', error);
        }
    }

    async create(data: CreateEventoDTO): Promise<IEvento> {
        try {
            const evento = await prisma.evento.create({
                data: {
                    titulo: data.titulo,
                    dataHora: data.dataHora,
                    descricao: data.descricao,
                    ministerio: {
                        connect: {
                            nome: this.mapMinisterioToDb(data.ministerio),
                        },
                    },
                },
                include: { ministerio: true },
            });

            return this.toDomain(evento);
        } catch (error) {
            // Handle unique constraint violations
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new DuplicateEntityError('Evento', 'titulo', data.titulo);
                }
            }
            throw new RepositoryError('Failed to create evento', error);
        }
    }

    // ============================================
    // MAPPERS
    // ============================================

    /**
     * Maps Prisma model to Domain entity
     */
    private toDomain(prismaEvento: any): IEvento {
        return {
            id: prismaEvento.id,
            dataHora: prismaEvento.dataHora,
            titulo: prismaEvento.titulo,
            descricao: prismaEvento.descricao,
            ministerioId: prismaEvento.ministerioId,
            ministerio: this.mapMinisterioToDomain(prismaEvento.ministerio?.nome),
            createdAt: prismaEvento.createdAt,
            updatedAt: prismaEvento.updatedAt,
        };
    }

    /**
     * Maps domain Ministerio enum to Prisma enum
     */
    private mapMinisterioToDb(ministerio: Ministerios): string {
        const map: Record<Ministerios, string> = {
            [Ministerios.Geral]: 'GERAL',
            [Ministerios.Intercessao]: 'INTERCESSAO',
            [Ministerios.Mulheres]: 'MULHERES',
            [Ministerios.Infantil]: 'INFANTIL',
            [Ministerios.Evangelismo]: 'EVANGELISMO',
            [Ministerios.Midia]: 'MIDIA',
            [Ministerios.Louvor]: 'LOUVOR',
            [Ministerios.Jovens]: 'JOVENS',
        };
        return map[ministerio];
    }

    /**
     * Maps Prisma enum to domain Ministerio enum
     */
    private mapMinisterioToDomain(ministerio: string): Ministerios {
        const map: Record<string, Ministerios> = {
            GERAL: Ministerios.Geral,
            INTERCESSAO: Ministerios.Intercessao,
            MULHERES: Ministerios.Mulheres,
            INFANTIL: Ministerios.Infantil,
            EVANGELISMO: Ministerios.Evangelismo,
            MIDIA: Ministerios.Midia,
            LOUVOR: Ministerios.Louvor,
            JOVENS: Ministerios.Jovens,
        };
        return map[ministerio] ?? Ministerios.Geral;
    }
}
