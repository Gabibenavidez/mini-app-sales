import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label = "Cargando…" }: LoadingSpinnerProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "12px 16px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12,
      backdropFilter: "blur(20px)",
      width: "fit-content",
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        style={{
          width: 16, height: 16, borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.15)",
          borderTopColor: "#0A84FF",
        }}
      />
      <span style={{
        fontSize: 13, color: "rgba(255,255,255,0.6)",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        {label}
      </span>
    </div>
  );
}