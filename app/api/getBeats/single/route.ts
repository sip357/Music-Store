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
        const id = searchParams.get("id");

        console.log("Received ID:", id);

        const db = await connectDB();
        const beatsCollection = db.collection(beatsCollectionName);

        let query = {};

        if (id) {
            query = {
                _id: new ObjectId(id)
            };
        }

        const beat = await beatsCollection
            .findOne(query);

        return NextResponse.json(beat);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch Single beat" },
            { status: 500 }
        );
    }
}