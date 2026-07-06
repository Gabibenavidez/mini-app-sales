from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True)
class Store:
    store_code: str
    store_name: str
    city: str


@dataclass(frozen=True)
class Sale:
    store_code: str
    route_code: str
    product_code: str
    sale_date: date
    units: int
    amount: float
