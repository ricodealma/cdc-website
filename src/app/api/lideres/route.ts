import { NextResponse } from 'next/server';
import { PrismaLiderRepository } from '@/src/infra/repositories/PrismaLiderRepository';
import { GetAllLideresUseCase } from '@/src/application/use-cases/lider/GetAllLideres';

const liderRepository = new PrismaLiderRepository();
const getAllLideresUseCase = new GetAllLideresUseCase(liderRepository);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const onlyActive = searchParams.get('active') !== 'false'; // Default true

        const lideres = await getAllLideresUseCase.execute({ onlyActive });

        return NextResponse.json({
            success: true,
            data: lideres,
        });
    } catch (error) {
        console.error('Error fetching lideres:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
