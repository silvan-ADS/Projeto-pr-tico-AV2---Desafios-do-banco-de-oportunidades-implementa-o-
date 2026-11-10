# Arquitetura da solução — Demanda+

## Visão geral

A aplicação foi organizada como uma interface web de página única (SPA). Nesta primeira etapa, os dados exibidos e os novos registros ficam em memória no navegador para validar o fluxo do protótipo. O script PostgreSQL já define a estrutura para a persistência da próxima etapa.

```text
Usuário
   |
   v
Interface React + TypeScript
   |-- Painel
   |-- Previsões
   |-- Dados de vendas
   |
   `-- Formulários locais (Checkpoint 1)
           |
           v
      PostgreSQL (DDL preparado)
```

## Camadas

- **Apresentação:** componentes React em `src/App.tsx`.
- **Estilos:** `src/App.css` e `src/index.css`, com comportamento responsivo.
- **Dados de demonstração:** estado local do React, usado para validar navegação, geração de previsão e registro de venda.
- **Persistência preparada:** tabelas, chaves estrangeiras, restrições e índices em `database/schema.sql`.
- **Documentação:** regras e relacionamentos em `docs/modelagem-logica.md`.

## Fluxos implementados nesta etapa

1. A pessoa navega entre Painel, Previsões e Dados de vendas.
2. O botão **Nova previsão** ou **Planejar próximos dias** abre o formulário de previsão.
3. Ao gerar uma previsão, a aplicação confirma a ação e retorna para a tela de previsões.
4. O botão **Registrar venda** abre um formulário.
5. Ao salvar, a venda aparece no topo do histórico e uma confirmação é exibida.

## Próxima integração

No Checkpoint 2, os estados locais devem ser substituídos por chamadas a uma API. A API deverá persistir os formulários nas tabelas `vendas` e `previsoes`, consultar o histórico e alimentar o cálculo da previsão.
