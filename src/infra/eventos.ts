import { IEvento, Ministerios } from '@/src/domain/aggregates/evento';

export // Eventos fixos
const eventosFixos: IEvento[] = [
  {
    data: new Date(2025, 3, 18),
    titulo: 'Culto Pascal',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 3, 20),
    titulo: 'Culto Pascal',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 3, 27),
    titulo: 'Culto do Amigo',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 4, 1),
    titulo: 'Dia de Lazer',
    horario: '08:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 4, 17),
    titulo: 'Congresso de Mulheres',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 4, 18),
    titulo: 'Culto das Mulheres',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 5, 7),
    titulo: 'Pentecostes',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 5, 8),
    titulo: 'Pentecostes',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 7, 9),
    titulo: '24h de Adoração',
    horario: '00:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 8, 21),
    titulo: 'Culto dos Jovens',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 9, 5),
    titulo: 'Culto das Crianças',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 9, 24),
    titulo: 'Acampamento e Tabernáculos',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 9, 25),
    titulo: 'Acampamento e Tabernáculos',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 9, 26),
    titulo: 'Acampamento e Tabernáculos',
    horario: '19:00',
    ministerio: Ministerios.Geral,
  },
  {
    data: new Date(2025, 12, 28),
    titulo: 'Culto de Gratidão',
    horario: '18:30',
    ministerio: Ministerios.Geral,
  },
];
