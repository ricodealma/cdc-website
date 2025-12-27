/**
 * Prisma Implementation of IEventRepository
 * 
 * This class belongs to the infrastructure layer.
 * It translates domain operations into Prisma ORM calls.
 */

import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import {
    IEventRepository,
    CreateEventDTO,
    UpdateEventDTO,
    EventFilters,
} from '@/src/domain/repositories/IEventoRepository';
import { IEvent, Ministries } from '@/src/domain/aggregates/evento';
import {
    RepositoryError,
    DuplicateEntityError,
} from '@/src/domain/repositories/errors';

export class PrismaEventRepository implements IEventRepository {
    async findAll(): Promise<IEvent[]> {
        try {
            const events = await prisma.evento.findMany({
                include: { ministerio: true },
                orderBy: { dataHora: 'asc' },
            });

            return events.map((evt: any) => this.toDomain(evt));
        } catch (error) {
            throw new RepositoryError('Failed to find events', error);
        }
    }

    async findUpcoming(limit = 10): Promise<IEvent[]> {
        try {
            const events = await prisma.evento.findMany({
                where: {
                    dataHora: {
                        gte: new Date(),
                    },
                },
                orderBy: { dataHora: 'asc' },
                take: limit,
                include: { ministerio: true },
            });

            return events.map(this.toDomain);
        } catch (error) {
            throw new RepositoryError('Failed to find upcoming events', error);
        }
    }

    async create(data: CreateEventDTO): Promise<IEvent> {
        try {
            const event = await prisma.evento.create({
                data: {
                    titulo: data.title,
                    dataHora: data.dateTime,
                    descricao: data.description,
                    ministerio: {
                        connect: {
                            nome: this.mapMinistryToDb(data.ministry),
                        },
                    },
                },
                include: { ministerio: true },
            });

            return this.toDomain(event);
        } catch (error) {
            // Handle unique constraint violations
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new DuplicateEntityError('Event', 'title', data.title);
                }
            }
            throw new RepositoryError('Failed to create event', error);
        }
    }

    // ============================================
    // MAPPERS
    // ============================================

    /**
     * Maps Prisma model to Domain entity
     */
    private toDomain(prismaEvent: any): IEvent {
        return {
            id: prismaEvent.id,
            dateTime: prismaEvent.dataHora,
            title: prismaEvent.titulo,
            description: prismaEvent.descricao,
            ministryId: prismaEvent.ministerioId,
            ministry: this.mapMinistryToDomain(prismaEvent.ministerio?.nome),
            createdAt: prismaEvent.createdAt,
            updatedAt: prismaEvent.updatedAt,
        };
    }

    /**
     * Maps domain Ministry enum to Prisma enum
     */
    private mapMinistryToDb(ministry: Ministries): string {
        const map: Record<Ministries, string> = {
            [Ministries.General]: 'GERAL',
            [Ministries.Intercession]: 'INTERCESSAO',
            [Ministries.Women]: 'MULHERES',
            [Ministries.Children]: 'INFANTIL',
            [Ministries.Evangelism]: 'EVANGELISMO',
            [Ministries.Media]: 'MIDIA',
            [Ministries.Worship]: 'LOUVOR',
            [Ministries.Youth]: 'JOVENS',
        };
        return map[ministry];
    }

    /**
     * Maps Prisma enum to domain Ministry enum
     */
    private mapMinistryToDomain(ministry: string): Ministries {
        const map: Record<string, Ministries> = {
            GERAL: Ministries.General,
            INTERCESSAO: Ministries.Intercession,
            MULHERES: Ministries.Women,
            INFANTIL: Ministries.Children,
            EVANGELISMO: Ministries.Evangelism,
            MIDIA: Ministries.Media,
            LOUVOR: Ministries.Worship,
            JOVENS: Ministries.Youth,
        };
        return map[ministry] ?? Ministries.General;
    }
}
