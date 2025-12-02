# CDC Website

Website oficial da Comunidade do caminho.

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão LTS recomendada)
- npm ou pnpm

### Configuração
1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```
3. Configure as variáveis de ambiente. Crie um arquivo `.env.local` na raiz com:
   ```env
   SUPABASE_URL=sua_url_do_supabase
   SUPABASE_ANON_KEY=sua_chave_anonima
   ```

### Rodando o projeto
```bash
npm run dev
# ou
pnpm dev
```
O projeto estará disponível em `http://localhost:3000`.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura baseada em **Clean Architecture** adaptada para Next.js App Router, focando em separação de responsabilidades e organização por funcionalidades.

### Estrutura de Pastas (`src/`)

#### 1. `app/` (Next.js App Router)
- **Responsabilidade**: Camada de Roteamento e Composição.
- **Conteúdo**: Apenas arquivos do Next.js (`page.tsx`, `layout.tsx`, `route.ts`).
- **Regra**: Não deve conter lógica de negócio ou componentes complexos. Apenas importa e renderiza componentes da camada `presentation`.

#### 2. `presentation/` (Camada de Apresentação)
- **Responsabilidade**: Interface do Usuário (UI) e Lógica de Visualização.
- **Subpastas**:
  - `components/paraRotas/`: Contém a implementação das páginas. Cada pasta aqui representa uma rota/feature (ex: `home`, `about`).
    - `index.tsx`: Componente principal da página.
    - `actions.ts`: **Server Actions**. Atua como Controller/Gateway, buscando dados da `infra` e retornando para a UI.
    - `[FeatureComponents]`: Componentes específicos daquela funcionalidade.
  - `components/ui/`: Componentes genéricos e reutilizáveis (Design System / Shadcn UI).
  - `hooks/`: Custom hooks para lógica de estado da UI.

#### 3. `domain/` (Camada de Domínio)
- **Responsabilidade**: Definição das Entidades e Regras de Negócio Centrais.
- **Conteúdo**: Interfaces, Tipos e Classes que representam o núcleo do negócio (ex: `IEvento`, `Ministerios`).
- **Regra**: Totalmente desacoplado de frameworks (Next.js, React) e infraestrutura (Supabase).

#### 4. `infra/` (Camada de Infraestrutura)
- **Responsabilidade**: Comunicação com o mundo externo.
- **Conteúdo**: Clientes de Banco de Dados (Supabase), chamadas de API externas, ou dados hardcoded.
- **Regra**: É a única camada que deve conhecer detalhes de implementação externa (ex: chaves de API, bibliotecas de DB).

---

## 🧩 Guia de Desenvolvimento

### Onde colocar novo código?

| Tipo de Código | Localização | Exemplo |
|----------------|-------------|---------|
| **Nova Página** | `src/app/[rota]/page.tsx` (rota) + `src/presentation/components/paraRotas/[rota]` (impl) | Criar `/contato` |
| **Componente Reutilizável** | `src/presentation/components/ui/` | Botão, Modal, Card |
| **Componente Específico** | `src/presentation/components/paraRotas/[feature]/` | `BannerHome`, `FormularioInscricao` |
| **Lógica de Banco de Dados** | `src/presentation/components/paraRotas/[feature]/actions.ts` (chamando `infra`) | Buscar eventos no Supabase |
| **Nova Entidade/Tipo** | `src/domain/aggregates/` | `IMembro`, `IDoacao` |

### Fluxo de Dados Típico
1. **UI** (`presentation`) solicita dados via Server Action (`actions.ts`).
2. **Server Action** chama o cliente do Supabase em `infra`.
3. **Infra** retorna dados brutos.
4. **Server Action** mapeia dados brutos para entidades do `domain`.
5. **UI** recebe entidades tipadas e renderiza.
