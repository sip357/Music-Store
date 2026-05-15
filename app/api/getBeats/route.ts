import { connectDB } from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lastID = searchParams.get("lastID");

        const db = await connectDB();
        const beatsCollection = db.collection("beats");

        let query = {};

        if (lastID) {
            query = {
                _id: { $gt: new ObjectId(lastID) }
            };
        }

        const beats = await beatsCollection
            .find(query)
            .limit(10)
            .toArray();

        console.log("Fetched beats:", beats);

        return NextResponse.json(beats);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch beats" },
            { status: 500 }
        );
    }
}