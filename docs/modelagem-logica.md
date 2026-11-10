# Modelagem lógica — Demanda+

## Objetivo

Persistir o histórico de vendas e as previsões de demanda exibidas no protótipo. A previsão é gerada para um usuário, cobre um intervalo de datas e pode detalhar a quantidade esperada por produto.

## Entidades e relacionamentos

```text
USUARIOS (1) ────────< VENDAS >──────── (1) PRODUTOS
    │                                      │
    └──────────────< PREVISOES >───────────┘
                           │
                           └────< PREVISAO_PRODUTOS >──── PRODUTOS
```

| Entidade | Responsabilidade | Relacionamentos |
| --- | --- | --- |
| `usuarios` | Identidade do responsável pela operação | possui vendas e previsões |
| `produtos` | Catálogo de itens vendidos | participa das vendas e do detalhamento da previsão |
| `vendas` | Fato de venda ocorrido, com data, quantidade e preço praticado | pertence a um usuário e a um produto |
| `previsoes` | Resultado agregado da estimativa para um período | pertence a um usuário |
| `previsao_produtos` | Distribuição da previsão agregada por produto | liga uma previsão a vários produtos |

## Regras aplicadas

- E-mail de usuário é único.
- Produto e usuário não são removidos quando há histórico; o produto pode ser desativado com `ativo`.
- Quantidade de venda e quantidade prevista não podem ser negativas.
- O preço praticado é armazenado em `vendas` para preservar o histórico, mesmo que o preço do catálogo mude.
- Uma previsão sempre possui período final igual ou posterior ao inicial.
- A tabela associativa `previsao_produtos` impede duplicidade do mesmo produto na mesma previsão.

O DDL inicial está em [`database/schema.sql`](../database/schema.sql).
