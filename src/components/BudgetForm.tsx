// components/BudgetForm.tsx
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type BudgetData = {
  category: string;
  month: string; // Expected format: "YYYY-MM"
  amount: number | string;
  _id?: string;
};

type BudgetFormProps = {
  onSubmit: (data: BudgetData) => void;
  initialData?: BudgetData;
};

const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

export default function BudgetForm({ onSubmit, initialData = {} as BudgetData }: BudgetFormProps) {
  const [category, setCategory] = useState(initialData.category || categories[0]);
  const [month, setMonth] = useState(initialData.month || "");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!category || !month || !amount) {
      setError("⚠️ All fields are required.");
      return;
    }
    setError("");
    onSubmit({ category, month, amount, _id: initialData._id });
    
    // Clear fields if it's a new entry
    if (!initialData._id) {
      setCategory(categories[0]);
      setMonth("");
      setAmount("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl transition duration-300"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
        {initialData._id ? "Update Budget" : "Set Budget"}
      </h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm font-medium text-center bg-red-100 dark:bg-red-900 p-2 rounded-md mb-3">
          {error}
        </p>
      )}

      {/* Category Selection */}
      <div className="grid gap-2 mb-4">
        <Label htmlFor="budget-category" className="text-gray-700 dark:text-gray-300">Category</Label>
        <select
          id="budget-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Month Input */}
      <div className="grid gap-2 mb-4">
        <Label htmlFor="budget-month" className="text-gray-700 dark:text-gray-300">Month</Label>
        <Input
          id="budget-month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Amount Input */}
      <div className="grid gap-2 mb-4">
        <Label htmlFor="budget-amount" className="text-gray-700 dark:text-gray-300">Budget Amount</Label>
        <Input
          id="budget-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget amount"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg py-2 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
      >
        {initialData._id ? "Update Budget" : "Set Budget"}
      </Button>
    </form>
  );
}
