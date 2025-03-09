import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// PUT Method: Update a transaction
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Get `id` from params

  try {
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid transaction ID" },
        { status: 400 }
      );
    }

    // Parse the body of the request
    const body = await request.json();
    const { amount, date, description, category } = body;

    // Check for missing fields
    if (!amount || !date || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare the updated transaction data
    const updatedTransaction = {
      amount: parseFloat(amount),
      date: new Date(date),
      description,
      category,
    };

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("transactions");

    // Find and update the transaction
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedTransaction },
      { returnDocument: "after" } // Return the updated document
    );

    // Check if the transaction was updated
    if (!result || !result.value) {
      return NextResponse.json(
        { error: "Transaction not found or not updated" },
        { status: 404 }
      );
    }

    // Return the success response with the updated transaction
    return NextResponse.json({
      message: "Transaction updated",
      transaction: result.value,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE Method: Delete a transaction
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Get `id` from params

  try {
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid transaction ID" },
        { status: 400 }
      );
    }

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("transactions");

    // Delete the transaction
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Return the success response
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
