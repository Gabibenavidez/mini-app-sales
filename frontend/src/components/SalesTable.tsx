import { motion } from "framer-motion";
import type { Sale } from "../types";

interface SalesTableProps {
  sales: Sale[];
  onFilterStore: React.Dispatch<React.SetStateAction<string | null>>;
}

export function SalesTable({ sales, onFilterStore }: SalesTableProps) {
  const totalUnits = sales.reduce((s, r) => s + r.units, 0);
  const totalAmount = sales.reduce((s, r) => s + r.amount, 0);

  const font = "-apple-system, BlinkMacSystemFont, sans-serif";

  return (
    <div style={{
      borderRadius: 16, overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
            {["Date","Store","Route","Product","Units","Amount"].map(h => (
              <th key={h} style={{
                padding: "12px 16px", textAlign: h === "Units" || h === "Amount" ? "right" : "left",
                fontSize: 11, fontWeight: 600, letterSpacing: "0.07em",
                textTransform: "uppercase", color: "rgba(0, 0, 0, 0.4)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
              whileHover={{ background: "rgba(255,255,255,0.04)" }}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                cursor: "default",
              }}
            >
              <td style={tdStyle}>{sale.sale_date}</td>
              <td style={tdStyle}>
                <motion.span
                  tabIndex={0}
                  role="button"
                  aria-label={`Filtrar por tienda ${sale.store_code}`}
                  onClick={() => onFilterStore(sale.store_code)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onFilterStore(sale.store_code);
                    }
                  }}
                  whileFocus={{
                    scale: 1.08,
                    boxShadow: "0 0 0 2px rgba(10,132,255,0.6)",
                    background: "rgba(10,132,255,0.28)",
                  }}
                  whileHover={{ background: "rgba(10,132,255,0.22)" }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "inline-block",
                    background: "rgba(10,132,255,0.15)", color: "#0A84FF",
                    borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", outline: "none",
                  }}
                >
                  {sale.store_code}
                </motion.span>
              </td>
              <td style={tdStyle}>{sale.route_code}</td>
              <td style={tdStyle}>{sale.product_code}</td>
              <td style={{ ...tdStyle, textAlign: "right", color: "rgba(8, 8, 8, 0.6)" }}>{sale.units}</td>
              <td style={{ ...tdStyle, textAlign: "right", color: "#30D158", fontWeight: 600 }}>
                ${sale.amount.toFixed(2)}
              </td>
            </motion.tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            <td colSpan={4} style={{ ...tdStyle, color: "rgba(0, 0, 0, 0.4)", fontSize: 12 }}>
              Total · {sales.length} registros
            </td>
            <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>
              {totalUnits}
            </td>
            <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, color: "#30D158" }}>
              ${totalAmount.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const tdStyle: React.CSSProperties = {
  padding: "11px 16px", fontSize: 13, color: "rgba(0, 0, 0, 0.75)",
};