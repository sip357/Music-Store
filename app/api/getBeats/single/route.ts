import { connectDB } from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Beat from "@/app/models/Beat";
import { Types } from "mongoose";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        console.log("Received ID:", id);

        await connectDB();

        if (!id) {
            return NextResponse.json(
                { error: "ID parameter is required" },
                { status: 400 }
            );
        }

        // Validate if id is a valid MongoDB ObjectId
        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid beat ID" },
                { status: 400 }
            );
        }

        const beat = await Beat.findById(id);

        if (!beat) {
            return NextResponse.json(
                { error: "Beat not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(beat);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch Single beat" },
            { status: 500 }
        );
    }
}