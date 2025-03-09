import { Transaction } from "./BudgetComparisonChart";
import { Budget } from "./BudgetComparisonChart";

type SpendingInsightsProps = {
  transactions: Transaction[];
  budgets: Budget[];
};

export default function SpendingInsights({
  transactions,
  budgets,
}: SpendingInsightsProps) {
  const currentMonth = new Date().toISOString().substring(0, 7);
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Other",
  ];

  const insights = categories.map((category) => {
    const actual = transactions.reduce((sum, tx) => {
      const txMonth = new Date(tx.date).toISOString().substring(0, 7);
      return tx.category === category && txMonth === currentMonth
        ? sum + tx.amount
        : sum;
    }, 0);
    const budgetObj = budgets.find(
      (b) => b.category === category && b.month === currentMonth
    );
    const budget = budgetObj ? budgetObj.amount : 0;
    const diff = budget - actual;
    return { category, actual, budget, diff };
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Spending Insights - {currentMonth}
      </h2>
      <ul className="space-y-4">
        {insights.map((insight) => (
          <li
            key={insight.category}
            className="p-4 rounded-lg border border-gray-100 bg-gray-50"
          >
            {insight.budget > 0 ? (
              insight.diff < 0 ? (
                <p className="text-red-600 font-medium">
                  You have exceeded your <span className="font-bold">{insight.category}</span> budget by $
                  {Math.abs(insight.diff).toFixed(2)}.
                </p>
              ) : (
                <p className="text-green-600 font-medium">
                  You are under budget in <span className="font-bold">{insight.category}</span> by $
                  {insight.diff.toFixed(2)}.
                </p>
              )
            ) : (
              <p className="text-gray-500">
                No budget set for <span className="font-bold">{insight.category}</span>.
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}