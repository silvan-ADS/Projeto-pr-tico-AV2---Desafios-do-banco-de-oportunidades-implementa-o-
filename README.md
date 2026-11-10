# Demanda+ — Previsão de demanda

Aplicação web desenvolvida em React, TypeScript e Vite para acompanhar vendas e estimar a demanda dos próximos dias.

## Funcionalidades

- Painel com os principais indicadores da operação.
- Tela de previsão de demanda para os próximos 7 dias.
- Gráfico com histórico e estimativa de vendas.
- Tela de dados de vendas.
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

> Observação: a pasta contém o código e a documentação do repositório local. A criação do repositório remoto e a inclusão dos integrantes devem ser feitas no GitHub/GitLab da equipe, pois dependem das contas e permissões do grupo.
