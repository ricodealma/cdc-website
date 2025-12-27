/**
 * Repository Interface for Event
 * 
 * Defines the contract for data access operations.
 * This interface belongs to the domain layer and is framework-agnostic.
 */

import { IEvent } from '../aggregates/evento';

export interface IEventRepository {
    /**
     * Find all events
     */
    findAll(): Promise<IEvent[]>;

    /**
     * Find upcoming events (dateTime > now)
     */
    findUpcoming(limit?: number): Promise<IEvent[]>;

    /**
     * Create new event
     * @throws RepositoryError if validation or insert fails
     */
    create(data: CreateEventDTO): Promise<IEvent>;
}

// ============================================
// DTOs
// ============================================

export type CreateEventDTO = Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateEventDTO = Partial<CreateEventDTO>;

export interface EventFilters {
    ministry?: number;
    startDate?: Date;
    endDate?: Date;
}
