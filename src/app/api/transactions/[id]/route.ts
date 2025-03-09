import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// PUT Method to handle transaction update
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the `id` from params

  try {
    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid transaction ID" }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();
    const { amount, date, description, category } = body;

    // Check for missing required fields
    if (!amount || !date || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Prepare the updated transaction object
    const updatedTransaction = {
      amount: parseFloat(amount),
      date: new Date(date),
      description,
      category,
    };

    // Connect to the MongoDB database
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("transactions");

    // Update the transaction in the database
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedTransaction },
      { returnDocument: "after" }
    );

    // If transaction is not found
    if (!result || !result.value) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Return updated transaction
    return NextResponse.json({
      message: "Transaction updated",
      transaction: result.value,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
