# Nexora

> **Inteligência para sua vida financeira.**

O Nexora é um gerenciador financeiro pessoal, desenvolvido para uso exclusivo do titular. Seu objetivo é centralizar as informações financeiras, organizar dívidas e orçamento, acompanhar metas e avisar sobre eventos relevantes, como vencimentos e risco de saldo insuficiente.

> **Status:** em planejamento. Nenhuma funcionalidade foi implementada ainda.
> **Escopo:** aplicação de uso pessoal. Não é um produto SaaS nem um serviço financeiro oferecido a terceiros.

---

## Premissas

- **Uso pessoal.** Não há multiusuário, organizações nem funcionalidades empresariais.
- **Custo zero.** Nenhum serviço pago entra no projeto sem aprovação explícita do titular.
- **Privacidade.** Dados financeiros ficam sob controle do titular. Notificações não contêm valores completos de contas ou dívidas.
- **Sem operações automáticas.** Nenhuma transferência, pagamento ou renegociação é executada sem autorização explícita.
- **Cálculo determinístico.** Juros, amortizações, projeções e alertas são calculados por código testável.

## Objetivos

1. Centralizar contas, transações e saldos em um só lugar.
2. Distinguir saldo bancário, valores comprometidos e dinheiro livre.
3. Organizar dívidas, parcelas e vencimentos.
4. Projetar o fluxo de caixa até o próximo recebimento.
5. Alertar sobre riscos com antecedência suficiente para agir.
6. Servir como projeto de aprendizado de engenharia de software.

---

## Escopo do MVP

Escopo aprovado pelo titular em 15/10/2026.

- Autenticação simples para o titular.
- Cadastro de contas e saldos informados.
- Importação de extratos em OFX e CSV, com deduplicação e registro de origem.
- Cadastro e categorização manual de transações.
- Registro de receitas, incluindo salário, e de compromissos recorrentes.
- Cadastro de dívidas, com histórico de saldo.
- Projeção diária de saldo ao longo do mês.
- Alertas por e-mail, conforme abaixo.
- Indicação da data de atualização dos dados em cada alerta e tela.

### Alertas do MVP

Envio por e-mail, **uma vez por dia, às 12h**, com no máximo **5 alertas por dia**.

| Evento | Condição |
|---|---|
| Vencimento próximo | Conta, fatura ou parcela vence em até 3 dias |
| Saldo projetado abaixo do limite | Projeção dos próximos 7 dias fica abaixo do valor mínimo (padrão R$ 250, personalizável) |
| Recebimento não identificado | Receita prevista não aparece até 1 dia após a data prevista |
| Dados desatualizados | Nenhuma importação há mais de 7 dias |

Pendente: confirmar se o relatório diário conta no limite de 5 alertas.

### Fora do MVP

- Integração bancária automática (planejada, veja Open Finance).
- Assistente de IA (decisão do titular: MVP sem IA).
- Comparação entre avalanche e bola de neve, e simulação de amortizações extraordinárias.
- Metas e reserva de emergência.
- Monitoramento de orçamento por categoria.
- Alertas por WhatsApp, Telegram ou outros canais.

---

## Dívidas

O cálculo de juros e parcelas usará o método informado em cada contrato, validado com pelo menos um caso real, sem dados de conta. A escolha entre PRICE e SAC para simulações futuras fica para depois.

Essa abordagem é a decisão **D-09**, ainda pendente de validação com um contrato real.

---

## Integração bancária (Open Finance)

**Direção decidida pelo titular:** integração automática pelo **Meu Pluggy**, a conta pessoal gratuita da Pluggy. A importação manual de OFX permanece como contingência.

Condições e pontos conhecidos:

- Cobertura confirmada, no contexto pessoal, para Itaú, Nubank, PicPay, Banco do Brasil e Mercado Pago, com contas, transações e cartões.
- Plano gratuito de uso pessoal, com até 5 conexões ativas, segundo a documentação oficial da Pluggy.
- **A verificar no início do desenvolvimento:** se cada instituição consome uma única conexão, cobrindo conta e cartão. Se o limite contar contas separadamente, o plano não comporta os cinco bancos e o modelo de conexões precisará ser revisto.
- **Risco aceito pelo titular:** a verificação do status regulatório da Pluggy junto ao Banco Central não será feita antes do desenvolvimento.

A integração será feita por meios autorizados e documentados. Não há raspagem de portais bancários nem armazenamento de senhas bancárias.

---

## Inteligência artificial

**Decisão D-07:** o MVP será desenvolvido sem IA.

Quando for adotada, a IA deverá apenas explicar resultados já calculados pelo sistema. Não calculará valores, não preencherá dados ausentes e não executará operações financeiras. A preferência é que ela rode localmente, para não enviar dados financeiros a terceiros.

---

## Stack

Stack aprovada pelo titular em 15/10/2026.

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript, no back-end e no front-end |
| Servidor | Fastify |
| Banco de dados | SQLite |
| ORM | Drizzle |
| Front-end | React com Vite |
| Testes | Vitest |
| Agendamento | node-cron |
| E-mail | Nodemailer, com provedor gratuito a confirmar |

**Pendências técnicas:** verificar se a biblioteca de leitura de OFX está mantida antes de adotá-la; confirmar o provedor gratuito de e-mail.

Valores monetários são representados em centavos inteiros, nunca em ponto flutuante.

---

## Arquitetura

Aplicação modular única (monólito modular), com fronteiras internas claras:

- **Domínio:** entidades e regras financeiras, sem dependência de framework, banco ou serviços externos.
- **Aplicação:** casos de uso e coordenação de fluxos.
- **Infraestrutura:** persistência com SQLite, adaptador do provedor bancário, envio de e-mail e agendamento.
- **Interface:** aplicação React que consome a API.

Integrações externas ficam atrás de contratos internos, para permitir trocar o provedor sem alterar o domínio.

---

## Segurança e privacidade

- Segredos, como credenciais do Meu Pluggy, ficam em variáveis de ambiente, nunca no repositório.
- O arquivo `.env` real não é versionado. O `.env.example` contém apenas nomes de variáveis.
- Nenhum dado financeiro real entra em testes, exemplos, capturas de tela ou documentação.
- Logs não registram dados sensíveis.
- Backups locais são feitos por cópia do arquivo do banco, com restauração testada.
- Política de retenção, exportação e exclusão de dados ainda será definida.
- A LGPD e os termos dos fornecedores devem ser avaliados antes de conectar contas reais. Este README não constitui parecer jurídico.

---

## Decisões técnicas

| ID | Tema | Situação |
|---|---|---|
| D-01 | Acesso aos dados bancários | Decidida: Meu Pluggy, com OFX como contingência. Dois pontos pendentes (limite de conexões e status regulatório, este último aceito como risco) |
| D-07 | Uso de IA | Decidida: sem IA no MVP |
| D-08 | Escopo do MVP | Aprovado pelo titular |
| D-09 | Regras de juros | Abordagem aprovada: método do contrato, validado com caso real |
| — | Stack | Aprovada pelo titular |

Os registros detalhados ficam na documentação de decisões do projeto (Notion).

---

## Roadmap

As etapas abaixo são uma sequência recomendada. Estimativas não foram definidas.

1. **Fundação:** repositório, convenções de Git, ambiente de desenvolvimento e configuração de segredos.
2. **Domínio financeiro básico:** contas, transações, categorias e receitas, com testes de cálculo de saldo.
3. **Orçamento e fluxo de caixa:** compromissos recorrentes, projeção diária e cenários de saldo insuficiente.
4. **Dívidas:** cadastro, histórico de saldo e cálculo pelo método do contrato.
5. **Alertas:** motor de regras, envio diário por e-mail às 12h e prevenção de duplicidades.
6. **Integração bancária:** teste de conexões com o Meu Pluggy, sincronização e tratamento de falhas.
7. **Evolução:** comparação de estratégias de quitação, metas e reserva, e avaliação de IA local.

---

## Estratégia de testes

- **Unitários:** cálculos de saldo, projeção, vencimentos, juros e arredondamento. Cada regra financeira com casos conhecidos e entradas inválidas.
- **Integração:** persistência, migrações, importação com deduplicação, adaptadores externos e envio de e-mail simulado.
- **Ponta a ponta:** registrar receitas e despesas, cadastrar uma dívida, importar um arquivo e disparar um alerta de teste.

Todos os testes usam dados fictícios.

---

## Como executar

Ainda não aplicável. Os comandos de instalação, migração, testes e execução serão documentados quando o código existir.

---

## Documentação

A documentação do projeto fica no Notion: requisitos e escopo, roadmap, arquitetura, pesquisa de Open Finance, segurança e LGPD, decisões técnicas, testes e Kanban de tarefas.

---

## Licença

Ainda não definida. A decisão de tornar o projeto público e permitir reutilização deve ser tomada explicitamente antes de adicionar uma licença.

---

**Nexora**
*Inteligência para sua vida financeira.*