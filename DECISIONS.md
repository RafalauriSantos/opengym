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

## 3. Autenticação

- Login por passkey (WebAuthn) é o método principal, como no upstream.
- Senha é opcional. Se existir, precisa de recuperação.

## Pendente (ainda não decidido pelo dono)

- Escopo da primeira versão: só o núcleo (login, rotinas, sessões, progresso e sincronização) ou
  também o coach de IA, as integrações (Strava, webhooks) e o relógio.
- Se a interface continua em Vite ou migra para Next.js.
- Se registros de treino podem ser apagados fisicamente ou só marcados como apagados.
- Política de backup e retenção dos dados.
