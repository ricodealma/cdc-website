/**
 * Repository Interface for Evento
 * 
 * Defines the contract for data access operations.
 * This interface belongs to the domain layer and is framework-agnostic.
 */

import { IEvento } from '../aggregates/evento';

export interface IEventoRepository {
    /**
     * Find all eventos
     */
    findAll(): Promise<IEvento[]>;

    /**
     * Find upcoming eventos (dataHora > now)
     */
    findUpcoming(limit?: number): Promise<IEvento[]>;

    /**
     * Create new evento
     * @throws RepositoryError if validation or insert fails
     */
    create(data: CreateEventoDTO): Promise<IEvento>;
}

// ============================================
// DTOs
// ============================================

export type CreateEventoDTO = Omit<IEvento, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateEventoDTO = Partial<CreateEventoDTO>;

export interface EventoFilters {
    ministerio?: number;
    startDate?: Date;
    endDate?: Date;
}
