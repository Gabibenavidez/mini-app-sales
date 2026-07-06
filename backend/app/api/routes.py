from dataclasses import asdict

from fastapi import APIRouter, HTTPException, Query

from app.domain.services import SalesService, StoreNotFoundError

from .schemas import SaleOut, StoreOut, StoreTotalOut


def create_router(service: SalesService) -> APIRouter:
    router = APIRouter(prefix="/api")

    @router.get("/sales", response_model=list[SaleOut])
    def get_sales() -> list[SaleOut]:
        return [SaleOut(**asdict(s)) for s in service.list_sales()]

    @router.get("/stores", response_model=list[StoreOut])
    def get_stores() -> list[StoreOut]:
        return [StoreOut(**asdict(s)) for s in service.list_stores()]

    @router.get("/stores/search", response_model=list[StoreOut])
    def search_stores(q: str = Query(default="", min_length=1)) -> list[StoreOut]:
        return [StoreOut(**asdict(s)) for s in service.search_stores(q)]
    
    @router.get("/stores/totals", response_model=list[StoreTotalOut])
    def get_store_totals() -> list[StoreTotalOut]:
        return [
            StoreTotalOut(
                store_code=store.store_code,
                store_name=store.store_name,
                total_amount=total,
            )
            for store, total in service.list_store_totals()
        ]


    @router.get("/stores/{store_code}/total", response_model=StoreTotalOut)
    def get_store_total(store_code: str) -> StoreTotalOut:
        try:
            store, total = service.get_store_total(store_code)
        except StoreNotFoundError:
            raise HTTPException(status_code=404, detail=f"Store not found: {store_code}")
        return StoreTotalOut(
            store_code=store.store_code, store_name=store.store_name, total_amount=total
        )
    

    return router