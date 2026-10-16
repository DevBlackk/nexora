# nexora-api

API do **Nexora**, um gerenciador financeiro pessoal de uso exclusivo do titular. Recebe e organiza contas, transações, compromissos, dívidas e configurações de alertas, sincroniza dados com o Meu Pluggy (Open Finance) e dispara os alertas diários por e-mail.

> **Status:** em desenvolvimento. A estrutura inicial existe (servidor Fastify, regra monetária em centavos e testes), mas ainda não foi validada com `npm test` no ambiente de desenvolvimento. Nenhuma funcionalidade de negócio foi concluída.

Documentação completa do projeto: **Nexora — Dashboard** no Notion.
Decisões e descobertas: **Registro de decisões e descobertas (até 16/10/2026)**.
Requisitos e escopo: **Requisitos e escopo**. Arquitetura e stack: **Arquitetura e infraestrutura**. Análise da integração bancária: **Análise D-01 — Estratégia de acesso aos dados bancários**.

---

## Premissas

- **Uso pessoal.** Não é SaaS, não tem multiusuário e não tem funcionalidades empresariais.
- **Custo zero.** Nenhum serviço pago entra sem aprovação explícita do titular.
- **Dinheiro em centavos inteiros.** Nunca usar ponto flutuante para valores monetários.
- **Sem operações financeiras automáticas.** Nenhuma transferência, pagamento ou renegociação é executada.
- **Dados reais fora do código.** Testes, fixtures e documentação usam apenas dados fictícios.

## Escopo do MVP

Aprovado pelo titular em 15/10/2026, com a integração Meu Pluggy incluída em 16/10/2026.

- Autenticação simples do titular, com sessão e controle de acesso nas rotas de dados.
- Cadastro de contas com saldo informado pelo titular e data do saldo.
- Importação de OFX e CSV, com registro de origem e deduplicação.
- Cadastro manual de transações, categorização manual e filtros por período, conta e categoria.
- Receitas, compromissos recorrentes e parcelas.
- Dívidas, com cálculo pelo método informado no contrato e histórico de saldo.
- Projeção diária de saldo até o fim do mês.
- Integração com o Meu Pluggy: conexão, sincronização de contas, cartões e transações, status dos itens e desconexão.
- Alertas por e-mail, enviados uma vez por dia às 12h, com no máximo 5 por dia.

### Alertas

| Evento | Condição | Padrão |
|---|---|---|
| Vencimento próximo | Conta, fatura ou parcela vence em até 3 dias | 3 dias |
| Saldo projetado abaixo do mínimo | Projeção dos próximos 7 dias fica abaixo do saldo mínimo | R$ 250, personalizável |
| Recebimento não identificado | Receita prevista não aparece até 1 dia após a data | 1 dia de tolerância |
| Dados desatualizados | Última importação ou sincronização há mais de 7 dias | 7 dias |

Pendente: confirmar se o relatório diário conta no limite de 5 alertas.

Fora do MVP: IA, comparação de estratégias de quitação (avalanche e bola de neve), simulação de amortizações extraordinárias, metas e reserva, e alertas por WhatsApp ou Telegram.

## Decisões técnicas

| ID | Tema | Situação |
|---|---|---|
| D-01 | Acesso aos dados bancários | Meu Pluggy, com OFX como contingência. Limite de 5 conexões em validação |
| D-07 | Uso de IA | Decidida: sem IA no MVP |
| D-08 | Escopo do MVP | Aprovado |
| D-09 | Regras de juros | Método do contrato, validado com caso real (pendente) |

## Stack

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Servidor | Fastify |
| Banco de dados | SQLite |
| ORM | Drizzle |
| Testes | Vitest |
| Agendamento | node-cron |
| E-mail | Nodemailer (provedor gratuito a confirmar) |

## Integração com o Meu Pluggy

- Conexões são feitas pelo conector **MeuPluggy (id 200)**, que é a rota gratuita para uso pessoal.
- Cada banco conectado cria um item separado. Conta corrente e cartão do mesmo banco ficam no mesmo item.
- O plano gratuito permite **5 conexões ativas**, aplicadas pelo Meu Pluggy na criação de novas conexões.
- Bancos atualmente conectados no ambiente de teste: PicPay, Nubank, Itaú e Mercado Pago. Banco do Brasil pendente.
- O sandbox (Pluggy Bank) é sintético, não representa bancos reais e não ocupa vaga do Meu Pluggy.
- Itens sem atualização há 30 dias no sandbox são excluídos pela Pluggy.
- A verificação do status regulatório da Pluggy no Banco Central está pendente. Esse risco foi aceito pelo titular.

## Organização do código (prevista)

- **Domínio:** regras financeiras, sem dependência de framework, banco ou serviços externos.
- **Aplicação:** casos de uso e coordenação dos fluxos.
- **Infraestrutura:** SQLite, cliente Pluggy, e-mail e agendamento, atrás de contratos internos.
- **Entrada:** rotas HTTP do Fastify.

Os diretórios serão definidos durante a implementação.

## Configuração

Copie `.env.example` para `.env` e preencha os valores. O `.env` nunca é versionado.

| Variável | Uso |
|---|---|
| `PORT` | Porta do servidor (padrão 3000) |
| `DATABASE_PATH` | Caminho do arquivo SQLite |
| `PLUGGY_CLIENT_ID` | Credencial da aplicação Pluggy |
| `PLUGGY_CLIENT_SECRET` | Segredo da aplicação Pluggy |

Nunca compartilhe `PLUGGY_CLIENT_SECRET`. Se ele vazar, regenere no painel da Pluggy.

## Como executar

```bash
npm install
npm test          # testes de dinheiro e da rota de saúde
npm run typecheck # verificação de tipos
npm run dev       # servidor em modo de desenvolvimento
```

Rota disponível: `GET /health`, que responde `{ "status": "ok" }`.

## Testes

- **Unitários:** regras de dinheiro, cálculo de saldo, projeção, vencimentos e alertas. Cada regra com casos conhecidos e entradas inválidas.
- **Integração:** persistência, migrações, importação com deduplicação e adaptador da Pluggy com respostas simuladas.
- **Ponta a ponta:** conexão dos cinco bancos reais, sincronização e alerta de teste. Pendente até o Banco do Brasil ser conectado.

## Segurança

- Segredos apenas em variáveis de ambiente.
- Logs sem valores de contas, CPF, tokens ou conteúdo de arquivos importados.
- Rotas de dados exigem sessão válida.
- Backup por cópia do arquivo SQLite, com teste de restauração.

## Contribuição

Commits pequenos e descritivos, no formato `feat:`, `fix:`, `test:`, `docs:` ou `refactor:`. Cada tarefa tem critérios de conclusão no Kanban. O README da API é atualizado ao concluir cada épico, com base no Notion.

## Licença

Ainda não definida.