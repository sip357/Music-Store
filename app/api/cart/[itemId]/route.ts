import { NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/getUser";
import { connectDB } from "@/app/lib/mongodb";
import Cart from "@/app/models/Cart";
import { Types } from "mongoose";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ cartId: string }> }
) {
  try {
  const body = await request.json();
  const { cartId } = await params;
  const { items } = body;

  await connectDB();
  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { cartId: cartId },
    { $set: { items } },
    { new: true }
  );

  if (!updatedCart) {
    return NextResponse.json(
      { message: "Cart not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { cart: updatedCart },
    { status: 200 }
  );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
  const body = await request.json();
  const { cartId } = body;

   if (!cartId) {
    return NextResponse.json(
      { message: "cartId is required" },
      { status: 400 }
    );
  }

  await connectDB();

  const user = await getUserFromToken();  

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

  // Ensure the cart belongs to the authenticated user before deletion
  const deleteResult = await Cart.deleteOne({
    _id: new Types.ObjectId(cartId),
    userId: new Types.ObjectId(user.userId)
  });

  console.log("Delete result:", deleteResult);

  if (deleteResult.deletedCount === 0) {
    return NextResponse.json(
      { message: "Cart not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Cart deleted successfully" },
    { status: 200 }
  );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}