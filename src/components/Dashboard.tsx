import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Transaction } from "./TransactionList";
import { FiTrendingUp, FiPieChart, FiClock } from "react-icons/fi";

type DashboardProps = {
  transactions: Transaction[];
};

export default function Dashboard({ transactions }: DashboardProps) {
  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const categoryTotals = transactions.reduce<Record<string, number>>(
    (acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    },
    {}
  );
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-4xl font-bold text-center text-indigo-700">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-xl border border-gray-300 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl">
          <CardHeader className="flex items-center space-x-2">
            <FiTrendingUp className="text-white text-2xl" />
            <h3 className="text-xl font-semibold">Total Expenses</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-xl border border-gray-300 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl">
          <CardHeader className="flex items-center space-x-2">
            <FiPieChart className="text-white text-2xl" />
            <h3 className="text-xl font-semibold">Category Breakdown</h3>
          </CardHeader>
          <CardContent>
            {Object.keys(categoryTotals).length > 0 ? (
              <ul className="space-y-2">
                {Object.entries(categoryTotals).map(([cat, total]) => (
                  <li key={cat} className="flex justify-between">
                    <span className="font-medium">{cat}</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>

        <Card className="p-6 shadow-xl border border-gray-300 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl">
          <CardHeader className="flex items-center space-x-2">
            <FiClock className="text-white text-2xl" />
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <ul className="space-y-4">
                {recentTransactions.map((tx) => (
                  <li key={tx._id} className="p-3 bg-white bg-opacity-20 rounded-lg">
                    <p className="font-semibold">{tx.category}</p>
                    <p className="">
                      ${tx.amount.toFixed(2)} on {new Date(tx.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">{tx.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent transactions.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}