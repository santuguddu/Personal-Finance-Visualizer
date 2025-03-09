// components/BudgetComparisonChart.tsx
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

export type Budget = {
  _id?: string;
  category: string;
  month: string; // Format: "YYYY-MM"
  amount: number;
};

type BudgetComparisonChartProps = {
  transactions: Transaction[];
  budgets: Budget[];
};

export default function BudgetComparisonChart({ transactions, budgets }: BudgetComparisonChartProps) {
  // Get current month in "YYYY-MM" format.
  const currentMonth = new Date().toISOString().substring(0, 7);
  
  // Predefined categories (should match those used in BudgetForm)
  const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];
  
  // Calculate actual spending per category for the current month.
  const actuals = categories.reduce<Record<string, number>>((acc, category) => {
    acc[category] = transactions.reduce((sum, tx) => {
      const txMonth = new Date(tx.date).toISOString().substring(0, 7);
      if (tx.category === category && txMonth === currentMonth) {
        return sum + tx.amount;
      }
      return sum;
    }, 0);
    return acc;
  }, {});

  // Merge budgets and actuals into a data array.
  const data = categories.map((category) => {
    const budgetObj = budgets.find(b => b.category === category && b.month === currentMonth);
    return {
      category,
      actual: actuals[category],
      budget: budgetObj ? budgetObj.amount : 0,
    };
  });

  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl transition duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        Budget vs Actual - {currentMonth}
      </h2>
      
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
            <XAxis dataKey="category" tick={{ fontSize: 14, fill: "#4B5563" }} />
            <YAxis tick={{ fontSize: 14, fill: "#4B5563" }} />
            <Tooltip contentStyle={{ fontSize: '14px', backgroundColor: "#f9fafb", borderRadius: "8px" }} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar dataKey="actual" fill="#6366F1" name="Actual Spending" radius={[8, 8, 0, 0]} />
            <Bar dataKey="budget" fill="#10B981" name="Budget" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-4">
          No data available for the current month
        </p>
      )}
    </div>
  );
}
