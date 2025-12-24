# CDC Website

Website oficial da Casa do Consolador.

Stack: Next.js + Supabase + Prisma ORM.

## Arquitetura de Persistência

O projeto utiliza **Prisma ORM** como camada de abstração de dados, seguindo princípios de **Clean Architecture**:

1. **Domain Layer**: Interfaces de repositório (`IEventoRepository`) e entidades.
2. **Infra Layer**: Implementações concretas com Prisma (`PrismaEventoRepository`).
3. **Application Layer**: Use Cases puros (`CreateEventoUseCase`).
4. **Interface Adapters**: API Routes e Controllers.

O acesso ao banco é **estritamente proibido** no Frontend. Todo acesso deve passar pela API Layer ou Server Actions que utilizam os Use Cases.
