# Nexora

> **Inteligência para sua vida financeira.**

O Nexora é um gerenciador financeiro pessoal, desenvolvido inicialmente para uso próprio, que busca centralizar informações financeiras, apoiar decisões baseadas em dados e ajudar a construir um plano sustentável para quitar dívidas, organizar o orçamento e alcançar metas financeiras.

O projeto combina regras de negócio determinísticas, automação e inteligência artificial explicável. A IA pode ajudar a interpretar cenários e apresentar recomendações, mas cálculos financeiros críticos devem ser realizados por código testável e verificável.

> **Status:** em planejamento e estruturação.  
> **Escopo:** aplicação de uso pessoal; não é, neste momento, um produto SaaS ou serviço financeiro oferecido a terceiros.

---

## Sumário

- [Visão geral](#visão-geral)
- [Objetivos](#objetivos)
- [Princípios do projeto](#princípios-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Requisitos funcionais](#requisitos-funcionais)
- [Requisitos não funcionais](#requisitos-não-funcionais)
- [Fluxos principais](#fluxos-principais)
- [Arquitetura proposta](#arquitetura-proposta)
- [Modelo de domínio inicial](#modelo-de-domínio-inicial)
- [Inteligência artificial](#inteligência-artificial)
- [Open Finance e integração bancária](#open-finance-e-integração-bancária)
- [Alertas e automações](#alertas-e-automações)
- [Segurança e privacidade](#segurança-e-privacidade)
- [Tecnologias consideradas](#tecnologias-consideradas)
- [Estrutura de diretórios sugerida](#estrutura-de-diretórios-sugerida)
- [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)
- [Estratégia de testes](#estratégia-de-testes)
- [Roadmap](#roadmap)
- [Critérios de aceite do MVP](#critérios-de-aceite-do-mvp)
- [Decisões técnicas pendentes](#decisões-técnicas-pendentes)
- [Documentação e gestão do projeto](#documentação-e-gestão-do-projeto)
- [Contribuição e fluxo de trabalho](#contribuição-e-fluxo-de-trabalho)
- [Licença](#licença)

---

## Visão geral

O Nexora pretende funcionar como um centro de comando financeiro pessoal. A aplicação deverá reunir receitas, despesas, contas, cartões, dívidas, vencimentos e objetivos em uma visão única e compreensível.

A partir dessas informações, o sistema deverá ajudar a responder perguntas práticas:

- Quanto dinheiro tenho disponível neste momento?
- Quanto do saldo atual já está comprometido?
- Quais contas vencem em breve?
- Quanto posso gastar até o próximo recebimento?
- Quais dívidas estão custando mais em juros?
- Qual estratégia de quitação faz mais sentido para minha situação?
- Quando uma dívida poderá ser quitada se eu mantiver determinado pagamento?
- Estou avançando ou me afastando das minhas metas?
- Existe risco de faltar dinheiro antes do próximo salário?
- Que ação concreta posso tomar agora para melhorar minha situação financeira?

A visão de longo prazo é ter um sistema proativo: além de mostrar dados, o Nexora deverá detectar eventos relevantes, estimar riscos e comunicar recomendações oportunas.

## Objetivos

1. **Centralizar informações financeiras:** consolidar contas, saldos e transações de fontes compatíveis.
2. **Aumentar a clareza financeira:** distinguir saldo total, saldo disponível, valores comprometidos e dinheiro livre.
3. **Organizar dívidas:** acompanhar saldo devedor, taxas, parcelas, vencimentos e progresso de quitação.
4. **Planejar o uso do salário:** distribuir o dinheiro recebido entre compromissos, despesas essenciais, dívidas, reserva e metas.
5. **Comparar estratégias:** avaliar métodos de quitação e cenários alternativos com premissas explícitas.
6. **Acompanhar metas:** permitir a criação e o monitoramento de objetivos financeiros.
7. **Agir proativamente:** detectar vencimentos, desvios de orçamento, riscos de caixa e oportunidades de ajuste.
8. **Preservar autonomia:** oferecer explicações e recomendações sem executar movimentações financeiras automaticamente.
9. **Servir como projeto de aprendizado:** aplicar boas práticas de engenharia de software, arquitetura, testes, segurança, documentação e evolução incremental.

## Princípios do projeto

- **Precisão antes de aparência:** cálculos financeiros devem ser reproduzíveis e cobertos por testes.
- **IA como apoio, não como fonte da verdade:** o modelo não deve inventar saldos, taxas, datas ou projeções.
- **Transparência:** recomendações devem apresentar dados utilizados, premissas, limitações e justificativas.
- **Menor privilégio:** cada componente deve ter acesso apenas aos dados e permissões necessários.
- **Privacidade por padrão:** coletar, armazenar e compartilhar apenas o mínimo necessário.
- **Automação segura:** nenhuma transferência, pagamento ou renegociação automática no escopo inicial.
- **Evolução incremental:** entregar módulos pequenos e verificáveis em vez de gerar o sistema inteiro de uma vez.
- **Independência de fornecedor:** manter integrações externas atrás de interfaces sempre que fizer sentido.
- **Rastreabilidade:** registrar decisões técnicas, alterações relevantes e resultados de testes sem expor segredos.
- **Custo sustentável:** priorizar uma infraestrutura simples e de baixo custo para uso pessoal.

---

## Funcionalidades

### 1. Visão geral financeira

Um painel consolidado deverá apresentar, conforme a disponibilidade e atualização dos dados:

- saldos por conta e instituição;
- receitas e despesas do período;
- valores já comprometidos;
- contas e parcelas próximas do vencimento;
- visão de fluxo de caixa até o próximo recebimento;
- dívidas em aberto e evolução da quitação;
- metas financeiras e progresso;
- alertas e recomendações prioritários;
- data e estado da última sincronização de cada fonte.

O sistema deverá diferenciar dados sincronizados, dados informados manualmente e dados desatualizados.

### 2. Contas, cartões e transações

- Registrar contas e instituições financeiras.
- Importar dados por integração compatível, quando viável, ou por importação manual de arquivos.
- Consultar transações e identificar receitas, despesas, transferências e estornos.
- Categorizar transações manualmente e, futuramente, sugerir categorias automaticamente.
- Filtrar transações por período, conta, categoria e tipo.
- Evitar duplicidades durante importações e sincronizações.
- Permitir corrigir classificações sem alterar indevidamente o registro original da fonte.
- Informar a origem e a data de atualização dos dados.

A disponibilidade de saldos, cartões, faturas e transações dependerá da cobertura da instituição e do provedor escolhido.

### 3. Orçamento e fluxo de caixa

- Definir limites de gastos por categoria e período.
- Registrar despesas fixas e variáveis.
- Identificar compromissos recorrentes.
- Estimar entradas e saídas futuras com base em dados conhecidos.
- Calcular o saldo projetado ao longo do período.
- Alertar sobre gastos acima do orçamento.
- Sinalizar risco de saldo insuficiente antes do próximo recebimento.
- Mostrar a diferença entre saldo bancário, compromissos previstos e valor potencialmente livre.

Projeções devem ser apresentadas como estimativas, com premissas visíveis, e não como garantias.

### 4. Planejamento do salário

Quando uma receita salarial for identificada ou registrada, o sistema deverá ajudar a organizar o valor recebido considerando:

1. despesas essenciais;
2. contas e parcelas com vencimento próximo;
3. compromissos já assumidos;
4. pagamentos mínimos necessários;
5. plano de amortização de dívidas;
6. contribuição para a reserva de emergência;
7. objetivos de poupança;
8. valor restante para gastos flexíveis.

A ordem e os percentuais de distribuição devem ser configuráveis. O Nexora não deve assumir que todo o saldo bancário está disponível para uso.

### 5. Rastreador de dívidas

Cada dívida deverá permitir registrar, quando aplicável:

- credor;
- tipo de dívida;
- saldo devedor atual;
- taxa de juros e sua periodicidade;
- pagamento mínimo;
- valor e quantidade de parcelas;
- data de vencimento;
- próxima data de pagamento;
- encargos e tarifas conhecidos;
- pagamentos realizados;
- pagamentos extraordinários e amortizações;
- histórico de evolução;
- origem e data da última atualização das informações.

O sistema deverá apresentar o total de dívidas, a evolução dos saldos e estimativas de prazo e custo de quitação. Quando faltarem informações — por exemplo, taxa efetiva ou regras de amortização — a limitação deverá ser informada.

### 6. Estratégias de quitação

O Nexora deverá comparar, no mínimo, as seguintes abordagens:

- **Avalanche:** priorizar dívidas com maior taxa de juros, respeitando os pagamentos mínimos das demais.
- **Bola de neve:** priorizar dívidas com menor saldo, respeitando os pagamentos mínimos das demais.
- **Plano personalizado:** priorizar objetivos e restrições definidos pelo usuário, como vencimentos, fluxo de caixa e preferência por liquidez.

As comparações deverão considerar as informações disponíveis e explicitar as premissas. Quando os contratos tiverem juros variáveis, encargos, multas ou regras de amortização desconhecidas, os resultados deverão ser tratados como estimativas.

### 7. Metas e reserva de emergência

- Criar metas com valor-alvo e prazo desejado.
- Definir contribuições recorrentes ou pontuais.
- Acompanhar valor acumulado e percentual concluído.
- Estimar o ritmo necessário para alcançar cada meta.
- Simular cenários com contribuições diferentes.
- Monitorar a reserva de emergência em relação a uma meta definida pelo usuário.
- Alertar quando uma meta estiver em risco.

### 8. Inteligência e recomendações

A camada de IA poderá resumir a situação financeira, explicar cenários, apontar padrões e transformar resultados calculados em recomendações compreensíveis.

Exemplos:

- explicar por que determinada dívida foi priorizada;
- comparar o impacto estimado de diferentes valores de amortização;
- destacar despesas atípicas ou categorias com aumento de gastos;
- resumir os compromissos até o próximo salário;
- explicar o impacto de uma compra planejada no fluxo de caixa;
- sugerir perguntas que o usuário deveria investigar antes de tomar uma decisão.

A IA não deverá substituir o motor de cálculo financeiro nem afirmar que uma ação é adequada sem considerar as limitações dos dados disponíveis.

### 9. Alertas e notificações

O sistema deverá monitorar eventos relevantes e, conforme os canais escolhidos, enviar notificações externas ao navegador ou à aplicação.

Eventos candidatos:

- conta próxima do vencimento;
- saldo projetado insuficiente;
- despesa acima do orçamento;
- recebimento de salário identificado;
- sincronização bancária com falha ou dados desatualizados;
- meta financeira em risco;
- dívida próxima de ser quitada;
- oportunidade estimada de amortização;
- mudança relevante no fluxo de caixa.

As notificações devem ser configuráveis, evitar duplicidades e oferecer contexto suficiente para que o usuário entenda o motivo do alerta. Telegram é um candidato inicial; a escolha final do canal ainda deve ser registrada como decisão técnica.

---

## Requisitos funcionais

| ID | Requisito | Prioridade inicial |
|---|---|---|
| RF-01 | Cadastrar e consultar contas financeiras | Alta |
| RF-02 | Registrar receitas, despesas e transações manualmente | Alta |
| RF-03 | Importar transações por arquivo, com validação e prevenção de duplicidades | Alta |
| RF-04 | Categorizar e filtrar transações | Alta |
| RF-05 | Exibir visão consolidada de saldos, receitas e despesas | Alta |
| RF-06 | Cadastrar dívidas, taxas, parcelas e vencimentos | Alta |
| RF-07 | Calcular projeções de quitação com premissas explícitas | Alta |
| RF-08 | Comparar avalanche, bola de neve e plano personalizado | Alta |
| RF-09 | Registrar salário e compromissos financeiros | Alta |
| RF-10 | Projetar fluxo de caixa e valor livre estimado | Alta |
| RF-11 | Criar metas de poupança e reserva | Média |
| RF-12 | Configurar orçamento por categoria | Média |
| RF-13 | Gerar alertas para eventos financeiros relevantes | Média |
| RF-14 | Enviar notificações por um canal externo escolhido | Média |
| RF-15 | Integrar dados bancários por provedor compatível, após avaliação | Dependente de pesquisa |
| RF-16 | Gerar resumos e explicações com IA | Média, após motor de cálculo confiável |
| RF-17 | Exibir origem, horário de atualização e estado dos dados importados | Alta |
| RF-18 | Exportar dados e manter estratégia de backup e recuperação | Alta |

A priorização deverá ser revisada durante a definição do MVP e conforme os resultados da pesquisa de integração bancária.

## Requisitos não funcionais

- **RNF-01 — Segurança:** proteger sessões, credenciais, tokens e dados financeiros.
- **RNF-02 — Privacidade:** minimizar coleta e compartilhamento de dados.
- **RNF-03 — Integridade:** impedir duplicidades e preservar a consistência dos registros.
- **RNF-04 — Precisão:** testar cálculos financeiros com casos conhecidos e limites explícitos.
- **RNF-05 — Auditabilidade:** manter rastreabilidade de importações, cálculos relevantes e alterações críticas.
- **RNF-06 — Resiliência:** tratar indisponibilidade de provedores, falhas de rede e erros de sincronização.
- **RNF-07 — Usabilidade:** apresentar informações financeiras em linguagem clara.
- **RNF-08 — Manutenibilidade:** manter responsabilidades bem definidas e dependências controladas.
- **RNF-09 — Testabilidade:** permitir testes unitários, de integração e ponta a ponta.
- **RNF-10 — Portabilidade:** evitar dependência desnecessária de um único fornecedor.
- **RNF-11 — Observabilidade:** registrar erros e estado dos processos sem registrar dados sensíveis desnecessários.
- **RNF-12 — Recuperação:** documentar backups e testar restauração.
- **RNF-13 — Custo:** manter os custos de desenvolvimento e operação compatíveis com um projeto pessoal.
- **RNF-14 — Acessibilidade:** buscar navegação e leitura acessíveis, inclusive em diferentes tamanhos de tela.

---

## Fluxos principais

### Fluxo A — Organizar o recebimento do salário

1. O usuário registra o salário ou o sistema identifica uma entrada compatível.
2. O sistema confirma a origem, a data e o valor do recebimento.
3. O motor financeiro reúne vencimentos, despesas previstas, pagamentos mínimos e metas.
4. O sistema calcula o dinheiro comprometido e o saldo projetado.
5. São apresentados cenários de distribuição do valor disponível.
6. A IA pode explicar as diferenças entre os cenários usando os resultados calculados.
7. O usuário escolhe como pretende se organizar; o sistema não movimenta dinheiro automaticamente.

### Fluxo B — Planejar a quitação de dívidas

1. O usuário cadastra as dívidas e informa os dados disponíveis.
2. O sistema valida os valores e destaca informações ausentes.
3. O motor de cálculo gera projeções usando regras documentadas.
4. São comparadas as estratégias avalanche, bola de neve e personalizada.
5. O sistema apresenta prazo estimado, custo estimado, limitações e premissas.
6. O usuário escolhe uma estratégia e acompanha sua evolução.

### Fluxo C — Detectar risco de saldo insuficiente

1. O sistema atualiza ou recebe as informações financeiras disponíveis.
2. O motor de fluxo de caixa combina saldo conhecido, entradas previstas e saídas futuras.
3. Uma regra detecta risco de saldo insuficiente dentro de um horizonte configurado.
4. O sistema gera um evento, evitando notificações duplicadas.
5. O canal configurado envia um alerta com o motivo e as datas relevantes.
6. O usuário consulta os dados e decide o que fazer.

### Fluxo D — Sincronizar dados financeiros

1. O processo de integração solicita dados ao provedor autorizado.
2. A resposta é validada e normalizada.
3. A origem e os identificadores externos são preservados.
4. A aplicação detecta registros já importados.
5. Os dados são persistidos de forma consistente.
6. O estado da sincronização e o horário da última atualização são registrados.
7. Em caso de falha, o sistema informa o problema sem expor tokens ou informações sensíveis.

---

## Arquitetura proposta

A arquitetura deverá separar regras de negócio de detalhes de interface, banco de dados, serviços de IA, notificações e provedores bancários.

### Camadas conceituais

- **Apresentação:** interface para visualizar informações, configurar preferências e executar operações.
- **Aplicação:** casos de uso, coordenação de fluxos e aplicação de políticas.
- **Domínio:** entidades, regras financeiras, cálculos, validações e políticas independentes de infraestrutura.
- **Infraestrutura:** persistência, integração bancária, provedores de IA, tarefas agendadas e canais de notificação.

### Diretrizes

- Regras financeiras não devem depender de componentes de interface ou de um provedor de IA.
- Integrações externas devem ser encapsuladas por contratos claros.
- Operações de importação e sincronização devem ser idempotentes sempre que possível.
- Cálculos monetários devem usar uma representação decimal apropriada, evitando erros de ponto flutuante binário.
- Datas, fusos horários, períodos de juros e regras de arredondamento devem ser definidos explicitamente.
- Processos demorados, como sincronizações e verificações periódicas, devem ter estado, tratamento de falhas e política de repetição.
- A aplicação deverá distinguir dados confirmados, dados estimados e dados desatualizados.

### Arquitetura de alto nível

flowchart TD
    A[Interface Web] --> B[API / Casos de Uso]

    B --> C[Domínio Financeiro]
    B --> D[Serviços de Aplicação]

    C --> E[Persistência]

    D --> F[Agendador / Eventos]
    D --> G[Notificações]
    D --> H[Provedor de IA]
    D --> I[Adaptador Open Finance]

    I --> J[Provedor Bancário]
    G --> K[Canal de Notificação Externa]r Open Finance]
```


Este diagrama é conceitual. A divisão física entre serviços, processos e aplicações deverá ser decidida com base no escopo e no custo operacional. Para o início, uma aplicação modular única pode ser mais simples de manter do que uma arquitetura de microserviços.

---

## Modelo de domínio inicial

As entidades abaixo são candidatas iniciais e devem ser refinadas antes da implementação.

| Entidade | Responsabilidade |
|---|---|
| `Account` | Representar uma conta financeira |
| `Institution` | Identificar a instituição ou fonte de dados |
| `Transaction` | Registrar uma movimentação financeira |
| `Category` | Classificar receitas e despesas |
| `CreditCard` | Representar um cartão, quando necessário |
| `CardStatement` | Representar uma fatura e seus vencimentos |
| `Debt` | Representar uma obrigação financeira |
| `DebtPayment` | Registrar pagamentos e amortizações |
| `Income` | Registrar recebimentos, incluindo salário |
| `RecurringCommitment` | Representar compromissos recorrentes |
| `Budget` | Definir limites de gastos por período e categoria |
| `FinancialGoal` | Representar uma meta financeira |
| `CashFlowProjection` | Armazenar ou calcular projeções de fluxo de caixa |
| `NotificationRule` | Configurar critérios de alerta |
| `NotificationEvent` | Representar um evento que pode gerar notificação |
| `SyncRun` | Registrar execução e resultado de sincronização |
| `ExternalConnection` | Controlar metadados de uma integração externa, sem expor segredos |

O modelo definitivo deverá definir identificadores, relacionamentos, regras de exclusão, histórico de alterações, unicidade de registros importados e estratégia de versionamento.

---

## Inteligência artificial

A IA deverá funcionar como uma camada de interpretação e apoio à decisão, não como calculadora financeira nem como fonte primária de dados.

### Responsabilidades permitidas

- resumir informações calculadas pela aplicação;
- explicar diferenças entre cenários;
- apresentar recomendações com justificativas;
- identificar padrões que mereçam investigação;
- formular perguntas quando os dados forem insuficientes;
- ajudar o usuário a compreender trade-offs entre liquidez, juros, prazos e metas.

### Responsabilidades que exigem controles

- sugerir estratégias de pagamento;
- interpretar categorias ou descrições de transações;
- detectar possíveis anomalias;
- priorizar alertas;
- produzir previsões ou análises qualitativas.

Esses resultados deverão ser validados, apresentados como sugestões e, quando aplicável, confirmados pelo usuário.

### Limites obrigatórios

- Não inventar dados ausentes.
- Não alterar saldos ou transações diretamente com base em texto gerado.
- Não executar pagamentos, transferências ou renegociações.
- Não apresentar estimativas como garantias.
- Não enviar dados pessoais ou financeiros completos a um modelo externo sem necessidade, avaliação e controles apropriados.
- Registrar quais dados e resultados calculados sustentam uma recomendação, respeitando a minimização de dados.

Os cálculos de juros, amortização, vencimentos, orçamento e fluxo de caixa deverão permanecer em funções determinísticas, cobertas por testes.

---

## Open Finance e integração bancária

A integração bancária é uma área de pesquisa e validação, não uma dependência que deve ser presumida como já resolvida.

Antes de escolher um provedor, será necessário avaliar:

- cobertura de bancos, contas, cartões e transações;
- disponibilidade e frequência de atualização dos dados;
- processo de consentimento e revogação;
- modelo de autenticação e armazenamento de tokens;
- custos, limites, condições contratuais e suporte;
- requisitos regulatórios aplicáveis à solução;
- políticas de privacidade e tratamento de dados;
- disponibilidade de ambiente de testes e documentação;
- possibilidade de exportar ou excluir dados;
- comportamento em caso de falha, expiração de consentimento ou desconexão.

### Estratégia de implementação

1. Pesquisar opções de integração e requisitos aplicáveis no Brasil.
2. Comparar provedores e registrar a decisão com suas justificativas.
3. Criar um contrato interno independente do fornecedor.
4. Implementar inicialmente com dados fictícios e/ou importação manual de arquivos.
5. Validar normalização, deduplicação e tratamento de falhas.
6. Integrar um provedor apenas depois de avaliar viabilidade técnica, custo, segurança e condições aplicáveis.

A integração deve usar meios autorizados e documentados. Não utilizar raspagem de portais bancários nem solicitar ou armazenar senhas bancárias do usuário como atalho de integração.

O fato de a aplicação ser de uso pessoal não deve ser tratado como prova de dispensa de requisitos legais, regulatórios ou contratuais. A estratégia escolhida deverá ser validada antes de conectar contas reais.

---

## Alertas e automações

O mecanismo de alertas deverá separar três etapas:

1. **Detecção:** uma regra determinística identifica uma condição.
2. **Evento:** a aplicação registra o evento e seus metadados.
3. **Entrega:** um adaptador envia a notificação pelo canal configurado.

### Requisitos de confiabilidade

- evitar notificações duplicadas;
- permitir configurar antecedência, frequência e categorias de alerta;
- tratar falhas de entrega e tentativas posteriores;
- registrar estado de envio sem armazenar conteúdo sensível desnecessário;
- respeitar horários e preferências configuradas;
- permitir desativar um tipo de alerta;
- não depender de a interface estar aberta para executar verificações agendadas.

A infraestrutura de execução contínua e o canal de notificação ainda deverão ser definidos. Uma integração com Telegram é uma possibilidade inicial, mas não uma decisão final confirmada.

---

## Segurança e privacidade

Dados financeiros exigem controles desde o início do projeto.

### Controles mínimos

- Não armazenar senhas bancárias.
- Não versionar arquivos `.env`, tokens, chaves de API ou credenciais.
- Usar variáveis de ambiente ou um gerenciador de segredos apropriado.
- Não incluir dados financeiros reais em testes, exemplos, screenshots ou documentação.
- Utilizar dados fictícios no desenvolvimento inicial.
- Aplicar validação de entrada e autorização em operações da API.
- Proteger sessões e endpoints contra acesso não autorizado.
- Minimizar logs e remover dados sensíveis de mensagens de erro.
- Definir política de retenção, exportação e exclusão de dados.
- Planejar backups protegidos e testar sua restauração.
- Manter dependências atualizadas e avaliar vulnerabilidades.
- Proteger tokens de integrações e permitir revogação de conexões.
- Limitar os dados enviados a provedores externos de IA e notificação.

### LGPD e requisitos aplicáveis

A implementação deverá avaliar a Lei Geral de Proteção de Dados (LGPD), os contratos dos fornecedores e demais regras aplicáveis à solução. A aplicação pessoal não deve presumir automaticamente que todo requisito deixa de se aplicar; a análise depende do contexto concreto de uso e das integrações escolhidas.

Este README não constitui parecer jurídico nem certificação de conformidade.

### Política de automação financeira

No escopo inicial, o Nexora poderá consultar, calcular, planejar, recomendar e notificar. Não deverá executar transferências, pagamentos, contratação de crédito ou renegociações automaticamente.

---

## Tecnologias consideradas

A proposta inicial de stack é a seguinte. Ela deve ser registrada como decisão definitiva somente após validação no documento de decisões técnicas.

| Área | Tecnologia considerada | Motivo |
|---|---|---|
| Linguagem | TypeScript | Tipagem estática e compartilhamento de conhecimento no ecossistema JavaScript |
| Interface | React com Next.js | Construção da aplicação web |
| Backend | Node.js com NestJS | API modular e organização de casos de uso |
| Banco de dados | PostgreSQL | Persistência relacional e integridade dos dados |
| ORM | Prisma | Acesso tipado ao banco e gerenciamento de schema |
| Validação | Zod | Validação de dados de entrada e contratos |
| Testes | Vitest | Testes unitários e de integração |
| Versionamento | Git e GitHub | Histórico de código e revisão de mudanças |
| Ambiente de desenvolvimento | GitHub Codespaces | Ambiente remoto com editor, terminal e Git |
| Documentação e tarefas | Notion | Requisitos, decisões, roadmap e Kanban |

A escolha de cada ferramenta deverá considerar compatibilidade, custo, manutenção, segurança e objetivos de aprendizado. O Codespaces é um ambiente de desenvolvimento, não a hospedagem de produção da aplicação.

---

## Estrutura de diretórios sugerida

A estrutura abaixo é uma referência inicial, não um retrato de código já implementado.

```text
nexora/
├── apps/
│   ├── web/                 # Interface web
│   └── api/                 # API e casos de uso
├── packages/
│   ├── domain/              # Entidades e regras financeiras
│   ├── contracts/           # Tipos e contratos compartilhados
│   └── config/              # Configurações compartilhadas, se necessário
├── docs/
│   ├── architecture/        # Diagramas e arquitetura
│   ├── decisions/           # Registros de decisões técnicas (ADRs)
│   ├── security/            # Modelo de ameaças e práticas de segurança
│   └── open-finance/        # Pesquisa e decisões de integração
├── scripts/                 # Scripts auxiliares
├── tests/                   # Testes transversais, se aplicável
├── .env.example             # Apenas nomes e exemplos não sensíveis
├── .gitignore
├── README.md
└── package.json
```

A organização definitiva deve evitar complexidade prematura. Se um monorepo ou pacotes compartilhados não trouxerem benefício imediato, a estrutura poderá começar mais simples e evoluir conforme a necessidade.

---

## Ambiente de desenvolvimento

### Pré-requisitos

Quando a stack for confirmada, o ambiente deverá incluir versões compatíveis de:

- Git;
- Node.js;
- gerenciador de pacotes escolhido;
- PostgreSQL local ou serviço de banco de dados;
- editor de código ou ambiente remoto, como GitHub Codespaces.

### Preparação inicial

Os comandos exatos dependerão dos arquivos e scripts criados durante a inicialização. O fluxo esperado será:

1. Clonar o repositório.
2. Criar o arquivo local de variáveis de ambiente a partir do exemplo.
3. Configurar o acesso ao banco de desenvolvimento.
4. Instalar as dependências.
5. Aplicar migrações de banco de dados.
6. Executar testes.
7. Iniciar a aplicação em modo de desenvolvimento.

> **Nota:** os comandos de instalação, migração, testes e execução não são especificados aqui porque ainda dependem da configuração real do repositório. Este README não presume que o projeto já tenha código executável.

### Configuração e segredos

O `.env.example` deve conter somente nomes de variáveis e valores ilustrativos. O arquivo `.env` real deve permanecer fora do controle de versão. Nunca incluir tokens ou credenciais reais em commits, issues ou documentação.

---

## Estratégia de testes

### Testes unitários

Priorizar regras de domínio e cálculos:

- soma e consolidação de transações;
- classificação de receitas e despesas;
- cálculo de saldo comprometido;
- projeção de fluxo de caixa;
- regras de vencimento e antecedência de alertas;
- cálculo e comparação de estratégias de quitação;
- evolução de dívidas após pagamentos e amortizações;
- projeção de metas e reserva;
- arredondamento e precisão monetária;
- validação de datas, taxas e entradas inválidas.

### Testes de integração

Validar:

- persistência e leitura de entidades;
- migrações de banco de dados;
- importação e deduplicação de transações;
- contratos dos adaptadores externos;
- execução e estado de tarefas agendadas;
- geração e entrega de notificações;
- tratamento de erros e repetição segura de operações.

### Testes ponta a ponta

Validar os fluxos principais:

- registrar receitas e despesas;
- cadastrar uma dívida e comparar planos;
- registrar um salário e visualizar compromissos;
- criar uma meta financeira;
- importar um arquivo com transações;
- configurar e disparar um alerta de teste.

### Qualidade e critérios

- Todo cálculo financeiro importante deve possuir testes para casos comuns, limites e entradas inválidas.
- Os testes devem usar dados fictícios e resultados esperados conhecidos.
- Falhas de integração não devem corromper os dados nem gerar duplicidades.
- Mudanças em regras financeiras devem incluir atualização dos testes e da documentação.
- Testes não substituem revisão de segurança ou validação de premissas financeiras.

---

## Roadmap

O roadmap deverá ser acompanhado no Kanban do Notion. As fases abaixo indicam uma sequência recomendada e podem ser ajustadas conforme as decisões técnicas.

### Fase 1 — Fundação do projeto

- [ ] Confirmar nome, escopo e objetivos do MVP.
- [ ] Criar repositório privado e convenções de Git.
- [ ] Registrar decisões técnicas e arquitetura inicial.
- [ ] Definir linguagem, frameworks, banco e estrutura do projeto.
- [ ] Preparar ambiente de desenvolvimento e validações automatizadas.
- [ ] Definir estratégia de configuração e gerenciamento de segredos.

### Fase 2 — Domínio financeiro básico

- [ ] Modelar contas, transações, categorias e receitas.
- [ ] Implementar persistência e validação.
- [ ] Implementar cálculos de saldo e consolidação.
- [ ] Criar testes unitários para regras financeiras.
- [ ] Construir uma interface mínima para registrar e consultar dados fictícios.

### Fase 3 — Orçamento e fluxo de caixa

- [ ] Implementar compromissos recorrentes.
- [ ] Implementar orçamento por categoria.
- [ ] Projetar entradas e saídas futuras.
- [ ] Calcular saldo comprometido e dinheiro livre estimado.
- [ ] Testar cenários de saldo insuficiente.

### Fase 4 — Dívidas e planejamento

- [ ] Implementar cadastro e histórico de dívidas.
- [ ] Definir regras de juros, amortização e arredondamento.
- [ ] Implementar estratégia avalanche.
- [ ] Implementar estratégia bola de neve.
- [ ] Implementar comparação de cenários e plano personalizado.
- [ ] Exibir premissas, limitações e estimativas.

### Fase 5 — Metas e alertas

- [ ] Implementar metas financeiras e reserva.
- [ ] Criar motor de regras para eventos.
- [ ] Implementar tarefas agendadas com tratamento de falhas.
- [ ] Escolher e integrar o primeiro canal de notificação.
- [ ] Configurar prevenção de duplicidade e preferências de alertas.

### Fase 6 — Integração bancária

- [ ] Concluir pesquisa de Open Finance e alternativas de integração.
- [ ] Comparar cobertura, custos, requisitos e segurança dos provedores.
- [ ] Registrar a decisão de integração.
- [ ] Implementar um adaptador de teste.
- [ ] Validar importação, sincronização, expiração e revogação.
- [ ] Conectar dados reais somente após validar os requisitos e controles necessários.

### Fase 7 — IA e recomendações

- [ ] Definir casos de uso específicos para IA.
- [ ] Definir quais dados podem ser enviados ao modelo.
- [ ] Criar contratos de entrada e saída e validações.
- [ ] Implementar explicações baseadas em resultados calculados.
- [ ] Testar respostas incorretas, dados ausentes e recomendações inseguras.
- [ ] Monitorar custo, latência e utilidade das respostas.

### Fase 8 — Robustez e uso contínuo

- [ ] Revisar controles de segurança e privacidade.
- [ ] Configurar backup e testar restauração.
- [ ] Implementar monitoramento de falhas e estado das integrações.
- [ ] Revisar experiência de uso e acessibilidade.
- [ ] Documentar operação, recuperação e manutenção.
- [ ] Avaliar os resultados do MVP e priorizar melhorias.

---

## Critérios de aceite do MVP

O MVP poderá ser considerado funcional quando:

- [ ] O usuário conseguir registrar e consultar receitas, despesas e contas.
- [ ] Os cálculos de saldo forem corretos e cobertos por testes.
- [ ] O usuário conseguir cadastrar dívidas e seus parâmetros relevantes.
- [ ] O sistema conseguir comparar estratégias de quitação com premissas explícitas.
- [ ] O fluxo de caixa distinguir saldo atual, compromissos previstos e saldo projetado.
- [ ] A aplicação identificar ao menos os principais riscos de vencimento e saldo insuficiente.
- [ ] As recomendações de IA, caso incluídas no MVP, forem baseadas em dados calculados e não executarem ações financeiras.
- [ ] A importação de dados evitar duplicidades e informar erros.
- [ ] Segredos não estiverem presentes no repositório ou nos logs.
- [ ] Houver instruções reproduzíveis para configurar, executar e testar o projeto.
- [ ] O usuário conseguir exportar ou recuperar seus dados conforme a estratégia definida.

A integração bancária automática pode depender de uma fase posterior caso a pesquisa indique custos, restrições ou exigências incompatíveis com o início do projeto.

---

## Decisões técnicas pendentes

As decisões abaixo precisam ser registradas e confirmadas no espaço de documentação do projeto antes de serem tratadas como definitivas.

| Tema | Estado | Próxima ação |
|---|---|---|
| Nome Nexora | Sugestão recomendada | Confirmar nome e verificar disponibilidade de marca/domínio |
| Stack principal | Proposta inicial | Validar e registrar decisão técnica |
| Banco de dados e hospedagem | Não confirmados | Comparar custo, operação, backup e segurança |
| Provedor Open Finance | Em pesquisa | Comparar cobertura, preço, requisitos e condições |
| Importação manual | Alternativa de contingência | Escolher formatos e definir fluxo de validação |
| Canal de notificações | Telegram é candidato | Confirmar canal, custo e infraestrutura de execução |
| Provedor de IA | Não confirmado | Comparar privacidade, custo, latência e qualidade |
| Autenticação | A definir conforme arquitetura | Definir controles apropriados para aplicação pessoal |
| Infraestrutura de produção | Não confirmada | Definir disponibilidade, monitoramento e recuperação |
| Política de retenção e backup | A especificar | Definir retenção, exportação, exclusão e testes de restauração |

Uma decisão só deve ser marcada como concluída quando houver uma escolha explícita, justificativa e registro de suas consequências.

---

## Documentação e gestão do projeto

O Notion será utilizado como espaço de organização e documentação. A estrutura já planejada inclui:

- Requisitos e escopo;
- Roadmap e cronograma;
- Arquitetura e infraestrutura;
- Pesquisa e integração Open Finance;
- Segurança, privacidade e LGPD;
- Decisões técnicas;
- Documentação de implementação;
- Testes e qualidade;
- Diário de aprendizado;
- Registro das sessões;
- Kanban de tarefas.

### Práticas de documentação

- Manter o README alinhado ao estado real do código.
- Registrar decisões arquiteturais importantes, incluindo alternativas consideradas.
- Documentar regras de cálculo e exemplos reproduzíveis.
- Registrar limitações conhecidas e riscos ainda não resolvidos.
- Não armazenar dados financeiros reais, credenciais ou tokens no Notion.
- Atualizar tarefas e documentação conforme cada etapa for concluída.

## Contribuição e fluxo de trabalho

Mesmo sendo um projeto pessoal, o Nexora deverá seguir um fluxo de engenharia disciplinado:

1. Selecionar uma tarefa pequena com objetivo e critérios de aceite claros.
2. Entender o problema e definir os casos de teste antes da implementação.
3. Implementar uma solução simples, mantendo as regras de negócio isoladas.
4. Executar testes e revisar os resultados.
5. Registrar decisões e limitações relevantes.
6. Fazer commits pequenos e descritivos.
7. Atualizar o Kanban e a documentação.
8. Avançar para a próxima tarefa somente quando a atual estiver validada.

A IA poderá ser usada para explorar alternativas, revisar código e explicar conceitos. O entendimento da solução, a validação dos resultados e as decisões técnicas devem permanecer sob responsabilidade do desenvolvedor.

### Convenção sugerida para commits

Exemplos:

```text
feat: add transaction registration
feat: implement debt payoff projections
fix: prevent duplicate imported transactions
test: cover cash flow calculations
docs: document open finance alternatives
refactor: isolate financial calculation rules
```

---

## Licença

A licença ainda não foi definida. Como o Nexora é inicialmente um projeto de uso pessoal, a decisão de torná-lo público e de permitir reutilização ou distribuição do código deverá ser explícita antes de adicionar uma licença.

---

## Identidade do projeto

**Nexora**  
*Inteligência para sua vida financeira.*

O objetivo do projeto não é apenas mostrar para onde o dinheiro foi, mas ajudar a compreender a situação atual, antecipar riscos e tomar decisões melhores com base em dados confiáveis.
'''
