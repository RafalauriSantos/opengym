# Registro de decisões de arquitetura (ADR) — openGym

Decisões técnicas e de processo. Cada ADR tem contexto, decisão e consequências. Regras de
comportamento ficam em `DECISIONS.md` (raiz). Novo ADR: próximo número, status `Proposto`
até o dono aprovar.

Formato: `ADR-NNN`. Não crie outra pasta de ADR.

---

## ADR-001: Projeto próprio a partir do openGym, histórico reiniciado

- **Data**: 2026-11-24
- **Status**: Aceito
- **Contexto**: O dono quer um projeto próprio, sem ligação com o histórico do autor original, e
  que continue sob AGPL-3.0 porque o código parte do upstream.
- **Decisão**: O repositório `RafalauriSantos/opengym` (público) começa com um commit base que é
  a cópia do upstream v1.4.5 (`e4a68a94c`), citando a origem. Não existe remote `upstream` na
  máquina do dono. `LICENSE` e `NOTICE.md` ficam no repositório.
- **Consequências**:
  - *Positivo*: histórico limpo e só com commits do dono.
  - *Negativo*: mudanças do autor não chegam sozinhas. Cada uma precisa ser trazida à mão.
  - A AGPL continua valendo para o código de origem e para as modificações distribuídas ou
    oferecidas pela rede.

## ADR-002: Alvo de hospedagem: Vercel + Neon Postgres

- **Data**: 2026-11-24
- **Status**: Aceito
- **Contexto**: Não há orçamento para VPS. O código atual grava JSON em disco, o que não roda na
  Vercel. O dono já usa Vercel e Neon no Meu Comércio.
- **Decisão**: Hospedar site e API na Vercel. Persistir no Neon Postgres, provisionado pelo
  Marketplace da Vercel.
- **Consequências**:
  - Exige reescrever a camada de dados (ver ADR-004) e o modo de execução do servidor.
  - O Dockerfile e o `docker-compose.yml` do upstream deixam de ser o caminho de produção.
  - Não há disco persistente. Uploads (fotos, vídeos) vão para o Vercel Blob.

## ADR-003: TypeScript com migração incremental

- **Data**: 2026-11-24
- **Status**: Aceito
- **Contexto**: O código da API é JavaScript (cerca de 44 mil linhas). Converter tudo de uma vez
  atrasa a entrega. O Meu Comércio já usa TypeScript.
- **Decisão**: TypeScript na API com `allowJs: true`. Código novo nasce em `api/src/*.ts`. O código
  antigo migra por módulo. `checkJs` fica desligado enquanto houver JavaScript.
- **Consequências**: Dois tipos de arquivo convivem por um tempo. A migração de cada módulo tem
  que ter testes antes.

## ADR-004: Persistência inicial como documentos JSONB, normalizar depois

- **Data**: 2026-11-24
- **Status**: Aceito (implementado em `api/src/db/`)
- **Contexto**: Os arquivos JSON (`db.json`, `state-<usuário>.json`) são reescritos inteiros. Trocar
  tudo por tabelas normalizadas de uma vez é um risco grande.
- **Decisão**: Primeiro uma tabela `documents(key, value jsonb, updated_at)` com a forma dos arquivos
  atuais. Depois, entidade por entidade, para tabelas próprias. Acesso via Drizzle, em
  `api/src/db/docstore.ts`.
- **Consequências**:
  - Migração rápida, com o mesmo formato de dado.
  - Consultas dentro do JSON ficam lentas e difíceis. Isso deve ser resolvido ao normalizar.
  - Cada registro é uma linha. Duas escritas simultâneas no mesmo registro não são protegidas
    ainda. Trate isso antes de ter mais de um dispositivo escrevendo ao mesmo tempo.

## ADR-005: Testes com Vitest e PGlite

- **Data**: 2026-11-24
- **Status**: Aceito
- **Contexto**: Os testes de banco não devem depender de um servidor externo nem de Docker.
- **Decisão**: Vitest para o código TypeScript. PGlite (Postgres em WebAssembly) para o banco nos
  testes. A suíte JavaScript antiga continua com `node --test`.
- **Consequências**: O comportamento do PGlite e do Neon pode diferir em detalhes. Testes de
  integração com Neon virão quando o banco existir.

## ADR-006: CI próprio, sem workflows do upstream

- **Data**: 2026-11-24
- **Status**: Aceito
- **Contexto**: Os workflows do upstream publicam imagens, espelham para o GitLab do autor e abrem
  PRs de dependências. Nada disso serve ao projeto pessoal.
- **Decisão**: Um único workflow, `.github/workflows/ci.yml`, com os jobs `api` (typecheck, testes
  TypeScript, suíte JavaScript) e `web` (build e testes do front). Dependabot e Renovate
  desligados. Os workflows do upstream foram removidos.
- **Consequências**: Não há publicação automática. Deploy na Vercel fica para depois, ao criar
  o projeto lá.

## ADR-007: Repositório público

- **Data**: 2026-11-24
- **Status**: Aceito
- **Contexto**: O dono aceitou que o repositório fique público.
- **Decisão**: `RafalauriSantos/opengym` é público. Segredos ficam fora do Git (`.env`, `data/`).
- **Consequências**: Qualquer commit vira público. Nenhum segredo, dado pessoal ou arquivo local
  entra no histórico. `AUDITORIA.md` fica só na máquina.

## ADR-008: Merge automático por squash quando o CI estiver verde

- **Data**: 2026-11-24
- **Status**: Aceito
- **Contexto**: O dono quer que cada PR passe pelo CI e entre na `main` sem clique manual. Hoje não
  há deploy automático, então o risco do merge é baixo. Isso muda quando houver deploy.
- **Decisão**: Na `main` vale uma regra (ruleset `main protection`) que exige: PR para entrar,
  só squash, os checks `api` e `web` verdes e a branch atualizada. Auto-merge está ligado no
  repositório, e o PR é marcado com `gh pr merge --auto --squash`. Branches são apagadas depois do
  merge. Sem aprovação de review, porque o projeto tem um dono só.
- **Consequências**:
  - *Positivo*: o caminho é um PR e um CI verde, sem passo manual.
  - *Negativo*: qualquer código que passe nos checks entra na `main`. Quando houver deploy
    automático, esta decisão deve ser revista.
  - Os checks `api` e `web` precisam rodar em todo PR. Se um job for removido ou renomeado, a
    regra precisa ser atualizada junto.
