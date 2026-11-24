# Backlog — openGym

Um item por PR. Marque `[x]` quando o item estiver mergeado na `main`. Itens sem decisão
aparecem em `DECISIONS.md` > Pendente e não são começados antes da decisão.

## Fase 0 — Base (feito)

- [x] Repositório próprio com histórico base do openGym v1.4.5 (ADR-001)
- [x] TypeScript na API com `allowJs` (ADR-003)
- [x] Camada de documentos em Postgres, com testes (ADR-004, ADR-005)
- [x] CI próprio, `ci.yml`, e remoção dos workflows do upstream (ADR-006)
- [x] Documentos do projeto: `CLAUDE.md`, `DECISIONS.md`, `docs/DECISIONS.md`, `docs/PROJECT_WORKFLOW.md`

## Fase 1 — Persistência

- [ ] Banco Neon provisionado pelo Marketplace da Vercel, com as variáveis no `.env.local`
- [ ] Migração inicial do Drizzle: tabela `documents`
- [ ] `db.json` lido e gravado pela camada de documentos
- [ ] `state-<usuário>.json` lido e gravado pela camada de documentos
- [ ] Teste de integração contra um Neon de teste (não o de produção)

## Fase 2 — Servidor

- [ ] `server.js` exporta um handler em vez de chamar `listen()`
- [ ] Rotas de autenticação (passkey) funcionando sob o handler
- [ ] Rotas de treino funcionando sob o handler
- [ ] Remover `durable.js` e `fsync`, que só fazem sentido com disco local

## Fase 3 — Estado em memória e tarefas agendadas

- [ ] Desafios, pareamentos e códigos do relógio saem da memória e vão para o banco, com validade
- [ ] Limpeza periódica vira tarefa agendada (Vercel Cron)
- [ ] Lembretes de push viram tarefa agendada

## Fase 4 — Arquivos

- [ ] Fotos e vídeos de exercícios próprios vão para o Vercel Blob
- [ ] Limite de tamanho de upload definido e testado

## Fase 5 — Deploy

- [ ] Projeto criado na Vercel, ligado ao repositório
- [ ] `vercel.json` (ou `vercel.ts`) com as rotas da API e do site
- [ ] Domínio configurado (passkeys exigem HTTPS num domínio)
- [ ] Guia de rollback em `docs/ROLLBACK.md`

## Fase 6 — Qualidade

- [ ] Falhas antigas da suíte JavaScript da API resolvidas ou documentadas
- [ ] Falhas antigas dos testes do front resolvidas ou documentadas
- [ ] Lint configurado (hoje não há)

## Depois (sem decisão ainda)

- [ ] Coach de IA (ver `DECISIONS.md` > Pendente)
- [ ] Integrações: Strava, webhooks
- [ ] App do relógio (Zepp, Garmin, Apple Watch, Wear OS)
