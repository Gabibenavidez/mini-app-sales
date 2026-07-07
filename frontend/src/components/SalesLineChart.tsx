import { useMemo } from "react";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { Sale } from "../types";

interface SalesLineChartProps { sales: Sale[]; }

export function SalesLineChart({ sales }: SalesLineChartProps) {
  const seriesData = useMemo(() => {
    const totalsByDate = new Map<string, number>();
    for (const sale of sales) {
      const key = String(sale.sale_date);
      totalsByDate.set(key, (totalsByDate.get(key) ?? 0) + sale.amount);
    }
    return [...totalsByDate.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, amount]) => ({ x: new Date(date).getTime(), y: amount }));
  }, [sales]);

  const options: ApexOptions = {
    chart: {
      type: "line", toolbar: { show: false },
      background: "transparent", animations: { enabled: true, speed: 600 },
    },
    theme: { mode: "dark" },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: { shade: "dark", type: "vertical", opacityFrom: 0.3, opacityTo: 0 },
    },
    colors: ["#0A84FF"],
    grid: { borderColor: "rgba(255,255,255,0.06)", strokeDashArray: 4 },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "rgba(255,255,255,0.35)", fontFamily: "-apple-system, sans-serif" } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `$${val.toFixed(0)}`,
        style: { colors: "rgba(255,255,255,0.35)", fontFamily: "-apple-system, sans-serif" },
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `$${val.toFixed(2)}` },
    },
    dataLabels: { enabled: false },
    markers: { size: 4, colors: ["#0A84FF"], strokeColors: "#000", strokeWidth: 2 },
  };

  if (sales.length === 0) {
    return (
      <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "-apple-system, sans-serif",
        fontSize: 14, textAlign: "center", padding: "40px 0" }}>
        No hay ventas para mostrar.
      </p>
    );
  }

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
      <Chart options={options} series={[{ name: "Amount", data: seriesData }]} type="area" height={300} />
    </motion.div>
  );
}