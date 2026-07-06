from datetime import date

from pydantic import BaseModel


class StoreOut(BaseModel):
    store_code: str
    store_name: str
    city: str


class SaleOut(BaseModel):
    store_code: str
    route_code: str
    product_code: str
    sale_date: date
    units: int
    amount: float


class StoreTotalOut(BaseModel):
    store_code: str
    store_name: str
    total_amount: float