# openGym (projeto pessoal)

## Regra principal

Toda explicação, plano de feature ou resposta deve ser o mínimo possível, direto e muito claro.
Sem introdução, sem recapitulação, sem jargão desnecessário. Se o dono pedir mais detalhe, aí sim
expanda.

Rastreador de treinos de academia. Projeto próprio, derivado do openGym v1.4.5
(`DuarteSantos8/openGym`, AGPL-3.0). A história do projeto começa nesse código base; o
histórico do upstream não está aqui de propósito.

## Fluxo
- Fonte da verdade do processo: `docs/PROJECT_WORKFLOW.md` (branches, commits, gates, merge). Leia antes de abrir branch.
- Regras de negócio: `DECISIONS.md` (raiz). Decisões técnicas (ADR): `docs/DECISIONS.md`, formato `ADR-NNN`.
- Mudou comportamento de negócio: atualize `DECISIONS.md` antes do código.
- Próximos passos: `docs/BACKLOG.md`. Um item por PR.

## Estado atual
- Alvo: Vercel (site e API) + Neon Postgres, com TypeScript e Drizzle.
- Em transição: a API ainda é JavaScript (`api/server.js`, Node puro, arquivos JSON). A camada de
  documentos em Postgres já existe (`api/src/db/`), mas ainda não está ligada ao servidor.
- `frontend/` é React 19 + Vite, e continua como está por enquanto.

## Comandos
```bash
cd api && npm ci
cd api && npm run typecheck        # tsc --noEmit
cd api && npm run test:ts          # Vitest, em src/**/*.test.ts
cd api && npm test                 # suíte JavaScript antiga (node --test)

cd frontend && npm ci
cd frontend && npm run build
cd frontend && npm test            # Vitest
```

Gate local antes de qualquer push: typecheck, `test:ts`, `npm test` da API, build e testes do
front. Mostre a saída real.

## Estrutura
- `api/src/`: código novo, em TypeScript. `api/src/db/` tem a camada de documentos.
- `api/server.js` e os módulos `.js` ao lado: código antigo, em migração.
- `frontend/`: interface. `catalogue/`: exercícios e mídia. `mcp/`: servidor MCP opcional.
- `docs/`: guias do projeto. Os guias de self-hosting do upstream ainda estão lá e valem só
  enquanto o app for auto-hospedado.

## Regras de código

Valem para todo código escrito neste projeto.

1. **Pensar antes de codar.** Declare as premissas. Se houver mais de uma interpretação, apresente as opções em vez de escolher uma em silêncio. Se algo não estiver claro, pare e pergunte.
2. **Simplicidade primeiro.** Escreva só o que foi pedido. Sem abstração para uso único, sem configuração que ninguém pediu, sem tratamento de erro para cenários impossíveis. Se der para fazer em 50 linhas, não escreva 200.
3. **Mudanças cirúrgicas.** Mexa só no que a tarefa exige. Não reformate, não "melhore" código vizinho, não apague código morto que já existia (apenas avise). Remova só o que a sua própria mudança deixou sem uso.
4. **Execução orientada a objetivo.** Antes de codar, defina como saber que deu certo. Para bug, escreva primeiro um teste que reproduz o erro. Para tarefas com vários passos, liste cada passo com a sua verificação.

## Regras para o agente
- Nunca commite `.env`, `data/`, segredos, nem `AUDITORIA.md` (fica local).
- Commit, push e PR só quando o dono pedir.
- Nunca commite direto na `main`. Uma branch por tarefa.
- Commits em inglês, Conventional Commits, sem linha de coautoria.
- Bug: escreva primeiro um teste que reproduz o erro, veja falhar, depois corrija.
- Não apague código antigo sem avisar. Migração: mude só o que a tarefa exige.
- Dados de saúde (peso, treinos, fotos) ficam só na infraestrutura escolhida (Vercel, Neon) e não vão para terceiros, nem para serviços de IA sem aprovação do dono.
- Não ative auto-merge.
