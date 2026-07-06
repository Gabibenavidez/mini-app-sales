import { useEffect, useState } from "react";
import { getStoreTotal } from "../api/client";
import type { StoreTotal } from "../types";

export function useStoreTotal(storeCode: string | null) {
  const [total, setTotal] = useState<StoreTotal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeCode) {
      setTotal(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    getStoreTotal(storeCode)
      .then((data) => {
        if (!cancelled) {
          setTotal(data);
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
  }, [storeCode]);

  return { total, loading, error };
}