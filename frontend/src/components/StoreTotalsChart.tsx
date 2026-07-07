import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { StoreTotal } from "../types";

interface StoreTotalsChartProps { totals: StoreTotal[]; }

export function StoreTotalsChart({ totals }: StoreTotalsChartProps) {
  const sorted = [...totals].sort((a, b) => b.total_amount - a.total_amount);

  const options: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false }, background: "transparent" },
    theme: { mode: "dark" },
    colors: ["#0A84FF"],
    plotOptions: {
      bar: { horizontal: true, borderRadius: 8, borderRadiusApplication: "end" },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `$${val.toFixed(0)}`,
      style: { fontFamily: "-apple-system, sans-serif", fontSize: "12px", fontWeight: "600" },
    },
    grid: { borderColor: "rgba(255,255,255,0.06)", strokeDashArray: 4 },
    xaxis: {
      categories: sorted.map(t => t.store_name),
      labels: {
        formatter: (val: string) => `$${Number(val).toFixed(0)}`,
        style: { colors: "rgba(255,255,255,0.35)", fontFamily: "-apple-system, sans-serif" },
      },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: "rgba(255,255,255,0.6)", fontFamily: "-apple-system, sans-serif" } },
    },
    tooltip: { theme: "dark", y: { formatter: (val: number) => `$${val.toFixed(2)}` } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18, padding: "16px 8px 8px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <Chart
        options={options}
        series={[{ name: "Total amount", data: sorted.map(t => t.total_amount) }]}
        type="bar"
        height={Math.max(300, sorted.length * 36)}
      />
    </motion.div>
  );
}