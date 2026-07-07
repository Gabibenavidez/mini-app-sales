import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Store } from "../types";

interface StoreAutocompleteProps {
  query: string;
  results: Store[];
  loading: boolean;
  error: string | null;
  onQueryChange: (value: string) => void;
  onSelect: (store: Store) => void;
}

export function StoreAutocomplete({
  query, results, loading, error, onQueryChange, onSelect,
}: StoreAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showList = isOpen && results.length > 0;

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", maxWidth: 420 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 14, padding: "10px 16px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        transition: "border-color 0.2s",
      }}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.4)" strokeWidth={2}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Buscar tienda..."
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "#fff", fontSize: 15, fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.01em",
          }}
        />
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                width: 16, height: 16, borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.15)",
                borderTopColor: "#0A84FF",
                animation: "spin 0.7s linear infinite",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ color: "#FF453A", fontSize: 13, marginTop: 6, paddingLeft: 4,
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showList && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100,
              margin: 0, padding: "6px 0", listStyle: "none",
              background: "rgba(28,28,30,0.92)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14, backdropFilter: "blur(40px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
              overflow: "hidden",
            }}
          >
            {results.map((store, i) => (
              <motion.li
                key={store.store_code}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  onSelect(store);
                  setIsOpen(false);
                }}
                whileHover={{ background: "rgba(255,255,255,0.08)" }}
                style={{
                  padding: "10px 16px", cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>
                  {store.store_name}
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  {store.city} · {store.store_code}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}