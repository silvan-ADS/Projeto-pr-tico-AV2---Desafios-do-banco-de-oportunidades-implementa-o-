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
      API Python + FastAPI
             |
             v
      PostgreSQL (DDL preparado)
```

## Camadas

- **Apresentação:** componentes React em `src/App.tsx`.
- **API:** endpoints iniciais em Python + FastAPI em `backend/main.py`.
- **Estilos:** `src/App.css` e `src/index.css`, com comportamento responsivo.
- **Dados de demonstração:** estado local do React, usado para validar navegação, geração de previsão e registro de venda.
- **Persistência preparada:** tabelas, chaves estrangeiras, restrições e índices em `database/schema.sql`.
- **Documentação:** regras e relacionamentos em `docs/modelagem-logica.md`.

## Fluxos implementados nesta etapa

1. A pessoa entra pela tela de **Login** demonstrativa.
2. No **Painel**, acompanha o estado da jornada.
3. Em **Importação de dados**, carrega o histórico de vendas de exemplo em formato CSV.
4. Em **Análise dos dados**, consulta os indicadores e a leitura do histórico.
5. Em **Configuração/processamento**, inicia a geração da previsão.
6. Em **Resultado da previsão**, visualiza os 590 pedidos estimados para os próximos 7 dias.
7. Em **Apoio ao planejamento**, consulta recomendações de compras, produção, equipe e ações comerciais.
8. Em **Dados de vendas**, registra novas vendas e atualiza o histórico da sessão.

## Próxima integração

O backend inicial já expõe os endpoints do fluxo, mas ainda usa memória durante a demonstração. No Checkpoint 2, ele deverá persistir os formulários nas tabelas `vendas` e `previsoes`, consultar o PostgreSQL e substituir a estimativa demonstrativa por um modelo de previsão validado.
