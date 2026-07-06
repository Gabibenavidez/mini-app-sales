import json
from datetime import date
from pathlib import Path

from app.domain.models import Sale, Store
from app.domain.repository import SalesRepository


class JsonSalesRepository(SalesRepository):
    """Infrastructure adapter: reads from a local JSON file (stands in for the DB)."""

    def __init__(self, data_file: Path) -> None:
        raw = json.loads(data_file.read_text(encoding="utf-8"))
        self._stores = [Store(**s) for s in raw["stores"]]
        self._sales = [
            Sale(
                store_code=s["store_code"],
                route_code=s["route_code"],
                product_code=s["product_code"],
                sale_date=date.fromisoformat(s["sale_date"]),
                units=s["units"],
                amount=s["amount"],
            )
            for s in raw["sales"]
        ]

    def list_sales(self) -> list[Sale]:
        return list(self._sales)

    def list_stores(self) -> list[Store]:
        return list(self._stores)

    def search_stores(self, query: str) -> list[Store]:
        q = query.strip().lower()
        return [
            s for s in self._stores
            if q in s.store_name.lower() or q in s.store_code.lower()
        ]

    def sum_amount_by_store(self, store_code: str) -> float:
        return sum(s.amount for s in self._sales if s.store_code == store_code)
    
    def sum_amount_grouped_by_store(self) -> dict[str, float]:
        totals: dict[str, float] = {}
        for sale in self._sales:
            totals[sale.store_code] = totals.get(sale.store_code, 0.0) + sale.amount
        return totals