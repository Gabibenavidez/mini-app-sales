import { useMemo, useState } from "react";
import { SalesTable } from "./components/SalesTable";
import { SalesLineChart } from "./components/SalesLineChart";
import { StoreAutocomplete } from "./components/StoreAutocomplete";
import { StoreTotalCard } from "./components/StoreTotalCard";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useSales } from "./hooks/useSales";
import { useStoreAutocomplete } from "./hooks/useStoreAutocomplete";
import { useStoreTotal } from "./hooks/useStoreTotal";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const { sales, loading, error } = useSales();
  const {
    query,
    setQuery,
    results,
    loading: searchLoading,
    error: searchError,
  } = useStoreAutocomplete();
  const [selectedStoreCode, setSelectedStoreCode] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(true);

  const {
    total,
    loading: totalLoading,
    error: totalError,
  } = useStoreTotal(selectedStoreCode);

  const filteredSales = useMemo(() => {
    if (!selectedStoreCode) return sales;
    return sales.filter((s) => s.store_code === selectedStoreCode);
  }, [sales, selectedStoreCode]);

  return (
    <main>
      <h1 style={{
          display: "inline-flex", alignItems: "baseline", gap: 12,
          margin: "0 0 10px 0",
        }}>
      <span style={{
        fontFamily: "'Pacifico', cursive",
        fontWeight: 400,
        fontSize: 38,
        background: "linear-gradient(135deg, #E85D5D 0%, #B7282E 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        Chifles
      </span>
      <span style={{
        fontSize: 24, fontWeight: 500,
        color: "rgba(255, 255, 255, 0.76)",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        letterSpacing: "-0.01em",
      }}>
      ·    Week 26 Sales
      </span>
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "4px" }}>
        <StoreAutocomplete
          query={query}
          results={results}
          loading={searchLoading}
          error={searchError}
          onQueryChange={(value) => {
            setQuery(value);
            if (value.trim() === "") setSelectedStoreCode(null);
          }}
          onSelect={(store) => {
            setSelectedStoreCode(store.store_code);
            setQuery(store.store_name);
          }}
        />

        <AnimatePresence>
          {selectedStoreCode && (
            <motion.button
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              whileHover={{ background: "rgba(255,69,58,0.12)", borderColor: "rgba(255,69,58,0.3)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setSelectedStoreCode(null); setQuery(""); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 14px", flexShrink: 0,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                color: "rgba(255,255,255,0.7)",
                fontSize: 13, fontWeight: 500,
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.01em",
                cursor: "pointer",
                backdropFilter: "blur(20px)",
                transition: "color 0.2s",
              }}
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
              Limpiar filtro
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {selectedStoreCode && (
        <StoreTotalCard total={total} loading={totalLoading} error={totalError} />
      )}

      {loading && <LoadingSpinner label="Cargando ventas…" />}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <>
          {selectedStoreCode && <SalesLineChart sales={filteredSales} />}

          <details open={showTable} onToggle={(e) => setShowTable(e.currentTarget.open)}>
            <summary>{showTable ? "Ocultar" : "Ver"} tabla de detalle</summary>
            <SalesTable 
              sales={filteredSales} 
              onFilterStore={(code) => {
                setSelectedStoreCode(code);
                setQuery(`${code}`);
              }}
            />
          </details>
        </>
      )}
    </main>
  );
}