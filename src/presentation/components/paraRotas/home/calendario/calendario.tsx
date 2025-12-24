'use client';

import { Button } from '@/src/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/presentation/components/ui/card';
import { useData } from '@/src/presentation/hooks/paraRotas/home/calendario/useData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ModalEvento from './modalEvento';

export default function Calendario() {
  const {
    diasNoMes,
    primeiroDiaDoMes,
    anoAtual,
    mesAtual,
    eventos,
    diaHoje,
    mesHoje,
    anoHoje,
    meses,
    mesAnterior,
    proximoMes,
    abrirModal,
    modalAberto,
    fecharModal,
    eventosSelecionados,
    dataSelecionada,
    eventosQuery, // Acesso ao estado de carregamento e erro
  } = useData();

  // Renderiza o calendário mensal
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
          evento.dataHora.getDate() === dia &&
          evento.dataHora.getMonth() === mesAtual &&
          evento.dataHora.getFullYear() === anoAtual
      );

      const isHoje =
        dia === diaHoje && mesAtual === mesHoje && anoAtual === anoHoje;

      dias.push(
        <div
          key={`dia-${dia}`}
          className={`min-h-12 border border-muted p-1 cursor-pointer ${eventosDoDia.length > 0
            ? 'bg-primary/5 hover:bg-primary/10'
            : 'bg-background'
            } ${isHoje ? 'ring-2 ring-primary rounded-md' : ''}`}
          onClick={() =>
            eventosDoDia.length > 0 && abrirModal(eventosDoDia, dia)
          }
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

  // Verifica se a data está na mesma semana
  const isSameWeek = (date: Date): boolean => {
    const now = new Date();
    const startOfWeek = new Date(now);

    const dayOfWeek = now.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return date >= startOfWeek && date <= endOfWeek;
  };


  // Renderiza a lista de eventos da semana atual
  const renderizarListaEventos = () => {
    const eventosFiltrados = eventos
      .filter((evento) => isSameWeek(evento.dataHora))
      .sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());

    return (
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Eventos desta Semana</h3>
        {eventosFiltrados.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventosFiltrados.map((evento, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{evento.titulo}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {evento.dataHora.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{evento.dataHora.toLocaleTimeString('pt-BR')}</p>
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

      {eventosQuery.isLoading ? (
        <p>Carregando eventos...</p>
      ) : eventosQuery.error ? (
        <p>Erro ao carregar eventos. Tente novamente mais tarde.</p>
      ) : (
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
      )}

      {renderizarListaEventos()}
      <ModalEvento
        aberto={modalAberto}
        aoFechar={fecharModal}
        eventos={eventosSelecionados}
        data={dataSelecionada}
      />
    </div>
  );
}
