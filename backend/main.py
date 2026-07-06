from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import create_router
from app.domain.services import SalesService
from app.infrastructure.memory_repo import JsonSalesRepository

DATA_FILE = Path(__file__).parent / "data" / "data.json"


def create_app() -> FastAPI:
    app = FastAPI(title="Chifles Mini App")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    repository = JsonSalesRepository(DATA_FILE)
    service = SalesService(repository)
    app.include_router(create_router(service))
    return app


app = create_app()
