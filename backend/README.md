# Backend Demanda+

API inicial em **Python + FastAPI**, conforme as tecnologias definidas no Template da AV1.

## Executar

Na raiz do projeto:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

Documentação interativa:

```text
http://localhost:8000/docs
```

## Endpoints

- `GET /api/saude`
- `GET /api/vendas`
- `POST /api/vendas`
- `POST /api/importacoes`
- `POST /api/previsoes`

Nesta etapa, os dados ficam em memória para permitir a demonstração sem configuração adicional. O PostgreSQL está definido em [`database/schema.sql`](../database/schema.sql) para a persistência da próxima integração.
