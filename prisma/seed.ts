import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Enum Ministerios do domínio (apenas para referência de IDs)
enum Ministerios {
    Geral = 1,
    Intercessao = 2,
    Mulheres = 3,
    Infantil = 4,
    Evangelismo = 5,
    Midia = 6,
    Louvor = 7,
    Jovens = 8
}

const diasSemanaData = [
    { id: 1, nome: 'Segunda' },
    { id: 2, nome: 'Terça' },
    { id: 3, nome: 'Quarta' },
    { id: 4, nome: 'Quinta' },
    { id: 5, nome: 'Sexta' },
    { id: 6, nome: 'Sábado' },
    { id: 7, nome: 'Domingo' },
];

const ministeriosData = [
    { id: Ministerios.Geral, nome: 'Geral', descricao: 'Ministério Geral', visao: 'Visão Geral' },
    { id: Ministerios.Intercessao, nome: 'Intercessão', descricao: 'Ministério de Intercessão', visao: 'Orar pela igreja' },
    { id: Ministerios.Mulheres, nome: 'Mulheres', descricao: 'Ministério de Mulheres', visao: 'Apoio às mulheres' },
    { id: Ministerios.Infantil, nome: 'Infantil', descricao: 'Ministério Infantil', visao: 'Ensino às crianças' },
    { id: Ministerios.Evangelismo, nome: 'Evangelismo', descricao: 'Ministério de Evangelismo', visao: 'Levar a palavra' },
    { id: Ministerios.Midia, nome: 'Mídia', descricao: 'Ministério de Mídia', visao: 'Comunicação e Tecnologia' },
    { id: Ministerios.Louvor, nome: 'Louvor', descricao: 'Ministério de Louvor', visao: 'Adoração através da música' },
    { id: Ministerios.Jovens, nome: 'Jovens', descricao: 'Ministério de Jovens', visao: 'Discipulado de jovens' },
];

const lideresData = [
    {
        nome: 'Adenilson Santos',
        role: 'Pastor presidente',
        image: '/placeholder.svg?height=300&width=300',
        ministerioId: Ministerios.Geral // Assumindo Geral
    },
    {
        nome: 'Guilhermano Júnior',
        role: 'Presbítero',
        image: '/placeholder.svg?height=300&width=300',
        ministerioId: Ministerios.Geral
    },
    {
        nome: 'Daniel Ferraz',
        role: 'Presbítero',
        image: 'https://ncxrqinyqigvrqdjkmaq.supabase.co/storage/v1/object/public/cdc-website-assets/daniel.jpg',
        ministerioId: Ministerios.Geral
    },
    {
        nome: 'Simone Marques',
        role: 'Pastora e lider de intercessão',
        image: 'https://ncxrqinyqigvrqdjkmaq.supabase.co/storage/v1/object/public/cdc-website-assets/simone.jpg',
        ministerioId: Ministerios.Intercessao
    },
    {
        nome: 'Andreia Santos',
        role: 'Pastora',
        image: '/placeholder.svg?height=300&width=300',
        ministerioId: Ministerios.Geral
    },
    {
        nome: 'Meire Márcia',
        role: 'Líder do Ministério Infantil',
        image: '/placeholder.svg?height=300&width=300',
        ministerioId: Ministerios.Infantil
    },
    {
        nome: 'Luciana Maia',
        role: 'Líder do Ministério de mulheres',
        image: 'https://ncxrqinyqigvrqdjkmaq.supabase.co/storage/v1/object/public/cdc-website-assets/lu.jpg',
        ministerioId: Ministerios.Mulheres
    },
    {
        nome: 'Fabiane Ferraz',
        role: 'Líder do Ministério de Evangelismo',
        image: 'https://ncxrqinyqigvrqdjkmaq.supabase.co/storage/v1/object/public/cdc-website-assets/bia.jpg',
        ministerioId: Ministerios.Evangelismo
    },
    {
        nome: 'Weldson Batista',
        role: 'Líder do Ministério de Mídia',
        image: '/placeholder.svg?height=300&width=300',
        ministerioId: Ministerios.Midia
    },
];

const eventosData = [
    // ========== 2025 Events ==========
    {
        data: new Date(2025, 3, 18), // Abril
        titulo: 'Culto Pascal',
        horario: '19:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 3, 20),
        titulo: 'Culto Pascal',
        horario: '18:30',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 3, 27),
        titulo: 'Culto do Amigo',
        horario: '18:30',
        ministerioId: Ministerios.Evangelismo,
    },
    {
        data: new Date(2025, 4, 1),
        titulo: 'Dia de Lazer',
        horario: '08:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 4, 17),
        titulo: 'Congresso de Mulheres',
        horario: '19:00',
        ministerioId: Ministerios.Mulheres,
    },
    {
        data: new Date(2025, 4, 18),
        titulo: 'Culto das Mulheres',
        horario: '18:30',
        ministerioId: Ministerios.Mulheres,
    },
    {
        data: new Date(2025, 5, 7),
        titulo: 'Pentecostes',
        horario: '19:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 5, 8),
        titulo: 'Pentecostes',
        horario: '18:30',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 7, 9),
        titulo: '24h de Adoração',
        horario: '00:00',
        ministerioId: Ministerios.Louvor,
    },
    {
        data: new Date(2025, 8, 21),
        titulo: 'Culto dos Jovens',
        horario: '18:30',
        ministerioId: Ministerios.Jovens,
    },
    {
        data: new Date(2025, 9, 5),
        titulo: 'Culto das Crianças',
        horario: '18:30',
        ministerioId: Ministerios.Infantil,
    },
    {
        data: new Date(2025, 9, 24),
        titulo: 'Acampamento e Tabernáculos',
        horario: '00:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 9, 25),
        titulo: 'Acampamento e Tabernáculos',
        horario: '00:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 9, 26),
        titulo: 'Acampamento e Tabernáculos',
        horario: '00:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 11, 28), // Dezembro
        titulo: 'Culto de Gratidão',
        horario: '18:30',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2025, 11, 31),
        titulo: 'Culto da Virada',
        horario: '22:00',
        ministerioId: Ministerios.Geral,
    },

    // ========== Agenda 2026 ==========
    {
        data: new Date(2026, 1, 22), // 22/02
        titulo: 'Curso de Membros (Início)',
        horario: '18:30',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 1, 28), // 28/02
        titulo: 'Encontro de Casais',
        horario: '19:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 2, 3), // 03/03
        titulo: 'Aniversário da Igreja',
        horario: '20:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 2, 5), // 05/03
        titulo: 'Aniversário da Igreja',
        horario: '20:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 3, 19), // 19/04
        titulo: 'Culto do Amigo',
        horario: '18:30',
        ministerioId: Ministerios.Evangelismo,
    },
    {
        data: new Date(2026, 4, 1), // 01/05
        titulo: 'Dia de Lazer',
        horario: '08:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 4, 23), // 23/05
        titulo: 'Pentecostes',
        horario: '19:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 4, 24), // 24/05
        titulo: 'Pentecostes',
        horario: '18:30',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 5, 20), // 20/06
        titulo: 'Encontro de Casais',
        horario: '19:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 7, 8), // 08/08
        titulo: '24h de Adoração',
        horario: '00:00',
        ministerioId: Ministerios.Louvor,
    },
    {
        data: new Date(2026, 8, 13), // 13/09
        titulo: 'Culto Liderado pelos Jovens',
        horario: '18:30',
        ministerioId: Ministerios.Jovens,
    },
    {
        data: new Date(2026, 9, 4), // 04/10
        titulo: 'Culto Liderado pelas Crianças',
        horario: '18:30',
        ministerioId: Ministerios.Infantil,
    },
    {
        data: new Date(2026, 10, 6), // 06/11
        titulo: 'Acampamento',
        horario: '00:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 10, 7), // 07/11
        titulo: 'Acampamento',
        horario: '00:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 10, 8), // 08/11
        titulo: 'Acampamento',
        horario: '00:00',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 11, 27), // 27/12
        titulo: 'Culto de Gratidão',
        horario: '18:30',
        ministerioId: Ministerios.Geral,
    },
    {
        data: new Date(2026, 11, 31), // 31/12
        titulo: 'Culto da Virada',
        horario: '22:00',
        ministerioId: Ministerios.Geral,
    },
];



async function main() {
    console.log('Iniciando seed...');

    // 0. Criar/Atualizar Dias da Semana
    for (const dia of diasSemanaData) {
        await prisma.diaSemana.upsert({
            where: { id: dia.id },
            update: { nome: dia.nome },
            create: { id: dia.id, nome: dia.nome },
        });
    }
    console.log('Dias da semana criados/atualizados.');

    // 1. Criar/Atualizar Ministérios
    for (const min of ministeriosData) {
        await prisma.ministerio.upsert({
            where: { id: min.id },
            update: { nome: min.nome, descricao: min.descricao, visao: min.visao },
            create: { id: min.id, nome: min.nome, descricao: min.descricao, visao: min.visao },
        });
    }
    console.log('Ministérios criados/atualizados.');

    // 2. Criar Líderes e vincular aos ministérios
    for (const lider of lideresData) {
        // Tenta encontrar o líder pelo nome já que email não foi fornecido no prompt
        // Idealmente em produção usaríamos email único.

        // Como não temos um campo único confiável além do ID que é auto-inc,
        // Vamos verificar se existe pelo nome primeiro.
        const existingLider = await prisma.lider.findFirst({
            where: { nome: lider.nome }
        });

        if (existingLider) {
            await prisma.lider.update({
                where: { id: existingLider.id },
                data: {
                    role: lider.role,
                    fotoUrl: lider.image,
                    // Opcional: Atualizar ministério se necessário, mas pode sobrescrever manual changes
                    ministerio: { connect: { id: lider.ministerioId } }
                }
            })
        } else {
            await prisma.lider.create({
                data: {
                    nome: lider.nome,
                    role: lider.role,
                    fotoUrl: lider.image,
                    ministerio: { connect: { id: lider.ministerioId } }
                }
            })
        }
    }
    console.log('Líderes criados/atualizados.');

    // Atualizar vínculo dos ministérios com seus principais líderes (Opcional, lógica inversa)
    // No schema atual: Lider tem opcional ministerio, Ministerio tem opcional lider.
    // Vamos deixar assim por enquanto.

    // 3. Criar Eventos (Apenas Especiais)
    await prisma.evento.deleteMany({}); // Limpa eventos antigos
    console.log('Eventos antigos removidos.');

    console.log(`Total de eventos especiais a serem criados: ${eventosData.length}`);

    for (const evt of eventosData) {
        // Combinar data e horario
        const [horas, minutos] = evt.horario.split(':').map(Number);
        const dataHora = new Date(evt.data);
        dataHora.setHours(horas, minutos, 0, 0);

        await prisma.evento.create({
            data: {
                titulo: evt.titulo,
                dataHora: dataHora,
                ministerioId: evt.ministerioId,
                descricao: `Evento do ministério ${evt.ministerioId}`
            }
        });
    }
    console.log('Eventos criados.');

    console.log('Seed concluído com sucesso!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
