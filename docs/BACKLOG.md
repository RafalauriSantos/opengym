# Backlog — openGym

Um item por PR. Marque `[x]` quando o item estiver mergeado na `main`. Cada fase segue o
ADR-012 (escopo) e o ADR-009 (Next.js). Itens sem decisão ficam em `DECISIONS.md` > Pendente.

## Fase 0 — Base (feito)

- [x] Repositório próprio com histórico base do openGym v1.4.5 (ADR-001)
- [x] TypeScript na API com `allowJs` (ADR-003)
- [x] Camada de documentos em Postgres, com testes (ADR-004, ADR-005)
- [x] CI próprio e merge automático por squash (ADR-006, ADR-008)
- [x] Documentos do projeto (`CLAUDE.md`, `DECISIONS.md`, `docs/`)

## Fase A — Fundação (ninguém sente)

- [ ] Drizzle: `drizzle.config.ts` e a primeira migração gerada para `documents`, no lugar do DDL manual
- [ ] Banco Neon de teste e teste de integração (pulado sem a URL)
- [ ] Schema de contas e identidade: `tenants`, `users`, `passkey_credentials`, `auth_challenges`, `audit_log`, com `tenant_id` e FKs compostas (ADR-010)
- [ ] `forTenant(tenantId)` e testes de isolamento entre duas contas, mais o teste que falha se uma tabela não tiver `tenant_id`

## Fase B — Next.js no lugar do Vite (comportamento igual)

- [ ] App Next (App Router) ao lado do `frontend/`, com página de teste e `GET /api/health`
- [ ] Testes de contrato da API, derivados de `api/openapi.yaml` e de `frontend/src/lib/api*.test.js`, rodando contra o servidor atual
- [ ] Shell do `App.jsx` e rotas portados, tela por tela, em PRs pequenos (só mover, sem reescrever)
- [ ] Mesmo resultado nos testes de contrato contra o servidor novo

## Fase C — API essencial em route handlers

- [ ] Sessão, cookie assinado e CSRF em `modules/identity`
- [ ] Registro e login por passkey, com desafios no banco (expirado, reutilizado e de outra conta testados)
- [ ] Pareamento de dispositivo, com códigos no banco e uso único
- [ ] Sincronização: `GET /api/data`, `GET /api/data/rev`, `PUT /api/data` sobre `sync_documents` (ADR-011), com teste de conflito e de isolamento entre contas
- [ ] Dual-run: gravar nos dois lugares e comparar
- [ ] Importador de `db.json` e `state-*.json`, só se houver dados reais (ver ADR-012)
- [ ] Desligar `server.js` e `durable.js`

## Fase D — Treino normalizado (só com o app estável)

- [ ] Tabelas de rotinas, sessões, séries e medidas, derivadas do documento na escrita
- [ ] `deleted_at` em treinos, sessões e medidas, com teste de que nenhuma consulta esquece o filtro (ADR-013)
- [ ] Telas de progresso lendo das tabelas, com o mesmo resultado do cálculo atual

## Fase E — Arquivos e agendamento

- [ ] Fotos e vídeos de exercícios próprios no Vercel Blob, com limite testado
- [ ] Limpeza periódica por Vercel Cron (plano a decidir)

## Fase F — Deploy e endurecimento

- [ ] Projeto na Vercel ligado ao repositório, com domínio HTTPS (passkey exige)
- [ ] Guia de rollback em `docs/ROLLBACK.md`
- [ ] RLS no Postgres como reforço do isolamento (ADR-010)
- [ ] Falhas antigas das suítes resolvidas ou documentadas
- [ ] Lint configurado

## Depois, um por vez (cada um com seu ADR)

- [ ] Lembretes de push (decidir plano da Vercel ou agendador externo)
- [ ] App de celular (Capacitor), depois que o site estiver no ar
- [ ] Coach de IA
- [ ] Integrações: Strava, webhooks
- [ ] Relógios: Zepp, Garmin, Apple Watch, Wear OS
- [ ] Admin e convites
- [ ] Contas em grupo (família, academia)
