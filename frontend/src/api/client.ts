const BASE_URL = "/api";
import type { Store, StoreTotal } from "../types";

/** Single HTTP access point. Components NEVER call fetch directly:
 *  component → hook → api/client. */
export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${path}`);
  }
  return response.json() as Promise<T>;
}

export function searchStores(query: string): Promise<Store[]> {
  return apiGet<Store[]>(`/stores/search?q=${encodeURIComponent(query)}`);
}

export function getStoreTotal(storeCode: string): Promise<StoreTotal> {
  return apiGet<StoreTotal>(`/stores/${encodeURIComponent(storeCode)}/total`);
}

export function getStoreTotals(): Promise<StoreTotal[]> {
  return apiGet<StoreTotal[]>("/stores/totals");
}