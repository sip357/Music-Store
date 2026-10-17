import { NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/getUser";
import { connectDB } from "@/app/lib/mongodb";
import Cart from "@/app/models/Cart";
import { Types } from "mongoose";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;
    const body = await request.json();

    const { action, productId, deleteproductIDs, items } = body;

    console.log("PATCH request received for cart ID:", cartId);

    if (!Types.ObjectId.isValid(cartId)) {
      return NextResponse.json(
        { message: "Invalid cart ID" },
        { status: 400 }
      );
    }

    // Validate action
    if (!action) {
      return NextResponse.json(
        { message: "Action is required" },
        { status: 400 }
      );
    }

    // Validate productId for actions that require it
    if (action === "delete" && !deleteproductIDs) {
      return NextResponse.json(
        { message: "deleteproductIDs is required for delete action" },
        { status: 400 }
      );
    }

    // Validate items for actions that require it
    if (action === "update" && !items) {
      return NextResponse.json(
        { message: "items is required for update action" },
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

    // Find cart belonging to logged-in user
    const cart = await Cart.findOne({
      _id: cartId,
      userId: user.userId,
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    /*
 * DELETE ITEM
 */
    if (action === "delete") {
      // Validate that deleteproductIDs is an array
      if (!Array.isArray(deleteproductIDs)) {
        return NextResponse.json(
          {
            message: "Invalid request: deleteproductIDs must be an array.",
            received: typeof deleteproductIDs,
          },
          { status: 400 }
        );
      }

      // Check whether the array is empty
      if (deleteproductIDs.length === 0) {
        return NextResponse.json(
          {
            message: "No products specified for deletion. Provide at least one product ID.",
          },
          { status: 400 }
        );
      }

      // Validate that all IDs are non-empty strings
      if (
        deleteproductIDs.some(
          (productId: string) => typeof productId !== "string" || productId.trim() === ""
        )
      ) {
        return NextResponse.json(
          {
            message: "Invalid product IDs: all IDs must be non-empty strings.",
            received: deleteproductIDs,
          },
          { status: 400 }
        );
      }

      // Check whether the requested products exist in the cart
      const existingProductIDs = cart.items.map(
        (item: any) => item.productId.toString()
      );

      const matchingIDs = deleteproductIDs.filter(
        (id: string) => existingProductIDs.includes(id)
      );

      if (matchingIDs.length === 0) {
        return NextResponse.json(
          {
            message: "None of the specified products were found in the cart.",
            requestedProductIDs: deleteproductIDs,
            existingProductIDs,
          },
          { status: 404 }
        );
      }

      // Remove matching products
      cart.items = cart.items.filter(
        (item: any) =>
          !deleteproductIDs.includes(item.productId.toString())
      );

      await cart.save();
      return NextResponse.json(
        {
          message: "Cart updated successfully",
          cart,
        },
        { status: 200 }
      );
    }

    /*
     * UPDATE ITEMS
     */
    if (action === "update") {
      if (!Array.isArray(items)) {
        return NextResponse.json(
          { message: "items must be an array" },
          { status: 400 }
        );
      }

      items.forEach((updateItem: any) => {
        const existingItem = cart.items.find(
          (item: any) =>
            item.productId.toString() === updateItem.productId
        );

        if (existingItem) {
          existingItem.licenceTier = updateItem.licenceTier;

          if (updateItem.quantity !== undefined) {
            existingItem.quantity = updateItem.quantity;
          }
        }
      });

      await cart.save();

      return NextResponse.json(
        {
          message: "Cart updated successfully",
          cart,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid action" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Update cart error:", error);

    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    // Get authenticated user
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { cartId } = await params;
    console.log("Attempting to delete cart with ID:", cartId, "for user:", user.userId);

    // Validate ID
    if (!cartId) {
      return NextResponse.json(
        { message: "Cart ID is required" },
        { status: 400 }
      );
    }

    // Make sure it's a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(cartId)) {
      return NextResponse.json(
        { message: "Invalid cart ID" },
        { status: 400 }
      );
    }

    await connectDB();

    // Delete only if the cart belongs to the logged-in user
    const deleteResult = await Cart.deleteOne({
      _id: new Types.ObjectId(cartId),
      userId: new Types.ObjectId(user.userId),
    });

    console.log("Delete result:", deleteResult);

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "Cart not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Cart deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete cart error:", error);

    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}