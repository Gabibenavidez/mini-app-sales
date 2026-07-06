import { useEffect, useRef, useState } from "react";
import { searchStores } from "../api/client";
import type { Store } from "../types";

const DEBOUNCE_MS = 800;

export function useStoreAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length === 0) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    const currentId = ++requestId.current;

    const timer = setTimeout(() => {
      searchStores(trimmed)
        .then((data) => {
          if (requestId.current === currentId) {
            setResults(data);
            setError(null);
          }
        })
        .catch((err: Error) => {
          if (requestId.current === currentId) setError(err.message);
        })
        .finally(() => {
          if (requestId.current === currentId) setLoading(false);
        });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  return { query, setQuery, results, loading, error };
}