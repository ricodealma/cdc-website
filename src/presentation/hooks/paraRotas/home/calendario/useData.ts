import { IDiaSemana } from '@/src/domain/aggregates/diaSemana';
import { IEvento } from '@/src/domain/aggregates/evento';
import { selecionaDiasSemana, selecionaEventos } from '@/src/presentation/components/paraRotas/home/calendario/actions';
import { useQuery } from '@tanstack/react-query';
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

  // Fetch eventos from the database
  const eventosQuery = useQuery<IEvento[]>({
    queryKey: ['eventos'],
    queryFn: async () => {
      const resp = await selecionaEventos();
      // Ensure dataHora items are Date objects if they were stringified
      return resp.map(e => ({
        ...e,
        dataHora: new Date(e.dataHora)
      }));
    },
  });

  // Fetch dias da semana from the database
  const diasQuery = useQuery<IDiaSemana[]>({
    queryKey: ['dias'],
    queryFn: selecionaDiasSemana,
  });

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const diasNoMes = (ano: number, mes: number) => new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaDoMes = (ano: number, mes: number) => new Date(ano, mes, 1).getDay();

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
    eventos: eventosQuery.data || [],
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
    eventosQuery,
    diasQuery,
  };
};
