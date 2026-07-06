export interface Store {
  store_code: string;
  store_name: string;
  city: string;
}

export interface Sale {
  store_code: string;
  route_code: string;
  product_code: string;
  sale_date: string;
  units: number;
  amount: number;
}

export interface StoreTotal {
  store_code: string;
  store_name: string;
  total_amount: number;
}