import { NextResponse } from "next/server";
import { getUserFromToken } from "../../lib/getUser";
import { connectDB } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const cartsCollectionName = process.env.CARTS_COLLECTION_NAME;

    if (!cartsCollectionName) {
      throw new Error("CARTS_COLLECTION_NAME is not defined");
    }

    const user = await getUserFromToken();
    console.log("Authenticated user:", user);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await connectDB();
    const cartsCollection = db.collection(cartsCollectionName);

    const cart = await cartsCollection.findOne({
      //UserId is stored as a string in the database, so we can query it directly without converting to ObjectId
      userId: user.userId
    });

    console.log("Fetched cart:", cart);

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