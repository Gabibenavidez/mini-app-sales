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
  query,
  results,
  loading,
  error,
  onQueryChange,
  onSelect,
}: StoreAutocompleteProps) {
  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        placeholder="Buscar tienda..."
        onChange={(e) => onQueryChange(e.target.value)}
      />
      {loading && <span className="hint">Buscando...</span>}
      {error && <span className="error">{error}</span>}
      {results.length > 0 && (
        <ul className="autocomplete-list">
          {results.map((store) => (
            <li key={store.store_code} onClick={() => onSelect(store)}>
              {store.store_name} — {store.city} ({store.store_code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}