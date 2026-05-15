import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json (
        { message: "GET request for beats" },
        { status: 200 }
    );
}