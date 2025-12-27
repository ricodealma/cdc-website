# Regras de Negócio - Eventos e Agenda

Este documento descreve as regras de negócio implementadas para a gestão de eventos e calendário da igreja.

## 1. Eventos

Os eventos são divididos em duas categorias principais: **Especiais** e **Recorrentes**.

### 1.1. Eventos Especiais (Persistidos)
Eventos pontuais ou anuais (ex: Páscoa, Congressos, Aniversário da Igreja) são armazenados fisicamente no banco de dados. Estes eventos têm precedência sobre a agenda recorrente.

### 1.2. Eventos Recorrentes (Dinâmicos)
Os eventos da agenda semanal regular são gerados dinamicamente em tempo de execução pela aplicação e **não** são persistidos no banco de dados. Isso evita poluição de dados e facilita a manutenção.

#### Agenda Semanal Padrão:

| Dia da Semana | Horário | Evento | Ministério | Regra de Exceção |
| :--- | :--- | :--- | :--- | :--- |
| **Domingo** | 18:30 | Culto de Celebração | Geral | Nenhuma. |
| **Terça-feira** | 20:00 | Reunião de Intercessão | Intercessão | Nenhuma. |
| **Quarta-feira** | 20:00 | Célula Família | Geral | **NÃO** ocorre na última quarta-feira do mês. |

### 1.3. Regras de Conflito
*   Se um **Evento Especial** estiver agendado para uma data específica, o **Evento Recorrente** daquele dia **não** será gerado. O evento especial tem prioridade total.

## 2. Localização e Exibição
*   Todos os nomes de ministérios e títulos de eventos devem ser exibidos em **Português (pt-BR)** na interface do usuário.
*   O sistema deve realizar a tradução/mapeamento dos Enums internos (que podem estar em inglês) para a exibição correta.
