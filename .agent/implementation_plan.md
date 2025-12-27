---
description: Variable Renaming Plan - Clean Code Standards
---

# Variable Renaming Implementation Plan

## Objective
Rename all Portuguese variable names to English following Clean Code principles, while keeping UI text in Brazilian Portuguese for end users.

## Scope
- **Variables, functions, types, interfaces**: English
- **UI text (labels, messages, etc.)**: Brazilian Portuguese
- **Documentation, comments**: English

## Files to Update

### 1. Domain Layer

#### `src/domain/aggregates/diaSemana.ts`
- Rename interface `IDiaSemana` → `IWeekDay`
- Rename property `nome` → `name`

#### `src/domain/aggregates/evento.ts`
- Rename interface `IEvento` → `IEvent`
- Rename property `dataHora` → `dateTime`
- Rename property `titulo` → `title`
- Rename property `descricao` → `description`
- Rename property `ministerioId` → `ministryId`
- Rename property `ministerio` → `ministry`
- Rename enum `Ministerios` → `Ministries`
- Rename enum values to English (Intercessao → Intercession, Mulheres → Women, etc.)

#### `src/domain/aggregates/lider.ts`
- Rename interface `ILider` → `ILeader`
- Rename property `nome` → `name`
- Rename property `fotoUrl` → `photoUrl`
- Rename property `telefone` → `phone`
- Rename property `ativo` → `active`

### 2. Repository Layer

#### `src/domain/repositories/IEventoRepository.ts`
- Rename `IEventoRepository` → `IEventRepository`
- Rename `CreateEventoDTO` → `CreateEventDTO`
- Rename `UpdateEventoDTO` → `UpdateEventDTO`
- Rename `EventoFilters` → `EventFilters`

#### `src/domain/repositories/ILiderRepository.ts`
- Rename `ILiderRepository` → `ILeaderRepository`
- Rename `CreateLiderDTO` → `CreateLeaderDTO`
- Rename `UpdateLiderDTO` → `UpdateLeaderDTO`

### 3. Infrastructure Layer

#### `src/infra/repositories/PrismaEventoRepository.ts`
- Rename class `PrismaEventoRepository` → `PrismaEventRepository`
- Update all method implementations
- Update mapper methods: `mapMinisterioToDb` → `mapMinistryToDb`, `mapMinisterioToDomain` → `mapMinistryToDomain`

#### `src/infra/repositories/PrismaLiderRepository.ts`
- Rename class `PrismaLiderRepository` → `PrismaLeaderRepository`
- Update all method implementations

### 4. Application Layer

#### `src/application/use-cases/evento/CreateEvento.ts`
- Rename file to `CreateEvent.ts`
- Update all references

#### `src/application/use-cases/evento/GetUpcomingEventos.ts`
- Rename file to `GetUpcomingEvents.ts`
- Update all references

#### `src/application/use-cases/lider/GetAllLideres.ts`
- Rename file to `GetAllLeaders.ts`
- Update all references

### 5. Presentation Layer

#### `src/presentation/hooks/paraRotas/home/calendario/useData.ts`
- Rename variables:
  - `mesAtual` → `currentMonth`
  - `anoAtual` → `currentYear`
  - `modalAberto` → `isModalOpen`
  - `eventosSelecionados` → `selectedEvents`
  - `dataSelecionada` → `selectedDate`
  - `abrirModal` → `openModal`
  - `fecharModal` → `closeModal`
  - `hoje` → `today`
  - `diaHoje` → `todayDay`
  - `mesHoje` → `todayMonth`
  - `anoHoje` → `todayYear`
  - `eventosQuery` → `eventsQuery`
  - `diasQuery` → `weekDaysQuery`
  - `meses` → `months` (keep values in Portuguese)
  - `diasNoMes` → `daysInMonth`
  - `primeiroDiaDoMes` → `firstDayOfMonth`
  - `mesAnterior` → `previousMonth`
  - `proximoMes` → `nextMonth`

#### `src/presentation/components/paraRotas/home/calendario/actions.ts`
- Rename `selecionaEventos` → `fetchEvents`
- Rename `selecionaDiasSemana` → `fetchWeekDays`
- Rename `eventoRepository` → `eventRepository`

#### `src/presentation/components/paraRotas/home/calendario/calendario.tsx`
- Update all variable references to match new names
- Rename functions:
  - `renderizarCalendario` → `renderCalendar`
  - `renderizarListaEventos` → `renderEventsList`
  - `eventosDoDia` → `dayEvents`
  - `eventosFiltrados` → `filteredEvents`
  - `isHoje` → `isToday`

#### `src/presentation/components/paraRotas/home/calendario/modalEvento.tsx`
- Rename component `ModalEvento` → `EventModal`
- Rename props: `aberto` → `isOpen`, `aoFechar` → `onClose`, `eventos` → `events`, `data` → `date`

### 6. API Routes

#### `src/app/api/eventos/route.ts`
- Update all references to renamed types and repositories

#### `src/app/api/lideres/route.ts`
- Update all references to renamed types and repositories

## Implementation Order

1. **Domain Layer** (aggregates and repositories interfaces)
2. **Infrastructure Layer** (Prisma repositories)
3. **Application Layer** (use cases)
4. **API Routes**
5. **Presentation Layer** (hooks, actions, components)

## Testing Strategy

After each layer:
1. Check TypeScript compilation
2. Verify no broken imports
3. Test affected functionality

## Notes

- UI text remains in Portuguese (e.g., "Eventos desta Semana", "Carregando eventos...")
- Month names array stays in Portuguese as it's displayed to users
- All console.log messages should be in English
- Comments and documentation in English
