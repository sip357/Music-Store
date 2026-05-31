import { NextResponse } from "next/server";
import { getUserFromToken } from "../../lib/getUser";

export async function GET() {
  const user = await getUserFromToken();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    userId: user.userId,
    items: [],
  });
}