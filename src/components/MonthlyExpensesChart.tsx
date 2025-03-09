import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
};

type MonthlyExpensesChartProps = {
  transactions: Transaction[];
};

export default function MonthlyExpensesChart({
  transactions,
}: MonthlyExpensesChartProps) {
  // Aggregate transactions by month
  const monthlyData = transactions.reduce<Record<string, number>>((acc, tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});

  const data = Object.keys(monthlyData).map((month) => ({
    month,
    expenses: monthlyData[month],
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Monthly Expenses
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" tick={{ fontSize: 14, fill: "#555" }} />
            <YAxis tick={{ fontSize: 14, fill: "#555" }} />
            <Tooltip contentStyle={{ fontSize: "14px" }} />
            <Bar dataKey="expenses" fill="#4F46E5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 text-lg py-6">
          No transaction data available
        </p>
      )}
    </div>
  );
}
