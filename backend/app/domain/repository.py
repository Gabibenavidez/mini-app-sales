from abc import ABC, abstractmethod

from .models import Sale, Store


class SalesRepository(ABC):
    """Outbound port: the domain defines WHAT it needs, infrastructure decides HOW."""

    @abstractmethod
    def list_sales(self) -> list[Sale]: ...

    @abstractmethod
    def list_stores(self) -> list[Store]: ...

    @abstractmethod
    def search_stores(self, query: str) -> list[Store]: ...

    @abstractmethod
    def sum_amount_by_store(self, store_code: str) -> float: ...

    @abstractmethod
    def sum_amount_grouped_by_store(self) -> dict[str, float]: ...