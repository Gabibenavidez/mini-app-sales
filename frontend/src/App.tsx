import { useMemo, useState } from "react";
import { SalesTable } from "./components/SalesTable";
import { SalesLineChart } from "./components/SalesLineChart";
import { StoreAutocomplete } from "./components/StoreAutocomplete";
import { StoreTotalCard } from "./components/StoreTotalCard";
import { useSales } from "./hooks/useSales";
import { useStoreAutocomplete } from "./hooks/useStoreAutocomplete";
import { useStoreTotal } from "./hooks/useStoreTotal";
import type { Store } from "./types";

export default function App() {
  const { sales, loading, error } = useSales();
  const {
    query,
    setQuery,
    results,
    loading: searchLoading,
    error: searchError,
  } = useStoreAutocomplete();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showTable, setShowTable] = useState(false);

  const {
    total,
    loading: totalLoading,
    error: totalError,
  } = useStoreTotal(selectedStore?.store_code ?? null);

  const filteredSales = useMemo(() => {
    if (!selectedStore) return sales;
    return sales.filter((s) => s.store_code === selectedStore.store_code);
  }, [sales, selectedStore]);

  return (
    <main>
      <h1>Chifles · Week 26 Sales</h1>

      <StoreAutocomplete
        query={query}
        results={results}
        loading={searchLoading}
        error={searchError}
        onQueryChange={(value) => {
          setQuery(value);
          if (value.trim() === "") setSelectedStore(null);
        }}
        onSelect={(store) => {
          console.log("onSelect fired →", store);   // ← ¿llega el store completo?

          setSelectedStore(store);
          setQuery(store.store_name);
        }}
      />
      {selectedStore && (
        <button onClick={() => { setSelectedStore(null); setQuery(""); }}>
          Limpiar filtro
        </button>
      )}

      {selectedStore && (
        <StoreTotalCard total={total} loading={totalLoading} error={totalError} />
      )}

      {loading && <p>Loading sales…</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <>
          {selectedStore  && <SalesLineChart sales={filteredSales} />}

          <details open={showTable} onToggle={(e) => setShowTable(e.currentTarget.open)}>
            <summary>Ver tabla de detalle</summary>
            <SalesTable sales={filteredSales} />
          </details>
        </>
      )}
    </main>
  );
}