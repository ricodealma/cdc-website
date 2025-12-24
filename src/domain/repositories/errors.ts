/**
 * Custom Repository Errors
 * 
 * These errors provide semantic meaning to failure scenarios
 * and allow the application layer to handle them appropriately.
 */

export class RepositoryError extends Error {
    constructor(
        message: string,
        public readonly cause?: unknown
    ) {
        super(message);
        this.name = 'RepositoryError';
    }
}

export class DuplicateEntityError extends RepositoryError {
    constructor(entityName: string, field: string, value: string) {
        super(`${entityName} with ${field}='${value}' already exists`);
        this.name = 'DuplicateEntityError';
    }
}
