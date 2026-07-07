import { useEffect, useState } from "react";
import { getStoreTotals } from "../api/client";
import type { StoreTotal } from "../types";

export function useStoreTotals() {
  const [totals, setTotals] = useState<StoreTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getStoreTotals()
      .then((data) => {
        if (!cancelled) {
          setTotals(data);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { totals, loading, error };
}