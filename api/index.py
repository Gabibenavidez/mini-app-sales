import sys
from pathlib import Path

# Permite importar desde backend/app
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from fastapi import FastAPI
from app.api.routes import create_router
from app.domain.services import SalesService
from app.infrastructure.repository import JsonSalesRepository

DATA_FILE = Path(__file__).parent.parent / "backend" / "data" / "data.json"

repository = JsonSalesRepository(DATA_FILE)
service = SalesService(repository)

app = FastAPI()
app.include_router(create_router(service))