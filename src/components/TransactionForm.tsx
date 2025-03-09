import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type TransactionData = {
  amount: number | string;
  date: string;
  description: string;
  category: string;
  _id?: string;
};

type TransactionFormProps = {
  onSubmit: (data: TransactionData) => void;
  initialData?: TransactionData;
};

const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

export default function TransactionForm({
  onSubmit,
  initialData = {} as TransactionData,
}: TransactionFormProps) {
  const [amount, setAmount] = useState(initialData.amount || "");
  const [date, setDate] = useState(
    initialData.date ? new Date(initialData.date).toISOString().substring(0, 10) : ""
  );
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || categories[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSubmit({ amount, date, description, category, _id: initialData._id });
    if (!initialData._id) {
      setAmount("");
      setDate("");
      setDescription("");
      setCategory(categories[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg border border-gray-200 rounded-lg space-y-6"
    >
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="grid gap-2">
        <Label htmlFor="amount" className="text-gray-700 font-medium">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border-gray-300 rounded-md"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="date" className="text-gray-700 font-medium">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border-gray-300 rounded-md"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full border-gray-300 rounded-md"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">
        {initialData._id ? "Update Transaction" : "Add Transaction"}
      </Button>
    </form>
  );
}