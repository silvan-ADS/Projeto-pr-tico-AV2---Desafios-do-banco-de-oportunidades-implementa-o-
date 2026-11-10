# Demanda+ — Previsão de demanda

Aplicação web desenvolvida em React, TypeScript e Vite para acompanhar vendas e estimar a demanda dos próximos dias.

## Funcionalidades

- Login demonstrativo para iniciar a jornada do usuário.
- Painel com o acompanhamento das etapas do processo.
- Importação demonstrativa do histórico de vendas em formato CSV.
- Análise dos dados e indicadores do histórico.
- Configuração e processamento da previsão de demanda.
- Resultado da previsão para os próximos 7 dias.
- Apoio ao planejamento com recomendações de compras, produção e equipe.
- Tela de dados de vendas com registro de novos itens.
- Modelagem lógica e script inicial do banco de dados PostgreSQL.
- Layout responsivo para computador, tablet e celular.

## Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- PostgreSQL (DDL inicial)
- CSS

## Como executar o projeto

### Pré-requisitos

- Node.js 20.19 ou superior
- npm

### Instalação

Na pasta do projeto, execute:

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

Depois, acesse o endereço exibido pelo Vite, normalmente:

```text
http://localhost:5173
```

Para iniciar o projeto aceitando acesso pela rede local, também é possível usar:

```bash
npm start
```

### Gerar a versão de produção

```bash
npm run build
```

Após o build, para testar a versão de produção:

```bash
npm run preview
```

### Verificar o código

```bash
npm run lint
```

## Estrutura principal

```text
src/
  App.tsx       # Telas e componentes principais da aplicação
  App.css       # Estilos da interface
  index.css     # Estilos globais
  main.tsx      # Ponto de entrada do React

database/
  schema.sql    # Tabelas, relacionamentos, índices e dados iniciais

docs/
  modelagem-logica.md  # Documentação do modelo de dados
  arquitetura-solucao.md  # Arquitetura e fluxos da solução
```

## Banco de dados

O script [`database/schema.sql`](database/schema.sql) contém a estrutura inicial das tabelas:

- `usuarios`
- `produtos`
- `vendas`
- `previsoes`
- `previsao_produtos`

A documentação dos relacionamentos e das regras de negócio está em [`docs/modelagem-logica.md`](docs/modelagem-logica.md).

A arquitetura e os fluxos implementados estão em [`docs/arquitetura-solucao.md`](docs/arquitetura-solucao.md).

## Checkpoint 1

Esta entrega contempla:

- Repositório com o código-fonte da aplicação.
- Interface inicial baseada no protótipo do Figma.
- Modelagem lógica do banco de dados.
- Script DDL de criação e inserção de dados iniciais.
- Documentação técnica em português.
- Protótipo navegável com a jornada Login → Dashboard → Importação → Análise → Previsão → Resultado → Planejamento.

> O repositório remoto da entrega está em [GitHub](https://github.com/silvan-ADS/Projeto-pr-tico-AV2---Desafios-do-banco-de-oportunidades-implementa-o-). A inclusão dos demais integrantes deve ser feita pelo proprietário nas configurações de acesso da equipe.

## Limite desta entrega

O Checkpoint 1 entrega o protótipo navegável, a modelagem lógica e o DDL inicial. A aplicação usa dados demonstrativos em memória para que o fluxo possa ser apresentado sem configurar um servidor. A API, a persistência real e o cálculo automatizado da previsão ficam planejados para o Checkpoint 2.
