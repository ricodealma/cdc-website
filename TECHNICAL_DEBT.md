# 📑 Technical Debt Report

Este documento lista os débitos técnicos identificados, seus impactos e planos de correção, priorizando a estabilidade e manutenibilidade do projeto a longo prazo.

## 1. Validação de Variáveis de Ambiente — Impacto: Alto

- **Descrição objetiva**: Não há validação estrita das variáveis de ambiente (`DATABASE_URL`, `DIRECT_URL`) na inicialização da aplicação.
- **Causa raiz**: Uso direto de `process.env` sem um schema de validação (como `t3-env` ou `zod` no startup).
- **Consequência técnica**: A aplicação pode iniciar com configurações inválidas e falhar em tempo de execução ao tentar conectar no banco.
- **Ação de correção recomendada**: Implementar validação de variáveis de ambiente em um arquivo `src/env.mjs` ou similar.
- **Complexidade**: Baixa

## 2. Tratamento de Erros Global na API — Impacto: Médio

- **Descrição objetiva**: O tratamento de erros está duplicado em cada rota (`try/catch`).
- **Causa raiz**: Falta de um middleware ou wrapper de função para padronizar respostas de erro.
- **Consequência técnica**: Código repetitivo e risco de inconsistência nas respostas de erro (ex: alguns retornam 500 sem detalhes, outros com).
- **Ação de correção recomendada**: Criar um `apiHandler` wrapper que captura erros conhecidos (`ZodError`, `RepositoryError`) e formata a resposta automaticamente.
- **Complexidade**: Média

## 3. Testes Automatizados Inexistentes — Impacto: Alto

- **Descrição objetiva**: Não há testes unitários para os Use Cases ou testes de integração para os Repositories.
- **Causa raiz**: Projeto em fase inicial sem setup de Jest/Vitest.
- **Consequência técnica**: Regras de negócio (ex: não criar evento no passado) podem ser quebradas em refatorações futuras sem aviso.
- **Ação de correção recomendada**: Configurar Vitest e adicionar testes unitários para a camada `application` (Use Cases).
- **Complexidade**: Média

## 4. Acoplamento de Framework no Domínio — Impacto: Baixo

- **Descrição objetiva**: Algumas interfaces de domínio podem acabar dependendo de tipos do Prisma se não houver cuidado.
- **Causa raiz**: Facilidade de importar tipos gerados pelo Prisma diretamente no domínio.
- **Consequência técnica**: Dificuldade de trocar o ORM no futuro (Vendor Lock-in).
- **Ação de correção recomendada**: Manter rigorosa separação: Entidades de domínio devem ser interfaces puras em TypeScript, sem dependência de `@prisma/client`. (Já iniciado, mas requer vigilância).
- **Complexidade**: Alta (manutenção contínua)

## 5. Falta de Autenticação/Autorização nas Rotas de Escrita — Impacto: Crítico

- **Descrição objetiva**: As rotas `POST` (ex: criar evento) estão abertas publicamente.
- **Causa raiz**: Foco inicial na persistência, sem camada de Auth implementada ainda.
- **Consequência de produto**: Qualquer usuário pode criar/editar dados no banco.
- **Ação de correção recomendada**: Integrar Supabase Auth e proteger rotas de mutação (`POST`, `PUT`, `DELETE`) verificando sessão do usuário.
- **Complexidade**: Média
