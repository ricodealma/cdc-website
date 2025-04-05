'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    const eventos: { date: Date; title: string; time: string }[] = [];

    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(anoAtual, mesAtual, dia);
      const diaSemana = data.getDay();

      // Cultos de Domingo às 18:30
      if (diaSemana === 0) {
        eventos.push({
          date: data,
          title: 'Culto de Domingo',
          time: '18:30',
        });
      }

      // Reuniões de oração às terças às 20:00
      if (diaSemana === 2) {
        eventos.push({
          date: data,
          title: 'Reunião de Oração',
          time: '20:00',
        });
      }

      // Células às quartas às 20:00, exceto a última do mês
      if (diaSemana === 3) {
        const proximaQuarta = new Date(anoAtual, mesAtual, dia + 7);
        const ehUltimaQuarta = proximaQuarta.getMonth() !== mesAtual;
        if (!ehUltimaQuarta) {
          eventos.push({
            date: data,
            title: 'Célula',
            time: '20:00',
          });
        }
      }
    }

    return eventos;
  };

  // Eventos fixos
  const eventosFixos = [
    { date: new Date(2025, 3, 18), title: 'Culto Pascal', time: '19:00' },
    { date: new Date(2025, 3, 20), title: 'Culto Pascal', time: '19:00' },
    { date: new Date(2025, 3, 27), title: 'Culto do Amigo', time: '19:00' },
    { date: new Date(2025, 4, 1), title: 'Dia de Lazer', time: '08:00' },
    {
      date: new Date(2025, 4, 17),
      title: 'Congresso de Mulheres',
      time: '19:00',
    },
    { date: new Date(2025, 4, 18), title: 'Culto das Mulheres', time: '19:00' },
    { date: new Date(2025, 5, 7), title: 'Pentecostes', time: '19:00' },
    { date: new Date(2025, 5, 8), title: 'Pentecostes', time: '19:00' },
    { date: new Date(2025, 7, 9), title: '24h de Adoração', time: '00:00' },
    { date: new Date(2025, 8, 21), title: 'Culto dos Jovens', time: '19:00' },
    { date: new Date(2025, 9, 5), title: 'Culto das Crianças', time: '19:00' },
    {
      date: new Date(2025, 9, 24),
      title: 'Acampamento e Tabernáculos',
      time: '19:00',
    },
    {
      date: new Date(2025, 9, 25),
      title: 'Acampamento e Tabernáculos',
      time: '19:00',
    },
    {
      date: new Date(2025, 9, 26),
      title: 'Acampamento e Tabernáculos',
      time: '19:00',
    },
    { date: new Date(2025, 12, 28), title: 'Culto de Gratidão', time: '18:30' },
  ];

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
          evento.date.getDate() === dia &&
          evento.date.getMonth() === mesAtual &&
          evento.date.getFullYear() === anoAtual
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
                  {evento.title}
                </div>
              ))}
            </div>
          )}
          {eventosDoDia.length > 2 && (
            <div className="mt-1">
              <div className="text-xs truncate">{eventosDoDia[0].title}</div>
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

  const renderizarListaEventos = () => {
    const eventosFiltrados = eventos
      .filter(
        (evento) =>
          evento.date.getMonth() === mesAtual &&
          evento.date.getFullYear() === anoAtual
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Próximos Eventos</h3>
        {eventosFiltrados.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventosFiltrados.map((evento, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{evento.title}</CardTitle>
                  <CardDescription>
                    {evento.date.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{evento.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nenhum evento agendado para este mês.
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
