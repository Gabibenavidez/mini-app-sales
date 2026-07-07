import { motion, AnimatePresence } from "framer-motion";
import type { StoreTotal } from "../types";

interface StoreTotalCardProps {
  total: StoreTotal | null;
  loading: boolean;
  error: string | null;
}

export function StoreTotalCard({ total, loading, error }: StoreTotalCardProps) {
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div key="loading"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={cardStyle}
        >
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#0A84FF" }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div key="error"
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          style={{ ...cardStyle, borderColor: "rgba(255,69,58,0.3)" }}
        >
          <p style={{ color: "#FF453A", margin: 0, fontSize: 13,
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>{error}</p>
        </motion.div>
      )}

      {total && !loading && (
        <motion.div key={total.store_code}
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={cardStyle}
        >
          <div style={{
            position: "absolute", inset: 0, borderRadius: 18,
            background: "linear-gradient(135deg, rgba(10,132,255,0.08) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
          <p style={{
            margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          }}>
            Total · Semana 26
          </p>
          <p style={{
            margin: "0 0 8px", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          }}>
            {total.store_name}
          </p>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            style={{
              margin: 0, fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em",
              color: "#0A84FF", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              lineHeight: 1,
            }}
          >
            ${total.total_amount.toFixed(2)}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const cardStyle: React.CSSProperties = {
  position: "relative", overflow: "hidden",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 18, padding: "20px 24px",
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};