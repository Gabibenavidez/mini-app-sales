import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { Sale } from "../types";

interface SalesLineChartProps {
  sales: Sale[];
}

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
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { type: "datetime" },          // ← sin categories
    yaxis: { labels: { formatter: (val: number) => `$${val.toFixed(0)}` } },
    tooltip: { y: { formatter: (val: number) => `$${val.toFixed(2)}` } },
    dataLabels: { enabled: false },
  };

  if (sales.length === 0) {
    return <p className="hint">No hay ventas para mostrar.</p>;
  }

  return (
    <Chart
      options={options}
      series={[{ name: "Amount", data: seriesData }]}  // ← [{x: timestamp, y: valor}]
      type="line"
      height={320}
    />
  );
}