import { connectDB } from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Beat from "@/app/models/Beat";

export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);

        const lastID = searchParams.get("lastID");

        let query = {};

        if (lastID) {
            query = {
                _id: { $gt: lastID }
            };
        }

        const db = await connectDB();

        const beats = await Beat.find(query).limit(10);

        console.log("Fetched beats:", beats);

        return NextResponse.json(beats);

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch beats" },
            { status: 500 }
        );
    }
}