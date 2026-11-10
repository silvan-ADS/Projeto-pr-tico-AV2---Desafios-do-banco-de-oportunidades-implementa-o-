-- Demanda+ - DDL inicial
-- PostgreSQL 16+

CREATE TABLE usuarios (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome            VARCHAR(120) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    criado_em       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome            VARCHAR(160) NOT NULL,
    categoria       VARCHAR(100),
    preco_unitario  NUMERIC(12, 2) NOT NULL CHECK (preco_unitario >= 0),
    ativo           BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vendas (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    produto_id      BIGINT NOT NULL REFERENCES produtos(id),
    usuario_id      BIGINT NOT NULL REFERENCES usuarios(id),
    data_venda      DATE NOT NULL,
    quantidade      INTEGER NOT NULL CHECK (quantidade > 0),
    valor_unitario  NUMERIC(12, 2) NOT NULL CHECK (valor_unitario >= 0),
    criado_em       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE previsoes (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id      BIGINT NOT NULL REFERENCES usuarios(id),
    periodo_inicio  DATE NOT NULL,
    periodo_fim     DATE NOT NULL,
    quantidade_prevista INTEGER NOT NULL CHECK (quantidade_prevista >= 0),
    quantidade_base INTEGER NOT NULL CHECK (quantidade_base >= 0),
    variacao_percentual NUMERIC(7, 2) NOT NULL,
    gerada_em       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (periodo_fim >= periodo_inicio)
);

CREATE TABLE previsao_produtos (
    previsao_id     BIGINT NOT NULL REFERENCES previsoes(id) ON DELETE CASCADE,
    produto_id      BIGINT NOT NULL REFERENCES produtos(id),
    quantidade_prevista INTEGER NOT NULL CHECK (quantidade_prevista >= 0),
    PRIMARY KEY (previsao_id, produto_id)
);

CREATE INDEX idx_vendas_data ON vendas(data_venda);
CREATE INDEX idx_vendas_produto_data ON vendas(produto_id, data_venda);
CREATE INDEX idx_previsoes_usuario_periodo ON previsoes(usuario_id, periodo_inicio, periodo_fim);

-- Dados iniciais para desenvolvimento local
INSERT INTO usuarios (nome, email) VALUES ('Maria Silva', 'maria@exemplo.com');
INSERT INTO produtos (nome, categoria, preco_unitario) VALUES
    ('Café especial 250g', 'Cafés', 30.00),
    ('Kit café da manhã', 'Kits', 60.00),
    ('Bolo de chocolate', 'Confeitaria', 30.00),
    ('Sanduíche natural', 'Lanches', 20.00);

INSERT INTO vendas (produto_id, usuario_id, data_venda, quantidade, valor_unitario)
SELECT p.id, u.id, dados.data_venda, dados.quantidade, dados.valor_unitario
FROM (VALUES
    ('Café especial 250g', '2026-11-08'::DATE, 42, 30.00::NUMERIC),
    ('Kit café da manhã', '2026-11-08'::DATE, 28, 60.00::NUMERIC),
    ('Bolo de chocolate', '2026-11-07'::DATE, 35, 30.00::NUMERIC),
    ('Sanduíche natural', '2026-11-07'::DATE, 56, 20.00::NUMERIC)
) AS dados(nome_produto, data_venda, quantidade, valor_unitario)
JOIN produtos p ON p.nome = dados.nome_produto
CROSS JOIN usuarios u;

INSERT INTO previsoes (usuario_id, periodo_inicio, periodo_fim, quantidade_prevista, quantidade_base, variacao_percentual)
SELECT id, '2026-11-09', '2026-11-15', 590, 500, 18.00
FROM usuarios
WHERE email = 'maria@exemplo.com';
