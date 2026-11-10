from __future__ import annotations

from datetime import date, timedelta
from io import StringIO
from typing import Annotated

import csv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Demanda+ API",
    description="API inicial para o fluxo de previsão de demanda do Checkpoint 1.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Venda(BaseModel):
    produto: str = Field(min_length=1)
    data: date
    quantidade: int = Field(gt=0)
    valor: float = Field(ge=0)


class PrevisaoSolicitacao(BaseModel):
    dias: int = Field(default=7, ge=1, le=90)


vendas: list[Venda] = [
    Venda(produto="Café especial 250g", data=date(2026, 11, 8), quantidade=42, valor=1260),
    Venda(produto="Kit café da manhã", data=date(2026, 11, 8), quantidade=28, valor=1680),
    Venda(produto="Bolo de chocolate", data=date(2026, 11, 7), quantidade=35, valor=1050),
    Venda(produto="Sanduíche natural", data=date(2026, 11, 7), quantidade=56, valor=1120),
]


@app.get("/api/saude")
def verificar_saude() -> dict[str, str]:
    return {"status": "ok", "servico": "Demanda+ API"}


@app.get("/api/vendas", response_model=list[Venda])
def listar_vendas() -> list[Venda]:
    return vendas


@app.post("/api/vendas", response_model=Venda, status_code=201)
def registrar_venda(venda: Venda) -> Venda:
    vendas.insert(0, venda)
    return venda


@app.post("/api/importacoes", response_model=dict[str, int])
async def importar_historico(arquivo: Annotated[UploadFile, File(...)]) -> dict[str, int]:
    if arquivo.content_type not in {"text/csv", "application/vnd.ms-excel", "text/plain"}:
        raise HTTPException(status_code=415, detail="Envie um arquivo CSV.")

    conteudo = (await arquivo.read()).decode("utf-8-sig")
    leitor = csv.DictReader(StringIO(conteudo))
    obrigatorias = {"produto", "data", "quantidade", "valor"}
    if not obrigatorias.issubset(leitor.fieldnames or set()):
        raise HTTPException(
            status_code=422,
            detail="O CSV deve conter produto, data, quantidade e valor.",
        )

    importadas: list[Venda] = []
    try:
        for linha in leitor:
            importadas.append(
                Venda(
                    produto=linha["produto"],
                    data=date.fromisoformat(linha["data"]),
                    quantidade=int(linha["quantidade"]),
                    valor=float(linha["valor"].replace(",", ".")),
                )
            )
    except (KeyError, TypeError, ValueError) as erro:
        raise HTTPException(status_code=422, detail=f"Linha inválida no CSV: {erro}") from erro

    vendas[:0] = importadas
    return {"importadas": len(importadas)}


@app.post("/api/previsoes")
def gerar_previsao(solicitacao: PrevisaoSolicitacao) -> dict[str, object]:
    total = sum(venda.quantidade for venda in vendas)
    base = max(total, 1)
    quantidade_prevista = round(base * 1.18)
    inicio = date.today()
    fim = inicio + timedelta(days=solicitacao.dias - 1)
    return {
        "periodo_inicio": inicio,
        "periodo_fim": fim,
        "quantidade_base": base,
        "quantidade_prevista": quantidade_prevista,
        "variacao_percentual": 18.0,
    }
