"use server"

import { createClient } from "@/src/infra/supabase/client"
import { cookies } from "next/headers"
import { IEvento, Ministerios } from '@/src/domain/aggregates/evento';
import { IDiaSemana } from '@/src/domain/aggregates/diaSemana';

// Função para selecionar eventos e mapear para a interface IEvento
export const selecionaEventos = async (): Promise<IEvento[]> => {
  const supabase = await createClient(cookies());

  const { data: eventosDb, error } = await supabase.from('eventos').select(`
    id,
    titulo,
    data_hora,
    id_ministerio
  `);

  if (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }

  return (eventosDb || []).map(evento => ({
    id: evento.id,
    titulo: evento.titulo,
    dataHora: new Date(evento.data_hora),
    ministerio: evento.id_ministerio as Ministerios,
  }));
}

// Função para selecionar dias da semana e mapear para a interface IDiaSemana
export const selecionaDiasSemana = async (): Promise<IDiaSemana[]> => {
  const supabase = await createClient(cookies());

  const { data: diasDb, error } = await supabase.from('dias_semana').select(`
    id,
    nome
  `);

  if (error) {
    console.error("Erro ao buscar dias da semana:", error);
    return [];
  }

  return diasDb || [];
}
