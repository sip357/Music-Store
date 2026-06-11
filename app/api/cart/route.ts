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
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const existingCart = await Cart.findOne({
      userId: user.userId
    });

    if (existingCart) {
      return NextResponse.json(
        { message: "Cart already exists" },
        { status: 400 }
      );
    }

    const newCart = new Cart({
      userId: user.userId,
      items: []
    });

    await newCart.save();

    return NextResponse.json(
      { cartId: newCart._id },
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