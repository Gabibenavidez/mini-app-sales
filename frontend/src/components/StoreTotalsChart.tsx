import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { StoreTotal } from "../types";

interface StoreTotalsChartProps {
  totals: StoreTotal[];
}

export function StoreTotalsChart({ totals }: StoreTotalsChartProps) {
  const categories = totals.map((t) => t.store_name);
  const series = [
    {
      name: "Total amount",
      data: totals.map((t) => t.total_amount),
    },
  ];

  const options: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: {
      bar: { horizontal: true, borderRadius: 4 },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `$${val.toFixed(0)}`,
    },
    xaxis: {
      categories,
      labels: { formatter: (val: string) => `$${Number(val).toFixed(0)}` },
    },
    tooltip: {
      y: { formatter: (val: number) => `$${val.toFixed(2)}` },
    },
  };

  return (
    <Chart options={options} series={series} type="bar" height={Math.max(300, totals.length * 32)} />
  );
}