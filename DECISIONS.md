# Regras de negócio — openGym (projeto pessoal)

Fonte oficial das regras de comportamento. Toda mudança de comportamento entra aqui antes do
código. Decisões técnicas ficam em `docs/DECISIONS.md` (ADR). Se houver conflito, esta regra vale.

Status: **rascunho inicial**. Só entram regras que o dono confirmou. O que ainda não foi decidido
fica na seção "Pendente".

---

## 1. Uso e propósito

- O app é de uso pessoal primeiro. Distribuição comercial só depois, por decisão do dono, e
  com a licença AGPL-3.0 respeitada (ver `docs/DECISIONS.md`, ADR-001).
- Um dono por conta. Não há vários comércios, equipes nem assinatura.
- Sem telemetria e sem anúncios (herdado do upstream, mantido).

## 2. Dados do treino

- Treinos, medidas e fotos pertencem ao dono da conta.
- Dados de saúde não são enviados para terceiros. Serviços de IA só recebem dados com aprovação
  explícita do dono.

- Uma pessoa por conta. Grupos (família, academia) ficam para depois.
- Registros de treino, sessões e medidas nunca são apagados fisicamente. Apagar marca `deleted_at`
  (ADR-013).

## 3. Autenticação

- Só passkey (WebAuthn) no primeiro lançamento. Senha, e-mail e login externo ficam para depois
  (ADR-012).

## 4. Escopo do primeiro lançamento

- Entra: login por passkey, perfil, rotinas, sessões, progresso e sincronização.
- Fica para depois, um de cada vez: coach de IA, integrações (Strava, webhooks), relógios, admin,
  convites, lembretes de push e app de celular.
- Backup pelo Neon, com retenção de 30 dias (ADR-012).

## Pendente

- Nada no momento. Decisões novas entram em `docs/DECISIONS.md` (ADR).
