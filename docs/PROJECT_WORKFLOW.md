# Fluxo de trabalho — openGym

Como uma mudança sai da máquina e chega à `main`. É a fonte da verdade do processo; o `CLAUDE.md`
aponta para cá.

## Branches

- Uma branch curta por tarefa, criada a partir da `main` atualizada.
- Nomes: `<tipo>/<escopo-curto>`, por exemplo `feat/api-document-store` ou `docs/project-foundation`.
- Nunca commite direto na `main`.

## Commits

- Conventional Commits em inglês: `type(scope): resumo no imperativo`, até 72 caracteres.
- Tipos: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`, `revert`.
- Sem linha de coautoria. O autor é o dono.
- Commit pequeno, uma intenção por commit.
- Commit, push e PR só quando o dono pedir.

## Gate local (antes de qualquer push)

Na pasta `api/`:
1. `npm run typecheck`
2. `npm run test:ts`
3. `npm test` (suíte JavaScript antiga)

Na pasta `frontend/`:
4. `npm run build`
5. `npm test`

Mostre a saída real. Se um passo falhar, corrija e rode o gate de novo. Não pule passo para passar.

## Gate remoto (GitHub Actions)

`.github/workflows/ci.yml` roda em todo PR e em todo push para `main`. Jobs `api` e `web`, como no
gate local. Um PR só é considerado pronto com os dois verdes.

Falhas que já existiam no upstream (17 na suíte JavaScript da API e 24 nos testes do front, no
Windows) podem continuar vermelhas. Até serem resolvidas, registre no PR quais falhas são antigas.

## Merge

- Todo merge é aprovado pelo dono. Nada entra na `main` sem pedido explícito.
- Não ative auto-merge.
- Antes do merge: gate local verde, gate remoto verde, branch atualizada com a `main`.
- Migração de banco (quando existir): PR próprio, nunca junto com outras mudanças, aprovado pelo dono.

## Deploy

Ainda não existe deploy de produção. Quando existir (projeto na Vercel), um merge na `main` só
publica depois de aprovação, e um guia de rollback é criado nesse momento.

## Migrações de banco (quando existirem)

1. PR de migração sozinho, com o SQL gerado por `drizzle-kit`, sem mudança de código.
2. Backup do Neon antes de aplicar (branch do banco no Neon).
3. Aplicação só com aprovação do dono.
4. Depois, o PR de código que usa a coluna nova.

## Versões

- Semantic Versioning, `MAJOR.MINOR.PATCH`. A versão fica em `api/package.json` e `frontend/package.json`.
- Até `1.0.0`, mudança incompatível sobe `MINOR`.
- Registro de mudanças em `CHANGELOG.md` (o do upstream ainda está lá; o novo começa em
  `## Não lançado`).

## Paradas obrigatórias

Pare e espere o dono confirmar antes de:

- Qualquer comando destrutivo: apagar repositório, apagar branch remota, `push --force`, apagar
  banco, `rm -rf`, `DROP`, `TRUNCATE`.
- Enviar código para o GitHub ou criar PR.
- Criar conta, token ou projeto em serviço externo (Vercel, Neon).
- Ambiguidade de produto ou regra de negócio: registre em `DECISIONS.md` > Pendente.

## Definição de pronto

- Teste escrito antes, visto falhando pelo motivo certo, depois passando.
- Gate local verde com a saída mostrada.
- Documentação atualizada se a regra ou a decisão mudou.
- Item marcado em `docs/BACKLOG.md`.
