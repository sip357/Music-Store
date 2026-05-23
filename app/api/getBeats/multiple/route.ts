import { connectDB } from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
    try {
        const beatsCollectionName = process.env.BEATS_COLLECTION_NAME;
        if (!beatsCollectionName) {
            throw new Error("BEATS_COLLECTION_NAME is not defined in environment variables");
        }
        const { searchParams } = new URL(request.url);
        const cursor = searchParams.get("cursor");

        console.log("Received cursor:", cursor);

        const db = await connectDB();
        const beatsCollection = db.collection(beatsCollectionName);

        let query = {};

        if (cursor) {
            query = {
                _id: { $gt: new ObjectId(cursor) }
            };
        }

        const beats = await beatsCollection
            .find(query)
            .sort({ _id: 1 })
            .limit(10)
            .toArray();

        return NextResponse.json(beats);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch beats" },
            { status: 500 }
        );
    }
}