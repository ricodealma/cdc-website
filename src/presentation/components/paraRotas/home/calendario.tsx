'use client';

import { IEvento, Ministerios } from '@/src/domain/aggregates/evento';
import { eventosFixos } from '@/src/infra/eventos';
import { Button } from '@/src/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/presentation/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Calendario() {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  const hoje = new Date();
  const diaHoje = hoje.getDate();
  const mesHoje = hoje.getMonth();
  const anoHoje = hoje.getFullYear();
  const criarEventosRecorrentes = () => {
    const eventos: IEvento[] = [];

    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataHoje = new Date(anoAtual, mesAtual, dia);
      const diaSemana = dataHoje.getDay();

      // Cultos de Domingo às 18:30
      if (diaSemana === 0) {
        eventos.push({
          data: dataHoje,
          titulo: 'Culto de Domingo',
          horario: '18:30',
          ministerio: Ministerios.Geral,
        });
      }

      // Reuniões de oração às terças às 20:00
      if (diaSemana === 2) {
        eventos.push({
          data: dataHoje,
          titulo: 'Reunião de Oração',
          horario: '20:00',
          ministerio: Ministerios.Geral,
        });
      }

      // Células às quartas às 20:00, exceto a última do mês
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

  const renderizarCalendario = () => {
    const totalDias = diasNoMes(anoAtual, mesAtual);
    const primeiroDia = primeiroDiaDoMes(anoAtual, mesAtual);
    const dias = [];

    for (let i = 0; i < primeiroDia; i++) {
      dias.push(
        <div
          key={`vazio-${i}`}
          className="h-12 border border-muted bg-muted/20"
        ></div>
      );
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      const eventosDoDia = eventos.filter(
        (evento) =>
          evento.data.getDate() === dia &&
          evento.data.getMonth() === mesAtual &&
          evento.data.getFullYear() === anoAtual
      );

      const isHoje =
        dia === diaHoje && mesAtual === mesHoje && anoAtual === anoHoje;

      dias.push(
        <div
          key={`dia-${dia}`}
          className={`min-h-12 border border-muted p-1 ${
            eventosDoDia.length > 0 ? 'bg-primary/5' : 'bg-background'
          } ${isHoje ? 'ring-2 ring-primary rounded-md' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">{dia}</span>
            {eventosDoDia.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                {eventosDoDia.length}
              </span>
            )}
          </div>
          {eventosDoDia.length > 0 && eventosDoDia.length <= 2 && (
            <div className="mt-1 space-y-1">
              {eventosDoDia.map((evento, index) => (
                <div key={index} className="text-xs truncate">
                  {evento.titulo}
                </div>
              ))}
            </div>
          )}
          {eventosDoDia.length > 2 && (
            <div className="mt-1">
              <div className="text-xs truncate">{eventosDoDia[0].titulo}</div>
              <div className="text-xs text-muted-foreground">
                +{eventosDoDia.length - 1} mais
              </div>
            </div>
          )}
        </div>
      );
    }

    return dias;
  };

  const isSameWeek = (date: Date): boolean => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Domingo
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sábado
    endOfWeek.setHours(23, 59, 59, 999);

    return date >= startOfWeek && date <= endOfWeek;
  };

  // Renderiza apenas os eventos da semana atual
  const renderizarListaEventos = () => {
    const eventosFiltrados = eventos
      .filter((evento) => isSameWeek(evento.data))
      .sort((a, b) => a.data.getTime() - b.data.getTime());

    return (
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Eventos desta Semana</h3>
        {eventosFiltrados.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventosFiltrados.map((evento, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{evento.titulo}</CardTitle>
                  <CardDescription>
                    {evento.data.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{evento.horario}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nenhum evento agendado para esta semana.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          {meses[mesAtual]} {anoAtual}
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={mesAnterior}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Mês anterior</span>
          </Button>
          <Button variant="outline" size="icon" onClick={proximoMes}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próximo mês</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
          <div
            key={dia}
            className="h-10 flex items-center justify-center bg-muted font-medium"
          >
            {dia}
          </div>
        ))}
        {renderizarCalendario()}
      </div>

      {renderizarListaEventos()}
    </div>
  );
}
