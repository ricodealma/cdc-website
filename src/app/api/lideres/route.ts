import { NextResponse } from 'next/server';
import { PrismaLeaderRepository } from '@/src/infra/repositories/PrismaLiderRepository';
import { GetAllLeadersUseCase } from '@/src/application/use-cases/lider/GetAllLideres';

const leaderRepository = new PrismaLeaderRepository();
const getAllLeadersUseCase = new GetAllLeadersUseCase(leaderRepository);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const onlyActive = searchParams.get('active') !== 'false'; // Default true

        const leaders = await getAllLeadersUseCase.execute({ onlyActive });

        return NextResponse.json({
            success: true,
            data: leaders,
        });
    } catch (error) {
        console.error('Error fetching leaders:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
