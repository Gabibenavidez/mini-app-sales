import type { StoreTotal } from "../types";

interface StoreTotalCardProps {
  total: StoreTotal | null;
  loading: boolean;
  error: string | null;
}

export function StoreTotalCard({ total, loading, error }: StoreTotalCardProps) {
  if (loading) return <p className="hint">Calculando total...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!total) return null;

  return (
    <div className="store-total-card">
      <h3>{total.store_name}</h3>
      <p className="amount">${total.total_amount.toFixed(2)}</p>
    </div>
  );
}