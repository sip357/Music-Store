import { NextResponse } from "next/server";
import { getUserFromToken } from "../../lib/getUser";
import { connectDB } from "@/app/lib/mongodb";
import Cart from "@/app/models/Cart";

export async function GET() {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({
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

export async function POST(request: Request) {
  try {
    // Get data from request body
    const body = await request.json();

    const { items } = body;

    // Validate request
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = user.userId;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { message: "items must be an array" },
        { status: 400 }
      );
    }

    console.log("User ID:", userId);
    console.log("Cart items:", items);

    // Connect to MongoDB
    await connectDB();

    // Check if user already has a cart
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      return NextResponse.json(
        {
          message: "Cart already exists",
          cartId: existingCart._id,
        },
        { status: 409 }
      );
    }

    // Create new cart
    const newCart = new Cart({
      userId,
      items,
    });

    // Save the new cart to the database
    await newCart.save();

    return NextResponse.json(
      {
        message: "Cart created successfully",
        cartId: newCart._id,
        cart: newCart,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create cart error:", error);

    return NextResponse.json(
      {
        error: "Failed to create cart",
      },
      { status: 500 }
    );
  }
}