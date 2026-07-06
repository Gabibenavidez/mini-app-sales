from .models import Sale, Store
from .repository import SalesRepository


class StoreNotFoundError(Exception):
    """Raised when a store_code doesn't exist in the domain."""

    def __init__(self, store_code: str) -> None:
        self.store_code = store_code
        super().__init__(f"Store not found: {store_code}")


class SalesService:
    """Use cases. All business logic lives here, never in the routes."""

    def __init__(self, repository: SalesRepository) -> None:
        self._repository = repository

    def list_sales(self) -> list[Sale]:
        sales = self._repository.list_sales()
        return sorted(sales, key=lambda s: (s.sale_date, s.store_code))

    def list_stores(self) -> list[Store]:
        return sorted(self._repository.list_stores(), key=lambda s: s.store_code)

    def search_stores(self, query: str) -> list[Store]:
        if not query.strip():
            return []
        return sorted(
            self._repository.search_stores(query), key=lambda s: s.store_name
        )

    def get_store_total(self, store_code: str) -> tuple[Store, float]:
        store = next(
            (s for s in self._repository.list_stores() if s.store_code == store_code),
            None,
        )
        if store is None:
            raise StoreNotFoundError(store_code)
        total = self._repository.sum_amount_by_store(store_code)
        return store, total
    
    def list_store_totals(self) -> list[tuple[Store, float]]:
        """All stores with their total amount, sorted descending. Stores with no sales show 0."""
        totals = self._repository.sum_amount_grouped_by_store()
        stores = self._repository.list_stores()
        pairs = [(store, totals.get(store.store_code, 0.0)) for store in stores]
        return sorted(pairs, key=lambda p: p[1], reverse=True)