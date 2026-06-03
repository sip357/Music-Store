import { NextResponse } from "next/server";
import { getUserFromToken } from "../../lib/getUser";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
  try {
    const cartsCollectionName = process.env.CARTS_COLLECTION_NAME;

    if (!cartsCollectionName) {
      throw new Error("CARTS_COLLECTION_NAME is not defined");
    }

    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await connectDB();
    // The connectDB helper already returns the database instance
    const cartsCollection = db.collection(cartsCollectionName);

    const cart = await cartsCollection.findOne({
      //UserId is stored as a string in the database, so we can query it directly without converting to ObjectId
      userId: user.userId
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { cart },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// Additional API routes for POST, PUT, DELETE can be implemented similarly, handling cart creation, updates, and deletion as needed.

export async function POST(request: Request) {
  try {
    const cartsCollectionName = process.env.CARTS_COLLECTION_NAME;

    if (!cartsCollectionName) {
      throw new Error("CARTS_COLLECTION_NAME is not defined");
    }

    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await connectDB();
    const cartsCollection = db.collection(cartsCollectionName);
    const existingCart = await cartsCollection.findOne({
      userId: user.userId
    });
    if (existingCart) {
      return NextResponse.json(
        { message: "Cart already exists" },
        { status: 400 }
      );
      // // Add item to existing cart
      // const updatedCart = await cartsCollection.findOneAndUpdate(
      //   { userId: user.userId },
      //   { $push: { items: { productId: "exampleProductId", quantity: 1 } } },
      //   { returnDocument: "after" }
      // );
      // console.log("Updated cart:", updatedCart);
      // return NextResponse.json(
      //   { cart: updatedCart.value },
      //   { status: 200 }
      // );
    }

    const newCart = {
      userId: user.userId,
      items: []
    };

    const result = await cartsCollection.insertOne(newCart);
    console.log("Created cart:", result);
    return NextResponse.json(
      { cartId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  // Implement cart update logic here (e.g., adding/removing items, updating quantities)
  return NextResponse.json(
    { message: "Cart update functionality not implemented yet" },
    { status: 501 }
  );
}

export async function DELETE() {
  // Implement cart deletion logic here
  return NextResponse.json(
    { message: "Cart deletion functionality not implemented yet" },
    { status: 501 }
  );
}