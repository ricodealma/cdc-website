import { IEvento, Ministerios } from '@/src/domain/aggregates/evento';
import { eventosFixos } from '@/src/infra/eventos';
import { useState } from 'react';

export const useData = () => {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [modalAberto, setModalAberto] = useState(false);
  const [eventosSelecionados, setEventosSelecionados] = useState<IEvento[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());

  const abrirModal = (eventos: IEvento[], dia: number) => {
    const data = new Date(anoAtual, mesAtual, dia);
    setEventosSelecionados(eventos);
    setDataSelecionada(data);
    setModalAberto(true);
  };

  const fecharModal = () => setModalAberto(false);

  const hoje = new Date();
  const diaHoje = hoje.getDate();
  const mesHoje = hoje.getMonth();
  const anoHoje = hoje.getFullYear();
  console.log(mesAtual, mesHoje);

  const criarEventosRecorrentes = () => {
    const eventos: IEvento[] = [];

    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataHoje = new Date(anoAtual, mesAtual, dia);
      const diaSemana = dataHoje.getDay();

      if (diaSemana === 0) {
        eventos.push({
          data: dataHoje,
          titulo: 'Culto de Domingo',
          horario: '18:30',
          ministerio: Ministerios.Geral,
        });
      }

      if (diaSemana === 2) {
        eventos.push({
          data: dataHoje,
          titulo: 'Reunião de Oração',
          horario: '20:00',
          ministerio: Ministerios.Geral,
        });
      }

      if (diaSemana === 3) {
        const proximaQuarta = new Date(anoAtual, mesAtual, dia + 7);
        const ehUltimaQuarta = proximaQuarta.getMonth() !== mesAtual;
        if (!ehUltimaQuarta) {
          eventos.push({
            data: dataHoje,
            titulo: 'Célula',
            horario: '20:00',
            ministerio: Ministerios.Geral,
          });
        } else {
          eventos.push({
            data: dataHoje,
            titulo: 'Dia da família',
            horario: '20:00',
            ministerio: Ministerios.Geral,
          });
        }
      }
    }

    return eventos;
  };

  const eventos = [...eventosFixos, ...criarEventosRecorrentes()];

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const diasNoMes = (ano: number, mes: number) =>
    new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaDoMes = (ano: number, mes: number) =>
    new Date(ano, mes, 1).getDay();

  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  };

  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  };

  return {
    proximoMes,
    mesAnterior,
    primeiroDiaDoMes,
    diasNoMes,
    meses,
    eventos,
    diaHoje,
    mesHoje,
    anoHoje,
    anoAtual,
    mesAtual,
    abrirModal,
    fecharModal,
    dataSelecionada,
    eventosSelecionados,
    modalAberto,
  };
};
