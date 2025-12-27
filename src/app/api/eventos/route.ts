import { NextResponse } from 'next/server';
import { PrismaEventRepository } from '@/src/infra/repositories/PrismaEventoRepository';
import { GetUpcomingEventsUseCase } from '@/src/application/use-cases/evento/GetUpcomingEventos';
import { CreateEventUseCase, CreateEventInputSchema } from '@/src/application/use-cases/evento/CreateEvento';
import { z } from 'zod';

// Dependency Injection (Manual for now, could use a container)
const eventRepository = new PrismaEventRepository();
const getUpcomingEventsUseCase = new GetUpcomingEventsUseCase(eventRepository);
const createEventUseCase = new CreateEventUseCase(eventRepository);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

        const events = await getUpcomingEventsUseCase.execute({ limit });

        return NextResponse.json({
            success: true,
            data: events,
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation is handled inside the Use Case, but we can catch Zod errors here
        // to return 400 Bad Request
        const event = await createEventUseCase.execute(body);

        return NextResponse.json({
            success: true,
            data: event,
        }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Validation Error', details: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Error && error.message.includes('past')) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }

        console.error('Error creating event:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
