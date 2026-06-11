import { connectDB } from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Beat from "@/app/models/Beat";
import { Types } from "mongoose";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const cursor = searchParams.get("cursor");

        console.log("Received cursor:", cursor);

        await connectDB();

        let query: Record<string, any> = {};

        if (cursor) {
            // Validate cursor is a valid ObjectId
            if (Types.ObjectId.isValid(cursor)) {
                query = {
                    _id: { $gt: new Types.ObjectId(cursor) }
                };
            }
        }

        const beats = await Beat.find(query)
            .sort({ _id: 1 })
            .limit(10);

        return NextResponse.json(beats);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch beats" },
            { status: 500 }
        );
    }
}