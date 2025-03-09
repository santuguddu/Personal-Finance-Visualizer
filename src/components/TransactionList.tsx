import { useState } from "react";
import TransactionForm, { TransactionData } from "./TransactionForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Omit<TransactionData, "_id">) => void;
};

export default function TransactionList({
  transactions,
  onDelete,
  onUpdate,
}: TransactionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Transactions</h2>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <Card key={tx._id} className="p-6 shadow-lg border border-gray-200 bg-white rounded-2xl">
            <CardHeader className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">{tx.category}</span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingId(tx._id)}
                  className="text-blue-500 border-blue-500 hover:bg-blue-100"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(tx._id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>
                <strong className="text-gray-800">Amount:</strong> ${tx.amount.toFixed(2)}
              </p>
              <p>
                <strong className="text-gray-800">Date:</strong> {new Date(tx.date).toLocaleDateString()}
              </p>
              <p>
                <strong className="text-gray-800">Description:</strong> {tx.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {editingId && (
        <div className="mt-6 space-y-4 p-6 bg-white shadow-md rounded-xl">
          <h3 className="text-2xl font-bold text-center text-gray-800">Edit Transaction</h3>
          {transactions
            .filter((tx) => tx._id === editingId)
            .map((tx) => (
              <TransactionForm
                key={tx._id}
                initialData={tx}
                onSubmit={(data) => {
                  onUpdate(editingId, data);
                  setEditingId(null);
                }}
              />
            ))}
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => setEditingId(null)}
              className="text-gray-700 border-gray-400 hover:bg-gray-200"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
