import type { Sale } from "../types";

interface SalesTableProps {
  sales: Sale[];
}

export function SalesTable({ sales }: SalesTableProps) {
  const totalUnits = sales.reduce((sum, s) => sum + s.units, 0);
  const totalAmount = sales.reduce((sum, s) => sum + s.amount, 0);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Store</th>
          <th>Route</th>
          <th>Product</th>
          <th className="num">Units</th>
          <th className="num">Amount</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale, i) => (
          <tr key={i}>
            <td>{sale.sale_date}</td>
            <td>{sale.store_code}</td>
            <td>{sale.route_code}</td>
            <td>{sale.product_code}</td>
            <td className="num">{sale.units}</td>
            <td className="num">${sale.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Total ({sales.length} records)</td>
          <td className="num">{totalUnits}</td>
          <td className="num">${totalAmount.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
}
